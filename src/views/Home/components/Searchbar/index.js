import React, { useState } from "react";
import classnames from "classnames";

const Searchbar = () => {
  const [inputValue, setinputValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Validate if valid url and do something
    console.log(inputValue, "input value");
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
          onClick={e => handleSubmit(e)}
        />
      </form>
    </div>
  );
};

export default Searchbar;
