export type ReadImageResult = {
  src: string
  file: File
}

export default function readImage(file: File): Promise<ReadImageResult> {
  const reader = new FileReader()

  return new Promise(resolve => {
    reader.onload = () => {
      resolve({
        src: reader.result as string,
        file,
      })
    }
    reader.readAsDataURL(file)
  })
}
