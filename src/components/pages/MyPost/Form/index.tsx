import { Button, Grid, Icon } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { ChangeEvent, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import CustomFormRow from 'src/components/shared/CustomFormRow'
import NumberTextField from 'src/components/shared/NumberTextField'
import Radio from 'src/components/shared/Radio'
import TextField from 'src/components/shared/TextField'
import { MAX_POST_IMAGES } from 'src/constants'
import isImage from 'src/helpers/isImage'
import { Category } from 'src/types/Category'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import { Subcategory } from 'src/types/Subcategory'
import useStyles from './styles'
import _partition from 'lodash/partition'
import { useSnackbar } from 'notistack'
import Select from 'src/components/shared/Select'
import { SelectInputProps } from '@material-ui/core/Select/SelectInput'
import readImages from 'src/helpers/readImages'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { ReadImageResult } from 'src/helpers/readImage'
import useDidUpdateEffect from 'src/hooks/useDidUpdateEffect'
import useIsBreakpoint from 'src/hooks/useIsBreakpoint'

export type PostFormInputs = {
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

type PreviewImage = {
  src: string
}

type Props = {
  onSubmit: any
  previewImages: PreviewImage[]
  onImageDelete: (index: number) => void
  onImagePin: (index: number) => void
  submitText: string
  onNewImageLoad: (results: ReadImageResult[]) => void
  categories?: Category[]
  subcategories?: Subcategory[]
  cities?: City[]
  districts?: District[]
  defaultValues?: Partial<PostFormInputs>
  onCategoryChange?: SelectInputProps['onChange']
  onCityChange?: SelectInputProps['onChange']
}

export default function Form(props: Props) {
  const {
    onSubmit,
    previewImages,
    onImageDelete,
    onImagePin,
    onNewImageLoad,
    submitText,
    categories,
    subcategories,
    cities,
    districts,
    defaultValues,
    onCityChange,
    onCategoryChange,
  } = props

  const classes = useStyles()

  const isXs = useIsBreakpoint('xs')

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    trigger,
  } = useFormContext()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { enqueueSnackbar } = useSnackbar()

  const [readingImages, setReadingImages] = useState<boolean>(false)

  const handleClick = () => {
    if (!fileInputRef?.current) return

    fileInputRef.current.click()
  }

  // Trigger image validation on preview images length change
  useDidUpdateEffect(() => {
    trigger('mainImage')
  }, [previewImages.length])

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

    setReadingImages(true)

    readImages(images).then(results => {
      setReadingImages(false)
      onNewImageLoad(results)
    })

    // Reset input value so user can select the same file(s) next time
    event.currentTarget.value = ''
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <LoadingBackdrop open={readingImages} />

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
                  <Select
                    fullWidth
                    required
                    control={control}
                    defaultValue={defaultValues?.categoryID || ''}
                    error={!!errors?.categoryID}
                    helperText={errors?.categoryID?.message}
                    label="Loại thú cưng"
                    name="categoryID"
                    options={categories?.map(category => ({
                      value: category._id,
                      label: category.name,
                    }))}
                    rules={{
                      required: 'Hãy chọn loại thú cưng',
                    }}
                    onChange={onCategoryChange}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Select
                    fullWidth
                    required
                    control={control}
                    defaultValue={defaultValues?.subCategoryID || ''}
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
                    name="subCategoryID"
                    options={subcategories?.map(subcategory => ({
                      value: subcategory._id,
                      label: subcategory.name,
                    }))}
                    rules={{
                      required: 'Hãy chọn giống thú cưng',
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                required
                defaultValue={defaultValues?.origin}
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
                defaultValue={defaultValues?.age}
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
                    defaultValue={defaultValues?.sex}
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
                    defaultValue={
                      defaultValues?.vaccination
                        ? defaultValues?.vaccination + ''
                        : undefined
                    }
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
                defaultValue={defaultValues?.detail}
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
                defaultValue={defaultValues?.name}
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
                defaultValue={defaultValues?.price}
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
                  <Select
                    fullWidth
                    required
                    control={control}
                    defaultValue={defaultValues?.cityID || ''}
                    error={!!errors?.cityID}
                    helperText={errors?.cityID?.message}
                    label="Tỉnh/Thành phố"
                    name="cityID"
                    options={cities?.map(city => ({
                      value: city._id,
                      label: city.name,
                    }))}
                    rules={{
                      required: 'Hãy chọn tỉnh/thành phố',
                    }}
                    onChange={onCityChange}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Select
                    fullWidth
                    required
                    control={control}
                    defaultValue={defaultValues?.districtID || ''}
                    disabled={!districts?.length}
                    error={!districts?.length ? false : !!errors?.districtID}
                    helperText={
                      !districts?.length
                        ? 'Hãy chọn tỉnh/thành phố trước'
                        : errors?.districtID?.message
                    }
                    label="Quận/Huyện"
                    name="districtID"
                    options={districts?.map(district => ({
                      value: district._id,
                      label: district.name,
                    }))}
                    rules={{
                      required: 'Hãy chọn quận/huyện',
                    }}
                  />
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
                    previewImages.length !== MAX_POST_IMAGES && <Add />
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
                          onClick={() => onImageDelete(index)}
                        >
                          <Delete />
                        </Button>

                        {index > 0 && (
                          <Button
                            className={classes.imagePinButton}
                            size="small"
                            type="button"
                            onClick={() => onImagePin(index)}
                          >
                            <Icon>push_pin</Icon>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CustomFormRow>

              <Button type="submit">{submitText}</Button>
            </div>
          </CardWithTitle>
        </Grid>
      </Grid>
    </form>
  )
}
