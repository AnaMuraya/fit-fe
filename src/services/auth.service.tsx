import axios from 'axios'
const API_URL = 'htto://localhost:3000/api/auth/'

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + 'signin', { username, password })
    .then((response) => {
      response.data.accessToken &&
        localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + 'signup', { username, email, password })
}

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    return JSON.parse(userStr)
  }
  return null
}

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser
}

export default AuthService
