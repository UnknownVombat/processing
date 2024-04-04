import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const applicationStorage = create(persist(
    (set)=> ({
        applications: [],
        resetApplications: (new_app) => set(() => ({applications: new_app})),
        deleteData: () => set(() => ({applications: {}}))
    }),
    {name: 'application_data_storage',
        storage: createJSONStorage(() => sessionStorage)}))