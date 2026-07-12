'use client';

import { Button } from '@/components/ui/buttons/btn';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function StoryError({ error, reset }: Props) {
  return (
    <div className="container">
      <p>Не вдалося завантажити статтю. {error.message}</p>
      <Button type="button" variant="secondary" onClick={reset}>
        Спробувати ще раз
      </Button>
    </div>
  );
}
