import useStyles from './styles'
import SearchIcon from '@material-ui/icons/Search'
import { InputBase } from '@material-ui/core'
import TypeSelect from './TypeSelect'

export default function SearchBar() {
  const classes = useStyles()

  return (
    <div className={classes.search}>
      <SearchIcon />

      <InputBase
        classes={{
          root: classes.inputRoot
        }}
        placeholder="Tìm kiếm..."
      />

      <TypeSelect />
    </div>
  )
}
