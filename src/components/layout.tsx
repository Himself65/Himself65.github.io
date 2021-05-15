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

declare module '@material-ui/core' {
  interface Theme {
    status: {
      danger: string
    }
  }

  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

const DefaultIntroduction: React.FC = () => (
  <Typography
    variant='caption'
  >
    These articles are licensed under a{' '}
    <a
      rel='license'
      href='http://creativecommons.org/licenses/by-sa/4.0/'
    >
      Creative Commons Attribution-ShareAlike 4.0 International
      License
    </a>
  </Typography>
)

const Header: React.FC<{ to?: string; title?: string }> = ({ to, title }) => (
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
      to={to || '/'}
    >
      {title}
    </Link>
  </Typography>
)

const Footer: React.FC<{ brief: boolean }> = ({ brief }) => {
  const buildTime = useStaticQuery(graphql`
      query LayoutQuery {
          site {
              buildTime
          }
      }
  `).site.buildTime

  return (
    <footer style={{ marginTop: '2rem' }}>
      <Typography variant='caption'>
        © {new Date().getFullYear()}, Built {' '}
        on {moment(buildTime).local().format('LLLL')}{' '}
        using <a href='https://www.gatsbyjs.org'>Gatsby</a>
      </Typography>
      <br />
      {brief
        ? null
        : <DefaultIntroduction />
      }
    </footer>
  )
}

const Layout: React.FC<{
  title?: string | null
  brief?: boolean
  to?: string
}> = props => {
  const { title = 'UNKNOWN', brief = false, children } = props
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const themeSubject = useMemo(() => new Subject<'light' | 'dark'>(), [])
  const themeConfig = useMemo(() => createMuiTheme({
    status: {
      danger: ''
    },
    palette: {
      background: {
        default: theme === 'light' ? '#f9fafb' : '#363c48',
        paper: theme === 'light' ? '#ffffff' : '#282c35'
      },
      mode: theme || 'light'
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
      const [moonImage, sunImage] = await Promise.all([
        requireContext('./moon.png'),
        requireContext('./sun.png')
      ])
      setMoon(moonImage)
      setSun(sunImage)
    }
    asyncImport().then()
  }, [])

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
        >
          <script data-ad-client='ca-pub-9648629100084933' async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'/>
          <script>
            {'(function(w,d, s, id) {if(typeof(w.webpushr)!==\'undefined\') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";fjs.parentNode.appendChild(js);}(window,document, \'script\', \'webpushr-jssdk\'));webpushr(\'setup\',{\'key\':\'BBwI_4scackYl7TwZKw4IPx3aVZXIy3g1XG6fmjG-0TkIvUv9qpwTNgzuCpUzJTayWhSgzgsDRDNQ8NyKiVVjgQ\' });'}
          </script>
        </Helmet>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2.625rem',
            marginBottom: '2.625rem'
          }}
        >
          <Header to={props.to} title={title ?? 'UNKNOWN'} />
          <Toggle
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
        </header>
        <main>{children}</main>
        <Footer brief={brief} />
      </div>
    </ThemeProvider>
  )
}

export default Layout
