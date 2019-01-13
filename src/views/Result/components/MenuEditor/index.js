import React, { useState } from "react";
import classnames from "classnames";
import { SketchPicker } from "react-color";

import RangeSlider from "./components/RangeSlider";

const MenuEditor = ({
  selectedColor,
  setSelectedColor,
  setDeviceSize,
  rangePaddingSliderValue,
  setRangePaddingSliderValue,
  rangeBorderSliderValue,
  setRangeBorderSliderValue,
  icons
}) => {
  const [viewColorPicker, setViewColorPicker] = useState(false);
  const [isIconSelected, setIsIconSelected] = useState("desktop");

  const handleSizeChange = icon => {
    setIsIconSelected(icon.name);
    setDeviceSize(icon.dimensions);
  };

  const renderSizeChoices = () => {
    return icons.map(icon => {
      return (
        <div
          key={icon.name}
          onClick={() => handleSizeChange(icon)}
          className={classnames(
            "size-option",
            isIconSelected === icon.name ? "selected-size" : ""
          )}
        >
          <p className="tc f6 size-icon-label">{icon.name.toUpperCase()}</p>
          <i className={icon.class} />
        </div>
      );
    });
  };

  return (
    <div className="menu">
      <p>Styling</p>
      <div
        className="swatch"
        onClick={() => setViewColorPicker(!viewColorPicker)}
      >
        <div className="swatch-color" style={{ background: selectedColor }} />
      </div>
      {viewColorPicker && (
        <SketchPicker
          className="color-picker"
          color={selectedColor}
          onChange={color => setSelectedColor(color.hex)}
        />
      )}
      <div className="image-size">{renderSizeChoices()}</div>
      <p>Background Padding</p>
      <RangeSlider
        rangeSliderValue={rangePaddingSliderValue}
        setRangeSliderValue={setRangePaddingSliderValue}
      />
      <p>Background Radius</p>
      <RangeSlider
        rangeSliderValue={rangeBorderSliderValue}
        setRangeSliderValue={setRangeBorderSliderValue}
      />
      <p>File Type</p>
      <select name="file-type">
        <option value="PNG">PNG</option>
        <option value="JPEG">JPEG</option>
      </select>
      <button className="download-button">Download</button>
    </div>
  );
};

export default MenuEditor;
