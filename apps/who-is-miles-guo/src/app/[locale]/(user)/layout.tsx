import type { Metadata } from 'next';

import Navbar from '@/components/navbar';
import Container from '@/components/container';
import { GradientBackground } from '@/components/gradient';

import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'My - Blog',
  description:
    'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
};
export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <>
      <GradientBackground />
      <Container>
        <Navbar locale={locale} />
      </Container>
      {children}
      <Footer />
    </>
  );
}
