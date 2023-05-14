import Navigation from "./Navigation.tsx";
import { Outlet } from "react-router-dom";
import React from "react";

const Root: React.FC = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
