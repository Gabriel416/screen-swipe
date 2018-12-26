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
    setHomeText({ title, subText });
  };

  const handleSubmit = async (image = null, url = null) => {
    setIsLoading(true);
    if (url) {
      console.log(process.env);
      const data = await httpService(
        `${process.env.REACT_APP_LOCAL_API}/capture-image`,
        {
          url
        }
      );
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
          <Upload handleSubmit={handleSubmit} />
          <p className="mv4">Or enter a website below</p>
          <Searchbar handleSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default Home;
