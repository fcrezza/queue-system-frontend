import {useState, useEffect} from 'react'

function useError(errors = {}) {
  const [errorMessage, setError] = useState(null)

  useEffect(() => {
    const errorKeys = Object.keys(errors)
    if (errorKeys.length) {
      const {message} = errors[errorKeys[0]]
      setError(message)
    }
  }, [errors])

  return {errorMessage, setError}
}

export default useError
