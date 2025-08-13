import React, { useState } from "react";
import { Input } from "../ui/input";

interface ImageSizeInputProps {
  width: number;
  height: number;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  xpos: number;
  ypos: number;
  setXPos: (value: number) => void;
  setYPos: (value: number) => void;
}

const ImageSizeInput: React.FC<ImageSizeInputProps> = ({
  width,
  height,
  setWidth,
  setHeight,
  xpos,
  ypos,
  setXPos,
  setYPos,
}) => {
  return (
    <div>
      <h1 className="text-sm text-center">Paste Image</h1>
      <div className="flex gap-2">
        <div className="flex flex-col">
          <label className="text-sm">Width:</label>
          <Input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
          <label className="text-sm">Height:</label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">X Position:</label>
          <Input
            type="number"
            value={xpos}
            onChange={(e) => setXPos(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
          <label className="text-sm">Y Position:</label>
          <Input
            type="number"
            value={ypos}
            onChange={(e) => setYPos(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSizeInput;
