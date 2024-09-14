import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  showLatest: true,
  isWorking: false,
  signin: false,
  totalPostsQuantity: 0,
  cardsPerPage: 50,
  showSideBar: true,
  showEditor: false,
  isDarkMode: true,
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
    },
    setIsWorking: (state, action) => {
      state.isWorking = action.payload;
    },
    setShowLatest: (state) => {
      state.showLatest = !state.showLatest;
    }
  }
});

export const {
  setShowLatest,
  toggleShowSideBar,
  toggleShowEditor,
  toggleDarkMode,
  setCurrentTag,
  setSearchedPostsQuantity,
  setSearchQuery,
  setCurrentPage,
  setTotalPostsQuantity,
  setCardsPerPage,
  setIsWorking
} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
