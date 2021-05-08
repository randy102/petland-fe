import { Default } from './Default'

export type User = Default & {
  isActive: boolean
  email: string
  password: string
  name: string
  city: string
  district: string
  role: string
  cityID: string
  districtID: string
  avatar?: string
  phone: string
  points: number
}
