import { PropsWithChildren, Suspense } from 'react'

export default function GroupsLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Suspense>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col gap-8 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50 dark:from-purple-950/10 dark:via-transparent dark:to-pink-950/10 pointer-events-none rounded-3xl"></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </Suspense>
  )
}