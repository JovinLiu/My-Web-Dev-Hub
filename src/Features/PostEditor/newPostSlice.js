import {createSlice} from "@reduxjs/toolkit";

const initialStateNewPost = {
  showSideBar: true
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState: initialStateNewPost,
  reducers: {
    toggleShowSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    }
  }
});

export const {toggleShowSideBar} = newPostSlice.actions;
//使用default export导出reducer
export default newPostSlice.reducer;
