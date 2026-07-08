import Image from "next/image";
import Link from "next/link";

import sprite from "../../../images/sprite.svg";

import { PageTitle } from "../../UI/PageTitle/PageTitle";

import type { Story } from "../../../types/story";

import css from "./StoryDetails.module.css";

type Props = {
  story: Story;
};

export default function StoryDetails({ story }: Props) {
  return (
    <>
      <Link href="/stories" className={css.backLink}>
        <svg
          className={css.icon}
          width={24}
          height={24}
          aria-hidden="true"
        >
          <use href={`${sprite}#icon-arrow_back`} />
        </svg>

        <span>Всі статті</span>
      </Link>

      <article className={css.container}>
        <PageTitle>{story.title}</PageTitle>

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
          priority
        />

        <p className={css.article}>{story.article}</p>
      </article>
    </>
  );
}