import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";

import authReducer from "./auth/reducer";
import commentReducer from "./comment/reducer";
import detailThreadReducer from "./detailThread/reducer";
import isPreloadReducer from "./isPreload/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    authUser: authReducer,
    comment: commentReducer,
    detailThread: detailThreadReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    threads: threadsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
