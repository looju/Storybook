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

export type UserDetailContextType = {
  _id: string;
  created_at: string;
  name: string;
  image_url: string;
  email: string;
  subscription: boolean;
  credits: number;
};

export type UserDetailAppContextType = {
  userDetail: Partial<UserDetailContextType>;
  setUserDetail: React.Dispatch<
    React.SetStateAction<Partial<UserDetailContextType>>
  >;
};

export type VideoDataFetchType = {
  _id: string;
  script: VideoScriptData[];
  audio_file_url: string;
  captions: readonly WordTimestamp[] | undefined;
  image_list: string[] | undefined;
  created_by: string;
  user_id: string;
};
