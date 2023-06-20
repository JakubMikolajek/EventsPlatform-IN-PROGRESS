import MainNavigation from "./MainNavigation.tsx";
import { Outlet } from "react-router-dom";
import React from "react";
import classes from "./root.module.scss";
import { useSelector } from "react-redux";
import { StateProps } from "../../store/store.ts";

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
