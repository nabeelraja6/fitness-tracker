import React, { useState, useEffect } from "react";
import BMIForm from "./components/BMIForm";
import Dashboard from "./components/Dashboard";
import { User } from "./types";
import { Compass, Leaf, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserId = localStorage.getItem("fitlife_user_id");
    if (savedUserId) {
      fetch(`/api/user/${savedUserId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleOnboardingComplete = async (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("fitlife_user_id", newUser.id);
    
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-4">
          <Compass className="w-12 h-12 text-brand-600 animate-spin" />
          <p className="text-stone-500 font-medium">Loading your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <main className="py-8">
        <AnimatePresence mode="wait">
          {!user ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-4xl mx-auto px-6 text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">FitLife <span className="text-brand-600">Compass</span></span>
                </div>
                <h2 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Your Path to a <span className="text-brand-600 italic">Healthier You</span> Starts Here.
                </h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                  Personalized diet and workout plans, intelligently adapted to your body and location.
                </p>
              </div>
              <BMIForm onComplete={handleOnboardingComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard user={user} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <Compass className="w-5 h-5" />
            <span className="font-bold text-slate-900">FitLife Compass</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            © 2026 FitLife Compass. Empowering healthy lifestyles through intelligent personalization.
          </p>
        </div>
      </footer>
    </div>
  );
}
