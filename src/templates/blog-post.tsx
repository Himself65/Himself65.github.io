import 'prismjs/themes/prism-solarizedlight.css'

import { graphql } from 'gatsby'
import React from 'react'

import type { BlogPostBySlugQuery } from '~types'

import Post from '../components/Post'

export const BlogPostTemplate: React.FC<{
  data: BlogPostBySlugQuery
}> = (props) => {
  const post = props.data.markdownRemark
  const siteTitle = props.data?.site?.siteMetadata?.author as string
  return (
    <Post
      siteTitle={siteTitle}
      backTo='/blog'
      postData={{
        title: post?.frontmatter?.title as string,
        date: post?.frontmatter?.date as string
      }}
    >
      <section dangerouslySetInnerHTML={{ __html: post?.html || '' }}/>
    </Post>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
      }
    }
  }
`
