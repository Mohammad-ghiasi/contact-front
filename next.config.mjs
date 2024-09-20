import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",

  // register: true,
  // skipWaiting: true,


  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions:{
    disableDevLogs: true
  }
});

export default withPWA({
  // Your Next.js config
});