import { ApplePwaSplash } from '@/app/apple-pwa-splash'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ProgressBar } from '@/components/progress-bar'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { env } from '@/lib/env'
import { TRPCProvider } from '@/trpc/client'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: 'Spliit · Share Expenses with Friends & Family',
    template: '%s · Spliit',
  },
  description:
    'Spliit is a minimalist web application to share expenses with friends and family. No ads, no account, no problem.',
  openGraph: {
    title: 'Spliit · Share Expenses with Friends & Family',
    description:
      'Spliit is a minimalist web application to share expenses with friends and family. No ads, no account, no problem.',
    images: `/banner.png`,
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@scastiel',
    site: '@scastiel',
    images: `/banner.png`,
    title: 'Spliit · Share Expenses with Friends & Family',
    description:
      'Spliit is a minimalist web application to share expenses with friends and family. No ads, no account, no problem.',
  },
  appleWebApp: {
    capable: true,
    title: 'Spliit',
  },
  applicationName: 'Spliit',
  icons: [
    {
      url: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
}

export const viewport: Viewport = {
  themeColor: '#8B5CF6',
}

function Content({ children }: { children: React.ReactNode }) {
  const t = useTranslations()
  return (
    <TRPCProvider>
      <header className="fixed top-0 left-0 right-0 h-20 flex justify-between items-center glass-header px-4 md:px-6 z-50 shadow-lg">
        <Link
          className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
          href="/"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-gradient-primary p-2.5 rounded-xl shadow-lg">
              <Image
                src="/logo-with-text.png"
                className="h-8 w-auto filter brightness-0 invert"
                width={(35 * 522) / 180}
                height={35}
                alt="Spliit"
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gradient-primary">Spliit</h1>
            <p className="text-xs text-muted-foreground -mt-1">Split & Share</p>
          </div>
        </Link>
        
        <nav role="navigation" aria-label="Main navigation" className="flex items-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative overflow-hidden group hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
            >
              <Link href="/groups" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                {t('Header.groups')}
              </Link>
            </Button>
            
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-border to-transparent mx-2"></div>
            
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="pt-20 min-h-screen relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-bounce-gentle"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>

      <footer className="relative mt-16 md:mt-32">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent dark:from-slate-950/80"></div>
        
        <div className="relative glass-card border-t border-white/10 p-6 sm:p-8 md:p-16">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 text-sm">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Image
                    src="/logo-with-text.png"
                    className="h-6 w-auto filter brightness-0 invert"
                    width={(35 * 522) / 180}
                    height={35}
                    alt="Spliit"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gradient-primary text-lg">Spliit</h3>
                  <p className="text-muted-foreground text-xs">Split expenses beautifully</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 text-muted-foreground">
                <span>{t('Footer.madeIn')}</span>
                <div>
                  {t.rich('Footer.builtBy', {
                    author: (txt) => (
                      <a 
                        href="https://scastiel.dev" 
                        target="_blank" 
                        rel="noopener"
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline transition-colors"
                      >
                        {txt}
                      </a>
                    ),
                    source: (txt) => (
                      <a
                        href="https://github.com/spliit-app/spliit/graphs/contributors"
                        target="_blank"
                        rel="noopener"
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline transition-colors"
                      >
                        {txt}
                      </a>
                    ),
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 sm:text-right">
              <div className="text-xs text-muted-foreground">
                Made with 💜 for the community
              </div>
              <div className="flex gap-2 sm:justify-end">
                <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gradient-secondary rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-gradient-accent rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </TRPCProvider>
  )
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <ApplePwaSplash icon="/logo-with-text.png" color="#8B5CF6" />
      <body className="min-h-screen flex flex-col items-stretch">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>
              <ProgressBar />
            </Suspense>
            <Content>{children}</Content>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}