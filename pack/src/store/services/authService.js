import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const getToken = () => {
    // Retrieve token from local storage or session storage
    const token = localStorage.getItem('admin-token')
    return token;
};

const getAuthorizationHeader = () => {
    const token = getToken();
    if (token) {
        console.log(token);
        return `Bearer ${token}`;
    } else {
        return '';
    }
};

const authService = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', getAuthorizationHeader())
            console.log(headers);
            console.log(getAuthorizationHeader());
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            authRegister: builder.mutation({
                query: (data) => {
                    return {
                        url: "register",
                        method: "POST",
                        body: data
                    }
                }
            }),
            authLogin: builder.mutation({
                query: (data) => {
                    return {
                        url: "login",
                        method: "POST",
                        body: data
                    }
                }
            }),
            adminAuth: builder.mutation({
                query: (data) => {
                    return {
                        url: "/dashboard/adminlogin",
                        method: "POST",
                        body: data
                    }
                }
            }),
            userLikePackage: builder.mutation({
                query: (data) => {
                    return {
                        url: '/like/package',
                        method: "POST",
                        body: data
                    }
                }
            }),
            userDisLikePackage: builder.mutation({
                query: (data) => {
                    return {
                        url: '/dislike/package',
                        method: "POST",
                        body: data
                    }
                }
            })
        }
    }
})

export const { useUserDisLikePackageMutation, useUserLikePackageMutation, useAuthLoginMutation, useAuthRegisterMutation, useAdminAuthMutation } = authService;

export default authService;

