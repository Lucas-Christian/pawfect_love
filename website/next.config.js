/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY
  }
}

module.exports = nextConfig
