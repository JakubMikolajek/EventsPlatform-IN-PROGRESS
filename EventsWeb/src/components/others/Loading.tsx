import React from "react";
import classes from "./loading.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

const Loading: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={classes.main}>
      <h1 className={isDark ? classes.text_dark : classes.text_light}>
        Ładowanie...
      </h1>
    </div>
  );
};

export default Loading;
