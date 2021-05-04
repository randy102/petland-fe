import PostList from 'src/components/shared/PostList'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/types/Post'
import useStyles from './styles'
import AdImage from '../../shared/AdImage'

export default function Home() {
  const classes = useStyles()

  const { data: posts, loading: loadingPosts } = useAxios<Post[]>({
    config: {
      method: 'get',
      route: '/post/public',
    },
    fetchOnMount: true,
  })

  return (
    <div className={classes.root}>
      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.isHighlighted)}
        title="Bài đăng nổi bật"
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
        posts={posts?.filter(post => post.category === 'Chim')}
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
