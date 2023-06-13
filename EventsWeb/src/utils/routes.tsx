import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../components/navigation/Root.tsx";
import Events from "../pages/Events.tsx";
import EventDetail from "../pages/EventDetail.tsx";
import ProtectedRoute from "../components/navigation/ProtectedRoute.tsx";
import Error from "../components/navigation/Error.tsx";
import Category from "../pages/Category.tsx";
import Loading from "../components/others/Loading.tsx";

const Register = lazy(() => import("../pages/Register.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const Profile = lazy(() => import("../pages/Profile.tsx"));
const EditProfile = lazy(() => import("../pages/EditProfile.tsx"));
const AddEvent = lazy(() => import("../pages/AddEvent.tsx"));

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
        path: "profile-edit",
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
