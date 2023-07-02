import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authSlice.ts";
import themeReducer from "./reducers/themeSlice.ts";

export interface StateProps {
  auth: {
    isAuth: boolean;
    loggedUserId: string | undefined;
  };
  theme: {
    isDark: boolean;
  };
}

const reducers = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: reducers,
});
