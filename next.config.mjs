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
        {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dp3h9gw5l/image/upload/**',
        },
        {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
            pathname: '/u/**'
        }
    ],
  },
};

export default nextConfig;
