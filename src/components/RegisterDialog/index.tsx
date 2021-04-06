import { Button, MenuItem, TextField, Tooltip } from '@material-ui/core'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import LoadingBackdrop from '../LoadingBackdrop'
import setServerErrors from 'src/helpers/setServerErrors'
import { useSnackbar } from 'notistack'

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

  // Toast
  const { enqueueSnackbar } = useSnackbar()

  // Register account
  const { fetch: register, loading: registering } = useAxios<string>({
    config: {
      method: 'POST',
      route: 'auth/register'
    },
    onCompleted: response => {
      // Set token after register success
      localStorage.setItem('token', response.data)
      dispatch(closeModal())
      enqueueSnackbar('Đăng ký thành công!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 1500,
        variant: 'success'
      })
    },
    onError: error => {
      // If error status is not 400, log error
      if (error?.status !== 400) {
        console.log('Register error:', error)
        return
      }

      // If error status is 400, set server error messages to form fields
      setServerErrors(error?.data, setError)
    }
  })

  // Fetch cities on component mount
  const { loading: loadingCities } = useAxios<City[]>({
    config: {
      method: 'GET',
      route: 'city'
    },
    fetchOnMount: true,
    onCompleted: response => {
      // Save cities to redux after fetch
      dispatch(setCities(response.data))
    },
    onError: error => {
      console.log('Get cities error:', error)
    }
  })

  // Selected city ID
  const selectedCityId = watch('cityID') as string

  // Fetch districts
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

    // Reset district select
    setValue('districtID', '')

    // Fetch districts of the selected city
    fetchDistricts({
      params: {
        city: selectedCityId
      }
    })
  }, [fetchDistricts, selectedCityId, setValue])

  

  // Register on form submit
  const onSubmit = handleSubmit(data => {
    register({
      data
    })
  })

  const handleCloseModal = () => dispatch(closeModal())

  // Open login modal on Login link click
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

      <LoadingBackdrop open={loadingCities || loadingDistricts || registering} />
    </Dialog>
  )
}
