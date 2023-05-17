import MainNavigation from "./MainNavigation.tsx";
import { Outlet } from "react-router-dom";
import React from "react";

const Root: React.FC = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
