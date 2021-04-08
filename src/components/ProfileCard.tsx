import {
  Avatar,
  Chip,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import {
  Book as BookIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import CountUp from 'react-countup'

import type { ProfileCardQuery } from '~types'

const useStyles = makeStyles({
  avatar: {
    width: 50,
    height: 50
  }
})

const ProfileCard: React.FC = () => {
  const classes = useStyles()
  const data = useStaticQuery<ProfileCardQuery>(graphql`
    query ProfileCard {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
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
            instagram
          }
        }
      }
    }
  `)
  const siteMetadata = data.site?.siteMetadata
  return (
    <Paper elevation={0}>
      <Grid container spacing={2}>
        <Grid container item spacing={1} alignItems='center'>
          <Grid item>
            <Avatar classes={{ root: classes.avatar }} src={data.avatar?.childImageSharp?.fixed?.src} />
          </Grid>
          <Grid item>
            <Typography variant='h5'>
              Himself
              <CountUp start={0} end={65}/>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item>
            <Typography variant='body1'>
              An Iowa state university freshman, member of node.js & hexo.js.
            </Typography>
            <Typography variant='body2'>
              Recently learning about finance and stocks.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={3}
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Grid container item spacing={1} direction='row' alignItems='center'>
            <Grid item>
              <Chip
                clickable
                component='a'
                color='primary'
                href={`https://twitter.com/${siteMetadata?.social?.twitter as string}`}
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
                clickable
                component='a'
                color='default'
                href={`https://github.com/${siteMetadata?.social?.github as string}`}
                variant='outlined'
                icon={<GitHubIcon fontSize='small' />}
                label={
                  <Typography variant='caption' color='textSecondary'>
                    GitHub
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <Chip
                clickable
                component='a'
                color='secondary'
                href={`https://instagram.com/${siteMetadata?.social?.instagram as string}`}
                variant='outlined'
                icon={<InstagramIcon fontSize='small' />}
                label={
                  <Typography variant='caption' color='textSecondary'>
                    Instagram
                  </Typography>
                }
              />
            </Grid>
            <Grid item>
              <Chip
                clickable
                component='a'
                href='/blog'
                variant='outlined'
                icon={<BookIcon fontSize='small' />}
                label={
                  <Typography variant='caption' color='textSecondary'>
                    Blog
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
