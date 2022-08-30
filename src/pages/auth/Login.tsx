import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import AuthService from '../../services/auth'

import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  // const [name, setName] = useState<string>('')
  // const [pass, setPass] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const formik = {
    validationSchema() {
      return Yup.object().shape({
        username: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required')
      })
    },
    handleLogin: (values: { username: string; password: string }) => {
      const { username, password } = values
      setLoading(true)
      setMessage('')

      AuthService.login(username, password)
        .then(() => {
          navigate('/home')
          window.location.reload()
        })
        .catch((err) => {
          const errorMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString()
          setLoading(false)
          setMessage(errorMessage)
          // console.log(errorMessage)
          // navigate('/home')
        })
    },
    initialValues: {
      username: '',
      password: ''
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        onSubmit={formik.handleLogin}
      >
        <Form>
          <div className={styles.loginForm}>
            <div className={styles.inputs}>
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className={styles.formInput} />
              <ErrorMessage name="username" component="div" />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={styles.formInput}
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <div className={styles.submitButton}>
              <button type="submit" disabled={loading}>
                Login
              </button>
            </div>
            <div>
              {loading && <span>Loading please wait</span>}
              {message && <span>{message}</span>}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
