import React from 'react'
import Layout from '../components/layout'

interface DocPageProps {
  pageContext: {
    title: string
    docHTML: string
  }
  location?: string
}

const DocPage: React.FC<DocPageProps> = ({ pageContext: { docHTML, title } }) => {
  return (
    <Layout title={title.toUpperCase()}>
      <section dangerouslySetInnerHTML={{ __html: docHTML }}/>
    </Layout>
  )
}

export default DocPage
