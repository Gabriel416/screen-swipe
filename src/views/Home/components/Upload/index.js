import React from "react";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { reject } from "q";

const Upload = () => {
  const onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    console.log(acceptedFiles, rejectedFiles, "HERE");
  };
  return (
    <div className="w-80 w-70-m w-50-l mb2 relative center dropzone-wrapper">
      <Dropzone onDrop={onDrop()} className="dropzone">
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
                  Drag and drop image or click here to upload
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
