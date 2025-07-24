import React, { useState } from "react";
import { LineWidthType } from "@/util/tooltype";
import { PopoverContent, PopoverTrigger, Popover } from "../ui/popover";
import { Button } from "../ui/button";

const thicks = [
  {
    type: LineWidthType.THIN,
    img: "icons/thickline1.svg",
    title: "1px",
  },
  {
    type: LineWidthType.MIDDLE,
    img: "icons/thickline2.svg",
    title: "2px",
  },
  {
    type: LineWidthType.BOLD,
    img: "icons/thickline3.svg",
    title: "3px",
  },
  {
    type: LineWidthType.MAXBOLD,
    img: "icons/thickline4.svg",
    title: "4px",
  },
];

const ThickSelector = ({
  lineWidthType,
  setLineWidthType,
}: {
  lineWidthType: LineWidthType;
  setLineWidthType: (lineWidth: LineWidthType) => void;
}) => {
  return (
    <div className="relative mx-[5px] text-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Select Thickness</Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit flex flex-col items-start p-2">
          {thicks.map((thick) => (
            <img
              key={thick.img}
              src={thick.img}
              title={thick.title}
              onClick={() => {
                setLineWidthType(thick.type);
              }}
              className={`w-[66px] h-[15px] my-[5px] cursor-pointer px-[5px] ${
                thick.type === lineWidthType ? "bg-[#c9e0f7]" : ""
              }`}
            />
          ))}
        </PopoverContent>
      </Popover>
      <div className="absolute bottom-0 w-full">Thick Selector</div>
    </div>
  );
};

export default ThickSelector;
