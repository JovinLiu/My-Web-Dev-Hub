import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({baseUrl: "https://virtualdb.vercel.app"}),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts"
    }),

    getPostsByConditions: builder.query({
      query: (arg) => {
        console.log(arg);
        return {
          url:
            arg.category === ""
              ? `/posts?search=${arg.searchQuery}&_start=${arg.start}&_limit=${arg.limit}`
              : `/posts?search=${arg.searchQuery}&category=${arg.category}&_start=${arg.start}&_limit=${arg.limit}`
        };
      },
      providesTags: ["Post"]
    }),

    //后端写一下这个
    getPostsBySearchQuery: builder.query({
      query: (arg) => `/posts?search=${arg.searchQuery}&_start=${arg.start}&_limit=${arg.limit}`,
      providesTags: ["Post"]
    }),

    getTotalPostsNumber: builder.query({
      query: () => `/posts/count`,
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
  useGetPostsByConditionsQuery,
  useGetTotalPostsNumberQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
