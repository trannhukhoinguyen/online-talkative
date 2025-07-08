// @ts-check
import { defineConfig } from 'astro/config';
import { rehypeHeadingIds }  from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  server: {
    port: 4322,
  },
  prefetch: true,
  site: 'https://online-talkative.vercel.app/',
  integrations: [
    sitemap()
  ],
  markdown: {
    rehypePlugins: [
      'rehype-autolink-headings',
      rehypeHeadingIds
    ],
  },
});
