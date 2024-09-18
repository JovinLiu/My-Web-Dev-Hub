import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postsApi} from "./Services/PostsApi.js";
import {usersApi} from "./Services/UsersApi.js";
import uiReducer from "./Pages/uiSlice";
import currentPostReducer from "./Features/PostEditor/currentPostSlice.js";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    currentPost: currentPostReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  //协助缓存
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware).concat(usersApi.middleware)
});

setupListeners(store.dispatch);

export default store;
