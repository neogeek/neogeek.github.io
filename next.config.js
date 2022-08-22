/** @type {import('next').NextConfig} */

import nextMdx from '@next/mdx';

import remarkGfx from 'remark-gfm';
import rehypeAccessibleEmojis from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfx],
    rehypePlugins: [rehypeAccessibleEmojis, rehypeSlug],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
