import { useState, useEffect } from 'react'

const useDebounce = (newValue: string, time: number) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
        setValue(newValue)
    }, time);

    return () => {
        clearTimeout(timeout)
     }
  }, [newValue])


  return value
}

export default useDebounce