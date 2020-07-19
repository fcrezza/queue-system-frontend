import React from 'react'
import axios from 'axios'
import {SWRConfig} from 'swr'

function fetcher(url) {
  const baseURL = process.env.REACT_APP_API_URL
  const mergeURL = baseURL + url
  return axios.get(mergeURL).then(({data}) => data)
}

function Config({children}) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default Config
