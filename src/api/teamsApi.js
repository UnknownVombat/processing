import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";


export const teamsapi = createApi({
    reducerPath: 'teamsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        methods: build.query({
            query: () => ({
                url: '/teams/methods',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']}
            })
        }),
        switchActive: build.mutation({
            query: (body) => ({
                url: '/teams/method/switch_active',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: body
            })
        }),
        addMethod: build.mutation({
            query: (method_id) => ({
                url: '/teams/add_method',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: method_id
            })
        }),
        teams: build.query({
            query: () => ({
                url: '/teams/get',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
            })
        }),
        banTeam: build.mutation({
            query: (body) => ({
                url: '/teams/ban',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: body
            })
        })
    })
})