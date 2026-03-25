import { Router } from 'express';
import { processUserMessage } from '../ai-assistant.js';

const router = Router();

router.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  const userId = req.user?.id || 'anonymous';
  try {
    const result = await processUserMessage(userId, message, sessionId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process AI message' });
  }
});

router.post('/speak', async (req, res) => {
  const { text } = req.body;
  
  if (!process.env.ELEVENLABS_API_KEY) {
    return res.status(400).json({ error: 'ELEVENLABS_API_KEY is not configured in .env' });
  }

  try {
    // Rachel Voice ID (Friendly Female) - perfect for personal assistant
    const voiceId = '21m00Tcm4TlvDq8ikWAM'; 
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
       const errorMsg = response.status === 429 ? 'ElevenLabs: Too Many Requests' : 'ElevenLabs: Busy or Offline';
       console.warn(errorMsg);
       return res.status(response.status).json({ error: errorMsg });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length
    });
    
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

export default router;
