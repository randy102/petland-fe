import React from 'react'
import { useParams } from 'react-router'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { IMAGE_BASE_URL } from 'src/constants'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/types/Post'
import useStyles from './styles'
import clsx from 'clsx'
import ReactImageGallery from 'react-image-gallery'
import {
  Box,
  Button,
  Card,
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
  ReportProblem,
} from '@material-ui/icons'
import getPostRelativeDate from 'src/helpers/getPostRelativeDate'
import Price from 'src/components/shared/Price'
import Image from 'src/components/shared/Image'
import { useAppDispatch } from 'src/redux/hooks'
import { openModal } from 'src/redux/slices/modal'
import CardWithTitle from 'src/components/shared/CardWithTitle'

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

  const dispatch = useAppDispatch()

  const openReportModal = () => dispatch(openModal('REPORT'))

  if (loadingPost) {
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
          <Typography className={classes.title} variant="h4">
            {post.name}
          </Typography>

          <Box mt={0.5}>
            <Typography variant="subtitle2">
              <i className="fas fa-clock" />{' '}
              {getPostRelativeDate(post.updatedAt as number)}
            </Typography>
          </Box>

          {post.isHighlighted && (
            <Box mt={1}>
              <Chip
                color="primary"
                label={
                  <Typography variant="subtitle2">
                    <i className="fas fa-star" /> Nổi bật
                  </Typography>
                }
              />
            </Box>
          )}

          <Box mt={2}>
            <Typography color="primary" variant="h5">
              <Box fontWeight={500}>
                <Price price={post.price} />
              </Box>
            </Typography>
          </Box>

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

              <Typography variant="subtitle1">
                <Box fontWeight={500}>{post.createdUser.name}</Box>
              </Typography>
            </div>

            <Box display="flex">
              <Button
                color="primary"
                component="a"
                href={'tel:' + post.createdUser.phone}
                startIcon={<Phone />}
              >
                {post.createdUser.phone}
              </Button>

              <Button
                className={classes.reportButton}
                color="secondary"
                startIcon={<ReportProblem />}
                onClick={openReportModal}
              >
                Báo cáo
              </Button>
            </Box>
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
                    <i className={clsx(x.icon, 'fa-fw fa-lg')} />
                  </td>
                  <td className={classes.td}>
                    <Typography className={classes.infoLabel}>
                      {x.label}:
                    </Typography>
                  </td>
                  <td className={classes.td}>
                    <Typography className={classes.singleLineEllipsis}>
                      {x.content}
                    </Typography>
                  </td>
                </tr>
              ))}

              <tr>
                <td>
                  <i className="fas fa-info-circle fa-fw fa-lg" />
                </td>
                <td>
                  <Typography className={classes.infoLabel}>
                    Mô tả thêm:
                  </Typography>
                </td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td colSpan={2}>
                  <Typography>{post.detail || 'Không có'}</Typography>
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
        </Box>
      </Grid>
    </React.Fragment>
  )
}
