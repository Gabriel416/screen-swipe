import React, { useState, useEffect } from "react";
import { title, subText, loadingTitle, loadingSubText } from "../../config";

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
          <Upload />
          <Searchbar />
        </div>
      )}
    </div>
  );
};

export default Home;
