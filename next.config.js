/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    contentstackApiKey: process.env.CONTENTSTACK_STACK_API_KEY,
    contentstackDeliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    contentstackEnvironment: process.env.CONTENTSTACK_ENVIRONMENT,
  },
  publicRuntimeConfig: {
    gtmId: process.env.GTM_ID ?? "",
  },
};

module.exports = nextConfig;
