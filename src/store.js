import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postsApi} from "./Utils/data.js";
import uiReducer from "./Pages/uiSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  //协助缓存
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

setupListeners(store.dispatch);

export default store;
