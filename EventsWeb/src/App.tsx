import { RouterProvider } from "react-router-dom";
import React from "react";
import { router } from "./utils/routes.tsx";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
