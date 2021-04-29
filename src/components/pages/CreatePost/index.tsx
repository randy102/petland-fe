import {
  Button,
  Grid,
  Icon,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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
import axios from 'axios'
import uploadImages from 'src/helpers/uploadImages'
import { useHistory, useParams } from 'react-router'
import { Delete } from '@material-ui/icons'

type ImageObject = {
  src: string
  file: File
}

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

  // const {id} = useParams()

  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
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

  const [previewImages, setPreviewImages] = useState<ImageObject[]>([])

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
    const availableSlots = MAX_POST_IMAGES - previewImages.length

    // Cut image length to a maximum of available slots
    images.length = Math.min(availableSlots, images.length)

    if (previewImages.length + images.length >= 2) {
      clearErrors('mainImage')
    } else {
      setError('mainImage', {
        message: 'Cần ít nhất 2 ảnh thú cưng',
      })
    }

    // Load images into preview sources
    images.forEach(file => {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setPreviewImages(previewImages => [
          ...previewImages,
          { src: reader.result as string, file },
        ])
      }
    })

    // Reset input value so user can select the same file(s) next time
    event.currentTarget.value = ''
  }

  const history = useHistory()

  const onSubmit = handleSubmit((data: Inputs) => {
    data.vaccination = data.vaccination === 'true'

    setLoading(true)

    const mainImageFile = previewImages.slice(0, 1).map(img => img.file)
    const otherImageFiles = previewImages.slice(1).map(img => img.file)

    Promise.all([
      uploadImages(mainImageFile),
      uploadImages(otherImageFiles),
    ]).then(results => {
      data.mainImage = results[0].data[0]
      data.images = results[1].data

      axios
        .post('/post', {
          ...data,
        })
        .then(response => {
          setLoading(false)

          enqueueSnackbar('Tạo bài đăng thành công!', {
            variant: 'success',
          })

          history.push('/my-account/posts?state=DRAFT')
        })
    })
  })

  const handleDeleteImageClick = (index: number) => {
    setPreviewImages(previewImages => {
      const newImages = [...previewImages]
      newImages.splice(index, 1)

      if (newImages.length < 2) {
        setError('mainImage', {
          message: 'Cần ít nhất 2 ảnh thú cưng',
        })
      }

      return newImages
    })
  }

  const handlePinImageClick = (index: number) => {
    setPreviewImages(previewImages => {
      const newImages = [...previewImages]

      newImages.unshift(newImages.splice(index, 1)[0])

      return newImages
    })
  }

  if (loadingCategories || loadingCities) {
    return <LoadingBackdrop open />
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <LoadingBackdrop
        open={loadingSubcategories || loadingDistricts || loading}
      />

      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <CardWithTitle title="Thông tin thú cưng">
            <div className={classes.form}>
              <Grid
                container
                item
                className={classes.marginBottom15}
                spacing={3}
              >
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    select
                    defaultValue=""
                    label="Loại thú cưng"
                    {...register('categoryID', {
                      required: 'Hãy chọn loại thú cưng',
                    })}
                    error={!!errors?.categoryID}
                    helperText={errors?.categoryID?.message}
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
                    error={
                      !subcategories?.length ? false : !!errors?.subCategoryID
                    }
                    helperText={
                      !subcategories?.length
                        ? 'Hãy chọn loại thú cưng trước'
                        : errors?.subCategoryID?.message
                    }
                    label="Giống thú cưng"
                    {...register('subCategoryID', {
                      required: 'Hãy chọn giống thú cưng',
                    })}
                  >
                    {!subcategories?.length && (
                      <MenuItem value="">Hãy chọn loại thú cưng trước</MenuItem>
                    )}

                    {subcategories?.map(subcategory => (
                      <MenuItem key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                required
                error={!!errors?.origin}
                helperText={errors?.origin?.message}
                label="Nguồn gốc"
                {...register('origin', {
                  required: 'Hãy nhập nguồn gốc thú cưng',
                })}
                className={classes.marginBottom3}
              />

              <NumberTextField
                fullWidth
                required
                className={classes.marginBottom3}
                control={control}
                error={!!errors?.age}
                helperText={errors?.age?.message}
                label="Tuổi"
                name="age"
                rules={{
                  required: 'Hãy nhập tuổi thú cưng',
                }}
                suffix=" tháng"
              />

              <Grid
                container
                item
                className={classes.marginBottom1}
                spacing={3}
              >
                <Grid item sm={6} xs={12}>
                  <Radio
                    fullWidth
                    required
                    defaultValue=""
                    error={!!errors?.sex}
                    helperText={errors?.sex?.message}
                    label="Giới tính"
                    row={isXs}
                    {...register('sex', {
                      required: 'Hãy chọn giới tính thú cưng',
                    })}
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
                    error={!!errors?.vaccination}
                    helperText={errors?.vaccination?.message}
                    label="Đã tiêm chủng"
                    row={isXs}
                    {...register('vaccination', {
                      required: 'Hãy chọn tình trạng tiêm chủng',
                    })}
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
                rows={4}
                {...register('detail')}
                className={classes.marginBottom3}
                error={!!errors?.detail}
                helperText={errors?.detail?.message}
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
                error={!!errors?.name}
                helperText={errors?.name?.message}
                label="Tiêu đề bài đăng"
                {...register('name', {
                  required: 'Hãy nhập tiêu đề bài đăng',
                })}
                className={classes.marginBottom3}
              />

              <NumberTextField
                fullWidth
                required
                allowLeadingZeros={false}
                allowNegative={false}
                className={classes.marginBottom3}
                control={control}
                decimalScale={0}
                decimalSeparator=","
                error={!!errors?.price}
                helperText={
                  errors?.price?.message || 'Điền 0 nghĩa là giá thương lượng'
                }
                label="Giá bán"
                name="price"
                rules={{
                  required: 'Hãy nhập giá bán',
                }}
                suffix=" đ"
                thousandSeparator="."
              />

              <Grid
                container
                item
                className={classes.marginBottom15}
                spacing={3}
              >
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    required
                    select
                    defaultValue=""
                    error={!!errors?.cityID}
                    helperText={errors?.cityID?.message}
                    label="Tỉnh/Thành phố"
                    {...register('cityID', {
                      required: 'Hãy chọn tỉnh/thành phố',
                    })}
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
                    error={!districts?.length ? false : !!errors?.districtID}
                    helperText={
                      !districts?.length
                        ? ''
                        : errors?.districtID?.message ||
                          'Hãy chọn tỉnh/thành phố trước'
                    }
                    label="Quận/Huyện"
                    {...register('districtID', {
                      required: 'Hãy chọn quận/huyện',
                    })}
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

              <CustomFormRow
                fullWidth
                required
                className={classes.marginBottom3}
                error={!!errors?.mainImage}
                helperText={
                  errors?.mainImage?.message ||
                  'Ảnh đầu tiên sẽ dùng để hiển thị bài viết'
                }
                label="Hình ảnh thú cưng"
              >
                <input
                  hidden
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  type="file"
                  onChange={handleChange}
                />

                <input
                  hidden
                  {...register('mainImage', {
                    validate: value =>
                      previewImages.length >= 2 || 'Cần ít nhất 2 ảnh thú cưng',
                  })}
                />

                <Button
                  color="default"
                  disabled={previewImages.length === MAX_POST_IMAGES}
                  startIcon={
                    previewImages.length !== MAX_POST_IMAGES && <Icon>add</Icon>
                  }
                  type="button"
                  onClick={handleClick}
                >
                  {previewImages.length === MAX_POST_IMAGES
                    ? `Tối đa ${MAX_POST_IMAGES} ảnh`
                    : 'Thêm ảnh'}
                </Button>

                {previewImages.length > 0 && (
                  <div className={classes.imageGrid}>
                    {previewImages.map((image, index) => (
                      <div className={classes.imageItemContainer} key={index}>
                        <img
                          alt=""
                          className={classes.imageItem}
                          src={image.src}
                        />

                        <Button
                          className={classes.imageDeleteButton}
                          size="small"
                          type="button"
                          onClick={() => handleDeleteImageClick(index)}
                        >
                          <Delete />
                        </Button>

                        {index > 0 && (
                          <Button
                            className={classes.imagePinButton}
                            size="small"
                            type="button"
                            onClick={() => handlePinImageClick(index)}
                          >
                            <Icon>push_pin</Icon>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CustomFormRow>

              <Button type="submit">Lưu bài đăng</Button>
            </div>
          </CardWithTitle>
        </Grid>
      </Grid>
    </form>
  )
}
