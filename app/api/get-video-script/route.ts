import { aiGen, config, getGroqChatCompletion, model } from "@/configs/model";
import { NextResponse } from "next/server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  for (let i = 0; i < 3; i++) {
    try {
      const { prompt } = await req.json();
      const response = await getGroqChatCompletion(prompt);

      return NextResponse.json({
        result: response?.choices[0]?.message?.content,
      });
    } catch (err: any) {
      if (err?.Error?.status === 429) {
        await sleep(2000); // wait before retry
      } else {
        console.log(err);
        throw err;
      }
    }
  }
}
