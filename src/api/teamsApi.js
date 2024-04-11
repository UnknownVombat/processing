import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

let key = null
if (window.sessionStorage.auth_data_storage){
    key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']
}

export const teamsapi = createApi({
    reducerPath: 'teamsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        methods: build.query({
            query: () => ({
                url: '/teams/methods',
                headers: {'Authorization': key}
            })
        }),
        switchActive: build.mutation({
            query: (body) => ({
                url: '/teams/method/switch_active',
                method: 'POST',
                headers: {'Authorization': key},
                body: body
            })
        }),
        addMethod: build.mutation({
            query: (method_id) => ({
                url: '/teams/add_method',
                method: 'POST',
                headers: {'Authorization': key},
                body: method_id
            })
        }),
        teams: build.query({
            query: () => ({
                url: '/teams/get',
                headers: {'Authorization': key},
            })
        }),
        banTeam: build.mutation({
            query: (body) => ({
                url: '/teams/ban',
                method: 'POST',
                headers: {'Authorization': key},
                body: body
            })
        })
    })
})