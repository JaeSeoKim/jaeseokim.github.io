import React, { useContext, useRef, useEffect, useCallback } from "react"
import tw, { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"
import { darkModeColor, whiteModeColor } from "../../them-color"

const Tag = ({ onClick, tag, selectedTag, scrollToCenter }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const tabRef = useRef(null)

  const handleClick = useCallback(() => {
    if (scrollToCenter) scrollToCenter(tabRef)
    if (onClick) onClick(tag)
  }, [scrollToCenter, onClick, tabRef, tag])

  useEffect(() => {
    if (selectedTag === tag && scrollToCenter) {
      scrollToCenter(tabRef)
    }
  }, [scrollToCenter, selectedTag, tabRef, tag])

  return (
    <button
      ref={tabRef}
      css={css`
        white-space: nowrap;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        ${tw`text-base font-bold rounded-full mr-2 my-1 py-1 px-3`}
        ${selectedTag === tag ? "color" : "background-color"}:
        ${isDarkMode ? `#2d3748` : `#edf2f7`};
        ${selectedTag === tag ? `background-color` : `color`}: ${isDarkMode
          ? darkModeColor.textColor1
          : whiteModeColor.textColor1};
      `}
      onClick={handleClick}
    >
      {tag}
    </button>
  )
}

export default Tag
