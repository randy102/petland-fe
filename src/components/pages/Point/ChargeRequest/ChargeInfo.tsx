import React from 'react'
import Dialog from '../../../shared/Dialog'
import DialogContent from '../../../shared/Dialog/DialogContent'
import { DialogContentText } from '@material-ui/core'
import { numberSpliter } from '../../../../helpers/numberSpliter'

type Props = {
  open: boolean
  handleClose: () => void
  code?: string
  point?: number
}

function ChargeInfo({ open, handleClose, code, point }: Props) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <h1 style={{ textAlign: 'center' }}>Hoàn tất chuyển khoản</h1>
        <DialogContentText align="center">
          Vui lòng chuyển số tiền <b>{numberSpliter((point || 10) * 1000)}</b>{' '}
          VND vào tài khoản MOMO <b>0388053223</b> kèm theo nội dung:
        </DialogContentText>
        <DialogContentText>
          <h2 style={{ textAlign: 'center' }}>{code}</h2>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default ChargeInfo
