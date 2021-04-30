import axios from 'axios'

export default function getSubcategories(categoryID: string | number) {
  return axios.get(`/sub-category?category=${categoryID}`)
}
