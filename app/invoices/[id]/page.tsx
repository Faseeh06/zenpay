import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Send } from "lucide-react"
import Link from "next/link"
import InvoicePreview from "@/components/invoice-preview"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const downloadPdf = (invoiceId: string) => {
    const input = document.getElementById('invoice-preview-wrapper');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const widthInPdf = pdfWidth;
        const heightInPdf = widthInPdf / ratio;

        // Check if content fits, if not, scale to fit height (could also add pages)
        if (heightInPdf > pdfHeight) {
            // For now, let's just log this, or implement multi-page later if needed
            console.warn("Content might be too tall for a single PDF page.");
        }

        pdf.addImage(imgData, 'PNG', 0, 0, widthInPdf, heightInPdf);
        pdf.save(`invoice-${invoiceId}.pdf`);
      });
    } else {
      console.error("Element with ID 'invoice-preview-wrapper' not found.");
    }
  };

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
            <Button variant="outline" onClick={() => downloadPdf(params.id)}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          </div>
        </div>

        <div id="invoice-preview-wrapper">
          <Card className="bg-black border-gray-800">
            <CardContent className="p-6">
              <InvoicePreview id={params.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
