import {createSlice} from "@reduxjs/toolkit";

const initialStateCurrentPost = {
  currentId: "",
  currentTitle: "",
  currentComposeTime: "",
  currentReviseTime: "",
  currentCategory: "",
  currentPostBody: ""
};

const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: initialStateCurrentPost,
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setCurrentTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
    setCurrentComposeTime: (state, action) => {
      state.currentComposeTime = action.payload;
    },
    setReviseTime: (state, action) => {
      state.currentReviseTime = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentPostBody: (state, action) => {
      state.currentPostBody = action.payload;
    },
    resetCurrentPost: (state) => {
      (state.currentId = ""), (state.currentTitle = ""), (state.currentReviseTime = ""), (state.currentCategory = ""), (state.currentPostBody = "");
    },
    resetComposeTime: (state) => {
      state.currentComposeTime = "";
    }
  }
});

export const {setCurrentTitle, setCurrentCategory, setCurrentPostBody, resetCurrentPost, resetComposeTime, setCurrentId} = currentPostSlice.actions;

function getTime() {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    weekday: "long",
    second: "numeric",
    hour12: false
  };
  const time = new Intl.DateTimeFormat(navigator.language, options).format(new Date());
  return time;
}

export function setCurrentComposeTime(date) {
  return async function (dispatch) {
    const time = date || getTime();
    dispatch({type: "currentPost/setCurrentComposeTime", payload: time});
  };
}

export function setReviseTime() {
  return async function (dispatch) {
    const time = getTime();
    dispatch({type: "currentPost/setReviseTime", payload: time});
  };
}

//使用default export导出reducer
export default currentPostSlice.reducer;
