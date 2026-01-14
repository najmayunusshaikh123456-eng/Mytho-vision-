
import { GoogleGenAI, Type } from "@google/genai";
import { MoviePitch } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMythicPitch = async (prompt: string): Promise<MoviePitch> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a high-end cinematic movie pitch for a 3D animated or VFX-heavy feature based on this myth or idea: "${prompt}". Focus on "Ancient Stories, Future Tech" aesthetics.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          logline: { type: Type.STRING },
          visualStyle: { type: Type.STRING },
          mythologicalInspiration: { type: Type.STRING },
          setting: { type: Type.STRING },
        },
        required: ["title", "logline", "visualStyle", "mythologicalInspiration", "setting"],
      },
    },
  });

  return JSON.parse(response.text || '{}') as MoviePitch;
};
