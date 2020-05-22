require('dotenv').config()
const friendship = require('./friendship')

module.exports = {
  siteMetadata: {
    title: 'Himself65 Blog',
    author: 'Himself65',
    description: 'Studying, Gaming, and Coding',
    siteUrl: 'https://himself65.com/',
    social: {
      twitter: 'himself_65',
      github: 'himself65'
    },
    menuLinks: [
      {
        name: 'Home',
        link: '/',
        icon: 'Home'
      },
      {
        name: 'About',
        link: '/about',
        icon: 'Group'
      },
      {
        name: 'GK',
        link: '/gk',
        icon: 'Favourite'
      },
      {
        name: 'Tags',
        link: '/tags',
        icon: 'LocalOffer'
      }
    ],
    friendship: [...friendship],
    gks: [
      {
        image: '1.png',
        name: '少女前线 索米 KP-31 泳衣Ver.',
        state: '已购买',
        price: 269,
        links: [
          {
            name: '会员购',
            url: 'https://mall.bilibili.com/detail.html?itemsVersion=2&shopId=2233&loadingShow=1&noTitleBar=1#itemsId=10006157'
          }
        ]
      },
      {
        image: '2.png',
        name: '尼尔：机械纪元 尤尔哈二号B型',
        state: '已购买',
        price: 1769,
        links: [
          {
            name: '会员购',
            url: 'https://mall.bilibili.com/detail.html?itemsVersion=4&shopId=2233&loadingShow=1&noTitleBar=1#itemsId=10004907'
          }
        ]
      },
      {
        image: '3.png',
        name: '阿尔托莉雅 2.0 figma',
        state: '已购买',
        price: 399,
        links: [
          {
            name: '会员购',
            url: 'https://mall.bilibili.com/detail.html?itemsVersion=4&shopId=2233&loadingShow=1&noTitleBar=1#itemsId=10007844'
          }
        ]
      },
      {
        image: '4.png',
        name: 'DARLING in the FRANXX 莓',
        state: '已预定',
        price: 667,
        links: [
          {
            name: '会员购',
            url: 'https://mall.bilibili.com/detail.html?itemsVersion=6&shopId=2233&loadingShow=1&noTitleBar=1#itemsId=10005096'
          }
        ]
      },
      {
        image: '5.png',
        name: '初音未来 公式服',
        state: '已预定',
        price: 599,
        links: [
          {
            name: '会员购',
            url: 'https://mall.bilibili.com/detail.html?itemsVersion=5&shopId=2233&loadingShow=1&noTitleBar=1#itemsId=10018370'
          }
        ]
      }
    ]
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
        path: `${__dirname}/content/blog`,
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/doc`,
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
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
