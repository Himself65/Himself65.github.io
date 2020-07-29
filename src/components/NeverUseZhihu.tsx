import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import React, { useCallback, useEffect, useState } from 'react'

const NeverUseZhihu: React.FC = () => {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (!/zhihu.com/.test(document.referrer)) {
      setOpen(false)
    }
  }, [])
  const closeHandle = useCallback((_, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false)
    }
  }, [])
  return (
    <Snackbar
      open={open}
      onClose={closeHandle}
    >
      <Alert
        color='error'
        onClose={() => setOpen(false)}
      >
        我希望每个人都有一个自己的博客，而不是用知乎
      </Alert>
    </Snackbar>
  )
}

export default NeverUseZhihu
