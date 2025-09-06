'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Money } from '@/components/money'
import { 
  Users, 
  CreditCard, 
  DollarSign,
  TrendingUp
} from 'lucide-react'

// Demo component showing dashboard with sample data
export function DashboardDemo() {
  const demoMetrics = {
    totalGroups: 3,
    totalParticipants: 12,
    totalExpenses: 47,
    totalSpent: 2847.50 // in cents
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
            {demoMetrics.totalGroups}
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
            {demoMetrics.totalParticipants}
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
            {demoMetrics.totalExpenses}
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
              amount={demoMetrics.totalSpent / 100} 
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
