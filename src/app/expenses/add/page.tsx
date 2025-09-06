'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Receipt,
  Upload,
  Users,
  DollarSign,
  Calendar,
  Tag,
  Save,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function AddExpensePage() {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    group: '',
    paidBy: '',
    splitMode: 'evenly'
  })

  const [receiptFile, setReceiptFile] = useState<File | null>(null)

  // Mock data - in real app, this would come from your API
  const groups = [
    { id: 1, name: "Weekend Trip to NYC" },
    { id: 2, name: "Shared Living" },
    { id: 3, name: "Road Trip 2024" },
    { id: 4, name: "Office Lunch" }
  ]

  const members = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Sarah Smith" },
    { id: 3, name: "Mike Johnson" },
    { id: 4, name: "Emily Davis" }
  ]

  const categories = [
    "Food & Dining",
    "Transportation",
    "Accommodation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Other"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReceiptFile(file)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Expense</h1>
            <p className="text-gray-600 mt-1">Track a new expense and split it with your group</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Expense Details
              </CardTitle>
              <CardDescription>Enter the basic information about this expense</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Expense Title"
                placeholder="e.g., Dinner at Restaurant"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Input
                label="Description (Optional)"
                placeholder="Add any additional details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group and Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Group & Payment
              </CardTitle>
              <CardDescription>Select the group and who paid for this expense</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Group</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    required
                  >
                    <option value="">Select a group</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Paid By</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={formData.paidBy}
                    onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                    required
                  >
                    <option value="">Who paid for this?</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Split Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.splitMode === 'evenly'
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white/80 text-gray-600 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, splitMode: 'evenly' })}
                  >
                    <div className="text-sm font-medium">Split Evenly</div>
                    <div className="text-xs text-gray-500">Equal shares for all</div>
                  </button>
                  <button
                    type="button"
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.splitMode === 'custom'
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white/80 text-gray-600 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, splitMode: 'custom' })}
                  >
                    <div className="text-sm font-medium">Custom Split</div>
                    <div className="text-xs text-gray-500">Set individual amounts</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Receipt (Optional)
              </CardTitle>
              <CardDescription>Upload a photo of your receipt for record keeping</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {receiptFile ? receiptFile.name : 'Click to upload receipt'}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" asChild className="flex-1">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" className="flex-1 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Expense
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
