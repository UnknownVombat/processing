import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

let key = null
if (window.sessionStorage.auth_data_storage){
    key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']
}

export const withdrawsapi = createApi({
    reducerPath: 'withdrawsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        sendWithdraw: build.mutation({
            query: (body) => ({
                url: '/withdraws/new',
                method: 'POST',
                headers: {'Authorization': key},
                body: body
            })
        }),
        withdraws: build.query({
            query: () => ({
                url: '/withdraws/get',
                headers: {'Authorization': key},
            })
        }),
        updateWithdraw: build.mutation({
            query: (body) => ({
                url: '/withdraws/send_code',
                method: 'POST',
                headers: {'Authorization': key},
                body: body
            })
        }),
        takeCode: build.query({
            query: () => ({
                url: '/withdraws/code',
                headers: {'Authorization': key},
            })
        })
    })
})