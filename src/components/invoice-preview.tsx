"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { InvoiceData, InvoiceTemplate } from "@/lib/types"
import ModernTemplate from "@/components/templates/modern-template"
import ClassicTemplate from "@/components/templates/classic-template"
import MinimalTemplate from "@/components/templates/minimal-template"
import CreativeTemplate from "@/components/templates/creative-template"
import ElegantTemplate from "@/components/templates/elegant-template"
import BoldTemplate from "@/components/templates/bold-template"

interface InvoicePreviewProps {
  invoiceData: InvoiceData
  template: InvoiceTemplate
  companyLogo: string | null
  signature: string | null
}

export default function InvoicePreview({ invoiceData, template, companyLogo, signature }: InvoicePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate invoiceData={invoiceData} companyLogo={companyLogo} signature={signature} />
      case "classic":
        return <ClassicTemplate invoiceData={invoiceData} companyLogo={companyLogo} signature={signature} />
      case "minimal":
        return <MinimalTemplate invoiceData={invoiceData} companyLogo={companyLogo} signature={signature} />
      case "creative":
        return <CreativeTemplate invoiceData={invoiceData} companyLogo={companyLogo} signature={signature} />
      case "elegant":
        return <ElegantTemplate invoiceData={invoiceData} companyLogo={companyLogo} signature={signature} />
      case "bold":
        return <BoldTemplate invoiceData={invoiceData} companyLogo={companyLogo} signature={signature} />
      default:
        return <div className="text-red-600">Template not found</div>
    }
  }

  return (
    <Card className="border-2 border-gray-200">
      <CardContent className="p-0">
        <div className="bg-white rounded-md overflow-hidden" id="invoice-preview">
          {renderTemplate()}
        </div>
      </CardContent>
    </Card>
  )
}
