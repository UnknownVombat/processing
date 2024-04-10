import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

export const teamsapi = createApi({
    reducerPath: 'teamsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        methods: build.query({
            query: (headers) => ({
                url: '/teams/methods/',
                headers: headers
            })
        }),
        switchActive: build.mutation({
            query: (body, headers) => ({
                url: '/teams/method/switch_active/',
                method: 'POST',
                headers: headers,
                body: body
            })
        }),
        addMethod: build.mutation({
            query: (method_id, headers) => ({
                url: '/teams/add_method/',
                method: 'POST',
                headers: headers,
                body: method_id
            })
        }),
        teams: build.query({
            query: (headers) => ({
                url: '/teams/get/',
                headers: headers,
            })
        }),
        banTeam: build.mutation({
            query: (body, headers) => ({
                url: '/teams/ban/',
                method: 'POST',
                headers: headers,
                body: body
            })
        })
    })
})