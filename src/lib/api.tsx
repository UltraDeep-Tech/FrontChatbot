import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  }
})

export default api

