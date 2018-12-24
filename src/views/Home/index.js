import React, { useState, useEffect } from "react";
import { title, subText, loadingTitle, loadingSubText } from "../../config";
import { httpService } from "../../utils/services";

import Header from "./components/Header";
import Upload from "./components/Upload";
import Searchbar from "./components/Searchbar";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [homeText, setHomeText] = useState({ title, subText });

  const handleHomeTextChange = (title, subText) => {
    setHomeText({
      title,
      subText
    });
  };

  const handleImageSubmit = image => {
    console.log(image, "image");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleUrlSubmit = url => {
    console.log(url, "url");
    console.log(httpService, "service");
    setIsLoading(true);
    console.log(httpService, "service");
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  useEffect(
    () => {
      isLoading
        ? handleHomeTextChange(loadingTitle, loadingSubText)
        : handleHomeTextChange(title, subText);
    },
    [isLoading]
  );

  return (
    <div className="home w-90 w-80-m w-70-l">
      <Header {...homeText} isLoading={isLoading} />
      {!isLoading && (
        <div>
          <Upload handleImageSubmit={handleImageSubmit} />
          <Searchbar handleUrlSubmit={handleUrlSubmit} />
        </div>
      )}
    </div>
  );
};

export default Home;
