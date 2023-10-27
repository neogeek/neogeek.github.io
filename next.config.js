/** @type {import('next').NextConfig} */

import nextMdx from '@next/mdx';

import remarkGfx from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfx],
    rehypePlugins: [rehypeSlug],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
