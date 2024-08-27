import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import PostList from "./Pages/PostList";
import PostEditor from "./Pages/PostEditor";
import PostViewer from "./Pages/PostViewer";
import PageNotFound from "./Pages/PageNotFound";
import GlobalStyles from "./Styles/GlobalStyles";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {staleTime: 0}
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="lists" />} />
            <Route path="lists" element={<PostList />} />
            <Route path="editor" element={<PostEditor />} />
            <Route path="viewer" element={<PostViewer />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

//Lazzy load each small tag
//square tag
//pagination
//Dark Mode
//Only Logged in user can add post
