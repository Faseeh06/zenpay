"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Home, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="container flex h-20 items-center justify-between px-2">
        <div className="flex items-center -ml-2">
          <Link href="/">
            <div className="relative w-96 h-24">
              <Image 
                src="https://i.postimg.cc/Zq4yHpL9/image.png" 
                alt="ZenPay Logo" 
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button 
              size="sm" 
              variant="ghost"
              className={`rounded-full border border-transparent text-gray-800 dark:text-white transition-all
                hover:bg-gray-100/80 hover:border-gray-300 dark:hover:bg-gray-800/80 dark:hover:border-gray-700
                ${pathname === "/" ? "font-medium" : ""}`}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/invoices/new">
            <Button 
              size="sm"
              variant="ghost" 
              className="rounded-full border border-transparent text-gray-800 dark:text-white transition-all
                hover:bg-gray-100/80 hover:border-gray-300 dark:hover:bg-gray-800/80 dark:hover:border-gray-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
