import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { IMAGE_BASE_URL } from 'src/constants'
import { Post } from 'src/typings/Post'
import useStyles from './styles'
import clsx from 'clsx'
import ReactImageGallery from 'react-image-gallery'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Icon,
  IconButton,
  TextField,
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
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import {
  decreaseLoadingCount,
  increaseLoadingCount,
} from 'src/redux/slices/loadingCount'
import Question from './Question'

type Params = {
  id: string
}

export default function PostDetails() {
  const classes = useStyles()

  const globalClasses = useSharedStyles()

  const user = useAppSelector(state => state.user)

  const loadingCount = useAppSelector(state => state.loadingCount)

  const { register, handleSubmit, reset } = useForm()

  // Post id
  const { id } = useParams<Params>()

  const [postingQuestion, setPostingQuestion] = useState(false)

  const [details, setDetails] = useState<Post>()

  const [questions, setQuestions] = useState<QA[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getData = async () => {
      dispatch(increaseLoadingCount())

      try {
        const [detailsRes, questionsRes] = await Promise.all([
          axios.get<Post>(`/post/${id}`),
          axios.get<QA[]>(`/qa?postID=${id}`),
        ])

        setDetails(detailsRes.data)
        setQuestions(
          questionsRes.data.sort((a, b) => b.createdAt - a.createdAt)
        )
      } catch (error) {
        console.log('Error:', { error })
      } finally {
        dispatch(decreaseLoadingCount())
      }
    }

    getData()
  }, [])

  const onQuestionSubmit = handleSubmit(async data => {
    try {
      setPostingQuestion(true)

      const { data: question } = await axios.post<QA>(`/qa`, {
        detail: data.question,
        postID: id,
      })

      question.createdName = user?.name || ''
      question.comments = []

      setQuestions(questions => [question, ...questions])
      reset()
    } catch (error) {
      console.log('Post question error:', { error })
    } finally {
      setPostingQuestion(false)
    }
  })

  if (loadingCount > 0 || !details) {
    return null
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <ReactImageGallery
            additionalClass={classes.slider}
            items={[details.mainImage, ...details.images].map(id => ({
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
            {details.name}
          </Typography>

          <Typography
            className={globalClasses['margin-top-0.5']}
            variant="subtitle2"
          >
            <i className="fas fa-clock" />{' '}
            {getPostRelativeDate(details.updatedAt as number)}
          </Typography>

          {details.isHighlighted && (
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
            <Price price={details.price} />
          </Typography>

          <Box mt={2}>
            <div className={classes.userInfo}>
              {details.createdUser.avatar ? (
                <Image
                  className={classes.userAvatar}
                  id={details.createdUser.avatar}
                />
              ) : (
                <Icon className={classes.defaultAvatar}>person</Icon>
              )}

              <Typography
                className={globalClasses['font-weight-500']}
                variant="subtitle1"
              >
                {details.createdUser.name}
              </Typography>
            </div>

            <Button
              color="primary"
              component="a"
              href={'tel:' + details.createdUser.phone}
              startIcon={<Phone />}
            >
              {details.createdUser.phone}
            </Button>
          </Box>

          <Box mt={3}>
            <table>
              {[
                {
                  icon: 'fas fa-map-marker-alt',
                  label: 'Địa điểm',
                  content: details.district + ', ' + details.city,
                },
                {
                  icon: 'fas fa-paw',
                  label: 'Giống',
                  content: details.subCategory,
                },
                {
                  icon: `fas fa-${details.sex === 'MALE' ? 'mars' : 'venus'}`,
                  label: 'Giới tính',
                  content: details.sex === 'MALE' ? 'Đực' : 'Cái',
                },
                {
                  icon: 'fas fa-birthday-cake',
                  label: 'Tuổi',
                  content: details.age + ' tháng',
                },
                {
                  icon: 'fas fa-syringe',
                  label: 'Đã tiêm chủng',
                  content: details.vaccination ? 'Có' : 'Không',
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
                    {details.detail || 'Không có'}
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

          <form noValidate onSubmit={onQuestionSubmit}>
            <TextField
              fullWidth
              multiline
              label="Đặt câu hỏi về thú cưng..."
              rows={2}
              rowsMax={1000}
              {...register('question', {
                required: true,
              })}
            />

            <Box mt={1} position="relative" width="fit-content">
              <Button disabled={postingQuestion} type="submit">
                Đăng câu hỏi
              </Button>

              {postingQuestion && (
                <CircularProgress
                  className={classes.buttonLoadingIcon}
                  size={24}
                />
              )}
            </Box>
          </form>

          <Grid container className={globalClasses['margin-top-3']} spacing={3}>
            {questions?.map(question => (
              <Question
                key={question._id}
                question={question}
                setQuestions={setQuestions}
              />
            ))}
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  )
}
