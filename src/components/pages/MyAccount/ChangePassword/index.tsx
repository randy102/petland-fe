import { Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import Form from 'src/components/shared/Form'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import PasswordTextField from 'src/components/shared/PasswordTextField'
import setServerErrors from 'src/helpers/setServerErrors'
import useAxios from 'src/hooks/useAxios'

type Inputs = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    setError,
  } = useForm<Inputs>()

  const { enqueueSnackbar } = useSnackbar()

  const { fetch: changePassword, loading } = useAxios({
    config: {
      method: 'put',
      route: 'user/changePassWord',
    },
    onCompleted: () => {
      enqueueSnackbar('Đổi mật khẩu thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
        autoHideDuration: 1500,
        variant: 'success',
      })
    },
    onError: error => {
      setServerErrors({
        errors: error?.data,
        fields: ['oldPassword', 'newPassword'],
        setError,
      })
    },
  })

  const onSubmit = handleSubmit(data => {
    changePassword({
      data: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
    })
  })

  return (
    <CardWithTitle title="Đổi mật khẩu">
      <LoadingBackdrop open={loading} />

      <Form onSubmit={onSubmit}>
        <PasswordTextField
          fullWidth
          required
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          inputRef={register}
          label="Mật khẩu cũ"
          name="oldPassword"
        />

        <PasswordTextField
          fullWidth
          required
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          inputRef={register}
          label="Mật khẩu mới"
          name="newPassword"
        />

        <PasswordTextField
          fullWidth
          required
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword?.message}
          inputRef={register({
            validate: value =>
              value === getValues()['newPassword'] ||
              'Xác nhận mật khẩu mới không đúng',
          })}
          label="Xác nhận mật khẩu mới"
          name="confirmNewPassword"
        />

        <Button type="submit">Lưu</Button>
      </Form>
    </CardWithTitle>
  )
}
