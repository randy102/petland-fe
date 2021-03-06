import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@material-ui/core'
import {
  Clear,
  Delete,
  Edit,
  Publish,
  Star,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'
import axios, { AxiosRequestConfig } from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useHistory } from 'react-router'
import ConfirmDialog from 'src/components/shared/ConfirmDialog'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { IMAGE_BASE_URL } from 'src/constants'
import epochToString from 'src/helpers/epochToString'
import { Post } from 'src/typings/Post'
import useStyles from './styles'
import getDateDiff from '../../../../../helpers/getDateDiff'

type Props = {
  post: Post
  refetchPosts: () => void
  openHighlight: (postId: string) => void
}

export default function PostItem(props: Props) {
  const { post, refetchPosts, openHighlight } = props

  const classes = useStyles()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState<boolean>(false)

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const [editOpen, setEditOpen] = useState<boolean>(false)

  const history = useHistory()

  const goToEdit = () => {
    history.push(`/my-post/edit/${post._id}`)
  }

  const handleEditClick = () => {
    if (['PUBLISHED', 'HIDDEN'].includes(post.state)) {
      setEditOpen(true)

      return
    }

    goToEdit()
  }

  const handleDeleteClick = () => {
    setDeleteOpen(true)
  }

  const modifyPostState = (
    method: AxiosRequestConfig['method'],
    url: string,
    successMessage: string
  ) => {
    setLoading(true)

    axios({ method, url })
      .then(res => {
        enqueueSnackbar(successMessage, {
          variant: 'success',
        })
        refetchPosts()
      })
      .catch(err => {
        enqueueSnackbar(err?.response?.data?.message, { variant: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleHideClick = () => {
    modifyPostState(
      'put',
      `/post/hide/${post._id}`,
      'Bài đăng đã chuyển sang trạng thái ẩn.'
    )
  }

  const handlePublishClick = () => {
    modifyPostState(
      'put',
      `/post/publish/${post._id}`,
      'Bài đăng đã chuyển sang trạng thái công khai.'
    )
  }

  const handleVerifyClick = () => {
    modifyPostState(
      'put',
      `/post/confirm/${post._id}`,
      'Bài đăng đã chuyển sang trạng thái chờ duyệt.'
    )
  }

  const handleCancelVerifyClick = () => {
    modifyPostState(
      'put',
      `/post/cancel/${post._id}`,
      'Bài đăng đã chuyển sang trạng thái bản nháp.'
    )
  }

  const handleDeleteOk = () => {
    setDeleteOpen(false)

    modifyPostState('delete', `/post/${post._id}`, 'Xóa bài đăng thành công!')
  }

  const handleDeleteCancel = () => {
    setDeleteOpen(false)
  }

  const handleEditOk = () => {
    setDeleteOpen(false)

    goToEdit()
  }

  const handleEditCancel = () => {
    setEditOpen(false)
  }

  return (
    <Card className={classes.card} key={post._id}>
      <LoadingBackdrop open={loading} />

      <ConfirmDialog
        content="Hành động này sẽ không thể hoàn tác."
        open={deleteOpen}
        title="Xóa bài đăng này?"
        onCancel={handleDeleteCancel}
        onOk={handleDeleteOk}
      />

      <ConfirmDialog
        content="Bài đăng sẽ trở về trạng thái bản nháp sau khi chỉnh sửa và phải xét duyệt lại để công khai."
        open={editOpen}
        title="Chỉnh sửa bài đăng này?"
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />

      <CardMedia
        className={classes.thumbnail}
        image={`${IMAGE_BASE_URL}/${post.mainImage}`}
        title={post.name}
      />

      <div className={classes.body}>
        <CardContent>
          <Typography gutterBottom variant="h6">
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
            startIcon={<Edit />}
            onClick={handleEditClick}
          >
            Chỉnh sửa
          </Button>

          {post.state === 'PUBLISHED' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<VisibilityOff />}
              onClick={handleHideClick}
            >
              Ẩn
            </Button>
          )}

          {post.state === 'HIDDEN' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Visibility />}
              onClick={handlePublishClick}
            >
              Công khai
            </Button>
          )}

          <Button
            color="secondary"
            size="small"
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            Xóa
          </Button>

          {post.state === 'DRAFT' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Publish />}
              onClick={handleVerifyClick}
            >
              Đăng bài
            </Button>
          )}

          {post.state === 'PENDING' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Clear />}
              onClick={handleCancelVerifyClick}
            >
              Hủy xét duyệt
            </Button>
          )}

          {post.state === 'PUBLISHED' && !post.isHighlighted && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Star />}
              onClick={() => openHighlight(post._id)}
            >
              Quảng cáo bài viết
            </Button>
          )}

          {post.isHighlighted && post.highlightExpired && (
            <Button color="default" size="small" startIcon={<Star />}>
              Nổi bật (còn {getDateDiff(post.highlightExpired)} ngày)
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  )
}
