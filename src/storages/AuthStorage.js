import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export const authStorage = create(persist(
    (set)=> ({
        key: '',
        resetKey: (new_key) => set(() => ({key: new_key}))
    }),
    {name: 'auth_data_storage',
    storage: createJSONStorage(() => sessionStorage)}))