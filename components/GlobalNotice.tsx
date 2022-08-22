import styles from './GlobalNotice.module.scss';

export default function GlobalNotice({ content }: { content: string }) {
  return (
    <div className={styles.GlobalNoticeWrapper}>
      <p className={styles.GlobalNoticeContent}>
        <b>Notice:</b> {content}
      </p>
    </div>
  );
}
