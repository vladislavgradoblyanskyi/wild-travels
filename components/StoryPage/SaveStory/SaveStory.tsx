import css from './SaveStory.module.css';

type Props = {
  isSaved: boolean;
  isLoading: boolean;
  onSave: () => void;
};

export default function SaveStory({
  isSaved,
  isLoading,
  onSave,
}: Props) {
  return (
    <section className={css.section}>
      <h2 className={css.title}>Збережіть собі історію</h2>

      <p className={css.description}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button
        type="button"
        className={css.button}
        onClick={onSave}
        disabled={isLoading}
      >
        {isLoading
          ? 'Завантаження...'
          : isSaved
            ? 'Видалити зі збережених'
            : 'Зберегти'}
      </button>
    </section>
  );
}
