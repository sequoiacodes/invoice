"use client"

import type { InvoiceData } from "@/lib/types"
import { formatCurrency, numberToWords } from "@/lib/utils"

interface ModernTemplateProps {
  invoiceData: InvoiceData
  companyLogo: string | null
  signature: string | null
}

export default function ModernTemplate({ invoiceData, companyLogo, signature }: ModernTemplateProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          {companyLogo ? (
            <img
              src={companyLogo || "/placeholder.svg"}
              alt="Company Logo"
              className="h-12 object-contain mb-2"
              style={{ maxHeight: "48px" }}
            />
          ) : (
            <h1 className="text-xl font-bold" style={{ color: "#1f2937", fontSize: "20px", fontWeight: "bold" }}>
              {invoiceData.companyName}
            </h1>
          )}
          <div className="text-xs mt-2" style={{ color: "#4b5563", fontSize: "12px" }}>
            <p>{invoiceData.companyAddress}</p>
            <p>{invoiceData.companyPhone}</p>
            <p>{invoiceData.companyEmail}</p>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-xl font-bold mb-2" style={{ color: "#1f2937", fontSize: "20px", fontWeight: "bold" }}>
            INVOICE
          </h1>
          <div className="text-xs" style={{ fontSize: "12px" }}>
            <p>
              <span className="font-semibold" style={{ fontWeight: "600" }}>
                Invoice #:
              </span>{" "}
              {invoiceData.invoiceNumber}
            </p>
            <p>
              <span className="font-semibold" style={{ fontWeight: "600" }}>
                Date:
              </span>{" "}
              {invoiceData.invoiceDate}
            </p>
            <p>
              <span className="font-semibold" style={{ fontWeight: "600" }}>
                Due Date:
              </span>{" "}
              {invoiceData.dueDate}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div
          className="p-3 rounded-lg border"
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe", padding: "12px" }}
        >
          <h2 className="text-sm font-semibold mb-2" style={{ color: "#1e40af", fontSize: "14px", fontWeight: "600" }}>
            Bill To:
          </h2>
          <div className="text-xs" style={{ fontSize: "12px" }}>
            <p className="font-medium" style={{ color: "#1f2937", fontWeight: "500" }}>
              {invoiceData.clientName}
            </p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientAddress}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientPhone}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientEmail}</p>
          </div>
        </div>

        <div
          className="p-3 rounded-lg border"
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe", padding: "12px" }}
        >
          <h2 className="text-sm font-semibold mb-2" style={{ color: "#1e40af", fontSize: "14px", fontWeight: "600" }}>
            Payment Details:
          </h2>
          <div className="text-xs" style={{ fontSize: "12px" }}>
            <p>
              <span className="font-medium" style={{ fontWeight: "500" }}>
                Total Due:
              </span>{" "}
              {formatCurrency(invoiceData.total, invoiceData.currency)}
            </p>
            <p>
              <span className="font-medium" style={{ fontWeight: "500" }}>
                Currency:
              </span>{" "}
              {invoiceData.currency}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <table className="w-full border-collapse" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#dbeafe" }}>
              <th
                className="py-2 px-3 text-left font-semibold"
                style={{
                  color: "#1e40af",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                Description
              </th>
              <th
                className="py-2 px-3 text-right font-semibold"
                style={{
                  color: "#1e40af",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "8px 12px",
                  textAlign: "right",
                }}
              >
                Quantity
              </th>
              <th
                className="py-2 px-3 text-right font-semibold"
                style={{
                  color: "#1e40af",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "8px 12px",
                  textAlign: "right",
                }}
              >
                Price
              </th>
              <th
                className="py-2 px-3 text-right font-semibold"
                style={{
                  color: "#1e40af",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "8px 12px",
                  textAlign: "right",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #bfdbfe" }}>
                <td className="py-2 px-3" style={{ color: "#1f2937", fontSize: "11px", padding: "8px 12px" }}>
                  {item.description}
                </td>
                <td
                  className="py-2 px-3 text-right"
                  style={{ color: "#4b5563", fontSize: "11px", padding: "8px 12px", textAlign: "right" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-2 px-3 text-right"
                  style={{ color: "#4b5563", fontSize: "11px", padding: "8px 12px", textAlign: "right" }}
                >
                  {formatCurrency(item.price, invoiceData.currency)}
                </td>
                <td
                  className="py-2 px-3 text-right font-medium"
                  style={{
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
                    fontWeight: "500",
                  }}
                >
                  {formatCurrency(item.quantity * item.price, invoiceData.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-6">
        <div style={{ width: "200px" }}>
          <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
            <span className="font-medium" style={{ color: "#374151", fontSize: "12px", fontWeight: "500" }}>
              Subtotal:
            </span>
            <span style={{ color: "#1f2937", fontSize: "12px" }}>
              {formatCurrency(invoiceData.subtotal, invoiceData.currency)}
            </span>
          </div>
          <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
            <span className="font-medium" style={{ color: "#374151", fontSize: "12px", fontWeight: "500" }}>
              Tax ({invoiceData.taxRate}%):
            </span>
            <span style={{ color: "#1f2937", fontSize: "12px" }}>
              {formatCurrency(invoiceData.tax, invoiceData.currency)}
            </span>
          </div>
          <div
            className="flex justify-between py-1 border-t font-bold"
            style={{ padding: "4px 0", borderTop: "1px solid #93c5fd", fontWeight: "bold" }}
          >
            <span style={{ color: "#1e40af", fontSize: "12px" }}>Total:</span>
            <span style={{ color: "#1e40af", fontSize: "12px" }}>
              {formatCurrency(invoiceData.total, invoiceData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Total Amount in Words */}
      <div
        className="mb-6 p-3 rounded border-l-4"
        style={{ backgroundColor: "#eff6ff", borderLeft: "4px solid #3b82f6", padding: "12px" }}
      >
        <div style={{ fontSize: "11px" }}>
          <span className="font-semibold" style={{ color: "#1e40af", fontWeight: "600" }}>
            Amount in Words:{" "}
          </span>
          <span className="capitalize" style={{ color: "#1d4ed8", textTransform: "capitalize" }}>
            {numberToWords(invoiceData.total)} {invoiceData.currency} Only
          </span>
        </div>
      </div>

      <div className="border-t pt-4" style={{ borderTop: "1px solid #bfdbfe", paddingTop: "16px" }}>
        {invoiceData.notes && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2" style={{ color: "#1f2937", fontSize: "12px", fontWeight: "600" }}>
              Notes:
            </h3>
            <p style={{ color: "#4b5563", fontSize: "11px" }}>{invoiceData.notes}</p>
          </div>
        )}

        <div className="mt-6">
          {signature ? (
            <div>
              <img
                src={signature || "/placeholder.svg"}
                alt="Signature"
                className="h-12 object-contain mb-2"
                style={{ maxHeight: "48px" }}
              />
              <div style={{ width: "150px", borderTop: "1px solid #60a5fa", paddingTop: "4px" }}>
                <p style={{ fontSize: "10px", color: "#4b5563" }}>Authorized Signature</p>
              </div>
            </div>
          ) : (
            <div style={{ width: "150px", borderTop: "1px solid #60a5fa", paddingTop: "4px" }}>
              <p style={{ fontSize: "10px", color: "#4b5563" }}>Authorized Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
