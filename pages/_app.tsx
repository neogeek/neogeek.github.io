import type { AppProps } from 'next/app';

import { MDXProvider } from '@mdx-js/react';

import CodeBlock from '../components/CodeBlock';
import ResponsiveImage from '../components/ResponsiveImage';

import '../styles/globals.scss';

const components = {
  img: ResponsiveImage,
  pre: CodeBlock,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
