import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
<<<<<<< HEAD
=======
  tagTypes: ["Products", "AdminProducts", "Reviews"], 
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url:"/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "price[gte]": params.min,
          "price[lte]": params.max,
          "ratings[gte]": params?.ratings,
        }
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
<<<<<<< HEAD
=======
      providesTags: ["Products"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["Products"],
    }),

    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),

    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      providesTags: ["AdminProducts"],
    }),

    createProduct: builder.mutation({
      query(body) {
        return {
          url: "/admin/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),

    upateProduct: builder.mutation({
      query({id, body}) {
        return {
          url: `/admin/products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product", "AdminProducts"],
    }),

    uploadProductImages: builder.mutation({
      query({id, body}) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),

    getProductReviews: builder.query({
      query: (productId) => `/reviews?id=${productId}`,
      providesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query({productId, id}) {
        return {
          url: `/admin/reviews`,
          method: "DELETE",
          body: { productId, id }
        };
      },
      invalidatesTags: ["Reviews"],
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
    }),
  }),
});

<<<<<<< HEAD
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
=======
export const { useGetProductsQuery, 
  useGetProductDetailsQuery, 
  useSubmitReviewMutation, 
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpateProductMutation, 
  useUploadProductImagesMutation, 
  useDeleteProductMutation, 
  useLazyGetProductReviewsQuery,
  useDeleteReviewMutation } = productApi;
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
