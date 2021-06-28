const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite to prevent a problem when deploying at vercel
        // which directs a user to the index.xml instead of index.html
        // https://github.com/timlrx/tailwind-nextjs-starter-blog/issues/16
        {
          source: '/',
          destination: '/index',
        },
      ],
    }
  },
})
