"use client"

import type { InvoiceData } from "@/lib/types"
import { formatCurrency, numberToWords } from "@/lib/utils"

interface CreativeTemplateProps {
  invoiceData: InvoiceData
  companyLogo: string | null
  signature: string | null
}

export default function CreativeTemplate({ invoiceData, companyLogo, signature }: CreativeTemplateProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      {/* Header with purple background */}
      <div className="p-4 rounded-t-lg mb-6" style={{ backgroundColor: "#9333ea", color: "#ffffff", padding: "16px" }}>
        <div className="flex justify-between items-start">
          <div>
            {companyLogo ? (
              <img
                src={companyLogo || "/placeholder.svg"}
                alt="Company Logo"
                className="h-12 object-contain mb-2 p-2 rounded"
                style={{ maxHeight: "48px", backgroundColor: "#ffffff", padding: "8px", borderRadius: "4px" }}
              />
            ) : (
              <h1 className="text-lg font-bold" style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>
                {invoiceData.companyName}
              </h1>
            )}
            <div style={{ color: "#e9d5ff", fontSize: "11px", marginTop: "8px" }}>
              <p>{invoiceData.companyAddress}</p>
              <p>
                {invoiceData.companyPhone} | {invoiceData.companyEmail}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold mb-2" style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
              INVOICE
            </h1>
            <div
              className="px-2 py-1 rounded"
              style={{ backgroundColor: "#ffffff", color: "#7c3aed", padding: "4px 8px", borderRadius: "4px" }}
            >
              <span className="font-semibold" style={{ fontWeight: "600", fontSize: "12px" }}>
                #{invoiceData.invoiceNumber}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div
          className="p-3 rounded-lg border"
          style={{ backgroundColor: "#f3e8ff", padding: "12px", borderColor: "#c4b5fd" }}
        >
          <h2 className="text-sm font-semibold mb-2" style={{ color: "#6b21a8", fontSize: "14px", fontWeight: "600" }}>
            Bill To:
          </h2>
          <div style={{ fontSize: "12px" }}>
            <p className="font-medium" style={{ color: "#1f2937", fontWeight: "500" }}>
              {invoiceData.clientName}
            </p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientAddress}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientPhone}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientEmail}</p>
          </div>
        </div>

        <div style={{ fontSize: "12px" }}>
          <div className="flex justify-between" style={{ marginBottom: "8px" }}>
            <span className="font-medium" style={{ color: "#4b5563", fontWeight: "500" }}>
              Issue Date:
            </span>
            <span style={{ color: "#1f2937" }}>{invoiceData.invoiceDate}</span>
          </div>
          <div className="flex justify-between" style={{ marginBottom: "8px" }}>
            <span className="font-medium" style={{ color: "#4b5563", fontWeight: "500" }}>
              Due Date:
            </span>
            <span style={{ color: "#1f2937" }}>{invoiceData.dueDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: "#4b5563", fontWeight: "500" }}>
              Currency:
            </span>
            <span style={{ color: "#1f2937" }}>{invoiceData.currency}</span>
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="mb-6">
        <table className="w-full border-collapse" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#9333ea", color: "#ffffff" }}>
              <th
                className="py-2 px-3 text-left font-semibold"
                style={{ fontSize: "12px", fontWeight: "600", padding: "8px 12px", textAlign: "left" }}
              >
                Description
              </th>
              <th
                className="py-2 px-3 text-right font-semibold"
                style={{ fontSize: "12px", fontWeight: "600", padding: "8px 12px", textAlign: "right" }}
              >
                Qty
              </th>
              <th
                className="py-2 px-3 text-right font-semibold"
                style={{ fontSize: "12px", fontWeight: "600", padding: "8px 12px", textAlign: "right" }}
              >
                Price
              </th>
              <th
                className="py-2 px-3 text-right font-semibold"
                style={{ fontSize: "12px", fontWeight: "600", padding: "8px 12px", textAlign: "right" }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#faf5ff" : "#ffffff" }}>
                <td
                  className="py-2 px-3 border-b"
                  style={{ color: "#1f2937", fontSize: "11px", padding: "8px 12px", borderBottom: "1px solid #c4b5fd" }}
                >
                  {item.description}
                </td>
                <td
                  className="py-2 px-3 text-right border-b"
                  style={{
                    color: "#374151",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
                    borderBottom: "1px solid #c4b5fd",
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-2 px-3 text-right border-b"
                  style={{
                    color: "#374151",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
                    borderBottom: "1px solid #c4b5fd",
                  }}
                >
                  {formatCurrency(item.price, invoiceData.currency)}
                </td>
                <td
                  className="py-2 px-3 text-right border-b font-medium"
                  style={{
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
                    borderBottom: "1px solid #c4b5fd",
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

      {/* Totals */}
      <div className="flex justify-end mb-6">
        <div style={{ width: "240px" }}>
          <div
            className="p-3 rounded-lg border"
            style={{ backgroundColor: "#f3e8ff", padding: "12px", borderColor: "#c4b5fd" }}
          >
            <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
              <span style={{ color: "#4b5563", fontSize: "12px" }}>Subtotal:</span>
              <span className="font-medium" style={{ color: "#1f2937", fontSize: "12px", fontWeight: "500" }}>
                {formatCurrency(invoiceData.subtotal, invoiceData.currency)}
              </span>
            </div>
            <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
              <span style={{ color: "#4b5563", fontSize: "12px" }}>Tax ({invoiceData.taxRate}%):</span>
              <span className="font-medium" style={{ color: "#1f2937", fontSize: "12px", fontWeight: "500" }}>
                {formatCurrency(invoiceData.tax, invoiceData.currency)}
              </span>
            </div>
            <div
              className="border-t pt-2 mt-2"
              style={{ borderTop: "1px solid #a855f7", paddingTop: "8px", marginTop: "8px" }}
            >
              <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
                <span className="text-sm font-bold" style={{ color: "#6b21a8", fontSize: "14px", fontWeight: "bold" }}>
                  Total:
                </span>
                <span className="text-sm font-bold" style={{ color: "#6b21a8", fontSize: "14px", fontWeight: "bold" }}>
                  {formatCurrency(invoiceData.total, invoiceData.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Amount in Words */}
      <div
        className="mb-6 p-3 rounded border-l-4"
        style={{ backgroundColor: "#f3e8ff", borderLeft: "4px solid #8b5cf6", padding: "12px" }}
      >
        <div style={{ fontSize: "11px" }}>
          <span className="font-semibold" style={{ color: "#6b21a8", fontWeight: "600" }}>
            Amount in Words:{" "}
          </span>
          <span className="capitalize" style={{ color: "#7c3aed", textTransform: "capitalize" }}>
            {numberToWords(invoiceData.total)} {invoiceData.currency} Only
          </span>
        </div>
      </div>

      {/* Notes and signature */}
      <div className="border-t pt-4" style={{ borderTop: "1px solid #c4b5fd", paddingTop: "16px" }}>
        {invoiceData.notes && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2" style={{ color: "#6b21a8", fontSize: "12px", fontWeight: "600" }}>
              Notes:
            </h3>
            <p
              className="p-2 rounded border"
              style={{
                fontSize: "11px",
                color: "#4b5563",
                backgroundColor: "#f3e8ff",
                padding: "8px",
                borderColor: "#c4b5fd",
              }}
            >
              {invoiceData.notes}
            </p>
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
              <div style={{ width: "150px", borderTop: "1px solid #a855f7", paddingTop: "4px" }}>
                <p style={{ fontSize: "10px", color: "#4b5563" }}>Authorized Signature</p>
              </div>
            </div>
          ) : (
            <div style={{ width: "150px", borderTop: "1px solid #a855f7", paddingTop: "4px" }}>
              <p style={{ fontSize: "10px", color: "#4b5563" }}>Authorized Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
