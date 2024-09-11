import {createSlice} from "@reduxjs/toolkit";
//["id","title","createdAt","updatedAt","description","category","topic","content","images","isPrivate","user"]
const initialStateCurrentPost = {
  currentId: "",
  currentTitle: "",
  currentComposeTime: "",
  currentReviseTime: "",
  currentDescription: "",
  currentCategory: "",
  currentTopic: "",
  currentPostBody: "",
  currentImages: [],
  currentIsPrivate: false,
  currentUser: ""
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
    setCurrentReviseTime: (state, action) => {
      state.currentReviseTime = action.payload;
    },
    setCurrentDescription: (state, action) => {
      state.currentDescription = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
    setCurrentPostBody: (state, action) => {
      state.currentPostBody = action.payload;
    },
    setCurrentImages: (state, action) => {
      state.currentImages = action.payload;
    },
    setCurrentIsPrivate: (state, action) => {
      state.currentIsPrivate = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetCurrentPost: (state) => {
      state.currentId = "";
      state.currentTitle = "";
      state.currentReviseTime = "";
      state.currentDescription = "";
      state.currentCategory = "";
      state.currentTopic = "";
      state.currentPostBody = "";
      state.currentImages = [];
      state.currentIsPrivate = false;
      state.currentUser = "";
    },
    resetComposeTime: (state) => {
      state.currentComposeTime = "";
    }
  }
});

export const {
  setCurrentId,
  setCurrentTitle,
  setCurrentComposeTime,
  setCurrentReviseTime,
  setCurrentDescription,
  setCurrentCategory,
  setCurrentTopic,
  setCurrentPostBody,
  setCurrentImages,
  setCurrentIsPrivate,
  setCurrentUser,
  resetCurrentPost,
  resetComposeTime
} = currentPostSlice.actions;

//使用default export导出reducer
export default currentPostSlice.reducer;
