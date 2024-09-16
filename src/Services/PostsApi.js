import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
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
  tagTypes: ["Post"],
  baseQuery,

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
    //return aggregation pipeline results from the back end
    getTopicStats: builder.query({
      query: (category) => `/posts/topic-stats?category=${category || ""}`,

      providesTags: ["Post"]
    }),

    //return a single post by provided ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"]
    }),

    // Create a new post using a form data object
    addNewPost: builder.mutation({
      query: (formdata) => ({
        url: "/posts",
        method: "POST",
        body: formdata
      }),
      invalidatesTags: ["Post"]
    }),

    // Update an existing post by ID
    updatePost: builder.mutation({
      query: ({id, formdata}) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: formdata
      }),
      invalidatesTags: ["Post"]
    }),

    // Delete a post by ID
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
