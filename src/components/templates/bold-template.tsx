"use client"

import type { InvoiceData } from "@/lib/types"
import { formatCurrency, numberToWords } from "@/lib/utils"

interface BoldTemplateProps {
  invoiceData: InvoiceData
  companyLogo: string | null
  signature: string | null
}

export default function BoldTemplate({ invoiceData, companyLogo, signature }: BoldTemplateProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      {/* Bold header with orange accent */}
      <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: "#f97316", color: "#ffffff", padding: "24px" }}>
        <div className="flex justify-between items-center">
          <div>
            {companyLogo ? (
              <div
                className="p-2 rounded-lg inline-block mb-3"
                style={{ backgroundColor: "#ffffff", padding: "8px", borderRadius: "8px" }}
              >
                <img
                  src={companyLogo || "/placeholder.svg"}
                  alt="Company Logo"
                  className="h-10 w-auto object-contain"
                  style={{ maxHeight: "40px", maxWidth: "100px" }}
                />
              </div>
            ) : (
              <h1 className="text-xl font-bold mb-2" style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
                {invoiceData.companyName}
              </h1>
            )}
            <div style={{ color: "#fed7aa", fontSize: "11px" }}>
              <p>{invoiceData.companyAddress}</p>
              <p>
                {invoiceData.companyPhone} • {invoiceData.companyEmail}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#ffffff", color: "#ea580c", padding: "8px 16px", borderRadius: "8px" }}
            >
              <h1 className="text-lg font-bold" style={{ fontSize: "18px", fontWeight: "bold" }}>
                INVOICE
              </h1>
              <p className="text-sm font-semibold" style={{ fontSize: "14px", fontWeight: "600" }}>
                #{invoiceData.invoiceNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice details in cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className="border p-3 rounded-lg"
          style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa", padding: "12px" }}
        >
          <h3 className="font-bold mb-2" style={{ color: "#9a3412", fontSize: "12px", fontWeight: "bold" }}>
            Bill To
          </h3>
          <div style={{ fontSize: "11px" }}>
            <p className="font-semibold" style={{ color: "#1f2937", fontWeight: "600" }}>
              {invoiceData.clientName}
            </p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientAddress}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientPhone}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientEmail}</p>
          </div>
        </div>

        <div
          className="border p-3 rounded-lg"
          style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb", padding: "12px" }}
        >
          <h3 className="font-bold mb-2" style={{ color: "#1f2937", fontSize: "12px", fontWeight: "bold" }}>
            Invoice Date
          </h3>
          <p className="text-sm font-semibold" style={{ color: "#1f2937", fontSize: "14px", fontWeight: "600" }}>
            {invoiceData.invoiceDate}
          </p>
        </div>

        <div
          className="border p-3 rounded-lg"
          style={{ backgroundColor: "#fef2f2", borderColor: "#fecaca", padding: "12px" }}
        >
          <h3 className="font-bold mb-2" style={{ color: "#991b1b", fontSize: "12px", fontWeight: "bold" }}>
            Due Date
          </h3>
          <p className="text-sm font-semibold" style={{ color: "#991b1b", fontSize: "14px", fontWeight: "600" }}>
            {invoiceData.dueDate}
          </p>
        </div>
      </div>

      {/* Items table with bold styling */}
      <div className="mb-6 overflow-hidden rounded-lg border" style={{ borderColor: "#e5e7eb" }}>
        <table className="w-full" style={{ width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#ea580c", color: "#ffffff" }}>
              <th
                className="py-3 px-4 text-left font-bold"
                style={{ fontSize: "12px", fontWeight: "bold", padding: "12px 16px", textAlign: "left" }}
              >
                DESCRIPTION
              </th>
              <th
                className="py-3 px-4 text-right font-bold"
                style={{ fontSize: "12px", fontWeight: "bold", padding: "12px 16px", textAlign: "right" }}
              >
                QTY
              </th>
              <th
                className="py-3 px-4 text-right font-bold"
                style={{ fontSize: "12px", fontWeight: "bold", padding: "12px 16px", textAlign: "right" }}
              >
                RATE
              </th>
              <th
                className="py-3 px-4 text-right font-bold"
                style={{ fontSize: "12px", fontWeight: "bold", padding: "12px 16px", textAlign: "right" }}
              >
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr
                key={index}
                className="border-b"
                style={{ backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff", borderBottom: "1px solid #f3f4f6" }}
              >
                <td
                  className="py-3 px-4 font-medium"
                  style={{ color: "#1f2937", fontSize: "11px", padding: "12px 16px", fontWeight: "500" }}
                >
                  {item.description}
                </td>
                <td
                  className="py-3 px-4 text-right"
                  style={{ color: "#4b5563", fontSize: "11px", padding: "12px 16px", textAlign: "right" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-3 px-4 text-right"
                  style={{ color: "#4b5563", fontSize: "11px", padding: "12px 16px", textAlign: "right" }}
                >
                  {formatCurrency(item.price, invoiceData.currency)}
                </td>
                <td
                  className="py-3 px-4 text-right font-bold"
                  style={{
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "12px 16px",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(item.quantity * item.price, invoiceData.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bold totals section */}
      <div className="flex justify-end mb-6">
        <div style={{ width: "240px" }}>
          <div
            className="border rounded-lg p-4"
            style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb", padding: "16px" }}
          >
            <div style={{ fontSize: "12px" }}>
              <div className="flex justify-between" style={{ color: "#4b5563", marginBottom: "8px" }}>
                <span className="font-medium" style={{ fontWeight: "500" }}>
                  Subtotal:
                </span>
                <span className="font-semibold" style={{ color: "#1f2937", fontWeight: "600" }}>
                  {formatCurrency(invoiceData.subtotal, invoiceData.currency)}
                </span>
              </div>
              <div className="flex justify-between" style={{ color: "#4b5563", marginBottom: "8px" }}>
                <span className="font-medium" style={{ fontWeight: "500" }}>
                  Tax ({invoiceData.taxRate}%):
                </span>
                <span className="font-semibold" style={{ color: "#1f2937", fontWeight: "600" }}>
                  {formatCurrency(invoiceData.tax, invoiceData.currency)}
                </span>
              </div>
              <div className="border-t-2 pt-2" style={{ borderTop: "2px solid #f97316", paddingTop: "8px" }}>
                <div className="flex justify-between">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#ea580c", fontSize: "16px", fontWeight: "bold" }}
                  >
                    TOTAL:
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#ea580c", fontSize: "16px", fontWeight: "bold" }}
                  >
                    {formatCurrency(invoiceData.total, invoiceData.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Amount in Words */}
      <div
        className="mb-6 p-3 rounded border-l-4"
        style={{ backgroundColor: "#fff7ed", borderLeft: "4px solid #f97316", padding: "12px" }}
      >
        <div style={{ fontSize: "11px" }}>
          <span className="font-bold" style={{ color: "#9a3412", fontWeight: "bold" }}>
            AMOUNT IN WORDS:{" "}
          </span>
          <span
            className="capitalize font-semibold"
            style={{ color: "#c2410c", textTransform: "capitalize", fontWeight: "600" }}
          >
            {numberToWords(invoiceData.total)} {invoiceData.currency} Only
          </span>
        </div>
      </div>

      {/* Notes and signature */}
      <div className="border-t-2 pt-4" style={{ borderTop: "2px solid #e5e7eb", paddingTop: "16px" }}>
        {invoiceData.notes && (
          <div className="mb-4">
            <h3 className="font-bold mb-2" style={{ color: "#ea580c", fontSize: "12px", fontWeight: "bold" }}>
              NOTES:
            </h3>
            <div
              className="border-l-4 p-3"
              style={{ backgroundColor: "#fff7ed", borderLeft: "4px solid #f97316", padding: "12px" }}
            >
              <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.notes}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between items-end">
          <div className="font-bold" style={{ color: "#ea580c", fontWeight: "bold", fontSize: "12px" }}>
            <p>THANK YOU FOR YOUR BUSINESS!</p>
          </div>
          <div className="text-center">
            {signature ? (
              <img
                src={signature || "/placeholder.svg"}
                alt="Signature"
                className="h-12 object-contain mx-auto mb-2"
                style={{ maxHeight: "48px", margin: "0 auto 8px auto" }}
              />
            ) : (
              <div style={{ height: "48px" }}></div>
            )}
            <div style={{ width: "150px", borderTop: "2px solid #f97316", paddingTop: "4px" }}>
              <p className="font-bold" style={{ fontSize: "10px", color: "#4b5563", fontWeight: "bold" }}>
                AUTHORIZED SIGNATURE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
