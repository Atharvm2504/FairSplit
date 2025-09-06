'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DollarSign,
  Users,
  Receipt,
  AlertTriangle,
  TrendingUp,
  Plus,
  ArrowRight,
  Wallet,
  CreditCard,
  Activity
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data - in real app, this would come from your API
  const stats = {
    totalSpent: 2847.50,
    totalGroups: 3,
    totalExpenses: 47,
    pendingSettlements: 2
  }

  const recentExpenses = [
    { id: 1, title: "Dinner at Restaurant", amount: 89.50, group: "Weekend Trip", date: "2 hours ago" },
    { id: 2, title: "Gas Station", amount: 45.20, group: "Road Trip", date: "1 day ago" },
    { id: 3, title: "Groceries", amount: 67.80, group: "Shared Living", date: "2 days ago" },
  ]

  const fairnessAlerts = [
    { id: 1, group: "Weekend Trip", participant: "John Doe", percentage: 65, amount: 185.50 },
    { id: 2, group: "Road Trip", participant: "Sarah Smith", percentage: 58, amount: 234.75 },
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your expense overview.</p>
          </div>
          <Button asChild>
            <Link href="/expenses/add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${stats.totalSpent}</div>
              <p className="text-xs text-gray-500">Across all groups</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Groups</CardTitle>
              <Users className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalGroups}</div>
              <p className="text-xs text-gray-500">Groups you're part of</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
              <Receipt className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalExpenses}</div>
              <p className="text-xs text-gray-500">Expenses tracked</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Settlements</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingSettlements}</div>
              <p className="text-xs text-gray-500">Awaiting payment</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Expenses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Recent Expenses</CardTitle>
                    <CardDescription>Your latest expense entries</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/expenses" className="flex items-center gap-2">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Receipt className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{expense.title}</p>
                          <p className="text-sm text-gray-500">{expense.group} • {expense.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${expense.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fairness Alerts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Fairness Alerts
                </CardTitle>
                <CardDescription>Members contributing more than 40%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fairnessAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{alert.participant}</p>
                        <span className="text-sm font-semibold text-orange-600">{alert.percentage}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.group}</p>
                      <p className="text-sm text-gray-500">Contributed: ${alert.amount}</p>
                    </div>
                  ))}
                  {fairnessAlerts.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                      </div>
                      <p className="text-sm text-gray-500">All contributions are fair!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/groups/create" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Group
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/expenses/add" className="flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    Add Expense
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/alerts" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    View All Alerts
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
