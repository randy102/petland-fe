import PostList from 'src/components/shared/PostList'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/typings/Post'
import useStyles from './styles'
import AdImage from '../../shared/AdImage'
import { useAppDispatch } from 'src/redux/hooks'
import { setPosts } from 'src/redux/slices/posts'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'

export default function Home() {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const { data: posts, loading: loadingPosts } = useAxios<Post[]>({
    config: {
      method: 'get',
      route: '/post/public',
    },
    fetchOnMount: true,
    onCompleted: response => {
      dispatch(setPosts(response.data))
    },
  })

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={loadingPosts} />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.isHighlighted)}
        title="Bài đăng nổi bật"
      />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.auctionExpired)}
        title="Bài đăng đấu giá"
      />

      <AdImage code="HOME1" />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.category === 'Mèo')}
        title="Bài đăng về mèo"
      />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.category === 'Chó')}
        title="Bài đăng về chó"
      />

      <AdImage code="HOME2" />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.category === 'Chim cảnh')}
        title="Bài đăng về chim cảnh"
      />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.category === 'Cá cảnh')}
        title="Bài đăng về cá cảnh"
      />

      <AdImage code="HOME3" />

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.category === 'Thú cưng khác')}
        title="Bài đăng về thú cưng khác"
      />
    </div>
  )
}
