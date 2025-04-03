import Navbar from '@/components/navbar';
import Container from '@/components/container';
import { GradientBackground } from '@/components/gradient';

import Footer from '@/components/footer';

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
