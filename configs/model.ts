import {
  GenerateContentConfig,
  GoogleGenAI,
  ThinkingLevel,
  ToolListUnion,
} from "@google/genai";
import Groq from "groq-sdk";

export const aiGen = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const tools: ToolListUnion = [
  {
    googleSearch: {},
  },
];
export const config: GenerateContentConfig = {
  thinkingConfig: {
    thinkingLevel: ThinkingLevel.MEDIUM,
  },
  temperature: 1,
  topK: 64,
  topP: 0.95,
  tools,
  responseMimeType: "application/json",
};
export const model = "gemini-3.1-flash-lite";
export const chatSession = [
  {
    role: "user",
    parts: [
      {
        text: `INSERT_INPUT_HERE`,
      },
    ],
  },
];

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_KEY,
});
export const getGroqChatCompletion = async (content: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a story teller. You write compelling and entertaining stories.
                Respond only with JSON using this format:
                {
                    "ContentText": "The story context",
                    "ImagePrompt": "Prompts that can be used to fenerate images to match the story context, return as an array of prompts";  
               }`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.5,
    max_completion_tokens: 700,
    top_p: 1,
    stop: null,
    stream: false,
  });
};
