/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [''],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            }]
    },

};

export default nextConfig;
