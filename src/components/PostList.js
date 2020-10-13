import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import React, { Fragment } from 'react'

const PostList = ({ posts = [] }) => {
  return (
    <Fragment>
      <List>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Fragment key={node.id}>
              <ListItem button>
                <ListItemText
                  primary={title}
                  secondary={
                    (
                      <Typography variant='caption'>
                        {node.frontmatter.date}
                      </Typography>
                    )
                  }
                />
              </ListItem>
              <Divider component='li' />
            </Fragment>
          )
        })}
      </List>
    </Fragment>
  )
}

export default PostList
