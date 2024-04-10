import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

export const userapi = createApi({
    reducerPath: 'userapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: '/users/login/',
                method: 'POST',
                body: body
            })
        }),
        logout: build.mutation({
            query: (headers) => ({
                url: '/users/logout/',
                method: 'POST',
                headers: headers
            })
        }),
        switchActive: build.mutation({
            query: (active, headers) => ({
                url: '/users/switch_active/',
                method: 'POST',
                headers: headers,
                body: active
            })
        }),
        auth: build.query({
            query: (headers) => ({
                url: '/users/check_auth/',
                headers: headers
            })
        }),
        workers: build.query({
            query: (headers) => ({
                url: '/users/get/',
                headers: headers
            })
        }),
        deleteSession: build.mutation({
            query: (user_id, headers) => ({
                url: '/users/session/',
                method: 'POST',
                headers: headers,
                body: user_id
            })
        }),
        addBot: build.mutation({
            query: (body, headers) => ({
                url: '/users/bot/',
                method: 'POST',
                headers: headers,
                body: body
            })
        }),
        Bot: build.query({
            query: (headers) => ({
                url: '/users/bot/',
                headers: headers
            })
        })
    })
})