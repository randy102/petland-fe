import { Button, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import errorMessages from 'src/assets/constants/errorMessages'
import phoneRegex from 'src/assets/regex/phoneRegex'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { openModal, closeModal } from 'src/redux/slices/modal'
import Dialog from '../Dialog'
import TextLink from '../TextLink'
import useStyles from './styles'

type Inputs = {
  name: string;
  email: string;
  phone: number;
  password: string;
}

export default function RegisterDialog() {
  const classes = useStyles()

  const { open } = useAppSelector(state => state.modal)

  const dispatch = useAppDispatch()

  const { register, handleSubmit, errors } = useForm<Inputs>()

  const onSubmit = handleSubmit(data => {
    console.log('Submit data:', data)
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
      <form
        noValidate
        className={classes.root}
        onSubmit={onSubmit}
      >
        <TextField
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name?.message}
          inputRef={register({
            required: errorMessages.nameRequired,
          })}
          label="Họ tên"
          name="name"
          variant="filled"
        />

        <TextField
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.name?.message}
          inputRef={register({
            required: errorMessages.emailRequired
          })}
          label="Email"
          name="email"
          variant="filled"
        />

        <TextField
          fullWidth
          required
          error={!!errors.phone}
          helperText={errors.phone?.message}
          inputRef={register({
            pattern: {
              message: errorMessages.phoneInvalid,
              value: phoneRegex
            },
            required: errorMessages.phoneRequired
          })}
          label="Số điện thoại"
          name="phone"
          variant="filled"
        />

        <TextField
          fullWidth
          required
          error={!!errors.password}
          helperText={errors.password?.message}
          inputRef={register({
            minLength: {
              message: errorMessages.passwordLength,
              value: 6
            },
            required: errorMessages.passwordRequired
          })}
          label="Mật khẩu"
          name="password"
          type="password"
          variant="filled"
        />

        <Button
          color="primary"
          type="submit"
          variant="contained"
        >
          Đăng ký
        </Button>

        <div>
          Đã có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng nhập ngay</TextLink>
        </div>
      </form>
    </Dialog>
  )
}
