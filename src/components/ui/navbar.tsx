'use client'


import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { 
  Bell, 
  Search, 
  Menu,
  User,
  Settings,
  LogOut,
  Wallet
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  className?: string
  onMenuClick?: () => void
  user?: {
    name: string
    email: string
    avatarUrl?: string
  } | null
}

export function Navbar({ className, onMenuClick, user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Landing page links
  const landingLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
  ];
  // App links
  const appLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/groups", label: "Groups" },
    { href: "/expenses/add", label: "Add Expense" },
    { href: "/profile", label: "Profile" },
  ];

  // Show landing links only on '/'
  const isLanding = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 flex h-16 items-center justify-between border-b border-white/20 dark:border-gray-700/20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl px-4 md:px-8 shadow-lg",
        className
      )}
      style={{
        background: "rgba(79,70,229,0.7)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(16,185,129,0.2)",
      }}
    >
      {/* Left: Logo & Hamburger */}
      <div className="flex items-center gap-2 md:gap-6">
        {/* Hamburger for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
        {/* Logo (icon + gradient text) */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-600">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">FairSplit</span>
        </Link>
      </div>

      {/* Center: Nav links (desktop) */}
      <nav className="hidden md:flex gap-4 lg:gap-8">
        {isLanding
          ? landingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg font-medium transition text-white/90 hover:bg-white/20 hover:text-green-300",
                  pathname === link.href && "bg-white/20 text-green-300"
                )}
              >
                {link.label}
              </Link>
            ))
          : appLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg font-medium transition text-white/90 hover:bg-white/20 hover:text-green-300",
                  pathname === link.href && "bg-white/20 text-green-300"
                )}
              >
                {link.label}
              </Link>
            ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <ThemeToggle />
        {/* Show Sign In/Get Started on landing if not logged in */}
        {isLanding && !user && (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="shadow-md">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </>
        )}
        {/* Notifications and profile for logged in users or on app pages */}
        {(!isLanding || user) && (
          <>
            <Button variant="ghost" size="icon" className="relative text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full overflow-hidden border-2 border-green-400">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card min-w-[180px]">
                {user ? (
                  <>
                    <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button className="w-full text-left flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="w-full">Login</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-16 left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg flex flex-col gap-2 px-6 py-4 transition-all duration-300 md:hidden",
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"
        )}
        style={{
          background: "rgba(79,70,229,0.97)",
          borderBottom: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        {(isLanding ? landingLinks : appLinks).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-3 py-2 rounded-lg font-medium text-white/90 hover:bg-white/20 hover:text-green-300 transition",
              pathname === link.href && "bg-white/20 text-green-300"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {/* Show Sign In/Get Started on landing if not logged in (mobile) */}
        {isLanding && !user && (
          <div className="flex flex-col gap-2 mt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="shadow-md">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <ThemeToggle />
          {isLanding && !user ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" className="relative text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </Button>
          )}
        </div>
        <div className="mt-2">
          {(!isLanding || user) && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full overflow-hidden border-2 border-green-400">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card min-w-[180px]">
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="w-full">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button className="w-full text-left flex items-center gap-2">
                          <LogOut className="h-4 w-4" /> Logout
                        </button>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="w-full">Login</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
