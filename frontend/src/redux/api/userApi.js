import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated,  setLoading,  setUser} from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User"],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    
    getMe: builder.query({
      query: () => `/me`,
      //yha se nhi smjh aaya 76
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data))
          dispatch(setIsAuthenticated(true))
          //Logic on lecture 81
          dispatch(setLoading(false))
        } catch (error) {
          //Logic on lecture 81
          dispatch(setLoading(false))
          console.log(error)
        }
      },
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ['User'], 
    }),

    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: "/me/upload_avatar",
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ['User'], 
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/password/update",
          method: "PUT",
          body,
        }
      }, 
    }),

    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forgot",
          method: "POST",
          body,
        }
      }, 
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useUploadAvatarMutation, useUpdatePasswordMutation, useForgotPasswordMutation } = userApi;