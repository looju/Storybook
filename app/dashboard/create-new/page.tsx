"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import CustomLoading from "./_components/CustomLoading";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  AudioResultType,
  fieldNameType,
  GenerateVideoScriptData,
  ImageResultType,
  TimestampData,
  UserFormData,
  VideoDataContextType,
  VideoScriptData,
} from "@/types";
import { useVideoDataContext } from "@/app/_context/videoDataContext";
import { WordTimestamp } from "@speech-sdk/core/types";
import { supabaseBrowserClient } from "@/configs/supabse";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/router";
import { useUserDetailContext } from "@/app/_context/UserDetailContext";

const script = [
  {
    ContentText: "Hello world",
    ImagePrompt: "A busy market place, rainy weather",
  },
];
function CreateNew() {
  const [formData, setFormData] = useState<Partial<UserFormData>>({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState<VideoScriptData[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [captions, setCaptions] = useState<
    readonly WordTimestamp[] | undefined
  >([]);
  const [imageList, setImageList] = useState<string[]>();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { videoData, setVideoData } = useVideoDataContext();
  const { userDetail, setUserDetail } = useUserDetailContext();
  const user = useUser();

  const onHandleInputChange = (
    fieldName: fieldNameType,
    fieldValue: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GetVideoScript = async () => {
    setLoading(true);
    if (!formData?.duration) {
      toast.info("You have to select a duration for the video");
      setLoading(false);
      return;
    }
    if (!formData?.style) {
      toast.info("You have to select a graphical style for the video");
      setLoading(false);
      return;
    }
    if (!formData?.topic) {
      toast.info("You have to give a topic for the video");
      setLoading(false);
      return;
    }

    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} story along with AI image prompt in ${formData.style} format for each scene and give me fesult in JSON format with imagePrompt and ContentText as field, no plain text.Maximum number of characters is 350 and add emotion tags like this:[happy],[sad],[angry]`;
    await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((res: AxiosResponse<GenerateVideoScriptData>) => {
        setVideoScript(res?.data?.result);
        setVideoData((prev) => ({
          ...prev,
          videoScript: res?.data?.result,
        }));
        generateAudioFile(res?.data?.result);
        generateImage(res?.data?.result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e, "error");
        setLoading(false);
      });
    setLoading(false);
  };

  const generateAudioFile = async (videoResult: VideoScriptData[]) => {
    const id = uuidv4();
    let script = "";
    videoResult.forEach((item) => {
      script = script + item?.ContentText + " ";
    });
    await axios
      .post("/api/generate-audio", {
        id,
        text: script,
      })
      .then((res: AxiosResponse<AudioResultType>) => {
        setAudioFileUrl(res.data?.audioDownloadUrl);
        setCaptions(res?.data?.result?.timestamps);
        setVideoData((prev) => ({
          ...prev,
          audioUrl: res?.data?.audioDownloadUrl,
          captions: res?.data?.result?.timestamps,
        }));
      })
      .catch((e) => {
        console.log("error generating audio file:", e);
      });
  };

  const generateImage = async (videoResult: VideoScriptData[]) => {
    setLoading(true);
    let images: string[] = [];
    for (const item of videoResult) {
      await axios
        .post("/api/generate-image", {
          imagePrompt: item?.ImagePrompt,
        })
        .then((res: AxiosResponse<ImageResultType>) => {
          console.log("response:", res);
          images.push(res?.data?.result);
        })
        .catch((e) => {
          console.log("error generating images:", e);
          setLoading(false);
        });
    }
    setImageList(images);
    setVideoData((prev) => ({
      ...prev,
      imageFiles: images,
    }));
    setLoading(false);
  };

  const saveVideoToDb = async (videoData: Partial<VideoDataContextType>) => {
    setLoading(true);
    const videoId = uuidv4();
    const { data, error } = await supabaseBrowserClient
      .from("VideoData")
      .insert([
        {
          _id: videoId,
          script: videoScript,
          audio_file_url: audioFileUrl,
          captions,
          image_list: imageList,
          created_by: `${user?.user?.fullName}--${user?.user?.emailAddresses[0]?.emailAddress}`,
          user_id: `${user?.user?.id}`,
        },
      ])
      .select();

    if (error) {
      console.log("Error:", error.message);
    } else {
      console.log("Inserted:", data);
      await updateUserCredits();
      setVideoId(videoId);
      setPlayVideo(true);
    }
  };

  const updateUserCredits = async () => {
    const { data, error } = await supabaseBrowserClient
      .from("Users")
      .update({
        credits: userDetail?.credits! - 10,
      })
      .eq("_id", userDetail?._id)
      .select();
    if (error) {
      console.log("error updating user credits:", error);
    } else {
      setUserDetail((prev) => ({
        ...prev,
        credits: userDetail?.credits! - 10,
      }));
      setVideoData({});
      console.log(data, "updatted user credits");
    }
  };

  useEffect(() => {
    if (Object.keys(videoData)?.length === 4) {
      saveVideoToDb(videoData);
    }
  }, [videoData]);

  const onClickButtonHandler = () => {
    if (userDetail && userDetail?.credits! > 0) {
      GetVideoScript();
    } else {
      toast.error("You do not have enough credits to create a new video");
    }
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-3xl text-orange-500 text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* create button */}
        <Button
          className="mt-10 w-full bg-orange-500"
          onClick={onClickButtonHandler}
        >
          Create Short Video
        </Button>
        <Button
          className="mt-10 w-full bg-orange-500"
          onClick={() =>
            // generateAudioFile([
            //   {
            //     ContentText: "Test test",
            //     ImagePrompt: "Hello",
            //   },
            // ])
            generateImage(script)
          }
        >
          Create Short Audio
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
}

export default CreateNew;
