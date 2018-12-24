import React, { useState } from "react";
import classnames from "classnames";

const Searchbar = ({ handleSubmit }) => {
  const [inputValue, setinputValue] = useState("");

  const handleInput = e => {
    e.preventDefault();
    // Validate if valid url and do something
    console.log(inputValue, "input value");
    let formattedUrl = inputValue;
    handleSubmit(null, formattedUrl);
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setinputValue(e.target.value)}
          placeholder="URL"
          autoFocus
          className="searchbar w-80 w-70-m w-50-l"
        />
        <i
          className={classnames(
            "fas fa-search",
            !inputValue && "search-disabled"
          )}
          onClick={e => handleInput(e)}
        />
      </form>
    </div>
  );
};

export default Searchbar;
