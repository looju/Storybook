import supabaseClient from "@/configs/supabse";
import { generateSpeech, timestampsToCaptions } from "@speech-sdk/core";
import { createCartesia } from "@speech-sdk/core/providers";
import fs from "fs";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import util from "util";
export async function POST(req: Request) {
  const { text } = await req.json();
  const cartesia = createCartesia({
    apiKey: process.env.CARTESIA_API_KEY,
  });
  const result = await generateSpeech({
    model: cartesia("sonic-3"),
    text: text,
    voice: "e07c00bc-4134-4eae-9ea4-1a55fb45746b",
    output: { format: "mp3" },
    providerOptions: {
      language: "en",
      output_format: {
        encoding: "pcm_s16le",
        sample_rate: 44_100,
      },
    },
    speed: 1,
    timestamps: true,
  });
  const srt = timestampsToCaptions(result.timestamps ?? []);
  const audioBuffer = Buffer.from(result.audio.base64, "base64");
  const fileName = `audio/generated-audios/${randomUUID()}.mp3`;

  const { data, error } = await supabaseClient.storage
    .from("Storybase")
    .upload(fileName, audioBuffer, { contentType: result?.audio?.mediaType });
  if (error) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  console.log("data:", data, "error:", error);
  const { data: urlData } = supabaseClient.storage
    .from("Storybase")
    .getPublicUrl(fileName);

  return NextResponse.json({
    status: "success",
    result: result,
    audioDownloadUrl: urlData?.publicUrl,
    audioStorageMetaData: data,
    srt,
  });
}
