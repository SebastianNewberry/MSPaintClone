import React from "react";
import { Undo } from "lucide-react";
import { Redo } from "lucide-react";
import { Trash } from "lucide-react";

const OtherOperator = ({
  clearCanvas,
  undo,
  redo,
}: {
  clearCanvas: () => void;
  undo: () => void;
  redo: () => void;
}) => {
  return (
    <div className="relative w-20">
      <div className="flex justify-between">
        <span
          title="Clear Canvas"
          className="w-6 h-6 border border-transparent cursor-pointer hover:bg-[#d5e3f3] hover:border-[#64a5e7]"
        >
          <Trash onClick={clearCanvas} />
        </span>
        <span
          title="Undo"
          className="w-6 h-6 border border-transparent cursor-pointer hover:bg-[#d5e3f3] hover:border-[#64a5e7]"
        >
          <Undo onClick={undo} />
        </span>
        <span
          title="Redo"
          className="w-6 h-6 border border-transparent cursor-pointer hover:bg-[#d5e3f3] hover:border-[#64a5e7]"
        >
          <Redo onClick={redo} />
        </span>
      </div>
      <span className="absolute bottom-0 w-full text-center">Other</span>
    </div>
  );
};

export default OtherOperator;
