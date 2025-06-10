"use client"

import type { InvoiceData } from "@/lib/types"
import { formatCurrency, numberToWords } from "@/lib/utils"

interface MinimalTemplateProps {
  invoiceData: InvoiceData
  companyLogo: string | null
  signature: string | null
}

export default function MinimalTemplate({ invoiceData, companyLogo, signature }: MinimalTemplateProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      <div className="flex justify-between items-start mb-8">
        <div>
          {companyLogo ? (
            <img
              src={companyLogo || "/placeholder.svg"}
              alt="Company Logo"
              className="h-10 object-contain mb-3"
              style={{ maxHeight: "40px" }}
            />
          ) : (
            <h1 className="text-lg font-medium" style={{ color: "#111827", fontSize: "18px", fontWeight: "500" }}>
              {invoiceData.companyName}
            </h1>
          )}
        </div>

        <div className="text-right">
          <h1 className="text-lg font-medium mb-1" style={{ color: "#111827", fontSize: "18px", fontWeight: "500" }}>
            Invoice
          </h1>
          <p style={{ color: "#6b7280", fontSize: "12px" }}>#{invoiceData.invoiceNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px" }}>From</p>
          <p className="font-medium" style={{ color: "#111827", fontSize: "12px", fontWeight: "500" }}>
            {invoiceData.companyName}
          </p>
          <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.companyAddress}</p>
          <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.companyPhone}</p>
          <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.companyEmail}</p>
        </div>

        <div>
          <p style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px" }}>To</p>
          <p className="font-medium" style={{ color: "#111827", fontSize: "12px", fontWeight: "500" }}>
            {invoiceData.clientName}
          </p>
          <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.clientAddress}</p>
          <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.clientPhone}</p>
          <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.clientEmail}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px" }}>Issue Date</p>
          <p style={{ color: "#1f2937", fontSize: "12px" }}>{invoiceData.invoiceDate}</p>
        </div>

        <div>
          <p style={{ color: "#6b7280", fontSize: "11px", marginBottom: "4px" }}>Due Date</p>
          <p style={{ color: "#1f2937", fontSize: "12px" }}>{invoiceData.dueDate}</p>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full" style={{ width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
              <th
                className="py-2 text-left font-medium"
                style={{ color: "#4b5563", fontSize: "12px", fontWeight: "500", padding: "8px 0", textAlign: "left" }}
              >
                Description
              </th>
              <th
                className="py-2 text-right font-medium"
                style={{ color: "#4b5563", fontSize: "12px", fontWeight: "500", padding: "8px 0", textAlign: "right" }}
              >
                Qty
              </th>
              <th
                className="py-2 text-right font-medium"
                style={{ color: "#4b5563", fontSize: "12px", fontWeight: "500", padding: "8px 0", textAlign: "right" }}
              >
                Price
              </th>
              <th
                className="py-2 text-right font-medium"
                style={{ color: "#4b5563", fontSize: "12px", fontWeight: "500", padding: "8px 0", textAlign: "right" }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td className="py-3" style={{ color: "#1f2937", fontSize: "11px", padding: "12px 0" }}>
                  {item.description}
                </td>
                <td
                  className="py-3 text-right"
                  style={{ color: "#374151", fontSize: "11px", padding: "12px 0", textAlign: "right" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-3 text-right"
                  style={{ color: "#374151", fontSize: "11px", padding: "12px 0", textAlign: "right" }}
                >
                  {formatCurrency(item.price, invoiceData.currency)}
                </td>
                <td
                  className="py-3 text-right"
                  style={{ color: "#1f2937", fontSize: "11px", padding: "12px 0", textAlign: "right" }}
                >
                  {formatCurrency(item.quantity * item.price, invoiceData.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div style={{ width: "200px" }}>
          <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
            <span style={{ color: "#4b5563", fontSize: "12px" }}>Subtotal</span>
            <span style={{ color: "#1f2937", fontSize: "12px" }}>
              {formatCurrency(invoiceData.subtotal, invoiceData.currency)}
            </span>
          </div>
          <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
            <span style={{ color: "#4b5563", fontSize: "12px" }}>Tax ({invoiceData.taxRate}%)</span>
            <span style={{ color: "#1f2937", fontSize: "12px" }}>
              {formatCurrency(invoiceData.tax, invoiceData.currency)}
            </span>
          </div>
          <div
            className="flex justify-between py-1 border-t font-medium"
            style={{ padding: "4px 0", borderTop: "1px solid #d1d5db", fontWeight: "500" }}
          >
            <span style={{ color: "#1f2937", fontSize: "12px" }}>Total</span>
            <span style={{ color: "#1f2937", fontSize: "12px" }}>
              {formatCurrency(invoiceData.total, invoiceData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Total Amount in Words */}
      <div
        className="mb-8 p-3 rounded border"
        style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "12px" }}
      >
        <div style={{ fontSize: "11px" }}>
          <span className="font-medium" style={{ color: "#374151", fontWeight: "500" }}>
            Amount in Words:{" "}
          </span>
          <span className="capitalize" style={{ color: "#1f2937", textTransform: "capitalize" }}>
            {numberToWords(invoiceData.total)} {invoiceData.currency} Only
          </span>
        </div>
      </div>

      {invoiceData.notes && (
        <div className="mb-8">
          <p style={{ color: "#4b5563", fontSize: "11px", marginBottom: "4px" }}>Notes</p>
          <p style={{ color: "#1f2937", fontSize: "11px" }}>{invoiceData.notes}</p>
        </div>
      )}

      <div className="mt-8">
        {signature ? (
          <div>
            <img
              src={signature || "/placeholder.svg"}
              alt="Signature"
              className="h-10 object-contain mb-2"
              style={{ maxHeight: "40px" }}
            />
            <div style={{ width: "150px", borderTop: "1px solid #d1d5db", paddingTop: "4px" }}>
              <p style={{ fontSize: "10px", color: "#6b7280" }}>Authorized Signature</p>
            </div>
          </div>
        ) : (
          <div style={{ width: "150px", borderTop: "1px solid #d1d5db", paddingTop: "4px" }}>
            <p style={{ fontSize: "10px", color: "#6b7280" }}>Authorized Signature</p>
          </div>
        )}
      </div>
    </div>
  )
}
