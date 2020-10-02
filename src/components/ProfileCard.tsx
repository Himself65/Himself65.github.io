import {
  Chip,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/Github'
import TwitterIcon from '@material-ui/icons/Twitter'
import { graphql, useStaticQuery } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'

import type { ProfileCardQuery } from '~types'

import { rhythm } from '../utils/typography'

const ProfileCard: React.FC = () => {
  const data = useStaticQuery<ProfileCardQuery>(graphql`
    query ProfileCard {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      },
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `)
  const { author, social } = data.site.siteMetadata
  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid container item spacing={1} alignItems='center'>
          <Grid item>
            <Image
              fixed={data.avatar!.childImageSharp!.fixed as FixedObject}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: '100%'
              }}
              imgStyle={{
                borderRadius: '50%'
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant='h5'>
              Himself65
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item>
            <Typography variant='body1'>
              An iowa state university freshman, member of node.js, hexo.js.
            </Typography>
            <Typography variant='body2'>
              Recently learning Linux kernel and OS development
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={3}
          direction='column'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid container item spacing={1} direction='row' alignItems='center'>
            <Grid item>
              <Chip
                color='primary'
                clickable
                component='a'
                href={social.twitter}
                variant='outlined'
                icon={<TwitterIcon fontSize='small' />}
                label={
                  <Typography variant='caption' color='textSecondary'>
                    Twitter
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <Chip
                color='secondary'
                clickable
                component='a'
                href={social.github}
                variant='outlined'
                icon={<GitHubIcon fontSize='small' />}
                label={
                  <Typography variant='caption' color='textSecondary'>
                    GitHub
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProfileCard
