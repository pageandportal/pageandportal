import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const roadmapItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['planned', 'in-progress', 'ready', 'shipped']).optional(),
});

const roadmapLaneSchema = z.object({
  id: z.enum(['now', 'next', 'later']),
  label: z.string().optional(),
  items: z.array(roadmapItemSchema),
});

const linkSchema = z.object({
  label: z.string(),
  url: z.string().optional(),
});

const legalPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
});

export const legalCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/legal' }),
  schema: z.object({
    app: z.string(),
    title: z.string(),
  }),
});

export const appsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    tagline: z.string(),
    status: z.enum(['coming-soon', 'beta', 'live']),
    description: z.string(),
    accentColor: z.string().optional(),
    accentColorSecondary: z.string().optional(),
    icon: z.string().optional(),
    wordmark: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    links: z.array(linkSchema).default([]),
    donateUseGlobal: z.boolean().default(true),
    donateUrl: z.string().optional(),
    donateLabel: z.string().optional(),
    features: z.array(featureSchema).default([]),
    roadmap: z.array(roadmapLaneSchema).default([]),
    legalPages: z.array(legalPageSchema).default([]),
    disclaimer: z.string().optional(),
    supportEmail: z.string().email().optional(),
  }),
});

export const collections = {
  apps: appsCollection,
  legal: legalCollection,
};
