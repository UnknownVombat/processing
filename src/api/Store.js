import { configureStore } from '@reduxjs/toolkit';
import {userapi} from "./userApi";


export const store = configureStore({
    reducer: {
        [userapi.reducerPath]: userapi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware()
        .concat(userapi.middleware)
})
