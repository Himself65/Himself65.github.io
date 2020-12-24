import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  Typography
} from '@material-ui/core'
import { graphql, Link, useStaticQuery } from 'gatsby'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Subject } from 'rxjs'

import typography, { rhythm } from '../utils/typography'
import Toggle from './Toggle'

const Layout: React.FC<{
  title: string | null | undefined
  brief?: boolean
  to?: string
}> = props => {
  const { title = 'UNKNOWN', children, brief } = props
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null)
  const themeSubject = useMemo(() => new Subject<'light' | 'dark'>(), [])
  const themeConfig = useMemo(() => createMuiTheme({
    palette: {
      background: {
        default: theme === 'light' ? '#f9fafb' : '#363c48',
        paper: theme === 'light' ? '#ffffff' : '#282c35'
      },
      type: theme || 'light'
    },
    typography
  }), [theme])
  useEffect(() => {
    setTheme(
      document.body.className = window.localStorage.getItem(
        'theme') as 'dark' | 'light' | null || 'light')
    themeSubject.subscribe(themeKey => {
      try {
        window.localStorage.setItem('theme', themeKey)
      } catch (err) {} finally {
        document.body.className = themeKey
        setTheme(themeKey)
      }
    })
  }, [])
  const [moon, setMoon] = useState('')
  const [sun, setSun] = useState('')
  useEffect(() => {
    const requireContext = require.context('../assets', false, /.png/, 'lazy')
    const asyncImport = async () => {
      const moonImage = await requireContext('./moon.png')
      const sunImage = await requireContext('./sun.png')
      setMoon(moonImage)
      setSun(sunImage)
    }
    asyncImport().then()
  }, [])
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        buildTime
      }
    }
  `)

  const header = (
    <Typography
      variant='h4'
      style={{
        fontFamily: 'Montserrat, sans-serif',
        marginTop: 'auto',
        marginBottom: 'auto'
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit'
        }}
        to={props.to || '/'}
      >
        {title}
      </Link>
    </Typography>
  )
  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          // transition: 'color 0.2s ease-out, background 0.2s ease-out',
          // minHeight: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: theme === 'light' ? '#ffa8c5' : '#282c35'
            }
          ]}
        />
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2.625rem',
            marginBottom: '2.625rem'
          }}
        >
          {header}
          {theme != null
            // eslint-disable-next-line multiline-ternary
            ? (<Toggle
                icons={{
                  checked: (
                    <img
                      src={moon}
                      width='16'
                      height='16'
                      role='presentation'
                      style={{ pointerEvents: 'none' }}
                      alt='moon' />
                  ),
                  unchecked: (
                    <img
                      src={sun}
                      width='16'
                      height='16'
                      role='presentation'
                      style={{ pointerEvents: 'none' }}
                      alt='sun'
                    />
                  )
                }}
                checked={theme === 'dark'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  themeSubject.next(e.target.checked ? 'dark' : 'light')
                }
              />
              ) : (
              <div style={{ height: '24px' }} />
              )}
        </header>
        <main>{children}</main>
        <footer style={{ marginTop: '2rem' }}>
          <Typography variant='caption'>
            © {new Date().getFullYear()}, Built {' '}
            on {moment(data.site.buildTime).local().format('LLLL')}{' '}
            using <Link to='https://www.gatsbyjs.org'>Gatsby</Link>
          </Typography>
          <br />
          {brief
            ? null
            : (
              <Typography
                variant='caption'
              >
                These articles are licensed under a{' '}
                <Link
                  rel='license'
                  to='http://creativecommons.org/licenses/by-sa/4.0/'
                >
                  Creative Commons Attribution-ShareAlike 4.0 International
                  License
                </Link>
              </Typography>
              )
          }
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
