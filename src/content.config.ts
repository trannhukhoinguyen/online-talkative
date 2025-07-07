import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const characters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/characters" }),
  schema: z.object({
    name: z.string(),
    stage_name: z.string(),
    field: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const conversations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/conversations" }),
  schema: z.object({
    name: z.string(),
    topic: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    sentences: z.array(z.string()),
    character: reference('characters'),
  }),
});

// Export all collections
export const collections = {characters, conversations};
