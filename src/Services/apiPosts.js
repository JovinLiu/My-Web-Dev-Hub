import axios from "axios";

export async function getPosts() {
  const res = await axios("http://localhost:9001/posts");

  return res.data;
}
