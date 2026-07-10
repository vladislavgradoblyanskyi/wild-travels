import styles from './Loader.module.css';

export default function LoaderComponent() {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.sun} />
        <div className={styles.ring} />
        <div className={styles.mountains}>
          <span className={styles.mountainBack} />
          <span className={styles.mountainFront} />
        </div>
      </div>

      <p className={styles.text}>Завантажуємо історії природи...</p>
    </div>
  );
}
