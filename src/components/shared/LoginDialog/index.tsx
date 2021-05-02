import { Button, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import setServerErrors from 'src/helpers/setServerErrors'
import useAxios from 'src/hooks/useAxios'
import useUser from 'src/hooks/useUser'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { closeModal, openModal } from 'src/redux/slices/modal'
import Dialog from '../Dialog'
import Form from '../Form'
import TextField from '../TextField'
import TextLink from '../TextLink'

type Inputs = {
  email: string
  password: string
}

export default function LoginDialog() {
  const { open } = useAppSelector(state => state.modal)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState<boolean>(false)

  const { fetch: getUser } = useUser({
    onCompleted: () => {
      enqueueSnackbar('Đăng nhập thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
        autoHideDuration: 1500,
        variant: 'success',
      })

      setLoading(false)

      dispatch(closeModal())
    },
    onError: () => {
      setLoading(false)
    },
  })

  // Login API
  const { fetch: login } = useAxios<string>({
    config: {
      method: 'POST',
      route: '/auth/login',
    },
    onCompleted: response => {
      localStorage.setItem('token', response.data)
      getUser()
    },
    onError: error => {
      setLoading(false)

      setServerErrors({
        errors: error?.data,
        fields: ['email', 'password'],
        setError,
      })
    },
  })

  // Login on form submit
  const onSubmit = handleSubmit(data => {
    setLoading(true)

    login({
      data,
    })
  })

  const handleCloseModal = () => dispatch(closeModal())

  const handleLinkClick = () => dispatch(openModal('REGISTER'))

  return (
    <Dialog
      fullWidth
      loading={loading}
      maxWidth="sm"
      open={open === 'LOGIN'}
      title="Đăng nhập"
      onClose={handleCloseModal}
    >
      <Form onSubmit={onSubmit}>
        <TextField
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email"
          {...register('email')}
        />

        <TextField
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Mật khẩu"
          type="password"
          {...register('password')}
        />

        <Button fullWidth type="submit">
          Đăng nhập
        </Button>

        <Typography>
          Chưa có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng ký ngay</TextLink>
        </Typography>
      </Form>
    </Dialog>
  )
}
