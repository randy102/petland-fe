import React from 'react'
import Dialog from '../../../shared/Dialog'
import LoadingBackdrop from '../../../shared/LoadingBackdrop'
import DialogTitle from '../../../shared/Dialog/DialogTitle'
import DialogContent from '../../../shared/Dialog/DialogContent'
import { Button, DialogContentText } from '@material-ui/core'
import useAxios from '../../../../hooks/useAxios'
import { DataGrid, GridColumns } from '@material-ui/data-grid'
import { useSnackbar } from 'notistack'

type Props = {
  highlightPost?: string
  handleClose: () => void
}

type PackDTO = {
  _id: string
  price: number
  dateNumber: number
  name: string
}

export default function HighlightPicker(props: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const { data, loading } = useAxios<PackDTO[]>({
    config: {
      method: 'get',
      route: '/pack/public',
    },
    fetchOnMount: true,
  })

  const {
    fetch: submitRegister,
    loading: submitLoading,
    data: response,
  } = useAxios<boolean>({
    config: {
      method: 'post',
      route: '/pack/register/',
    },
    onCompleted: () => {
      enqueueSnackbar('Đăng ký gói thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
        autoHideDuration: 1500,
        variant: 'success',
      })
      props.handleClose()
    },
  })

  function registerPack(packId: string) {
    submitRegister({ url: `/pack/register/${packId}/${props.highlightPost}` })
  }

  const columns: GridColumns = [
    { field: 'price', headerName: 'Điểm', type: 'number' },
    {
      field: 'dayNumber',
      headerName: 'Thời gian dán nhãn',
      flex: 1,
      valueFormatter: (params: any) => `${params.value} ngày`,
    },
    {
      field: 'id',
      headerName: ' ',
      // eslint-disable-next-line react/display-name
      renderCell: (params: any) => (
        <Button onClick={() => registerPack(String(params.value))}>
          Quy đổi
        </Button>
      ),
    },
  ]

  return (
    <Dialog open={!!props.highlightPost} onClose={props.handleClose}>
      <LoadingBackdrop open={loading || submitLoading} />
      <DialogTitle>Đăng ký gói nổi bật</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Dán nhãn nổi bật giúp cho bải viết tiếp cận nhiều người hơn!
        </DialogContentText>
        <div style={{ height: 450, width: '100%' }}>
          <DataGrid
            columns={columns}
            pageSize={6}
            rows={data?.map(r => ({ ...r, id: r._id })) || []}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
