import { Button, Icon, MenuItem, TextField } from '@material-ui/core'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import CustomFormRow from 'src/components/shared/CustomFormRow'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import NumberTextField from 'src/components/shared/NumberTextField'
import Select from 'src/components/shared/Select'
import useAxios from 'src/hooks/useAxios'
import { Category } from 'src/types/Category'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import { Subcategory } from 'src/types/Subcategory'
import useStyles from './styles'
import _partition from 'lodash/partition'
import isImage from 'src/helpers/isImage'
import { useSnackbar } from 'notistack'

const MAX_IMAGES_COUNT = 6

type Inputs = {
  name: string
  categoryID: string
  subCategoryID: string
  cityID: string
  districtID: string
  detail: string
  sex: string
  vaccination: true
  age: 0
  price: 0
  origin: string
  mainImage: string
  images: string[]
}

export default function CreatePost() {
  const classes = useStyles()

  const { control, register, watch, handleSubmit } = useForm<Inputs>()

  // Categories and subcategories
  const categoryID = watch('categoryID', '')

  const { data: categories, loading: loadingCategories } = useAxios<Category[]>(
    {
      config: {
        method: 'get',
        route: 'category',
      },
      fetchOnMount: true,
    }
  )

  const {
    fetch: getSubcategories,
    data: subcategories,
    loading: loadingSubcategories,
  } = useAxios<Subcategory[]>({
    config: {
      method: 'get',
      route: 'sub-category',
    },
  })

  useEffect(() => {
    if (!categoryID) return

    getSubcategories({
      params: {
        category: categoryID,
      },
    })
  }, [categoryID])

  // Cities and districts
  const cityID = watch('cityID', '')

  const { data: cities, loading: loadingCities } = useAxios<City[]>({
    config: {
      method: 'get',
      route: 'city',
    },
    fetchOnMount: true,
  })

  const {
    fetch: getDistricts,
    data: districts,
    loading: loadingDistricts,
  } = useAxios<District[]>({
    config: {
      method: 'get',
      route: 'district',
    },
  })

  useEffect(() => {
    if (!cityID) return

    getDistricts({
      params: {
        city: cityID,
      },
    })
  }, [cityID])

  const [previewSources, setPreviewSources] = useState<string[]>([])

  const { enqueueSnackbar } = useSnackbar()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!fileInputRef?.current) return

    fileInputRef.current.click()

    fileInputRef.current.value = ''
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Get selected files
    const files = Array.from(event.currentTarget.files || [])

    // Split files into image files and nonimage files
    const [images, nonimages] = _partition(files, isImage)

    // If has nonimages, toast error
    if (nonimages.length) {
      enqueueSnackbar('Chỉ chấp nhận file ảnh!', {
        variant: 'error',
      })
    }

    // Available slots for new images
    const availableSlots = MAX_IMAGES_COUNT - previewSources.length

    images.slice(0, availableSlots).forEach(file => {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setPreviewSources(images => [...images, reader.result as string])
      }
    })
  }

  const onSubmit = handleSubmit(data => {
    console.log('Submit data:', data)
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <LoadingBackdrop
        open={
          loadingCategories ||
          loadingSubcategories ||
          loadingCities ||
          loadingDistricts
        }
      />

      <div className={classes.grid}>
        <CardWithTitle title="Thông tin thú cưng">
          <div className={classes.form}>
            <div className={classes.formGrid}>
              <Select
                fullWidth
                required
                control={control}
                defaultValue=""
                label="Loại thú cưng"
                name="categoryID"
              >
                {categories?.map(category => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                required
                control={control}
                defaultValue=""
                disabled={!subcategories?.length}
                helperText={
                  subcategories?.length ? '' : 'Hãy chọn Loại thú cưng trước'
                }
                label="Giống thú cưng"
                name="subCategoryID"
              >
                {subcategories?.map(subcategory => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Select
              fullWidth
              required
              control={control}
              defaultValue=""
              label="Giới tính"
              name="sex"
            >
              <MenuItem value="MALE">Đực</MenuItem>

              <MenuItem value="FEMALE">Cái</MenuItem>
            </Select>

            <TextField fullWidth required label="Nguồn gốc" name="origin" />

            <Select
              fullWidth
              required
              control={control}
              defaultValue=""
              label="Đã tiêm chủng"
              name="vaccination"
            >
              <MenuItem value="YES">Có</MenuItem>

              <MenuItem value="NO">Không</MenuItem>
            </Select>

            <NumberTextField
              fullWidth
              required
              control={control}
              defaultValue=""
              label="Tuổi"
              max={100}
              name="age"
              suffix=" tháng"
            />

            <TextField
              fullWidth
              multiline
              label="Mô tả thêm (nếu có)"
              name="detail"
              rows={4}
            />
          </div>
        </CardWithTitle>

        <CardWithTitle title="Thông tin bài đăng">
          <div className={classes.form}>
            <TextField
              fullWidth
              required
              label="Tiêu đề bài đăng"
              name="name"
            />

            <NumberTextField
              fullWidth
              required
              allowLeadingZeros={false}
              allowNegative={false}
              control={control}
              decimalScale={0}
              decimalSeparator=","
              defaultValue={0}
              helperText="Điền 0 nghĩa là giá thương lượng"
              label="Giá bán"
              max={100000000}
              min={0}
              name="price"
              suffix=" đ"
              thousandSeparator="."
            />

            <div className={classes.formGrid}>
              <Select
                fullWidth
                required
                control={control}
                defaultValue=""
                label="Tỉnh/Thành phố"
                name="cityID"
              >
                {cities?.map(city => (
                  <MenuItem key={city._id} value={city._id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                required
                control={control}
                defaultValue=""
                disabled={!districts?.length}
                helperText={
                  districts?.length ? '' : 'Hãy chọn Tỉnh/Thành phố trước'
                }
                label="Quận/Huyện"
                name="districtID"
              >
                {districts?.map(district => (
                  <MenuItem key={district._id} value={district._id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <CustomFormRow fullWidth required label="Hình ảnh thú cưng">
              <input
                hidden
                multiple
                accept="image/*"
                ref={fileInputRef}
                type="file"
                onChange={handleChange}
              />

              <Button
                color="default"
                startIcon={<Icon>add</Icon>}
                type="button"
                onClick={handleClick}
              >
                Thêm ảnh
              </Button>
            </CustomFormRow>
          </div>

          <Button type="submit">Submit</Button>
        </CardWithTitle>
      </div>
    </form>
  )
}
