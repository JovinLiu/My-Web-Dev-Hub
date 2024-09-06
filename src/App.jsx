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

//Lazzy load each small tag
//square tag
//pagination
//Dark Mode
//Only Logged in user can add post
