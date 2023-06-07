import React from "react";
import classes from "./commentSubmit.module.scss";

const CommentSubmit: React.FC = () => {
  return (
    <input className={classes.commentSubmit} type="submit" value="Wyślij" />
  );
};

export default CommentSubmit;
