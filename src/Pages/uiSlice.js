import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {showSideBar: true},
  reducers: {
    toggleShowSidebar: (state) => {
      state.showSideBar = !state.showSideBar;
    }
  }
});

export const {toggleShowSidebar} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
