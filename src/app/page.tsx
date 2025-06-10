'use client'

import InvoiceCreator from "@/components/invoice-creator"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 ease-in-out">
      <header className="w-full py-6 px-4 flex justify-between items-center container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl relative font-extrabold tracking-tight text-gray-900 dark:text-white mb-1">BiLL <span className=" absolute bottom-5 text-xs font-normal transform -translate-x-4 ">{theme}</span> </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Professional Invoice Maker</p>
        </motion.div>

        <motion.button
          onClick={toggleTheme}
          className="p-3 fixed top-5 z-30 right-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <SunIcon className="w-5 h-5 text-yellow-400" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <MoonIcon className="w-5 h-5 text-indigo-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <InvoiceCreator />
        </motion.div>
      </main>
    </div>
  )
}
