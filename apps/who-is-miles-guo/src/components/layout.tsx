import Footer from './footer'
import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  console.log('here????')
  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  )
}
