import { SelectInputProps } from '@material-ui/core/Select/SelectInput'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { ReadImageResult } from 'src/helpers/readImage'
import uploadImages from 'src/helpers/uploadImages'
import useAxios from 'src/hooks/useAxios'
import { Category } from 'src/types/Category'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import { Subcategory } from 'src/types/Subcategory'
import Form, { PostFormInputs } from '../Form'

type PreviewImage = {
  src: string
  file: File
}

export default function Create() {
  const formMethods = useForm<PostFormInputs>()

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const { setValue } = formMethods

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

  // Load districts on city change
  const handleCategoryChange: SelectInputProps['onChange'] = (event, child) => {
    const categoryID = event.target.value as string

    setValue('subCategoryID', '')
    getSubcategories({
      params: {
        category: categoryID,
      },
    })
  }

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

  // Load districts on city change
  const handleCityChange: SelectInputProps['onChange'] = (event, child) => {
    const cityID = event.target.value as string

    setValue('districtID', '')
    getDistricts({
      params: {
        city: cityID,
      },
    })
  }

  const handleNewImageLoad = (results: ReadImageResult[]) => {
    setPreviewImages(previewImages => [...previewImages, ...results])
  }

  const handleImagePin = (index: number) => {
    setPreviewImages(previewImages => {
      const newImages = [...previewImages]

      newImages.unshift(newImages.splice(index, 1)[0])

      return newImages
    })
  }

  const handleImageDelete = (index: number) => {
    setPreviewImages(previewImages => {
      const newImages = [...previewImages]
      newImages.splice(index, 1)

      return newImages
    })
  }

  const onSubmit = (data: PostFormInputs) => {
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

      axios.post('/post', data).then(response => {
        setLoading(false)

        enqueueSnackbar('Tạo bài đăng thành công!', {
          variant: 'success',
        })

        history.push('/my-account/posts?state=DRAFT')
      })
    })
  }

  if (loadingCategories || loadingCities) {
    return <LoadingBackdrop open />
  }

  return (
    <FormProvider {...formMethods}>
      <LoadingBackdrop
        open={loadingSubcategories || loadingDistricts || loading}
      />

      <Form
        categories={categories}
        cities={cities}
        districts={districts}
        previewImages={previewImages}
        subcategories={subcategories}
        submitText="Lưu bản nháp"
        onCategoryChange={handleCategoryChange}
        onCityChange={handleCityChange}
        onImageDelete={handleImageDelete}
        onImagePin={handleImagePin}
        onNewImageLoad={handleNewImageLoad}
        onSubmit={onSubmit}
      />
    </FormProvider>
  )
}
