import { setIsAuth, setIsLoggedIn } from "../reducers/authSlice.ts";
import { supabasClient } from "../../supabase/supabase.ts";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

export const login = async (email: string, password: string) => {
  return await supabasClient.auth
    .signInWithPassword({
      email: email,
      password: password,
    })
    .then(async (response) => {
      dispatch(setIsLoggedIn(response.data.user?.id));
      dispatch(setIsAuth(true));
    });
};
export const logout = async () => {
  return await supabasClient.auth.signOut().then(async () => {
    dispatch(setIsAuth(false));
    dispatch(setIsLoggedIn(""));
  });
};
export const register = async (email: string, password: string) => {
  return await supabasClient.auth.signUp({
    email: email,
    password: password,
  });
};
