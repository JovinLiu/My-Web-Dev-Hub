import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({baseUrl: "https://virtualdb.vercel.app"}),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts"
    }),

    getPostsByCategory: builder.query({
      query: (arg) => {
        return {
          url: arg.category === "" ? `/posts` : `/posts?category=${arg.category}`
        };
      },
      providesTags: ["Post"]
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"]
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
        method: "PUT",
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
    })
  })
});

export const {
  useGetAllPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
