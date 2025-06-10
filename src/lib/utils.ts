import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toFixed(2)}`
}

export function numberToWords(num: number): string {
  if (num === 0) return "zero"

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ]

  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

  const scales = ["", "thousand", "million", "billion", "trillion"]

  function convertHundreds(n: number): string {
    let result = ""

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " hundred"
      n %= 100
      if (n > 0) result += " "
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)]
      n %= 10
      if (n > 0) result += " " + ones[n]
    } else if (n > 0) {
      result += ones[n]
    }

    return result
  }

  function convertNumber(n: number): string {
    if (n === 0) return ""

    let result = ""
    let scaleIndex = 0

    while (n > 0) {
      const chunk = n % 1000
      if (chunk !== 0) {
        const chunkWords = convertHundreds(chunk)
        if (scaleIndex > 0) {
          result = chunkWords + " " + scales[scaleIndex] + (result ? " " + result : "")
        } else {
          result = chunkWords
        }
      }
      n = Math.floor(n / 1000)
      scaleIndex++
    }

    return result
  }

  // Handle decimal part
  const integerPart = Math.floor(num)
  const decimalPart = Math.round((num - integerPart) * 100)

  let result = convertNumber(integerPart)

  if (decimalPart > 0) {
    result += " and " + convertNumber(decimalPart) + " cents"
  }

  return result
}
