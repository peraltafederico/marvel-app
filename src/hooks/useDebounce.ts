import { useState, useEffect } from 'react'

const useDebounce = (newValue: string, time: number): string => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(newValue)
    }, time)

    return (): void => {
      clearTimeout(timeout)
    }
  }, [newValue, time])

  return value
}

export default useDebounce
