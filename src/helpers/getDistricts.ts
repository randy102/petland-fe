import axios from 'axios'

export default function getDistricts(cityID: string | number) {
  return axios.get(`/district?city=${cityID}`)
}
