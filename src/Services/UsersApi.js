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

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery,
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

    updateMe: builder.mutation({
      query: (userInfo) => ({
        url: `/users/updateMe`,
        method: "PATCH",
        body: userInfo
      })
    }),

    updateMyPhoto: builder.mutation({
      query: (formdata) => ({
        url: `/users/updateMyPhoto`,
        method: "PATCH",
        body: formdata
      })
    }),

    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: `/users/updateMyPassword`,
        method: "PATCH",
        body: credentials
      })
    }),

    deleteAccount: builder.mutation({
      query: (credentials) => ({
        url: `/users/deleteMe`,
        method: "DELETE",
        body: credentials
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
  useDeleteAccountMutation,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
  useUpdateMyPhotoMutation
} = usersApi;
