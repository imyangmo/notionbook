import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import netlify from '@astrojs/netlify/functions';
// import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: 'https://nb.dreambulare.com',
  // integrations: [mdx(), sitemap()] 
  integrations: [mdx(), sitemap(), partytown({
    // Example: Disable debug mode.
    config: {
      debug: false
    }
  })],
  output: "server",
  adapter: netlify(),
  headers: {
    'Cache-Control': 'private,max-age=60,immutable'
  }
});