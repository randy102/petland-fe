export type Post = {
  _id: string
  createdAt: number
  createdBy: string
  createdName: string
  updatedAt: number | null
  updatedBy: string | null
  name: string
  categoryID: string
  subCategoryID: string
  cityID: string
  districtID: string
  detail: string
  sex: 'MALE' | 'FEMALE'
  vaccination: boolean
  age: number
  price: number
  origin: string
  mainImage: string
  images: string[]
  state: 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'HIDDEN'
  rejectedReason: string | null
  highlightExpired: number | null
  category: string
  subCategory: string
  district: string
  city: string
  isHighlighted: boolean
}
