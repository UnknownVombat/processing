import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";



export const userapi = createApi({
    reducerPath: 'userapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body: body
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']}
            })
        }),
        switchActive: build.mutation({
            query: (active) => ({
                url: '/users/switch_active',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: active
            })
        }),
        auth: build.query({
            query: () => ({
                url: '/users/check_auth',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']}
            })
        }),
        workers: build.query({
            query: () => ({
                url: '/users/get',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']}
            })
        }),
        deleteSession: build.mutation({
            query: (user_id) => ({
                url: '/users/session',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: user_id
            })
        }),
        addBot: build.mutation({
            query: (body) => ({
                url: '/users/bot',
                method: 'POST',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']},
                body: body
            })
        }),
        Bot: build.query({
            query: () => ({
                url: '/users/bot',
                headers: {'Authorization': JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']}
            })
        })
    })
})