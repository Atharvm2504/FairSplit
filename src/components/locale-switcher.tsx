'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Locale, localeLabels } from '@/i18n'
import { setUserLocale } from '@/lib/locale'
import { useLocale } from 'next-intl'

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/50">
          <span>{localeLabels[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-card">
        {Object.entries(localeLabels).map(([locale, label]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => setUserLocale(locale as Locale)}
            className="hover:bg-indigo-50"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
