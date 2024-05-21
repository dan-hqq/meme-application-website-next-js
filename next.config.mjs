/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dp3h9gw5l/image/upload/**',
        },
    ],
  },
};

export default nextConfig;
