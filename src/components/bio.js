/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, Link, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import React from 'react'

import { rhythm } from '../utils/typography'

const Bio = ({ children = null }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%'
        }}
        imgStyle={{
          borderRadius: '50%'
        }}
      />
      {children ||
      <p>
        Written by <Link to='/me'><strong>{author}</strong></Link>, node.js and hexo.js collaborator,
        iowa state university undergraduate, forces on Open Source.
        {' '}
        <br/>
        <span>You can follow him on </span>
        <a target='_blank' rel='noopener noreferrer'
          href={`https://twitter.com/${social.twitter}`}>
          Twitter
        </a>
        <br/>
        <span> Or </span>
        <a target='_blank' rel='noopener noreferrer'
          href={`https://github.com/${social.github}`}>
          Github
        </a>
      </p>}
    </div>
  )
}

export default Bio
