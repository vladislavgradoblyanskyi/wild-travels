import Image from 'next/image';

import styles from './TravellerStoriesList.module.css';
import { Story } from '@/types/story';
interface Props {
  stories: Story[];
}

export default function TravellerStoriesList({stories}: Props) {
  console.log(stories);
  
  return (
    <div className={styles.travellerInfo}>
      <ul>
        {stories.map((story:Story) => (
          <li key={story._id}> 
            <h2>{story.title}</h2>
            <p>Автор:{' '}{typeof story.ownerId === 'object' && story.ownerId?.name? story.ownerId.name : 'Ви'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



