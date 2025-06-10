"use client"

import type { InvoiceData } from "@/lib/types"
import { formatCurrency, numberToWords } from "@/lib/utils"

interface ElegantTemplateProps {
  invoiceData: InvoiceData
  companyLogo: string | null
  signature: string | null
}

export default function ElegantTemplate({ invoiceData, companyLogo, signature }: ElegantTemplateProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      {/* Elegant header */}
      <div className="border-b-4 pb-4 mb-6" style={{ borderBottom: "4px solid #10b981", paddingBottom: "16px" }}>
        <div className="flex justify-between items-start">
          <div>
            {companyLogo ? (
              <img
                src={companyLogo || "/placeholder.svg"}
                alt="Company Logo"
                className="h-16 object-contain mb-3"
                style={{ maxHeight: "64px" }}
              />
            ) : (
              <h1 className="text-xl font-light mb-2" style={{ color: "#1f2937", fontSize: "20px", fontWeight: "300" }}>
                {invoiceData.companyName}
              </h1>
            )}
            <div style={{ color: "#4b5563", fontSize: "11px" }}>
              <p>{invoiceData.companyAddress}</p>
              <p>{invoiceData.companyPhone}</p>
              <p>{invoiceData.companyEmail}</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-light mb-3" style={{ color: "#059669", fontSize: "24px", fontWeight: "300" }}>
              Invoice
            </h1>
            <div style={{ color: "#4b5563", fontSize: "11px" }}>
              <p>
                <span className="font-medium" style={{ fontWeight: "500" }}>
                  Number:
                </span>{" "}
                {invoiceData.invoiceNumber}
              </p>
              <p>
                <span className="font-medium" style={{ fontWeight: "500" }}>
                  Date:
                </span>{" "}
                {invoiceData.invoiceDate}
              </p>
              <p>
                <span className="font-medium" style={{ fontWeight: "500" }}>
                  Due:
                </span>{" "}
                {invoiceData.dueDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client information */}
      <div className="mb-6">
        <div
          className="border-l-4 p-4"
          style={{ backgroundColor: "#ecfdf5", borderLeft: "4px solid #10b981", padding: "16px" }}
        >
          <h2 className="text-sm font-medium mb-2" style={{ color: "#065f46", fontSize: "14px", fontWeight: "500" }}>
            Billed To
          </h2>
          <div style={{ fontSize: "12px" }}>
            <p className="font-medium" style={{ color: "#1f2937", fontWeight: "500" }}>
              {invoiceData.clientName}
            </p>
            <p style={{ color: "#4b5563", marginTop: "4px" }}>{invoiceData.clientAddress}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientPhone}</p>
            <p style={{ color: "#4b5563" }}>{invoiceData.clientEmail}</p>
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="mb-6">
        <table className="w-full" style={{ width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #10b981" }}>
              <th
                className="py-3 px-2 text-left font-medium"
                style={{
                  color: "#065f46",
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "12px 8px",
                  textAlign: "left",
                }}
              >
                Description
              </th>
              <th
                className="py-3 px-2 text-right font-medium"
                style={{
                  color: "#065f46",
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "12px 8px",
                  textAlign: "right",
                }}
              >
                Quantity
              </th>
              <th
                className="py-3 px-2 text-right font-medium"
                style={{
                  color: "#065f46",
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "12px 8px",
                  textAlign: "right",
                }}
              >
                Rate
              </th>
              <th
                className="py-3 px-2 text-right font-medium"
                style={{
                  color: "#065f46",
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "12px 8px",
                  textAlign: "right",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #a7f3d0" }}>
                <td className="py-3 px-2" style={{ color: "#1f2937", fontSize: "11px", padding: "12px 8px" }}>
                  {item.description}
                </td>
                <td
                  className="py-3 px-2 text-right"
                  style={{ color: "#4b5563", fontSize: "11px", padding: "12px 8px", textAlign: "right" }}
                >
                  {item.quantity}
                </td>
                <td
                  className="py-3 px-2 text-right"
                  style={{ color: "#4b5563", fontSize: "11px", padding: "12px 8px", textAlign: "right" }}
                >
                  {formatCurrency(item.price, invoiceData.currency)}
                </td>
                <td
                  className="py-3 px-2 text-right font-medium"
                  style={{
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "12px 8px",
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

      {/* Totals */}
      <div className="flex justify-end mb-6">
        <div style={{ width: "240px" }}>
          <div style={{ fontSize: "12px" }}>
            <div className="flex justify-between py-1" style={{ color: "#4b5563", padding: "4px 0" }}>
              <span>Subtotal</span>
              <span style={{ color: "#1f2937" }}>{formatCurrency(invoiceData.subtotal, invoiceData.currency)}</span>
            </div>
            <div className="flex justify-between py-1" style={{ color: "#4b5563", padding: "4px 0" }}>
              <span>Tax ({invoiceData.taxRate}%)</span>
              <span style={{ color: "#1f2937" }}>{formatCurrency(invoiceData.tax, invoiceData.currency)}</span>
            </div>
            <div
              className="border-t-2 pt-2 mt-2"
              style={{ borderTop: "2px solid #10b981", paddingTop: "8px", marginTop: "8px" }}
            >
              <div className="flex justify-between py-1" style={{ padding: "4px 0" }}>
                <span className="text-lg font-medium" style={{ color: "#065f46", fontSize: "16px", fontWeight: "500" }}>
                  Total
                </span>
                <span className="text-lg font-medium" style={{ color: "#065f46", fontSize: "16px", fontWeight: "500" }}>
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
        style={{ backgroundColor: "#ecfdf5", borderLeft: "4px solid #10b981", padding: "12px" }}
      >
        <div style={{ fontSize: "11px" }}>
          <span className="font-medium" style={{ color: "#065f46", fontWeight: "500" }}>
            Amount in Words:{" "}
          </span>
          <span className="capitalize" style={{ color: "#047857", textTransform: "capitalize" }}>
            {numberToWords(invoiceData.total)} {invoiceData.currency} Only
          </span>
        </div>
      </div>

      {/* Notes and signature */}
      {invoiceData.notes && (
        <div className="mb-6">
          <h3 className="font-medium mb-2" style={{ color: "#065f46", fontSize: "12px", fontWeight: "500" }}>
            Additional Notes
          </h3>
          <p style={{ color: "#4b5563", fontSize: "11px", fontStyle: "italic" }}>{invoiceData.notes}</p>
        </div>
      )}

      <div className="mt-8 flex justify-between items-end">
        <div style={{ color: "#6b7280", fontSize: "11px" }}>
          <p>Thank you for your business!</p>
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
          <div style={{ width: "150px", borderTop: "1px solid #34d399", paddingTop: "4px" }}>
            <p style={{ fontSize: "10px", color: "#4b5563" }}>Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  )
}
