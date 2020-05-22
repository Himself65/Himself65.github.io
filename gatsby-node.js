const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { kebabCase } = require('lodash')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.js')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')
  const docTemplate = path.resolve('./src/templates/doc.tsx')
  const result = await graphql(
    `
      {
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
  }

  // Create blog posts pages.
  const posts = result.data.postsRemark.edges
  const tags = result.data.tagsGroup.group
  const docs = result.data.docsGroup.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    const postUrl = post.node.fields.slug
    createPage({
      path: postUrl,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    })
  })

  tags.forEach((tag) => {
    const tagUrl = `/tags/${kebabCase(tag.fieldValue)}`
    createPage({
      path: tagUrl,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue
      }
    })
  })

  // create doc
  docs.forEach(({ node }) => {
    const docUrl = `/doc/${kebabCase(node.name)}`
    createPage({
      path: docUrl,
      component: docTemplate,
      context: {
        title: node.name,
        docHTML: node.childMarkdownRemark.html
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}
