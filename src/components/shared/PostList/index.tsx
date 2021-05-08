import { Button, Card, CardActionArea, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import useIsBreakpoint from 'src/hooks/useIsBreakpoint'
import { Post } from 'src/typings/Post'
import NoData from '../NoData'
import PostListItem from './PostListItem'
import useStyles from './styles'

type Props = {
  posts?: Post[]
  title: string
  loading?: boolean
}

export default function PostList(props: Props) {
  const { posts } = props

  const classes = useStyles()

  // Default, 5 columns, 2 rows => Max 10 before show more

  // Tablet, 4 columns, 2 rows => Max 8 before show more
  const isSm = useIsBreakpoint('sm')

  // Mobile, 1 row, horizontal scroll
  const isXs = useIsBreakpoint('xs')

  // Only show see more button if:
  //   - Not mobile
  //   - Default: Has more than 10 posts (5 posts reach row)
  //   - Tablet: has more than 8 posts (4 posts each row)
  const showSeeMoreButton = !isXs && posts && posts.length > (isSm ? 8 : 10)

  // Only show see more card if:
  //   - Is mobile
  //   - Has more than 8 posts
  const showSeeMoreCard = isXs && posts && posts?.length > 8

  if (!posts) {
    return null
  }

  return (
    <div>
      <Typography gutterBottom className={classes.title} variant="h5">
        {props.title}
      </Typography>

      {posts.length ? (
        <div className={classes.grid}>
          {posts?.slice(0, isSm ? 8 : 10).map(post => (
            <PostListItem key={post._id} post={post} />
          ))}

          {showSeeMoreCard && (
            <Card classes={{ root: classes.seeMoreCard }}>
              <CardActionArea
                className={classes.seeMoreActionArea}
                component={Link}
                to={`#`}
              >
                <i
                  className={clsx('fas fa-chevron-right', classes.seeMoreIcon)}
                />
                <Typography variant="h6">Xem thêm</Typography>
              </CardActionArea>
            </Card>
          )}
        </div>
      ) : (
        <Card className={classes.noDataCard}>
          <NoData />
        </Card>
      )}

      {showSeeMoreButton && (
        <Button className={classes.seeMoreBtn} component={Link} to={`#`}>
          Xem thêm
        </Button>
      )}
    </div>
  )
}
