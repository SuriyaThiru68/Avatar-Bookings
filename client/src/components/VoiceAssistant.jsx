import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Sparkles, Phone, Volume2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [isSubtitlesUser, setIsSubtitlesUser] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Initialize Speech Recognition
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
           setIsSubtitlesUser(true);
        }

        if (finalTranscript) {
          setCurrentSubtitle(finalTranscript);
          setIsSubtitlesUser(true);
          handleSendMessage(finalTranscript);
          setIsListening(false);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  // AI initiation sequence
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const greeting = "Hello! I am your AI receptionist. How can I help you book an appointment today?";
        setCurrentSubtitle(greeting);
        setIsSubtitlesUser(false);
        speakText(greeting, () => {
          setIsListening(true);
          setCurrentSubtitle("Listening...");
          setIsSubtitlesUser(true);
          recognitionRef.current?.start();
        });
      }, 600);
    } else {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      setIsSpeaking(false);
      setIsProcessing(false);
      setCurrentSubtitle("");
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (synthRef.current) synthRef.current.cancel();
      setIsListening(true);
      setCurrentSubtitle("Listening...");
      setIsSubtitlesUser(true);
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setCurrentSubtitle("Thinking...");
    setIsSubtitlesUser(false);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: 'default' })
      });
      const data = await response.json();
      
      setIsProcessing(false);
      setCurrentSubtitle(data.response);
      setIsSubtitlesUser(false);
      
      speakText(data.response, () => {
         // Auto-resume microphone almost instantly (200ms) to ensure conversational responsiveness
         if (data.status !== "booked" && data.status !== "confirmed") {
            setTimeout(() => {
               if (isOpen) {
                  setIsListening(true);
                  setCurrentSubtitle("Please reply...");
                  setIsSubtitlesUser(true);
                  try {
                     recognitionRef.current?.start();
                  } catch (e) {
                     // Catch error if recognition is already started
                  }
               }
            }, 200);
         }
      });
    } catch (err) {
      console.error('AI error:', err);
      setIsProcessing(false);
      setCurrentSubtitle("Connection error. Please try again.");
    }
  };

  const speakText = (text, onEndCallback) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = synthRef.current.getVoices();
      const femaleVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Zira"));
      if (femaleVoice) utterance.voice = femaleVoice;

      utterance.rate = 1.05;
      utterance.pitch = 1.1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };
      
      synthRef.current.speak(utterance);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[550px]"
            >
              {/* Top Bar */}
              <div className="absolute top-4 left-6 z-20 flex flex-col">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-white/80 font-semibold text-sm tracking-widest uppercase">Live Receptionist</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 z-20 text-white/50 hover:text-white hover:bg-white/10 rounded-full" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Central AI Avatar Display */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-slate-900/50 to-slate-900 z-0" />
                 
                 <div className="relative z-10 flex flex-col items-center mb-8 mt-6">
                    {/* The Avatar Container with Talking/Breathing Animation */}
                    <motion.div
                      animate={{ 
                         // Simulate realistic head movements and breathing when speaking
                         scale: isSpeaking ? [1, 1.02, 0.99, 1.01, 1] : [1, 1.01, 1],
                         y: isSpeaking ? [0, -2, 1, -1, 0] : [0, -1, 0],
                         rotate: isSpeaking ? [0, 1, -1, 0.5, 0] : 0,
                         boxShadow: isSpeaking 
                           ? ["0 0 0 rgba(139, 92, 246, 0)", "0 0 50px rgba(139, 92, 246, 0.5)", "0 0 0 rgba(139, 92, 246, 0)"] 
                           : "0 0 0 rgba(139, 92, 246, 0)"
                      }}
                      transition={{ 
                          duration: isSpeaking ? 2.5 : 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                      }}
                      className="w-56 h-56 rounded-full bg-violet-900/40 border-[6px] border-violet-500/30 overflow-hidden shadow-2xl relative flex items-center justify-center transform-gpu"
                    >
                       {/* The Generated Realistic Avatar Image */}
                       <img 
                          src="/ai_receptionist.png" 
                          alt="AI Receptionist" 
                          className="w-full h-full object-cover"
                       />

                       {/* Holographic Talking Waves overlay when speaking */}
                       <AnimatePresence>
                         {isSpeaking && (
                            <motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className="absolute inset-0 z-20 mix-blend-screen flex items-center justify-center pointer-events-none"
                            >
                               {/* Simulated vocal cords/sound wave on the avatar to imply talking */}
                               <div className="absolute bottom-4 flex items-center gap-1.5 opacity-80">
                                  {[...Array(5)].map((_, i) => (
                                     <motion.div 
                                        key={i}
                                        animate={{ height: [`${Math.random() * 10 + 10}px`, `${Math.random() * 30 + 20}px`, `${Math.random() * 10 + 10}px`] }}
                                        transition={{ duration: 0.3 + (Math.random() * 0.2), repeat: Infinity, ease: "linear" }}
                                        className="w-1.5 rounded-full bg-cyan-300"
                                     />
                                  ))}
                               </div>
                            </motion.div>
                         )}
                       </AnimatePresence>

                       {isSpeaking && (
                          <div className="absolute inset-0 bg-violet-500/10 mix-blend-overlay animate-pulse" />
                       )}
                    </motion.div>
                    
                    <div className="mt-6 text-center">
                       {isProcessing ? (
                          <span className="text-sm font-medium text-violet-400 flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                             <Loader2 className="w-4 h-4 animate-spin" /> Fetching Answer...
                          </span>
                       ) : isSpeaking ? (
                          <span className="text-sm font-medium text-cyan-400 flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                             <Volume2 className="w-4 h-4 animate-pulse" /> AI Interviewing...
                          </span>
                       ) : isListening ? (
                          <span className="text-sm font-bold text-rose-400 flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse">
                             <Mic className="w-4 h-4" /> Go Ahead, Speak...
                          </span>
                       ) : (
                          <span className="text-sm font-medium text-slate-400">Waiting</span>
                       )}
                    </div>
                 </div>

                 {/* Subtitles Area */}
                 <div className="w-full max-w-lg min-h-[100px] flex items-center justify-center relative mt-auto z-10">
                    <AnimatePresence mode="wait">
                       <motion.div
                          key={currentSubtitle}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-center transition-colors duration-300 ${
                             isSubtitlesUser ? "text-white/70 italic text-xl font-light" : "text-white text-2xl font-semibold leading-relaxed"
                          }`}
                       >
                          {isSubtitlesUser && <span className="text-sm uppercase tracking-widest text-indigo-400 not-italic block mb-2 opacity-50">You:</span>}
                          {currentSubtitle || "..."}
                       </motion.div>
                    </AnimatePresence>
                 </div>
              </div>

              {/* Controls Grid */}
              <div className="px-8 pb-8 pt-4 border-t border-white/5 bg-slate-900/80 z-20 flex justify-center gap-6">
                 <Button 
                    size="lg"
                    className={`rounded-full shadow-lg w-16 h-16 ${
                       isListening 
                          ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/50" 
                          : "bg-primary hover:bg-primary/90 text-white shadow-primary/50"
                    }`}
                    onClick={toggleListening}
                 >
                    {isListening ? <div className="w-5 h-5 bg-white rounded-sm" /> : <Mic className="w-6 h-6" />}
                 </Button>
                 
                 <Button 
                    size="lg"
                    variant="destructive"
                    className="rounded-full shadow-lg w-16 h-16 bg-slate-800 hover:bg-slate-700 text-rose-500 shadow-xl border border-white/5"
                    onClick={() => setIsOpen(false)}
                 >
                    <Phone className="w-6 h-6 rotate-[135deg]" />
                 </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
         {!isOpen && (
            <div className="fixed bottom-6 right-6 z-40">
               <motion.button
                 whileHover={{ scale: 1.1, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => setIsOpen(true)}
                 className="w-16 h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center relative overflow-hidden group border border-indigo-500/30 backdrop-blur-md"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10" />
                 <div className="relative z-10 flex flex-col items-center">
                    <Sparkles className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-100/80 mt-1">Talk</span>
                 </div>
               </motion.button>
            </div>
         )}
      </AnimatePresence>
    </>
  );
}
