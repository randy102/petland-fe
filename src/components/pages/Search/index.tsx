import { Typography } from '@material-ui/core'
import PostListItem from 'src/components/shared/PostList/PostListItem'
import useQuery from 'src/hooks/useQuery'
import { useAppSelector } from 'src/redux/hooks'
import { Post } from 'src/typings/Post'
import useStyles from './styles'

function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function postHasKeyword(post: Post, keyword: string) {
  const normalizedKeyword = normalizeString(keyword)
  const name = normalizeString(post.name)
  const detail = normalizeString(post.detail)
  const category = normalizeString(post.category)
  const subCategory = normalizeString(post.subCategory)
  const address = normalizeString(post.district + ', ' + post.city)

  return (
    name.includes(normalizedKeyword) ||
    detail.includes(normalizedKeyword) ||
    category.includes(normalizedKeyword) ||
    subCategory.includes(normalizedKeyword) ||
    address.includes(normalizedKeyword)
  )
}

export default function Search() {
  const classes = useStyles()

  const posts = useAppSelector(state => state.posts)

  const query = useQuery()

  const keyword = query.get('keyword') || ''

  return (
    <div>
      <Typography variant="h5">Từ khóa tìm kiếm: {keyword}</Typography>

      <div className={classes.grid}>
        {posts
          ?.filter(post => postHasKeyword(post, keyword))
          .map(post => (
            <PostListItem key={post._id} post={post} />
          ))}
      </div>
    </div>
  )
}
