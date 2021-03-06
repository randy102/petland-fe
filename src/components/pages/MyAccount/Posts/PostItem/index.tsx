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
      'B??i ????ng ???? chuy???n sang tr???ng th??i ???n.'
    )
  }

  const handlePublishClick = () => {
    modifyPostState(
      'put',
      `/post/publish/${post._id}`,
      'B??i ????ng ???? chuy???n sang tr???ng th??i c??ng khai.'
    )
  }

  const handleVerifyClick = () => {
    modifyPostState(
      'put',
      `/post/confirm/${post._id}`,
      'B??i ????ng ???? chuy???n sang tr???ng th??i ch??? duy???t.'
    )
  }

  const handleCancelVerifyClick = () => {
    modifyPostState(
      'put',
      `/post/cancel/${post._id}`,
      'B??i ????ng ???? chuy???n sang tr???ng th??i b???n nh??p.'
    )
  }

  const handleDeleteOk = () => {
    setDeleteOpen(false)

    modifyPostState('delete', `/post/${post._id}`, 'X??a b??i ????ng th??nh c??ng!')
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
        content="H??nh ?????ng n??y s??? kh??ng th??? ho??n t??c."
        open={deleteOpen}
        title="X??a b??i ????ng n??y?"
        onCancel={handleDeleteCancel}
        onOk={handleDeleteOk}
      />

      <ConfirmDialog
        content="B??i ????ng s??? tr??? v??? tr???ng th??i b???n nh??p sau khi ch???nh s???a v?? ph???i x??t duy???t l???i ????? c??ng khai."
        open={editOpen}
        title="Ch???nh s???a b??i ????ng n??y?"
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
            Ng??y t???o: {epochToString(post.createdAt)}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            color="secondary"
            size="small"
            startIcon={<Edit />}
            onClick={handleEditClick}
          >
            Ch???nh s???a
          </Button>

          {post.state === 'PUBLISHED' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<VisibilityOff />}
              onClick={handleHideClick}
            >
              ???n
            </Button>
          )}

          {post.state === 'HIDDEN' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Visibility />}
              onClick={handlePublishClick}
            >
              C??ng khai
            </Button>
          )}

          <Button
            color="secondary"
            size="small"
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            X??a
          </Button>

          {post.state === 'DRAFT' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Publish />}
              onClick={handleVerifyClick}
            >
              ????ng b??i
            </Button>
          )}

          {post.state === 'PENDING' && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Clear />}
              onClick={handleCancelVerifyClick}
            >
              H???y x??t duy???t
            </Button>
          )}

          {post.state === 'PUBLISHED' && !post.isHighlighted && (
            <Button
              color="secondary"
              size="small"
              startIcon={<Star />}
              onClick={() => openHighlight(post._id)}
            >
              Qu???ng c??o b??i vi???t
            </Button>
          )}

          {post.isHighlighted && post.highlightExpired && (
            <Button color="default" size="small" startIcon={<Star />}>
              N???i b???t (c??n {getDateDiff(post.highlightExpired)} ng??y)
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  )
}
