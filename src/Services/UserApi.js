import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/api/v1"}),
  tagTypes: ["User"],
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
      })
    }),

    signup: builder.mutation({
      query: (signupInfo) => ({
        url: "/users/account/signup",
        method: "POST",
        body: signupInfo
      })
    })
  })
});

export const {useGetUserByIdQuery, useCheckingMutation, useSigninMutation, useSignupMutation} = userApi;
