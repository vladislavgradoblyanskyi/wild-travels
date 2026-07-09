'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Сталася помилка</h2>
      <button onClick={reset}>Спробувати ще раз</button>
    </div>
  );
}