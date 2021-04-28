import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Typography,
} from '@material-ui/core'
import { IMAGE_BASE_URL } from 'src/constants'
import epochToString from 'src/helpers/epochToString'
import { Post } from 'src/types/Post'
import useStyles from './styles'

type Props = {
  post: Post
}

export default function PostItem(props: Props) {
  const { post } = props

  const classes = useStyles()

  const handleEditClick = (post: Post) => {
    console.log('Edit', post)

    if (['PUBLISHED', 'HIDDEN'].includes(post.state)) {
      // Open confirm edit dialog
    }

    // Open edit page
  }

  const handleDeleteClick = (post: Post) => {
    console.log('Delete', post)
    // Open confirm delete dialog
  }

  const handleHideClick = (post: Post) => {
    console.log('Hide', post)
    // Open confirm hide dialog
  }

  const handlePublishClick = (post: Post) => {
    console.log('Publish', post)
    // Change from DRAFT to PENDING
  }

  const handleCancelVerifyClick = (post: Post) => {
    console.log('Cancel verify', post)
    // Change from PENDING to DRAFT
  }

  return (
    <Card className={classes.card} key={post._id}>
      <CardMedia
        className={classes.thumbnail}
        image={`${IMAGE_BASE_URL}/${post.mainImage}`}
        title={post.name}
      />

      <div className={classes.body}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {post.name}
          </Typography>

          <Typography variant="body1">
            Ngày tạo: {epochToString(post.createdAt)}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            color="secondary"
            size="small"
            startIcon={<Icon>edit</Icon>}
            onClick={() => handleEditClick(post)}
          >
            Chỉnh sửa
          </Button>

          {post.state === 'PUBLISHED' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Icon>visibility_off</Icon>}
              onClick={() => handleHideClick(post)}
            >
              Ẩn
            </Button>
          )}

          <Button
            color="secondary"
            size="small"
            startIcon={<Icon>delete</Icon>}
            onClick={() => handleDeleteClick(post)}
          >
            Xóa
          </Button>

          {post.state === 'DRAFT' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Icon>publish</Icon>}
              onClick={() => handlePublishClick(post)}
            >
              Đăng bài
            </Button>
          )}

          {post.state === 'PENDING' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Icon>clear</Icon>}
              onClick={() => handleCancelVerifyClick(post)}
            >
              Hủy xét duyệt
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  )
}
