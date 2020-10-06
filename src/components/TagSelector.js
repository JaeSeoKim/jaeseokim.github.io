import React, { useContext, useRef, useCallback } from "react"
import tw, { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"
import { darkModeColor, whiteModeColor } from "../../them-color"
import Tags from "./Tags"
import Tag from "./Tag"

const TagSelector = ({ onTagClick, state, tags }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const containerRef = useRef(null)

  const scrollToCenter = useCallback(
    (tabRef) => {
      const { offsetWidth: tabWidth } = tabRef.current
      const { scrollLeft, offsetWidth: containerWidth } = containerRef.current
      const tabLeft = tabRef.current.getBoundingClientRect().left
      const containerLeft = containerRef.current.getBoundingClientRect().left
      const refineLeft = tabLeft - containerLeft
      const targetScollX =
        scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2

      containerRef.current.scroll({
        left: targetScollX,
        top: 0,
        behavior: "smooth",
      })
    },
    [containerRef]
  )

  return (
    <div
      ref={containerRef}
      css={css`
        padding: 0.5rem;
        border-radius: 0.1rem;
        margin: 0.3rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border-left-width: 4px;
        border-color: ${isDarkMode
          ? darkModeColor.mainColor2
          : whiteModeColor.mainColor2};
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
        ${tw`flex flex-no-wrap content-center mx-4 py-2 pl-2 overflow-scroll`}
      `}
    >
      <Tag
        tag={"ALL"}
        selectedTag={state.tag}
        index={"default"}
        onClick={onTagClick}
        scrollToCenter={scrollToCenter}
      />
      <Tags
        tags={tags}
        onClick={onTagClick}
        tag={state.tag}
        scrollToCenter={scrollToCenter}
      />
    </div>
  )
}

export default TagSelector
