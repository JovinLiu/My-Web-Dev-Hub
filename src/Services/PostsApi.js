import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {host} from "../Utils/config";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://${host}/api/v1`,
  prepareHeaders: (headers) => {
    const token = Cookies.get("jwt");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }
});

export const postsApi = createApi({
  reducerPath: "posts",
  tagTypes: ["Posts"],
  baseQuery,
  endpoints: (builder) => ({
    //returns posts with query and total number of posts and total number of posts by a category in the database
    getPostsByConditions: builder.query({
      query: (arg) => ({
        url: `/posts?${arg.category ? `category=${arg.category}&` : ""}search=${arg.search}&page=${arg.page}&limit=${arg.limit}&fields=${
          arg.fields
        }&sort=${arg.sort}&myposts=${arg.myposts}`
      }),
      providesTags: ["Posts"]
    }),
    //return aggregation pipeline results from the back end
    getTopicStats: builder.query({
      query: (category) => `/posts/topic-stats?category=${category || ""}`,

      providesTags: ["Posts"]
    }),

    getMyPostsStats: builder.query({
      query: () => `/posts/my-posts-stats`,
      providesTags: ["Posts"]
    }),

    //return a single post by provided ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Posts"]
    }),

    // Create a new post using a form data object
    addNewPost: builder.mutation({
      query: (formdata) => ({
        url: "/posts",
        method: "POST",
        body: formdata
      }),
      invalidatesTags: ["Posts"]
    }),

    // Update an existing post by ID
    updatePost: builder.mutation({
      query: ({id, formdata}) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: formdata
      }),
      invalidatesTags: ["Posts"]
    }),

    // Delete a post by ID
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Posts"]
    })
  })
});

export const {
  useGetPostsByConditionsQuery,
  useGetTopicStatsQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetMyPostsStatsQuery
} = postsApi;
