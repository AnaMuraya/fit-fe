import { useFormik } from 'formik'

import styles from './style.module.scss'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: function (values) {
      alert(`Name: ${values.name}, Password: ${values.password}`)
    }
  })
  return (
    <div className={styles.loginWrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
        <p>Login</p>
        <div className={styles.inputs}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={styles.formInput}
          />
          {formik.touched.name && formik.errors.name && (
            <span>{formik.errors.name}</span>
          )}
        </div>
        <div className={styles.inputs}>
          <label htmlFor="name">Password</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={styles.formInput}
          />
        </div>
      </form>
    </div>
  )
}

export default Login
