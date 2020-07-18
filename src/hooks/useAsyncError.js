import {useState} from 'react'

function useAsyncError() {
  // eslint-disable-next-line
  const [_, setError] = useState()

  const handleError = (err) => {
    setError(() => {
      throw err
    })
  }

  return handleError
}

export default useAsyncError
