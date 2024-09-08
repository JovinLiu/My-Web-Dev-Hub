//search bar
//Markdown可以正常显示
//单个的tab实现pagination
//user login logout user settings
//sidebar的样式
//Home Page
//RTK的 Automated Re-fetching https://redux-toolkit.js.org/rtk-query/usage/automated-refetching

//显示的格式：大写小写+空格
//存储的格式：大写小写
//css的格式：小写
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";

import AppLayout from "./Pages/AppLayout";
import PostList from "./Features/PostList/PostList.jsx";
import EmptyPostViewer from "./Features/PostEditor/EmptyPostViewer.jsx";
import PostViewer from "./Features/PostViewer/PostViewer.jsx";
import PageNotFound from "./Pages/PageNotFound";
import GlobalStyles from "./Styles/GlobalStyles";
import store from "./store.js";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<Navigate replace to="/app/posts" />} />
          <Route path="/app" element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to="lists" />} /> */}
            <Route path="posts" element={<PostList />} />
            <Route path="editor" element={<EmptyPostViewer />} />
            <Route path="viewer/:id" element={<PostViewer />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "var(--color-grey-0)",
            color: "var(--color-grey-900)"
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "black"
            }
          }
        }}
      />
    </Provider>
  );
}

export default App;
