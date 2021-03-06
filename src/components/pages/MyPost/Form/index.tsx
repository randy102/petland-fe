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
import { Category } from 'src/typings/Category'
import { City } from 'src/typings/City'
import { District } from 'src/typings/District'
import { Subcategory } from 'src/typings/Subcategory'
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
      enqueueSnackbar('Ch??? ch???p nh???n file ???nh!', {
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
          <CardWithTitle title="Th??ng tin th?? c??ng">
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
                    label="Lo???i th?? c??ng"
                    name="categoryID"
                    options={categories?.map(category => ({
                      value: category._id,
                      label: category.name,
                    }))}
                    rules={{
                      required: 'H??y ch???n lo???i th?? c??ng',
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
                        ? 'H??y ch???n lo???i th?? c??ng tr?????c'
                        : errors?.subCategoryID?.message
                    }
                    label="Gi???ng th?? c??ng"
                    name="subCategoryID"
                    options={subcategories?.map(subcategory => ({
                      value: subcategory._id,
                      label: subcategory.name,
                    }))}
                    rules={{
                      required: 'H??y ch???n gi???ng th?? c??ng',
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
                label="Ngu???n g???c"
                {...register('origin', {
                  required: 'H??y nh???p ngu???n g???c th?? c??ng',
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
                label="Tu???i"
                name="age"
                rules={{
                  required: 'H??y nh???p tu???i th?? c??ng',
                }}
                suffix=" th??ng"
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
                    label="Gi???i t??nh"
                    row={isXs}
                    {...register('sex', {
                      required: 'H??y ch???n gi???i t??nh th?? c??ng',
                    })}
                    items={[
                      { label: '?????c', value: 'MALE' },
                      { label: 'C??i', value: 'FEMALE' },
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
                    label="???? ti??m ch???ng"
                    row={isXs}
                    {...register('vaccination', {
                      required: 'H??y ch???n t??nh tr???ng ti??m ch???ng',
                    })}
                    items={[
                      { label: 'C??', value: 'true' },
                      { label: 'Kh??ng', value: 'false' },
                    ]}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                defaultValue={defaultValues?.detail}
                label="M?? t??? th??m (n???u c??)"
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
          <CardWithTitle title="Th??ng tin b??i ????ng">
            <div className={classes.form}>
              <TextField
                fullWidth
                required
                defaultValue={defaultValues?.name}
                error={!!errors?.name}
                helperText={errors?.name?.message}
                label="Ti??u ????? b??i ????ng"
                {...register('name', {
                  required: 'H??y nh???p ti??u ????? b??i ????ng',
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
                  errors?.price?.message || '??i???n 0 ngh??a l?? gi?? th????ng l?????ng'
                }
                label="Gi?? b??n"
                name="price"
                rules={{
                  required: 'H??y nh???p gi?? b??n',
                }}
                suffix=" ??"
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
                    label="T???nh/Th??nh ph???"
                    name="cityID"
                    options={cities?.map(city => ({
                      value: city._id,
                      label: city.name,
                    }))}
                    rules={{
                      required: 'H??y ch???n t???nh/th??nh ph???',
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
                        ? 'H??y ch???n t???nh/th??nh ph??? tr?????c'
                        : errors?.districtID?.message
                    }
                    label="Qu???n/Huy???n"
                    name="districtID"
                    options={districts?.map(district => ({
                      value: district._id,
                      label: district.name,
                    }))}
                    rules={{
                      required: 'H??y ch???n qu???n/huy???n',
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
                  '???nh ?????u ti??n s??? d??ng ????? hi???n th??? b??i vi???t'
                }
                label="H??nh ???nh th?? c??ng"
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
                      previewImages.length >= 2 || 'C???n ??t nh???t 2 ???nh th?? c??ng',
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
                    ? `T???i ??a ${MAX_POST_IMAGES} ???nh`
                    : 'Th??m ???nh'}
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
