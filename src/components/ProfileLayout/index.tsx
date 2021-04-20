import { Grid } from '@material-ui/core'
import Content from './Content'
import Sidebar from './Sidebar'

type Props = {
  children: React.ReactNode
}

export default function ProfileLayout(props: Props) {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={3}
      >
        <Sidebar />
      </Grid>

      <Grid
        item
        xs
      >
        {props.children}
      </Grid>
    </Grid>
  )
}
