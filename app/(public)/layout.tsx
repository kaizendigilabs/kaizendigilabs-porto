import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/site-header';

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
