import React from 'react'
import { useParams } from 'react-router'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { IMAGE_BASE_URL } from 'src/constants'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/typings/Post'
import useStyles from './styles'
import clsx from 'clsx'
import ReactImageGallery from 'react-image-gallery'
import {
  Box,
  Button,
  Chip,
  Grid,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core'
import {
  ChevronRightRounded,
  ChevronLeftRounded,
  FullscreenRounded,
  FullscreenExitRounded,
  Phone,
  ReplyRounded,
} from '@material-ui/icons'
import getPostRelativeDate from 'src/helpers/getPostRelativeDate'
import Price from 'src/components/shared/Price'
import Image from 'src/components/shared/Image'
import { QA } from 'src/typings/QA'
import CommentCard from './CommentCard'
import { useSharedStyles } from 'src/assets/styles/shared'

type Params = {
  id: string
}

export default function PostDetails() {
  const classes = useStyles()

  const globalClasses = useSharedStyles()

  console.log(globalClasses)

  // Post id
  const { id } = useParams<Params>()

  // Get post details
  const { data: post, loading: loadingPost } = useAxios<Post>({
    config: {
      method: 'get',
      route: `/post/${id}`,
    },
    fetchOnMount: true,
  })

  // Get all post questions
  const { data: questions, loading: loadingQuestions } = useAxios<QA[]>({
    config: {
      method: 'get',
      route: `/qa?postID=${id}`,
    },
    fetchOnMount: true,
  })

  if (loadingPost || loadingQuestions) {
    return <LoadingBackdrop open />
  }

  if (!post) {
    return null
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
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
        </Grid>

        <Grid item sm={6} xs={12}>
          <Typography
            className={globalClasses['multiline-ellipsis-3']}
            variant="h4"
          >
            {post.name}
          </Typography>

          <Typography
            className={globalClasses['margin-top-0.5']}
            variant="subtitle2"
          >
            <i className="fas fa-clock" />{' '}
            {getPostRelativeDate(post.updatedAt as number)}
          </Typography>

          {post.isHighlighted && (
            <Chip
              className={globalClasses['margin-top-1']}
              color="primary"
              label={
                <Typography variant="subtitle2">
                  <i className="fas fa-star" /> Nổi bật
                </Typography>
              }
            />
          )}

          <Typography
            className={clsx(
              globalClasses['margin-top-2'],
              globalClasses['font-weight-500']
            )}
            color="primary"
            variant="h5"
          >
            <Price price={post.price} />
          </Typography>

          <Box mt={2}>
            <div className={classes.userInfo}>
              {post.createdUser.avatar ? (
                <Image
                  className={classes.userAvatar}
                  id={post.createdUser.avatar}
                />
              ) : (
                <Icon className={classes.defaultAvatar}>person</Icon>
              )}

              <Typography
                className={globalClasses['font-weight-500']}
                variant="subtitle1"
              >
                {post.createdUser.name}
              </Typography>
            </div>

            <Button
              color="primary"
              component="a"
              href={'tel:' + post.createdUser.phone}
              startIcon={<Phone />}
            >
              {post.createdUser.phone}
            </Button>
          </Box>

          <Box mt={3}>
            <table>
              {[
                {
                  icon: 'fas fa-map-marker-alt',
                  label: 'Địa điểm',
                  content: post.district + ', ' + post.city,
                },
                {
                  icon: 'fas fa-paw',
                  label: 'Giống',
                  content: post.subCategory,
                },
                {
                  icon: `fas fa-${post.sex === 'MALE' ? 'mars' : 'venus'}`,
                  label: 'Giới tính',
                  content: post.sex === 'MALE' ? 'Đực' : 'Cái',
                },
                {
                  icon: 'fas fa-birthday-cake',
                  label: 'Tuổi',
                  content: post.age + ' tháng',
                },
                {
                  icon: 'fas fa-syringe',
                  label: 'Đã tiêm chủng',
                  content: post.vaccination ? 'Có' : 'Không',
                },
              ].map(x => (
                <tr key={x.label}>
                  <td className={classes.td}>
                    <Typography className={classes.infoLabel}>
                      <i className={clsx(x.icon, 'fa-fw fa-lg')} /> {x.label}:
                    </Typography>
                  </td>

                  <td className={classes.td}>
                    <Typography
                      className={globalClasses['single-line-ellipsis']}
                    >
                      {x.content}
                    </Typography>
                  </td>
                </tr>
              ))}

              <tr>
                <td>
                  <Typography className={classes.infoLabel}>
                    <i className="fas fa-info-circle fa-fw fa-lg" /> Mô tả thêm:
                  </Typography>
                </td>
              </tr>

              <tr>
                <td colSpan={2}>
                  <Typography>
                    <i
                      className={clsx(
                        'fas fa-info-circle fa-fw fa-lg',
                        classes.transparent
                      )}
                    />{' '}
                    {post.detail || 'Không có'}
                  </Typography>
                </td>
              </tr>
            </table>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Box pt={4}>
          <Typography gutterBottom variant="h5">
            <i className="fas fa-question-circle" /> Hỏi đáp về thú cưng
          </Typography>

          <Grid container spacing={3}>
            {questions?.map(question => (
              <Grid container item key={question._id} spacing={1}>
                <Grid item xs={12}>
                  <CommentCard
                    _id={question._id}
                    content={question.detail}
                    createdAt={question.createdAt}
                    name={question.createdName}
                  />
                </Grid>

                {question.comments?.map(comment => (
                  <Grid item key={comment._id} xs={12}>
                    <Box pl={5}>
                      <CommentCard
                        _id={comment._id}
                        content={comment.detail}
                        createdAt={comment.createdAt}
                        name={comment.createdName}
                      />
                    </Box>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Box pl={5}>
                    <Button
                      color="default"
                      startIcon={<ReplyRounded />}
                      variant="text"
                    >
                      Trả lời
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  )
}
