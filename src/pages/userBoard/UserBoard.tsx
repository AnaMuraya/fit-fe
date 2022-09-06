import { useState } from 'react'

import userService from '../../services/user'

import styles from './style.module.scss'

const UserBoard = () => {
  const [content, setContent] = useState<string>('')
  userService
    .getUserBoard()
    .then((response) => setContent(response.data))
    .catch(
      (err) =>
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
    )

  return (
    <div className={styles.wrapper}>
      UserBoard <div>{content}</div>
    </div>
  )
}

export default UserBoard
