import { graphql } from 'gatsby'
import React from 'react'

import type { BlogPageQuery } from '~types'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const BlogPage: React.FC<{ data: BlogPageQuery }> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.filter(
    ({ node }) => data.excludeMarkdownRemark.edges.find(
      ({ node: { id } }) => id === node.id) === undefined)
  return (
    <Layout title={'Himself65\'s Blog'}>
      <PostList posts={posts} />
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query BlogPage {
    site {
      siteMetadata {
        title
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
