import { configureStore } from '@reduxjs/toolkit';
import {userapi} from "./userApi";
import {withdrawsapi} from "./withdrawsApi";
import {methodsapi} from "./methodsApi";
import {applicationsapi} from "./applicationsApi";
import {teamsapi} from "./teamsApi";



export const store = configureStore({
    reducer: {
        [userapi.reducerPath]: userapi.reducer,
        [withdrawsapi.reducerPath]: withdrawsapi.reducer,
        [methodsapi.reducerPath]: methodsapi.reducer,
        [applicationsapi.reducerPath]: applicationsapi.reducer,
        [teamsapi.reducerPath]: teamsapi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware()
        .concat(userapi.middleware)
})
