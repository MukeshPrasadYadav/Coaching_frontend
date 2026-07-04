// src/app/userStore.ts
import { create } from "zustand";
import type { AuthUser } from "./types/user";

export const useUserStore = create<AuthUser>((set, get) => ({
    user: null,

    isAuthenticated: false,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: user !== null,
        }),

    logout: () =>
        set({
            user: null,
            isAuthenticated: false,
        }),

    hasRole: (role) => {
        const user = get().user;
        return user?.role === role || user?.roles?.includes(role) === true;
    },

    hasPermission: (permission) =>
        get().user?.permissions?.includes(permission) ?? false,
}));
