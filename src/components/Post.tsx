import { Typography } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

import { rhythm, scale } from '../utils/typography'
import Layout from './layout'
import ProfileCard from './ProfileCard'
import SEO from './seo'

export type PostProps = {
  siteTitle: string
  backTo: string
  postData: {
    title: string
    date: string
  }
}

export const Post: React.FC<PostProps> = ({
  siteTitle,
  backTo,
  postData: {
    title,
    date
  },
  children
}) => {
  return (
    <Layout to={backTo} title={siteTitle}>
      <SEO
        title={title}
      />
      <article>
        <header>
          <Typography
            variant='h5'
            style={{
              marginTop: rhythm(1),
              marginBottom: 0
            }}
          >
            {title}
          </Typography>
          <Typography
            variant='caption'
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1)
            }}
          >
            {moment(date).fromNow()}
          </Typography>
        </header>
        {children}
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

export default Post
