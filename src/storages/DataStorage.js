import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const dataStorage = create(persist(
    (set)=> ({
        user: {'name': '', 'balance': 0, 'status': ''},
        users: [{'name': '', 'balance': 0, 'status': ''}],
        sessions: [],
        methods: [],
        otherMethods: [],
        resetUsers: (new_users) => set(() => ({users: new_users})),
        resetMethods: (new_methods) => set(() => ({methods: new_methods})),
        resetOtherMethods: (new_methods) => set(() => ({otherMethods: new_methods})),
        resetSessions: (new_sessions) => set(() => ({sessions: new_sessions})),
        resetStatus: (name, balance, stat) => set(() => ({user: {'name': name, 'balance': balance, 'status': stat}}))
    }),
    {name: 'user_data_storage',
        storage: createJSONStorage(() => sessionStorage)}))