import { Button, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useForm } from 'react-hook-form'
import setServerErrors from 'src/helpers/setServerErrors'
import useAxios from 'src/hooks/useAxios'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { closeModal, openModal } from 'src/redux/slices/modal'
import { setUser } from 'src/redux/slices/user'
import { User } from 'src/types/User'
import Dialog from '../Dialog'
import LoadingBackdrop from '../LoadingBackdrop'
import TextLink from '../TextLink'
import useStyles from './styles'

type Inputs = {
  email: string
  password: string
}

export default function LoginDialog() {
  const classes = useStyles()

  const { open } = useAppSelector(state => state.modal)

  const dispatch = useAppDispatch()

  const { register, handleSubmit, errors, setError } = useForm<Inputs>()

  // Toast
  const { enqueueSnackbar } = useSnackbar()

  // Get user data API
  const { fetch: getUser, loading: gettingUser } = useAxios<User>({
    config: {
      method: 'GET',
      route: 'user/profile'
    },
    onCompleted: response => {
      dispatch(setUser(response.data))
    },
    onError: error => {
      console.log('Get user error:', error)
    }
  })

  // Login API
  const { fetch: login, loading: loggingIn } = useAxios<string>({
    config: {
      method: 'POST',
      route: 'auth/login'
    },
    onCompleted: response => {
      localStorage.setItem('token', response.data)
      enqueueSnackbar('Đăng nhập thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 1500,
        variant: 'success'
      })
      dispatch(closeModal())
      
      getUser()
    },
    onError: error => {
      // If error status is not 400, log error
      if (error?.status !== 400) {
        console.log('Login error:', error)
        return
      }

      // If error data has statusCode, that means it's an error not specific to a field
      //   so we use snackbar to announce the error
      if (error?.data?.statusCode === 400) {
        enqueueSnackbar(error?.data.message, { variant: 'error' })
        return
      }

      // If it's not a universal error, then set errors to specific form fields
      setServerErrors(error?.data, setError)
    }
  })

  // Login on form submit
  const onSubmit = handleSubmit(data => {
    login({
      data
    })
  })

  const handleCloseModal = () => dispatch(closeModal())

  const handleLinkClick = () => dispatch(openModal('REGISTER'))

  return (
    <React.Fragment>
      <LoadingBackdrop open={gettingUser} />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open === 'LOGIN'}
        title="Đăng nhập"
        onClose={handleCloseModal}
      >
        <LoadingBackdrop open={loggingIn} />

        <form
          noValidate
          className={classes.root}
          onSubmit={onSubmit}
        >
          <TextField
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            inputRef={register}
            label="Email"
            name="email"
          />

          <TextField
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            inputRef={register}
            label="Mật khẩu"
            name="password"
            type="password"
          />

          <Button type="submit">
            Đăng nhập
          </Button>

          <div>
            Chưa có tài khoản?{' '}
            <TextLink onClick={handleLinkClick}>Đăng ký ngay</TextLink>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
