import React from "react";
import MainNavigation from "./MainNavigation.tsx";
import classes from "./error.module.scss";
import NavButton from "../buttons/NavButton.tsx";

const Error: React.FC = () => {
  const title: string = "Nie znaleziono";
  const message: string = "Nie można znaleźć strony lub zasobu";
  return (
    <>
      <MainNavigation />
      <div className={classes.main}>
        <h1>{title}</h1>
        <h2>{message}</h2>
        <NavButton title="Wróć na stronę główną" isAlt={true} path="/" />
      </div>
    </>
  );
};

export default Error;
