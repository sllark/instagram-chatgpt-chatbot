import axios from 'axios'

const instance = axios.create({
  baseURL: `https://gmail.googleapis.com/gmail/v1/users/${process.env.GMAIL_USER}`,
  headers: {
    'Content-type': 'application/json',
  },
})

export default instance
