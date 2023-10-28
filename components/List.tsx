import Link from 'next/link';

export default function List({ children }: { children: any }) {
  return <ol>{children}</ol>;
}

export function ListItem({
  href,
  title,
  date,
}: {
  href: string;
  title: string;
  date?: string;
}) {
  return (
    <li>
      <Link href={href}>
        <>
          {title}
          {date && (
            <>
              - <time>{date}</time>
            </>
          )}
        </>
      </Link>
    </li>
  );
}
