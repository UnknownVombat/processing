import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

// let key = null
// if (window.sessionStorage.auth_data_storage){
//     key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']
// }

// const key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']

export const applicationsapi = createApi({
    reducerPath: 'applicationsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        ActiveApplications: build.query({
            query: () => ({
                url: '/applications/get',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
            })
        }),
        AllApplications: build.query({
            query: () => ({
                url: '/applications/get/success',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
            })
        }),
        AdminAllApplications: build.query({
            query: () => ({
                url: '/applications/all',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
            })
        }),
        updateStatus: build.mutation({
            query: (body) => ({
                url: '/applications/update',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: body
            })
        })
    })
})