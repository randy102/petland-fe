import axios from 'axios'

export default function getCities() {
  return axios.get('/city')
}
