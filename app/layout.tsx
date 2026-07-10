import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import AppLayout from '@/components/layout/AppLayout/AppLayout';
import AuthProvider from '@/components/providers/AuthProvider';
import ToasterProvider from '@/components/providers/ToasterProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Toaster } from "react-hot-toast";
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: {
    template: '%s | Природні Мандри',
    default: 'Природні Мандри',
  },
  description:
    'Приєднуйтесь до спільноти мандрівників "Природні Мандри". Увійдіть або зареєструйтесь, щоб ділитися своїми історіями.',
  openGraph: {
    title: 'Природні Мандри — Головна сторінка',
    description:
      'Мінімалістичний інтерфейс для входу та реєстрації у спільноті мандрівників.',
    type: 'website',
    images: [
      {
        url: '/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні Мандри Головна сторінка',
      },
    ],
  },
};

export const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${montserrat.className} green-bg`}>
        <ThemeProvider>
          <QueryProvider>
            <ToasterProvider />
            <AppLayout>
              <AuthProvider>
                {children}</AuthProvider>
               <Toaster position="top-right" />
            </AppLayout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
