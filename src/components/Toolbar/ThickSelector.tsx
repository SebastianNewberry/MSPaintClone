import React, { useState } from "react";
import { LineWidthType } from "@/util/tooltype";
import { PopoverContent, PopoverTrigger, Popover } from "../ui/popover";
import { Button } from "../ui/button";

const thicks = [
  {
    type: LineWidthType.THIN,
    img: "./icon/thickline1.svg",
    title: "1px",
  },
  {
    type: LineWidthType.MIDDLE,
    img: "./icon/thickline2.svg",
    title: "2px",
  },
  {
    type: LineWidthType.BOLD,
    img: "./icon/thickline3.svg",
    title: "3px",
  },
  {
    type: LineWidthType.MAXBOLD,
    img: "./icon/thickline4.svg",
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
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEle, setAnchorEle] = useState<HTMLImageElement>();

  const onOpen: React.MouseEventHandler<HTMLImageElement> = (event) => {
    setAnchorEle(event.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative mx-[5px] text-center">
      <img
        className="cursor-pointer border border-transparent p-[1.5px] hover:bg-[#d5e3f3] hover:border-[#64a5e7]"
        src="./icon/thickness.svg"
        onClick={onOpen}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 flex flex-col items-start p-2">
          {thicks.map((thick) => (
            <img
              key={thick.img}
              src={thick.img}
              title={thick.title}
              onClick={() => {
                setLineWidthType(thick.type);
                setOpen(false);
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
