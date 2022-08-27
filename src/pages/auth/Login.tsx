import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import AuthService from '../../services/auth'

import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const formik = {
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 3 characters')
        .max(20, 'Password must not exceed 20 characters')
    }),
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: (values: { name: string; password: string }) => {
      alert(`Name: ${values.name}, Password: ${values.password}`)
      const { name, password } = values

      AuthService.login(name, password).then(
        () => {
          navigate('/profile')
          window.location.reload()
        }
        // (err) => {
        //   const errorMessage =
        //     (err.response && err.response.data && err.response.data.message) ||
        //     err.message ||
        //     err.toString()

        // }
      )
    }
  }
  return (
    <div className={styles.loginWrapper}>
      <Formik
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
        onSubmit={formik.onSubmit}
      >
        <Form>
          <div className={styles.loginForm}>
            <div className={styles.inputs}>
              <label htmlFor="name">Username</label>
              <Field type="text" name="name" className={styles.formInput} />
              <ErrorMessage name="name" className={styles.formInput} />
            </div>
            <div className={styles.inputs}>
              <label htmlFor="pass">Password</label>
              <Field type="password" name="pass" className={styles.formInput} />
              <ErrorMessage name="password" className={styles.formInput} />
            </div>
            <div className={styles.submitButton}>
              <button>Login</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
