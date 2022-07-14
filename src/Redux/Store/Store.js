import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import PostReducer from "../Reducers/PostReducer";

const store = configureStore({
  reducer: {
    AuthReducer,
    PostReducer,
  },
});

export default store;
