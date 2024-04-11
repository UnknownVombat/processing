import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

export const applicationsapi = createApi({
    reducerPath: 'applicationsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        ActiveApplications: build.query({
            query: (headers) => ({
                url: '/applications/get',
                headers: headers,
            })
        }),
        AllApplications: build.query({
            query: (headers) => ({
                url: '/applications/get/success',
                headers: headers,
            })
        }),
        AdminAllApplications: build.query({
            query: (headers) => ({
                url: '/applications/all',
                headers: headers,
            })
        }),
        updateStatus: build.mutation({
            query: (body, headers) => ({
                url: '/applications/update',
                method: 'POST',
                headers: headers,
                body: body
            })
        })
    })
})