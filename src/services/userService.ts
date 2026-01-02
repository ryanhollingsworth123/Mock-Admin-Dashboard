import type { UsersResponse, User } from "../types/user"

const USERS_API_URL = "https://dummyjson.com/users"

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(USERS_API_URL)

    if (!response.ok) {
        throw new Error("Failed to fetch users")
    }

    const data: UsersResponse = await response.json()

    return data.users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "viewer",
        isActive: true
    }))
}