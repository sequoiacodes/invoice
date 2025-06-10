export type InvoiceTemplate = "modern" | "classic" | "minimal" | "creative" | "elegant" | "bold"

export interface InvoiceItem {
  description: string
  quantity: number
  price: number
}

export interface InvoiceData {
  // Company information
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string

  // Client information
  clientName: string
  clientAddress: string
  clientPhone: string
  clientEmail: string

  // Invoice details
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  items: InvoiceItem[]
  taxRate: number
  currency: string
  notes: string

  // Calculated totals
  subtotal: number
  tax: number
  total: number
}
