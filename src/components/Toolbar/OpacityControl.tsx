import React from "react";

// Define the properties for the OpacityControl component
interface OpacityControlProps {
  opacity: number; // Current opacity value (between 0 and 1)
  setOpacity: (value: number) => void; // Function to update the opacity
}

// Functional component for controlling opacity
function OpacityControl({ opacity, setOpacity }: OpacityControlProps) {
  // Handle changes to the range input (slider)
  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseFloat(event.target.value)); // Update opacity with the new value
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Opacity Control</h3>
      {/* Slider input to control opacity */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={opacity}
        onChange={handleOpacityChange}
      />
      {/* Display the current opacity value */}
      <div>Current Opacity: {opacity}</div>
      {/* Preview box that changes its opacity */}
      <div
        style={{
          width: 100,
          height: 20,
          background: "black",
          margin: "1rem auto",
          opacity: opacity,
        }}
      />
    </div>
  );
}

export default OpacityControl;
