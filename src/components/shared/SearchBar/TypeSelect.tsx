import { Button, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export type SearchType = 'pet' | 'product'

const searchTypeLabel: Record<SearchType, string> = {
  pet: 'Thú cưng',
  product: 'Sản phẩm',
}

export default function TypeSelect() {
  const [type, setType] = useState<SearchType>('pet')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleItemClick = (type: SearchType) => {
    setType(type)
    handleClose()
  }

  return (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={handleButtonClick}
      >
        {searchTypeLabel[type]}

        <ExpandMoreIcon />
      </Button>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {Object.keys(searchTypeLabel).map(type => (
          <MenuItem
            key={type}
            onClick={() => handleItemClick(type as SearchType)}
          >
            {searchTypeLabel[type as SearchType]}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}
