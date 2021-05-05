export type User = {
  _id: string
  createdAt: number
  createdBy: string | null
  updatedAt: number | null
  updatedBy: string | null
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
