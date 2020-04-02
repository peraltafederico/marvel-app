import { useState, useEffect } from 'react'

const useDebounce = (newValue: string, time: number): [string, boolean] => {
  const [value, setValue] = useState('')
  const [alreadyDebounce, setAlreadyDebounce] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(newValue)
      if (!alreadyDebounce) {
        setAlreadyDebounce(true)
      }
    }, time)

    return (): void => {
      clearTimeout(timeout)
    }
  }, [newValue, alreadyDebounce, time])

  return [value, alreadyDebounce]
}

export default useDebounce
