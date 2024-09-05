import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  showSideBar: true,
  showEditor: false,
  isDarkMode: true
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialStateUI,
  reducers: {
    toggleShowSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    toggleShowEditor: (state) => {
      state.showEditor = !state.showEditor;
    },
    toggleDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    }
  }
});

export const {toggleShowSideBar, toggleShowEditor, toggleDarkMode} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
