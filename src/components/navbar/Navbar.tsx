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
  const [currentUser, setCurrentUser] = useState<Iuser | undefined>(undefined)
  const [showAdmin, setShowAdmin] = useState<boolean>(false)
  const [showUser, setShowUser] = useState<boolean>(false)
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true)
  const user = AuthService.getCurrentUser()
  // Look into isInitialRender
  useEffect(() => {
    if (isInitialRender) {
      user != null && setCurrentUser(user)
      setIsInitialRender(false)
      if (currentUser) {
        setShowAdmin(currentUser?.roles.includes('ROLE_ADMIN'))
        setShowUser(currentUser?.roles.includes('ROLE_USER'))
      }
    }
  }, [isInitialRender])

  const handleLogout = () => {
    AuthService.logout()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Link to="/">
          <div className={cn(styles.logo, styles.list)}>Navbar</div>
        </Link>
      </div>
      <ul className={styles.options}>
        {currentUser ? (
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
              <Link to="/home">
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
