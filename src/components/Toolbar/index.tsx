// Toolbar.tsx

import React, { useContext, useEffect, useRef, useState } from "react";
import ToolPanel from "@/components/Toolbar/Tool";
import ShapePanel from "@/components/Toolbar/Shape";
import { Separator } from "@/components/ui/separator";
import ThickSelector from "@/components/Toolbar/ThickSelector";
import ColorPanel from "@/components/Toolbar/ColorPanel";
import OtherOperator from "@/components/Toolbar/Other";
import Opacity from "@/components/Toolbar/OpacityControl";
import {
  ToolType,
  ShapeToolType,
  ShapeOutlineType,
  ColorType,
  LineWidthType,
} from "@/util/tooltype";
import { Tool, ColorExtract, ColorFill, Pen, Eraser } from "@/util/tool";
import Shape from "@/util/tool/shape";
import Snapshot from "@/util/snapshot";
import { Button } from "@/components/ui/button";

const Toolbar = () => {
  const [toolType, setToolType] = useState<ToolType>(ToolType.PEN);
  const [shapeType, setShapeType] = useState<ShapeToolType>(ShapeToolType.LINE);
  const [shapeOutlineType, setShapeOutlineType] = useState<ShapeOutlineType>(
    ShapeOutlineType.SOLID
  );
  const [lineWidthType, setLineWidthType] = useState<LineWidthType>(
    LineWidthType.THIN
  );
  const [activeColorType, setActiveColorType] = useState<ColorType>(
    ColorType.MAIN
  );
  const [colors, setColors] = useState<string[]>(["#000000ff", "#ffffffff"]);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [tool, setTool] = useState<Tool>();
  const canvasRef = useRef<HTMLCanvasElement[]>([]);
  const [snapshot] = useState<Snapshot>(new Snapshot());
  const [opacity, setOpacityValue] = useState<number>(1);
  const [selectedCanvas, setSelectedCanvas] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<number>(0);
  const initializedCanvases = useRef<Set<number>>(new Set());

  const setOpacity = (opacity: number) => {
    setOpacityValue(opacity);
    Tool.opacity = opacity;
  };

  const changeSelectedCanvas = (index: number) => {
    setSelectedCanvas(index);
  };

  const setColor = (value: string, index: number) => {
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = value;
      Tool.mainColor = value;
      return newColors;
    });
  };

  const colorSwitch = (selectedColor: number) => {
    setSelectedColor(selectedColor);
    Tool.mainColor = colors[selectedColor];
  };

  const clearEvent = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      });
    }
  };

  const redoEvent = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imageData = snapshot.forward();
          if (imageData) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
          }
        }
      });
    }
  };

  const undoEvent = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imageData = snapshot.back();
          if (imageData) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
          }
        }
      });
    }
  };

  useEffect(() => {
    switch (toolType) {
      case ToolType.PEN:
        setTool(new Pen());
        break;
      case ToolType.ERASER:
        setTool(new Eraser());
        break;
      case ToolType.COLOR_EXTRACT:
        setTool(new ColorExtract(setColor));
        break;
      case ToolType.COLOR_FILL:
        setTool(new ColorFill());
        break;
      case ToolType.SHAPE:
        setTool(
          new Shape(shapeType, shapeOutlineType === ShapeOutlineType.DOTTED)
        );
        break;
      default:
        break;
    }
  }, [toolType, shapeType]);

  useEffect(() => {
    if (tool instanceof Shape) {
      tool.isDashed = shapeOutlineType === ShapeOutlineType.DOTTED;
    }
  }, [shapeOutlineType]);

  useEffect(() => {
    switch (lineWidthType) {
      case LineWidthType.THIN:
        Tool.lineWidthFactor = 1;
        break;
      case LineWidthType.MIDDLE:
        Tool.lineWidthFactor = 2;
        break;
      case LineWidthType.BOLD:
        Tool.lineWidthFactor = 3;
        break;
      case LineWidthType.MAXBOLD:
        Tool.lineWidthFactor = 4;
        break;
      default:
        break;
    }
  }, [lineWidthType]);

  useEffect(() => {
    let canvas = canvasRef.current;
    if (canvas) {
      const currentCanvas = canvas[selectedCanvas];
      if (!initializedCanvases.current.has(selectedCanvas)) {
        currentCanvas.height = currentCanvas.clientHeight;
        currentCanvas.width = currentCanvas.clientWidth;
      }

      Tool.ctx = currentCanvas.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;

      const ctx = currentCanvas.getContext("2d", { willReadFrequently: true });

      if (ctx && !initializedCanvases.current.has(selectedCanvas)) {
        snapshot.add(
          ctx.getImageData(0, 0, currentCanvas.width, currentCanvas.height)
        );
        initializedCanvases.current.add(selectedCanvas);
      }

      window.addEventListener("resize", () => {
        const canvasData = Tool.ctx.getImageData(
          0,
          0,
          currentCanvas.width,
          currentCanvas.height
        );
        currentCanvas.height = currentCanvas.clientHeight;
        currentCanvas.width = currentCanvas.clientWidth;
        Tool.ctx = currentCanvas.getContext("2d") as CanvasRenderingContext2D;
        Tool.ctx.putImageData(canvasData, 0, 0);
      });
    }
  }, [canvasRef, selectedCanvas]);

  const onMouseDown = (event: MouseEvent) => {
    if (tool instanceof ColorExtract) {
      tool.onMouseDown(event, selectedColor);
    } else if (tool) {
      tool.onMouseDown(event);
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (tool) {
      tool.onMouseMove(event);
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    if (tool) {
      tool.onMouseUp(event);
      snapshot.add(
        Tool.ctx.getImageData(
          0,
          0,
          Tool.ctx.canvas.width,
          Tool.ctx.canvas.height
        )
      );
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    if (tool instanceof ColorExtract) {
      tool.onTouchStart(event, selectedColor);
    } else if (tool) {
      tool.onTouchStart(event);
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    if (tool) {
      tool.onTouchMove(event);
    }
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (tool) {
      tool.onTouchEnd(event);
    }
    snapshot.add(
      Tool.ctx.getImageData(0, 0, Tool.ctx.canvas.width, Tool.ctx.canvas.height)
    );
  };

  const setCanvasRef = (el: HTMLCanvasElement | null, index: number) => {
    if (canvasRef.current) {
      if (el) {
        canvasRef.current[index] = el;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.forEach((canvas) => {
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("touchstart", onTouchStart);
        canvas.addEventListener("touchmove", onTouchMove);
        canvas.addEventListener("touchend", onTouchEnd);
      });

      return () => {
        canvas.forEach((canvas) => {
          canvas.removeEventListener("mousedown", onMouseDown);
          canvas.removeEventListener("mousemove", onMouseMove);
          canvas.removeEventListener("mouseup", onMouseUp);
          canvas.removeEventListener("touchstart", onTouchStart);
          canvas.removeEventListener("touchmove", onTouchMove);
          canvas.removeEventListener("touchend", onTouchEnd);
        });
      };
    }
  }, [canvasRef, onMouseDown, onMouseMove, onMouseUp]);

  const saveCanvasAsImage = () => {
    const [canvas0, canvas1] = canvasRef.current;

    if (!canvas0 || !canvas1) return;

    const width = canvas0.width;
    const height = canvas0.height;

    const mergedCanvas = document.createElement("canvas");
    mergedCanvas.width = width;
    mergedCanvas.height = height;
    const ctx = mergedCanvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(canvas0, 0, 0);
    ctx.drawImage(canvas1, 0, 0);

    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = mergedCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div className="flex h-[150px] bg-[#f5f6f7] p-[10px] overflow-auto shrink-0 gap-[65px]">
        <ToolPanel toolType={toolType} setToolType={setToolType} />
        <Separator orientation="vertical" />
        <ShapePanel
          toolType={toolType}
          setToolType={setToolType}
          shapeType={shapeType}
          setShapeType={setShapeType}
          shapeOutlineType={shapeOutlineType}
          setShapeOutlineType={setShapeOutlineType}
        />
        <Separator orientation="vertical" />
        <Opacity opacity={opacity} setOpacity={setOpacity} />
        <Separator orientation="vertical" />
        <ThickSelector
          lineWidthType={lineWidthType}
          setLineWidthType={setLineWidthType}
        />
        <Separator orientation="vertical" />
        <ColorPanel
          currentColors={colors}
          setSelectedColor={colorSwitch}
          setColor={setColor}
          selectedColor={selectedColor}
        />
        <Separator orientation="vertical" />
        <OtherOperator
          clearCanvas={clearEvent}
          undo={undoEvent}
          redo={redoEvent}
        />
      </div>

      <div className="relative w-full h-[50vh] m-5">
        <canvas
          ref={(el) => setCanvasRef(el, 0)}
          className={`absolute top-0 left-0 w-full h-full shadow-lg transition-all z-10 ${
            isHidden !== 0 ? "hidden" : ""
          }`}
        />
        <canvas
          ref={(el) => setCanvasRef(el, 1)}
          className={`absolute top-0 left-0 w-full h-full shadow-lg transition-all z-0 ${
            isHidden !== 0 ? "hidden" : ""
          }`}
        />
      </div>

      <div className="flex gap-2 justify-center mt-4">
        <Button onClick={() => changeSelectedCanvas(0)}>Layer 0</Button>
        <Button onClick={() => changeSelectedCanvas(1)}>Layer 1</Button>
        <Button onClick={() => setIsHidden((prev) => (prev === 1 ? 0 : 1))}>
          Toggle Layer Visibility
        </Button>
        <Button onClick={saveCanvasAsImage}>Save Art</Button>
      </div>
    </div>
  );
};

export default Toolbar;
