import Head from 'next/head';

import styles from './Header.module.scss';

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {subtitle && <meta name='description' content={subtitle} />}

        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />

        {subtitle && <meta name='twitter:description' content={subtitle} />}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='neogeek' />
        <meta name='twitter:creator' content='neogeek' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:domain' content='https://neogeek.dev' />
        <meta name='twitter:image:src' content='https://neogeek.dev/logo.png' />
      </Head>

      <header className={styles.Header}>
        <h1 className={styles.HeaderTitle}>{title}</h1>
        {subtitle && <p className={styles.HeaderSubtitle}>{subtitle}</p>}
      </header>
    </>
  );
}
