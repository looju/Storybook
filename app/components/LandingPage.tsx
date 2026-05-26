"use client";
import React from "react";
import { Aclonica, Labrada } from "next/font/google";
import Image from "next/image";
import ParticleBackground from "./Particles";
import Marquee from "react-fast-marquee";
import LiquidChrome from "@/components/LiquidChrome";

const LabradaFont = Labrada({ subsets: ["latin"] });
function LandingPage() {
  const images = [
    "/social.png",
    "/meta.png",
    "/google.png",
    "/stripe.png",
    "/ebay.png",
    "/dropbox.png",
  ];

  return (
    <div className="pt-10 md:pt-24 px-12 flex justify-center gap-10">
      <div className="w-full md:w-1/2">
        <h1
          className={`font-bold text-2xl md:text-5xl leading-normal uppercase`}
        >
          Turn simple ideas into high-quality short videos using AI.
        </h1>
        <div className="flex flex-col gap-4 mt-5">
          <h1 className={`font-medium leading-6 ${LabradaFont.className}`}>
            Creating engaging video content shouldn’t take all day. But for most
            people, it still means juggling editing tools, timelines, effects,
            and endless adjustments just to get something that looks decent. We
            changed that. Now you can go from idea to finished video in minutes
            — with AI handling the heavy lifting for you.
          </h1>
          <h1 className={`font-medium leading-6 ${LabradaFont.className}`}>
            Our AI understands your prompt and instantly generates
            scroll-stopping short videos designed for platforms like TikTok,
            Instagram Reels, and YouTube Shorts. You focus on the idea. We
            handle the visuals, pacing, and storytelling. Fast, simple, and
            built for creators who want to move at speed.
          </h1>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <h1 className="text-lg font-semibold">
            Trusted and used by teams at the best companies
          </h1>
          <Marquee pauseOnHover pauseOnClick play autoFill>
            {images?.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={50}
                height={50}
                alt="company-logo"
                className="rounded-sm mr-3"
              />
            ))}
          </Marquee>
        </div>
      </div>
      <div className="max-sm:hidden items-end">
        <Image
          src={"/landing-splash.jpg"}
          alt="landing-splash-image"
          width={600}
          height={400}
          className="w-full rounded-sm"
        />
      </div>
    </div>
  );
}

export default LandingPage;
