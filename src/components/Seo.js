import React from 'react'
import {Helmet} from 'react-helmet'

function Seo({title: titleProp}) {
  const defaultTitle = 'UNIQUEUE | Aplikasi antrian bimbingan dosen'
  const description = 'Mulai bimbingan dengan sekali tap, yup semudah itu!'
  const title = titleProp || defaultTitle
  const url = window.location.href

  return (
    <Helmet>
      <title>{title}</title>
      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  )
}

export default Seo
