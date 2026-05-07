import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated,  setLoading,  setUser} from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
<<<<<<< HEAD
  tagTypes: ["User"],
=======
  tagTypes: ["User", "AdminUsers", "AdminUser"],
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
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
<<<<<<< HEAD
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useUploadAvatarMutation, useUpdatePasswordMutation, useForgotPasswordMutation } = userApi;
=======
    getAdminUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ['AdminUsers']
    }),
    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: ['AdminUser']
    }),
    updateUser: builder.mutation({
      query({id, body}) {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ['AdminUsers'],
    }),
    deleteUser: builder.mutation({
      query({id}) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ['AdminUsers'],
    }),
  }),
});

export const { useGetMeQuery, 
  useUpdateProfileMutation, 
  useUploadAvatarMutation, 
  useUpdatePasswordMutation, useForgotPasswordMutation,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation } = userApi;
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
