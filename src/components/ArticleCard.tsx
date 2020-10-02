import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Theme,
  Typography
} from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(1),
    backgroundColor: 'var(--bg-secondary)',
    transition: '0.3s',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2)
    }
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)'
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(147deg, ${grey[palette.type === 'dark' ? '800' : '100']} 0%, ${grey[palette.type === 'dark' ? '900' : '200']} 74%)`,
      borderRadius: spacing(2),
      opacity: 0.5
    }
  },
  content: {
    width: '100%'
  },
  button: {
    backgroundImage: `linear-gradient(147deg, ${grey[palette.type === 'light' ? '800' : '100']} 0%, ${grey[palette.type === 'light' ? '900' : '200']} 74%)`,
    borderRadius: 100,
    paddingLeft: 24,
    paddingRight: 24,
    color: `${palette.type === 'dark' ? '#000' : '#fff'}`
  }
}))

export type ArticleCardProps = {
  imageHref?: string
  to: string
  title: string
  date: string
  description: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({ to, title, description, date, imageHref }) => {
  const classes = useStyles()
  return (
    <Card
      className={classes.root}
      elevation={3}
    >
      {
        imageHref
          ? <CardMedia
            className={classes.media}
            image={imageHref}
          />
          : null
      }
      <CardContent className={classes.content}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant='h4'
              style={{
                fontSize: '23px'
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption'>
              {date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body2'
              style={{
                opacity: 0.8
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Button className={classes.button} href={to}>
              <Typography variant='button'>
                Read more
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ArticleCard
