import type { User, UserRole } from "../types/user"
import styles from "../components/UserTable.module.css"

interface UserTableProps {
    users: User[]
    onToggleActive: (userId: number) => void
    onUpdateRole: (userId: number, newRole: UserRole) => void
    onRequestSort: (key: keyof User) => void
    sortConfig: { key: keyof User; direction: "asc" | "desc"} | null
}

const ROLES: UserRole[] = ["admin", "editor", "viewer"]

export function UserTable({ users, onToggleActive, onUpdateRole, onRequestSort, sortConfig }: UserTableProps) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => onRequestSort("firstName")}
                            className={styles.sortable}
                        >
                            <span className={styles.headerContent}>  
                                Name
                                <span
                                    className={`${styles.sortArrow} ${
                                        sortConfig?.key === "firstName" ? styles.sortArrowVisible : ""
                                    }`}
                                >
                                    {sortConfig?.direction === "asc" ? "↑" : "↓"}
                                </span>
                            </span>  
                        </th>
                            <th onClick={() => onRequestSort("firstName")}
                            className={styles.sortable}
                        >
                            <span className={styles.headerContent}>  
                                Email
                                <span
                                    className={`${styles.sortArrow} ${
                                        sortConfig?.key === "firstName" ? styles.sortArrowVisible : ""
                                    }`}
                                >
                                    {sortConfig?.direction === "asc" ? "↑" : "↓"}
                                </span>
                            </span>  
                        </th>
                        <th className={styles.hideMobile}>Role</th>
                        <th className={styles.hideMobile}>Status</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td className={styles.hideMobile}>{user.role}</td>
                            <td className={styles.hideMobile}>{user.isActive ? "Active" : "Inactive"}</td>
                            <td>
                                <select
                                    defaultValue=""
                                    aria-label={`Actions for ${user.firstName} ${user.lastName}`}
                                    onChange={(e) => {
                                    const action = e.target.value

                                    if (action === "toggle") {
                                        onToggleActive(user.id)
                                    }

                                    if (action === "admin" || action === "editor" || action === "viewer") {
                                        onUpdateRole(user.id, action)
                                    }

                                    e.currentTarget.value = ""
                                    }}
                                >
                                    <option value="" disabled>
                                    Select
                                    </option>

                                    <option value="toggle">
                                    {user.isActive ? "Deactivate User" : "Activate User"}
                                    </option>

                                    {ROLES
                                    .filter(role => role !== user.role)
                                    .map(role => (
                                        <option key={role} value={role}>
                                        Set Role: {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}