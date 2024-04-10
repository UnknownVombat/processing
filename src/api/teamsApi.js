import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";
import {authStorage} from "../storages/AuthStorage";
const key = authStorage((state) => state.key)

const headers = {
    'Authorization': key
}

export const teamsapi = createApi({
    reducerPath: 'apiteams',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getMethods: build.query({
            query: () => ({
                url: '/teams/methods/',
                headers: headers
            })
        }),
        switchActive: build.mutation({
            query: (body) => ({
                url: '/teams/method/switch_active/',
                method: 'POST',
                headers: headers,
                body: body
            })
        }),
        addMethod: build.mutation({
            query: (method_id) => ({
                url: '/teams/add_method/',
                method: 'POST',
                headers: headers,
                body: method_id
            })
        }),
        getTeams: build.query({
            query: () => ({
                url: '/teams/get/',
                headers: headers,
            })
        }),
        banTeam: build.mutation({
            query: (body) => ({
                url: '/teams/ban/',
                method: 'POST',
                headers: headers,
                body: body
            })
        })
    })
})