import React from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./utils/routes.tsx";

import "./index.module.scss";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
