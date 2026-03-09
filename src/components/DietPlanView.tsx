import React from "react";
import { DietPlan } from "../types";
import { Clock, Flame, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface DietPlanViewProps {
  plan: DietPlan;
}

export default function DietPlanView({ plan }: DietPlanViewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plan.weeklyPlan.map((day, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={day.day}
            className="glass rounded-3xl overflow-hidden"
          >
            <div className="bg-brand-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{day.day}</h3>
              <div className="flex items-center gap-2 text-brand-100 text-sm">
                <Flame className="w-4 h-4" />
                <span>Total: {day.meals.reduce((acc, m) => acc + m.calories, 0)} kcal</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {day.meals.map((meal, mIdx) => (
                <div key={mIdx} className="flex gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-white transition-colors border border-transparent hover:border-stone-200 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-stone-800">{meal.type}: {meal.name}</h4>
                      <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                        {meal.calories} kcal
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{meal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
