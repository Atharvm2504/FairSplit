'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User,
  DollarSign,
  TrendingUp,
  Users,
  Receipt,
  Calendar,
  Edit,
  Settings,
  Award,
  Target
} from 'lucide-react'

export default function ProfilePage() {
  // Mock data - in real app, this would come from your API
  const userStats = {
    totalSpent: 2847.50,
    totalGroups: 3,
    totalExpenses: 47,
    averageExpense: 60.58,
    biggestExpense: 245.00,
    mostActiveGroup: "Weekend Trip to NYC"
  }

  const monthlyData = [
    { month: 'Jan', amount: 450 },
    { month: 'Feb', amount: 620 },
    { month: 'Mar', amount: 380 },
    { month: 'Apr', amount: 720 },
    { month: 'May', amount: 540 },
    { month: 'Jun', amount: 680 }
  ]

  const achievements = [
    { id: 1, title: "First Expense", description: "Added your first expense", icon: Receipt, earned: true },
    { id: 2, title: "Group Creator", description: "Created your first group", icon: Users, earned: true },
    { id: 3, title: "Big Spender", description: "Added an expense over $200", icon: DollarSign, earned: true },
    { id: 4, title: "Consistent User", description: "Used the app for 30 days", icon: Calendar, earned: false },
    { id: 5, title: "Fair Splitter", description: "Maintained fair contributions", icon: Award, earned: false }
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Your expense sharing statistics and achievements</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                <p className="text-gray-600">john.doe@example.com</p>
                <p className="text-sm text-gray-500 mt-2">Member since January 2024</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Groups</span>
                  <span className="font-semibold">{userStats.totalGroups}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Expenses</span>
                  <span className="font-semibold">{userStats.totalExpenses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most Active Group</span>
                  <span className="font-semibold text-sm">{userStats.mostActiveGroup}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spending Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Spending Overview
                </CardTitle>
                <CardDescription>Your expense statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${userStats.totalSpent}</div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${userStats.averageExpense}</div>
                    <div className="text-sm text-gray-600">Average Expense</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${userStats.biggestExpense}</div>
                    <div className="text-sm text-gray-600">Biggest Expense</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">+12%</div>
                    <div className="text-sm text-gray-600">vs Last Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Spending
                </CardTitle>
                <CardDescription>Your spending pattern over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-gray-200 rounded-t-lg relative group">
                        <div 
                          className="bg-gradient-to-t from-indigo-500 to-emerald-500 rounded-t-lg transition-all duration-300 group-hover:from-indigo-600 group-hover:to-emerald-600"
                          style={{ height: `${(data.amount / 800) * 100}%` }}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ${data.amount}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Track your progress and unlock new achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.earned
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      achievement.earned
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-emerald-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-emerald-700' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Goals & Insights
            </CardTitle>
            <CardDescription>Set spending goals and track your financial habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Monthly Budget Goal</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent this month</span>
                    <span>$680 / $800</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">You're on track! 15% remaining in your budget.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Spending Insights</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-900">Most spent category</span>
                    <span className="font-semibold text-blue-900">Food & Dining</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-emerald-900">Most active group</span>
                    <span className="font-semibold text-emerald-900">Weekend Trip</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-purple-900">Average per expense</span>
                    <span className="font-semibold text-purple-900">$60.58</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
