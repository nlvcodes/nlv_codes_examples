import { withPayload } from '@payloadcms/next/withPayload'

const urls = [new URL('https://pub-33721712bbd6434fb0d420a753141a55.r2.dev/**')]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  images: {
    remotePatterns: urls,
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
