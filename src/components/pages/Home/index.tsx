import PostList from 'src/components/shared/PostList'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/types/Post'

export default function Home() {
  const { data: posts, loading: loadingPosts } = useAxios<Post[]>({
    config: {
      method: 'get',
      route: '/post/public',
    },
    fetchOnMount: true,
  })

  return (
    <div>
      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.isHighlighted)}
        title="Bài đăng nổi bật"
      />

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

      <PostList
        loading={loadingPosts}
        posts={posts?.filter(post => post.category === 'Thú cưng khác')}
        title="Bài đăng về thú cưng khác"
      />
    </div>
  )
}
