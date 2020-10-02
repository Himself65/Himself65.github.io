import '../style/index.css'

import { graphql } from 'gatsby'
import React from 'react'

import type { IndexPageQuery } from '~types'

import Layout from '../components/layout'
import ProfileCard from '../components/ProfileCard'
import SEO from '../components/seo'

const BlogIndex: React.FC<{ data: IndexPageQuery }> = ({ data }) => {
  return (
    <Layout title=''>
      <SEO title='Home'/>
      <ProfileCard/>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
