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
export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      {children}
      <Footer />
    </>
  );
}
