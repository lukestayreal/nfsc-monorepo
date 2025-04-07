'use client'

import { useTheme } from 'next-themes'
import Footer from './footer'
import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()

  if (resolvedTheme === 'dark') setTheme('light')

  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  )
}
