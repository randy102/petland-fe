import { Button, Menu, MenuItem, Popover } from '@material-ui/core'
import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './styles'
import theme from 'src/theme'

export type SearchType = 'pet' | 'product'

const label = {
  'pet': 'Thú cưng',
  'product': 'Sản phẩm'
}

export default function TypeSelect() {
  const classes = useStyles()

  const [type, setType] = useState<SearchType>('pet')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Button
        classes={{
          root: classes.searchButtonRoot
        }}
        color="secondary"
        size="small"
        variant="contained"
        onClick={handleButtonClick}
      >
        {label[type]}

        <ExpandMoreIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        getContentAnchorEl={null}
        open={!!anchorEl}
        transformOrigin={{
          horizontal: 'center',
          vertical: theme.spacing(-0.5),
        }}
        onClose={handleClose}
      >
        <MenuItem>
          {label['pet']}
        </MenuItem>
        
        <MenuItem>
          {label['product']}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
