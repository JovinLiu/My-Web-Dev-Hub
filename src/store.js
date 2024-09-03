import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postsApi} from "./Utils/data.js";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer
    // account: accountReducer,
    // customer: customerReducer
  },
  //协助缓存
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

setupListeners(store.dispatch);
