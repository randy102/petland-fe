import axios from 'axios'

export default function getCategories() {
  return axios.get('/category')
}
