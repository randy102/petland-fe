import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import getPostRelativeDate from 'src/helpers/getPostRelativeDate'
import useQuery from 'src/hooks/useQuery'
import { Comment } from 'src/typings/Comment'
import useStyles from './styles'

type Props = {
  name: string
  createdAt: number
  content: string
  comment?: Comment
  _id: string
}

export default function CommentCard(props: Props) {
  const classes = useStyles()

  const ref = useRef<HTMLDivElement>()

  const query = useQuery()

  const questionId = query.get('question')

  useEffect(() => {
    if (questionId && questionId === props._id) {
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [questionId])

  return (
    <Card ref={ref} variant="outlined">
      <CardContent classes={{ root: classes.cardContent }}>
        <Box display="flex">
          <Typography gutterBottom variant="subtitle2">
            {props.name}
          </Typography>

          {props.createdAt && (
            <Typography color="textSecondary" variant="subtitle2">
              <Box fontWeight="fontWeightRegular">
                &nbsp;·&nbsp;
                {getPostRelativeDate(props.createdAt)}
              </Box>
            </Typography>
          )}
        </Box>

        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
    </Card>
  )
}
