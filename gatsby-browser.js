import "tailwindcss/dist/base.min.css"

import React, { useState, useEffect } from "react"
import ThemeContext from "./src/lib/context/ThemContext"

const Wrapper = ({ element }) => {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleThemMode = () => {
    setDarkMode(!isDarkMode)
    if (!isDarkMode) {
      localStorage.setItem("isDarkMode", "true")
    } else {
      localStorage.setItem("isDarkMode", "false")
    }
  }

  useEffect(() => {
    if (window) {
      try {
        const mode = localStorage.getItem("isDarkMode")
        if (mode === "true") {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
      } catch (error) {
        localStorage.setItem("isDarkMode", "false")
      }
    }
  }, [])
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleThemMode }}>
      {element}
    </ThemeContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => <Wrapper element={element} />
