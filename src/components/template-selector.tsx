"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { InvoiceTemplate } from "@/lib/types"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: InvoiceTemplate
  onSelectTemplate: (template: InvoiceTemplate) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const templates: { id: InvoiceTemplate; name: string; description: string; colorClass: string }[] = [
    {
      id: "modern",
      name: "Modern Blue",
      description: "Clean design with blue accents and modern typography",
      colorClass: "bg-blue-500",
    },
    {
      id: "classic",
      name: "Professional",
      description: "Traditional layout with formal business appearance",
      colorClass: "bg-gray-700",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean with minimal visual elements",
      colorClass: "bg-gray-400",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern design with creative color scheme and layout",
      colorClass: "bg-purple-500",
    },
    {
      id: "elegant",
      name: "Elegant",
      description: "Sophisticated design with elegant typography",
      colorClass: "bg-emerald-500",
    },
    {
      id: "bold",
      name: "Bold",
      description: "Eye-catching design with bold colors and modern styling",
      colorClass: "bg-orange-500",
    },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">Select Template</h3>
          <p className="text-sm text-gray-600">Choose a design for your invoice</p>
        </div>

        <RadioGroup
          value={selectedTemplate}
          onValueChange={(value) => onSelectTemplate(value as InvoiceTemplate)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {templates.map((template) => (
            <div key={template.id} className="relative">
              <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" />
              <Label
                htmlFor={template.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
              >
                <div className="mb-3 h-20 w-full bg-gray-100 rounded flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-3 ${template.colorClass}`}></div>
                  <div className="text-xs text-gray-500 mt-2">{template.name}</div>
                </div>
                <div className="w-full text-center">
                  <p className="font-medium text-gray-900">{template.name}</p>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
