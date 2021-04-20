import { Button, TextField } from '@material-ui/core'
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
import LoadingBackdrop from '../LoadingBackdrop'
import TextLink from '../TextLink'
import useStyles from './styles'


type Inputs = {
  name: string
  email: string
  phone: string
  password: string
}

export default function RegisterDialog() {
  const classes = useStyles()

  const { open } = useAppSelector(state => state.modal)

  const dispatch = useAppDispatch()

  const { register: registerForm, handleSubmit, setError, errors } = useForm<Inputs>()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState<boolean>(false)

  const { fetch: getUser } = useUser({
    onCompleted: () => {
      enqueueSnackbar('Đăng ký thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 1500,
        variant: 'success'
      })

      setLoading(false)

      dispatch(closeModal())
    },
    onError: () => {
      setLoading(false)
    }
  })

  const { fetch: register } = useAxios<string>({
    config: {
      method: 'POST',
      route: 'auth/register'
    },
    onCompleted: response => {
      localStorage.setItem('token', response.data)
      getUser()
      
    },
    onError: error => {
      setLoading(false)

      setServerErrors({
        errors: error?.data, 
        fields: ['name', 'email', 'phone', 'password'],
        setError
      })
    }
  })

  const onSubmit = handleSubmit(data => {
    setLoading(true)

    register({
      data
    })
  })

  const handleCloseModal = () => dispatch(closeModal())

  const handleLinkClick = () => dispatch(openModal('LOGIN'))

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open === 'REGISTER'}
      title="Đăng ký"
      onClose={handleCloseModal}
    >
      <Form onSubmit={onSubmit}>
        <TextField
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          inputRef={registerForm}
          label="Họ tên"
          name="name"
        />

        <TextField
          fullWidth
          required
          error={!!errors.phone}
          helperText={errors.phone?.message}
          inputRef={registerForm}
          label="Số điện thoại"
          name="phone"
        />

        <TextField
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.email?.message}
          inputRef={registerForm}
          label="Email"
          name="email"
        />

        <TextField
          fullWidth
          required
          error={!!errors.password}
          helperText={errors.password?.message}
          inputRef={registerForm}
          label="Mật khẩu"
          name="password"
          type="password"
        />

        <Button type="submit">
          Đăng ký
        </Button>

        <div>
          Đã có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng nhập ngay</TextLink>
        </div>
      </Form>

      <LoadingBackdrop open={loading} />
    </Dialog>
  )
}
