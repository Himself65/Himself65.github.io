import { Card, CardContent, makeStyles, Typography, useTheme } from '@material-ui/core'
import Img, { FluidObject } from 'gatsby-image'
import React, { CSSProperties } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'var(--bg)',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse'
    }
  },
  content: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--textNormal)',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  media: {
    width: '50%',
    background: 'transparent',
    backgroundSize: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}))

export type GKState = {
  name: string
  state: string
  price: number
  links: {
    name: string
    url: string
  }[]
  image: FluidObject
}

export interface GKCardProps {
  state: GKState
  style?: CSSProperties
}

const GKCard: React.FC<GKCardProps> = ({ state, style }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  return (
    <Card className={classes.root} style={style}>
      <CardContent className={classes.content}>
        <Typography
          component='span'
          variant='body1'
        >
          <b>Name</b>: {state.name}
        </Typography>
        <Typography
          component='span'
          variant='body1'
        >
          <b>Price</b>: {state.price}￥
        </Typography>
        <Typography
          component='span'
          variant='body1'
        >
          <b>State</b>: {state.state}
        </Typography>
        <Typography
          component='span'
          variant='body1'
        >
          <b>Link</b>: {
            state.links
              .map(link => (
                <a key={link.url} href={link.url}>{link.name}</a>)
              )
          }
        </Typography>
      </CardContent>
      <Img
        className={classes.media}
        fluid={state.image}
        alt='flu'
      />
    </Card>
  )
}

export default GKCard
