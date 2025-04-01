import '@/app/globals.css';
import 'easymde/dist/easymde.min.css';

export default async function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
