import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  // baseQuery: fetchBaseQuery({baseUrl: "https://virtualdb.vercel.app"}),
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/api/v1"}),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    //returns posts with query and total number of posts and total number of posts by a category in the database
    getPostsByConditions: builder.query({
      query: (arg) => ({
        url: `/posts?${arg.category ? `category=${arg.category}&` : ""}search=${arg.search}&page=${arg.page}&limit=${arg.limit}&fields=${
          arg.fields
        }&sort=${arg.sort}`
      }),
      providesTags: ["Post"]
    }),

    getTopicStats: builder.query({
      query: (category) => `/posts/topic-stats?category=${category || ""}`,

      providesTags: ["Post"]
    }),

    //return a single post by provided ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"]
    }),

    addNewPost: builder.mutation({
      query: (formdata) => ({
        url: "/posts",
        method: "POST",
        body: formdata
      }),
      invalidatesTags: ["Post"]
    }),

    updatePost: builder.mutation({
      query: ({id, formdata}) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: formdata
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
  useGetPostsByConditionsQuery,
  useGetTopicStatsQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
