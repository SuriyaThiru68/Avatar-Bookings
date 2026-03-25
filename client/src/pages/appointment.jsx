import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from "wouter";
import { Mic, Calendar, User, History, Settings, CheckCircle2, Circle, ArrowRight, Check, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function Appointment() {
  const [, setLocation] = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  
  // Track the extracted booking details from the AI backend
  const [sessionData, setSessionData] = useState({
    service: "",
    date: "",
    time: "",
    status: "idle", // idle, incomplete, suggesting, confirmed, booked
    intent: ""
  });

  const { user } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
       setLocation('/auth');
    }
  }, [user, setLocation]);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript) {
           setCurrentSubtitle(interimTranscript);
        }

        if (finalTranscript) {
          setCurrentSubtitle(finalTranscript);
          handleSendMessage(finalTranscript);
          setIsListening(false);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const [isStarted, setIsStarted] = useState(false);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const startConversation = () => {
    setIsStarted(true);
    const greeting = "Vanakum! Naan unga personal assistant. Eppa appointment book pan'anum?";
    setCurrentSubtitle(greeting);
    
    // No artificial timeout - start immediately
    speakText(greeting, () => {
      setIsListening(true);
      try { recognitionRef.current?.start(); } catch(e) {}
    });
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (synthRef.current) synthRef.current.cancel();
      setIsListening(true);
      setCurrentSubtitle("Listening...");
      try { recognitionRef.current?.start(); } catch(e){}
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setCurrentSubtitle("Thinking...");

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: 'ethereal_session' })
      });
      const data = await response.json();
      
      setIsProcessing(false);
      setCurrentSubtitle(data.response);
      
      // Update UI state based on AI's entity extraction
      setSessionData({
         service: data.service || sessionData.service,
         date: data.date || sessionData.date,
         time: data.time || sessionData.time,
         status: data.status || "incomplete",
         intent: data.intent || "unknown"
      });

      speakText(data.response, () => {
         // Auto-resume microphone INSTANTLY (10ms) for high-speed conversation
         if (data.status !== "booked" && data.status !== "confirmed") {
            setIsListening(true);
            setCurrentSubtitle("Listening...");
            try { recognitionRef.current?.start(); } catch(e) {}
         }
      });
    } catch (err) {
      console.error('AI error:', err);
      setIsProcessing(false);
      setCurrentSubtitle("Sorry, I encountered an error. Please try again.");
    }
  };

  const speakText = async (text, onEndCallback) => {
    // Controller for timing out slow server responses
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

    try {
      // Prioritize High-End Emotion ElevenLabs Voice
      const response = await fetch('/api/ai/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("ElevenLabs busy or missing key");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };
      audio.play();
    } catch (e) {
      clearTimeout(timeoutId);
      // Fallback Strategy: Instant Local Browser Voice if server is high traffic/slow
      if (synthRef.current) {
        synthRef.current.cancel(); 
        const utterance = new SpeechSynthesisUtterance(text);
        
        const voices = synthRef.current.getVoices();
        const humanVoice = voices.find(v => 
            v.name.includes("Google US English") || 
            v.name.includes("Microsoft Zira") || 
            v.name.includes("Google UK English Female") || 
            v.name.includes("Samantha")
        );
        if (humanVoice) utterance.voice = humanVoice;

        utterance.rate = 1.15; 
        utterance.pitch = 1.05; 
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          if (onEndCallback) onEndCallback();
        };
        synthRef.current.speak(utterance);
      }
    }
  };

  // Helper function to render checkmarks on the right panel
  const ChecklistItem = ({ label, value }) => {
     const isFilled = !!value;
     return (
        <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isFilled ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-400'}`}>
                 {label === 'Service' && <Building2 className="w-4 h-4" />}
                 {label === 'Date' && <Calendar className="w-4 h-4" />}
                 {label === 'Time' && <Calendar className="w-4 h-4" />}
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold text-slate-900">{label}</span>
                 <span className="text-sm text-slate-500 font-medium">{value || 'Pending'}</span>
              </div>
           </div>
           {isFilled ? (
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-1 rounded-md">Confirmed</span>
           ) : (
              <Circle className="w-5 h-5 text-slate-200" />
           )}
        </div>
     );
  };

  return (
    <div className="flex h-screen w-full bg-[#FCFDFD] font-sans overflow-hidden text-slate-800">
      {/* Light Theme Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col py-8 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
         <div className="px-8 flex items-center gap-3 mb-12">
            <div className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center">
                <span className="text-white font-bold text-xs">+</span>
            </div>
            <div>
               <h1 className="font-bold text-slate-900 leading-tight">Central Health Plaza</h1>
               <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Personal Assistant</span>
            </div>
         </div>

         <div className="flex flex-col gap-2 px-4">
            <Button variant="default" className="w-full justify-start bg-teal-800 hover:bg-teal-900 text-white rounded-xl mb-4 py-6 shadow-md shadow-teal-900/20">
               + New Appointment
            </Button>
            
            <nav className="flex flex-col gap-1">
               <Button variant="ghost" className="w-full justify-start text-teal-800 bg-teal-50 font-semibold rounded-xl py-6 border-l-4 border-teal-800">
                  <User className="w-5 h-5 mr-3" /> Personal Assistant
               </Button>
               <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 font-semibold rounded-xl py-6 border-l-4 border-transparent">
                  <Calendar className="w-5 h-5 mr-3" /> Schedule
               </Button>
               <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 font-semibold rounded-xl py-6 border-l-4 border-transparent" onClick={() => setLocation('/bookings')}>
                  <History className="w-5 h-5 mr-3" /> History
               </Button>
               <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-900 font-semibold rounded-xl py-6 border-l-4 border-transparent" onClick={() => setLocation('/profile')}>
                  <Settings className="w-5 h-5 mr-3" /> Preferences
               </Button>
            </nav>
         </div>
      </aside>

      {/* Main Dynamic Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-[0.99]">
         {/* Top Navbar */}
         <header className="h-20 flex justify-end items-center px-10 border-b border-transparent">
            <div className="flex items-center gap-6 font-semibold text-sm text-slate-400">
               <span className="text-teal-800 cursor-pointer">Personal Assistant</span>
               <span className="cursor-pointer hover:text-slate-800 transition-colors">Schedule</span>
               <span className="cursor-pointer hover:text-slate-800 transition-colors">History</span>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center p-10 w-full max-w-7xl mx-auto h-full">
            {!isStarted ? (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center max-w-lg text-center"
               >
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl relative bg-slate-900 border-4 border-white mb-8 group cursor-pointer transition-transform hover:scale-105" onClick={startConversation}>
                     <div className="absolute inset-0 bg-teal-900/60 mix-blend-multiply group-hover:bg-teal-900/20 transition-colors z-10" />
                     <img src="/ai_receptionist.png" alt="Avatar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                     <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <Mic className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md" />
                     </div>
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Central Health Plaza AI</h2>
                  <p className="text-lg text-slate-500 font-medium mb-10 text-center">Your personal medical voice assistant is offline. Click below to initiate a secure connection.</p>
                  <Button size="lg" className="h-14 px-10 rounded-full bg-teal-800 hover:bg-teal-900 text-white font-bold text-lg shadow-[0_10px_40px_rgba(15,118,110,0.3)] transition-transform hover:scale-105" onClick={startConversation}>
                     Wake Assistant
                  </Button>
               </motion.div>
            ) : (
            <AnimatePresence mode="wait">
               
               {/* STATE 1: WELCOME & LISTENING (Idle or mostly empty session) */}
               {(!sessionData.service && sessionData.status !== "booked" && sessionData.status !== "confirmed") && (
                  <motion.div 
                     key="state-idle"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.5 }}
                     className="w-full flex items-center justify-center gap-20"
                  >
                     <div className="flex flex-col items-center max-w-lg text-center">
                        <motion.div
                           animate={{
                              scale: isSpeaking ? [1, 1.02, 1] : 1,
                              boxShadow: isSpeaking 
                                 ? "0 0 0 20px rgba(15, 118, 110, 0.1), 0 0 0 40px rgba(15, 118, 110, 0.05)" 
                                 : "0 0 0 0px rgba(15, 118, 110, 0)"
                           }}
                           transition={{ duration: 2, repeat: Infinity }}
                           className="w-64 h-64 rounded-full overflow-hidden mb-10 shadow-2xl relative bg-slate-900 border-4 border-white"
                        >
                           <img src="/ai_receptionist.png" alt="Avatar" className="w-full h-full object-cover" />
                        </motion.div>
                        
                        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{currentSubtitle || "Vanakum! Naan unga personal assistant."}</h2>
                        <p className="text-xl text-slate-500 font-medium mb-10">Eppa appointment book pan'anum?</p>
                        
                        {/* Audio Waveform Viz */}
                        <div className="flex gap-1.5 items-center justify-center h-8">
                           {[...Array(6)].map((_, i) => (
                              <motion.div 
                                 key={i}
                                 animate={{ height: isSpeaking || isListening ? [`${Math.random() * 20 + 10}px`, `${Math.random() * 30 + 20}px`, `${Math.random() * 20 + 10}px`] : "10px" }}
                                 transition={{ duration: 0.4 + (Math.random() * 0.2), repeat: Infinity, ease: "easeInOut" }}
                                 className={`w-1.5 rounded-full ${isListening ? 'bg-teal-500' : isSpeaking ? 'bg-teal-800' : 'bg-slate-300'}`}
                              />
                           ))}
                        </div>
                     </div>

                     <div className="w-80 bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-50">
                        <h3 className="font-bold text-teal-800 text-sm uppercase tracking-widest mb-6">Current Inquiry</h3>
                        <ChecklistItem label="Service" value={sessionData.service} />
                        <ChecklistItem label="Date" value={sessionData.date} />
                        <ChecklistItem label="Time" value={sessionData.time} />
                        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                           <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-teal-500 animate-pulse' : 'bg-slate-300'}`} />
                           <span className="text-sm font-semibold text-slate-500">Awaiting your voice command...</span>
                        </div>
                     </div>
                  </motion.div>
               )}

               {/* STATE 2 & 3: EXTRACTING DETAILS / SUGGESTING */}
               {(sessionData.service && sessionData.status !== "booked" && sessionData.status !== "confirmed") && (
                  <motion.div 
                     key="state-extracting"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="w-full flex items-center justify-center gap-16"
                  >
                     <div className="flex items-center gap-8 max-w-xl">
                        <div className="flex flex-col items-center">
                           <motion.div
                              animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white mb-4"
                           >
                              <img src="/ai_receptionist.png" alt="Avatar" className="w-full h-full object-cover" />
                           </motion.div>
                           <div className="flex gap-1 items-center justify-center h-4 mt-2">
                              {[...Array(4)].map((_, i) => (
                                 <motion.div 
                                    key={i}
                                    animate={{ height: isSpeaking || isListening ? ["8px", "16px", "8px"] : "4px" }}
                                    transition={{ duration: 0.3 + (Math.random() * 0.2), repeat: Infinity }}
                                    className="w-1 rounded-full bg-teal-800"
                                 />
                              ))}
                           </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-snug">"{currentSubtitle}"</h2>
                     </div>

                     <div className="w-[400px] flex flex-col gap-6">
                        <Card className="rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border-none">
                           <h3 className="font-bold text-teal-800 text-sm uppercase tracking-widest mb-6 px-2">Service Details</h3>
                           <div className="px-2">
                              <ChecklistItem label="Service" value={sessionData.service} />
                              <ChecklistItem label="Date" value={sessionData.date} />
                              <ChecklistItem label="Time" value={sessionData.time} />
                           </div>
                        </Card>
                        
                        {/* Suggestion Buttons if prompting for time */}
                        {sessionData.status === "suggesting" && (
                           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                              <Button variant="outline" className="flex-1 rounded-2xl h-16 font-bold text-slate-700 bg-white hover:bg-teal-50 border-slate-200" onClick={() => handleSendMessage("5 PM")}>
                                 <Calendar className="w-4 h-4 mr-2 text-teal-600" /> 5:00 PM
                              </Button>
                              <Button variant="outline" className="flex-1 rounded-2xl h-16 font-bold text-slate-700 bg-white hover:bg-teal-50 border-slate-200" onClick={() => handleSendMessage("6 PM")}>
                                 <Calendar className="w-4 h-4 mr-2 text-teal-600" /> 6:00 PM
                              </Button>
                           </motion.div>
                        )}
                        {sessionData.status === "incomplete" && sessionData.date && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                              <Button variant="outline" className="flex-1 rounded-2xl h-16 font-bold text-slate-700 bg-white hover:bg-teal-50 border-slate-200" onClick={() => handleSendMessage("Morning")}>
                                 Morning
                              </Button>
                              <Button variant="outline" className="flex-1 rounded-2xl h-16 font-bold text-slate-700 bg-white hover:bg-teal-50 border-slate-200" onClick={() => handleSendMessage("Evening")}>
                                 Evening
                              </Button>
                           </motion.div>
                        )}
                     </div>
                  </motion.div>
               )}

               {/* STATE 4: FINAL CONFIRMATION */}
               {sessionData.status === "confirmed" && (
                  <motion.div 
                     key="state-confirmed"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="w-full max-w-2xl flex flex-col items-center text-center"
                  >
                     <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white mb-6">
                        <img src="/ai_receptionist.png" alt="Avatar" className="w-full h-full object-cover" />
                     </div>
                     <h2 className="text-3xl font-bold text-teal-900 mb-10 leading-tight">"Perfect. Should I go ahead and confirm your appointment for {sessionData.date} at {sessionData.time}?"</h2>
                     
                     <div className="w-full bg-white rounded-3xl p-8 shadow-xl mb-10 border border-slate-100 flex flex-col items-start gap-4 text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl" />
                        <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Booking Summary</h3>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-800"><Building2 className="w-6 h-6" /></div>
                           <div>
                              <p className="text-xl font-bold text-slate-900">{sessionData.service.charAt(0).toUpperCase() + sessionData.service.slice(1)} Consultation</p>
                              <p className="text-slate-500 font-medium">ProConnect Verified Professional</p>
                           </div>
                        </div>
                        <div className="w-full border-t border-slate-100 my-2" />
                        <div className="flex w-full gap-8">
                           <div className="flex gap-3 items-center">
                              <Calendar className="w-5 h-5 text-teal-600" />
                              <span className="font-bold text-slate-700">{sessionData.date}</span>
                           </div>
                           <div className="flex gap-3 items-center">
                              <Calendar className="w-5 h-5 text-teal-600" />
                              <span className="font-bold text-slate-700">{sessionData.time}</span>
                           </div>
                        </div>
                     </div>

                     <div className="flex gap-4 w-full">
                        <Button className="flex-1 h-14 rounded-2xl bg-teal-800 hover:bg-teal-900 text-lg font-bold" onClick={() => handleSendMessage("Yes")}>
                           Confirm Booking
                        </Button>
                        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 border-slate-200 text-slate-600 text-lg font-bold bg-white" onClick={() => handleSendMessage("Change the time")}>
                           Change Details
                        </Button>
                     </div>
                  </motion.div>
               )}

               {/* STATE 5: BOOKING SUCCESSFUL */}
               {sessionData.status === "booked" && (
                  <motion.div 
                     key="state-booked"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="w-full max-w-xl flex flex-col items-center text-center"
                  >
                     <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white mb-6 bg-teal-900 p-1">
                        <img src="/ai_receptionist.png" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                     </div>
                     <h2 className="text-4xl font-black text-teal-800 mb-2">Booking Successful</h2>
                     <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full mb-8">
                        <CheckCircle2 className="w-4 h-4" /> Confirmed & Secured
                     </div>

                     <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed max-w-md">"All set! Your appointment is successfully booked. I've sent a confirmation to your history. Anything else I can help with?"</p>

                     <div className="flex gap-4 w-full">
                        <Button className="flex-1 h-14 rounded-2xl bg-teal-800 hover:bg-teal-900 text-lg font-bold shadow-lg shadow-teal-900/20" onClick={() => setLocation('/bookings')}>
                           View in History
                        </Button>
                        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-600 font-bold bg-white" onClick={() => setSessionData({service:"", date:"", time:"", status:"idle", intent:""})}>
                           Start New Booking
                        </Button>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
            )}
         </div>

         {/* Floating Global Microphone Toggle (Only show if started) */}
         {isStarted && (
         <div className="absolute bottom-10 right-10 flex items-center gap-4">
             {isListening && (
                 <span className="text-sm font-bold text-teal-600 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Listening...
                 </span>
             )}
            <Button 
               size="lg"
               onClick={toggleListening}
               className={`w-16 h-16 rounded-full shadow-2xl shrink-0 transition-colors ${
                  isListening ? "bg-rose-500 hover:bg-rose-600 text-white" : "bg-teal-900 hover:bg-teal-800 text-white"
               }`}
            >
               {isListening ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
         </div>
         )}
      </main>
    </div>
  );
}
