import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"
import { darkModeColor, whiteModeColor } from "../../them-color"

const Tag = ({ onClick, tag, selectedTag }) => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <button
      css={css`
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        ${tw`text-base font-bold rounded-full mr-2 mb-2 py-1 px-3 focus:outline-none`}
        ${selectedTag === tag ? "color" : "background-color"}:
        ${isDarkMode ? `#2d3748` : `#edf2f7`};
        ${selectedTag === tag ? `background-color` : `color`}:
        ${isDarkMode ? darkModeColor.textColor1 : whiteModeColor.textColor1};
      `}
      onClick={() => onClick(tag)}
    >
      {tag}
    </button>
  )
}

export default Tag
