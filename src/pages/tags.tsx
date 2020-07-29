import { makeStyles } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import { graphql, Link } from 'gatsby'
import React from 'react'

import { SiteSiteMetadataMenuLinks, TagsPageQuery } from '~types'

import Layout from '../components/layout'
import RouterTabs from '../components/RouterTabs'

const useStyles = makeStyles({
  badges: {
    paddingTop: '0.5rem'
  },
  badge: {
    margin: '0.2rem 0.4rem',
    cursor: 'pointer'
  }
})

interface TagsPageProps {
  data: TagsPageQuery
}

const TagsPage: React.FC<TagsPageProps> = ({ data }) => {
  const classes = useStyles()
  const tags = data.tagsGroup.group.map(v => v.fieldValue || undefined)
  return (
    <Layout title={data.site?.siteMetadata?.title || 'UNKNOWN'}>
      <RouterTabs
        routers={
          (data.site?.siteMetadata?.menuLinks ?? []) as
            // i donn't know why this always fail
            // but success after added 'as' expression
            SiteSiteMetadataMenuLinks[]
        }
        currentPage='/tags'
      />
      <div className={classes.badges}>
        {tags.map(tag => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            // fix: underline
            style={{ color: 'transparent' }}
          >
            <Chip
              label={tag}
              className={classes.badge}
              variant='outlined'
            />
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query TagsPage {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
          icon
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
    allMarkdownRemark {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`
