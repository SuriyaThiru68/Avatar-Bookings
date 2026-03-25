import { Interaction } from './mongo.js';

// In-memory session state to maintain context
const sessionStates = new Map();

/**
 * Basic entity extraction simulating an AI.
 */
function extractEntities(text, currentState) {
  const normalized = text.toLowerCase();
  
  // Clone current state or initialize
  const entities = {
    name: currentState?.name || "",
    service: currentState?.service || "",
    date: currentState?.date || "",
    time: currentState?.time || ""
  };
  
  let intent = currentState?.intent || "unknown";

  // Intent discovery
  if (normalized.includes("book") || normalized.includes("appointment") || normalized.includes("schedule")) {
    intent = "book_appointment";
  } else if (normalized.includes("cancel") || normalized.includes("remove")) {
    intent = "cancel_appointment";
  } else if (normalized.includes("reschedule") || normalized.includes("change")) {
    intent = "reschedule_appointment";
  } else if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("where")) {
    intent = "query";
  }

  // Common dates
  if (normalized.includes("tomorrow")) {
    entities.date = "tomorrow";
  } else if (normalized.includes("today")) {
    entities.date = "today";
  }

  // Common times
  const timeRegex = /(\d{1,2})(:|\s+)?(am|pm)/i;
  const timeMatch = normalized.match(timeRegex);
  if (timeMatch) {
    entities.time = timeMatch[0].toUpperCase();
  } else if (normalized.includes("evening")) {
    entities.time = "evening";
  } else if (normalized.includes("morning")) {
    entities.time = "morning";
  }

  // Service (Mock common)
  const serviceKeywords = ["doctor", "physician", "specialist", "session", "consultation", "therapy"];
  serviceKeywords.forEach(kw => {
    if (normalized.includes(kw)) entities.service = kw;
  });

  // Default to doctor/consultation if missing but user wants to book
  if (intent === "book_appointment" && !entities.service) {
     entities.service = "Doctor Consultation";
  }
  
  // Basic name extraction (if user says "my name is X")
  const nameMatch = text.match(/name is (\w+)/i);
  if (nameMatch) {
      entities.name = nameMatch[1];
  }

  return { intent, ...entities };
}

/**
 * Handle user message and return structured response strictly matching the requested JSON format.
 */
export async function processUserMessage(userId, message, sessionId) {
  // Retrieve previous state
  const currentState = sessionStates.get(sessionId) || {};
  const normalized = message.toLowerCase();
  
  // Extract new entities while preserving existing ones
  const entities = extractEntities(message, currentState);
  let response = "";
  let status = "incomplete"; // "incomplete", "suggesting", "confirmed", "booked"

  // Suggesting slots logic
  const availableSlots = ["5 PM", "6 PM"];

  // Handle Tamil Greeting
  if (normalized.includes("vanakkam") || normalized.includes("tamil") || normalized.includes("eppadi")) {
      response = "Vanakum! Naan unga personal assistant. Eppa appointment book pan'anum?";
      status = "incomplete";
  } else if (entities.intent === "book_appointment") {
    
    // Check missing entities step-by-step
    if (!entities.service) {
      response = "Sure ah! Entha doctor pakkipinga, eppa venum nu sollunga?";
      status = "incomplete";
    } else if (!entities.date) {
      response = `${entities.service} appointment entha thethi (date) nalla irukkum?`;
      status = "incomplete";
    } else if (!entities.time || entities.time === "evening" || entities.time === "morning") {
      response = `${entities.date} aniku yennakita ${availableSlots.join(" and ")} irukku. Edhu ungaluku work aagum?`;
      status = "suggesting";
    } else if (normalized.includes("yes") || normalized.includes("confirm") || normalized.includes("proceed")) {
      response = `Super! Unga ${entities.service} appointment ${entities.date} and ${entities.time} ku successful aagi vittathu.`;
      status = "booked";
      
      // Clear session after booking
      sessionStates.delete(sessionId);
    } else {
      // All details present, ask for final confirmation
      response = `Perfect! Naan unhaludaya appointment-a ${entities.date} at ${entities.time} ku confirm panidava?`;
      status = "confirmed";
    }
    
  } else if (entities.intent === "cancel_appointment") {
    response = "Okay puridhu. Entha appointment a neenga cancel panna virumburinga?";
    status = "incomplete";
  } else if (entities.intent === "reschedule_appointment") {
    response = "No problem. Unga appointment-a yepoludhu maatha venum nu sollunga?";
    status = "incomplete";
  } else if (entities.intent === "query") {
    response = "Engaludeya sessions sadharanama 30-60 minutes edukum. Neenga onnu book panna asai paduringala?";
    status = "incomplete";
  } else {
    // Unknown Intent
    response = "Naan appointments mattum dhan paapen. Doctor session book pannanuma, ila reschedule pannanuma?";
    entities.intent = "unknown";
    status = "incomplete";
  }
  
  // Save updated state back to session if not booked
  if (status !== "booked") {
      sessionStates.set(sessionId, { intent: entities.intent, ...entities });
  }

  const result = {
    intent: entities.intent,
    name: entities.name,
    service: entities.service,
    date: entities.date,
    time: entities.time,
    response: response,
    status: status
  };

  // Log to MongoDB
  if (Interaction) {
      try {
          await Interaction.create({
              userId,
              sessionId,
              message,
              role: 'user',
              intent: result.intent,
              extractedEntities: {
                  date: result.date,
                  time: result.time,
                  service: result.service,
                  name: result.name
              }
          });

          await Interaction.create({
              userId,
              sessionId,
              message: result.response,
              role: 'assistant',
              extractedEntities: {
                  date: result.date,
                  time: result.time,
                  service: result.service,
                  name: result.name
              }
          });
      } catch (e) {
          console.error("Mongo log error:", e);
      }
  }

  return result;
}
