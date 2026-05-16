import { AppContextType, VideoDataContextType } from "@/types";
import { createContext, useContext, useState } from "react";

const VideoDataContext = createContext<AppContextType | undefined>(undefined);

export function VideoDataProvider({ children }: { children: React.ReactNode }) {
  const [videoData, setVideoData] = useState<Partial<VideoDataContextType>>({});

  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      {children}
    </VideoDataContext.Provider>
  );
}

export function useVideoDataContext() {
  const context = useContext(VideoDataContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
