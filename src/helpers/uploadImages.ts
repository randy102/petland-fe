import axios from 'axios'

export default function uploadImages(files: File[]) {
  const formData = new FormData()

  files.forEach(file => formData.append('files', file))

  return axios({
    method: 'post',
    url: '/photo',
    data: formData,
  })
}
