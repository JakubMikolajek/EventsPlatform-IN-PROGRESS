import React from "react";
import classes from "./fileInput.module.scss";

interface FileInputProps {
  url: string | undefined;
  handleFileChange: any;
}

const FileInput: React.FC<FileInputProps> = ({ url, handleFileChange }) => {
  return (
    <div className={classes.mainFile}>
      {url ? (
        <img className={classes.img} src={url} alt="img" />
      ) : (
        <input
          className={classes.fileInput}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default FileInput;
