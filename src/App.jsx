//后端解决每个tag post数量的问题，从而计算页码
//后端解决search query的问题
//后端通过aggregate来解决sidebar内容汇总的信息，从而决定的样式

//Markdown可以正常显示

//显示的格式：大写小写+空格
//数据库存储的格式：大写小写
//css的格式：小写
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";

import AppLayout from "./Pages/AppLayout";
import AccountLayout from "./Pages/AccountLayout";
import PostList from "./Features/PostList/PostList.jsx";
import PostViewer from "./Features/PostViewer/PostViewer.jsx";
import PageNotFound from "./Pages/PageNotFound";
import PasswordReset from "./Pages/PasswordReset.jsx";
import GlobalStyles from "./Styles/GlobalStyles";
import store from "./store.js";
import HomePage from "./Pages/HomePage.jsx";
import PostPreviewer from "./Features/PostEditor/PostPreviewer.jsx";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="posts" />} />
            <Route path="posts" element={<PostList />} />
            <Route path="editor" element={<PostPreviewer />} />
            <Route path="viewer/:id" element={<PostViewer />} />
          </Route>
          <Route path="/account" element={<AccountLayout />}>
            <Route path="resetPassword/:token" element={<PasswordReset />} />
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
