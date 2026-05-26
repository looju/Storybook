"use client";
import { UserAvatar, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import LiquidEther from "@/components/LiquidEther";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans">
      <div className="fixed inset-0 -z-10">
        <LiquidEther colors={["#FFA500", "#FFB347"]} />
      </div>
      <main className="flex flex-col min-h-screen w-full">
        <Navbar />
        <LandingPage />
      </main>
    </div>
  );
}
