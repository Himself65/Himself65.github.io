import 'prismjs/themes/prism-solarizedlight.css'

import { graphql } from 'gatsby'
import React from 'react'

import type { BlogPostBySlugQuery } from '~types'

import Layout from '../components/layout'
import ProfileCard from '../components/ProfileCard'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

export const BlogPostTemplate: React.FC<{
  data: BlogPostBySlugQuery
}> = (props) => {
  const post = props.data.markdownRemark
  const siteTitle = props.data?.site?.siteMetadata?.title as string
  return (
    <Layout to='/blog' title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0
            }}
          >
            {post?.frontmatter?.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1)
            }}
          >
            {post?.frontmatter?.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post?.html as string }}/>
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <footer>
          <ProfileCard/>
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
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
