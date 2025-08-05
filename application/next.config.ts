import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

// Generate a revision for cache busting
const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: [
    { url: "/", revision }, // Precache the root page
    { url: "/offline", revision }, // Precache the offline fallback page
  ],
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwist(nextConfig);
