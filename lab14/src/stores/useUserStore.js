
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set) => ({
        usuario: null,

        login: (userData) => {
            console.log('Guardando usuario en el store:', userData);
            set({ usuario: userData });
        },

        logout: () => {
            set({ usuario: null });
        },
        }),
        {
        name: 'usuario-storage',
        }
    )
);