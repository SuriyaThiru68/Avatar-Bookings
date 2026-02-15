import React from 'react';
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Home } from "lucide-react";

function SuccessPage() {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      className: "max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
    },
    /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-10 h-10 text-green-600" })),
    /* @__PURE__ */ React.createElement("h1", { className: "font-display font-bold text-3xl text-slate-900 mb-2" }, "Booking Confirmed!"),
    /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground mb-8" }, "Your session has been successfully scheduled. We've sent a confirmation email with all the details."),
    /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center text-slate-700 font-medium" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-5 h-5 mr-2 text-primary" }), "Check your calendar for the invite")),
    /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(Link, { href: "/" }, /* @__PURE__ */ React.createElement(Button, { className: "w-full", size: "lg" }, /* @__PURE__ */ React.createElement(Home, { className: "mr-2 h-4 w-4" }), " Return Home")))
  ));
}
export {
  SuccessPage as default
};
