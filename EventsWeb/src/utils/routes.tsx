import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "../components/Navigation/Root/Root.tsx";
import Events from "../pages/Events/Events.tsx";
import EventDetail from "../pages/EventDetail/EventDetail.tsx";
import ProtectedRoute from "../components/Navigation/ProtectedRoute/ProtectedRoute.tsx";
import Error from "../components/Navigation/Error/Error.tsx";
import Category from "../pages/Category/Category.tsx";
import Loading from "../components/Navigation/Loading/Loading.tsx";

const Register = lazy(() => import("../pages/Register/Register.tsx"));
const Login = lazy(() => import("../pages/Login/Login.tsx"));
const Profile = lazy(() => import("../pages/Profile/Profile.tsx"));
const EditProfile = lazy(() => import("../pages/EditProfile/EditProfile.tsx"));
const AddEvent = lazy(() => import("../pages/AddEvent/AddEvent.tsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Events /> },
      { path: "categories/:categoryName", element: <Category /> },
      { path: "events/:eventId", element: <EventDetail /> },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "Profile-edit",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <EditProfile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-event",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <AddEvent />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
