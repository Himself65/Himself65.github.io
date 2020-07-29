import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'

import { GkPageQuery, SiteSiteMetadataMenuLinks } from '~types'

import GKCard, { GKState } from '../components/GKCard'
import Layout from '../components/layout'
import RouterTabs from '../components/RouterTabs'
import SEO from '../components/seo'

interface GKPageProps {
  data: GkPageQuery
}

const GKPage: React.FC<GKPageProps> = ({ data }) => {
  const { gkImages } = data
  const images = gkImages.edges.map(image => image.node)
  const gks: GKState[] = (data?.site?.siteMetadata?.gks ?? [])
    .map(gk => ({
      ...gk,
      image: images.find(
        image => image.relativePath.endsWith(gk?.image ?? '')
      )?.childImageSharp?.fluid as FluidObject
    }) as GKState)
  return (
    <Layout title={data.site?.siteMetadata?.title}>
      <SEO title='GK'/>
      <RouterTabs
        routers={
          (data.site?.siteMetadata?.menuLinks ?? []) as
            SiteSiteMetadataMenuLinks[]
        }
        currentPage='/gk'
      />
      {gks.reverse().map(gk => (
        <GKCard
          key={gk.name}
          state={gk}
          style={{
            marginBottom: '2rem'
          }}
        />
      ))}
    </Layout>
  )
}

export default GKPage

export const pageQuery = graphql`
  query GKPage {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
          icon
        }
        gks {
          image
          name
          state
          price
          links {
            name
            url
          }
        }
      }
    }
    gkImages: allFile(filter: {relativeDirectory: {eq: "gk"}}) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
