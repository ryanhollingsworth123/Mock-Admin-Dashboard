export type UserRole = "admin" | "editor" | "viewer"

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: UserRole
    isActive: boolean
}

export interface UsersResponse {
    users: User[]
    total: number
    skip: number
    limit: number
}