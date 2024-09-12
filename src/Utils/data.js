import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  // baseQuery: fetchBaseQuery({baseUrl: "https://virtualdb.vercel.app"}),
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/api/v1"}),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    //returns posts with query and total number of posts and total number of posts by a category in the database
    getPostsByConditions: builder.query({
      query: (arg) => {
        return {
          url: arg.category
            ? `/posts?category=${arg.category}&search=${arg.search}&page=${arg.page}&limit=${arg.limit}`
            : `/posts?search=${arg.search}&page=${arg.page}&limit=${arg.limit}`
        };
      },
      invalidatesTags: ["Post"]
    }),

    //return a single post by provided ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      invalidatesTags: ["Post"]
    }),

    addNewPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        headers: {"content-type": "application/json"},
        body: post
      }),
      invalidatesTags: ["Post"]
    }),

    updatePost: builder.mutation({
      query: ({id, updatedPost}) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        headers: {"content-type": "application/json"},
        body: updatedPost
      }),
      invalidatesTags: ["Post"]
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Post"]
    }),

    getTopicStats: builder.query({
      query: (category) => `/posts/topic-stats?category=${category || ""}`,
      invalidatesTags: ["Post"]
    }),

    //not in use
    getAllPosts: builder.query({
      query: () => "/posts",
      invalidatesTags: ["Post"]
    })
  })
});

export const {
  useGetAllPostsQuery,
  useGetTopicStatsQuery,
  useGetPostsByConditionsQuery,
  useGetTotalPostsQuantityQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
