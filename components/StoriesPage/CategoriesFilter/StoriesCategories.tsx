import type { ChangeEvent } from 'react';
import type { StoryCategory } from '@/types/story';
import styles from './StoriesCategories.module.css';

type Props = {
  categories: StoryCategory[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
};

const displayNameMap: Record<string, string> = {
  'Традиції та культура': 'Культура та традиції',
  'Еко-ферми та гастротури': 'Локальні продукти',
  'Національні парки': 'Природа та заповідники',
};

function getDisplayCategoryName(category: StoryCategory) {
  return displayNameMap[category.category] ?? category.category;
}

export default function StoriesCategories({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Категорії</h2>

      <div className={styles.selectWrap}>
        <select
          className={styles.select}
          value={activeCategory}
          onChange={handleSelectChange}
          aria-label="Фільтр категорій"
        >
          <option value="">Всі історії</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {getDisplayCategoryName(category)}
            </option>
          ))}
        </select>

        <svg className={styles.selectIcon} width="32" height="32" aria-hidden="true">
          <use href="/Icons/icons.svg#icon-arrow_down" />
        </svg>
      </div>

      <div className={styles.wrapper}>
        <button
          type="button"
          className={`${styles.category} ${activeCategory === '' ? styles.active : ''}`}
          onClick={() => onSelect('')}
        >
          Всі історії
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            className={`${styles.category} ${
              activeCategory === category._id ? styles.active : ''
            }`}
            onClick={() => onSelect(category._id)}
          >
            {getDisplayCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
