import Footer from './footer'
import { Header } from './header'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  )
}

Layout.theme = 'light'

export default Layout
