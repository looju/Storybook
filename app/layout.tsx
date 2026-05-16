import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryBook",
  description: "Bring your imagination to life, tell it all!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={playfair.className}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"light"}
            enableSystem
          >
            <Provider>{children}</Provider>
            <Toaster position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
