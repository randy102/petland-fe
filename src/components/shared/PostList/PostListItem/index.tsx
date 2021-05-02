import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE_URL } from 'src/constants'
import getPostRelativeDate from 'src/helpers/getPostRelativeDate'
import { Post } from 'src/types/Post'
import DefaultImage from '../../DefaultImage'
import Price from '../../Price'
import useStyles from './styles'

type Props = {
  post: Post
}

export default function PostListItem(props: Props) {
  const { post } = props

  const classes = useStyles()

  const [imageFailed, setImageFailed] = useState<boolean>(false)

  const handleImageError = () => {
    setImageFailed(true)
  }

  return (
    <Card classes={{ root: classes.cardRoot }}>
      {props.post.isHighlighted && (
        <div className={classes.hotRibbon}>NỔI BẬT</div>
      )}

      <CardActionArea
        className={classes.actionArea}
        component={Link}
        to={'/post/' + post._id}
      >
        <div className={classes.mainImageContainer}>
          {imageFailed ? (
            <DefaultImage className={classes.mainImage} fontSize={100} />
          ) : (
            <img
              alt=""
              className={classes.mainImage}
              src={IMAGE_BASE_URL + '/' + post.mainImage}
              title={post.name}
              onError={handleImageError}
            />
          )}
        </div>

        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="subtitle2">
            {post.name}
          </Typography>

          <div>
            {[
              {
                icon: 'fas fa-paw',
                text: post.subCategory,
              },
              {
                icon: 'fas fa-' + (post.sex === 'MALE' ? 'mars' : 'venus'),
                text: post.sex === 'MALE' ? 'Đực' : 'Cái',
              },
              {
                icon: 'fas fa-map-marker-alt',
                text: post.city,
              },
              {
                icon: 'fas fa-clock',
                text: getPostRelativeDate(post.updatedAt || 0),
              },
            ].map(o => (
              <Typography
                gutterBottom
                className={clsx(classes.info, classes.singleLineEllipsis)}
                key={o.icon}
                variant="body2"
              >
                <i className={clsx(o.icon, 'fa-fw', classes.icon)} />
                {o.text}
              </Typography>
            ))}
          </div>

          <Typography
            className={clsx(classes.price, classes.singleLineEllipsis)}
            color="primary"
            variant="subtitle1"
          >
            <Price price={post.price} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
