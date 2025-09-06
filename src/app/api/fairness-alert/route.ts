import { prisma } from '@/lib/prisma'
import { getBalances } from '@/lib/balances'
import { getTotalGroupSpending } from '@/lib/totals'
import { NextResponse } from 'next/server'

interface FairnessAlert {
  groupId: string
  groupName: string
  participantId: string
  participantName: string
  contributionAmount: number
  contributionPercentage: number
  totalGroupSpending: number
  currency: string
  severity: 'warning' | 'critical'
}

export async function GET() {
  try {
    // Query all groups with their expenses and participants
    const groups = await prisma.group.findMany({
      include: {
        expenses: {
          where: {
            isReimbursement: false // Exclude reimbursements from fairness calculations
          },
          include: {
            paidBy: true,
            paidFor: {
              include: {
                participant: true
              }
            }
          }
        },
        participants: true
      }
    })

    const fairnessAlerts: FairnessAlert[] = []
    let totalGroupsAnalyzed = 0
    let totalGroupsWithExpenses = 0

    for (const group of groups) {
      totalGroupsAnalyzed++
      
      // Calculate total group spending (excluding reimbursements)
      const totalSpending = getTotalGroupSpending(group.expenses)
      
      if (totalSpending === 0) {
        continue // Skip groups with no expenses
      }

      totalGroupsWithExpenses++

      // Calculate balances for this group
      const balances = getBalances(group.expenses)
      
      // Check each participant's contribution
      for (const participant of group.participants) {
        const participantBalance = balances[participant.id]
        if (!participantBalance) continue

        const contributionPercentage = (participantBalance.paid / totalSpending) * 100
        
        // Alert if contribution > 40%
        if (contributionPercentage > 40) {
          const severity = contributionPercentage > 60 ? 'critical' : 'warning'
          
          fairnessAlerts.push({
            groupId: group.id,
            groupName: group.name,
            participantId: participant.id,
            participantName: participant.name,
            contributionAmount: participantBalance.paid,
            contributionPercentage: Math.round(contributionPercentage * 100) / 100,
            totalGroupSpending: totalSpending,
            currency: group.currency,
            severity
          })
        }
      }
    }

    // Sort alerts by severity and percentage (critical first, then by highest percentage)
    fairnessAlerts.sort((a, b) => {
      if (a.severity !== b.severity) {
        return a.severity === 'critical' ? -1 : 1
      }
      return b.contributionPercentage - a.contributionPercentage
    })

    if (fairnessAlerts.length > 0) {
      const criticalAlerts = fairnessAlerts.filter(alert => alert.severity === 'critical')
      const warningAlerts = fairnessAlerts.filter(alert => alert.severity === 'warning')

      return NextResponse.json({
        status: 'alert',
        message: `Fairness alerts detected: ${criticalAlerts.length} critical, ${warningAlerts.length} warnings`,
        alerts: fairnessAlerts,
        summary: {
          totalAlerts: fairnessAlerts.length,
          criticalAlerts: criticalAlerts.length,
          warningAlerts: warningAlerts.length,
          totalGroupsAnalyzed,
          totalGroupsWithExpenses
        }
      })
    }

    return NextResponse.json({
      status: 'fair',
      message: 'All fair - no participants contributing more than 40%',
      summary: {
        totalAlerts: 0,
        criticalAlerts: 0,
        warningAlerts: 0,
        totalGroupsAnalyzed,
        totalGroupsWithExpenses
      }
    })

  } catch (error) {
    console.error('Error checking fairness alerts:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
