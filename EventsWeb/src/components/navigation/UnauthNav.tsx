import React from "react";
import NavButton from "../buttons/NavButton.tsx";

const UnauthNav: React.FC = () => {
  return (
    <>
      <NavButton isAlt={true} title="Zaloguj się" path="/login" />
      <NavButton isAlt={false} title="Zarejestruj się" path="/register" />
    </>
  );
};

export default UnauthNav;
