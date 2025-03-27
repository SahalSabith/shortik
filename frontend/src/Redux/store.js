import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import urlReducer from "./urlSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
  },
});

export default store;
