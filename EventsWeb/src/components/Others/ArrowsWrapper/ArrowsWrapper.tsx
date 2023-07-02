import React from "react";
import { useSelector } from "react-redux";

import classes from "./arrowWrapper.module.scss";

import { StateProps } from "../../../store/store.ts";

interface ArrowsWrapperProps {
  startIndex: any;
  handlePreviousPage: any;
  children: any;
  endIndex: any;
  elementLength: any;
  handleNextPage: any;
}

const ArrowsWrapper: React.FC<ArrowsWrapperProps> = ({
  startIndex,
  handlePreviousPage,
  children,
  endIndex,
  elementLength,
  handleNextPage,
}) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.container}>
      {startIndex >= 1 && (
        <button
          className={
            isDark ? classes.arrow_left_dark : classes.arrow_left_light
          }
          onClick={handlePreviousPage}
        >
          &larr;
        </button>
      )}
      {children}
      {endIndex < elementLength && (
        <button
          className={
            isDark ? classes.arrow_right_dark : classes.arrow_right_light
          }
          onClick={handleNextPage}
        >
          &rarr;
        </button>
      )}
    </div>
  );
};

export default ArrowsWrapper;
