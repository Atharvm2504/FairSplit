import { Totals } from '@/app/groups/[groupId]/stats/totals'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslations } from 'next-intl'

export function TotalsPageClient() {
  const t = useTranslations('Stats')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">{t('Totals.title')}</CardTitle>
        <CardDescription className="text-gray-600">{t('Totals.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <Totals />
      </CardContent>
    </Card>
  )
}
