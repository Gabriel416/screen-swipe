import React from "react";
import classnames from "classnames";

const BackgroundChoices = ({
  viewColorPicker,
  selectedColor,
  handleColorOption
}) => {
  return (
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
          <div className="swatch-color" style={{ background: selectedColor }} />
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
  );
};

export default BackgroundChoices;
