import { Comment } from './Comment'
import { Default } from './Default'

export type QA = Default & {
  detail: string
  postID: string
  post: string
  createdName: string
  comments: Comment[]
}
