import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateDietPlan(bmi: number, category: string, country: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 7-day healthy diet plan for a person with a BMI of ${bmi} (${category}) living in ${country}. 
    Focus on local ingredients available in ${country}. 
    Include breakfast, lunch, dinner, and a snack for each day.
    Provide estimated calories for each meal.
    Also provide 3 localized food sourcing tips for ${country}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          weeklyPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                meals: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, description: "Breakfast, Lunch, Dinner, or Snack" },
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      calories: { type: Type.NUMBER }
                    }
                  }
                }
              }
            }
          },
          sourcingTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateWorkoutPlan(category: string, goal: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 7-day workout plan for a person in the ${category} category with a goal of ${goal}.
    Include exercises, sets, reps, and rest intervals.
    Provide a mix of home and gym options if applicable.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          weeklyPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                focus: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.NUMBER },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      instructions: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
}
