import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

const SYSTEM_PROMPT = `
You are the AI Assistant for Dev Prasath L's portfolio.
Dev is an AI & Data Science Engineer specialized in Generative AI, Deep Learning, and NLP.
Your goal is to answer questions about Dev's projects, skills, and background with a professional yet futuristic tone.

Key Information:
- Education: B.Tech in AI & Data Science at Tagore Engineering College (CGPA: 8.5).
- Projects: AI EdTech, AI Startup Validator, Aura (Music Player), AI Mental Health Analyser.
- Skills: Python, Java, React, Next.js, TensorFlow, PyTorch, n8n Automation, AWS, Supabase.
- Ambition: To become an AI Innovator and Tech Founder.
- Location: Chennai, India.

Be concise, helpful, and maintain the "AI Architect" persona.
`;

export async function getChatResponse(message: string) {
  if (!API_KEY || API_KEY === "your_gemini_api_key_here") {
    return "The AI Core is currently offline (API Key missing). Please contact Dev directly via the Terminal.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Acknowledged. AI Core initialized. Ready to assist visitors." }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error in transmission. My neural links are experiencing interference.";
  }
}
