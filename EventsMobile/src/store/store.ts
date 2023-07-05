import {combineReducers} from "redux";

import authReducer from "./reducers/authSlice"
import themeReducer from "./reducers/themeSlice"
import {configureStore} from "@reduxjs/toolkit";

export interface StateProps {
    auth: {
        isAuth: boolean,
        loggedUserId: string | undefined
    },
    theme: {
        isDark: boolean
    }
}

const reducers = combineReducers({
    auth: authReducer,
    theme: themeReducer
})

export const store = configureStore({
    reducer: reducers
})
