import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  showSideBar: true,
  isDarkMode: true
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialStateUI,
  reducers: {
    toggleShowSidebar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    toggleDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    }
  }
});

export const {toggleShowSidebar, toggleDarkMode} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
