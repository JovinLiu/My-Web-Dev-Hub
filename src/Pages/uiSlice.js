import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  showSideBar: true,
  showEditor: false,
  isDarkMode: true,
  isMarkDown: false,
  categories: [
    "Web Basic",
    "JavaScript",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind CSS",
    "React",
    "Redux",
    "NodeJS",
    "Express",
    "MangoDB",
    "Mongoose",
    "Bootstrap",
    "React Router",
    "React Query",
    "NextJS",
    "Git",
    "Github"
  ]
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
    },
    toggleIsMarkDown: (state) => {
      state.isMarkDown = !state.isMarkDown;
    }
  }
});

export const {toggleShowSideBar, toggleShowEditor, toggleDarkMode, toggleIsMarkDown} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
