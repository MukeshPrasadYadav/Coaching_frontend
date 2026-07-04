import type { Permission } from "./permissions";
import type { Role } from "./roles";

export interface User {
    id?: string;
    userId?: string;
    name: string;
    email?: string;
    contactNumber?: string;
    role?: Role;
    roles?: Role[];
    permissions?: Permission[];
}

export interface AuthUser {
    user: User | null;

    isAuthenticated: boolean;

    setUser: (user: User | null) => void;

    logout: () => void;

    hasRole: (role: Role) => boolean;

    hasPermission: (permission: Permission) => boolean;
}
