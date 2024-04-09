import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const applicationStorage = create(persist(
    (set)=> ({
        applications: [],
        methods: {},
        resetApplications: (new_app) => set(() => ({applications: new_app})),
        resetMethods: (method) => set(() => ({methods: method}))
    }),
    {name: 'application_data_storage',
        storage: createJSONStorage(() => sessionStorage)}))