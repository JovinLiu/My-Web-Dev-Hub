import {createSlice} from "@reduxjs/toolkit";

const initialStateCurrentPost = {
  currentId: "",
  currentTitle: "",
  currentComposeTime: "",
  currentReviseTime: "",
  currentCategory: "",
  currentPostBody: ""
};

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: initialStateCurrentPost,
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setCurrentTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
    setCurrentComposeTime: (state, action) => {
      state.currentComposeTime = action.payload;
    },
    setReviseTime: (state, action) => {
      state.currentReviseTime = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentPostBody: (state, action) => {
      state.currentPostBody = action.payload;
    },
    resetCurrentPost: (state) => {
      (state.currentId = ""), (state.currentTitle = ""), (state.currentReviseTime = ""), (state.currentCategory = ""), (state.currentPostBody = "");
    },
    resetComposeTime: (state) => {
      state.currentComposeTime = "";
    }
  }
});

export const {
  setCurrentTitle,
  setCurrentCategory,
  setCurrentPostBody,
  resetCurrentPost,
  resetComposeTime,
  setCurrentId,
  setCurrentComposeTime,
  setReviseTime
} = currentPostSlice.actions;

//使用default export导出reducer
export default currentPostSlice.reducer;
