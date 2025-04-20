"use client"

import { useTheme } from "next-themes"
import { QrCode } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface InvoicePreviewProps {
  id: string
  logo?: string
}

export default function InvoicePreview({ id, logo }: InvoicePreviewProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Mock data for the invoice
  const invoice = {
    id,
    date: "15 April 2023",
    subject: "Website Design Services",
    client: "Client Name",
    items: [
      { description: "Project Item One", quantity: 1, rate: 500, amount: 500 },
      { description: "Project Item Two", quantity: 1, rate: 750, amount: 750 },
    ],
    subtotal: 1250,
    tax: 125,
    total: 1375,
  }

  return (
    <div className="mx-auto max-w-4xl bg-black text-white border border-gray-800 rounded-lg overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo && (
              <div className="h-16 w-16 overflow-hidden">
                <img src={logo || "/placeholder.svg"} alt="Company logo" className="h-full w-full object-contain" />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight">[ZEN STUDIOS]</h1>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-sm text-gray-400">#{id}</p>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-sm text-gray-400">[15 April 2023]</p>
            <p className="font-medium">{invoice.client}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Project: {invoice.subject}</p>
            <p className="text-sm text-gray-400">Due Date: 15 May 2023</p>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-2 text-left">Project Item</th>
                <th className="py-2 text-center">QTY</th>
                <th className="py-2 text-center">RATE</th>
                <th className="py-2 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="py-4 text-left">{item.description}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-center">${item.rate.toFixed(2)}</td>
                  <td className="py-4 text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-1/3 bg-gray-900 p-4 rounded-lg">
            <div className="flex justify-between py-1">
              <span className="text-gray-400">SUBTOTAL</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">TAX</span>
              <span>${invoice.tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2 bg-gray-800" />
            <div className="flex justify-between py-1 font-bold">
              <span>TOTAL</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Payment Section */}
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PAYMENT</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Bank Transfer</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Account Name: Your Name</p>
                <p className="text-sm text-gray-400">Account Number: XXXX-XXXX-XXXX-XXXX</p>
                <p className="text-sm text-gray-400">Routing Number: XXXXXXXX</p>
              </div>
            </div>
          </div>

          <div>
            <div className="w-24 h-24 relative mx-auto">
              <Image 
                src="https://i.postimg.cc/SxwgxTqB/image.png" 
                alt="QR Code" 
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">TERMS & CONDITIONS</h3>
            <p className="text-xs text-gray-400">
              Payment is due within 30 days of invoice date. Late payments are subject to a 1.5% monthly fee. All work
              remains the property of Zen Studios until payment is received in full.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
