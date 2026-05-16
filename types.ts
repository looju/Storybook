import { SpeechResult, WordTimestamp } from "@speech-sdk/core/types";

export type UserFormData = {
  topic: string;
  style: string;
  duration: string;
};

export type VideoScriptData = {
  ContentText?: string;
  ImagePrompt?: string;
};

export type TimestampData = {
  text: string;
  start: number;
  end: number;
};

export type GenerateVideoScriptData = {
  result: VideoScriptData[];
};

export type AudioResultType = {
  status: string;
  result: SpeechResult;
  audioDownloadUrl: string;
  srt: string;
  audioStorageMetaData: {
    id: string;
    path: string;
    fullPath: string;
  };
};

export type ImageResultType = {
  status: string;
  result: string;
  imageStorageMetaData: {
    id: string;
    path: string;
    fullPath: string;
  };
};

export type fieldNameType = "duration" | "style" | "topic";

export type VideoDataContextType = {
  videoScript: VideoScriptData[];
  captions: readonly WordTimestamp[] | undefined;
  audioUrl: string;
  imageFiles: string[];
};

export type AppContextType = {
  videoData: Partial<VideoDataContextType>;
  setVideoData: React.Dispatch<
    React.SetStateAction<Partial<VideoDataContextType>>
  >;
};
