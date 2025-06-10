// "use client"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Slider } from "@/components/ui/slider"
// import { Printer, Settings, AlertTriangle, Zap, FileText } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export interface PrintSettings {
//   pageSize: "A4" | "Letter" | "Legal" | "A3"
//   orientation: "portrait" | "landscape"
//   margins: "none" | "minimum" | "normal" | "maximum"
//   scale: number
//   includeBackground: boolean
//   printHeaders: boolean
//   printFooters: boolean
//   quality: "draft" | "normal" | "high"
// }

// interface PrintSettingsDialogProps {
//   onPrint: (settings: PrintSettings) => void
//   disabled?: boolean
//   itemCount?: number
// }

// export default function PrintSettingsDialog({ onPrint, disabled, itemCount = 0 }: PrintSettingsDialogProps) {
//   const [open, setOpen] = useState(false)
//   const [settings, setSettings] = useState<PrintSettings>({
//     pageSize: "A4",
//     orientation: "portrait",
//     margins: "minimum",
//     scale: 100,
//     includeBackground: true,
//     printHeaders: false,
//     printFooters: false,
//     quality: "high",
//   })

//   const handlePrint = () => {
//     onPrint(settings)
//     setOpen(false)
//   }

//   const getRecommendedScale = () => {
//     if (itemCount > 20) return 60
//     if (itemCount > 15) return 70
//     if (itemCount > 10) return 80
//     if (itemCount > 5) return 90
//     return 100
//   }

//   const applyRecommendedSettings = () => {
//     const recommendedScale = getRecommendedScale()
//     setSettings({
//       ...settings,
//       scale: recommendedScale,
//       margins: itemCount > 10 ? "none" : "minimum",
//       orientation: itemCount > 15 ? "landscape" : "portrait",
//     })
//   }

//   const applyQuickSettings = (preset: "compact" | "standard" | "quality") => {
//     switch (preset) {
//       case "compact":
//         setSettings({
//           pageSize: "A4",
//           orientation: "portrait",
//           margins: "none",
//           scale: 70,
//           includeBackground: false,
//           printHeaders: false,
//           printFooters: false,
//           quality: "draft",
//         })
//         break
//       case "standard":
//         setSettings({
//           pageSize: "A4",
//           orientation: "portrait",
//           margins: "minimum",
//           scale: 90,
//           includeBackground: true,
//           printHeaders: false,
//           printFooters: true,
//           quality: "normal",
//         })
//         break
//       case "quality":
//         setSettings({
//           pageSize: "A4",
//           orientation: "portrait",
//           margins: "normal",
//           scale: 100,
//           includeBackground: true,
//           printHeaders: false,
//           printFooters: true,
//           quality: "high",
//         })
//         break
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button
//           disabled={disabled}
//           className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
//         >
//           <Printer className="mr-2 h-4 w-4" />
//           Print Settings
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
//         <DialogHeader className="pb-2">
//           <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
//             <Settings className="h-5 w-5" />
//             Print Settings - Single Page Guaranteed
//           </DialogTitle>
//         </DialogHeader>

//         <Tabs defaultValue="quick" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
//             <TabsTrigger
//               value="quick"
//               className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
//             >
//               <Zap className="h-3 w-3 mr-1" />
//               Quick
//             </TabsTrigger>
//             <TabsTrigger
//               value="advanced"
//               className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
//             >
//               <Settings className="h-3 w-3 mr-1" />
//               Advanced
//             </TabsTrigger>
//             <TabsTrigger
//               value="info"
//               className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
//             >
//               <FileText className="h-3 w-3 mr-1" />
//               Info
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="quick" className="space-y-4 mt-4">
//             {/* Content Warning */}
//             {itemCount > 10 && (
//               <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
//                 <div className="flex items-start gap-2">
//                   <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
//                   <div className="text-sm">
//                     <p className="font-medium text-amber-800 dark:text-amber-200">Large Content ({itemCount} items)</p>
//                     <p className="text-amber-700 dark:text-amber-300 text-xs">
//                       Auto-scaling will ensure single page fit.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Quick Presets */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quick Presets</h3>
//               <div className="grid grid-cols-1 gap-2">
//                 <Button
//                   onClick={() => applyQuickSettings("compact")}
//                   variant="outline"
//                   className="justify-start h-auto p-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
//                 >
//                   <div className="text-left">
//                     <div className="font-medium text-gray-900 dark:text-gray-100">Maximum Fit</div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">
//                       No margins, 70% scale, draft quality - fits most content
//                     </div>
//                   </div>
//                 </Button>

//                 <Button
//                   onClick={() => applyQuickSettings("standard")}
//                   variant="outline"
//                   className="justify-start h-auto p-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
//                 >
//                   <div className="text-left">
//                     <div className="font-medium text-gray-900 dark:text-gray-100">Balanced</div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">
//                       Minimal margins, 90% scale, normal quality - recommended
//                     </div>
//                   </div>
//                 </Button>

//                 <Button
//                   onClick={() => applyQuickSettings("quality")}
//                   variant="outline"
//                   className="justify-start h-auto p-3 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
//                 >
//                   <div className="text-left">
//                     <div className="font-medium text-gray-900 dark:text-gray-100">Best Quality</div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">
//                       Normal margins, 100% scale, high quality - for short invoices
//                     </div>
//                   </div>
//                 </Button>

//                 <Button
//                   onClick={applyRecommendedSettings}
//                   className="justify-start h-auto p-3 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
//                 >
//                   <div className="text-left">
//                     <div className="font-medium">Smart Recommendation</div>
//                     <div className="text-xs opacity-90">
//                       Auto-optimized for {itemCount} items - {getRecommendedScale()}% scale
//                     </div>
//                   </div>
//                 </Button>
//               </div>
//             </div>

//             {/* Current Settings Preview */}
//             <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//               <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Current Settings</h4>
//               <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
//                 <div>
//                   Page: {settings.pageSize} {settings.orientation}
//                 </div>
//                 <div>Scale: {settings.scale}%</div>
//                 <div>Margins: {settings.margins}</div>
//                 <div>Quality: {settings.quality}</div>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="advanced" className="space-y-4 mt-4">
//             {/* Page Settings */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Page Settings</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="space-y-2">
//                   <Label htmlFor="pageSize" className="text-xs text-gray-700 dark:text-gray-300">
//                     Page Size
//                   </Label>
//                   <Select
//                     value={settings.pageSize}
//                     onValueChange={(value: PrintSettings["pageSize"]) => setSettings({ ...settings, pageSize: value })}
//                   >
//                     <SelectTrigger className="h-8 text-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                       <SelectItem value="A4">A4</SelectItem>
//                       <SelectItem value="Letter">Letter</SelectItem>
//                       <SelectItem value="Legal">Legal</SelectItem>
//                       <SelectItem value="A3">A3</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="orientation" className="text-xs text-gray-700 dark:text-gray-300">
//                     Orientation
//                   </Label>
//                   <Select
//                     value={settings.orientation}
//                     onValueChange={(value: PrintSettings["orientation"]) =>
//                       setSettings({ ...settings, orientation: value })
//                     }
//                   >
//                     <SelectTrigger className="h-8 text-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                       <SelectItem value="portrait">Portrait</SelectItem>
//                       <SelectItem value="landscape">Landscape {itemCount > 15 ? "★" : ""}</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="margins" className="text-xs text-gray-700 dark:text-gray-300">
//                   Margins
//                 </Label>
//                 <Select
//                   value={settings.margins}
//                   onValueChange={(value: PrintSettings["margins"]) => setSettings({ ...settings, margins: value })}
//                 >
//                   <SelectTrigger className="h-8 text-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                     <SelectItem value="none">None {itemCount > 10 ? "★" : ""}</SelectItem>
//                     <SelectItem value="minimum">Minimum</SelectItem>
//                     <SelectItem value="normal">Normal</SelectItem>
//                     <SelectItem value="maximum">Maximum</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Scale Settings */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Scale & Quality</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <Label htmlFor="scale" className="text-xs text-gray-700 dark:text-gray-300">
//                     Scale: {settings.scale}%
//                   </Label>
//                   {settings.scale !== getRecommendedScale() && (
//                     <span className="text-xs text-amber-600 dark:text-amber-400">Rec: {getRecommendedScale()}%</span>
//                   )}
//                 </div>
//                 <Slider
//                   value={[settings.scale]}
//                   onValueChange={(value) => setSettings({ ...settings, scale: value[0] })}
//                   max={200}
//                   min={40}
//                   step={5}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//                   <span>40%</span>
//                   <span>100%</span>
//                   <span>200%</span>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="quality" className="text-xs text-gray-700 dark:text-gray-300">
//                   Print Quality
//                 </Label>
//                 <Select
//                   value={settings.quality}
//                   onValueChange={(value: PrintSettings["quality"]) => setSettings({ ...settings, quality: value })}
//                 >
//                   <SelectTrigger className="h-8 text-xs border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//                     <SelectItem value="draft">Draft</SelectItem>
//                     <SelectItem value="normal">Normal</SelectItem>
//                     <SelectItem value="high">High</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Additional Options */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Options</h3>
//               <div className="space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="includeBackground"
//                     checked={settings.includeBackground}
//                     onCheckedChange={(checked) => setSettings({ ...settings, includeBackground: checked as boolean })}
//                     className="border-gray-300 dark:border-gray-600"
//                   />
//                   <Label htmlFor="includeBackground" className="text-xs text-gray-700 dark:text-gray-300">
//                     Include background colors
//                   </Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="printFooters"
//                     checked={settings.printFooters}
//                     onCheckedChange={(checked) => setSettings({ ...settings, printFooters: checked as boolean })}
//                     className="border-gray-300 dark:border-gray-600"
//                   />
//                   <Label htmlFor="printFooters" className="text-xs text-gray-700 dark:text-gray-300">
//                     Print page footer
//                   </Label>
//                 </div>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="info" className="space-y-4 mt-4">
//             {/* Single Page Guarantee */}
//             <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="h-2 w-2 bg-green-500 rounded-full"></div>
//                 <p className="text-sm font-medium text-green-800 dark:text-green-200">Single Page Guarantee</p>
//               </div>
//               <p className="text-xs text-green-700 dark:text-green-300">
//                 All content will be automatically scaled to fit on exactly one page, regardless of the number of items.
//               </p>
//             </div>

//             {/* Content Analysis */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Content Analysis</h3>
//               <div className="grid grid-cols-2 gap-3 text-xs">
//                 <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
//                   <div className="font-medium text-gray-900 dark:text-gray-100">Items Count</div>
//                   <div className="text-gray-600 dark:text-gray-400">{itemCount} items</div>
//                 </div>
//                 <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
//                   <div className="font-medium text-gray-900 dark:text-gray-100">Complexity</div>
//                   <div className="text-gray-600 dark:text-gray-400">
//                     {itemCount > 20
//                       ? "Very High"
//                       : itemCount > 15
//                         ? "High"
//                         : itemCount > 10
//                           ? "Medium"
//                           : itemCount > 5
//                             ? "Low"
//                             : "Very Low"}
//                   </div>
//                 </div>
//                 <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
//                   <div className="font-medium text-gray-900 dark:text-gray-100">Recommended Scale</div>
//                   <div className="text-gray-600 dark:text-gray-400">{getRecommendedScale()}%</div>
//                 </div>
//                 <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
//                   <div className="font-medium text-gray-900 dark:text-gray-100">Best Orientation</div>
//                   <div className="text-gray-600 dark:text-gray-400">{itemCount > 15 ? "Landscape" : "Portrait"}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Tips */}
//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Optimization Tips</h3>
//               <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
//                 <li>• Use "Smart Recommendation" for best results</li>
//                 <li>• Landscape orientation helps with wide content</li>
//                 <li>• Remove margins for maximum space utilization</li>
//                 <li>• Lower scale ensures everything fits on one page</li>
//                 <li>• Draft quality prints faster for previews</li>
//               </ul>
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
//           <Button
//             variant="outline"
//             onClick={() => setOpen(false)}
//             className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handlePrint}
//             className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
//           >
//             <Printer className="mr-2 h-4 w-4" />
//             Print
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
