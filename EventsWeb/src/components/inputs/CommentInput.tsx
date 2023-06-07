import React from "react";
import classes from "./commentInput.module.scss";

interface CommentInpupProps {
  register: any;
  name: string;
}

const CommentInput: React.FC<CommentInpupProps> = ({ register, name }) => {
  return (
    <input
      className={classes.commentInput}
      {...register(name)}
      type="text"
      placeholder="Dodaj komentarz..."
    />
  );
};

export default CommentInput;
