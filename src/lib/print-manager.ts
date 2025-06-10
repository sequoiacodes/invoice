// "use client"

// import type { InvoiceData, InvoiceTemplate } from "./types"
// import type { PrintSettings } from "@/components/print-settings-dialog"

// export class PrintManager {
//   private static instance: PrintManager
//   private printWindow: Window | null = null

//   static getInstance(): PrintManager {
//     if (!PrintManager.instance) {
//       PrintManager.instance = new PrintManager()
//     }
//     return PrintManager.instance
//   }

//   async printInvoice(
//     invoiceData: InvoiceData,
//     template: InvoiceTemplate,
//     companyLogo: string | null,
//     signature: string | null,
//     settings: PrintSettings,
//   ): Promise<void> {
//     try {
//       // Get the invoice preview element
//       const element = document.getElementById("invoice-preview")
//       if (!element) {
//         throw new Error("Invoice preview element not found")
//       }

//       // Create a clone for printing
//       const clone = element.cloneNode(true) as HTMLElement

//       // Apply print-optimized styling while preserving template design
//       this.applyPrintStyling(clone, settings, invoiceData.items.length, template)

//       // Create print document
//       const printContent = this.createPrintDocument(clone, invoiceData, settings, template)

//       // Open print window
//       this.openPrintWindow(printContent, settings)
//     } catch (error) {
//       console.error("Error printing invoice:", error)
//       throw error
//     }
//   }

//   private getTemplateColors(template: InvoiceTemplate) {
//     const colors = {
//       modern: { primary: "#3b82f6", secondary: "#eff6ff", accent: "#1e40af" },
//       classic: { primary: "#111827", secondary: "#f3f4f6", accent: "#374151" },
//       minimal: { primary: "#6b7280", secondary: "#f9fafb", accent: "#4b5563" },
//       creative: { primary: "#9333ea", secondary: "#f3e8ff", accent: "#7c3aed" },
//       elegant: { primary: "#10b981", secondary: "#ecfdf5", accent: "#059669" },
//       bold: { primary: "#f97316", secondary: "#fff7ed", accent: "#ea580c" },
//     }
//     return colors[template]
//   }

//   private applyPrintStyling(
//     element: HTMLElement,
//     settings: PrintSettings,
//     itemCount: number,
//     template: InvoiceTemplate,
//   ): void {
//     const colors = this.getTemplateColors(template)
//     const scale = this.calculateDynamicScale(itemCount, settings.scale)

//     // Set container styles for single-page fit
//     element.style.width = "100%"
//     element.style.maxWidth = "794px" // A4 width
//     element.style.margin = "0 auto"
//     element.style.padding = itemCount > 15 ? "8px" : "12px"
//     element.style.fontFamily = "Arial, sans-serif"
//     element.style.transform = `scale(${scale})`
//     element.style.transformOrigin = "top center"
//     element.style.pageBreakInside = "avoid"

//     // Apply responsive font scaling based on content
//     const baseFontSize = itemCount > 20 ? 6 : itemCount > 15 ? 7 : itemCount > 10 ? 8 : 9

//     // Style all elements while preserving template characteristics
//     const allElements = element.querySelectorAll("*")
//     allElements.forEach((el) => {
//       const htmlEl = el as HTMLElement
//       const tagName = htmlEl.tagName.toLowerCase()

//       // Preserve template colors if background is included
//       if (settings.includeBackground) {
//         // Keep existing background colors and styles
//         const computedStyle = window.getComputedStyle(htmlEl)
//         if (computedStyle.backgroundColor && computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
//           htmlEl.style.backgroundColor = computedStyle.backgroundColor
//         }
//         if (computedStyle.color) {
//           htmlEl.style.color = computedStyle.color
//         }
//       } else {
//         // Remove backgrounds but keep text colors readable
//         htmlEl.style.backgroundColor = "transparent"
//         if (htmlEl.style.color === "white" || htmlEl.style.color === "#ffffff") {
//           htmlEl.style.color = "#000000"
//         }
//       }

//       // Apply size-appropriate styling
//       switch (tagName) {
//         case "h1":
//           htmlEl.style.fontSize = `${Math.max(12, baseFontSize + 6)}px`
//           htmlEl.style.lineHeight = "1.2"
//           htmlEl.style.marginBottom = "6px"
//           htmlEl.style.pageBreakAfter = "avoid"
//           break
//         case "h2":
//           htmlEl.style.fontSize = `${Math.max(10, baseFontSize + 4)}px`
//           htmlEl.style.lineHeight = "1.2"
//           htmlEl.style.marginBottom = "4px"
//           htmlEl.style.pageBreakAfter = "avoid"
//           break
//         case "h3":
//           htmlEl.style.fontSize = `${Math.max(9, baseFontSize + 2)}px`
//           htmlEl.style.lineHeight = "1.2"
//           htmlEl.style.marginBottom = "3px"
//           htmlEl.style.pageBreakAfter = "avoid"
//           break
//         case "p":
//           htmlEl.style.fontSize = `${Math.max(7, baseFontSize)}px`
//           htmlEl.style.lineHeight = "1.3"
//           htmlEl.style.marginBottom = "2px"
//           break
//         case "td":
//         case "th":
//           htmlEl.style.fontSize = `${Math.max(6, baseFontSize - 1)}px`
//           htmlEl.style.lineHeight = "1.2"
//           htmlEl.style.padding = itemCount > 15 ? "2px 4px" : "3px 6px"
//           htmlEl.style.verticalAlign = "top"
//           htmlEl.style.pageBreakInside = "avoid"
//           htmlEl.style.wordBreak = "break-word"

//           // Preserve table borders and colors
//           if (settings.includeBackground) {
//             const computedStyle = window.getComputedStyle(htmlEl)
//             if (computedStyle.borderColor) {
//               htmlEl.style.borderColor = computedStyle.borderColor
//             }
//           } else {
//             htmlEl.style.borderColor = "#000000"
//           }
//           break
//         case "table":
//           htmlEl.style.width = "100%"
//           htmlEl.style.borderCollapse = "collapse"
//           htmlEl.style.marginBottom = "8px"
//           htmlEl.style.pageBreakInside = "avoid"
//           break
//         case "img":
//           // Scale images appropriately
//           const currentHeight = htmlEl.style.maxHeight || "32px"
//           const heightValue = Number.parseInt(currentHeight.replace("px", "")) || 32
//           htmlEl.style.maxHeight = `${Math.max(20, Math.min(heightValue, itemCount > 15 ? 24 : 32))}px`
//           htmlEl.style.height = "auto"
//           htmlEl.style.width = "auto"
//           break
//       }

//       // Compress spacing for large content
//       if (itemCount > 15) {
//         if (htmlEl.classList.contains("mb-4") || htmlEl.classList.contains("mb-6")) {
//           htmlEl.style.marginBottom = "4px"
//         } else if (htmlEl.classList.contains("mb-2") || htmlEl.classList.contains("mb-3")) {
//           htmlEl.style.marginBottom = "2px"
//         }
//         if (htmlEl.classList.contains("p-4") || htmlEl.classList.contains("p-6")) {
//           htmlEl.style.padding = "6px"
//         } else if (htmlEl.classList.contains("p-2") || htmlEl.classList.contains("p-3")) {
//           htmlEl.style.padding = "3px"
//         }
//       }
//     })

//     // Optimize tables while preserving template styling
//     const tables = element.querySelectorAll("table")
//     tables.forEach((table) => {
//       const htmlTable = table as HTMLElement

//       // Set optimal column widths
//       const headers = table.querySelectorAll("th")
//       if (headers.length >= 4) {
//         ;(headers[0] as HTMLElement).style.width = "45%" // Description
//         ;(headers[1] as HTMLElement).style.width = "15%" // Quantity
//         ;(headers[2] as HTMLElement).style.width = "20%" // Price
//         ;(headers[3] as HTMLElement).style.width = "20%" // Amount
//       }

//       // Ensure table fits on page
//       htmlTable.style.tableLayout = "fixed"
//       htmlTable.style.wordWrap = "break-word"
//     })
//   }

//   private calculateDynamicScale(itemCount: number, userScale: number): number {
//     let scale = userScale / 100

//     // Apply scaling based on content length
//     if (itemCount > 25) {
//       scale *= 0.65
//     } else if (itemCount > 20) {
//       scale *= 0.7
//     } else if (itemCount > 15) {
//       scale *= 0.8
//     } else if (itemCount > 10) {
//       scale *= 0.9
//     }

//     return Math.max(0.5, scale)
//   }

//   private getMarginValue(margins: PrintSettings["margins"]): string {
//     switch (margins) {
//       case "none":
//         return "0"
//       case "minimum":
//         return "5mm"
//       case "normal":
//         return "10mm"
//       case "maximum":
//         return "15mm"
//       default:
//         return "10mm"
//     }
//   }

//   private createPrintDocument(
//     element: HTMLElement,
//     invoiceData: InvoiceData,
//     settings: PrintSettings,
//     template: InvoiceTemplate,
//   ): string {
//     const colors = this.getTemplateColors(template)
//     const pageSize = this.getPageSize(settings.pageSize, settings.orientation)

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Invoice ${invoiceData.invoiceNumber}</title>
//         <style>
//           @page {
//             size: ${pageSize};
//             margin: ${this.getMarginValue(settings.margins)};
//           }
          
//           @media print {
//             body {
//               margin: 0 !important;
//               padding: 0 !important;
//               font-family: Arial, sans-serif !important;
//               color: #000000 !important;
//               background: white !important;
//               -webkit-print-color-adjust: ${settings.includeBackground ? "exact" : "economy"};
//               print-color-adjust: ${settings.includeBackground ? "exact" : "economy"};
//             }
            
//             * {
//               box-sizing: border-box !important;
//               page-break-inside: avoid !important;
//             }
            
//             .invoice-container {
//               width: 100% !important;
//               max-width: 100% !important;
//             }
            
//             table {
//               border-collapse: collapse !important;
//               width: 100% !important;
//               page-break-inside: avoid !important;
//             }
            
//             th, td {
//               page-break-inside: avoid !important;
//               vertical-align: top !important;
//               word-break: break-word !important;
//             }
            
//             img {
//               page-break-inside: avoid !important;
//               max-width: 100% !important;
//               height: auto !important;
//             }
            
//             h1, h2, h3 {
//               page-break-after: avoid !important;
//             }
            
//             .page-break {
//               display: none !important;
//             }
//           }
          
//           /* Template-specific print styles */
//           ${this.getTemplatePrintStyles(template, colors, settings.includeBackground)}
          
//           body {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//             color: #000000;
//             background: white;
//           }
          
//           .invoice-container {
//             width: 100%;
//             max-width: 100%;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-container">
//           ${element.outerHTML}
//         </div>
        
//         ${
//           settings.printFooters
//             ? `
//         <div style="position: fixed; bottom: 5mm; left: 0; right: 0; text-align: center; font-size: 8px; color: #666;">
//           Invoice ${invoiceData.invoiceNumber} - ${new Date().toLocaleDateString()}
//         </div>
//         `
//             : ""
//         }
//       </body>
//       </html>
//     `
//   }

//   private getTemplatePrintStyles(template: InvoiceTemplate, colors: any, includeBackground: boolean): string {
//     const bgStyle = includeBackground ? "" : "background: white !important;"

//     switch (template) {
//       case "modern":
//         return `
//           .header { ${bgStyle} color: ${includeBackground ? colors.primary : "#000000"} !important; }
//           th { background-color: ${includeBackground ? colors.secondary : "#f5f5f5"} !important; color: ${colors.accent} !important; }
//           .totals { color: ${colors.primary} !important; }
//         `
//       case "classic":
//         return `
//           .header { ${bgStyle} border-top: 2px solid ${colors.primary} !important; border-bottom: 2px solid ${colors.primary} !important; }
//           th { background-color: ${includeBackground ? colors.secondary : "#f5f5f5"} !important; border: 1px solid ${colors.primary} !important; }
//           table { border: 1px solid ${colors.primary} !important; }
//           td { border: 1px solid ${colors.primary} !important; }
//         `
//       case "creative":
//         return `
//           .header { background-color: ${includeBackground ? colors.primary : "white"} !important; color: ${includeBackground ? "white" : colors.primary} !important; }
//           th { background-color: ${includeBackground ? colors.primary : "#f5f5f5"} !important; color: ${includeBackground ? "white" : colors.primary} !important; }
//           .totals { background-color: ${includeBackground ? colors.secondary : "white"} !important; }
//         `
//       case "elegant":
//         return `
//           .header { border-bottom: 4px solid ${colors.primary} !important; ${bgStyle} }
//           th { color: ${colors.accent} !important; border-bottom: 2px solid ${colors.primary} !important; }
//           .totals { border-top: 2px solid ${colors.primary} !important; }
//         `
//       case "bold":
//         return `
//           .header { background-color: ${includeBackground ? colors.primary : "white"} !important; color: ${includeBackground ? "white" : colors.primary} !important; }
//           th { background-color: ${includeBackground ? colors.accent : "#f5f5f5"} !important; color: ${includeBackground ? "white" : colors.accent} !important; }
//           .totals { border: 1px solid ${colors.primary} !important; }
//         `
//       case "minimal":
//       default:
//         return `
//           th { background-color: #f5f5f5 !important; color: ${colors.accent} !important; }
//           table { border-bottom: 1px solid ${colors.primary} !important; }
//         `
//     }
//   }

//   private getPageSize(pageSize: PrintSettings["pageSize"], orientation: PrintSettings["orientation"]): string {
//     const sizes = {
//       A4: orientation === "landscape" ? "A4 landscape" : "A4 portrait",
//       Letter: orientation === "landscape" ? "letter landscape" : "letter portrait",
//       Legal: orientation === "landscape" ? "legal landscape" : "legal portrait",
//       A3: orientation === "landscape" ? "A3 landscape" : "A3 portrait",
//     }
//     return sizes[pageSize]
//   }

//   private openPrintWindow(content: string, settings: PrintSettings): void {
//     if (this.printWindow && !this.printWindow.closed) {
//       this.printWindow.close()
//     }

//     this.printWindow = window.open("", "_blank", "width=900,height=700,scrollbars=yes,resizable=yes")

//     if (!this.printWindow) {
//       throw new Error("Could not open print window. Please check your popup blocker settings.")
//     }

//     this.printWindow.document.write(content)
//     this.printWindow.document.close()

//     this.printWindow.onload = () => {
//       setTimeout(() => {
//         if (this.printWindow) {
//           this.printWindow.focus()
//           this.printWindow.print()

//           setTimeout(() => {
//             if (this.printWindow && !this.printWindow.closed) {
//               this.printWindow.close()
//             }
//           }, 1000)
//         }
//       }, 500)
//     }
//   }
// }

// export const printManager = PrintManager.getInstance()
