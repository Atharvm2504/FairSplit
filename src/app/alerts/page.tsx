'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Bell
} from 'lucide-react'

export default function AlertsPage() {
  // Mock data - in real app, this would come from your API
  const fairnessAlerts = [
    {
      id: 1,
      type: 'unfair_contribution',
      severity: 'high',
      group: 'Weekend Trip to NYC',
      participant: 'John Doe',
      message: 'John is contributing 65% of total group expenses',
      amount: 185.50,
      percentage: 65,
      date: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'unfair_contribution',
      severity: 'medium',
      group: 'Road Trip 2024',
      participant: 'Sarah Smith',
      message: 'Sarah is contributing 58% of total group expenses',
      amount: 234.75,
      percentage: 58,
      date: '1 day ago',
      status: 'active'
    }
  ]

  const settlementAlerts = [
    {
      id: 3,
      type: 'settlement_due',
      severity: 'medium',
      group: 'Shared Living',
      participant: 'Mike Johnson',
      message: 'You owe Mike $45.20 for utilities',
      amount: 45.20,
      date: '3 days ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'settlement_received',
      severity: 'low',
      group: 'Office Lunch',
      participant: 'Emily Davis',
      message: 'Emily paid you $12.50 for lunch',
      amount: 12.50,
      date: '1 week ago',
      status: 'completed'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-5 w-5" />
      case 'medium': return <AlertTriangle className="h-5 w-5" />
      case 'low': return <CheckCircle className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
            <p className="text-gray-600 mt-1">Stay informed about fairness and settlements</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
            <Button size="sm">
              View All Groups
            </Button>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{fairnessAlerts.length}</p>
                  <p className="text-sm text-gray-600">Fairness Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{settlementAlerts.filter(a => a.status === 'pending').length}</p>
                  <p className="text-sm text-gray-600">Pending Settlements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{settlementAlerts.filter(a => a.status === 'completed').length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fairness Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Fairness Alerts
            </CardTitle>
            <CardDescription>Members contributing more than their fair share</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fairnessAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border-2 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{alert.participant}</h4>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {alert.group}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${alert.amount}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {alert.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{alert.date}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {fairnessAlerts.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">All contributions are fair!</h3>
                  <p className="text-gray-600">No fairness alerts at this time.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settlement Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              Settlement Alerts
            </CardTitle>
            <CardDescription>Pending and completed settlements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settlementAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-xl border-2 ${
                  alert.status === 'completed' 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-orange-200 bg-orange-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {alert.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{alert.participant}</h4>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {alert.group}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${alert.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{alert.date}</p>
                      <div className="flex gap-2 mt-2">
                        {alert.status === 'pending' ? (
                          <>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">
                              Pay Now
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
