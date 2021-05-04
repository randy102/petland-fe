import { useParams } from 'react-router'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { IMAGE_BASE_URL } from 'src/constants'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/types/Post'
import useStyles from './styles'
import clsx from 'clsx'
import ReactImageGallery from 'react-image-gallery'
import { Button, IconButton, Typography } from '@material-ui/core'
import {
  ChevronRightRounded,
  ChevronLeftRounded,
  FullscreenRounded,
  FullscreenExitRounded,
  Phone,
} from '@material-ui/icons'
import getPostRelativeDate from 'src/helpers/getPostRelativeDate'
import Price from 'src/components/shared/Price'

type Params = {
  id: string
}

export default function PostDetails() {
  const classes = useStyles()

  const { id } = useParams<Params>()

  const { data: post, loading: loadingPost } = useAxios<Post>({
    config: {
      method: 'get',
      route: `/post/${id}`,
    },
    fetchOnMount: true,
  })

  if (loadingPost) {
    return <LoadingBackdrop open />
  }

  if (!post) {
    return null
  }

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <ReactImageGallery
          additionalClass={classes.slider}
          items={[post.mainImage, ...post.images].map(id => ({
            original: IMAGE_BASE_URL + '/' + id,
            thumbnail: IMAGE_BASE_URL + '/' + id,
          }))}
          renderFullscreenButton={(onClick, isFullScreen) => (
            <IconButton
              aria-label="fullscreen"
              classes={{
                root: clsx(classes.iconButton, classes.fullscreenButton),
              }}
              onClick={onClick}
            >
              {isFullScreen ? (
                <FullscreenExitRounded fontSize="inherit" />
              ) : (
                <FullscreenRounded fontSize="inherit" />
              )}
            </IconButton>
          )}
          renderLeftNav={(onClick, disabled) => (
            <IconButton
              aria-label="previous image"
              classes={{
                root: clsx(
                  classes.iconButton,
                  classes.navButton,
                  classes.navButtonLeft
                ),
              }}
              disabled={disabled}
              onClick={onClick}
            >
              <ChevronLeftRounded fontSize="inherit" />
            </IconButton>
          )}
          renderRightNav={(onClick, disabled) => (
            <IconButton
              aria-label="next image"
              classes={{
                root: clsx(
                  classes.iconButton,
                  classes.navButton,
                  classes.navButtonRight
                ),
              }}
              disabled={disabled}
              onClick={onClick}
            >
              <ChevronRightRounded fontSize="inherit" />
            </IconButton>
          )}
          showPlayButton={false}
        />
      </div>

      <div className={classes.column}>
        <Typography className={classes.title} variant="h4">
          {post.name}
        </Typography>

        <Typography variant="subtitle2">
          {getPostRelativeDate(post.updatedAt as number)}
        </Typography>

        <Typography color="primary" variant="h6">
          <Price price={post.price} />
        </Typography>

        <Button component="a" href="tel:0377981322" startIcon={<Phone />}>
          {'0377981322'}
        </Button>

        <div>
          <i className="fas fa-map-marker" />
          Địa điểm:
        </div>
      </div>
    </div>
  )
}
