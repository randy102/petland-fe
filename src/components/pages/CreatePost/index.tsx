import {
  Button,
  Grid,
  Icon,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import CustomFormRow from 'src/components/shared/CustomFormRow'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import NumberTextField from 'src/components/shared/NumberTextField'
import useAxios from 'src/hooks/useAxios'
import { Category } from 'src/types/Category'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import { Subcategory } from 'src/types/Subcategory'
import useStyles from './styles'
import _partition from 'lodash/partition'
import isImage from 'src/helpers/isImage'
import { useSnackbar } from 'notistack'
import TextField from 'src/components/shared/TextField'
import { MAX_POST_IMAGES } from 'src/constants'
import Radio from 'src/components/shared/Radio'

type Inputs = {
  name: string
  categoryID: string
  subCategoryID: string
  cityID: string
  districtID: string
  detail: string
  sex: string
  vaccination: string | boolean
  age: number
  price: number
  origin: string
  mainImage: string
  images: string[]
}

export default function CreatePost() {
  const classes = useStyles()

  const theme = useTheme()

  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const {
    control,
    register,
    watch,
    handleSubmit,
    getValues,
  } = useForm<Inputs>()

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

  const [imageFiles, setImageFiles] = useState<File[]>([])

  const [previewsLoading, setPreviewsLoading] = useState(0)

  const { enqueueSnackbar } = useSnackbar()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!fileInputRef?.current) return

    fileInputRef.current.click()
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
    const availableSlots = MAX_POST_IMAGES - previewSources.length

    // Cut image length to a maximum of available slots
    images.length = Math.min(availableSlots, images.length)

    setImageFiles(imageFiles => [...imageFiles, ...images])

    // Set loading
    setPreviewsLoading(images.length)

    // Load images into preview sources
    images.forEach(file => {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setPreviewSources(sources => [...sources, reader.result as string])
        setPreviewsLoading(count => count - 1)
      }
    })

    // Reset input value so user can select the same file(s) next time
    event.currentTarget.value = ''
  }

  const uploadImages = () => {
    console.log('Upload images')
    const imageIds = ['1', '2', '3']
    const data = getValues()
    data.images = imageIds
    uploadPost(data)
  }

  const uploadPost = (data: Inputs) => {
    data.vaccination = data.vaccination === 'true'
    console.log('Submit data:', data)
  }

  const onSubmit = handleSubmit((data: Inputs) => {
    if (imageFiles.length) {
      uploadImages()
      return
    }

    uploadPost(data)
  })

  const handleDeleteImageClick = (index: number) => {
    setPreviewSources(previewSources => {
      const newSources = [...previewSources]
      newSources.splice(index, 1)
      return newSources
    })
  }

  if (loadingCategories || loadingCities) {
    return <LoadingBackdrop open />
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <LoadingBackdrop
        open={loadingSubcategories || loadingDistricts || previewsLoading > 0}
      />

      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <CardWithTitle title="Thông tin thú cưng">
            <div className={classes.form}>
              <Grid container item spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    select
                    defaultValue=""
                    label="Loại thú cưng"
                    {...register('categoryID')}
                  >
                    {categories?.map(category => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    select
                    defaultValue=""
                    disabled={!subcategories?.length}
                    helperText={
                      subcategories?.length
                        ? ''
                        : 'Hãy chọn Loại thú cưng trước'
                    }
                    label="Giống thú cưng"
                    {...register('subCategoryID')}
                  >
                    {!subcategories?.length && (
                      <MenuItem value="">Hãy chọn Loại thú cưng trước</MenuItem>
                    )}

                    {subcategories?.map(subcategory => (
                      <MenuItem key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <TextField fullWidth required label="Nguồn gốc" name="origin" />

              <NumberTextField
                fullWidth
                required
                control={control}
                label="Tuổi"
                name="age"
                suffix=" tháng"
              />

              <TextField
                fullWidth
                required
                select
                defaultValue=""
                label="Giới tính"
                {...register('sex')}
              >
                <MenuItem value="MALE">Đực</MenuItem>

                <MenuItem value="FEMALE">Cái</MenuItem>
              </TextField>

              <Grid container item spacing={3}>
                <Grid item sm={6} xs={12}>
                  <Radio
                    fullWidth
                    required
                    defaultValue=""
                    label="Giới tính"
                    row={isXs}
                    {...register('sex')}
                    items={[
                      { label: 'Đực', value: 'MALE' },
                      { label: 'Cái', value: 'FEMALE' },
                    ]}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Radio
                    fullWidth
                    required
                    defaultValue=""
                    label="Đã tiêm chủng"
                    row={isXs}
                    {...register('vaccination')}
                    items={[
                      { label: 'Có', value: 'true' },
                      { label: 'Không', value: 'false' },
                    ]}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                label="Mô tả thêm (nếu có)"
                name="detail"
                rows={4}
              />
            </div>
          </CardWithTitle>
        </Grid>

        <Grid item lg={6} xs={12}>
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
                helperText="Điền 0 nghĩa là giá thương lượng"
                label="Giá bán"
                name="price"
                suffix=" đ"
                thousandSeparator="."
              />

              <Grid container item spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    select
                    defaultValue=""
                    label="Tỉnh/Thành phố"
                    {...register('cityID')}
                  >
                    {!cities?.length && <MenuItem value="">Đang tải</MenuItem>}

                    {cities?.slice(1).map(city => (
                      <MenuItem key={city._id} value={city._id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    select
                    defaultValue=""
                    disabled={!districts?.length}
                    helperText={
                      districts?.length ? '' : 'Hãy chọn Tỉnh/Thành phố trước'
                    }
                    label="Quận/Huyện"
                    {...register('districtID')}
                  >
                    {!districts?.length && (
                      <MenuItem value="">
                        Hãy chọn Tỉnh/Thành phố trước
                      </MenuItem>
                    )}

                    {districts?.map(district => (
                      <MenuItem key={district._id} value={district._id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

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
                  disabled={previewSources.length === MAX_POST_IMAGES}
                  startIcon={
                    previewSources.length !== MAX_POST_IMAGES && (
                      <Icon>add</Icon>
                    )
                  }
                  type="button"
                  onClick={handleClick}
                >
                  {previewSources.length === MAX_POST_IMAGES
                    ? `Tối đa ${MAX_POST_IMAGES} ảnh`
                    : 'Thêm ảnh'}
                </Button>

                {previewSources.length > 0 && (
                  <div className={classes.imageGrid}>
                    {previewSources.map((src, index) => (
                      <div className={classes.imageItemContainer} key={index}>
                        <img alt="" className={classes.imageItem} src={src} />

                        <Button
                          className={classes.imageDeleteButton}
                          size="small"
                          type="button"
                          onClick={() => handleDeleteImageClick(index)}
                        >
                          <Icon>delete</Icon>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CustomFormRow>

              <Button type="submit">Đăng bài</Button>
            </div>
          </CardWithTitle>
        </Grid>
      </Grid>
    </form>
  )
}
