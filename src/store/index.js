import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import ArticleSlice from "./articles-slice";

const store = configureStore({
  reducer: { login: loginSlice.reducer , article :ArticleSlice.reducer},
});

export default store;
