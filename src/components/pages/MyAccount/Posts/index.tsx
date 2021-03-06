import { CircularProgress, Tab, Tabs } from '@material-ui/core'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import NoData from 'src/components/shared/NoData'
import useAxios from 'src/hooks/useAxios'
import { Post } from 'src/typings/Post'
import useStyles from './styles'
import PostItem from './PostItem'
import useQuery from 'src/hooks/useQuery'
import HighlightPicker from './HighlightPicker'

export default function Posts() {
  const classes = useStyles()

  const [highlightPost, setHighlightPost] = useState<string>()

  const { data: posts, loading, fetch } = useAxios<Post[]>({
    config: {
      method: 'get',
      route: '/post/user',
    },
    fetchOnMount: true,
  })

  const query = useQuery()

  useEffect(() => {
    const queryState = query.get('state')

    if (
      !queryState ||
      !['PUBLISHED', 'DRAFT', 'PENDING', 'HIDDEN', 'REJECTED'].includes(
        queryState
      )
    )
      return

    setState(queryState as Post['state'])
  }, [])

  const [state, setState] = useState<Post['state']>('PUBLISHED')

  const handleTabChange = (_event: ChangeEvent<any>, state: Post['state']) => {
    setState(state)
  }

  function handleHighlightClick(postId: string) {
    setHighlightPost(postId)
  }

  function handleHighlightClose() {
    setHighlightPost(undefined)
    fetch()
  }

  const filteredPosts = useMemo(
    () => posts?.filter(post => post.state === state) || [],
    [posts, state]
  )

  return (
    <>
      <HighlightPicker
        handleClose={handleHighlightClose}
        highlightPost={highlightPost}
      />
      <CardWithTitle title="Bài đăng của bạn">
        <Tabs
          classes={{
            root: classes.tabs,
          }}
          indicatorColor="primary"
          value={state}
          variant="fullWidth"
          onChange={handleTabChange}
        >
          <Tab label="Công khai" value="PUBLISHED" />
          <Tab label="Bản nháp" value="DRAFT" />
          <Tab label="Chờ duyệt" value="PENDING" />
          <Tab label="Bị từ chối" value="REJECTED" />
          <Tab label="Đã ẩn" value="HIDDEN" />
        </Tabs>

        {loading ? (
          <div className={classes.loading}>
            <CircularProgress size={50} />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={classes.loading}>
            <NoData />
          </div>
        ) : (
          <div className={classes.posts}>
            {filteredPosts.map(post => (
              <PostItem
                key={post._id}
                openHighlight={handleHighlightClick}
                post={post}
                refetchPosts={fetch}
              />
            ))}
          </div>
        )}
      </CardWithTitle>
    </>
  )
}
