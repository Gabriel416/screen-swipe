import React from "react";

const RangeSlider = ({ rangeSliderValue, setRangeSliderValue }) => {
  return (
    <div className="range-slider">
      <input
        className="range-slider__range"
        type="range"
        value={rangeSliderValue}
        min="0"
        max="100"
        onChange={e => setRangeSliderValue(e.target.value)}
      />
      <span className="range-slider__value">{`${rangeSliderValue}px`}</span>
    </div>
  );
};

export default RangeSlider;
