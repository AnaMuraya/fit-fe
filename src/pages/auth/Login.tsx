import { useFormik } from 'formik'

import styles from './style.module.scss'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    onSubmit: function(values){
      alert(`Name: ${values.name}, Password: ${values.password}`)
    }
  })
  return <div className={styles.wrapper}>
    <form onSubmit={formik.handleSubmit}>
      <h3>Login</h3>
      <div>
        <label htmlFor="name">Username</label>
        <input type="text" name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
      </div>
    </form>
  </div>
}

export default Login
