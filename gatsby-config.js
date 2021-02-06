require('dotenv').config()
const path = require('path')
const friendship = require('./friendship')

module.exports = {
  siteMetadata: {
    title: 'Himself65 (@himself65)',
    author: 'Himself65',
    description: 'Personal blog by Himself65, about coding and life.',
    siteUrl: 'https://himself65.com/',
    social: {
      twitter: 'himself_65',
      github: 'himself65',
      instagram: 'himself_65'
    },
    friendship: [...friendship]
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'React',
        allExtensions: true
      }
    },
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.ts',
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './node_modules/gatsby-*/**/*.js'
        ],
        codegenDelay: 200
      }
    },
    {
      resolve: 'gatsby-remark-prismjs',
      options: {
        classPrefix: 'language-',
        inlineCodeMarker: null,
        showLineNumbers: false,
        noInlineHighlight: false,
        languageExtensions: [
          {
            language: 'superscript',
            extend: 'javascript',
            definition: {
              superscript_types: /(SuperType)/
            },
            insertBefore: {
              function: {
                superscript_keywords: /(superif|superelse)/
              }
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, 'content', 'blog'),
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, 'content', 'assets'),
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(__dirname, 'doc'),
        name: 'doc'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            options: {
              background: '#000'
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-110549153-1'
      }
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Himself65 Blog',
        short_name: 'Himself65',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/himself65.jpg'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-graphql-config'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
