"use client"

import type React from "react"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { InvoiceData } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"
import { calculateSubtotal, calculateTax, calculateTotal } from "@/lib/calculations"
import ImageUploader from "@/components/image-uploader"

interface InvoiceFormProps {
  invoiceData: InvoiceData
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>
  companyLogo: string | null
  setCompanyLogo: React.Dispatch<React.SetStateAction<string | null>>
  signature: string | null
  setSignature: React.Dispatch<React.SetStateAction<string | null>>
}

export default function InvoiceForm({
  invoiceData,
  setInvoiceData,
  companyLogo,
  setCompanyLogo,
  signature,
  setSignature,
}: InvoiceFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInvoiceData((prev) => ({ ...prev, [name]: value }))
  }

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }],
    }))
  }

  const removeItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index: number, field: string, value: string | number) => {
    setInvoiceData((prev) => {
      const newItems = [...prev.items]
      newItems[index] = { ...newItems[index], [field]: value }
      return { ...prev, items: newItems }
    })
  }

  // Calculate totals using useEffect to avoid state updates during render
  useEffect(() => {
    const subtotal = calculateSubtotal(invoiceData.items)
    const tax = calculateTax(subtotal, invoiceData.taxRate)
    const total = calculateTotal(subtotal, tax)

    // Only update if values have changed to prevent infinite loops
    if (invoiceData.subtotal !== subtotal || invoiceData.tax !== tax || invoiceData.total !== total) {
      setInvoiceData((prev) => ({
        ...prev,
        subtotal,
        tax,
        total,
      }))
    }
  }, [invoiceData.items, invoiceData.taxRate, invoiceData.subtotal, invoiceData.tax, invoiceData.total, setInvoiceData])

  return (
    <div className="space-y-8 text-black dark:text-white">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" value={invoiceData.companyName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Company Logo</Label>
              <ImageUploader image={companyLogo} setImage={setCompanyLogo} label="Upload Logo" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                name="companyAddress"
                value={invoiceData.companyAddress}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Phone</Label>
                <Input id="companyPhone" name="companyPhone" value={invoiceData.companyPhone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Email</Label>
                <Input id="companyEmail" name="companyEmail" value={invoiceData.companyEmail} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" name="clientName" value={invoiceData.clientName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Textarea
                id="clientAddress"
                name="clientAddress"
                value={invoiceData.clientAddress}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Phone</Label>
                <Input id="clientPhone" name="clientPhone" value={invoiceData.clientPhone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <Input id="clientEmail" name="clientEmail" value={invoiceData.clientEmail} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                name="invoiceDate"
                type="date"
                value={invoiceData.invoiceDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" name="dueDate" type="date" value={invoiceData.dueDate} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Items</Label>
            <div className="space-y-4">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(index)} className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input id="taxRate" name="taxRate" type="number" value={invoiceData.taxRate} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" name="currency" value={invoiceData.currency} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" value={invoiceData.notes} onChange={handleChange} rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Signature</Label>
            <ImageUploader image={signature} setImage={setSignature} label="Upload Signature" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>
                {invoiceData.currency} {invoiceData.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({invoiceData.taxRate}%):</span>
              <span>
                {invoiceData.currency} {invoiceData.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>
                {invoiceData.currency} {invoiceData.total.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
