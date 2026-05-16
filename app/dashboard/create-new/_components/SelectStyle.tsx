"use client";
import { Image } from "@unpic/react";
import React, { useState } from "react";
import { fieldNameType } from "../page";

function SelectStyle({
  onUserSelect,
}: {
  onUserSelect: (fieldName: fieldNameType, fieldValue: string) => void;
}) {
  const options = [
    {
      name: "Realistic",
      image: "/realistic.jpg",
    },
    {
      name: "Cartoonish",
      image: "/cartoon.jpg",
    },
    {
      name: "Comic",
      image: "/comic.jpg",
    },
    {
      name: "Watercolor",
      image: "/watercolor.jpg",
    },
    {
      name: "Gamey",
      image: "/gamey.jpg",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl text-orange-500">Style</h2>
      <p className="mt-2 text-gray-500">Select your video style</p>
      <div className="grid max-md:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-3 ">
        {options?.map((c, i) => (
          <div
            className={`w-30 md:w-32 relative ${
              selectedOption == c?.name &&
              "border-orange-500 border-2 rounded-sm"
            }`}
            key={i}
          >
            <Image
              src={c?.image}
              alt="style-images"
              layout="fullWidth"
              className="object-cover h-52 w-full rounded-sm transition-all hover:cursor-pointer hover:scale-110"
              onClick={() => {
                setSelectedOption(c?.name);
                onUserSelect("style", c?.name);
              }}
            />
            <h2 className="font-light text-sm text-center absolute bg-[rgba(0,0,0,0.8)] text-white bottom-0 w-full">
              {c?.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
