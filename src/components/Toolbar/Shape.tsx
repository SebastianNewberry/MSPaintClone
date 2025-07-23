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
    img: "./icon/shape_line.svg",
    title: "直线",
  },
  {
    type: ShapeToolType.RECT,
    img: "./icon/shape_rect.svg",
    title: "矩形",
  },
  {
    type: ShapeToolType.CIRCLE,
    img: "./icon/shape_circle.svg",
    title: "圆（椭圆）",
  },
  {
    type: ShapeToolType.RHOMBUS,
    img: "./icon/shape_rhombus.svg",
    title: "菱形",
  },
  {
    type: ShapeToolType.TRIANGLE,
    img: "./icon/shape_triangle.svg",
    title: "三角形",
  },
  {
    type: ShapeToolType.PENTAGON,
    img: "./icon/shape_pentagon.svg",
    title: "五边形",
  },
  {
    type: ShapeToolType.SEXANGLE,
    img: "./icon/shape_sexangle.svg",
    title: "六边形",
  },
  {
    type: ShapeToolType.ARROW_TOP,
    img: "./icon/shape_arrowtop.svg",
    title: "上箭头",
  },
  {
    type: ShapeToolType.ARROW_RIGHT,
    img: "./icon/shape_arrowright.svg",
    title: "右箭头",
  },
  {
    type: ShapeToolType.ARROW_DOWN,
    img: "./icon/shape_arrowdown.svg",
    title: "下箭头",
  },
  {
    type: ShapeToolType.ARROW_LEFT,
    img: "./icon/shape_arrowleft.svg",
    title: "左箭头",
  },
  {
    type: ShapeToolType.FOUR_STAR,
    img: "./icon/shape_fourstar.svg",
    title: "四角星",
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
    <div className="relative w-[210px] min-w-[210px]">
      <div className="text-center">
        <div className="inline-flex flex-wrap w-[140px]">
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
        <div className="inline-block ml-[5px] space-y-1 text-left">
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
      </div>
      <div className="absolute bottom-0 w-full text-center">Shape</div>
    </div>
  );
};

export default ShapePanel;
