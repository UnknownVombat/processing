import { configureStore } from '@reduxjs/toolkit';
import {userapi} from "./userApi";
import {withdrawsapi} from "./withdrawsApi";
import {methodsapi} from "./methodsApi";
import {applicationsapi} from "./applicationsApi";
import {teamsapi} from "./teamsApi";
import { adminApi } from './adminApi';



export const store = configureStore({
    reducer: {
        [userapi.reducerPath]: userapi.reducer,
        [withdrawsapi.reducerPath]: withdrawsapi.reducer,
        [methodsapi.reducerPath]: methodsapi.reducer,
        [applicationsapi.reducerPath]: applicationsapi.reducer,
        [teamsapi.reducerPath]: teamsapi.reducer,
        [adminApi.reducerPath]: adminApi.reducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
    })
        .concat(userapi.middleware)
        .concat(withdrawsapi.middleware)
        .concat(methodsapi.middleware)
        .concat(applicationsapi.middleware)
        .concat(teamsapi.middleware)
        .concat(adminApi.middleware)
})
