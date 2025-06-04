'use client'

import { useTheme } from 'next-themes'
import Footer from './footer'
import { Header } from './header'

function Layout({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()

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
