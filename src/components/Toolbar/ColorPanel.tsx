import React, { useState } from "react";
import "react-color-palette/css";
import { HexColorPicker } from "react-colorful";

const activeColorTypeCls = "bg-[#bcdbfa] border border-[#a1cefa]";

const colors = [
  { title: "Black", value: "#000000ff" },
  { title: "Gray - 50%", value: "#7f7f7fff" },
  { title: "Dark Red", value: "#880015ff" },
  { title: "Red", value: "#ed1c24ff" },
  { title: "Orange", value: "#ff7f27ff" },
  { title: "Yellow", value: "#fff200ff" },
  { title: "Green", value: "#22b14cff" },
  { title: "Cyan Green", value: "#00a2e8ff" },
  { title: "Blue Cyan", value: "#3f48ccff" },
  { title: "Purple", value: "#a349a4ff" },
  { title: "White", value: "#ffffffff" },
  { title: "Gray - 25%", value: "#c3c3c3ff" },
  { title: "Brown", value: "#b97a57ff" },
  { title: "Rose", value: "#ffaec9ff" },
  { title: "Gold", value: "#ffc90eff" },
  { title: "Light Yellow", value: "#efe4b0ff" },
  { title: "Lime", value: "#b5e61dff" },
  { title: "Olive", value: "#808000ff" },
  { title: "Light Cyan Blue", value: "#99d9eaff" },
  { title: "Blue Gray", value: "#7092beff" },
  { title: "Light Purple", value: "#c8bfe7ff" },
  { title: "Indigo", value: "#4B0082ff" },
  { title: "Dark brown", value: "#654321ff" },
  { title: "Salmon", value: "#ff8c69ff" },
  { title: "Nude", value: "#E3BC9A" },
  { title: "Light Green", value: "#90ee90ff" },
  { title: "Light Blue", value: "#add8e6ff" },
  { title: "Light Gray", value: "#d3d3d3ff" },
];

const ColorPanel = ({
  currentColors,
  selectedColor,
  setSelectedColor,
  setColor,
}: {
  currentColors: string[];
  selectedColor: number;
  setSelectedColor: (index: number) => void;
  setColor: (value: string, index: number) => void;
}) => {
  const [color, setColorState] = useState(
    currentColors[selectedColor] || "#000000"
  );

  const handleColorChange = (newColor: any) => {
    setColorState(newColor);
    setColor(newColor, selectedColor);
  };

  return (
    <div className="flex gap-15">
      {/* Left side: selectors + grid */}
      <div className="flex flex-col justify-content items-center gap-4">
        {/* Color 1 and 2 selectors */}
        <div className="flex gap-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              onClick={() => setSelectedColor(i)}
              className={`flex flex-col items-center justify-center text-center min-w-[60px] p-[5px] border border-transparent cursor-pointer hover:bg-[#d5e3f3] hover:border-[#cbe0f7] ${
                selectedColor === i ? activeColorTypeCls : ""
              }`}
            >
              <div
                className="w-[30px] h-[28px] border border-gray-500"
                style={{ backgroundColor: currentColors[i] }}
              />
              <div>{`Color ${i + 1}`}</div>
            </div>
          ))}
        </div>

        {/* Preset Color Grid */}
        <div className="grid grid-cols-14 gap-[4px] max-w-[180px]">
          {colors.map((colorObj) => (
            <div
              key={colorObj.value}
              title={colorObj.title}
              onClick={() => {
                setColor(colorObj.value, selectedColor);
                setColorState(colorObj.value);
              }}
              className="w-5 h-5 border border-gray-500 cursor-pointer hover:border-[#64a5e7]"
              style={{ backgroundColor: colorObj.value }}
            />
          ))}
        </div>
      </div>

      {/* Right side: Compact Color Picker */}
      <div className="flex flex-col items-center">
        <div className="text-xs text-gray-600 mb-1">Color Picker</div>
        <HexColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default ColorPanel;
