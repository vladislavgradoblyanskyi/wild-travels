import css from "./page.module.css"

export default function NotFound() {
  return (
    <div className={css.containerError}>
      <h1 className={css.titleError}>404 – Сторінку не знайдено</h1>
      <p className={css.descriptionError}>
        На жаль, сторінки, яку ви шукаєте, не існує.
      </p>
    </div>
  );
}