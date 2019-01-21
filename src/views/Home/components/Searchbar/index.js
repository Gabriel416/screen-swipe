import React, { useState } from "react";
import { placeHolder, errorPlaceHolder } from "../../../../config";
import classnames from "classnames";

const Searchbar = ({ handleSubmit }) => {
  const [inputValue, setinputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleInput = e => {
    e.preventDefault();
    const isValidUrl = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (isValidUrl.test(inputValue)) {
      setInputError(false);
      handleSubmit(null, inputValue);
    } else {
      setinputValue("");
      setInputError(true);
    }
  };

  const handleChange = inputValue => {
    setinputValue(inputValue);
    setInputError(false);
  };

  return (
    <div>
      <form
        onSubmit={e => handleInput(e)}
        className={inputError ? "form-error" : undefined}
      >
        <input
          aria-label="url search"
          name="urlSearch"
          type="text"
          value={inputValue}
          onChange={e => handleChange(e.target.value)}
          placeholder={inputError ? errorPlaceHolder : placeHolder}
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
