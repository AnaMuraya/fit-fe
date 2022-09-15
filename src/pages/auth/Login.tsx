import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { LoadingOutlined } from '@ant-design/icons'

import AuthService from '../../services/auth'

import styles from './style.module.scss'

const Login = () => {
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
          // window.location.reload()
        })
        .catch((err) => {
          const errorMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString()
          setLoading(false)
          setMessage(errorMessage)
        })
    },
    initialValues: {
      username: '',
      password: ''
    }
  }

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        onSubmit={formik.handleLogin}
      >
        <Form>
          <div className={styles.authForm}>
            <div className={styles.authMessage}>
              <h3>Login</h3>
              <p>Hey, Enter your details to get signed in to your account</p>
            </div>
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
                Sign in
              </button>
            </div>
            <div className={styles.state}>
              <span>
                Don&apos;t have an account?
                <Link to="/signup">
                  <b> Register now</b>
                </Link>
              </span>
              {loading && (
                <span>
                  <LoadingOutlined className={styles.loading} />
                </span>
              )}
              {message && <span className={styles.error}>{message}!</span>}
            </div>
          </div>
        </Form>
      </Formik>
      <div className={styles.rights}>
        <p>
          Copyright&copy; <Link to="/signin">A.M </Link> 2022 |{' '}
          <Link to="/signin">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
