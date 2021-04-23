import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useForm } from 'react-hook-form'
import useStyles from './styles'
import TypeSelect from './TypeSelect'

export default function SearchBar() {
  const classes = useStyles()

  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(data => {
    console.log('Keyword:', data.search)
  })

  return (
    <form noValidate className={classes.search} onSubmit={onSubmit}>
      <SearchIcon />

      <InputBase
        classes={{
          root: classes.inputRoot,
        }}
        defaultValue=""
        inputRef={register}
        name="search"
        placeholder="Tìm kiếm..."
      />

      <TypeSelect />
    </form>
  )
}
