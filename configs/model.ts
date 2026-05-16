// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GenerateContentConfig,
  GoogleGenAI,
  ThinkingLevel,
  ToolListUnion,
} from "@google/genai";

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

// const response = await ai.models.generateContentStream({
//   model,
//   config,
//   contents,
// });
// let fileIndex = 0;
// for await (const chunk of response) {
//   console.log(chunk.text);
// }
