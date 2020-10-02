import { Grid } from '@material-ui/core'
import React, { Fragment } from 'react'

import ArticleCard from './ArticleCard'

const PostList = ({ posts = [] }) => {
  return (
    <Fragment>
      <Grid container spacing={2}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Grid
              key={title}
              item
            >
              <ArticleCard
                to={node.fields.slug}
                title={title}
                date={node.frontmatter.date}
                description={node.frontmatter.description || node.excerpt}
              />
            </Grid>
          )
        })}
      </Grid>
    </Fragment>
  )
}

export default PostList
