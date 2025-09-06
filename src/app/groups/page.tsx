'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users,
  Plus,
  DollarSign,
  Calendar,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react'
import Link from 'next/link'

export default function GroupsPage() {
  // Mock data - in real app, this would come from your API
  const groups = [
    {
      id: 1,
      name: "Weekend Trip to NYC",
      description: "Friends trip to New York City",
      members: 4,
      totalExpenses: 1247.50,
      currency: "$",
      lastActivity: "2 hours ago",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Shared Living",
      description: "Apartment expenses with roommates",
      members: 3,
      totalExpenses: 892.30,
      currency: "$",
      lastActivity: "1 day ago",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: 3,
      name: "Road Trip 2024",
      description: "Cross-country road trip expenses",
      members: 5,
      totalExpenses: 2105.75,
      currency: "$",
      lastActivity: "3 days ago",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "Office Lunch",
      description: "Team lunch expenses",
      members: 8,
      totalExpenses: 456.80,
      currency: "$",
      lastActivity: "1 week ago",
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
            <p className="text-gray-600 mt-1">Manage your expense sharing groups</p>
          </div>
          <Button asChild>
            <Link href="/groups/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Group
            </Link>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${group.color} rounded-xl flex items-center justify-center`}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                        {group.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {group.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">Members</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{group.members}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">Total</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {group.currency}{group.totalExpenses}
                    </p>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last activity: {group.lastActivity}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/groups/${group.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/expenses/add?group=${group.id}`}>
                      Add Expense
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {groups.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups yet</h3>
              <p className="text-gray-600 mb-6">Create your first group to start splitting expenses with friends</p>
              <Button asChild>
                <Link href="/groups/create" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Group
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}