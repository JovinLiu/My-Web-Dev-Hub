import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import PostList from "./Pages/PostList";
import PostEditor from "./Pages/PostEditor";
import PostViewer from "./Pages/PostViewer";
import PageNotFound from "./Pages/PageNotFound";
import GlobalStyles from "./Styles/GlobalStyles";
import {Provider} from "react-redux";
import {store} from "./store.js";

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
            <Route path="editor" element={<PostEditor />} />
            <Route path="viewer" element={<PostViewer />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

//Lazzy load each small tag
//square tag
//pagination
//Dark Mode
//Only Logged in user can add post
