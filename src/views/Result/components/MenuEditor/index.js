import React, { useState } from "react";
import classnames from "classnames";
import { SketchPicker } from "react-color";

import RangeSlider from "./components/RangeSlider";
import BackgroundChoices from "./components/BackgroundChoices";
const htmlToImage = require("html-to-image");
const FileSaver = require("file-saver");

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
  setShowImageLoader,
  icons,
  browserOptions,
  urlSearch
}) => {
  const [viewColorPicker, setViewColorPicker] = useState(false);
  const [isIconSelected, setIsIconSelected] = useState("desktop");
  const [fileType, setFileType] = useState("PNG");
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);

  const downloadImage = () => {
    setIsDownloadDisabled(true);
    const node = document.querySelector(".image-preview");
    let handlerFunc;
    switch (fileType) {
      case "PNG":
        handlerFunc = htmlToImage.toPng;
        break;
      case "JPEG":
        handlerFunc = htmlToImage.toJpeg;
        break;
      case "SVG":
        handlerFunc = htmlToImage.toSvgDataURL;
        break;
      default:
        handlerFunc = htmlToImage.toPng;
        break;
    }

    handlerFunc(node)
      .then(dataUrl => {
        FileSaver.saveAs(
          dataUrl,
          `screen-swipe-screenshot.${fileType.toLowerCase()}`
        );
      })
      .finally(() => setIsDownloadDisabled(false));
  };

  const handleSizeChange = icon => {
    setIsIconSelected(icon.name);
    setDeviceSize(icon.dimensions);
    setShowImageLoader(true);
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
      {urlSearch && (
        <div>
          <p className="option-title">Device Size</p>
          <div className="icon-wrapper">
            {renderIconList(icons, isIconSelected, handleSizeChange)}
          </div>
        </div>
      )}
      <p className="option-title">Background Color</p>
      <BackgroundChoices
        viewColorPicker={viewColorPicker}
        selectedColor={selectedColor}
        handleColorOption={handleColorOption}
      />
      {viewColorPicker && (
        <SketchPicker
          className="color-picker"
          color={selectedColor}
          onChange={color => setSelectedColor(color.hex)}
        />
      )}
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
      <select name="file-type" onChange={e => setFileType(e.target.value)}>
        <option value="PNG">PNG</option>
        <option value="JPEG">JPEG</option>
        <option value="SVG">SVG</option>
      </select>
      <br />
      <button
        type="button"
        className="download-button"
        disabled={isDownloadDisabled}
        onClick={() => downloadImage()}
      >
        {isDownloadDisabled ? "Downloading..." : "Download"}
      </button>
    </div>
  );
};

export default MenuEditor;
