import React from "react";
import { useSelector } from "react-redux";

import classes from "./commentSubmit.module.scss";

import { StateProps } from "../../../store/store.ts";

const CommentSubmit: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <input
      className={
        isDark ? classes.comment_submit_dark : classes.comment_submit_light
      }
      type="submit"
      value="Wyślij"
    />
  );
};

export default CommentSubmit;
