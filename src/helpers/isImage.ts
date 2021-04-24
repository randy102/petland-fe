export default function isImage(file: File) {
  return file.type.startsWith('image')
}
