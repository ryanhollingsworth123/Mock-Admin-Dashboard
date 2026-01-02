import { useEffect, useState } from "react"
import { fetchUsers } from "../services/userService"
import type { User, UserRole } from "../types/user"
import { UserTable } from "../components/UserTable"
import styles from "../pages/Dashboard.module.css"
import UserCard from "../components/UserCard"


export function Dashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [roleFilter, setRoleFilter] = useState<UserRole | "all">(
        () => {
            const storedRole = localStorage.getItem("roleFilter")
            return storedRole ? (storedRole as UserRole | "all") : "all"
        }
    )
    const [sortConfig, setSortConfig] = useState<{
        key: keyof User
        direction: "asc" | "desc"
    } | null>(null)

    const USERS_PER_PAGE = 15

    const [currentPage, setCurrentPage] = useState(1)

    function requestSort(key: keyof User) {
        setSortConfig(prev => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" }
            }

            return { key, direction: "asc"}
        })
    }

    function toggleUserActive(userId: number) {
        setUsers(prevUsers => {
            const updated = prevUsers.map(user =>
                user.id === userId ? { ...user, isActive: !user.isActive } : user
            )
            localStorage.setItem("users", JSON.stringify(updated))
            return updated
        })
    }

    function updateUserRole(userId: User["id"], newRole: UserRole) {
        setUsers(prevUsers => {
            const updated = prevUsers.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            )
            localStorage.setItem("users", JSON.stringify(updated))
            return updated
        })
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, roleFilter])

    useEffect(() => {
        async function loadUsers() {
            try {
                // 1️⃣ Check local storage first
                const storedUsers = localStorage.getItem("users")
                if (storedUsers) {
                    setUsers(JSON.parse(storedUsers))
                } else {
                    // 2️⃣ Fallback: fetch from API
                    const data = await fetchUsers()
                    setUsers(data)
                    localStorage.setItem("users", JSON.stringify(data))
                }
            } catch (err) {
                setError("Unable to load users")
            } finally {
                setIsLoading(false)
            }
        }

        loadUsers()
    }, [])

    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage")
        const storedSearch = localStorage.getItem("searchTerm")
        const storedRole = localStorage.getItem("roleFilter")

        if (storedPage) setCurrentPage(Number(storedPage))
        if (storedSearch) setSearchTerm(storedSearch)
        if (storedRole) setRoleFilter(storedRole as UserRole | "all")
    }, [])


    useEffect(() => { localStorage.setItem("currentPage", currentPage.toString()) }, [currentPage])
    useEffect(() => { localStorage.setItem("searchTerm", searchTerm) }, [searchTerm])
    useEffect(() => { localStorage.setItem("roleFilter", roleFilter) }, [roleFilter])

    if (isLoading) return <p>Loading users...</p>
    if (error) return <p>{error}</p>

    const filteredUsers = [...users]
        .filter(user => {
            const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesRole = roleFilter === "all" ? true : user.role === roleFilter
            return matchesSearch && matchesRole                        
        })
        .sort((a, b) => {
            if (!sortConfig) return 0

            const { key, direction } = sortConfig
            const aValue = a[key]
            const bValue = b[key]

            if (typeof aValue === "string" && typeof bValue === "string") {
                return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
            } else if (typeof aValue === "number" && typeof bValue === "number") {
                return direction === "asc" ? aValue - bValue : bValue - aValue
            }
            return 0
        })

        const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)

        const startIndex = (currentPage - 1) * USERS_PER_PAGE
        const endIndex = startIndex + USERS_PER_PAGE

        const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return (
        <div>
            <h2>User Management</h2>
            <input
                type="text"
                placeholder="Search users by name or email"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <select
                className={styles.filterRole}
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value as UserRole | "all")}
            >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
            <UserTable 
                users={paginatedUsers}
                onToggleActive={toggleUserActive}
                onUpdateRole={updateUserRole}
                onRequestSort={requestSort}
                sortConfig={sortConfig}
            />
            <div className={styles.cardsWrapper}>
                {paginatedUsers.map(user => (
                    <UserCard 
                        key={user.id}
                        user={user}
                        onToggleActive={toggleUserActive}
                        onUpdateRole={updateUserRole}
                    />
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => setCurrentPage(p => Math.max(p -1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i +1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${styles.pageButton} ${
                            currentPage === page ? styles.pageButtonActive : ""
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className={styles.pageButton}
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}