import { Navigate } from 'react-router-dom'

import AuthService from '../../services/auth'

import styles from './style.module.scss'

const Profile = () => {
  const user = AuthService.getCurrentUser()
  return (
    <div className={styles.wrapper}>
      {user ? (
        <>
          <h3>Profile</h3>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.roles}</div>
          {/* <div>{user.accessToken}</div> */}
        </>
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  )
}

export default Profile
