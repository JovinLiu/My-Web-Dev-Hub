import {createSlice} from "@reduxjs/toolkit";

const initialStateCurrentPost = {
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
      (state.currentTitle = ""), (state.currentCategory = ""), (state.currentPostBody = "");
    }
  }
});

export const {setCurrentTitle, setCurrentComposeTime, setReviseTime, setCurrentCategory, setCurrentPostBody, resetCurrentPost} =
  currentPostSlice.actions;
//使用default export导出reducer
export default currentPostSlice.reducer;
