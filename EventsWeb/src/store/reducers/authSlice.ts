import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  isAuth: boolean;
  loggedUserId: string | undefined;
}

const initialState: InitialStateProps = {
  isAuth: false,
  loggedUserId: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<string | undefined>) => {
      state.loggedUserId = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setIsAuth, setIsLoggedIn } = authSlice.actions;
