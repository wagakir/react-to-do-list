import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../../utils/checkAuth";

const isAuth = checkAuth();
const initialState: { isAuth: boolean } = {
  isAuth,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
