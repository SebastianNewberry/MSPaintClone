import React from "react";
import { Pencil, Eraser, PaintBucket, Pipette } from "lucide-react";
import { ToolType } from "@/util/tooltype";

const ToolPanel = ({
  toolType,
  setToolType,
}: {
  toolType: ToolType;
  setToolType: (tooltype: ToolType) => void;
}) => {
  const baseClass =
    "cursor-pointer border border-transparent hover:border-blue-400";
  const selectedClass = "bg-blue-200";

  return (
    <div className="w-20 inline-flex flex-col relative">
      <div className="flex justify-between mb-1">
        <span title="铅笔">
          <Pencil
            className={`${baseClass} ${
              toolType === ToolType.PEN ? selectedClass : ""
            }`}
            onClick={() => setToolType(ToolType.PEN)}
          />
        </span>
        <span title="橡皮擦">
          <Eraser
            className={`${baseClass} ${
              toolType === ToolType.ERASER ? selectedClass : ""
            }`}
            onClick={() => setToolType(ToolType.ERASER)}
          />
        </span>
        <span title="填充">
          <PaintBucket
            className={`${baseClass} ${
              toolType === ToolType.COLOR_FILL ? selectedClass : ""
            }`}
            onClick={() => setToolType(ToolType.COLOR_FILL)}
          />
        </span>
      </div>
      <div className="flex justify-between mb-1">
        <span title="颜色选取器">
          <Pipette
            className={`${baseClass} ${
              toolType === ToolType.COLOR_EXTRACT ? selectedClass : ""
            }`}
            onClick={() => setToolType(ToolType.COLOR_EXTRACT)}
          />
        </span>
      </div>
      <div className="w-full text-center absolute bottom-0">工具</div>
    </div>
  );
};

export default ToolPanel;
