'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Receipt,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Tag,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

export default function ExpensesPage() {
  // Mock data - in real app, this would come from your API
  const expenses = [
    {
      id: 1,
      title: "Dinner at Restaurant",
      amount: 89.50,
      group: "Weekend Trip to NYC",
      paidBy: "John Doe",
      category: "Food & Dining",
      date: "2024-01-15",
      time: "2 hours ago",
      participants: ["John Doe", "Sarah Smith", "Mike Johnson"],
      receipt: true
    },
    {
      id: 2,
      title: "Gas Station",
      amount: 45.20,
      group: "Road Trip 2024",
      paidBy: "Sarah Smith",
      category: "Transportation",
      date: "2024-01-14",
      time: "1 day ago",
      participants: ["Sarah Smith", "Emily Davis", "Tom Wilson"],
      receipt: false
    },
    {
      id: 3,
      title: "Groceries",
      amount: 67.80,
      group: "Shared Living",
      paidBy: "Mike Johnson",
      category: "Food & Dining",
      date: "2024-01-13",
      time: "2 days ago",
      participants: ["Mike Johnson", "Lisa Brown", "Alex Green"],
      receipt: true
    },
    {
      id: 4,
      title: "Movie Tickets",
      amount: 32.00,
      group: "Weekend Trip to NYC",
      paidBy: "Emily Davis",
      category: "Entertainment",
      date: "2024-01-12",
      time: "3 days ago",
      participants: ["Emily Davis", "John Doe", "Sarah Smith"],
      receipt: false
    },
    {
      id: 5,
      title: "Hotel Room",
      amount: 245.00,
      group: "Road Trip 2024",
      paidBy: "Tom Wilson",
      category: "Accommodation",
      date: "2024-01-11",
      time: "4 days ago",
      participants: ["Tom Wilson", "Sarah Smith", "Emily Davis"],
      receipt: true
    }
  ]

  const categories = [
    "All Categories",
    "Food & Dining",
    "Transportation",
    "Accommodation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Other"
  ]

  const groups = [
    "All Groups",
    "Weekend Trip to NYC",
    "Road Trip 2024",
    "Shared Living",
    "Office Lunch"
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600 mt-1">Track and manage all your shared expenses</p>
          </div>
          <Button asChild>
            <Link href="/expenses/add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              
              <div className="flex gap-3">
                <select className="h-11 px-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select className="h-11 px-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                  {groups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.map((expense) => (
            <Card key={expense.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{expense.title}</h3>
                        {expense.receipt && (
                          <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">
                            Receipt
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${expense.amount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {expense.group}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {expense.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {expense.date}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Paid by:</span>
                        <span className="text-sm font-medium text-gray-900">{expense.paidBy}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">Split among:</span>
                        <span className="text-sm text-gray-900">{expense.participants.length} people</span>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {expense.participants.map((participant, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                            >
                              {participant}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{expense.time}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {expenses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your shared expenses by adding your first expense</p>
              <Button asChild>
                <Link href="/expenses/add" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Expense
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {expenses.length > 0 && (
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Expenses
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}
