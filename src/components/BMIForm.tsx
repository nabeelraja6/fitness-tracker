import React, { useState } from "react";
import { User } from "../types";
import { ArrowRight, Weight, Ruler, Globe } from "lucide-react";
import { motion } from "motion/react";

interface BMIFormProps {
  onComplete: (user: User) => void;
}

export default function BMIForm({ onComplete }: BMIFormProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");

  const calculateBMI = (h: number, w: number) => {
    const heightInMeters = h / 100;
    return parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || !country) return;

    const bmi = calculateBMI(h, w);
    const category = getCategory(bmi);
    const id = Math.random().toString(36).substring(2, 15);

    onComplete({
      id,
      height: h,
      weight: w,
      bmi,
      category,
      country,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-10 glass-card"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Health Profile</h1>
        <p className="text-slate-500 font-medium">Enter your details to generate your custom fitness roadmap.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Ruler className="w-3.5 h-3.5" /> Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-800"
            placeholder="e.g. 175"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Weight className="w-3.5 h-3.5" /> Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-800"
            placeholder="e.g. 70"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-800"
            placeholder="e.g. United Kingdom"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
        >
          Generate My Plan <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
