import Link from 'next/link';

import styles from './BackLink.module.scss';

export default function BackLink({
  href = '/',
  label = 'Back to Home',
}: {
  href?: string;
  label?: string;
}) {
  return (
    <div>
      <Link href={href} className={styles.BackLinkAnchor}>
        {label}
      </Link>
    </div>
  );
}
