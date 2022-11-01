import axios from 'axios'

const ip = '192.168.1.108'

const api = axios.create({
  baseURL: `http://${ip}:3100/`,
})

export default api
