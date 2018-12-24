import React from "react";
import foxLogo from "../../../../assets/images/foxLogo.png";

const Header = ({ title, subText, isLoading }) => {
  return (
    <header className="header-wrapper mt5 mb3 mb2-l">
      <img
        src={foxLogo}
        alt="Screen swipe logo"
        className={isLoading ? "image-loader" : undefined}
      />
      <h1 className="f2 f1-l">{title}</h1>
      <h3 className="f5 f4-l">{subText}</h3>
    </header>
  );
};

export default Header;
