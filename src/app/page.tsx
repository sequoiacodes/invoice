'use client'

import InvoiceCreator from "@/components/invoice-creator"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, ComputerIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"


export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const ThemeIcon = () => {
    if (theme === 'dark') {
      return <MoonIcon className="w-5 h-5 text-indigo-500" />
    } else if (theme === 'light') {
      return <SunIcon className="w-5 h-5 text-yellow-400" />
    } else {
      return <ComputerIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 ease-in-out">
      <header className="w-full py-6 px-4 flex justify-between items-center container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl relative font-extrabold tracking-tight text-gray-900 dark:text-white mb-1 group">
            BiLL
            <span className="absolute bottom-5 text-xs font-normal uppercase transform -translate-x-4 transition-transform duration-1000 group-hover:translate-x-0">
              {theme}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Professional Invoice Maker</p>
        </motion.div>

        {/* Theme Toggle Button with Dropdown - FIXED POSITIONING */}
        <div className="relative z-40"> {/* Make this div relative and give it a z-index */}
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            // Removed 'fixed top-5 z-30 right-4' from here
            className="p-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: theme === 'dark' ? 90 : (theme === 'light' ? -90 : 0) }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: theme === 'dark' ? -90 : (theme === 'light' ? 90 : 0) }}
                transition={{ duration: 0.3 }}
              >
                <ThemeIcon />
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Theme Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                // Adjusted positioning classes for absolute positioning relative to its parent
                className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => { setTheme('light'); setIsDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <SunIcon className="w-4 h-4" /> Light
                </button>
                <button
                  onClick={() => { setTheme('dark'); setIsDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <MoonIcon className="w-4 h-4" /> Dark
                </button>
                <button
                  onClick={() => { setTheme('system'); setIsDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <ComputerIcon className="w-4 h-4" /> System
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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