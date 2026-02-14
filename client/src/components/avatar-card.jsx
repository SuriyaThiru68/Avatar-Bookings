import React from 'react';
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRight, Shield, Zap, Heart } from "lucide-react";
function AvatarCard({ professional }) {
  return /* @__PURE__ */ React.createElement(
    motion.div,
    {
      whileHover: { y: -8, scale: 1.02 },
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    /* @__PURE__ */ React.createElement(Card, { className: "overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-md group" }, /* @__PURE__ */ React.createElement("div", { className: "relative aspect-[4/5] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 right-4 z-20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-white/50 shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" }), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold text-slate-700 uppercase tracking-tighter" }, "Online"))), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" }), /* @__PURE__ */ React.createElement(
      "img",
      {
        src: professional.image,
        alt: professional.name,
        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" }, professional.tags.map((tag) => /* @__PURE__ */ React.createElement("span", { key: tag, className: "text-[9px] uppercase tracking-widest font-bold px-2 py-1 bg-primary/20 backdrop-blur-md text-white border border-white/20 rounded-md" }, tag))), /* @__PURE__ */ React.createElement(Link, { href: `/book/${professional.id}` }, /* @__PURE__ */ React.createElement(Button, { className: "w-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold shadow-lg" }, "View Profile ", /* @__PURE__ */ React.createElement(ArrowRight, { className: "ml-2 h-4 w-4" }))))), /* @__PURE__ */ React.createElement(CardContent, { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-display font-bold text-2xl text-slate-900 group-hover:text-primary transition-colors duration-300" }, professional.name), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 font-medium text-sm" }, professional.role)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 mb-1" }, /* @__PURE__ */ React.createElement(Star, { className: "w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-amber-700" }, professional.rating)), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-muted-foreground font-medium uppercase tracking-tighter" }, professional.reviews, " Reviews"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs text-slate-600 font-medium" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-3.5 h-3.5 mr-2 text-blue-500" }), "Verified Expert"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs text-slate-600 font-medium" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-3.5 h-3.5 mr-2 text-amber-500" }), "Fast Response")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-primary font-bold text-sm" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 mr-2" }), /* @__PURE__ */ React.createElement("span", null, professional.availability)), /* @__PURE__ */ React.createElement("button", { className: "text-slate-300 hover:text-rose-500 transition-colors duration-300" }, /* @__PURE__ */ React.createElement(Heart, { className: "w-5 h-5" })))))
  );
}
export {
  AvatarCard
};
