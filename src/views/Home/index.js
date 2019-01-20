import React, { useState } from "react";
import { title, subText } from "../../config";

import Header from "../../shared/Header";
import Upload from "./components/Upload";
import Searchbar from "./components/Searchbar";

const Home = ({ history }) => {
  const [homeText] = useState({ title, subText });

  const navigateToResult = state => {
    history.push({
      pathname: "/result",
      state
    });
  };

  const handleSubmit = (image = null, url = null) => {
    if (url) {
      navigateToResult({ url });
    } else {
      navigateToResult({ image });
    }
  };

  return (
    <div className="home w-90 w-80-m w-70-l">
      <Header {...homeText} />
      <Upload handleSubmit={handleSubmit} />
      <p className="mv4">Or enter a website below</p>
      <Searchbar handleSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
