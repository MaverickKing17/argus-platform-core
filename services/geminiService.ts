
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLeadSentiment = async (messageHistory: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following lead conversation and provide a sentiment score (0-100) and a brief summary: ${messageHistory}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            recommendedAction: { type: Type.STRING }
          },
          required: ["score", "summary", "recommendedAction"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};

export const generateTerritoryBriefing = async (district: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide an elite market overview for the ${district} district in Toronto. Focus on high-end trends and investor sentiment. Keep it under 100 words.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini briefing failed:", error);
    return "Market analysis temporarily unavailable.";
  }
};
