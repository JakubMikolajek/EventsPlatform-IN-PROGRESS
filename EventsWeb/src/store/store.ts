import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.ts";

export interface StateProps {
  auth: {
    isAuth: boolean;
    loggedUserId: string | undefined;
  };
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
