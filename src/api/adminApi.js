import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";


export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        addTeam: build.mutation({
            query: (data) => ({
                url: '/admin/register_team',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: data
            })
        }),
        addKey: build.mutation({
            query: (data) => ({
                url: '/admin/create_keys',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: data
            })
        }),
        addWorker: build.mutation({
            query: (data) => ({
                url: '/admin/register_worker',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: data
            })
        })
    })
})
