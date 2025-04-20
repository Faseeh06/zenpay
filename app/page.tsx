"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useState, useEffect, ReactNode } from "react"
import { Briefcase, ChevronRight, BarChart3, Clock, CreditCard, FileText, TrendingUp } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure we're mounted for correct theme rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={cn(
      "min-h-screen flex flex-col relative overflow-hidden",
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
    )}>
      <AnimatedBackground />
      
      {/* Background gradient blobs */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl -z-5"></div>
      <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl -z-5"></div>
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-start max-w-3xl mx-auto">
          <h2 className="text-gray-600 text-xl mb-3 relative">
            Hello there,
            <span className="absolute -left-6 -top-6 w-20 h-20 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-2xl"></span>
          </h2>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 relative">
            I'm Moez
            <span className="text-blue-500 ml-1 relative">
              *
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-400/40 animate-pulse blur-md"></span>
            </span>
            <div className="absolute -left-6 -right-6 top-1/2 h-4 bg-blue-500/20 blur-2xl transform -translate-y-1/2 rounded-full"></div>
          </h1>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-700 to-transparent my-10"></div>
          
          <div className="flex flex-row items-center justify-between w-full mb-16 gap-4 relative">
            <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 relative">
              * Use me to get your finances done :)
              <span className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/15 rounded-full blur-2xl dark:bg-purple-500/15"></span>
            </p>
            
            <Link href="/invoices/new" className="inline-block">
              <div className="group relative">
                <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white whitespace-nowrap">
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Get an Invoice done</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all group-hover:w-full"></span>
              </div>
            </Link>
          </div>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10"></div>
            <div className="absolute -left-32 top-1/2 w-64 h-64 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl -z-10 transform -translate-y-1/2"></div>
            
            <FeatureCard 
              icon={<BarChart3 className="w-10 h-10 text-blue-500" />}
              title="Beautiful UI"
              description="Track your financial performance with stunning visual UI."
            />
            <FeatureCard 
              icon={<CreditCard className="w-10 h-10 text-blue-500" />}
              title="Easy Download"
              description="Get paid faster with multiple payment options and automated reminders."
            />
            <FeatureCard 
              icon={<FileText className="w-10 h-10 text-blue-500" />}
              title="Unlimited Invoices"
              description="Generate professional invoices and documents with just a few clicks."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

// Feature card component with proper TypeScript types
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border border-gray-300 dark:border-gray-800 bg-white/60 dark:bg-black/30 backdrop-blur-sm transition-all hover:shadow-lg dark:hover:border-gray-700 group hover:scale-[1.02] transform duration-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-500/20 dark:bg-purple-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 dark:group-hover:bg-purple-500/30 transition-all"></div>
      
      <div className="mb-4 relative">
        <div className="absolute -inset-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {icon}
      </div>
      
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-400 text-sm">{description}</p>
    </div>
  )
}
