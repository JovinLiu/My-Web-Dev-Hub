import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  showSideBar: true,
  showEditor: false,
  isDarkMode: true,
  isMarkDown: false,
  currentTag: "AllPosts",
  categories: [
    "Web Basic",
    "Javascript",
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
    toggleShowEditor: (state, action) => {
      state.showEditor = action.payload || !state.showEditor;
    },
    toggleDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    toggleIsMarkDown: (state, action) => {
      state.isMarkDown = action.payload || !state.isMarkDown;
    },
    setCurrentTag: (state, action) => {
      state.currentTag = action.payload;
    }
  }
});

export const {toggleShowSideBar, toggleShowEditor, toggleDarkMode, toggleIsMarkDown, setCurrentTag} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
