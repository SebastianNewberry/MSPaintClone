import React, { useState, useEffect } from "react";
import { ColorType } from "@/util/tooltype";
import { ColorPicker, useColor, IColor } from "react-color-palette";
import "react-color-palette/css";

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
];

// Helper function to convert hex string to IColor/Color object
const hexToColor = (hex: string): IColor => {
  // Ensure hex is in the format #RRGGBB or #RRGGBBAA
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
  const isEightDigit = cleanHex.length === 8;
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const a = isEightDigit ? parseInt(cleanHex.slice(6, 8), 16) / 255 : 1;

  // Convert RGB to HSV (simplified, you can use a library like 'color-convert' for accuracy)
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const v = max;

  if (max !== min) {
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === rNorm) h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
    else if (max === gNorm) h = (bNorm - rNorm) / d + 2;
    else h = (rNorm - gNorm) / d + 4;
    h /= 6;
  }

  return {
    hex: `#${cleanHex.slice(0, 6)}`, // Store 6-digit hex
    rgb: { r, g, b, a },
    hsv: { h: h * 360, s, v, a },
  };
};

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
  // Initialize useColor with the selected color
  const [color, setColorState] = useColor(
    currentColors[selectedColor] || "#000000ff"
  );

  // Sync the color state when selectedColor changes
  useEffect(() => {
    const selectedColorValue = currentColors[selectedColor] || "#000000ff";
    setColorState(hexToColor(selectedColorValue));
  }, [selectedColor, currentColors]);

  // Handle color change from ColorPicker
  const handleColorChange = (newColor: IColor) => {
    setColorState(newColor); // Update react-color-palette's internal state
    // Convert IColor to 8-digit hex string for parent
    const hexWithAlpha = `${newColor.hex}${Math.round(newColor.rgb.a * 255)
      .toString(16)
      .padStart(2, "0")}`;
    setColor(hexWithAlpha, selectedColor);
  };

  return (
    <div className="relative">
      <div className="flex">
        {/* Color Selection Boxes */}
        <div className="flex">
          <div
            onClick={() => setSelectedColor(0)}
            className={`flex flex-col items-center justify-center text-center min-w-[60px] mx-[5px] p-[5px] border border-transparent cursor-pointer hover:bg-[#d5e3f3] hover:border-[#cbe0f7] ${
              selectedColor === 0 ? activeColorTypeCls : ""
            }`}
          >
            <div
              className="w-[32px] h-[32px] border border-gray-500 p-[1px]"
              style={{ backgroundColor: currentColors[0] }}
            />
            <div>Color 1</div>
          </div>
          <div
            onClick={() => setSelectedColor(1)}
            className={`flex flex-col items-center justify-center text-center min-w-[60px] mx-[5px] p-[5px] border border-transparent cursor-pointer hover:bg-[#d5e3f3] hover:border-[#cbe0f7] ${
              selectedColor === 1 ? activeColorTypeCls : ""
            }`}
          >
            <div
              className="w-[28px] h-[28px] m-[2px] border border-gray-500 p-[1px]"
              style={{ backgroundColor: currentColors[1] }}
            />
            <div>Color 2</div>
          </div>
        </div>

        {/* Color Grid */}
        <div className="flex flex-wrap w-[155px]">
          {colors.map((color) => (
            <div
              key={color.value}
              title={color.title}
              onClick={() => {
                setColor(color.value, selectedColor); // Update parent state
                setColorState(hexToColor(color.value)); // Update ColorPicker state
              }}
              className="w-5 h-5 m-[1px] border border-gray-500 cursor-pointer hover:border-[#64a5e7]"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>

        {/* Color Picker */}
        <div className="ml-[10px] w-[45px] text-center">
          {/* <ColorPicker color={color} onChange={handleColorChange} /> */}
          <div className="text-xs mt-1">Color Picker</div>
        </div>
      </div>

      {/* Title at Bottom */}
      <div className="absolute bottom-0 w-full text-center">Colors</div>
    </div>
  );
};

export default ColorPanel;
