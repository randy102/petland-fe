import { DateTime } from 'luxon'

export default function getPostRelativeDate(millis: number) {
  const publishDate = DateTime.fromMillis(millis)

  const diff = publishDate.diffNow('days').days

  if (diff < -7) {
    return publishDate.toLocaleString()
  }

  return publishDate.toRelative()
}
