import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import { MdxBlogPostBySlugQuery } from '~types'

import Post from '../components/Post'

const globalReplacement: MDXProviderComponents = {

}

deckDeckGoHighlightElement().then()
export const MdxBlogPostTemplate: React.FC<{
  data: MdxBlogPostBySlugQuery
}> = (props) => {
  const post = props.data.mdx
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
      <section>
        <MDXProvider components={globalReplacement}>
          <MDXRenderer>
            {post?.body as string}
          </MDXRenderer>
        </MDXProvider>
      </section>
    </Post>
  )
}

export default MdxBlogPostTemplate

export const query = graphql`
  query MdxBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date
      }
    }
  }
`
