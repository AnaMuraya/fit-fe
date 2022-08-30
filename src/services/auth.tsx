import axios from 'axios'
const API_URL = 'https://localhost:3000/api/auth/'

// POST {username, password} & save JWT to Local Storage
const login = (username: string, password: string) => {
  return axios
    .post(API_URL + 'signin', { username, password })
    .then((response) => {
      response.data.accessToken &&
        localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    })
}

// remove JWT from Local Storage
const logout = () => {
  localStorage.removeItem('user')
}

// POST {username, email, password}
const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + 'signup', { username, email, password })
}

// get stored user information (including JWT)
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
