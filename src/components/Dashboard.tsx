import React, { useState, useEffect } from "react";
import { User, DietPlan, WorkoutPlan, Goal } from "../types";
import { generateDietPlan, generateWorkoutPlan } from "../lib/gemini";
import { 
  Utensils, 
  Dumbbell, 
  TrendingUp, 
  MapPin, 
  Loader2, 
  RefreshCw,
  Search,
  MessageSquare,
  Bell,
  MoreVertical,
  Plus,
  ArrowUpRight,
  Moon,
  Footprints,
  Flame,
  Heart,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DietPlanView from "./DietPlanView";
import WorkoutPlanView from "./WorkoutPlanView";
import ProgressView from "./ProgressView";
import CountryFoodsView from "./CountryFoodsView";

interface DashboardProps {
  user: User;
}

const MetricCard = ({ icon: Icon, label, value, unit, trend, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 flex flex-col justify-between h-full"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-1 mt-1">
          <span className={`text-[10px] font-bold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-[10px] text-slate-400">vs yesterday</span>
        </div>
      </div>
    </div>
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-slate-800">{value}</span>
        <span className="text-slate-400 text-sm font-medium">/{unit}</span>
      </div>
      <div className="mt-4 h-8 flex items-end gap-1">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`w-full rounded-full ${i === 8 ? 'bg-slate-800' : 'bg-slate-100'}`}
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "diet" | "workout" | "progress" | "foods">("overview");
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState<Goal>("Toning");

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const [diet, workout] = await Promise.all([
        generateDietPlan(user.bmi, user.category, user.country),
        generateWorkoutPlan(user.category, goal)
      ]);
      setDietPlan(diet);
      setWorkoutPlan(workout);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [user.id, goal]);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "diet", label: "Diet Plan" },
    { id: "workout", label: "Workout" },
    { id: "foods", label: "Local Foods" },
    { id: "progress", label: "Progress" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === item.id 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-brand-100 overflow-hidden border-2 border-white shadow-sm">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="Avatar" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Good Morning, {user.id.substring(0, 6)} 👋</h1>
                <p className="text-slate-500 font-medium">Stay active and healthy to start your day.</p>
              </div>
              <div className="glass-card bg-brand-50 border-brand-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Worldwide 20km Marathon</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Learn more about this event via links.</p>
                  </div>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard icon={Moon} label="Sleeping Reports" value="7.8" unit="hours" trend={-19.87} color="bg-amber-50 text-amber-500" delay={0.1} />
              <MetricCard icon={Footprints} label="Step Counter" value="8260" unit="step" trend={63.39} color="bg-indigo-50 text-indigo-500" delay={0.2} />
              <MetricCard icon={Flame} label="Calories Burn" value="200" unit="cal" trend={-58.02} color="bg-rose-50 text-rose-500" delay={0.3} />
              <MetricCard icon={Heart} label="Heart Rate Monitor" value="160" unit="bpm" trend={2.87} color="bg-rose-50 text-rose-600" delay={0.4} />
            </div>

            {/* Bento Grid Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Weekly Goals */}
              <div className="lg:col-span-4 glass-card p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                      <Plus className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Your Weekly Goals</h3>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Weight Loss", value: "1kg", target: "120mins", color: "bg-amber-50 text-amber-600" },
                    { label: "Push Up", value: "80", target: "48mins", color: "bg-indigo-50 text-indigo-600" },
                    { label: "Lower Stretch", value: "25", target: "20mins", color: "bg-brand-50 text-brand-600" },
                    { label: "ABS and Stretch", value: "1kg", target: "80mins", color: "bg-emerald-50 text-emerald-600" },
                  ].map((goal, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${goal.color}`}>
                          <Dumbbell className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">{goal.label}</h5>
                          <p className="text-[10px] font-bold text-slate-400">{goal.value} <span className="text-slate-300 font-medium">/{goal.target}</span></p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Courses */}
              <div className="lg:col-span-4 space-y-8">
                <div className="glass-card p-8 bg-brand-50 border-brand-100 relative overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-200">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-2">Popular Courses</h3>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">Fitness For Beginners</h4>
                    <p className="text-sm text-slate-500 font-medium mb-6">1Million people already joined this courses. Here you can <span className="text-slate-900 underline font-bold cursor-pointer">Learn More</span></p>
                    <div className="flex items-center gap-2 mb-8">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">1M+</div>
                      </div>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80" 
                    alt="Fitness" 
                    className="absolute bottom-0 right-0 w-40 h-40 object-contain opacity-20 grayscale"
                  />
                </div>
              </div>

              {/* Popular Trainers */}
              <div className="lg:col-span-4 glass-card p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Our Popular Trainers</h3>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><ArrowUpRight className="w-4 h-4" /></button>
                </div>
                <div className="space-y-6">
                  {[
                    { name: "Richard James", role: "Yoga Expert", exp: "3+years" },
                    { name: "Jenny Wilson", role: "Fitness Expert", exp: "8+years" },
                    { name: "Jacob Jones", role: "Push Up Expert", exp: "4+years" },
                  ].map((trainer, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${trainer.name}`} alt={trainer.name} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800">{trainer.name}</h5>
                          <p className="text-[10px] font-bold text-slate-400">{trainer.role} <span className="text-slate-300 font-medium">/ {trainer.exp}</span></p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-slate-200 transition-colors">Book Now</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Activity */}
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Recommended Activity</h3>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Ultimate Body Workout", desc: "Build you body with proper care and guidelines from our mentor.", expert: "Robert Fox" },
                  { title: "Body Weight Workout", desc: "Build you body with proper care and guidelines from our mentor.", expert: "Jacob Jones" },
                  { title: "Advance Weight Lifting", desc: "Build you body with proper care and guidelines from our mentor.", expert: "Robert Jr." },
                ].map((activity, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-brand-200 transition-all group">
                    <h4 className="text-lg font-extrabold text-slate-800 mb-2">{activity.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">{activity.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-800">{activity.expert}</span>
                      <span className="text-[10px] text-slate-400 font-medium">(Fitness expert)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-500" />
                <p className="animate-pulse font-medium">Crafting your personalized plans using AI...</p>
              </div>
            ) : (
              <>
                {activeTab === "diet" && dietPlan && <DietPlanView plan={dietPlan} />}
                {activeTab === "workout" && workoutPlan && <WorkoutPlanView plan={workoutPlan} />}
                {activeTab === "progress" && <ProgressView user={user} />}
                {activeTab === "foods" && dietPlan && <CountryFoodsView tips={dietPlan.sourcingTips} country={user.country} />}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/>
    </svg>
  );
}

function Zap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14h6l-1 9 10-12h-6l1-9-10 12z"/>
    </svg>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  );
}
