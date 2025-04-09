'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { CATEGORIES_QUERYResult } from '@/sanity/types'
import { Link } from '@/i18n/navigation'
import { FeatureFlags } from '@/constant'
import { useTranslations } from 'next-intl'

export function CategoryNavigationMenu({
  categories,
}: {
  categories: CATEGORIES_QUERYResult
}) {
  const t = useTranslations('category')

  if (categories?.length === 0) return

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {FeatureFlags.showUnfinishedUI && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="h-6 w-6" />
                      <div className="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('allCategories')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[270px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories?.map((category) => (
                <ListItem
                  key={category?.slug}
                  title={category?.title ? category?.title : ''}
                  href={`/category/${category?.slug}`}
                >
                  {category.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {FeatureFlags.showUnfinishedUI && false && (
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ComponentRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href ? props.href : ''}
          ref={ref}
          className={cn(
            'my-1 block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
