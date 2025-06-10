"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import InvoiceForm from "@/components/invoice-form"
import InvoicePreview from "@/components/invoice-preview"
import TemplateSelector from "@/components/template-selector"
import type { InvoiceData, InvoiceTemplate } from "@/lib/types"
import { defaultInvoiceData } from "@/lib/defaults"
import { generatePDF, generateDOCX } from "@/lib/document-generator"
import { toast } from "@/components/ui/use-toast"

export default function InvoiceCreator() {
  const [activeTab, setActiveTab] = useState<string>("edit")
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData)
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplate>("modern")
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [signature, setSignature] = useState<string | null>(null)

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(invoiceData, selectedTemplate, companyLogo, signature)
      toast({
        title: "Success",
        description: "Invoice PDF has been downloaded",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      })
    }
  }

  const handleDownloadDOCX = async () => {
    try {
      await generateDOCX(invoiceData, selectedTemplate, companyLogo, signature)
      toast({
        title: "Success",
        description: "Invoice DOCX has been downloaded",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate DOCX",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
          <TabsTrigger
            value="edit"
            className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Edit Invoice
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-4">
          <InvoiceForm
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            companyLogo={companyLogo}
            setCompanyLogo={setCompanyLogo}
            signature={signature}
            setSignature={setSignature}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <InvoicePreview
            invoiceData={invoiceData}
            template={selectedTemplate}
            companyLogo={companyLogo}
            signature={signature}
          />

          <div className="flex flex-wrap gap-4 mt-6">
            <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white">
              Download as PDF
            </Button>
            <Button
              onClick={handleDownloadDOCX}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Download as DOCX
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
