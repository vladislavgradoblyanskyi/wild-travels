import Link from "next/link";
import Image from "next/image";

import PageTitle from "../../UI/PageTitle/PageTitle";

import type { Story } from "../../../types/story";

import css from "./StoryDetails.module.css";

type Props = {
  story: Story;
};

export default function StoryDetails({ story }: Props) {
  return (
    <article>
      <Link href="/stories" className={css.backLink}>
        <svg width="24" height="24">
          <use href="/Icons/icons.svg#icon-arrow_back" />
        </svg>
        <span>Всі статті</span>
      </Link>

      <PageTitle title={story.title} />

      <ul className={css.meta}>
        <li>
          <span>Автор:</span> {story.author.name}
        </li>
        <li>
          <span>Опубліковано:</span> {story.date}
        </li>
        <li>
          <span>Категорія:</span> {story.category}
        </li>
      </ul>

      <Image
        src={story.img}
        alt={story.title}
        width={700}
        height={500}
        className={css.image}
      />

      <p className={css.article}>
        {story.article}
      </p>
    </article>
  );
}