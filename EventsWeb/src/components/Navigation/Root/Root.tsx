import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "../MainNavigation/MainNavigation.tsx";

import classes from "./root.module.scss";

import { StateProps } from "../../../store/store.ts";

const Root: React.FC = () => {
  const isDark = useSelector((state: StateProps) => state.theme.isDark);
  return (
    <div className={isDark ? classes.dark : classes.light}>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
