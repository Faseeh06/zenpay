"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload, ArrowLeft, Plus, Minus, Check, Image, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InvoiceItem {
  id: string
  description: string
  rate: number
  quantity: number
  amount: number
}

export default function NewInvoicePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("form")

  // Make sure we're mounted (for the theme)
  useEffect(() => {
    setMounted(true)
  }, [])

  // From Info
  const [fromName, setFromName] = useState("[ZENPAY]")
  const [fromEmail, setFromEmail] = useState("info@zenpay.com")
  const [fromAddress, setFromAddress] = useState("123 Studio Street, City")
  const [fromPhone, setFromPhone] = useState("+1 234 567 890")
  const [fromWebsite, setFromWebsite] = useState("www.zenpay.site")
  const [fromTaxId, setFromTaxId] = useState("TAX-12345678")

  // Bill To Info
  const [billToName, setBillToName] = useState("[Client Name]")
  const [billToEmail, setBillToEmail] = useState("client@example.com")
  const [billToAddress, setBillToAddress] = useState("Client Street Address")
  const [invoiceSubject, setInvoiceSubject] = useState("[Invoice Subject line]")

  // Invoice Details
  const [invoiceNumber, setInvoiceNumber] = useState("#00018446")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [invoiceDueDate, setInvoiceDueDate] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("7 DAYS FROM ISSUE DATE")
  const [bankAccount, setBankAccount] = useState("BANK ACCOUNT NAME")
  const [bankAccountNumber, setBankAccountNumber] = useState("123-456-7890")
  const [bankSortCode, setBankSortCode] = useState("12-34-56")

  // Terms and conditions
  const [termsAndConditions, setTermsAndConditions] = useState(
    "1. This agreement is between the undersigned parties.\n" +
    "2. The Client agrees to pay in full deposit upon signing this agreement. Work will not commence until the deposit is received.\n" +
    "3. All work will be carried out in accordance with agreed specifications.\n" +
    "4. Late payments will be charged at 5% interest per month.\n" +
    "5. Cancellation fees may apply if project is cancelled after work has commenced.\n" +
    "6. ZenPay owns copyright of all work created until payment is received in full."
  )

  // Invoice Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { 
      id: "1", 
      description: "Project Item One\nSub Item One\nSub Item Two", 
      rate: 3000, 
      quantity: 1, 
      amount: 3000 
    },
    { 
      id: "2", 
      description: "Project Item Two\nSub Item One\nSub Item Two", 
      rate: 3000, 
      quantity: 1, 
      amount: 3000 
    }
  ])

  // Calculated Totals
  const [subtotal, setSubtotal] = useState(6000)
  const [tax, setTax] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(6000)

  // Calculate totals whenever items, tax or discount change
  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + item.rate * item.quantity, 0)
    setSubtotal(newSubtotal)
    
    const newTotal = newSubtotal + tax + shipping - discount
    setTotal(newTotal)
  }, [items, tax, shipping, discount])

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          
          // Recalculate amount if rate or quantity changes
          if (field === 'rate' || field === 'quantity') {
            updatedItem.amount = updatedItem.rate * updatedItem.quantity
          }
          
          return updatedItem
        }
        return item
      })
    )
  }

  const addItem = () => {
    const newId = (items.length + 1).toString()
    setItems([...items, { id: newId, description: "", rate: 0, quantity: 1, amount: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Format dates for display
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  
  // Set initial date values
  useEffect(() => {
    const today = new Date()
    setInvoiceDate(today.toISOString().split('T')[0])
    
    // Set due date to 7 days from today
    const dueDate = new Date()
    dueDate.setDate(today.getDate() + 7)
    setInvoiceDueDate(dueDate.toISOString().split('T')[0])
  }, [])

  // Generate QR code placeholder
  const qrCodePlaceholder = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22monospace%22%20font-size%3D%2220px%22%20fill%3D%22%23999%22%3EQR%3C%2Ftext%3E%3C%2Fsvg%3E"

  return (
    <div className={cn(
      "min-h-screen transition-colors",
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-black'
    )}>
      <div className="container py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-6">
            <div className={cn(
              "p-8 rounded-lg",
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white shadow-md'
            )}>
              {/* Studio Name */}
              <div className="mb-6">
                <Label htmlFor="studio-name" className="text-lg font-bold">Studio Name</Label>
                <Input
                  id="studio-name"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className={cn(
                    "text-xl font-bold mt-2",
                    theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                  )}
                />
              </div>

              {/* Invoice Details Section */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <Label htmlFor="invoice-date">Invoice Date</Label>
                  <Input
                    id="invoice-date"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="invoice-number">Invoice Number</Label>
                <Input
                    id="invoice-number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                />
              </div>
            </div>

              {/* Client and Subject */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <Label htmlFor="client-name">Client Name</Label>
                <Input
                    id="client-name"
                    value={billToName}
                    onChange={(e) => setBillToName(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                />
              </div>
                <div>
                  <Label htmlFor="invoice-subject">Invoice Subject</Label>
                <Input
                    id="invoice-subject"
                    value={invoiceSubject}
                    onChange={(e) => setInvoiceSubject(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                />
              </div>
            </div>

              {/* Line Items */}
              <div className="mb-6">
                <Label className="text-lg font-bold">Invoice Items</Label>
                
                <div className={cn(
                  "mt-4 rounded-md",
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                )}>
                  <div className="grid grid-cols-12 gap-2 p-4 font-bold text-sm border-b border-gray-700">
                    <div className="col-span-6">DESCRIPTION</div>
                    <div className="col-span-1 text-center">QTY</div>
                    <div className="col-span-2 text-center">RATE</div>
                    <div className="col-span-2 text-center">AMOUNT</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  {items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 p-4 border-b border-gray-700">
                      <div className="col-span-6">
                        <Textarea 
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Item description"
                          className={cn(
                            "min-h-[80px] resize-none",
                            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          min="1"
                          className={cn(
                            "text-center",
                            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                          )}
                />
              </div>
                      <div className="col-span-2">
                <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className={cn(
                            "text-center",
                            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                          )}
                />
              </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <span className="font-mono">{item.amount.toFixed(2)}</span>
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
              </div>
            </div>
                  ))}
                  
                  <div className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addItem}
                      className={cn(
                        "flex items-center",
                        theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'
                      )}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6">
                <div className="w-1/3 space-y-2">
                  <div className="flex justify-between">
                    <Label>Subtotal</Label>
                    <span className="font-mono">{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label>Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                      className={cn(
                        "w-20 text-right",
                        theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Label>Shipping</Label>
                    <Input
                      type="number"
                      value={shipping}
                      onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                      className={cn(
                        "w-20 text-right",
                        theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Label>Discount</Label>
                    <Input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className={cn(
                        "w-20 text-right",
                        theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                      )}
                    />
                  </div>
                  <Separator className={theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'} />
                  <div className="flex justify-between font-bold">
                    <Label>BALANCE DUE</Label>
                    <span className="font-mono">{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

              {/* Payment Terms */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <Label htmlFor="payment-terms">Payment Terms</Label>
                  <Input
                    id="payment-terms"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="bank-account">Bank Account Name</Label>
                <Input
                    id="bank-account"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                  />
              </div>
            </div>

              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <Label htmlFor="account-number">Account Number</Label>
                <Input
                    id="account-number"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                />
              </div>
                <div>
                  <Label htmlFor="sort-code">Sort Code</Label>
                <Input
                    id="sort-code"
                    value={bankSortCode}
                    onChange={(e) => setBankSortCode(e.target.value)}
                    className={cn(
                      "mt-2",
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                    )}
                />
              </div>
            </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <Label htmlFor="terms" className="text-lg font-bold">Terms & Conditions</Label>
              <Textarea
                  id="terms"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  className={cn(
                    "mt-2 min-h-[150px]",
                    theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("preview")}
                  className={cn(
                    theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'
                  )}
                >
                  Preview Invoice
                </Button>
                <Button
                  variant="default"
                  className={cn(
                    theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
                  )}
                >
                  Send Invoice
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            {/* Invoice Preview */}
            <div className={cn(
              "p-8 rounded-lg overflow-hidden",
              theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black shadow-md'
            )}>
              {/* Company Header */}
              <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight border border-gray-500 p-2 inline-block mb-6">
                  {fromName}
                </h1>
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-sm">
                      {formatDate(invoiceDate)}<br />
                      {billToName}
            </div>
          </div>
                  <div className="text-right space-y-1">
                    <div className="text-4xl font-bold">INVOICE</div>
                    <div className="text-sm">
                      {invoiceNumber}<br />
                      {invoiceSubject}
                    </div>
            </div>
            </div>
          </div>

              {/* Line Items Table */}
              <div className="mb-10">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left">
                      <th className="py-2 w-[50%]"></th>
                      <th className="py-2 text-center">QTY</th>
                      <th className="py-2 text-center">RATE</th>
                      <th className="py-2 text-right">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-t border-gray-700">
                        <td className="py-4 align-top whitespace-pre-line">{item.description}</td>
                        <td className="py-4 text-center align-top">{item.quantity}</td>
                        <td className="py-4 text-center align-top">{item.rate.toFixed(2)}</td>
                        <td className="py-4 text-right align-top">{item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </div>

              {/* Totals */}
              <div className="flex justify-end mb-20">
                <div className="w-1/3 space-y-1 text-right">
                  <div className="grid grid-cols-2">
                    <div className="text-left uppercase">Sub Total</div>
                    <div>{subtotal.toFixed(2)}</div>
          </div>
                  <div className="grid grid-cols-2">
                    <div className="text-left uppercase">Tax Rate (%)</div>
                    <div>{tax.toFixed(2)}</div>
          </div>
                  <div className="grid grid-cols-2">
                    <div className="text-left uppercase">Shipping</div>
                    <div>{shipping.toFixed(2)}</div>
      </div>
                  <div className="grid grid-cols-2">
                    <div className="text-left uppercase">Discount</div>
                    <div>{discount.toFixed(2)}</div>
    </div>
                  <div className="grid grid-cols-2 font-bold border-t border-gray-700 pt-1">
                    <div className="text-left uppercase">Balance Due (USD)</div>
                    <div>{total.toFixed(2)}</div>
          </div>
          </div>
        </div>

              {/* Payment Section */}
              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between">
                  <div className="w-1/2">
                    <h2 className="text-2xl font-bold mb-4">PAYMENT</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="mb-1 text-sm uppercase">Bank Transfer</div>
                        <div className="space-y-1 text-sm">
                          <div>{bankAccount}</div>
                          <div>{bankAccountNumber}</div>
                          <div>{bankSortCode}</div>
                        </div>
                      </div>
          <div>
                        <div className="mb-1 text-sm uppercase">Details</div>
                        <div className="space-y-1 text-sm">
                          <div>Terms: {paymentTerms}</div>
                          <div>Reference: {invoiceNumber}</div>
                        </div>
          </div>
          </div>
        </div>

                  <div className="flex items-start space-x-6">
                    <img 
                      src={qrCodePlaceholder} 
                      alt="QR Code" 
                      className="w-24 h-24 object-contain border border-gray-700"
                    />
                    <div className="max-w-xs text-xs space-y-2">
                      <div className="font-bold uppercase">Terms & Conditions</div>
                      <div className="whitespace-pre-line leading-tight">{termsAndConditions}</div>
                    </div>
          </div>
            </div>
          </div>
        </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("form")}
                className={cn(
                  theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'
                )}
              >
                Edit Invoice
              </Button>
              <Button
                variant="default"
                className={cn(
                  theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
                )}
              >
                Download PDF
              </Button>
          </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
