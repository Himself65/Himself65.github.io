const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { kebabCase } = require('lodash')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.tsx')
  const mdxBlogPost = path.resolve('./src/templates/mdx-post.tsx')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')
  const postsResult = await graphql(
    `
      {
        mdxRemark: allMdx(
          sort: { fields: [frontmatter___date], order: DESC },
          limit: 2000
        ) {
          edges {
            node {
              frontmatter {
                date
                tags
                title
              }
              slug
              fields {
                slug
              }
            }
          }
        }
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 2000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )
  const result = await graphql(
    `
      {
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        docsGroup: allFile(filter: {sourceInstanceName: {eq: "doc"}}) {
          edges {
            node {
              name
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  } else if (postsResult.errors) {
    throw postsResult.errors
  }

  // Create blog posts pages.
  // const posts = [
  //   ...postsResult.data.postsRemark.edges,
  //   ...postsResult.data.mdxRemark.edges
  // ].sort((a, b) => {
  //   if (a.node?.frontmatter?.date < b.node?.frontmatter?.date) {
  //     return -1
  //   } else if (a.node?.frontmatter?.date > b.node?.frontmatter?.date) {
  //     return 1
  //   } else {
  //     return 0
  //   }
  // })

  // posts.forEach((post, index, array) => {
  //   const previous = index === posts.length - 1 ? null : array[index + 1].node
  //   const next = index === 0 ? null : array[index - 1].node

  //   const postUrl = post.node.fields.slug
  //   // fixme: check whether is .mdx without the node.slug
  //   if (post.node.slug) {
  //     // is mdx type
  //     createPage({
  //       path: postUrl,
  //       component: mdxBlogPost,
  //       context: {
  //         slug: postUrl,
  //         previous,
  //         next
  //       }
  //     })
  //   } else {
  //     // is md type
  //     createPage({
  //       path: postUrl,
  //       component: blogPost,
  //       context: {
  //         slug: postUrl,
  //         previous,
  //         next
  //       }
  //     })
  //   }
  // })

  // create Tags page
  // const tags = result.data.tagsGroup.group
  // tags.forEach((tag) => {
  //   const tagUrl = `/tags/${kebabCase(tag.fieldValue)}`
  //   createPage({
  //     path: tagUrl,
  //     component: tagTemplate,
  //     context: {
  //       tag: tag.fieldValue
  //     }
  //   })
  // })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  switch (node.internal.type) {
    case 'MarkdownRemark':
    case 'Mdx': {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: 'slug',
        node,
        value
      })
      break
    }
  }
}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
