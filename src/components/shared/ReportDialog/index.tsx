import Dialog from 'src/components/shared/Dialog'
import Form from 'src/components/shared/Form'
import { useForm } from 'react-hook-form'
import TextField from '../TextField'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { closeModal } from 'src/redux/slices/modal'
import axios from 'axios'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { Button } from '@material-ui/core'
import setServerErrors from 'src/helpers/setServerErrors'

type Inputs = {
  email: string
  content: string
}

export default function ReportDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<Inputs>()

  const { open } = useAppSelector(state => state.modal)

  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const handleCloseModal = () => {
    dispatch(closeModal())
    reset()
  }

  const onSubmit = handleSubmit(data => {
    setLoading(true)

    axios
      .post('/report', data)
      .then(response => {
        enqueueSnackbar('Báo cáo thành công!', {
          variant: 'success',
        })

        handleCloseModal()
      })
      .catch(error => {
        console.log('Report error:', { error })

        setServerErrors({
          setError,
          errors: error?.response?.data,
          fields: ['email', 'content'],
        })
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return (
    <Dialog
      fullWidth
      loading={loading}
      maxWidth="sm"
      open={open === 'REPORT'}
      title="Báo cáo"
      onClose={handleCloseModal}
    >
      <Form onSubmit={onSubmit}>
        <TextField
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email của bạn"
          {...register('email')}
        />

        <TextField
          fullWidth
          multiline
          error={!!errors.content}
          helperText={errors.content?.message}
          label="Nội dung báo cáo"
          rows={3}
          {...register('content')}
        />

        <Button type="submit">Báo cáo</Button>
      </Form>
    </Dialog>
  )
}
