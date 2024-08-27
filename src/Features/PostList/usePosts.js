import {useQuery} from "@tanstack/react-query";
import {getPosts} from "../../Services/apiPosts";

function usePosts() {
  const {isLoading, error, data: posts} = useQuery({queryKey: ["posts"], queryFn: getPosts});
  console.log("posts:", posts);
  return {isLoading, error, posts};
}

export default usePosts;
