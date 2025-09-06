'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn, SlideUp, ScaleIn } from '@/components/animated-wrapper'
import { 
  Users,
  Receipt,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Wallet,
  TrendingUp,
  Smartphone,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">


      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <FadeIn>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gradient">Split expenses</span>
                  <br />
                  <span className="text-gray-900 dark:text-gray-100">fairly & easily</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  The modern way to share expenses with friends, roommates, and travel companions. 
                  No accounts required, just fair splits.
                </p>
              </div>
            </FadeIn>
            
            <SlideUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Start Splitting
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="#features" className="flex items-center gap-2">
                    Learn More
                  </Link>
                </Button>
              </div>
            </SlideUp>

            {/* Trust indicators */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  No account required
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  Privacy focused
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-500" />
                  Instant setup
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Everything you need to split expenses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make expense sharing simple, fair, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <ScaleIn delay={0.1}>
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Smart Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create groups for different activities - trips, shared living, events. 
                    Add members instantly with just a link.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScaleIn>

            {/* Feature 2 */}
            <ScaleIn delay={0.2}>
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <Receipt className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Receipt Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Upload receipts, add notes, and track expenses with photos. 
                    Never lose track of who paid for what.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScaleIn>

            {/* Feature 3 */}
            <ScaleIn delay={0.3}>
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Fairness Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Get notified when someone is contributing more than their fair share. 
                    Keep everyone happy and balanced.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScaleIn>

            {/* Feature 4 */}
            <ScaleIn delay={0.4}>
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Mobile First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Designed for mobile use. Add expenses on the go, 
                    take photos of receipts, and settle up anywhere.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScaleIn>

            {/* Feature 5 */}
            <ScaleIn delay={0.5}>
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Multi-Currency</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Support for multiple currencies. Perfect for international travel 
                    and global expense sharing.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScaleIn>

            {/* Feature 6 */}
            <ScaleIn delay={0.6}>
              <Card className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    No accounts, no tracking, no ads. Your expense data stays private 
                    and secure. Just fair splits.
                  </CardDescription>
                </CardContent>
              </Card>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Ready to start splitting expenses?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of people who trust FairSplit for their expense sharing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" asChild>
                <Link href="/dashboard">
                  Get Started Free
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/groups">
                  View Example Groups
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-900/50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-600">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">FairSplit</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The modern way to split expenses fairly and easily.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/features" className="hover:text-gray-900 dark:hover:text-gray-100">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-900 dark:hover:text-gray-100">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-gray-900 dark:hover:text-gray-100">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/help" className="hover:text-gray-900 dark:hover:text-gray-100">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-100">Contact</Link></li>
                <li><Link href="/status" className="hover:text-gray-900 dark:hover:text-gray-100">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-100">About</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900 dark:hover:text-gray-100">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-gray-900 dark:hover:text-gray-100">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 dark:border-gray-700/20 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 FairSplit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
