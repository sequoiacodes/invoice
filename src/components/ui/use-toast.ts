"use client"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export const toast = ({ title, description, variant = "default" }: ToastProps) => {
  // Simple toast implementation - in a real app you'd use a proper toast library
  const toastElement = document.createElement("div")
  toastElement.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
    variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"
  }`
  toastElement.innerHTML = `
    ${title ? `<div class="font-semibold">${title}</div>` : ""}
    ${description ? `<div class="text-sm">${description}</div>` : ""}
  `

  document.body.appendChild(toastElement)

  setTimeout(() => {
    document.body.removeChild(toastElement)
  }, 3000)
}

export const useToast = () => {
  return { toast }
}
