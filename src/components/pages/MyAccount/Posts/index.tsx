import { Tab, Tabs } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/types/Post'
import useStyles from './styles'

export default function Posts() {
  const classes = useStyles()

  const { data: posts, loading } = useAxios<Post[]>({
    config: {
      method: 'get',
      route: 'post/user',
    },
    fetchOnMount: true,
  })

  const [state, setState] = useState<Post['state']>('PUBLISHED')

  const handleTabChange = (_event: ChangeEvent<any>, state: Post['state']) => {
    setState(state)
  }

  return (
    <CardWithTitle title="Bài đăng của bạn">
      <Tabs
        classes={{
          root: classes.root,
        }}
        indicatorColor="primary"
        value={state}
        variant="fullWidth"
        onChange={handleTabChange}
      >
        <Tab label="Đang hoạt động" value="PUBLISHED" />
        <Tab label="Bản nháp" value="DRAFT" />
        <Tab label="Chờ duyệt" value="PENDING" />
        <Tab label="Bị từ chối" value="REJECTED" />
        <Tab label="Đã ẩn" value="HIDDEN" />
      </Tabs>

      <div className={classes.posts}>
        {posts
          ?.filter(post => post.state === state)
          .map(post => (
            <div key={post._id}>{JSON.stringify(post)}</div>
          ))}
      </div>
    </CardWithTitle>
  )
}
