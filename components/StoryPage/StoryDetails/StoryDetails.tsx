import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "../../UI/Icon//Icon"
import { PageTitle } from '@/components/UI/PageTitle/PageTitle';
import type { Story } from '@/types/story';
import css from './StoryDetails.module.css';

type Props = {
  story: Story;
};

export default function StoryDetails({ story }: Props) {
  const authorName =
    story.author?.name ||
    (typeof story.ownerId === 'object' ? story.ownerId.name : '') ||
    'Автор невідомий';
  const categoryName =
    typeof story.category === 'object' ? story.category.category : story.category;

  return (
    <article className={css.article}>
      <div className={css.wrap}>
<div>
    <Link href="/stories" className={css.backLink}>
        <Icon
          className={css.iconLink}
          name="icon-chevron_left"
          width={24}
          height={24}
  />
        <span className={css.textLink}>Всі статті</span>
    </Link>
      <PageTitle className={css.title}>{story.title}</PageTitle>

      <ul className={css.meta}>
        <li className={css.metaRow}>
          <span className={css.metaLabel}>Автор статті</span>
          <span className={css.metaValue}>{authorName}</span>
        </li>
        <li className={css.metaRow}>
          <span className={css.metaLabel}>Опубліковано</span>
          <span className={css.metaValue}>{story.date}</span>
        </li>
         <div className={css.categoryBadge}>{categoryName}</div>
      </ul>

        </div>
          <div className={css.imageWrap}>
        <Image
          src={story.img}
          alt={story.title}
          width={755}
          height={503}
          className={css.image}
          priority
        />
      </div>
</div>
    <div className={css.content}>
  {(story.article ?? "")
    .split("\n")
    .filter(Boolean)
    .map((paragraph, index) => (
            <p key={`${story._id}-${index}`} className={css.paragraph}>
              {paragraph}
            </p>
          ))}
      </div>
    </article>
  );
}
