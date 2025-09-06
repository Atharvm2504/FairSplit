'use client'

import { GroupTabs } from '@/app/groups/[groupId]/group-tabs'
import { ShareButton } from '@/app/groups/[groupId]/share-button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useCurrentGroup } from './current-group-context'

export const GroupHeader = () => {
  const { isLoading, groupId, group } = useCurrentGroup()

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link href={`/groups/${groupId}`} className="hover:text-indigo-600 transition-colors">
                {isLoading ? (
                  <Skeleton className="h-8 w-48" />
                ) : (
                  group.name
                )}
              </Link>
            </h1>
            {group && <ShareButton group={group} />}
          </div>

          <GroupTabs groupId={groupId} />
        </div>
      </CardContent>
    </Card>
  )
}
