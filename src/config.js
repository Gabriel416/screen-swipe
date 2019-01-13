// HEADER
export const title = "Screen Swipe";
export const subText =
  "Get a gorgeous screenshot of any website or image of your choice.";
export const loadingTitle = "Loading...";
export const loadingSubText =
  "Please wait while we take care of preparing your sceenshot.";
export const errorTitle = "Whoops";
export const errorSubText =
  "Looks like something went wrong while proccessing your image :(";

// DROPZONE
export const dropzoneText = "Drag and drop image or click here to upload";
export const dropzoneError = "Upload Error: We can't process that file type'";

// URL SEARCH
export const placeHolder = "URL";
export const errorPlaceHolder = "Please enter a valid url";

// API PREFIX
export const urlPrefix = `${
  process.env.REACT_APP_AWS_LAMBDA_DEV
}/capture-image`;

// ICON DATA FOR MENU EDITOR
export const icons = [
  {
    name: "mobile",
    class: "fas fa-mobile",
    dimensions: { height: 667, width: 375 }
  },
  {
    name: "tablet",
    class: "fas fa-tablet",
    dimensions: { height: 1024, width: 768 }
  },
  {
    name: "desktop",
    class: "fas fa-desktop",
    dimensions: { height: 600, width: 1020 }
  }
];
