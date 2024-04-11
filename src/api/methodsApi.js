import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const";

// let key = null
// if (window.sessionStorage.auth_data_storage){
//     key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']
// }

const key = JSON.parse(window.sessionStorage.auth_data_storage)['state']['key']

export const methodsapi = createApi({
    reducerPath: 'methodsapi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        methods: build.query({
            query: () => ({
                url: '/methods/get',
                headers: {'Authorization': key},
            })
        })
    })
})