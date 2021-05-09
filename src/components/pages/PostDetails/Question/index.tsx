import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@material-ui/core'
import { ReplyRounded } from '@material-ui/icons'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSharedStyles } from 'src/assets/styles/shared'
import { useAppSelector } from 'src/redux/hooks'
import { QA } from 'src/typings/QA'
import CommentCard from '../CommentCard'
import useStyles from './styles'

type Props = {
  question: QA
  setQuestions: React.Dispatch<React.SetStateAction<QA[]>>
}

export default function Question(props: Props) {
  const { question, setQuestions } = props

  const classes = useStyles()

  const globalClasses = useSharedStyles()

  const user = useAppSelector(state => state.user)

  const [postingComment, setPostingComment] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = handleSubmit(async data => {
    try {
      setPostingComment(true)

      const { data: comment } = await axios.post('/comment', {
        detail: data.comment,
        qaID: question._id,
      })

      comment.createdName = user?.name

      setQuestions(questions => {
        const newQuestions = [...questions]

        const index = newQuestions.findIndex(q => q._id === question._id)

        newQuestions[index].comments = [
          ...newQuestions[index].comments,
          comment,
        ]

        return newQuestions
      })

      reset()
    } catch (error) {
      console.log('Post reply error:', { error })

      enqueueSnackbar(error?.response?.data.message, { variant: 'error' })
    } finally {
      setPostingComment(false)
    }
  })

  return (
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
        <form
          noValidate
          className={globalClasses['padding-left-5']}
          onSubmit={onSubmit}
        >
          <TextField
            fullWidth
            multiline
            placeholder="Viết câu trả lời..."
            rowsMax={1000}
            {...register('comment', {
              required: true,
            })}
          />

          <Box mt={1} position="relative" width="fit-content">
            <Button
              color="default"
              disabled={postingComment}
              startIcon={<ReplyRounded />}
              type="submit"
              variant="text"
            >
              Đăng câu trả lời
            </Button>

            {postingComment && (
              <CircularProgress
                className={classes.buttonLoadingIcon}
                size={24}
              />
            )}
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}
