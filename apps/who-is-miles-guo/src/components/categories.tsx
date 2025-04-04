import { getCategories } from '@/sanity/queries'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Button } from './button'
import { RssIcon } from 'lucide-react'
import Link from 'next/link'
import { LocaleEnum } from '../../constants/app.constants'

export default async function Categories({
  locale,
  currentCategory,
  noFeed,
}: {
  locale: LocaleEnum
  currentCategory?: string
  noFeed?: boolean
}) {
  const categories = await getCategories(locale)
  if (categories?.length === 0) {
    return
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 rounded-md border p-2 font-medium duration-300 hover:border-black">
          {currentCategory ? currentCategory : 'All Categories'}{' '}
          <ChevronUpDownIcon className="size-4 text-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href={`${locale}/`}
              className="grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
            >
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category?.slug}>
              <Link
                href={`/${locale}/category/${category?.slug}`}
                className="grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 capitalize data-focus:bg-gray-950/5"
              >
                <p className="col-start-2 text-sm/6">{category?.title}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      {!noFeed && (
        <Button variant="secondary" className="gap-1">
          <RssIcon className="size-4" /> RSS Feed
        </Button>
      )}
    </div>
  )
}
