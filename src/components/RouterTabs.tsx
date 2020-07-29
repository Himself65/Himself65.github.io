import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { navigate } from 'gatsby'
import React, { useState } from 'react'

import { SiteSiteMetadataMenuLinks } from '~types'

const RouterTabs: React.FC<{
  routers: Pick<SiteSiteMetadataMenuLinks, 'name' | 'link' | 'icon'>[]
  currentPage: string
}> = ({ routers = [], currentPage }) => {
  const [index] = useState(
    routers.findIndex(v => v.link === currentPage))
  return (
    <Tabs
      value={index}
      onChange={(_, value) => navigate(routers[value].link as string)}
    >
      {routers.map(router => {
        return (
          <Tab
            label={router.name}
            key={router.link as string}/>
        )
      })}
    </Tabs>
  )
}

export default RouterTabs
