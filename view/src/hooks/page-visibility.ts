import { useCallback, useEffect, useState } from 'react'

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(!document.hidden)

  const handleVisibilityChange = useCallback(() => {
    setIsVisible(!document.hidden)
  }, [])

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange, false)
    return () => {
      document.removeEventListener('visibilityChange', handleVisibilityChange)
    }
  })

  return isVisible
}
