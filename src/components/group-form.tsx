import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getGroup } from '@/lib/api'
import { GroupFormValues, groupFormSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Textarea } from './ui/textarea'

export type Props = {
  group?: NonNullable<Awaited<ReturnType<typeof getGroup>>>
  onSubmit: (
    groupFormValues: GroupFormValues,
    participantId?: string,
  ) => Promise<void>
  protectedParticipantIds?: string[]
}

export function GroupForm({
  group,
  onSubmit,
  protectedParticipantIds = [],
}: Props) {
  const t = useTranslations('GroupForm')
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: group
      ? {
          name: group.name,
          information: group.information ?? '',
          currency: group.currency,
          participants: group.participants,
        }
      : {
          name: '',
          information: '',
          currency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY_SYMBOL || '',
          participants: [
            { name: t('Participants.John') },
            { name: t('Participants.Jane') },
            { name: t('Participants.Jack') },
          ],
        },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'participants',
    keyName: 'key',
  })

  const [activeUser, setActiveUser] = useState<string | null>(null)
  useEffect(() => {
    if (activeUser === null) {
      const currentActiveUser =
        fields.find(
          (f) => f.id === localStorage.getItem(`${group?.id}-activeUser`),
        )?.name || t('Settings.ActiveUserField.none')
      setActiveUser(currentActiveUser)
    }
  }, [t, activeUser, fields, group?.id])

  const updateActiveUser = () => {
    if (!activeUser) return
    if (group?.id) {
      const participant = group.participants.find((p) => p.name === activeUser)
      if (participant?.id) {
        localStorage.setItem(`${group.id}-activeUser`, participant.id)
      } else {
        localStorage.setItem(`${group.id}-activeUser`, activeUser)
      }
    } else {
      localStorage.setItem('newGroup-activeUser', activeUser)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await onSubmit(
            values,
            group?.participants.find((p) => p.name === activeUser)?.id ??
              undefined,
          )
        })}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">{t('NameField.label')}</FormLabel>
                  <FormControl>
                    <Input
                      label={t('NameField.placeholder')}
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    {t('NameField.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">{t('CurrencyField.label')}</FormLabel>
                  <FormControl>
                    <Input
                      label={t('CurrencyField.placeholder')}
                      className="text-base"
                      max={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    {t('CurrencyField.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="information"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">{t('InformationField.label')}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        className="text-base rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        {...field}
                        placeholder={t('InformationField.placeholder')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">{t('Participants.title')}</CardTitle>
            <CardDescription className="text-gray-600">{t('Participants.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4">
              {fields.map((item, index) => (
                <li key={item.key}>
                  <FormField
                    control={form.control}
                    name={`participants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">
                          Participant #{index + 1}
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-3">
                            <Input
                              label={t('Participants.new')}
                              className="text-base flex-1"
                              {...field}
                            />
                            {item.id &&
                            protectedParticipantIds.includes(item.id) ? (
                              <HoverCard>
                                <HoverCardTrigger>
                                  <Button
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    type="button"
                                    size="icon"
                                    disabled
                                  >
                                    <Trash2 className="w-4 h-4 opacity-50" />
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent
                                  align="end"
                                  className="text-sm glass-card"
                                >
                                  {t('Participants.protectedParticipant')}
                                </HoverCardContent>
                              </HoverCard>
                            ) : (
                              <Button
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => remove(index)}
                                type="button"
                                size="icon"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                append({ name: '' })
              }}
              type="button"
              className="w-full"
            >
              {t('Participants.add')}
            </Button>
          </CardFooter>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">{t('Settings.title')}</CardTitle>
            <CardDescription className="text-gray-600">{t('Settings.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              {activeUser !== null && (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">{t('Settings.ActiveUserField.label')}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setActiveUser(value)
                      }}
                      defaultValue={activeUser}
                    >
                      <SelectTrigger className="rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                        <SelectValue
                          placeholder={t(
                            'Settings.ActiveUserField.placeholder',
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        {[
                          { name: t('Settings.ActiveUserField.none') },
                          ...form.watch('participants'),
                        ]
                          .filter((item) => item.name.length > 0)
                          .map(({ name }) => (
                            <SelectItem key={name} value={name} className="hover:bg-indigo-50">
                              {name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    {t('Settings.ActiveUserField.description')}
                  </FormDescription>
                </FormItem>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <SubmitButton
            loadingContent={t(group ? 'Settings.saving' : 'Settings.creating')}
            onClick={updateActiveUser}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />{' '}
            {t(group ? 'Settings.save' : 'Settings.create')}
          </SubmitButton>
          {!group && (
            <Button variant="outline" asChild className="flex-1">
              <Link href="/groups">{t('Settings.cancel')}</Link>
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
