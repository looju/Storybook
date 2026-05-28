import { supabaseClient } from "@/configs/supabse";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const model = "@cf/black-forest-labs/flux-2-klein-4b";

    const { imagePrompt } = await req.json();

    const form = new FormData();

    form.append("prompt", imagePrompt);
    form.append("width", "1024");
    form.append("height", "1280");
    form.append("steps", "1");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFARE_API_KEY}`,
        },
        body: form,
      },
    );

    console.log(response, "image response from ai");

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        { error: errorText },
        { status: response.status },
      );
    }

    // Cloudflare returns binary image data
    const arrayBuffer = await response.arrayBuffer();

    const imageBuffer = Buffer.from(arrayBuffer);

    const fileName = `image/generated-images/${uuidv4()}.png`;

    const { data, error } = await supabaseClient.storage
      .from("Storybase")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabaseClient.storage
      .from("Storybase")
      .getPublicUrl(fileName);

    return NextResponse.json({
      result: urlData?.publicUrl,
      imageStorageMetaData: data,
      status: "success",
    });
  } catch (err: any) {
    console.error(err, "error generating image");

    return NextResponse.json(
      { error: err.message || "Failed to generate image" },
      { status: 500 },
    );
  }
}
