import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const dataStorage = create(persist(
    (set)=> ({
        getAppsUpdate: false,
        user: {'name': '', 'balance': 0, 'status': ''},
        users: [{'name': '', 'balance': 0, 'status': ''}],
        sessions: [],
        methods: [],
        otherMethods: [],
        keys: '',
        resetKeys: (new_keys) => set(() => ({keys: new_keys})),
        resetUsers: (new_users) => set(() => ({users: new_users})),
        resetMethods: (new_methods) => set(() => ({methods: new_methods})),
        resetOtherMethods: (new_methods) => set(() => ({otherMethods: new_methods})),
        resetSessions: (new_sessions) => set(() => ({sessions: new_sessions})),
        resetStatus: (name, balance, stat) => set(() => ({user: {'name': name, 'balance': balance, 'status': stat}})),
        setGetUpdates: (data) => set(() => ({ getAppsUpdate: data }))
    }),
    {name: 'user_data_storage',
        storage: createJSONStorage(() => sessionStorage)}))