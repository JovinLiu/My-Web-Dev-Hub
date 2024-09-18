import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/api/v1"}),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/users/${id}`
    }),

    checking: builder.mutation({
      query: (email) => ({
        url: "/users/account",
        method: "POST",
        body: email
      })
    }),

    signin: builder.mutation({
      query: (signinInfo) => ({
        url: "/users/account/signin",
        method: "POST",
        body: signinInfo
      }),
      invalidatesTags: ["Posts"]
    }),

    signup: builder.mutation({
      query: (signupInfo) => ({
        url: "/users/account/signup",
        method: "POST",
        body: signupInfo
      })
    }),

    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgetPassword",
        method: "POST",
        body: {email}
      })
    }),

    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/resetPassword",
        method: "PATCH",
        body: credentials
      })
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/users/deleteMe/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useGetUserByIdQuery,
  useCheckingMutation,
  useSigninMutation,
  useSignupMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation
} = usersApi;
