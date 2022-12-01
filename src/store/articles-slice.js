import { createSlice } from "@reduxjs/toolkit";

const ArticleSlice = createSlice({
  name: "login_state",
  initialState: {
    isFetching: false,
    SearchTerm: "",
    isEmpty: true,
    Title: [],
    Description: [],
    Content: [],
    author: [],
  },
  reducers: {
    setIsEmpty(state, action) {
      state.isEmpty = action.payload;
    },
    setSearch(state, action) {
      state.SearchTerm = action.payload;
    },
    addTitle(state, action) {
      state.Title = [...state.Title, action.payload];
    },
    addDescription(state, action) {
      state.Description = [...state.Description, action.payload];
    },
    addContent(state, action) {
      state.Content = [...state.Content, action.payload];
    },
    addAuthor(state, action) {
      state.author = [...state.author, action.payload];
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    deleteAll(state) {
      state.Title = []
        state.Description = []
        state.Content = []
        state.author = []
    },
  },
});

export const ArticleActions = ArticleSlice.actions;
export default ArticleSlice;
