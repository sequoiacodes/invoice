import type { InvoiceData } from "./types"

export const defaultInvoiceData: InvoiceData = {
  // Company information
  companyName: "Your Company Name",
  companyAddress: "123 Business Street\nCity, State 12345",
  companyPhone: "(123) 456-7890",
  companyEmail: "contact@yourcompany.com",

  // Client information
  clientName: "Client Name",
  clientAddress: "456 Client Avenue\nClient City, State 67890",
  clientPhone: "(098) 765-4321",
  clientEmail: "client@example.com",

  // Invoice details
  invoiceNumber: "INV-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  items: [
    {
      description: "Product or Service",
      quantity: 1,
      price: 100,
    },
  ],
  taxRate: 10,
  currency: "NRS ",
  notes: "Thank you for your business!",

  // Calculated totals
  subtotal: 100,
  tax: 10,
  total: 110,
}
