// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  prefetch: true,
  site: 'https://talkative.vercel.app/',
  integrations: [sitemap()],
  experimental: {
    svg: true,
  },
});
