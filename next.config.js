/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {

}
module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['localhost', 'dev-fwv.pantheonsite.io', 'placecats.com']
    }
    /* sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }, */
  }

