import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const applicationStorage = create(persist(
    (set)=> ({
        applications: {},
        lastApp: '',
        resetApplications: (new_app) => set(() => ({applications: new_app})),
        resetLastApp: (app) => set(() => ({lastApp: app})),
        deleteData: () => set(() => ({applications: {}}))
    }),
    {name: 'application_data_storage',
        storage: createJSONStorage(() => sessionStorage)}))