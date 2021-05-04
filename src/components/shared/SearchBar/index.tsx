import { IconButton, InputBase, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useForm } from 'react-hook-form'
import useStyles from './styles'

export default function SearchBar() {
  const classes = useStyles()

  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(data => {
    console.log('Keyword:', data.search)
  })

  return (
    <Paper className={classes.root} component="form" onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        placeholder="Tìm kiếm trên Petland..."
        {...register('search')}
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
