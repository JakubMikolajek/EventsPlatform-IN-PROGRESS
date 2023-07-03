import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  isAuth: boolean;
  loggedUserId: string | undefined;
}

const data = localStorage.getItem("sb-jydvcrgomskcwastsjqh-auth-token");

const user_data = data && JSON.parse(data);

const initialState: InitialStateProps = {
  isAuth: !!user_data,
  loggedUserId: user_data ? user_data.user.id : undefined,
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
