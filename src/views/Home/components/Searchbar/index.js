import React, { useState } from "react";
import { placeHolder, errorPlaceHolder } from "../../../../config";
import classnames from "classnames";

const Searchbar = ({ handleSubmit }) => {
  const [inputValue, setinputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleInput = e => {
    e.preventDefault();
    const isValidUrl = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
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
