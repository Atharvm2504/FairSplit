'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useCurrentGroup } from '../current-group-context'

export default function GroupInformation({ groupId }: { groupId: string }) {
  const t = useTranslations('Information')
  const { isLoading, group } = useCurrentGroup()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">{t('title')}</CardTitle>
            <CardDescription className="text-gray-600">{t('description')}</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/groups/${groupId}/edit`} className="flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="prose prose-sm sm:prose-base max-w-full whitespace-break-spaces">
        {isLoading ? (
          <div className="py-1 flex flex-col gap-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ) : group.information ? (
          <p className="text-gray-900">{group.information}</p>
        ) : (
          <p className="text-gray-500 text-sm">{t('empty')}</p>
        )}
      </CardContent>
    </Card>
  )
}
