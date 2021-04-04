import { Button, MenuItem, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import errorMessages from 'src/assets/constants/errorMessages'
import phoneRegex from 'src/assets/regex/phoneRegex'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { openModal, closeModal } from 'src/redux/slices/modal'
import Dialog from '../Dialog'
import TextLink from '../TextLink'
import useStyles from './styles'
import Select from 'src/components/Select'
import useAxios from 'src/hooks/useAxios'

import { setCities } from 'src/redux/slices/cities'
import { District } from 'src/types/District'
import { City } from 'src/types/City'

type Inputs = {
  name: string
  email: string
  phone: string
  password: string
  cityID: string
  districtID: string
}


export default function RegisterDialog() {
  const classes = useStyles()

  const { open } = useAppSelector(state => state.modal)

  const cities = useAppSelector(state => state.cities)

  const dispatch = useAppDispatch()

  const { register, handleSubmit, errors, control, watch, setValue } = useForm<Inputs>()

  const { fetch: fetchRegister, loading: loadingRegister } = useAxios<string>({
    config: {
      method: 'POST',
      route: 'auth/register'
    },
    onCompleted: response => {
      localStorage.setItem('token', response.data)
    },
    onError: error => {
      console.log('Register error:', error)
    }
  })

  const { loading: loadingCities } = useAxios<City[]>({
    config: {
      method: 'GET',
      route: 'city'
    },
    fetchOnMount: true,
    onCompleted: response => {
      dispatch(setCities(response.data))
    },
    onError: error => {
      console.log('Get cities error:', error)
    }
  })

  const selectedCityId = watch('cityID') as string

  useEffect(() => {
    if (!selectedCityId) return

    setValue('districtID', '')

    fetchDistricts({
      params: {
        city: selectedCityId
      }
    })
  }, [selectedCityId])

  const [districts, setDistricts] = useState<District[]>([])

  const { fetch: fetchDistricts, loading: loadingDistricts } = useAxios<District[]>({
    config: {
      method: 'GET',
      route: 'district'
    },
    onCompleted: response => {
      setDistricts(response.data)
    },
    onError: error => {
      console.log('Get districts error:', error)
    }
  })

  const onSubmit = handleSubmit(data => {
    fetchRegister({
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
        />

        <Select
          required
          control={control}
          defaultValue=""
          disabled={loadingCities}
          error={!!errors.cityID}
          helperText={errors.cityID?.message}
          label="Tỉnh/Thành phố"
          name="cityID"
          rules={{
            required: errorMessages.cityRequired
          }}
        >
          {
            cities.slice(1).map(city => (
              <MenuItem
                key={city._id}
                value={city._id}
              >
                {city.name}
              </MenuItem>
            ))
          }
        </Select>

        <Select
          required
          control={control}
          defaultValue=""
          disabled={loadingDistricts}
          error={!!errors.districtID}
          helperText={errors.districtID?.message}
          label="Quận/Huyện"
          name="districtID"
          rules={{
            required: errorMessages.districtRequired
          }}
        >
          {
            districts.map(district => (
              <MenuItem
                key={district._id}
                value={district._id}
              >
                {district.name}
              </MenuItem>
            ))
          }
        </Select>

        <Button type="submit">
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
