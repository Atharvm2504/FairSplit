'use client'
import { cn, formatCurrency } from '@/lib/utils'
import { useLocale } from 'next-intl'

type Props = {
  currency: string
  amount: number
  bold?: boolean
  colored?: boolean
}

export function Money({
  currency,
  amount,
  bold = false,
  colored = false,
}: Props) {
  const locale = useLocale()
  return (
    <span
      className={cn(
        'font-medium',
        colored && amount <= 1
          ? 'text-red-600 dark:text-red-400'
          : colored && amount >= 1
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-gray-900 dark:text-gray-100',
        bold && 'font-bold',
      )}
    >
      {formatCurrency(currency, amount, locale)}
    </span>
  )
}
