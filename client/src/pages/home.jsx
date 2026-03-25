import React from 'react';
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Mic, Speech, Building2, User, ChevronRight, Activity, CalendarDays, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FCFDFD] font-sans selection:bg-teal-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation('/')}>
            <div className="w-10 h-10 bg-teal-900 rounded-full flex items-center justify-center shadow-lg shadow-teal-900/20">
              <span className="text-white font-bold text-lg">+</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Central Health Plaza
              <span className="block text-[10px] uppercase tracking-widest text-teal-600">Medical Network</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-slate-500">
            <button className="hover:text-teal-800 transition-colors">Find a Doctor</button>
            <button className="hover:text-teal-800 transition-colors">Specialties</button>
            <button className="hover:text-teal-800 transition-colors">AI Concierge</button>
            <button className="hover:text-teal-800 transition-colors">For Clinics</button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full ring-2 ring-slate-100">
                    <Avatar className="h-full w-full">
                      <AvatarFallback className="bg-teal-50 text-teal-800 font-bold">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-xl">
                  <DropdownMenuLabel className="font-bold text-slate-800">My Medical Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-2.5 font-medium cursor-pointer" onClick={() => setLocation('/appointment')}>
                    <Mic className="mr-3 h-4 w-4 text-teal-600" /> AI Assistant
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2.5 font-medium cursor-pointer" onClick={() => setLocation('/bookings')}>
                    <CalendarDays className="mr-3 h-4 w-4 text-slate-400" /> My Appointments
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-2.5 font-medium text-rose-600 cursor-pointer" onClick={logout}>
                    Secure Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex text-slate-600 font-bold hover:bg-slate-50 rounded-xl" onClick={() => setLocation('/auth')}>
                  Patient Login
                </Button>
                <Button className="rounded-full bg-teal-800 hover:bg-teal-900 shadow-lg shadow-teal-900/20 px-8 h-12 font-bold text-white transition-all hover:scale-105" onClick={() => setLocation('/auth')}>
                  Join Network
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden items-center justify-center flex flex-col">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-50/50 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="flex-1 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal-100 shadow-sm text-teal-800 font-bold text-xs uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> Live AI Scheduling 
            </div>
            
            <h1 className="font-extrabold text-6xl lg:text-7xl text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Meet your personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-800">Medical Concierge.</span>
            </h1>

            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
              Skip the waiting queues and hold music. Talk directly to our ultra-realistic AI assistant to instantly find top specialists and book appointments completely hands-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                 onClick={() => setLocation(user ? '/appointment' : '/auth')}
                 className="h-16 rounded-full px-10 bg-teal-800 hover:bg-teal-900 text-white font-bold text-lg shadow-[0_10px_40px_rgba(15,118,110,0.3)] transition-transform hover:scale-105"
              >
                {user ? "Talk to Assistant Now" : "Get Started"} <Mic className="ml-3 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="h-16 rounded-full px-10 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-lg"
              >
                View Specialists
              </Button>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="flex-1 w-full max-w-xl relative"
          >
             {/* Floating UI Elements mocking the app */}
             <div className="absolute top-10 -left-16 bg-white p-4 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center gap-4 z-20 animate-bounce" style={{animationDuration: '3s'}}>
                 <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600"><Speech className="w-6 h-6" /></div>
                 <div>
                    <div className="w-24 h-2 bg-slate-100 rounded-full mb-2" />
                    <div className="w-16 h-2 bg-teal-500 rounded-full" />
                 </div>
             </div>

             <div className="relative w-[500px] h-[500px] rounded-full mx-auto border-[16px] border-white shadow-[0_30px_100px_rgba(15,118,110,0.15)] overflow-hidden bg-slate-900 group cursor-pointer" onClick={() => setLocation(user ? '/appointment' : '/auth')}>
                 <div className="absolute inset-0 bg-teal-900/40 mix-blend-multiply group-hover:bg-transparent transition-colors z-10" />
                 <img src="/ai_receptionist.png" alt="AI Receptionist" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                 
                 {/* Decorative soundwaves */}
                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                     {[...Array(6)].map((_, i) => (
                         <div key={i} className="w-2 h-10 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                     ))}
                 </div>
             </div>

             <div className="absolute bottom-20 -right-8 bg-white p-5 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-50 flex items-center gap-4 z-20">
                 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-5 h-5" /></div>
                 <div>
                    <p className="font-bold text-slate-800 text-sm">Appointment Booked</p>
                    <p className="text-slate-400 font-medium text-xs">Tomorrow, 10:30 AM</p>
                 </div>
             </div>
          </motion.div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision Healthcare, Simplified.</h2>
               <p className="text-lg text-slate-500 font-medium">Experience the future of medical coordination with our fully autonomous, emotion-aware voice assistant system.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm"><Speech className="w-7 h-7" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Natural Conversation</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">Built on advanced NLP and ultra-realistic TTS, our agent guides you perfectly through managing your health data.</p>
                  <span className="text-teal-700 font-bold text-sm flex items-center cursor-pointer hover:underline">Learn more <ChevronRight className="w-4 h-4 ml-1" /></span>
               </div>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm"><Building2 className="w-7 h-7" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Central Plaza Network</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">Seamless integration directly into over 5,000 local clinics and top-rated medical professionals in your area.</p>
                  <span className="text-teal-700 font-bold text-sm flex items-center cursor-pointer hover:underline">View clinics <ChevronRight className="w-4 h-4 ml-1" /></span>
               </div>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm"><Activity className="w-7 h-7" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Confirmations</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">No more waiting for callbacks. The AI checks our live database and locks in your preferred time slot immediately.</p>
                  <span className="text-teal-700 font-bold text-sm flex items-center cursor-pointer hover:underline">How it works <ChevronRight className="w-4 h-4 ml-1" /></span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
