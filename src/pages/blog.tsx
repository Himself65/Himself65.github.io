import { graphql } from 'gatsby'
import React, { useMemo } from 'react'

import type { BlogPageQuery } from '~types'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const BlogPage: React.FC<{ data: BlogPageQuery }> = ({ data }) => {
  const posts = useMemo(() =>
    [
      ...data.allMarkdownRemark.edges,
      ...data.allMdx.edges
    ].sort((b, a) => {
      if (a.node?.frontmatter?.date < b.node?.frontmatter?.date) {
        return -1
      } else if (a.node?.frontmatter?.date > b.node?.frontmatter?.date) {
        return 1
      } else {
        return 0
      }
    })
  , [data.allMdx, data.allMarkdownRemark])

  return (
    <Layout to='/blog' title={'Himself65\'s Blog'}>
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
    allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
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
            display
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: {
          regex: "/blog/.+.md/"
        }
      },
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            display
          }
        }
      }
    }
  }
`
