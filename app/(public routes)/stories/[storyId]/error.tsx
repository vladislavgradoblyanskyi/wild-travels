'use client';

import css from "./page.module.css"

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className={css.containerError}>
      <h1 className={css.titleError}>Сталася помилка</h1>
      <button onClick={reset}>Спробувати ще раз</button>
    </div>
  );
}