import React from "react";
import foxLogo from "../../../../assets/images/foxLogo.png";

const Header = () => {
  return (
    <div className="header-wrapper mt6 mb5">
      <img src={foxLogo} alt="Screen swipe logo" />
      <h1 className="f2 f1-l">Screen Swipe</h1>
      <h3 className="f5 f4-l">
        Get a gorgeous screenshot of any website or image of your choice
      </h3>
    </div>
  );
};

export default Header;
