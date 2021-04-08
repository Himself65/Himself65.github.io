import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { Link } from 'gatsby'
import React, { Fragment } from 'react'

const PostList = ({ posts = [] }) => {
  return (
    <Fragment>
      <List>
        {posts.map(({ node }) => {
          const slug = node.slug || node.fields.slug
          const title = node.frontmatter.title || slug
          if (node.frontmatter.display === false) return null
          return (
            <Fragment key={node.id}>
              <ListItem
                component={Link}
                button
                style={{
                  color: 'inherit',
                  boxShadow: 'none'
                }}
                to={slug}
              >
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
