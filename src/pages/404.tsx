import React from 'react'
import { graphql } from 'gatsby'

import type { NotFoundPageQuery } from '~types'
import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage: React.FC<{ data: NotFoundPageQuery }> = ({ data }) => {
  const siteTitle = data.site?.siteMetadata?.title
  return (
    <Layout title={siteTitle}>
      <SEO title='404: Not Found'/>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
