// Filepath: src/app/api/groups/[groupId]/history/route.ts

import { getAuth } from '@clerk/nextjs/server' // Import getAuth from Clerk
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { groupId: string } },
) {
  const groupId = params.groupId

  const { userId } = getAuth(request as any)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const participant = await prisma.participant.findFirst({
      where: {
        AND: [{ groupId: groupId }, { id: userId }],
      },
    })

    if (!participant) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const balanceHistory = await prisma.balanceHistory.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        recordedAt: 'desc',
      },
      include: {
        debtor: { select: { name: true } },
        creditor: { select: { name: true } },
      },
    })

    return NextResponse.json(balanceHistory, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch balance history:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
