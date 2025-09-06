import { Button } from '@/components/ui/button'
import { DollarSign, Github, Shield, Sparkles, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce-gentle blur-xl"></div>

        <div className="container relative max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-purple-200/50 dark:border-purple-800/50">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Beautiful • Simple • Free
              </span>
            </div>

            {/* Main heading - Fixed the text rendering issue */}

            <h1 className="max-w-4xl font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-slate-900 dark:text-white">
              <span className="landing-header block">
                Share Expenses with{' '}
                <strong className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                  Friends & Family
                </strong>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-600 dark:text-slate-300 font-light">
              Spliit is a minimalist web application to share expenses with
              friends and family.{' '}
              <strong className="font-semibold text-gradient-secondary">
                No ads, no account, no problem.
              </strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-purple-glow transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold btn-gradient-hover"
              >
                <Link href="/groups" className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  {t('Header.groups') || 'My Groups'}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl font-semibold glass-card hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700"
              >
                <Link
                  href="https://github.com/spliit-app/spliit"
                  className="flex items-center gap-3"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </Link>
              </Button>
            </div>

            {/* Stats or features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl">
              <div className="glass-card p-6 rounded-2xl card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Split Smart</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Effortlessly divide expenses among friends and family with
                  intelligent calculations.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-secondary rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Privacy First</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No accounts required. Your data stays private and secure on
                  your device.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-accent rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Zero Ads</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clean, distraction-free experience focused on what matters
                  most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-16 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center card-hover">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-6">
              <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Ready to get started?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              Start splitting expenses today
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who trust Spliit to manage their shared
              expenses. Simple, beautiful, and completely free.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-gradient-animated hover:shadow-purple-glow transition-all duration-300 text-lg px-12 py-6 rounded-xl font-semibold btn-gradient-hover"
            >
              <Link href="/groups">Create Your First Group</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
