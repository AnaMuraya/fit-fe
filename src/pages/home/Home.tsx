import userService from '../../services/user'

// import styles from './style.module.scss'
import { useState } from 'react'

const Home = () => {
  const [content, setContent] = useState('')
  userService
    .getPublicContent()
    .then((response) => {
      setContent(response.data)
    })
    .catch((err) => {
      setContent(
        (err.response && err.response.data) || err.message || err.toString()
      )
    })

  return (
    <div>
      Home <div>{content}</div>
    </div>
  )
}

export default Home
