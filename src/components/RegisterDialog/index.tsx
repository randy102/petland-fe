import { Button, MenuItem, TextField, Tooltip } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'src/components/Select'
import setServerErrors from 'src/helpers/setServerErrors'
import useAxios from 'src/hooks/useAxios'
import useUser from 'src/hooks/useUser'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { setCities } from 'src/redux/slices/cities'
import { closeModal, openModal } from 'src/redux/slices/modal'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import Dialog from '../Dialog'
import LoadingBackdrop from '../LoadingBackdrop'
import TextLink from '../TextLink'
import useStyles from './styles'


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

  const { register: registerForm, handleSubmit, control, watch, setValue, setError, errors } = useForm<Inputs>()

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
        fields: ['name', 'email', 'phone', 'password', 'cityID', 'districtID'],
        setError
      })
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

  const { data: districts, fetch: fetchDistricts, loading: loadingDistricts } = useAxios<District[]>({
    config: {
      method: 'GET',
      route: 'district'
    },
    onError: error => {
      console.log('Get districts error:', { ...error })
    }
  })

  // When user selects a city
  useEffect(() => {
    if (!selectedCityId) return

    setValue('districtID', '')

    fetchDistricts({
      params: {
        city: selectedCityId
      }
    })
  }, [fetchDistricts, selectedCityId, setValue])

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
          inputRef={registerForm}
          label="Họ tên"
          name="name"
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
          error={!!errors.phone}
          helperText={errors.phone?.message}
          inputRef={registerForm}
          label="Số điện thoại"
          name="phone"
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

        <Select
          required
          control={control}
          defaultValue=""
          disabled={!cities.length}
          error={!!errors.cityID}
          helperText={errors.cityID?.message}
          label="Tỉnh/Thành phố"
          name="cityID"
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
        
        <Tooltip
          placement="bottom"
          title={!districts?.length ? 'Hãy chọn Tỉnh/Thành phố trước' : ''}

        >
          <div>
            <Select
              fullWidth
              required
              control={control}
              defaultValue=""
              disabled={!districts?.length}
              error={!!errors.districtID}
              helperText={errors.districtID?.message}
              label="Quận/Huyện"
              name="districtID"
            >
              {
                districts?.map(district => (
                  <MenuItem
                    key={district._id}
                    value={district._id}
                  >
                    {district.name}
                  </MenuItem>
                ))
              }
            </Select>
          </div>
        </Tooltip>


        <Button type="submit">
          Đăng ký
        </Button>

        <div>
          Đã có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng nhập ngay</TextLink>
        </div>
      </form>

      <LoadingBackdrop open={loadingCities || loadingDistricts || loading} />
    </Dialog>
  )
}
