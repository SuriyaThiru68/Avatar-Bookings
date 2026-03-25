import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  userId: String,
  sessionId: String,
  message: String,
  role: { type: String, enum: ['user', 'assistant'] },
  intent: String,
  extractedEntities: {
    date: String,
    time: String,
    service: String,
    name: String
  },
  timestamp: { type: Date, default: Date.now }
});

const Interaction = mongoose.model('Interaction', interactionSchema);

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectMongo() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  } else {
    console.warn('⚠️  No MONGODB_URI found. AI conversation history will not be persistent.');
  }
}

export { Interaction };
