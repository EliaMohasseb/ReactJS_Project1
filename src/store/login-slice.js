import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login_state",
  initialState: {
    username: "",
    password: "",
    isFetching: false,
    userValid: false,
    passValid: false,
    isSET: false,
    ErrorType: "",
    accessToken:""
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setUserValid(state, action) {
      state.userValid = action.payload;
    },
    setPassValid(state, action) {
      state.passValid = action.payload;
    },
    setIsFethcing(state, action) {
      state.isFetching = action.payload;
    },
    setIsSET(state, action) {
      state.isSET = action.payload;
    },
    setErrorType(state, action) {
      state.ErrorType = action.payload;
    },
    setAccessToken(state,action){
      state.accessToken=action.payload
    }
  },
});

export const LoginActions = loginSlice.actions;
export default loginSlice;
