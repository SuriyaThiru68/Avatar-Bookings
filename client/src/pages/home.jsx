import React from 'react';
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { AvatarCard } from "@/components/avatar-card";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Sparkles, ShieldCheck, Users, Zap, Star, ArrowRight, User, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import heroBg from "../assets/hero-bg.png";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";

const PROFESSIONALS = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    image: avatar1,
    rating: 4.9,
    reviews: 124,
    availability: "Today, 2:00 PM",
    tags: ["Anxiety", "Stress", "Mindfulness"]
  },
  {
    id: "2",
    name: "Marcus Reynolds",
    role: "Creative Director",
    image: avatar2,
    rating: 5,
    reviews: 89,
    availability: "Tomorrow, 10:00 AM",
    tags: ["Branding", "Design", "Strategy"]
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Executive Coach",
    image: avatar3,
    rating: 4.8,
    reviews: 215,
    availability: "Wed, 9:00 AM",
    tags: ["Leadership", "Career", "Management"]
  }
];

const STATS = [
  { label: "Active Experts", value: "500+", icon: Users },
  { label: "Successful Sessions", value: "12k+", icon: Zap },
  { label: "Client Satisfaction", value: "98%", icon: Star },
  { label: "Verified Profiles", value: "100%", icon: ShieldCheck }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation('/')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">ProConnect</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => document.getElementById('experts')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Find Experts</button>
            <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">How it Works</button>
            <button onClick={() => document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">For Business</button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/bookings')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => setLocation('/auth')}>
                  Log In
                </Button>
                <Button className="rounded-full shadow-lg shadow-primary/20" onClick={() => setLocation('/auth')}>
                  Join Now
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Background"
            className="w-full h-full object-cover opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-8 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 text-sm font-semibold rounded-full">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Next Generation Consultation
              </Badge>
            </motion.div>

            <h1 className="font-display font-black text-6xl md:text-8xl text-slate-900 mb-8 leading-[0.95] tracking-tight">
              Connect with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-violet-600">
                the best.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Book 1-on-1 sessions with world-class professionals. Expert guidance whenever you need it.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-2 rounded-3xl sm:rounded-full shadow-2xl shadow-slate-200 border border-slate-100">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                  <Input
                    placeholder="Search by role, name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 bg-transparent text-lg h-12 w-full"
                  />
                </div>
                <Button onClick={() => document.getElementById('experts')?.scrollIntoView({ behavior: 'smooth' })} className="h-12 rounded-2xl sm:rounded-full px-10 text-lg font-bold shadow-lg shadow-primary/30">
                  Search Experts
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="text-sm text-slate-400 font-medium mr-2">Popular:</span>
                {["Psychology", "UI Design", "Career Growth", "Crypto", "Wellness"].map((tag) => (
                  <button key={tag} className="text-xs font-bold px-3 py-1 bg-slate-100 hover:bg-primary/10 hover:text-primary rounded-full transition-all text-slate-500">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
                Available Experts
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Browse our hand-picked selection of top-rated professionals ready to help you grow.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl border-slate-200 font-bold">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
              </Button>
              <Button variant="outline" className="rounded-xl border-slate-200 font-bold">
                Most Recent
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(() => {
              const filteredProfessionals = PROFESSIONALS.filter(professional => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  professional.name.toLowerCase().includes(query) ||
                  professional.role.toLowerCase().includes(query) ||
                  professional.tags.some(tag => tag.toLowerCase().includes(query))
                );
              });

              if (filteredProfessionals.length === 0) {
                return (
                  <div className="col-span-full text-center py-20">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No experts found</h3>
                    <p className="text-slate-500">Try adjusting your search terms</p>
                  </div>
                );
              }

              return filteredProfessionals.map((professional, index) => (
                <motion.div
                  key={professional.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AvatarCard professional={professional} />
                </motion.div>
              ))
            })()}
          </div>

          <div className="mt-20 text-center">
            <Button onClick={() => window.scrollTo({ top: document.getElementById('experts')?.offsetTop - 100, behavior: 'smooth' })} variant="ghost" className="text-primary font-black text-lg group">
              View All 250+ Experts <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-transparent p-12 md:p-20 rounded-[4rem] border border-white/10 backdrop-blur-sm text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
              Ready to start your <br />journey today?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of people who are already growing with our elite professional network.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => setLocation('/auth')} size="lg" className="h-16 px-12 text-xl font-bold rounded-2xl shadow-2xl shadow-primary/40">
                Get Started for Free
              </Button>
              <Button onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })} size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-2xl border-white/20 text-white hover:bg-white/5 transition-all">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">ProConnect</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xs mb-8">
                Connecting global talent with personalized 1-on-1 consultation and mentorship.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 bg-slate-100 rounded-full hover:bg-primary/10 hover:text-primary transition-all cursor-pointer" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><button onClick={() => document.getElementById('experts')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">Find Experts</button></li>
                <li><button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">How it Works</button></li>
                <li><button onClick={() => setLocation('/auth')} className="hover:text-primary transition-colors">Pricing</button></li>
                <li><button onClick={() => setLocation('/auth')} className="hover:text-primary transition-colors">Mobile App</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors">About Us</button></li>
                <li><button onClick={() => setLocation('/auth')} className="hover:text-primary transition-colors">Careers</button></li>
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors">Success Stories</button></li>
                <li><button onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>

            <div className="col-span-2">
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
              <p className="text-sm text-slate-500 mb-4 font-medium">
                Get the latest expert insights and platform updates.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Email address" className="bg-slate-50 border-none rounded-xl h-12" />
                <Button className="h-12 rounded-xl font-bold">Join</Button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-medium text-slate-400">© 2026 ProConnect Inc. All rights reserved.</p>
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Terms of Service</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-900 transition-colors">Cookie Settings</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
