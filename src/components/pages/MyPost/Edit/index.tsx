import { SelectInputProps } from '@material-ui/core/Select/SelectInput'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Redirect, useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import { IMAGE_BASE_URL } from 'src/constants'
import getCategories from 'src/helpers/getCategories'
import getCities from 'src/helpers/getCities'
import getDistricts from 'src/helpers/getDistricts'
import getImageURL from 'src/helpers/getImageURL'
import getPostDetails from 'src/helpers/getPostDetails'
import getSubcategories from 'src/helpers/getSubcategories'
import { ReadImageResult } from 'src/helpers/readImage'
import uploadImages from 'src/helpers/uploadImages'
import { Category } from 'src/types/Category'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import { Post } from 'src/types/Post'
import { Subcategory } from 'src/types/Subcategory'
import Form, { PostFormInputs } from '../Form'

type PreviewImage = {
  src: string
  file?: File
}

type UrlParams = {
  id: string
}

function idToImg(id: string): PreviewImage {
  return {
    src: getImageURL(id),
  }
}

export default function Edit() {
  const formMethods = useForm<PostFormInputs>()

  const { setValue } = formMethods

  const { id } = useParams<UrlParams>()

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])

  const [fetchError, setFetchError] = useState()

  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()

  const [details, setDetails] = useState<Post>()
  const [cities, setCities] = useState<City[]>()
  const [districts, setDistricts] = useState<District[]>()
  const [categories, setCategories] = useState<Category[]>()
  const [subcategories, setSubcategories] = useState<Subcategory[]>()

  const [loadingDefaultValues, setLoadingDefaultValues] = useState(true)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [loadingSubcategories, setLoadingSubcategories] = useState(false)
  const [editingPost, setEditingPost] = useState(false)

  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])

  // Load districts on city change
  const handleCategoryChange: SelectInputProps['onChange'] = (event, child) => {
    const categoryID = event.target.value as string

    setLoadingSubcategories(true)
    setSubcategories(undefined)
    setValue('subCategoryID', '')

    getDistricts(categoryID).then(response => {
      setSubcategories(response.data)
      setLoadingSubcategories(false)
    })
  }

  // Load districts on city change
  const handleCityChange: SelectInputProps['onChange'] = (event, child) => {
    const cityID = event.target.value as string

    setLoadingDistricts(true)
    setDistricts(undefined)
    setValue('districtID', '')

    getDistricts(cityID).then(response => {
      setDistricts(response.data)
      setLoadingDistricts(false)
    })
  }

  // Load default values on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          postDetailsResponse,
          citiesResponse,
          categoriesResponse,
        ] = await Promise.all([
          getPostDetails(id),
          getCities(),
          getCategories(),
        ])

        const postDetails: Post = postDetailsResponse.data

        setDetails(postDetails)
        setCities(citiesResponse.data)
        setCategories(categoriesResponse.data)

        const [districtsResponse, subcategoriesResponse] = await Promise.all([
          getDistricts(postDetails.cityID),
          getSubcategories(postDetails.categoryID),
        ])

        setDistricts(districtsResponse.data)
        setSubcategories(subcategoriesResponse.data)
        setPreviewImages([
          idToImg(postDetails.mainImage),
          ...postDetails.images.map(idToImg),
        ])
      } catch (error) {
        setFetchError(error)
        enqueueSnackbar(error?.response?.data.message, { variant: 'error' })
        console.log('Error:', error)
      } finally {
        setLoadingDefaultValues(false)
      }
    }

    fetchData()
  }, [])

  // Update preview images on new image load
  const handleNewImageLoad = (results: ReadImageResult[]) => {
    setPreviewImages(previewImages => [...previewImages, ...results])
  }

  // Pin image to array start
  const handleImagePin = (index: number) => {
    setPreviewImages(previewImages => {
      const newImages = [...previewImages]

      newImages.unshift(newImages.splice(index, 1)[0])

      return newImages
    })
  }

  // Delete image
  const handleImageDelete = (index: number) => {
    setPreviewImages(previewImages => {
      const newImages = [...previewImages]

      const deletedImage = newImages.splice(index, 1)[0]

      // If it's an uploaded image, save it's ID to delete later
      if (!deletedImage.file) {
        const deletedId = deletedImage.src.replace(IMAGE_BASE_URL + '/', '')

        setDeletedImageIds(deletedImageIds => [...deletedImageIds, deletedId])
      }

      return newImages
    })
  }

  const deleteImages = () => {
    return axios.delete('/photo', {
      data: {
        ids: deletedImageIds,
      },
    })
  }

  const uploadNewImages = () => {
    const newImageFiles = previewImages
      .filter(image => image.file)
      .map(image => image.file)

    return uploadImages(newImageFiles as File[])
  }

  const onSubmit = async (data: PostFormInputs) => {
    data.vaccination = data.vaccination === 'true'
    setEditingPost(true)

    deleteImages()

    try {
      const uploadImageResponse = await uploadNewImages()

      const newIds = uploadImageResponse.data

      const imageIds = previewImages.map(img =>
        img.file ? newIds.shift() : img.src.replace(IMAGE_BASE_URL + '/', '')
      )

      data.mainImage = imageIds[0]
      data.images = imageIds.slice(1)

      await axios.put('/post', {
        ...data,
        id,
      })

      enqueueSnackbar('Chỉnh sửa bài đăng thành công!', {
        variant: 'success',
      })
      history.push('/my-account/posts?state=DRAFT')
    } catch (error) {
      enqueueSnackbar(error?.response?.data.message, { variant: 'error' })
      console.log('Error:', error)
    } finally {
      setEditingPost(false)
    }
  }

  if (fetchError) {
    return <Redirect to="/" />
  }

  if (loadingDefaultValues) {
    return <LoadingBackdrop open />
  }

  return (
    <FormProvider {...formMethods}>
      <LoadingBackdrop
        open={loadingDistricts || loadingSubcategories || editingPost}
      />

      <Form
        categories={categories}
        cities={cities}
        defaultValues={{
          categoryID: details?.categoryID,
          subCategoryID: details?.subCategoryID,
          origin: details?.origin,
          age: details?.age,
          sex: details?.sex,
          vaccination: details?.vaccination,
          detail: details?.detail,
          name: details?.name,
          price: details?.price,
          cityID: details?.cityID,
          districtID: details?.districtID,
        }}
        districts={districts}
        previewImages={previewImages}
        subcategories={subcategories}
        submitText="Lưu thay đổi"
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
