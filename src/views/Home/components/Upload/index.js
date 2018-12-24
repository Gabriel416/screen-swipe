import React, { useState } from "react";
import { dropzoneText, dropzoneError } from "../../../../config";
import classnames from "classnames";
import Dropzone from "react-dropzone";

const Upload = ({ handleSubmit }) => {
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const [uploadError, setUploadError] = useState(false);

  const onDrop = (acceptedFile, rejectedFile) => {
    rejectedFile = true;
    if (rejectedFile) {
      setUploadError(true);
      return;
    }
    // Do something with files
    console.log(acceptedFile, rejectedFile, "HERE");
    setUploadError(false);
    handleSubmit(acceptedFile[0]);
  };
  return (
    <div
      className={classnames(
        "w-80 w-70-m w-50-l mb2 relative center dropzone-wrapper",
        uploadError ? "upload-error" : undefined
      )}
    >
      <Dropzone
        multiple={false}
        maxSize={31457280}
        accept={acceptedFileTypes}
        onDrop={e => onDrop(e)}
        className="dropzone"
      >
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              className={classnames("dropzone", {
                "dropzone--isActive": isDragActive
              })}
            >
              <input {...getInputProps()} />
              <div className="upload-content">
                <i className="far fa-file-image" />
                <p className="f7 f6-l">
                  {uploadError ? dropzoneError : dropzoneText}
                </p>
              </div>
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default Upload;
