import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
<<<<<<< HEAD
=======
  tagTypes: ["Order", "AdminOrders"],
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
<<<<<<< HEAD
          url: "/orders/new",
=======
          url: "/orders/new", 
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
          method: "POST",
          body
        }
      }
    }),
<<<<<<< HEAD

=======
    myOrders: builder.query({
      query: () => `me/orders`,
    }),
    OrderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order'],
    }),
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
<<<<<<< HEAD
          body
        }
      }
    }),
  }),
});

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } = orderApi;
=======
          body,
        }
      }
    }),
    getDashboardSales: builder.query({
      query: ({startDate, endDate}) => `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ['AdminOrders']
    }),
    updateOrder: builder.mutation({
      query({id, body}) {
        return {
          url: `/admin/orders/${id}`, 
          method: "PUT",
          body
        };
      },
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`, 
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"],
    }),
  }),
});

export const { useCreateNewOrderMutation, 
  useStripeCheckoutSessionMutation, 
  useMyOrdersQuery, 
  useOrderDetailsQuery, 
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation} = orderApi;
>>>>>>> 998ca10ab58964e6ded975519753f82723124b1a
