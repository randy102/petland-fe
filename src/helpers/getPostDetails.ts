import axios from 'axios'

export default function getPostDetails(postID: string | number) {
  return axios.get(`/post/${postID}`)
}
