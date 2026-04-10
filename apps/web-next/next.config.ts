import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@gmf/map-core', '@gmf/map-data', '@gmf/map-ui', '@gmf/map-sw']
};

export default nextConfig;
