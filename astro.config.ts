// @ts-check
import { defineConfig } from 'astro/config';
import { rehypeHeadingIds }  from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  prefetch: true,
  site: 'https://online-talkative.vercel.app/',
  integrations: [
    sitemap()
  ],
  experimental: {
    svg: true,
  },
  markdown: {
    rehypePlugins: [
      'rehype-autolink-headings',
      rehypeHeadingIds
    ],
  },
});
