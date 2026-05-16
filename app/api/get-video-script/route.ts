import { aiGen, config, model } from "@/configs/model";
import { NextResponse } from "next/server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  for (let i = 0; i < 3; i++) {
    try {
      const { prompt } = await req.json();
      console.log(prompt, "prompt from client");
      const response = await aiGen.models.generateContentStream({
        model: model,
        config: config,
        contents: prompt,
      });
      let fileIndex = 0;
      let text = "";
      for await (const chunk of response) {
        text += chunk?.text ?? "";
        return NextResponse.json({
          result: JSON.parse(text?.length > 0 ? text : "No response yet"),
        });
      }
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
