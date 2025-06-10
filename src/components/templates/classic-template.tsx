"use client"

import type { InvoiceData } from "@/lib/types"
import { formatCurrency, numberToWords } from "@/lib/utils"

interface ClassicTemplateProps {
  invoiceData: InvoiceData
  companyLogo: string | null
  signature: string | null
}

export default function ClassicTemplate({ invoiceData, companyLogo, signature }: ClassicTemplateProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      <div className="text-center mb-6">
        {companyLogo ? (
          <img
            src={companyLogo || "/placeholder.svg"}
            alt="Company Logo"
            className="h-16 object-contain mx-auto mb-3"
            style={{ maxHeight: "64px", margin: "0 auto 12px auto" }}
          />
        ) : (
          <h1
            className="text-xl font-bold uppercase"
            style={{ color: "#111827", fontSize: "20px", fontWeight: "bold", textTransform: "uppercase" }}
          >
            {invoiceData.companyName}
          </h1>
        )}
        <div style={{ color: "#374151", fontSize: "11px" }}>
          <p>{invoiceData.companyAddress}</p>
          <p>
            Phone: {invoiceData.companyPhone} | Email: {invoiceData.companyEmail}
          </p>
        </div>
      </div>

      <div
        className="border-t-2 border-b-2 py-3 mb-6"
        style={{ borderTop: "2px solid #111827", borderBottom: "2px solid #111827", padding: "12px 0" }}
      >
        <h1
          className="text-lg font-bold text-center"
          style={{ color: "#111827", fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
        >
          INVOICE
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h2
            className="text-sm font-bold mb-2 uppercase"
            style={{ color: "#111827", fontSize: "14px", fontWeight: "bold", textTransform: "uppercase" }}
          >
            Bill To:
          </h2>
          <div>
            <p className="font-semibold" style={{ color: "#111827", fontSize: "12px", fontWeight: "600" }}>
              {invoiceData.clientName}
            </p>
            <p style={{ color: "#374151", fontSize: "11px" }}>{invoiceData.clientAddress}</p>
            <p style={{ color: "#374151", fontSize: "11px" }}>Phone: {invoiceData.clientPhone}</p>
            <p style={{ color: "#374151", fontSize: "11px" }}>Email: {invoiceData.clientEmail}</p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2" style={{ fontSize: "11px" }}>
            <div className="font-bold" style={{ color: "#111827", fontWeight: "bold" }}>
              Invoice Number:
            </div>
            <div style={{ color: "#1f2937" }}>{invoiceData.invoiceNumber}</div>

            <div className="font-bold" style={{ color: "#111827", fontWeight: "bold" }}>
              Invoice Date:
            </div>
            <div style={{ color: "#1f2937" }}>{invoiceData.invoiceDate}</div>

            <div className="font-bold" style={{ color: "#111827", fontWeight: "bold" }}>
              Due Date:
            </div>
            <div style={{ color: "#1f2937" }}>{invoiceData.dueDate}</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <table
          className="w-full border-collapse border"
          style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #111827" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e5e7eb" }}>
              <th
                className="border py-2 px-3 text-left"
                style={{
                  border: "1px solid #111827",
                  color: "#111827",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  textAlign: "left",
                }}
              >
                Description
              </th>
              <th
                className="border py-2 px-3 text-right"
                style={{
                  border: "1px solid #111827",
                  color: "#111827",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  textAlign: "right",
                }}
              >
                Quantity
              </th>
              <th
                className="border py-2 px-3 text-right"
                style={{
                  border: "1px solid #111827",
                  color: "#111827",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  textAlign: "right",
                }}
              >
                Unit Price
              </th>
              <th
                className="border py-2 px-3 text-right"
                style={{
                  border: "1px solid #111827",
                  color: "#111827",
                  fontSize: "12px",
                  fontWeight: "bold",
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
              <tr key={index}>
                <td
                  className="border py-2 px-3"
                  style={{ border: "1px solid #111827", color: "#1f2937", fontSize: "11px", padding: "8px 12px" }}
                >
                  {item.description}
                </td>
                <td
                  className="border py-2 px-3 text-right"
                  style={{
                    border: "1px solid #111827",
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  className="border py-2 px-3 text-right"
                  style={{
                    border: "1px solid #111827",
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.price, invoiceData.currency)}
                </td>
                <td
                  className="border py-2 px-3 text-right"
                  style={{
                    border: "1px solid #111827",
                    color: "#1f2937",
                    fontSize: "11px",
                    padding: "8px 12px",
                    textAlign: "right",
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
        <div className="border" style={{ width: "200px", border: "1px solid #111827" }}>
          <div
            className="flex justify-between py-2 px-3 border-b"
            style={{ padding: "8px 12px", borderBottom: "1px solid #111827" }}
          >
            <span className="font-bold" style={{ color: "#111827", fontSize: "11px", fontWeight: "bold" }}>
              Subtotal:
            </span>
            <span style={{ color: "#1f2937", fontSize: "11px" }}>
              {formatCurrency(invoiceData.subtotal, invoiceData.currency)}
            </span>
          </div>
          <div
            className="flex justify-between py-2 px-3 border-b"
            style={{ padding: "8px 12px", borderBottom: "1px solid #111827" }}
          >
            <span className="font-bold" style={{ color: "#111827", fontSize: "11px", fontWeight: "bold" }}>
              Tax ({invoiceData.taxRate}%):
            </span>
            <span style={{ color: "#1f2937", fontSize: "11px" }}>
              {formatCurrency(invoiceData.tax, invoiceData.currency)}
            </span>
          </div>
          <div
            className="flex justify-between py-2 px-3 font-bold"
            style={{ backgroundColor: "#e5e7eb", padding: "8px 12px", fontWeight: "bold" }}
          >
            <span style={{ color: "#111827", fontSize: "11px" }}>Total:</span>
            <span style={{ color: "#111827", fontSize: "11px" }}>
              {formatCurrency(invoiceData.total, invoiceData.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Total Amount in Words */}
      <div
        className="mb-6 p-3 border"
        style={{ backgroundColor: "#f3f4f6", border: "1px solid #9ca3af", padding: "12px" }}
      >
        <div style={{ fontSize: "11px" }}>
          <span className="font-bold" style={{ color: "#111827", fontWeight: "bold" }}>
            Amount in Words:{" "}
          </span>
          <span className="capitalize" style={{ color: "#1f2937", textTransform: "capitalize" }}>
            {numberToWords(invoiceData.total)} {invoiceData.currency} Only
          </span>
        </div>
      </div>

      {invoiceData.notes && (
        <div className="mb-6">
          <h3 className="font-bold mb-2" style={{ color: "#111827", fontSize: "12px", fontWeight: "bold" }}>
            Notes:
          </h3>
          <p
            className="border p-3"
            style={{
              border: "1px solid #9ca3af",
              backgroundColor: "#f9fafb",
              color: "#1f2937",
              fontSize: "11px",
              padding: "12px",
            }}
          >
            {invoiceData.notes}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <div></div>
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
          <div style={{ width: "150px", borderTop: "1px solid #111827", paddingTop: "4px" }}>
            <p style={{ color: "#1f2937", fontSize: "10px" }}>Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  )
}
