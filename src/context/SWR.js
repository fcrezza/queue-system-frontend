import React from 'react'
import {SWRConfig} from 'swr'
import axios from '../libs/axios'

function fetcher(url) {
  return axios.get(url).then(({data}) => data)
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
