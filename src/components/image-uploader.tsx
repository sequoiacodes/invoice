"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  image: string | null
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  label: string
}

export default function ImageUploader({ image, setImage, label }: ImageUploaderProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
  }

  return (
    <div className="space-y-2">
      {image ? (
        <div className="relative">
          <img
            src={image || "/placeholder.svg"}
            alt="Uploaded image"
            className="max-h-32 object-contain border border-gray-300 rounded-md p-2"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 bg-red-600 hover:bg-red-700"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 hover:border-gray-400">
          <label className="cursor-pointer flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">{label}</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
      )}
    </div>
  )
}
