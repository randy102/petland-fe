import { useState } from 'react'
import CardWithTitle from '../../../shared/CardWithTitle'
import { Button, Tooltip } from '@material-ui/core'
import { DataGrid, GridColumns } from '@material-ui/data-grid'
import RequestForm from './RequestForm'
import useAxios from '../../../../hooks/useAxios'
import LoadingBackdrop from '../../../shared/LoadingBackdrop'
import epochToString from '../../../../helpers/epochToString'
import { WarningRounded } from '@material-ui/icons'

const STATE_DICT = {
  PENDING: <span style={{ color: 'gray' }}>Đang chờ duyệt</span>,
  DONE: <span style={{ color: 'green' }}>Thành công</span>,
  FAILED: <span style={{ color: 'red' }}>Thất bại</span>,
}

export type ChargeRequestDTO = {
  _id: string
  amount: number
  phone: string
  code: string
  state: string
  createdAt: number
}

function ChargeRequest() {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const { data, loading, fetch } = useAxios<ChargeRequestDTO[]>({
    config: {
      method: 'get',
      route: '/charge-request/user',
    },
    fetchOnMount: true,
  })

  const columns: GridColumns = [
    { field: 'code', headerName: 'Mã', width: 150 },
    { field: 'amount', headerName: 'Điểm', width: 100, type: 'number' },
    { field: 'phone', headerName: 'SĐT', width: 150 },
    {
      field: 'state',
      headerName: 'Trạng thái',
      type: 'string',
      width: 250,
      renderCell: params => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return STATE_DICT[String(params.value)]
      },
    },
    {
      field: 'createdAt',
      headerName: 'Ngày yêu cầu',
      width: 150,
      valueFormatter: params => epochToString(Number(params.value)),
    },
    {
      field: 'rejectedReason',
      headerName: ' ',
      headerAlign: 'center',
      width: 80,
      // eslint-disable-next-line react/display-name
      renderCell: params => {
        const state = String(params.getValue('state'))
        return state === 'FAILED' ? (
          <Tooltip placement="top" title={String(params.value)}>
            <WarningRounded />
          </Tooltip>
        ) : (
          <></>
        )
      },
    },
  ]

  function handleCloseForm() {
    setOpenForm(false)
    setTimeout(() => fetch())
  }

  return (
    <>
      <LoadingBackdrop open={loading} />
      <CardWithTitle title="Yêu cầu nạp điểm">
        <Button style={{ marginBottom: 10 }} onClick={() => setOpenForm(true)}>
          Nạp điểm
        </Button>
        <div style={{ height: 450, width: '100%' }}>
          <DataGrid
            columns={columns}
            pageSize={6}
            rows={data?.map(r => ({ ...r, id: r._id })) || []}
          />
        </div>
      </CardWithTitle>
      <RequestForm handleCloseForm={handleCloseForm} open={openForm} />
    </>
  )
}

export default ChargeRequest
