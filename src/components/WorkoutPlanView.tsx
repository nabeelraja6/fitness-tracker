import React from "react";
import { WorkoutPlan } from "../types";
import { Play, Repeat, Timer, Info } from "lucide-react";
import { motion } from "motion/react";

interface WorkoutPlanViewProps {
  plan: WorkoutPlan;
}

export default function WorkoutPlanView({ plan }: WorkoutPlanViewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        {plan.weeklyPlan.map((day, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={day.day}
            className="glass rounded-3xl overflow-hidden"
          >
            <div className="bg-stone-800 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{day.day}</h3>
                <p className="text-stone-400 text-sm uppercase tracking-widest font-medium">{day.focus}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                <Play className="w-6 h-6" />
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {day.exercises.map((ex, eIdx) => (
                  <div key={eIdx} className="p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:border-brand-200 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-stone-800 group-hover:text-brand-700 transition-colors">{ex.name}</h4>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-xs font-bold text-stone-500 bg-white px-2 py-1 rounded-lg border border-stone-200">
                          <Repeat className="w-3 h-3" /> {ex.sets} Sets
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-stone-500 bg-white px-2 py-1 rounded-lg border border-stone-200">
                          <Timer className="w-3 h-3" /> {ex.rest} Rest
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-brand-600">
                      <ChevronRight className="w-4 h-4" />
                      {ex.reps} Reps
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed bg-white/50 p-3 rounded-xl border border-stone-100 italic">
                      "{ex.instructions}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
