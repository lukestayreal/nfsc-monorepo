import '../globals.css'
import 'easymde/dist/easymde.min.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
