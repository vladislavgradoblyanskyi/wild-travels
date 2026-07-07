import css from './authFooter.module.css';

export default function AuthFooter() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <p className={css.pFooter}>&copy; 2025 Природні Мандри</p>
      </div>
    </footer>
  );
}
