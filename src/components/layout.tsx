import React, { useEffect, useMemo, useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { Subject } from 'rxjs'

import Toggle from './Toggle'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'
import { rhythm } from '../utils/typography'
import moment from 'moment'
import NeverUseZhihu from './NeverUseZhihu'

const defaultTheme = createMuiTheme({})

const Layout: React.FC<{
  title: string | null | undefined
}> = props => {
  const { title = 'UNKNOWN', children } = props
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null)
  const themeSubject = useMemo(() => new Subject<'light' | 'dark'>(), [])
  const themeConfig = useMemo(() => createMuiTheme({
    ...defaultTheme,
    palette: {
      // todo
      ...defaultTheme.palette,
      type: theme || 'light'
    }
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
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        buildTime
      }
    }
  `)

  const header = (
    <h3
      style={{
        fontFamily: 'Montserrat, sans-serif',
        marginTop: 0
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit'
        }}
        to={'/'}
      >
        {title}
      </Link>
    </h3>
  )
  return (
    <ThemeProvider theme={themeConfig}>
      <NeverUseZhihu/>
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
            marginBottom: '2.625rem'
          }}
        >
          {header}
          {theme != null ? (
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    width='16'
                    height='16'
                    role='presentation'
                    style={{ pointerEvents: 'none' }}
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    width='16'
                    height='16'
                    role='presentation'
                    style={{ pointerEvents: 'none' }}
                  />
                )
              }}
              checked={theme === 'dark'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                themeSubject.next(e.target.checked ? 'dark' : 'light')
              }
            />
          ) : (
            <div style={{ height: '24px' }}/>
          )}
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built {' '}
          on {moment(data.site.buildTime).local().format('YYYY D Mo, H:m')}{' '}
          with <a href='https://www.gatsbyjs.org'>Gatsby</a>
          <br/>
          <span style={{ color: '#999', fontSize: '0.8rem' }}>
            These articles are licensed under a{' '}
            <a
              rel='license'
              style={{ color: '#0084b5' }}
              href='http://creativecommons.org/licenses/by-sa/4.0/'
            >
              Creative Commons Attribution-ShareAlike 4.0 International License
            </a>
          </span>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
