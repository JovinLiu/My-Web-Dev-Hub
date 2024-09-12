import {createSlice} from "@reduxjs/toolkit";
//["id","title","createdAt","updatedAt","description","category","topic","content","images","isPrivate","user"]
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPost: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.description = action.payload.description;
      state.category = action.payload.category;
      state.topic = action.payload.topic;
      state.content = action.payload.content;
      state.images = action.payload.images;
      state.isPrivate = action.payload.isPrivate;
      state.user = action.payload.user;
    },
    resetPost: (state) => {
      state.id = "";
      state.title = "";
      state.createdAt = "";
      state.updatedAt = "";
      state.description = "";
      state.category = "";
      state.topic = "";
      state.content = "";
      state.images = [];
      state.isPrivate = false;
      state.user = "";
    }
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
  setUser,
  setPost,
  resetPost
} = currentPostSlice.actions;

//使用default export导出reducer
export default currentPostSlice.reducer;
