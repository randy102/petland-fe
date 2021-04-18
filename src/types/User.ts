export type User = {
  _id: string
  createdAt: number
  isActive: boolean
  email: string
  phone: string
  password: string
  name: string
  cityID: string
  districtID: string
  role: string
  avatar?: string
}
