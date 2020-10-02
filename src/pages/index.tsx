import '../style/index.css'

import React from 'react'

import type { IndexPageQuery } from '~types'

import Layout from '../components/layout'
import ProfileCard from '../components/ProfileCard'
import SEO from '../components/seo'

const BlogIndex: React.FC<{ data: IndexPageQuery }> = () => {
  return (
    <Layout title='' brief>
      <SEO title='Home'/>
      <ProfileCard/>
    </Layout>
  )
}

export default BlogIndex
