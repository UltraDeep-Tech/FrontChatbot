import axios from "axios"

const apiPlayHt = axios.create({
  baseURL: "https://play.ht/api/v2/tts/stream",
  headers: {
    "accept": 'audio/mpeg',
    'content-type': 'application/json',
    "AUTHORIZATION": 'Bearer 3f0af29320274548acddea6b13d9e243',
    'X-USER-ID': 'KjFbh8jnqONM54CsYJRuwIbJlHL2',
  }
})

export default apiPlayHt

