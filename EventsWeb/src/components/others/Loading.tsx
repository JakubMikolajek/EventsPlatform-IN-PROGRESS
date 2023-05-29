import React from "react";
import classes from "./loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={classes.main}>
      <h1>Proszę czekać...</h1>
    </div>
  );
};

export default Loading;
