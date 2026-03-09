export interface User {
  id: string;
  height: number;
  weight: number;
  bmi: number;
  category: string;
  country: string;
}

export interface Meal {
  type: string;
  name: string;
  description: string;
  calories: number;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface DietPlan {
  weeklyPlan: DayPlan[];
  sourcingTips: string[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  weeklyPlan: WorkoutDay[];
}

export type Goal = "Fat Loss" | "Toning" | "Muscle Building";
