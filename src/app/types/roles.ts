export const Role = {
    ADMIN :"ADMIN",
    STUDENT :"STUDENT",
    TEACHER :"TEACHER",
    PARENT :"PARENT",
    PENDING :"PENDING"
} as const;

export type Role = typeof Role[keyof typeof Role];