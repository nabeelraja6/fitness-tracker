import React from "react";
import { ShoppingBag, Store, Info, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface CountryFoodsViewProps {
  tips: string[];
  country: string;
}

export default function CountryFoodsView({ tips, country }: CountryFoodsViewProps) {
  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-3xl bg-brand-900 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Sourcing Healthy Food in {country}</h2>
          <p className="text-brand-100 max-w-2xl leading-relaxed">
            Eating healthy is easier when you know where to look. We've analyzed local food availability 
            in your region to provide these specific sourcing recommendations.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="glass p-6 rounded-3xl border-l-4 border-brand-500"
          >
            <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-stone-700 leading-relaxed font-medium">
              {tip}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-6 h-6 text-brand-600" />
            <h3 className="text-xl font-bold text-stone-800">Recommended Markets</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <h4 className="font-bold text-stone-800 mb-1">Local Farmers Markets</h4>
              <p className="text-sm text-stone-600">Best for seasonal produce and organic eggs. Usually cheaper and fresher than supermarkets.</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <h4 className="font-bold text-stone-800 mb-1">Health Food Specialists</h4>
              <p className="text-sm text-stone-600">Ideal for bulk grains, seeds, and specialized plant-based proteins.</p>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Store className="w-6 h-6 text-brand-600" />
            <h3 className="text-xl font-bold text-stone-800">Smart Shopping Tips</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Shop the perimeter of the store for fresh items.",
              "Check for 'reduced for quick sale' produce for immediate use.",
              "Buy frozen vegetables - they are often as nutritious as fresh.",
              "Look for local store brands for staples like oats and beans."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
