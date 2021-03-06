import { Button, Fab, Icon } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Avatar from 'src/components/shared/Avatar'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import Form from 'src/components/shared/Form'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import TextField from 'src/components/shared/TextField'
import isImage from 'src/helpers/isImage'
import setServerErrors from 'src/helpers/setServerErrors'
import useAxios from 'src/hooks/useAxios'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { setUser } from 'src/redux/slices/user'
import { User } from 'src/typings/User'
import useStyles from './styles'

type Inputs = {
  name: string
  phone: string
  avatar: string
}

export default function Profile() {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Inputs>()

  const [avatarSrc, setAvatarSrc] = useState<string>('')

  const [imageFile, setImageFile] = useState<File>()

  const [loading, setLoading] = useState<boolean>(false)

  const { fetch: updateUser } = useAxios<User>({
    config: {
      method: 'put',
      route: '/user/changeInfo',
    },
    onCompleted: response => {
      setLoading(false)
      dispatch(setUser(response.data))
      enqueueSnackbar('Cập nhật thông tin thành công!', {
        variant: 'success',
      })
    },
    onError: error => {
      setLoading(false)

      setServerErrors({
        errors: error?.data,
        fields: ['name', 'phone'],
        setError,
      })
    },
  })

  const { fetch: uploadImage } = useAxios<string>({
    config: {
      method: 'post',
      route: 'photo',
    },
    // Update user with new avatar id after upload
    onCompleted: response => {
      const data = getValues()

      data.avatar = response.data[0]

      updateUser({
        data,
      })
    },
  })

  const { enqueueSnackbar } = useSnackbar()

  // File input ref to open file browser programmatically
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Open file browser on click
  const handleClick = () => {
    if (!fileInputRef?.current) return

    fileInputRef.current.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.currentTarget?.files) return

    const file: File = event.currentTarget.files[0]

    if (!isImage(file)) {
      enqueueSnackbar('Chỉ chấp nhận file ảnh!', {
        variant: 'error',
      })
      return
    }

    setImageFile(file)

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setAvatarSrc(reader.result as string)
    }
  }

  const onSubmit = handleSubmit(data => {
    setLoading(true)

    // Upload image if user had chosen an image file
    if (imageFile) {
      const formData = new FormData()

      formData.append('files', imageFile)

      uploadImage({
        data: formData,
      })

      return
    }

    // Else go straight to update user
    updateUser({
      data,
    })
  })

  return (
    <CardWithTitle title="Thông tin cá nhân">
      <LoadingBackdrop open={loading} />

      <input
        hidden
        accept="image/*"
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
      />

      <Form onSubmit={onSubmit}>
        <div className={classes.avatarContainer}>
          <input
            hidden
            defaultValue={user?.avatar || 'default'}
            {...register('avatar')}
          />

          <Avatar size={100} src={avatarSrc} />

          <Fab
            classes={{
              root: classes.avatarButton,
            }}
            color="primary"
            size="small"
            onClick={handleClick}
          >
            <PhotoCamera />
          </Fab>
        </div>

        <TextField
          fullWidth
          required
          defaultValue={user?.name}
          error={!!errors.name}
          helperText={errors.name?.message}
          label="Họ tên"
          {...register('name')}
        />

        <TextField
          fullWidth
          required
          defaultValue={user?.phone}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          label="Số điện thoại"
          {...register('phone')}
        />

        <TextField
          disabled
          fullWidth
          defaultValue={user?.email}
          label="Email"
        />

        <Button type="submit">Lưu</Button>
      </Form>
    </CardWithTitle>
  )
}
