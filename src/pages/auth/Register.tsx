import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import AuthService from '../../services/auth'

import styles from './style.module.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [message, setMessage] = useState<string>('')
  const [successful, setSuccessful] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const formik = {
    validationSchema() {
      return Yup.object().shape({
        username: Yup.string()
          .min(6, 'Username must be at least 6 characters')
          .max(20, 'Username must not exceed 20 characters')
          .required('Username is required'),
        email: Yup.string()
          .email('This is not a valid email')
          .required('Email is required'),
        password: Yup.string()
          .test(
            'length',
            'The password length must be between 6 and 40 characters',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (val: any) =>
              val && val.toString().length >= 6 && val.toString().length <= 40
          )
          .required('Password is required'),
        confirmPassword: Yup.string()
          .required('Please confirm your password')
          .oneOf(
            [Yup.ref('password'), null],
            'Confirm Password does not match'
          ),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
      })
    },
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    },
    handleRegister: (values: {
      username: string
      email: string
      password: string
    }) => {
      const { username, email, password } = values

      setMessage('')
      setSuccessful(false)
      setLoading(true)

      AuthService.register(username, email, password)
        .then((response) => {
          setMessage(response.data.message)
          setSuccessful(true)
          navigate('/signin')
          // window.location.reload()
        })
        .catch((err) => {
          const errorMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString()
          setLoading(false)
          setMessage(errorMessage)
          setSuccessful(false)
        })
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.authWrapper}>
        <Formik
          validationSchema={formik.validationSchema}
          initialValues={formik.initialValues}
          onSubmit={formik.handleRegister}
        >
          <Form>
            {!successful && (
              <div className={styles.authForm}>
                <div className={styles.inputs}>
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className={styles.formInput}
                  />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={styles.formInput}
                  />
                  <ErrorMessage name="email" component="div" />
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
                <div className={styles.inputs}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={styles.formInput}
                  />
                  <ErrorMessage name="confirmPassword" component="div" />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="acceptTerms">Accept Terms</label>
                  <Field
                    name="acceptTerms"
                    type="checkbox"
                    className={styles.formInput}
                  />
                  <ErrorMessage name="acceptTerms" component="div" />
                </div>
                <div className={styles.submitButton}>
                  <button type="submit">Register</button>
                </div>
                {/* should be in colomn style */}
                <div>
                  <span>
                    Already have an account, <Link to="/signin">Signin</Link>
                  </span>
                  {loading && <span>Loading please wait</span>}
                  {message && <span>{message}</span>}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register
