import { Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import errorMessages from 'src/assets/constants/errorMessages'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { closeModal, openModal } from 'src/redux/slices/modal'
import Dialog from '../Dialog'
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

  const { register, handleSubmit, errors } = useForm<Inputs>()

  const onSubmit = handleSubmit(data => {
    console.log('Submit data:', data)
  })

  const handleCloseModal = () => dispatch(closeModal())

  const handleLinkClick = () => dispatch(openModal('REGISTER'))

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open === 'LOGIN'}
      title="Đăng nhập"
      onClose={handleCloseModal}
    >
      <form
        noValidate
        className={classes.root}
        onSubmit={onSubmit}
      >
        <TextField
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          inputRef={register({
            required: errorMessages.emailRequired,
          })}
          label="Email"
          name="email"
        />

        <TextField
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          inputRef={register({
            required: errorMessages.passwordRequired,
          })}
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
  )
}
