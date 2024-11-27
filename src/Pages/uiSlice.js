import {createSlice} from "@reduxjs/toolkit";

const initialStateUI = {
  //user state
  currentUserId: undefined,
  isLoggedIn: false,
  currentUser: {},
  //UI
  showLatest: true,
  onlyShowMyPosts: false,
  currentTag: "AllPosts",
  currentPage: 1,
  searchQuery: "",
  isWorking: false,
  totalPostsQuantity: 0,
  cardsPerPage: 50,
  showSideBar: true,
  showEditor: false,
  isDarkMode: true,
  searchedPostsQuantity: 0,
  categories: [
    "Web Basic",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind CSS",
    "Styled Components",
    "React",
    "Redux",
    "React Router",
    "React Query",
    "NextJS",
    "NodeJS",
    "Express",
    "MongoDB",
    "Mongoose",
    "Bootstrap",
    "Git",
    "Github",
    "Github Copilot",
    "Docker",
    "Vercel",
    "Netlify",
    "Heroku",
    "Supabase",
    "Pug",
    "Postman"
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
      state.showEditor = action.payload !== undefined ? action.payload : !state.showEditor;
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
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    setOnlyShowMyPosts: (state) => {
      state.onlyShowMyPosts = !state.onlyShowMyPosts;
    },
    setGoHome: (state) => {
      state.showLatest = true;
      state.onlyShowMyPosts = false;
      state.currentTag = "AllPosts";
      state.currentPage = 1;
      state.searchQuery = "";
    },
    setLogOut: (state) => {
      state.currentUser = {};
      state.currentUserId = undefined;
      state.isLoggedIn = false;
    }
  }
});

export const {
  setCurrentUser,
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
  setIsWorking,
  setIsLoggedIn,
  setCurrentUserId,
  setOnlyShowMyPosts,
  setGoHome,
  setLogOut
} = uiSlice.actions;
//使用default export导出reducer
export default uiSlice.reducer;
