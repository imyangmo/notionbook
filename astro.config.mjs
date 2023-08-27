import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";
const {
  RUNTIME
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import node from '@astrojs/node';
import vercel from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify/functions";

const errMsg = '[NOTIONBOOK] ENV variable "RUNTIME" error, accepted: "vercel", "netlify", "node"'

let ada;
if (RUNTIME === 'vercel') {
  ada = vercel({
    analytics: true
  });
} else if (RUNTIME === 'node') {
  ada = node({
    mode: 'standalone'
  });
} else if (RUNTIME === 'netlify') {
  ada = netlify()
} else {
  throw new Error(errMsg);
}

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
  adapter: ada,
  headers: {
    'Cache-Control': 'private,max-age=60,immutable'
  }
});