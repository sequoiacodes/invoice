"use client"

import { jsPDF } from "jspdf"
import type { InvoiceData, InvoiceTemplate } from "./types"
import { formatCurrency, numberToWords } from "./utils"

// Simple file download helper
const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Helper function to convert image to base64
const getImageBase64 = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If it's already a data URL, return it directly
    if (imageUrl.startsWith("data:")) {
      resolve(imageUrl)
      return
    }

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL("image/png"))
    }
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = imageUrl
  })
}

// Generate PDF using html2canvas for exact template matching
export const generatePDF = async (
  invoiceData: InvoiceData,
  template: InvoiceTemplate,
  companyLogo: string | null,
  signature: string | null,
): Promise<void> => {
  try {
    // Import html2canvas dynamically
    const html2canvas = (await import("html2canvas")).default

    // Get the preview element
    const element = document.getElementById("invoice-preview")
    if (!element) {
      throw new Error("Invoice preview element not found")
    }

    // Ensure all images are loaded before capturing
    const images = element.querySelectorAll("img")
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          // Set a timeout to avoid hanging
          setTimeout(reject, 5000)
        })
      }),
    )

    // Generate canvas from the preview with better options
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      imageTimeout: 10000,
      removeContainer: true,
    })

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4")
    const imgData = canvas.toDataURL("image/png")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    // Save PDF
    const pdfBlob = pdf.output("blob")
    downloadFile(pdfBlob, `invoice-${invoiceData.invoiceNumber}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)

    // Fallback to basic PDF generation if html2canvas fails
    await generateBasicPDF(invoiceData, template, companyLogo, signature)
  }
}

// Fallback basic PDF generation
const generateBasicPDF = async (
  invoiceData: InvoiceData,
  template: InvoiceTemplate,
  companyLogo: string | null,
  signature: string | null,
): Promise<void> => {
  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  let yPosition = 20

  // Template colors
  const templateColors: Record<
    InvoiceTemplate,
    { primary: [number, number, number]; secondary: [number, number, number] }
  > = {
    modern: { primary: [59, 130, 246], secondary: [239, 246, 255] },
    classic: { primary: [75, 85, 99], secondary: [243, 244, 246] },
    minimal: { primary: [107, 114, 128], secondary: [249, 250, 251] },
    creative: { primary: [147, 51, 234], secondary: [245, 243, 255] },
    elegant: { primary: [16, 185, 129], secondary: [236, 253, 245] },
    bold: { primary: [249, 115, 22], secondary: [255, 237, 213] },
  }

  const colors = templateColors[template]

  // Helper functions
  const addText = (text: string, x: number, y: number, options: { fontSize?: number; fontStyle?: string; color?: [number, number, number] } = {}) => {
    if (options.fontSize) pdf.setFontSize(options.fontSize)
    if (options.fontStyle) pdf.setFont("helvetica", options.fontStyle)
    if (options.color) pdf.setTextColor(options.color[0], options.color[1], options.color[2])
    pdf.text(text, x, y)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(0, 0, 0)
  }

  const addRect = (x: number, y: number, width: number, height: number, color: [number, number, number]) => {
    pdf.setFillColor(...color)
    pdf.rect(x, y, width, height, "F")
  }

  // Header based on template
  switch (template) {
    case "bold":
      addRect(0, 0, pageWidth, 50, colors.primary)

      // Company logo for Bold template
      if (companyLogo) {
        try {
          const logoBase64 = await getImageBase64(companyLogo)
          // Add white background for logo
          pdf.setFillColor(255, 255, 255)
          pdf.rect(25, 15, 45, 20, "F")
          pdf.addImage(logoBase64, "PNG", 27, 17, 41, 16)
        } catch (e) {
          addText(invoiceData.companyName, 25, 30, { fontSize: 16, fontStyle: "bold", color: [255, 255, 255] })
        }
      } else {
        addText(invoiceData.companyName, 25, 30, { fontSize: 16, fontStyle: "bold", color: [255, 255, 255] })
      }

      // Invoice title for Bold template
      pdf.setFillColor(255, 255, 255)
      pdf.rect(pageWidth - 65, 15, 50, 20, "F")
      addText("INVOICE", pageWidth - 60, 25, { fontSize: 16, fontStyle: "bold", color: colors.primary })
      addText(`#${invoiceData.invoiceNumber}`, pageWidth - 60, 32, {
        fontSize: 12,
        fontStyle: "bold",
        color: colors.primary,
      })
      break

    case "creative":
      addRect(0, 0, pageWidth, 45, colors.primary)
      if (companyLogo) {
        try {
          const logoBase64 = await getImageBase64(companyLogo)
          pdf.setFillColor(255, 255, 255)
          pdf.rect(25, 10, 40, 20, "F")
          pdf.addImage(logoBase64, "PNG", 27, 12, 36, 16)
        } catch (e) {
          addText(invoiceData.companyName, 25, 25, { fontSize: 16, fontStyle: "bold", color: [255, 255, 255] })
        }
      } else {
        addText(invoiceData.companyName, 25, 25, { fontSize: 16, fontStyle: "bold", color: [255, 255, 255] })
      }
      addText("INVOICE", pageWidth - 60, 28, { fontSize: 24, fontStyle: "bold", color: [255, 255, 255] })
      break

    case "elegant":
      if (companyLogo) {
        try {
          const logoBase64 = await getImageBase64(companyLogo)
          pdf.addImage(logoBase64, "PNG", 20, yPosition, 40, 20)
          yPosition += 25
        } catch (e) {
          addText(invoiceData.companyName, 20, yPosition, { fontSize: 16, fontStyle: "normal" })
          yPosition += 10
        }
      } else {
        addText(invoiceData.companyName, 20, yPosition, { fontSize: 16, fontStyle: "normal" })
        yPosition += 10
      }
      addText("Invoice", pageWidth - 60, 25, { fontSize: 28, fontStyle: "normal", color: colors.primary })
      pdf.setDrawColor(...colors.primary)
      pdf.setLineWidth(2)
      pdf.line(20, 35, pageWidth - 20, 35)
      break

    case "classic":
      // Center the company name and logo
      if (companyLogo) {
        try {
          const logoBase64 = await getImageBase64(companyLogo)
          pdf.addImage(logoBase64, "PNG", pageWidth / 2 - 20, yPosition, 40, 20)
          yPosition += 25
        } catch (e) {
          addText(invoiceData.companyName, pageWidth / 2, yPosition, { fontSize: 18, fontStyle: "bold" })
          yPosition += 10
        }
      } else {
        addText(invoiceData.companyName, pageWidth / 2, yPosition, { fontSize: 18, fontStyle: "bold" })
        yPosition += 10
      }

      // Add company details centered
      addText(invoiceData.companyAddress.replace(/\n/g, " "), pageWidth / 2, yPosition, { fontSize: 9 })
      yPosition += 6
      addText(`Phone: ${invoiceData.companyPhone} | Email: ${invoiceData.companyEmail}`, pageWidth / 2, yPosition, {
        fontSize: 9,
      })
      yPosition += 10

      // Add bordered INVOICE title
      pdf.setDrawColor(0, 0, 0)
      pdf.setLineWidth(1)
      pdf.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 8
      addText("INVOICE", pageWidth / 2, yPosition, { fontSize: 20, fontStyle: "bold" })
      yPosition += 8
      pdf.line(20, yPosition, pageWidth - 20, yPosition)
      break

    default:
      if (companyLogo) {
        try {
          const logoBase64 = await getImageBase64(companyLogo)
          pdf.addImage(logoBase64, "PNG", 20, yPosition, 40, 20)
          yPosition += 25
        } catch (e) {
          addText(invoiceData.companyName, 20, yPosition, { fontSize: 16, fontStyle: "bold" })
          yPosition += 10
        }
      } else {
        addText(invoiceData.companyName, 20, yPosition, { fontSize: 16, fontStyle: "bold" })
        yPosition += 10
      }
      addText("INVOICE", pageWidth / 2, 25, { fontSize: 24, fontStyle: "bold" })
  }

  yPosition = template === "bold" ? 70 : template === "creative" ? 65 : template === "classic" ? 60 : 50

  // Continue with rest of the PDF generation...
  // Invoice details
  if (template !== "classic") {
    addText(`Invoice #: ${invoiceData.invoiceNumber}`, pageWidth - 80, yPosition, { fontSize: 10 })
    yPosition += 6
    addText(`Date: ${invoiceData.invoiceDate}`, pageWidth - 80, yPosition, { fontSize: 10 })
    yPosition += 6
    addText(`Due: ${invoiceData.dueDate}`, pageWidth - 80, yPosition, { fontSize: 10 })
    yPosition += 15
  } else {
    // Classic template layout
    yPosition += 10
    addText("Invoice Number:", 20, yPosition, { fontSize: 10, fontStyle: "bold" })
    addText(invoiceData.invoiceNumber, 60, yPosition, { fontSize: 10 })
    addText("Invoice Date:", 120, yPosition, { fontSize: 10, fontStyle: "bold" })
    addText(invoiceData.invoiceDate, 150, yPosition, { fontSize: 10 })
    yPosition += 6
    addText("Due Date:", 120, yPosition, { fontSize: 10, fontStyle: "bold" })
    addText(invoiceData.dueDate, 150, yPosition, { fontSize: 10 })
    yPosition += 15
  }

  // Company and client details
  addText("Bill To:", 20, yPosition, { fontSize: 12, fontStyle: "bold" })
  yPosition += 8

  const clientLines = [
    invoiceData.clientName,
    ...invoiceData.clientAddress.split("\n"),
    `Phone: ${invoiceData.clientPhone}`,
    `Email: ${invoiceData.clientEmail}`,
  ]

  clientLines.forEach((line) => {
    if (line.trim()) {
      addText(line, 20, yPosition, { fontSize: 9 })
      yPosition += 5
    }
  })

  yPosition += 15

  // Items table
  const tableY = yPosition

  // Table border for classic template
  if (template === "classic") {
    pdf.setDrawColor(0, 0, 0)
    pdf.setLineWidth(0.5)
    pdf.rect(20, tableY - 5, pageWidth - 40, 10)
  } else {
    addRect(20, tableY - 5, pageWidth - 40, 10, colors.secondary)
  }

  addText("Description", 25, tableY, { fontSize: 10, fontStyle: "bold" })
  addText("Qty", 120, tableY, { fontSize: 10, fontStyle: "bold" })
  addText("Price", 140, tableY, { fontSize: 10, fontStyle: "bold" })
  addText("Amount", 170, tableY, { fontSize: 10, fontStyle: "bold" })

  yPosition = tableY + 8

  invoiceData.items.forEach((item, index) => {
    const amount = item.quantity * item.price

    // Add borders for classic template
    if (template === "classic") {
      pdf.rect(20, yPosition - 3, pageWidth - 40, 8)
    }

    addText(item.description, 25, yPosition, { fontSize: 9 })
    addText(item.quantity.toString(), 120, yPosition, { fontSize: 9 })
    addText(formatCurrency(item.price, invoiceData.currency), 140, yPosition, { fontSize: 9 })
    addText(formatCurrency(amount, invoiceData.currency), 170, yPosition, { fontSize: 9 })
    yPosition += 8
  })

  yPosition += 10

  // Totals
  const totalsX = pageWidth - 80

  if (template === "classic") {
    // Add border for classic template totals
    pdf.rect(totalsX - 10, yPosition - 5, 70, 30)
    pdf.setFillColor(243, 244, 246)
    pdf.rect(totalsX - 10, yPosition + 17, 70, 8, "F")
  }

  addText(`Subtotal: ${formatCurrency(invoiceData.subtotal, invoiceData.currency)}`, totalsX, yPosition, {
    fontSize: 10,
  })
  yPosition += 8
  addText(
    `Tax (${invoiceData.taxRate}%): ${formatCurrency(invoiceData.tax, invoiceData.currency)}`,
    totalsX,
    yPosition,
    { fontSize: 10 },
  )
  yPosition += 8
  addText(`Total: ${formatCurrency(invoiceData.total, invoiceData.currency)}`, totalsX, yPosition, {
    fontSize: 12,
    fontStyle: "bold",
    color: colors.primary,
  })
  yPosition += 15

  // Amount in words
  yPosition += 5
  addText("Amount in Words:", 20, yPosition, { fontSize: 10, fontStyle: "bold" })
  yPosition += 6
  const amountInWords = `${numberToWords(invoiceData.total)} ${invoiceData.currency} Only`
  const wrappedWords = pdf.splitTextToSize(amountInWords, pageWidth - 40)
  wrappedWords.forEach((line: string) => {
    addText(line, 20, yPosition, { fontSize: 9 })
    yPosition += 5
  })
  yPosition += 10

  // Notes
  if (invoiceData.notes) {
    addText("Notes:", 20, yPosition, { fontSize: 12, fontStyle: "bold" })
    yPosition += 8
    const noteLines = pdf.splitTextToSize(invoiceData.notes, pageWidth - 40)
    noteLines.forEach((line: string) => {
      addText(line, 20, yPosition, { fontSize: 10 })
      yPosition += 5
    })
    yPosition += 10
  }

  // Signature
  if (signature) {
    try {
      const signatureBase64 = await getImageBase64(signature)
      pdf.addImage(signatureBase64, "PNG", 20, yPosition, 40, 15)
      yPosition += 20
    } catch (e) {
      yPosition += 15
    }
  }
  addText("Authorized Signature: ____________________", 20, yPosition, { fontSize: 10 })

  const pdfBlob = pdf.output("blob")
  downloadFile(pdfBlob, `invoice-${invoiceData.invoiceNumber}.pdf`)
}

// Generate DOCX with exact template styling using HTML format
export const generateDOCX = async (
  invoiceData: InvoiceData,
  template: InvoiceTemplate,
  companyLogo: string | null,
  signature: string | null,
): Promise<void> => {
  try {
    // Create a new HTML document for Word
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: ${getTemplateColor(template)};
            color: white;
          }
          .header {
            ${template === "bold" ? "background-color: #f97316;" : ""}
            ${template === "creative" ? "background-color: #9333ea;" : ""}
            ${template === "elegant" ? "border-bottom: 4px solid #10b981;" : ""}
            ${template === "modern" ? "background-color: #3b82f6;" : ""}
            ${template === "classic" ? "text-align: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 10px;" : ""}
            color: ${["bold", "creative", "modern"].includes(template) ? "white" : "black"};
            padding: 20px;
            margin-bottom: 20px;
          }
          .logo {
            max-width: 150px;
            max-height: 60px;
          }
          .signature {
            max-width: 200px;
            max-height: 60px;
          }
          .client-info {
            margin-bottom: 20px;
          }
          .totals {
            margin-top: 20px;
            width: 300px;
            margin-left: auto;
          }
          .total-row {
            font-weight: bold;
          }
          .notes {
            margin-top: 30px;
          }
          .signature-section {
            margin-top: 50px;
          }
          .signature-line {
            border-top: 1px solid #000;
            width: 200px;
            margin-top: 10px;
          }
          .amount-words {
            background-color: ${template === "bold" ? "#fff7ed" : template === "creative" ? "#f3e8ff" : template === "elegant" ? "#ecfdf5" : template === "modern" ? "#eff6ff" : "#f9fafb"};
            border-left: 4px solid ${getTemplateColor(template)};
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .classic-layout {
            text-align: center;
          }
          .classic-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        ${getTemplateSpecificHTML(invoiceData, template, companyLogo, signature)}
      </body>
      </html>
    `

    // Convert to Word document format
    const blob = new Blob([htmlContent], {
      type: "application/msword",
    })

    // Create a download link with .doc extension
    downloadFile(blob, `invoice-${invoiceData.invoiceNumber}.doc`)

    // Also create a simplified HTML version for direct viewing
    const htmlBlob = new Blob([htmlContent], {
      type: "text/html",
    })
    downloadFile(htmlBlob, `invoice-${invoiceData.invoiceNumber}.html`)
  } catch (error) {
    console.error("Error generating DOCX:", error)
    throw error
  }
}

// Helper function to get template color
function getTemplateColor(template: InvoiceTemplate): string {
  switch (template) {
    case "bold":
      return "#f97316"
    case "creative":
      return "#9333ea"
    case "elegant":
      return "#10b981"
    case "modern":
      return "#3b82f6"
    case "classic":
      return "#4b5563"
    case "minimal":
    default:
      return "#6b7280"
  }
}

// Helper function to get template-specific HTML
function getTemplateSpecificHTML(
  invoiceData: InvoiceData,
  template: InvoiceTemplate,
  companyLogo: string | null,
  signature: string | null,
): string {
  const logoHTML = companyLogo
    ? `<img src="${companyLogo}" alt="Company Logo" class="logo" style="background-color: white; padding: 5px; border-radius: 5px;">`
    : `<h2 style="margin-top: 0;">${invoiceData.companyName}</h2>`

  const signatureHTML = signature
    ? `<img src="${signature}" alt="Signature" class="signature">`
    : `<div style="height: 40px;"></div>`

  const amountInWords = `${numberToWords(invoiceData.total)} ${invoiceData.currency} Only`

  if (template === "classic") {
    return `
      <div class="classic-layout">
        ${logoHTML}
        <div>
          <p>${invoiceData.companyAddress.replace(/\n/g, "<br>")}</p>
          <p>Phone: ${invoiceData.companyPhone} | Email: ${invoiceData.companyEmail}</p>
        </div>
      </div>

      <div class="header">
        <h1 style="margin: 0; font-size: 24px;">INVOICE</h1>
      </div>

      <div class="classic-details">
        <div>
          <h3>Bill To:</h3>
          <p><strong>${invoiceData.clientName}</strong></p>
          <p>${invoiceData.clientAddress.replace(/\n/g, "<br>")}</p>
          <p>Phone: ${invoiceData.clientPhone}</p>
          <p>Email: ${invoiceData.clientEmail}</p>
        </div>
        <div>
          <p><strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> ${invoiceData.invoiceDate}</p>
          <p><strong>Due Date:</strong> ${invoiceData.dueDate}</p>
        </div>
      </div>

      <table style="border: 2px solid #000;">
        <thead>
          <tr style="background-color: #e5e7eb;">
            <th style="border: 1px solid #000;">Description</th>
            <th style="border: 1px solid #000; text-align: right;">Quantity</th>
            <th style="border: 1px solid #000; text-align: right;">Unit Price</th>
            <th style="border: 1px solid #000; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #000;">${item.description}</td>
              <td style="border: 1px solid #000; text-align: right;">${item.quantity}</td>
              <td style="border: 1px solid #000; text-align: right;">${formatCurrency(item.price, invoiceData.currency)}</td>
              <td style="border: 1px solid #000; text-align: right;"><strong>${formatCurrency(item.quantity * item.price, invoiceData.currency)}</strong></td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <div style="border: 2px solid #000; width: 300px; margin: 20px 0 20px auto;">
        <div style="padding: 8px; border-bottom: 1px solid #000; display: flex; justify-content: space-between;">
          <span><strong>Subtotal:</strong></span>
          <span>${formatCurrency(invoiceData.subtotal, invoiceData.currency)}</span>
        </div>
        <div style="padding: 8px; border-bottom: 1px solid #000; display: flex; justify-content: space-between;">
          <span><strong>Tax (${invoiceData.taxRate}%):</strong></span>
          <span>${formatCurrency(invoiceData.tax, invoiceData.currency)}</span>
        </div>
        <div style="padding: 8px; background-color: #e5e7eb; display: flex; justify-content: space-between;">
          <span><strong>Total:</strong></span>
          <span><strong>${formatCurrency(invoiceData.total, invoiceData.currency)}</strong></span>
        </div>
      </div>

      <div style="background-color: #f3f4f6; border: 1px solid #d1d5db; padding: 15px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Amount in Words:</strong> <span style="text-transform: capitalize;">${amountInWords}</span></p>
      </div>

      ${
        invoiceData.notes
          ? `
        <div class="notes">
          <h3>Notes:</h3>
          <div style="background-color: #f3f4f6; border: 1px solid #d1d5db; padding: 15px;">
            <p>${invoiceData.notes}</p>
          </div>
        </div>
      `
          : ""
      }

      <div class="signature-section" style="display: flex; justify-content: space-between;">
        <div></div>
        <div style="text-align: center;">
          ${signatureHTML}
          <div class="signature-line">
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
    `
  }

  // Default template layout for other templates
  return `
    <div class="header">
      <table style="border: none; width: 100%;">
        <tr>
          <td style="border: none; width: 60%; vertical-align: top;">
            ${logoHTML}
            <div>
              <p>${invoiceData.companyAddress.replace(/\n/g, "<br>")}</p>
              <p>${invoiceData.companyPhone}</p>
              <p>${invoiceData.companyEmail}</p>
            </div>
          </td>
          <td style="border: none; width: 40%; text-align: right; vertical-align: top;">
            <h1 style="margin-top: 0;">INVOICE</h1>
            <p><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</p>
            <p><strong>Date:</strong> ${invoiceData.invoiceDate}</p>
            <p><strong>Due Date:</strong> ${invoiceData.dueDate}</p>
          </td>
        </tr>
      </table>
    </div>

    <div class="client-info">
      <table style="border: none; width: 100%;">
        <tr>
          <td style="border: none; width: 50%; vertical-align: top;">
            <h3>Bill To:</h3>
            <p><strong>${invoiceData.clientName}</strong></p>
            <p>${invoiceData.clientAddress.replace(/\n/g, "<br>")}</p>
            <p>${invoiceData.clientPhone}</p>
            <p>${invoiceData.clientEmail}</p>
          </td>
          <td style="border: none; width: 50%; vertical-align: top;">
            <h3>Payment Details:</h3>
            <p><strong>Currency:</strong> ${invoiceData.currency}</p>
          </td>
        </tr>
      </table>
    </div>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: right;">Quantity</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${invoiceData.items
          .map(
            (item, index) => `
          <tr${index % 2 === 0 ? ' style="background-color: #f9fafb;"' : ""}>
            <td>${item.description}</td>
            <td style="text-align: right;">${item.quantity}</td>
            <td style="text-align: right;">${formatCurrency(item.price, invoiceData.currency)}</td>
            <td style="text-align: right;"><strong>${formatCurrency(item.quantity * item.price, invoiceData.currency)}</strong></td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>

    <div class="totals">
      <table style="border: none;">
        <tr>
          <td style="border: none;">Subtotal:</td>
          <td style="border: none; text-align: right;"><strong>${formatCurrency(invoiceData.subtotal, invoiceData.currency)}</strong></td>
        </tr>
        <tr>
          <td style="border: none;">Tax (${invoiceData.taxRate}%):</td>
          <td style="border: none; text-align: right;"><strong>${formatCurrency(invoiceData.tax, invoiceData.currency)}</strong></td>
        </tr>
        <tr class="total-row">
          <td style="border: none; border-top: 2px solid #000; padding-top: 8px;">Total:</td>
          <td style="border: none; border-top: 2px solid #000; padding-top: 8px; text-align: right;"><strong>${formatCurrency(invoiceData.total, invoiceData.currency)}</strong></td>
        </tr>
      </table>
    </div>

    <div class="amount-words">
      <p style="margin: 0;"><strong>Amount in Words:</strong> <span style="text-transform: capitalize;">${amountInWords}</span></p>
    </div>

    ${
      invoiceData.notes
        ? `
      <div class="notes">
        <h3>Notes:</h3>
        <p>${invoiceData.notes}</p>
      </div>
    `
        : ""
    }

    <div class="signature-section">
      ${signatureHTML}
      <div class="signature-line">
        <p>Authorized Signature</p>
      </div>
    </div>
  `
}
