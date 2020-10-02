import { graphql } from 'gatsby'
import React from 'react'

import { TagPageQuery } from '~types'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const TagPage: React.FC<{
  data: TagPageQuery
  pageContext: {
    tag: string
  }
}> = props => {
  const targetPost = props.data.allMarkdownRemark.edges.filter(
    edge => edge.node.frontmatter?.tags?.includes(props.pageContext.tag))
  return (
    <Layout title={props.data.site?.siteMetadata?.title}>
      <PostList posts={targetPost}/>
    </Layout>
  )
}

export default TagPage

export const pageQuery = graphql`
  query TagPage {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(filter: {}, sort: {fields: frontmatter___date}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            tags
            title
            date
          }
        }
      }
    }
  }
`
