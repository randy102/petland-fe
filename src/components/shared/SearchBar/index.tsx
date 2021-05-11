import { IconButton, InputBase, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'

export default function SearchBar() {
  const classes = useStyles()

  const { register, handleSubmit } = useForm()

  const history = useHistory()

  const onSubmit = handleSubmit(data => {
    history.push(`/search?keyword=${data.search}`)
  })

  return (
    <Paper className={classes.root} component="form" onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        placeholder="Tìm kiếm trên Petland..."
        {...register('search', {
          required: true,
        })}
      />
      <IconButton
        aria-label="search"
        className={classes.iconButton}
        type="submit"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
