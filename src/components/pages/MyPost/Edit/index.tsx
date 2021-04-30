import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Redirect, useParams } from 'react-router'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import getCategories from 'src/helpers/getCategories'
import getCities from 'src/helpers/getCities'
import getDistricts from 'src/helpers/getDistricts'
import getImageURL from 'src/helpers/getImageURL'
import getPostDetails from 'src/helpers/getPostDetails'
import getSubcategories from 'src/helpers/getSubcategories'
import { Category } from 'src/types/Category'
import { City } from 'src/types/City'
import { District } from 'src/types/District'
import { Post } from 'src/types/Post'
import { Subcategory } from 'src/types/Subcategory'
import Form, { PostFormInputs, PreviewImageLoadResult } from '../Form'

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

  const { handleSubmit, setError, setValue, watch } = formMethods

  const { id } = useParams<UrlParams>()

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])

  const [loading, setLoading] = useState<boolean>(true)

  const [fetchError, setFetchError] = useState()

  const { enqueueSnackbar } = useSnackbar()

  const [details, setDetails] = useState<Post>()
  const [cities, setCities] = useState<City[]>()
  const [districts, setDistricts] = useState<District[]>()
  const [categories, setCategories] = useState<Category[]>()
  const [subcategories, setSubcategories] = useState<Subcategory[]>()

  const cityID = watch('cityID')

  useEffect(() => {
    console.log(cityID)
  }, [cityID])

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
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleNewImageLoad = (res: PreviewImageLoadResult) => {
    setPreviewImages(previewImages => [
      ...previewImages,
      { src: res.src, file: res.file, isNew: true },
    ])
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

      if (newImages.length < 2) {
        setError('mainImage', {
          message: 'Cần ít nhất 2 ảnh thú cưng',
        })
      }

      return newImages
    })
  }

  const onSubmit = handleSubmit((data: PostFormInputs) => {
    // data.vaccination = data.vaccination === 'true'
    // setLoading(true)
    // const mainImageFile = previewImages.slice(0, 1).map(img => img.file)
    // const otherImageFiles = previewImages.slice(1).map(img => img.file)
    // Promise.all([
    //   uploadImages(mainImageFile),
    //   uploadImages(otherImageFiles),
    // ]).then(results => {
    //   data.mainImage = results[0].data[0]
    //   data.images = results[1].data
    //   axios
    //     .post('/post', {
    //       ...data,
    //     })
    //     .then(response => {
    //       setLoading(false)
    //       enqueueSnackbar('Tạo bài đăng thành công!', {
    //         variant: 'success',
    //       })
    //       history.push('/my-account/posts?state=DRAFT')
    //     })
    // })
  })

  if (fetchError) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <LoadingBackdrop open />
  }

  return (
    <FormProvider {...formMethods}>
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
        submitText="Lưu bản nháp"
        onImageDelete={handleImageDelete}
        onImagePin={handleImagePin}
        onNewImageLoad={handleNewImageLoad}
        onSubmit={onSubmit}
      />
    </FormProvider>
  )
}
