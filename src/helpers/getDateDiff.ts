export default function getDateDiff(date: number): number {
  const current = new Date().valueOf()
  const diff = date - current
  return Math.ceil(diff / 1000 / 3600 / 24)
}
