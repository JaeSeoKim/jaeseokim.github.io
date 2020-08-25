import React from "react"

const ThemeContext = React.createContext({
  isDarkMode: false,
  toggleThemMode: () => {},
})

export default ThemeContext
