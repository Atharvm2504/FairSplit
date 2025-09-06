'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Money } from '@/components/money'
import { 
  Users, 
  CreditCard, 
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react'
import { trpc } from '@/trpc/client'
import { getRecentGroups } from '@/app/groups/recent-groups-helpers'
import { useEffect, useState } from 'react'

interface DashboardMetrics {
  totalGroups: number
  totalParticipants: number
  totalExpenses: number
  totalSpent: number
  pendingSettlements: number
}

export function DashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalGroups: 0,
    totalParticipants: 0,
    totalExpenses: 0,
    totalSpent: 0,
    pendingSettlements: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  // Get recent groups from localStorage
  const recentGroups = getRecentGroups()
  const groupIds = recentGroups.map(group => group.id)

  // Fetch group details for recent groups
  const { data: groupsData, isLoading: groupsLoading } = trpc.groups.list.useQuery(
    { groupIds },
    { enabled: groupIds.length > 0 }
  )

  // Calculate metrics when data is available
  useEffect(() => {
    if (groupsData?.groups) {
      const calculatedMetrics = groupsData.groups.reduce((acc, group) => {
        acc.totalGroups += 1
        acc.totalParticipants += group.participants.length
        acc.totalExpenses += group.expenses.length
        acc.totalSpent += group.expenses.reduce((sum, expense) => 
          expense.isReimbursement ? sum : sum + expense.amount, 0
        )
        return acc
      }, {
        totalGroups: 0,
        totalParticipants: 0,
        totalExpenses: 0,
        totalSpent: 0,
        pendingSettlements: 0 // This would need balance calculations
      })

      setMetrics(calculatedMetrics)
    }
    setIsLoading(false)
  }, [groupsData])

  if (isLoading || groupsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
              <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-2"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Groups Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Total Groups
          </CardTitle>
          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {metrics.totalGroups}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Active expense groups
          </p>
        </CardContent>
      </Card>

      {/* Total Participants Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Total Members
          </CardTitle>
          <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
            {metrics.totalParticipants}
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Across all groups
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Total Expenses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {metrics.totalExpenses}
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400">
            Expenses tracked
          </p>
        </CardContent>
      </Card>

      {/* Total Spent Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
            Total Spent
          </CardTitle>
          <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
            <Money 
              currency="$" 
              amount={metrics.totalSpent / 100} 
              bold 
            />
          </div>
          <p className="text-xs text-orange-600 dark:text-orange-400">
            Across all groups
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
