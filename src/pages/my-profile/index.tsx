import { Button, Fab, Icon, TextField } from '@material-ui/core'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'src/components/Form'
import Image from 'src/components/Image'
import ProfileLayout from 'src/components/ProfileLayout'
import useAxios from 'src/hooks/useAxios'
import { useAppSelector } from 'src/redux/hooks'
import useStyles from './styles'

type Inputs = {
  name: string
  phone: string
  email: string
}

const IMG_BASE = process.env.REACT_APP_S3URL

export default function MyProfile() {
  const classes = useStyles()

  const { register, handleSubmit, errors } = useForm<Inputs>()

  const user = useAppSelector(state => state.user)

  const [avatarSrc, setAvatarSrc] = useState(user?.avatar ? `${IMG_BASE}/${user.avatar}` : '')

  const [imageFile, setImageFile] = useState<File>()

  const { fetch: uploadImage, loading: uploadingImage } = useAxios({
    config: {
      method: 'post',
      route: 'photo'
    }
  })

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!user?.avatar) return

    setAvatarSrc(`${IMG_BASE}/${user.avatar}`)
  }, [user])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!fileInputRef?.current) return

    fileInputRef.current.click()
    fileInputRef.current.value = ''
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.currentTarget?.files) return
    
    const file: File = event.currentTarget.files[0]

    if (!file.type.startsWith('image')) {
      enqueueSnackbar('Chỉ chấp nhận file ảnh', {
        variant: 'error'
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
    if (imageFile) {
      const formData = new FormData()

      formData.append('file', imageFile)

      uploadImage({
        data: {

        }
      })
    }

    console.log('Submit data:', data)
  })

  return (
    <ProfileLayout title="Thông tin cá nhân">
      <input
        hidden
        accept="image/*"
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
      />

      <Form onSubmit={onSubmit}>
        <div className={classes.avatarContainer}>
          {
            avatarSrc
              ? (
                <img
                  className={classes.avatarImg}
                  src={avatarSrc}
                />
              ) : (
                <Icon className={classes.avatarDefault}>person</Icon>
              )
          }

          <Fab
            classes={{
              root: classes.avatarButton
            }}
            color="primary"
            onClick={handleClick}
          >
            <Icon>photo_camera</Icon>
          </Fab>
        </div>

        <TextField 
          fullWidth
          required
          defaultValue={user?.name}
          error={!!errors.name}
          helperText={errors.name?.message}
          inputRef={register}
          label="Họ tên"
          name="name"
        />

        <TextField
          fullWidth
          required
          defaultValue={user?.phone}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          inputRef={register}
          label="Số điện thoại"
          name="phone"
        />

        <TextField
          disabled
          fullWidth
          defaultValue={user?.email}
          inputRef={register}
          label="Email"
          name="email"
        />

        <Button type="submit">
          Đăng ký
        </Button>
      </Form>
    </ProfileLayout>
  )
}
