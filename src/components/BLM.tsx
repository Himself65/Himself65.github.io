import { Link, SnackbarContent } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  // todo: font-family
  blm: {
    background: '#000',
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '.7rem'
  },
  blmAction: {
    marginLeft: '0',
    paddingLeft: '0'
  }
})

const BLM = () => {
  const classes = useStyle()
  return (
    <SnackbarContent
      classes={{
        root: classes.blm,
        action: classes.blmAction
      }}
      message=''
      action={
        <Link
          style={{ color: '#fff' }}
          href='https://nodejs.org/en/black-lives-matter/'
          target='_blank'
          rel='noopener noreferrer'
        >
          #BlackLivesMatter
        </Link>
      }/>
  )
}

export default BLM
