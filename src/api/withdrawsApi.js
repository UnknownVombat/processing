import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

export const withdrawsapi = createApi({
    reducerPath: 'withdrawsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        sendWithdraw: build.mutation({
            query: (body, headers) => ({
                url: '/withdraws/new/',
                method: 'POST',
                headers: headers,
                body: body
            })
        }),
        getWithdraws: build.query({
            query: (headers) => ({
                url: '/withdraws/get/',
                headers: headers,
            })
        }),
        updateWithdraw: build.mutation({
            query: (body, headers) => ({
                url: '/withdraws/send_code/',
                method: 'POST',
                headers: headers,
                body: body
            })
        }),
        takeCode: build.query({
            query: (headers) => ({
                url: '/withdraws/code/',
                headers: headers,
            })
        })
    })
})