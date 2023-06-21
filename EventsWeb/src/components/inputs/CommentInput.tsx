import React from "react";
import classes from "./commentInput.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

interface CommentInputProps {
  register: any;
  name: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ register, name }) => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <input
      className={
        isDark ? classes.comment_input_dark : classes.comment_input_light
      }
      {...register(name)}
      type="text"
      placeholder="Dodaj komentarz..."
    />
  );
};

export default CommentInput;
