import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import AuthService from '../../services/auth'

import styles from './style.module.scss'
import { useState } from 'react'

const Register = () => {
  const [message, setMessage] = useState<string>('')
  const [successful, setSuccessful] = useState<boolean>(false)
  const formik = {
    validationSchema() {
      return Yup.object().shape({
        username: Yup.string()
          .test(
            'length',
            'Username must be between 3 and 20 characters',
            (val?: any) =>
              val && val.toString().length >= 3 && val.toString() <= 29
          )
          .required('Username is required'),
        email: Yup.string()
          .email('This is not a valid email')
          .required('Email is required'),
        password: Yup.string()
          .test(
            'length',
            'The password length must be between 6 and 40 characters',
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
      AuthService.register(username, email, password)
        .then((response) => {
          setMessage(response.data.message)
          setSuccessful(true)
        })
        .catch((err) => {
          const errorMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString()
          setMessage(errorMessage)
          setSuccessful(false)
        })
    }
  }
  return (
    <div className={styles.registerWrapper}>
      <Formik
        validationSchema={formik.validationSchema}
        initialValues={formik.initialValues}
        onSubmit={formik.handleRegister}
      >
        <Form>
          {!successful && (
            <div>
              <div>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <label htmlFor="conPassword">Confirm Password</label>
                <Field name="conPassword" type="password" />
                <ErrorMessage name="conPassword" component="div" />
              </div>
              <div>
                <label htmlFor="acceptTerms">Accept Terms</label>
                <Field name="acceptTerms" type="checkbox" />
                <ErrorMessage name="acceptTerms" component="div" />
              </div>
            </div>
          )}
          {message && <span>{message}</span>}
        </Form>
      </Formik>
    </div>
  )
}

export default Register
