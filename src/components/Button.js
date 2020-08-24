import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"

const Button = ({ children, onClick, _css, title }) => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <button
      title={title}
      css={[
        css`
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          background-color: ${isDarkMode ? "#333638" : "#FFFFFF"};
          color: ${isDarkMode ? "#FFFFFF" : "#636363"};
          &:hover {
            background-color: ${isDarkMode ? "#52575c" : "#404040"};
            color: ${isDarkMode ? "#D9D9D9" : "#FFFFFF"};
          }
          ${tw`text-xs px-2 py-2 rounded-full transform hover:scale-105 cursor-pointer`}
        `,
        _css,
      ]}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
