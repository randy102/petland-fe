import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export default function useDidUpdateEffect(
  fn: EffectCallback,
  deps: DependencyList
) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) fn()
    else didMountRef.current = true
  }, deps)
}
