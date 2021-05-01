import readImage from './readImage'

export default async function readImages(files: File[]) {
  return Promise.all(files.map(readImage))
}
