import React, { useState, useEffect } from "react";
import browserMockup from "../../assets/images/browser-light.png";
import {
  urlPrefix,
  loadingTitle,
  loadingSubText,
  errorTitle,
  errorSubText,
  icons
} from "../../config";

import MenuEditor from "./components/MenuEditor";
import Header from "../../shared/Header";

const Result = ({ history, location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("transparent");
  const [rangePaddingSliderValue, setRangePaddingSliderValue] = useState(30);
  const [rangeBorderSliderValue, setRangeBorderSliderValue] = useState(5);
  const [homeText, setHomeText] = useState({
    title: loadingTitle,
    subText: loadingSubText
  });
  const [deviceSize, setDeviceSize] = useState({
    height: 600,
    width: 1020
  });
  console.log(deviceSize, location, "location");

  // useEffect(() => {
  //   !location.state && history.push("/");
  // });

  const handleSettingsChange = () => {
    setIsLoading(true);
  };

  const handleError = () => {
    setHomeText({
      title: errorTitle,
      subText: errorSubText
    });
    // fix this later
    // setTimeout(() => {
    //   history.push("/");
    // }, 4000);
  };

  return (
    <div className="result w-100">
      {location.state && (
        <div className="wrapper">
          {isLoading && <Header {...homeText} isLoading={isLoading} />}
          {!isLoading && (
            <MenuEditor
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              setDeviceSize={setDeviceSize}
              rangePaddingSliderValue={rangePaddingSliderValue}
              setRangePaddingSliderValue={setRangePaddingSliderValue}
              rangeBorderSliderValue={rangeBorderSliderValue}
              setRangeBorderSliderValue={setRangeBorderSliderValue}
              icons={icons}
            />
          )}
          <div className="image-preview">
            <div
              className="main"
              style={{
                backgroundColor: selectedColor,
                padding: `${rangePaddingSliderValue}px`,
                borderRadius: `${rangeBorderSliderValue}px`
              }}
            >
              <div className="image-wrapper">
                <img
                  src={`${urlPrefix}?address=${location.state.url}?height=${
                    deviceSize.height
                  }?width=${deviceSize.width}`}
                  alt="preview image"
                  onLoad={() => setIsLoading(false)}
                  onError={() => handleError()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
