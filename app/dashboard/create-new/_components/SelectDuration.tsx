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

function SelectDuration({
  onUserSelect,
}: {
  onUserSelect: (fieldName: fieldNameType, fieldValue: string) => void;
}) {
  const options = [
    "10 seconds",
    "20 seconds",
    "25 seconds",
    "30 seconds",
    "35 seconds",
    "40 seconds",
    "45 seconds",
    "50 seconds",
    "55 seconds",
    "60 seconds",
  ];
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl text-orange-500">Duration</h2>
      <p className="mt-2 text-gray-500">How long will you want your video</p>
      <Select
        onValueChange={(option: optionType) => {
          option !== "Custom Prompt" && onUserSelect("duration", option);
        }}
      >
        <SelectTrigger className="w-full mt-5 font-medium text-md">
          <SelectValue placeholder="Video duration" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((c, i) => (
            <SelectItem value={c} key={i}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectDuration;
