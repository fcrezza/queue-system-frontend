import {useState, useEffect} from 'react'

function useError(errors) {
  const [errorMessage, setError] = useState(null)

  useEffect(() => {
    if (Object.keys(errors).length) {
      const {message} = errors[Object.keys(errors)[0]]
      setError(message)
    }
  }, [errors])

  return {errorMessage, setError}
}

export default useError
