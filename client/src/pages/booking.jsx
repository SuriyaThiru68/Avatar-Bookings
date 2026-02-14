import React from 'react';
import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, CheckCircle2, Star, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    price: 150,
    about: "Specializing in anxiety and stress management with over 8 years of clinical experience. I help clients find balance and clarity through evidence-based approaches."
  },
  {
    id: "2",
    name: "Marcus Reynolds",
    role: "Creative Director",
    image: avatar2,
    rating: 5,
    reviews: 89,
    price: 200,
    about: "Award-winning creative director helping brands find their visual voice. Let's discuss your brand identity and design strategy."
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Executive Coach",
    image: avatar3,
    rating: 4.8,
    reviews: 215,
    price: 300,
    about: "Helping senior leaders navigate complex organizational challenges and career transitions. Unlock your leadership potential."
  }
];
function BookingPage() {
  const [match, params] = useRoute("/book/:id");
  const [location, setLocation] = useLocation();
  const [date, setDate] = useState(/* @__PURE__ */ new Date());
  const [time, setTime] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const professional = PROFESSIONALS.find((p) => p.id === params?.id);
  if (!professional) {
    return /* @__PURE__ */ React.createElement("div", { className: "p-10 text-center" }, "Professional not found");
  }
  const handleBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLocation("/success");
    }, 1500);
  };
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-slate-50 p-4 md:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-4 space-y-6" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "ghost",
      onClick: () => setLocation("/"),
      className: "pl-0 hover:bg-transparent hover:text-primary mb-4"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "mr-2 h-4 w-4" }),
    " Back to Experts"
  ), /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "sticky top-8"
    },
    /* @__PURE__ */ React.createElement(Card, { className: "overflow-hidden border-none shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "aspect-[4/5] relative" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: professional.image,
        alt: professional.name,
        className: "w-full h-full object-cover"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 p-6 text-white" }, /* @__PURE__ */ React.createElement("h1", { className: "font-display font-bold text-3xl mb-1" }, professional.name), /* @__PURE__ */ React.createElement("p", { className: "text-white/80 text-lg" }, professional.role))), /* @__PURE__ */ React.createElement(CardContent, { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement(Star, { className: "w-5 h-5 text-amber-500 fill-amber-500 mr-1" }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-lg" }, professional.rating), /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground ml-1" }, "(", professional.reviews, " reviews)")), /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-primary" }, "$", professional.price, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-normal text-muted-foreground" }, "/hr"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-slate-900" }, "About"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 leading-relaxed" }, professional.about))))
  )), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-8" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.2 }
    },
    /* @__PURE__ */ React.createElement(Card, { className: "border-none shadow-md overflow-hidden bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 md:p-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4 mb-8" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}` }, "1"), /* @__PURE__ */ React.createElement("div", { className: "h-1 flex-1 bg-slate-100 rounded-full" }, /* @__PURE__ */ React.createElement("div", { className: `h-full bg-primary rounded-full transition-all duration-500 ${step >= 2 ? "w-full" : "w-0"}` })), /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}` }, "2")), step === 1 ? /* @__PURE__ */ React.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-display font-bold text-slate-900 mb-2" }, "Select a Date & Time"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "Choose a time that works best for your session.")), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-4 rounded-xl border border-slate-100" }, /* @__PURE__ */ React.createElement(
      Calendar,
      {
        mode: "single",
        selected: date,
        onSelect: setDate,
        className: "rounded-md border-none w-full",
        disabled: (date2) => date2 < /* @__PURE__ */ new Date() || date2.getDay() === 0 || date2.getDay() === 6
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-slate-900 font-medium mb-4" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-5 h-5 mr-2 text-primary" }), "Available slots for ", date ? format(date, "MMMM do") : "Selected Date"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, timeSlots.map((slot) => /* @__PURE__ */ React.createElement(
      Button,
      {
        key: slot,
        variant: time === slot ? "default" : "outline",
        className: `w-full justify-center ${time === slot ? "bg-primary text-white shadow-md" : "hover:bg-primary/5 hover:text-primary border-slate-200"}`,
        onClick: () => setTime(slot)
      },
      slot
    ))), time && /* @__PURE__ */ React.createElement(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        className: "pt-4"
      },
      /* @__PURE__ */ React.createElement(
        Button,
        {
          size: "lg",
          className: "w-full",
          onClick: () => setStep(2)
        },
        "Continue to Details ",
        /* @__PURE__ */ React.createElement(ArrowRight, { className: "ml-2 h-4 w-4" })
      )
    )))) : /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-display font-bold text-slate-900 mb-2" }, "Your Details"), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "Please provide your contact information to confirm the booking.")), /* @__PURE__ */ React.createElement("div", { className: "grid gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "firstName" }, "First Name"), /* @__PURE__ */ React.createElement(Input, { id: "firstName", placeholder: "Jane" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "lastName" }, "Last Name"), /* @__PURE__ */ React.createElement(Input, { id: "lastName", placeholder: "Doe" }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "email" }, "Email"), /* @__PURE__ */ React.createElement(Input, { id: "email", type: "email", placeholder: "jane@example.com" })), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "notes" }, "Session Goals (Optional)"), /* @__PURE__ */ React.createElement(Textarea, { id: "notes", placeholder: "What would you like to focus on during this session?", className: "min-h-[100px]" }))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3 mt-6" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-slate-900 mb-2" }, "Booking Summary"), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Professional"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-900" }, professional.name)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Date"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-900" }, date ? format(date, "MMMM do, yyyy") : "")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground" }, "Time"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-900" }, time)), /* @__PURE__ */ React.createElement("div", { className: "border-t border-slate-200 my-2 pt-2 flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900" }, "Total"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-xl text-primary" }, "$", professional.price))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 pt-4" }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", size: "lg", onClick: () => setStep(1), className: "flex-1" }, "Back"), /* @__PURE__ */ React.createElement(Button, { size: "lg", onClick: handleBooking, disabled: isSubmitting, className: "flex-[2]" }, isSubmitting ? /* @__PURE__ */ React.createElement("span", { className: "flex items-center" }, "Processing...") : /* @__PURE__ */ React.createElement("span", { className: "flex items-center" }, "Confirm Booking ", /* @__PURE__ */ React.createElement(CheckCircle2, { className: "ml-2 h-4 w-4" })))))))
  ))));
}
export {
  BookingPage as default
};
