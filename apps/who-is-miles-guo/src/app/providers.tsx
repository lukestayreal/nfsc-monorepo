'use client'

import { createContext, useEffect, useRef } from 'react'
import { ThemeProvider } from 'next-themes'
import { usePathname } from '@/i18n/navigation'

function usePrevious<T>(value: T) {
  const ref = useRef<T>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider enableSystem={false} attribute="class">
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
