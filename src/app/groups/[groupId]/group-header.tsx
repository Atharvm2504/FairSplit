'use client'

import { GroupTabs } from '@/app/groups/[groupId]/group-tabs'
import { ShareButton } from '@/app/groups/[groupId]/share-button'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useCurrentGroup } from './current-group-context'

export const GroupHeader = () => {
  const { isLoading, groupId, group } = useCurrentGroup()

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/10 dark:via-pink-950/10 dark:to-blue-950/10 rounded-3xl blur-3xl -z-10"></div>
      
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/20 dark:border-white/10 shadow-glass">
        <div className="flex flex-col gap-6">
          {/* Group Title Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-64 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800" />
                  <Skeleton className="h-4 w-32 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800" />
                </div>
              ) : (
                <Link 
                  href={`/groups/${groupId}`}
                  className="group block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-primary rounded-xl shadow-lg group-hover:shadow-purple-glow transition-all duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gradient-primary group-hover:scale-105 transition-transform duration-300">
                        {group.name}
                      </h1>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4" />
                        <span>Expense Group</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            
            {/* Share Button */}
            {group && (
              <div className="flex-shrink-0">
                <ShareButton group={group} />
              </div>
            )}
          </div>

          {/* Tabs Section */}
          <div className="border-t border-white/10 dark:border-white/5 pt-6">
            <GroupTabs groupId={groupId} />
          </div>
        </div>
      </div>
    </div>
  )
}