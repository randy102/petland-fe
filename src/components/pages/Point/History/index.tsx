import React from 'react'
import { DataGrid, GridColumns } from '@material-ui/data-grid'
import CardWithTitle from '../../../shared/CardWithTitle'
import epochToString from '../../../../helpers/epochToString'
import useAxios from '../../../../hooks/useAxios'
import LoadingBackdrop from '../../../shared/LoadingBackdrop'

type Transaction = {
  _id: string
  createdAt: number
  amount: number
  description: string
}

const columns: GridColumns = [
  {
    field: 'amount',
    headerName: 'Điểm',
    width: 100,
    // eslint-disable-next-line react/display-name
    renderCell: params =>
      Number(params.value) < 0 ? (
        <span style={{ color: 'red' }}>{params.value}</span>
      ) : (
        <span style={{ color: 'green' }}>+{params.value}</span>
      ),
  },
  { field: 'description', headerName: 'Ghi chú', width: 250, flex: 1 },
  {
    field: 'createdAt',
    headerName: 'Ngày giao dịch',
    width: 150,
    valueGetter: params => epochToString(Number(params.value)),
  },
]

function History() {
  const { data, loading } = useAxios<Transaction[]>({
    config: {
      method: 'get',
      route: 'point-transaction/user',
    },
    fetchOnMount: true,
  })

  return (
    <>
      <LoadingBackdrop open={loading} />
      <CardWithTitle title="Lịch sử giao dịch">
        <div style={{ height: 450, width: '100%' }}>
          <DataGrid
            columns={columns}
            pageSize={6}
            rows={data?.map(r => ({ ...r, id: r._id })) || []}
          />
        </div>
      </CardWithTitle>
    </>
  )
}

export default History
