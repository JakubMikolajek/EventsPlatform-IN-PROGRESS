import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/navigation/Root.tsx";
import Events from "./pages/Events.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import React from "react";
import AddEvent from "./pages/AddEvent.tsx";
import ProtectedRoute from "./components/navigation/ProtectedRoute.tsx";
import Error from "./components/navigation/Error.tsx";
import Category from "./pages/Category.tsx";
import EditProfile from "./pages/EditProfile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Events /> },
      { path: "categories/:categoryName", element: <Category /> },
      { path: "events/:eventId", element: <EventDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile-edit",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-event",
        element: (
          <ProtectedRoute>
            <AddEvent />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
