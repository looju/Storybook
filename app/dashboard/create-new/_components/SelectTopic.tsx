"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { optionType } from "@/.next/types/layout";
import { fieldNameType } from "@/types";
function SelectTopic({
  onUserSelect,
}: {
  onUserSelect: (fieldName: fieldNameType, fieldValue: string) => void;
}) {
  const options = [
    "Comic",
    "Custom Prompt",
    "Romance",
    "Horror",
    "Sad",
    "Suspense",
  ];
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div>
      <h2 className="font-bold text-xl text-orange-500">Content</h2>
      <p className="mt-2 text-gray-500">How will you want your video</p>
      <Select
        onValueChange={(option: optionType) => {
          setSelectedOption(option);
          option !== "Custom Prompt" && onUserSelect("topic", option);
        }}
      >
        <SelectTrigger className="w-full mt-5 font-medium text-md">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((c, i) => (
            <SelectItem value={c} key={i}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOption == "Custom Prompt" && (
        <Textarea
          placeholder="Type a description of the video"
          className="mt-5"
          onChange={(e) => onUserSelect("topic", e?.target?.value)}
        />
      )}
    </div>
  );
}

export default SelectTopic;
