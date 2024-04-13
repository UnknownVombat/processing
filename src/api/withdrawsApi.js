import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";


export const withdrawsapi = createApi({
    reducerPath: 'withdrawsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    tagTypes: ["Withdraws"],
    endpoints: (build) => ({
        sendWithdraw: build.mutation({
            query: (body) => ({
                url: '/withdraws/new',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: body
            }),
            invalidatesTags: ["Withdraws"]
        }),
        withdraws: build.query({
            query: () => ({
                url: '/withdraws/get',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
            }),
            providesTags: () =>
                ['Withdraws']
        }),
        updateWithdraw: build.mutation({
            query: (body) => ({
                url: '/withdraws/send_code',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: body
            }),
            invalidatesTags: ["Withdraws"]
        }),
        takeCode: build.query({
            query: () => ({
                url: '/withdraws/code',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
            }),
            invalidatesTags: ["Withdraws"]
        })
    })
})