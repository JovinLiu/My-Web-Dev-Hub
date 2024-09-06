import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({baseUrl: "https://virtualdb.vercel.app"}),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts"
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`
    }),

    addNewPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        headers: {"content-type": "application/json"},
        body: post
      })
    }),

    updatePost: builder.mutation({
      query: ({id, updatedPost}) => ({
        url: `/posts/${id}`,
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: updatedPost
      })
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const {useGetAllPostsQuery, useGetPostByIdQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation} = postsApi;
