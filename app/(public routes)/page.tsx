import Hero from '../../components/HomePage/Hero/hero';
import About from '../../components/HomePage/About/about';
import Join from '@/components/HomePage/Join/join';

export const generateMetadata = async () => ({
  metadataBase: new URL('http://localhost:3000'),
  title: 'Еко-мандри Україною',
  description: 'Відкрий Україну заново — еко-мандри для натхнення',
  openGraph: {
    title: 'Еко-мандри Україною',
    description: 'Подорожуй екологічно та відкривай красу України',
    images: ['/Image/hero-desk.jpg'],
  },
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Join />
    </>
  );
}
