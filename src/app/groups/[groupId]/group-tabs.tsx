'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  groupId: string
}

export function GroupTabs({ groupId }: Props) {
  const t = useTranslations()
  const pathname = usePathname()
  const value =
    pathname.replace(/\/groups\/[^\/]+\/([^/]+).*/, '$1') || 'expenses'
  const router = useRouter()

  return (
    <Tabs
      value={value}
      className="overflow-x-auto"
      onValueChange={(value) => {
        router.push(`/groups/${groupId}/${value}`)
      }}
    >
      <TabsList className="grid w-full grid-cols-6 bg-gray-100 rounded-xl p-1">
        <TabsTrigger 
          value="expenses" 
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
        >
          {t('Expenses.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="balances"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
        >
          {t('Balances.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="information"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
        >
          {t('Information.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="stats"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
        >
          {t('Stats.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="activity"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
        >
          {t('Activity.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="edit"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
        >
          {t('Settings.title')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
