import { PageTitle } from "@/components/ui/PageTitle/PageTitle";
import {SaveButton} from "@/components/ui/SaveStoryButton/SaveStoryButton";
import css from "./SaveStory.module.css";

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
      <PageTitle tag="h2" className={css.title}>
        Збережіть собі історію
      </PageTitle>

      <p className={css.description}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <SaveButton
        isSaved={isSaved}
        isLoading={isLoading}
        onClick={onSave}
      />
    </section>
  );
}