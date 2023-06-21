import React from "react";
import classes from "./fileInput.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface FileInputProps {
  url: string | undefined | null;
  handleFileChange: any;
  isAlt: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  url,
  handleFileChange,
  isAlt,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <>
      {!isAlt ? (
        <div className={classes.main_file}>
          {url ? (
            <img className={classes.img} src={url} alt="img" />
          ) : (
            <input
              className={
                isDark ? classes.file_input_dark : classes.file_input_light
              }
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          )}
        </div>
      ) : (
        <div className={classes.alt_main_file}>
          {url && (
            <>
              <img className={classes.alt_img} src={url} alt="img" />
              <input
                className={
                  isDark
                    ? classes.alt_file_input_dark
                    : classes.alt_file_input_light
                }
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FileInput;
