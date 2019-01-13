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
  browserStyling,
  setBrowserStyling,
  icons,
  browserOptions
}) => {
  const [viewColorPicker, setViewColorPicker] = useState(false);
  const [isIconSelected, setIsIconSelected] = useState("desktop");

  const handleSizeChange = icon => {
    setIsIconSelected(icon.name);
    setDeviceSize(icon.dimensions);
  };

  const handleBrowserStylingChange = icon => {
    setViewColorPicker(false);
    setBrowserStyling(icon.name);
  };

  const handleColorOption = (noneSelected = false) => {
    if (noneSelected) {
      setViewColorPicker(false);
      setSelectedColor("transparent");
    } else {
      setViewColorPicker(!viewColorPicker);
    }
  };

  const renderIconList = (icons, selectedState, callback) => {
    return icons.map(icon => {
      return (
        <div
          key={icon.name}
          onClick={() => callback(icon)}
          className={classnames(
            "size-option",
            selectedState === icon.name ? "selected-size" : ""
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
      <p className="option-title">Background Color</p>
      <div className="icon-wrapper">
        <div
          className={classnames(
            "size-option",
            viewColorPicker || selectedColor !== "transparent"
              ? "selected-size"
              : ""
          )}
          onClick={() => handleColorOption(false)}
        >
          <p className="tc f6 size-icon-label">Color Picker</p>
          <div className="swatch">
            <div
              className="swatch-color"
              style={{ background: selectedColor }}
            />
          </div>
        </div>
        <div
          className={classnames(
            "size-option",
            !viewColorPicker && selectedColor === "transparent"
              ? "selected-size"
              : ""
          )}
          onClick={() => handleColorOption(true)}
        >
          <p className="tc f6 size-icon-label">None</p>
          <i className="fas fa-times" />
        </div>
      </div>
      {viewColorPicker && (
        <SketchPicker
          className="color-picker"
          color={selectedColor}
          onChange={color => setSelectedColor(color.hex)}
        />
      )}
      {/* <div className="icon-wrapper">
        {renderIconList(icons, isIconSelected, handleSizeChange)}
      </div> */}
      <p className="option-title">Browser Styling</p>
      <div className="icon-wrapper">
        {renderIconList(
          browserOptions,
          browserStyling,
          handleBrowserStylingChange
        )}
      </div>
      <p className="option-title">Background Padding</p>
      <RangeSlider
        rangeSliderValue={rangePaddingSliderValue}
        setRangeSliderValue={setRangePaddingSliderValue}
      />
      <p className="option-title">Background Radius</p>
      <RangeSlider
        rangeSliderValue={rangeBorderSliderValue}
        setRangeSliderValue={setRangeBorderSliderValue}
      />
      <p className="option-title">File Type</p>
      <select name="file-type">
        <option value="PNG">PNG</option>
        <option value="JPEG">JPEG</option>
      </select>
      <br />
      <button className="download-button">Download</button>
    </div>
  );
};

export default MenuEditor;
