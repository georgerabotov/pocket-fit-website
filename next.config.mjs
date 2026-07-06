/** @type {import('next').NextConfig} */
const nextConfig = {
  // Off so dev matches production: StrictMode's dev-only double-mount makes the
  // R3F canvases (pricing lanyard, etc.) visibly tear down and re-reveal. Prod
  // never double-mounts, so this only removes a misleading local flicker.
  reactStrictMode: false,
};

export default nextConfig;
