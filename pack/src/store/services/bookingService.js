import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const bookingService = createApi({
    reducerPath: "booking",
    tagTypes: "bookings",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
    }),
    endpoints: (builder) => {
        return {
            packageBooking: builder.mutation({
                query: (data) => {
                    return {
                        url: "package-booking",
                        method: "POST",
                        body: data
                    }
                },
                invalidatesTags: ['bookings']
            }),
            fetchUserBooking: builder.query({
                query: (id) => {
                    return {
                        url: `fetch-user-booking/${id}`,
                        method: "GET",
                    }
                },
                providesTags: ['bookings']
            }),
            checkOutSessionPayment: builder.mutation({
                query: (data) => {
                    return {
                        url: 'create-checkout-session',
                        method: "POST",
                        body: data
                    }
                }
            }),
            verifyPayment: builder.query({
                query: (id) => {
                    return {
                        url: `verify-payment/${id}`,
                        method: "GET",
                    }
                }
            }),
            getAllBookings: builder.query({
                query: () => {
                    return {
                        url: `fetch-all-bookings`,
                        method: "GET",
                    }
                }
            }),
        }
    }
})

export const { useGetAllBookingsQuery, useVerifyPaymentQuery, useFetchUserBookingQuery, usePackageBookingMutation, useCheckOutSessionPaymentMutation } = bookingService;

export default bookingService;

