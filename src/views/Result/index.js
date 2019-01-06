import React, { useState, useEffect } from "react";
import {
  loadingTitle,
  loadingSubText,
  errorTitle,
  errorSubText
} from "../../config";
import Header from "../../shared/Header";

const Result = ({ history, location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeText, setHomeText] = useState({
    title: loadingTitle,
    subText: loadingSubText
  });
  const [deviceSize, setDeviceSize] = useState({
    height: 600,
    width: 1020
  });
  const urlPrefix = `${process.env.REACT_APP_AWS_LAMBDA_DEV}/capture-image`;
  console.log(location, "location");

  useEffect(() => {
    !location.state && history.push("/");
  });

  const handleError = () => {
    setHomeText({
      title: errorTitle,
      subText: errorSubText
    });
    // fix this later
    setTimeout(() => {
      history.push("/");
    }, 4000);
  };

  return (
    <div className="result w-100">
      <p>hello result page</p>
      {location.state && (
        <div>
          {isLoading && <Header {...homeText} isLoading={isLoading} />}
          <img
            src={`${urlPrefix}?address=${location.state.url}?height=${
              deviceSize.height
            }?width=${deviceSize.width}`}
            alt="preview image"
            onLoad={() => setIsLoading(false)}
            onError={() => handleError()}
          />
        </div>
      )}
    </div>
  );
};

export default Result;
