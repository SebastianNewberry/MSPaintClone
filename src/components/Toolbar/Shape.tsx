import React from "react";
import { ShapeOutlineType, ShapeToolType, ToolType } from "@/util/tooltype";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const selectedShapeClass = "selected-shape";

const shapes = [
  {
    type: ShapeToolType.LINE,
    img: "icons/shape_line.svg",
    title: "Line",
  },
  {
    type: ShapeToolType.RECT,
    img: "icons/shape_rect.svg",
    title: "Rectangle",
  },
  {
    type: ShapeToolType.CIRCLE,
    img: "icons/shape_circle.svg",
    title: "Circle",
  },
  {
    type: ShapeToolType.RHOMBUS,
    img: "icons/shape_rhombus.svg",
    title: "Rhombus",
  },
  {
    type: ShapeToolType.TRIANGLE,
    img: "icons/shape_triangle.svg",
    title: "Triangle",
  },
  {
    type: ShapeToolType.PENTAGON,
    img: "icons/shape_pentagon.svg",
    title: "Pentagon",
  },
  {
    type: ShapeToolType.SEXANGLE,
    img: "icons/shape_sexangle.svg",
    title: "Sexangle",
  },
  {
    type: ShapeToolType.ARROW_TOP,
    img: "icons/shape_arrowtop.svg",
    title: "Arrowtop",
  },
  {
    type: ShapeToolType.ARROW_RIGHT,
    img: "icons/shape_arrowright.svg",
    title: "Arrowright",
  },
  {
    type: ShapeToolType.ARROW_DOWN,
    img: "icons/shape_arrowdown.svg",
    title: "Arrowdown",
  },
  {
    type: ShapeToolType.ARROW_LEFT,
    img: "icons/shape_arrowleft.svg",
    title: "Arrowleft",
  },
  {
    type: ShapeToolType.FOUR_STAR,
    img: "icons/shape_fourstar.svg",
    title: "Fourstar",
  },
];

const ShapePanel = ({
  toolType,
  shapeOutlineType,
  shapeType,
  setToolType,
  setShapeOutlineType,
  setShapeType,
}: {
  toolType: ToolType;
  shapeOutlineType: ShapeOutlineType;
  shapeType: ShapeToolType;
  setToolType: (type: ToolType) => void;
  setShapeOutlineType: (type: ShapeOutlineType) => void;
  setShapeType: (type: ShapeToolType) => void;
}) => {
  return (
    <div className="relative w-[220px] min-w-[220px]">
      <div className="">
        <div className="flex text-center">
          <div className="flex justify-center items-center flex-wrap w-[140px] m-auto">
            {shapes.map((shape) => (
              <img
                src={shape.img}
                key={shape.img}
                title={shape.title}
                className={`m-[2px] h-6 w-6 cursor-pointer border border-transparent hover:border-[#64a5e7] ${
                  shapeType === shape.type && toolType === ToolType.SHAPE
                    ? "bg-[#c9e0f7]"
                    : ""
                }`}
                onClick={() => {
                  setShapeType(shape.type);
                  setToolType(ToolType.SHAPE);
                }}
              />
            ))}
          </div>
          <div className="">
            <label className="text-sm font-medium">Shape Outline</label>
            <Select
              value={shapeOutlineType}
              onValueChange={(value) =>
                setShapeOutlineType(value as ShapeOutlineType)
              }
              disabled={toolType !== ToolType.SHAPE}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Outline Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ShapeOutlineType.SOLID}>Solid</SelectItem>
                <SelectItem value={ShapeOutlineType.DOTTED}>Dotted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="absolute bottom-0 w-full text-center">Shape</div>
        </div>
      </div>
    </div>
  );
};

export default ShapePanel;
