import { IMAGE_BASE_URL } from 'src/constants'

export default function getImageURL(id: string) {
  return IMAGE_BASE_URL + '/' + id
}
