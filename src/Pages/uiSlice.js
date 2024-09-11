import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  signin: false,
  totalPostsQuantity: 0,
  cardsPerPage: 50,
  showSideBar: true,
  showEditor: false,
  isDarkMode: true,
  isMarkDown: false,
  searchedPostsQuantity: 0,
  currentTag: "AllPosts",
  currentPage: 1,
  searchQuery: "",
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
    },
    setSearchedPostsQuantity: (state, action) => {
      state.searchedPostsQuantity = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPostsQuantity: (state, action) => {
      state.totalPostsQuantity = action.payload;
    },
    setCardsPerPage: (state, action) => {
      state.cardsPerPage = action.payload;
    }
  }
});

export const {
  toggleShowSideBar,
  toggleShowEditor,
  toggleDarkMode,
  toggleIsMarkDown,
  setCurrentTag,
  setSearchedPostsQuantity,
  setSearchQuery,
  setCurrentPage,
  setTotalPostsQuantity,
  setCardsPerPage
} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
