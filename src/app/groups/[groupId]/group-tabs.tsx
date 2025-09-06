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
    <div className="w-full">
      <Tabs
        value={value}
        className="w-full"
        onValueChange={(value) => {
          router.push(`/groups/${groupId}/${value}`)
        }}
      >
        <TabsList className="glass-card border border-white/20 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 p-1.5 h-auto rounded-xl shadow-lg backdrop-blur-md overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            <TabsTrigger 
              value="expenses" 
              className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/80 whitespace-nowrap"
            >
              {t('Expenses.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="balances"
              className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-secondary data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/80 whitespace-nowrap"
            >
              {t('Balances.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="information"
              className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-accent data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/80 whitespace-nowrap"
            >
              {t('Information.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="stats"
              className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/80 whitespace-nowrap"
            >
              {t('Stats.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/80 whitespace-nowrap"
            >
              {t('Activity.title')}
            </TabsTrigger>
            <TabsTrigger 
              value="edit"
              className="px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/80 whitespace-nowrap"
            >
              {t('Settings.title')}
            </TabsTrigger>
          </div>
        </TabsList>
      </Tabs>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}