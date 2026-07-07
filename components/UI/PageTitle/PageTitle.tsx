import css from "./PageTitle.module.css";

type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return <h1 className={css.title}>{title}</h1>;
}