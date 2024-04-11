import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

let key = ''
try {
    key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']
} catch (e) {
    window.location.href = '/auth'
}

export const applicationsapi = createApi({
    reducerPath: 'applicationsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        ActiveApplications: build.query({
            query: () => ({
                url: '/applications/get',
                headers: {'Authorization': key},
            })
        }),
        AllApplications: build.query({
            query: () => ({
                url: '/applications/get/success',
                headers: {'Authorization': key},
            })
        }),
        AdminAllApplications: build.query({
            query: () => ({
                url: '/applications/all',
                headers: {'Authorization': key},
            })
        }),
        updateStatus: build.mutation({
            query: (body) => ({
                url: '/applications/update',
                method: 'POST',
                headers: {'Authorization': key},
                body: body
            })
        })
    })
})