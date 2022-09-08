import { useState } from 'react'

import userService from '../../services/user'

import styles from './style.module.scss'

const AdminBoard = () => {
  const [content, setContent] = useState<string>('')
  userService
    .getAdminBoard()
    .then((response) => setContent(response.data))
    .catch(
      (err) =>
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
    )
  return (
    <div className={styles.wrapper}>
      AdminBoard <div>{content}</div>
    </div>
  )
}

export default AdminBoard
