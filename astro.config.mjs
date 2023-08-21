import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vercel from "@astrojs/vercel/serverless";
// import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: 'https://nb.dreambulare.com',
  integrations: [mdx(), sitemap(), partytown({
    // Example: Disable debug mode.
    config: {
      debug: false
    }
  })],
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
  headers: {
    'Cache-Control': 'private,max-age=60,immutable'
  }
});