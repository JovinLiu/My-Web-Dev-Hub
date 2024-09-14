import {createSlice} from "@reduxjs/toolkit";
const initialStateCurrentPost = {
  id: "",
  title: "",
  createdAt: "",
  updatedAt: "",
  description: "",
  category: "",
  topic: "",
  content: "",
  images: [],
  isPrivate: true,
  isMarkdown: false,
  user: ""
};

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: initialStateCurrentPost,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdatedAt: (state, action) => {
      state.updatedAt = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTopic: (state, action) => {
      state.topic = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setIsPrivate: (state) => {
      state.isPrivate = !state.isPrivate;
    },
    setIsMarkdown: (state, action) => {
      state.isMarkdown = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPost: (state, action) => {
      return {...state, ...action.payload};
    },
    resetPost: () => initialStateCurrentPost
  }
});

export const {
  setId,
  setTitle,
  setCreatedAt,
  setUpdatedAt,
  setDescription,
  setCategory,
  setTopic,
  setContent,
  setImages,
  setIsPrivate,
  setIsMarkdown,
  setUser,
  setPost,
  resetPost
} = currentPostSlice.actions;

//使用default export导出reducer
export default currentPostSlice.reducer;
