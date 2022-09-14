import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import AuthService from '../../services/auth'

import styles from './style.module.scss'

type Iuser = {
  username: string
  email: string
  roles: string[]
  accessToken: string
}

const Navbar = () => {
  const [showAdmin, setShowAdmin] = useState<boolean>(false)
  const [showUser, setShowUser] = useState<boolean>(false)
  const user: Iuser = AuthService.getCurrentUser()
  useEffect(() => {
    if (user != null) {
      setShowAdmin(user?.roles.includes('ROLE_ADMIN'))
      setShowUser(user?.roles.includes('ROLE_USER'))
    }
  }, [])

  const handleLogout = () => {
    AuthService.logout()
  }

  return (
    <div className={user ? styles.wrapper : styles.wrapperTwo}>
      <div className={styles.logoWrapper}>
        <Link to="/">
          <div className={cn(styles.logo, styles.list)}>Navbar</div>
        </Link>
      </div>
      <ul className={styles.options}>
        {user ? (
          <>
            {showUser && (
              <li>
                <Link to="/user">
                  <div className={cn(styles.list)}>User</div>
                </Link>
              </li>
            )}
            <li>
              <Link to="/profile">
                <div className={cn(styles.list)}>Profile</div>
              </Link>
            </li>
            {showAdmin && (
              <li>
                <Link to="/admin">
                  <div className={cn(styles.list)}>Admin</div>
                </Link>
              </li>
            )}
            <li>
              <Link to="/logout">
                <div>
                  <button
                    className={cn(styles.list)}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </div>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">
                <div className={cn(styles.list)}>Login</div>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <div className={cn(styles.list)}>Signup</div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar
