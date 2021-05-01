import readImage from './readImage'

export default async function readImages(files: File[]) {
  const promises = files.map(file => readImage(file))

  return Promise.all(promises)
}
