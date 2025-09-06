'use client'

import { Layout } from '@/components/layout'
import { GroupForm } from '@/components/group-form'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const CreateGroup = () => {
  const { mutateAsync } = trpc.groups.create.useMutation()
  const utils = trpc.useUtils()
  const router = useRouter()

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/groups">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
            <p className="text-gray-600 mt-1">Set up a new expense sharing group</p>
          </div>
        </div>

        <GroupForm
          onSubmit={async (groupFormValues) => {
            const { groupId } = await mutateAsync({ groupFormValues })
            await utils.groups.invalidate()
            router.push(`/groups/${groupId}`)
          }}
        />
      </div>
    </Layout>
  )
}
