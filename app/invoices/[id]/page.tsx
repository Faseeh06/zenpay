import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Send } from "lucide-react"
import Link from "next/link"
import InvoicePreview from "@/components/invoice-preview"

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Link href="/invoices">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Invoice {params.id}</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          </div>
        </div>

        <Card className="bg-black border-gray-800">
          <CardContent className="p-6">
            <InvoicePreview id={params.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
