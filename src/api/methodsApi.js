import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

export const methodsapi = createApi({
    reducerPath: 'methodsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getMethods: build.query({
            query: (headers) => ({
                url: '/methods/get/',
                headers: headers,
            })
        })
    })
})