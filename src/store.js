import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postsApi} from "./Utils/data.js";
// import postsReducer from "./Pages/postsSlice.js";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer
    // posts: postsReducer
  },
  //协助缓存
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

setupListeners(store.dispatch);
