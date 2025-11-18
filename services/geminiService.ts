
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getWellbeingResponse(userInput: string, topic: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Current topic: ${topic}. User's message: "${userInput}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Gracefully handle the error and return a user-friendly message
    return "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Could you please try asking again in a few moments?";
  }
}
