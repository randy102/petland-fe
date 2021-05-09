import { useAppSelector } from 'src/redux/hooks'
import LoadingBackdrop from '../LoadingBackdrop'

export default function GlobalLoadingBackdrop() {
  const loadingCount = useAppSelector(state => state.loadingCount)

  return <LoadingBackdrop open={loadingCount > 0} />
}
