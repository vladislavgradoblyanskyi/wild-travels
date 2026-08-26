import TravellerPublicProfile from '@/components/TravellerPage/TravellerPublicProfile/TravellerPublicProfile';
import { Metadata } from 'next';
import ProfileTabs from '@/components/ProfilePage/ProfileTabs/ProfileTabs';
import { GetMeServer, GetOwnStoriesServer } from '@/lib/api/serverApi';
export async function generateMetadata(): Promise<Metadata> {
  const user = await GetMeServer();

  const title = `${user.name} | Мій профіль | Природні Мандри`;

  const description =
    'Керуйте своїм профілем, редагуйте особисту інформацію, переглядайте власні історії та налаштовуйте обліковий запис Природні Мандри.';

  const image =
    user.avatarUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.jpg`;

  return {
    title,
    description,

    applicationName: 'Природні Мандри',

    authors: [
      {
        name: user.name,
      },
    ],

    creator: user.name,

    publisher: 'Природні Мандри',

    alternates: {
      canonical: '/profile',
    },

    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    openGraph: {
      title,
      description,
      url: '/profile',
      siteName: 'Природні Мандри',
      locale: 'uk_UA',
      type: 'profile',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${user.name} | Природні Мандри`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function Profile() {
  const [user, ownStories] = await Promise.all([
    GetMeServer(),
    GetOwnStoriesServer(),
  ]);

  return (
    <>
      <TravellerPublicProfile
        totalArticles={ownStories.totalItems}
        traveller={{
          ...user,
          articlesAmount: ownStories.totalItems,
        }}
      />
      <ProfileTabs />
    </>
  );
}
