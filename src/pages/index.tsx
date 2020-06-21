import React from 'react'
import { graphql } from 'gatsby'

import type { IndexPageQuery, SiteSiteMetadataMenuLinks } from '~types'

import RouterTabs from '../components/RouterTabs'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

import '../style/index.css'
import PostList from '../components/PostList'

const BlogIndex: React.FC<{ data: IndexPageQuery }> = ({ data }) => {
  const siteTitle = data.site?.siteMetadata?.title
  const posts = data.allMarkdownRemark.edges.filter(
    ({ node }) => data.excludeMarkdownRemark.edges.find(
      ({ node: { id } }) => id === node.id) === undefined)
  return (
    <Layout title={siteTitle}>
      <SEO title='Home'/>
      <Bio/>
      <RouterTabs
        routers={data.site?.siteMetadata?.menuLinks as SiteSiteMetadataMenuLinks[]}
        currentPage='/'/>
      <PostList posts={posts}/>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
          icon
        }
        friendship {
          description
          name
          url
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
    excludeMarkdownRemark: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/doc\\/.+.md/"}}) {
      edges {
        node {
          id
        }
      }
    }
  }
`
