"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface LogoUploaderProps {
  initialLogo?: string
  onLogoChange?: (logo: string | null) => void
}

export default function LogoUploader({ initialLogo, onLogoChange }: LogoUploaderProps) {
  const [logo, setLogo] = useState<string | null>(initialLogo || null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setLogo(result)
      onLogoChange?.(result)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo(null)
    onLogoChange?.(null)
  }

  return (
    <div className="space-y-4">
      {logo ? (
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-32 w-full">
              <Image src={logo || "/placeholder.svg"} alt="Company logo" fill className="object-contain p-4" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={removeLogo}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">Upload your company logo</p>
            <p className="mb-4 text-xs text-muted-foreground">SVG, PNG or JPG (max. 2MB)</p>
            <Button variant="outline" className="w-full" type="button">
              <label className="flex w-full cursor-pointer items-center justify-center">
                Select Image
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
              </label>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
