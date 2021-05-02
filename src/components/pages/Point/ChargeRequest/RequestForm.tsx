import React, { useEffect, useState } from 'react'
import DialogTitle from '../../../shared/Dialog/DialogTitle'
import DialogContent from '../../../shared/Dialog/DialogContent'
import {
  Button,
  DialogActions,
  DialogContentText,
  TextField,
} from '@material-ui/core'
import Dialog from '../../../shared/Dialog'
import { useForm } from 'react-hook-form'
import NumberTextField from '../../../shared/NumberTextField'
import { useSnackbar } from 'notistack'
import useAxios from '../../../../hooks/useAxios'
import LoadingBackdrop from '../../../shared/LoadingBackdrop'
import { useAppSelector } from '../../../../redux/hooks'
import Form from '../../../shared/Form'
import ChargeInfo from './ChargeInfo'
import { numberSpliter } from '../../../../helpers/numberSpliter'
import { ChargeRequestDTO } from './index'

type Props = {
  handleCloseForm: () => void
  open: boolean
}

function RequestForm({ handleCloseForm, open }: Props) {
  const user = useAppSelector(state => state.user)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [code, setCode] = useState<string>()
  const [point, setPoint] = useState<number>()
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    control,
    register,
    setValue,
    reset,
    watch,
    handleSubmit: handleFormSubmit,
  } = useForm()

  useEffect(() => {
    setValue('phone', user?.phone)
  }, [user, setValue])

  const {
    fetch: submitRequest,
    loading,
    data: response,
  } = useAxios<ChargeRequestDTO>({
    config: {
      method: 'post',
      route: 'charge-request',
    },
    onCompleted: () => {
      enqueueSnackbar('Gửi yêu cầu nạp thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
        autoHideDuration: 1500,
        variant: 'success',
      })
    },
  })

  useEffect(() => {
    if (response) {
      setCode(response.code)
      setPoint(response.amount)
      setOpenInfo(true)
    }
  }, [response])

  const handleSubmit = handleFormSubmit(data => {
    if (data.amount < 10) {
      enqueueSnackbar('Điểm cần nạp phải lớn hơn 10', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
        autoHideDuration: 1500,
        variant: 'error',
      })
    } else {
      submitRequest({ data }).then(() => {
        reset()
        handleCloseForm()
      })
    }
  })

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          handleCloseForm()
          reset()
        }}
      >
        <LoadingBackdrop open={loading} />
        <DialogTitle>Gửi yêu cầu nạp điểm</DialogTitle>
        <DialogContent>
          <Form style={{ width: 400 }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              defaultValue={user?.phone}
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
              label="Số điện thoại MOMO"
              {...register('phone', {
                required: 'Hãy nhập số điện thoại MOMO',
              })}
            />
            <NumberTextField
              fullWidth
              required
              control={control}
              defaultValue={10}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
              label="Số điểm cần nạp"
              {...register('amount', {
                required: 'Hãy nhập số điểm cần nạp',
                min: { value: 10, message: 'Cần nạp tối thiểu 10 điểm' },
              })}
            />
            <DialogContentText>
              {watch('amount', 10) || 10} điểm ={' '}
              {numberSpliter((watch('amount') || 10) * 1000)} VND
            </DialogContentText>
            <DialogActions>
              <Button color="primary" type="submit">
                Xác nhận
              </Button>
              <Button color="primary" onClick={handleCloseForm}>
                Hủy
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>

      <ChargeInfo
        code={code}
        handleClose={() => setOpenInfo(false)}
        open={openInfo}
        point={point}
      />
    </>
  )
}

export default RequestForm
