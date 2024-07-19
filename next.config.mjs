/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KEY: process.env.KEY,
    CX: process.env.CX
  }
};

export default nextConfig;
