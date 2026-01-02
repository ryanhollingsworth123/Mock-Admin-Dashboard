import type { User, UserRole } from "../types/user"
import styles from "../components/userCard.module.css"

interface UserCardProps {
  user: User
  onToggleActive: (id: number) => void
  onUpdateRole: (id: number, role: UserRole) => void
}

export default function UserCard({ user, onToggleActive, onUpdateRole }: UserCardProps) {
  const ROLES: UserRole[] = ["admin", "editor", "viewer"]

  return (
    <div className={styles.userCard}>
      <div><strong>Name:</strong> {user.firstName} {user.lastName}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
      <div><strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}</div>
      <div>
        <select
          defaultValue=""
          onChange={(e) => {
            const val = e.target.value
            if (val === "toggle") onToggleActive(user.id)
            if (ROLES.includes(val as UserRole)) onUpdateRole(user.id, val as UserRole)
            e.currentTarget.value = ""
          }}
        >
          <option value="" disabled>Select</option>
          <option value="toggle">{user.isActive ? "Deactivate" : "Activate"}</option>
          {ROLES.filter(r => r !== user.role).map(role => (
            <option key={role} value={role}>Set Role: {role}</option>
          ))}
        </select>
      </div>
    </div>
  )
}