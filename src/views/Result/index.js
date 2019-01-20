import React, { useState, useEffect } from "react";
import {
  urlPrefix,
  loadingTitle,
  loadingSubText,
  errorTitle,
  errorSubText,
  icons,
  browserOptions
} from "../../config";

import MenuEditor from "./components/MenuEditor";
import Loading from "./components/Loading";
import Header from "../../shared/Header";

const Result = ({ history, location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showImageLoader, setShowImageLoader] = useState(false);
  const [selectedColor, setSelectedColor] = useState("transparent");
  const [rangePaddingSliderValue, setRangePaddingSliderValue] = useState(30);
  const [rangeBorderSliderValue, setRangeBorderSliderValue] = useState(5);
  const [browserStyling, setBrowserStyling] = useState("light");
  const [homeText, setHomeText] = useState({
    title: loadingTitle,
    subText: loadingSubText
  });
  const [deviceSize, setDeviceSize] = useState({
    height: 600,
    width: 1020
  });

  useEffect(() => {
    !location.state && history.push("/");
  });

  const getImageSource = () => {
    if (location.state.url) {
      return `${urlPrefix}?address=${location.state.url}&height=${
        deviceSize.height
      }&width=${deviceSize.width}`;
    } else {
      return location.state.image;
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setShowImageLoader(false);
  };

  const handleError = () => {
    setHomeText({
      title: errorTitle,
      subText: errorSubText
    });
    // fix this later
    setTimeout(() => {
      history.push("/");
    }, 3500);
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
              browserStyling={browserStyling}
              setBrowserStyling={setBrowserStyling}
              setShowImageLoader={setShowImageLoader}
              icons={icons}
              browserOptions={browserOptions}
              urlSearch={location.state.url}
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
              <div
                className="browser"
                style={{
                  display: showImageLoader || isLoading ? "none" : "block"
                }}
              >
                <div
                  className="browser-header"
                  style={{
                    backgroundColor:
                      browserStyling === "light" ? "#DEE1E6" : "#191919"
                  }}
                >
                  <div className="browser-buttons">
                    <span className="button close" />
                    <span className="button minimize" />
                    <span className="button maximize" />
                  </div>
                </div>

                <div className="browser-content">
                  <img
                    src={getImageSource()}
                    alt="preview image"
                    onLoad={() => handleImageLoad()}
                    onError={() => handleError()}
                  />
                </div>
              </div>
              {showImageLoader && <Loading />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
