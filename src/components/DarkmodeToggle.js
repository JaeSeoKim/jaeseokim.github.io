import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"
import Button from "./Button"
import { FiMoon, FiSun } from "react-icons/fi"
import { AiOutlineArrowUp } from "react-icons/ai"

const DarkmodeToggle = () => {
  const { isDarkMode, toggleThemMode } = useContext(ThemeContext)
  const Wrapper = tw.div`flex fixed bottom-0 right-0 pr-6 pb-6 select-none`
  return (
    <Wrapper>
      <Button
        title={isDarkMode ? "change to lightmode" : "change to darkmode"}
        onClick={toggleThemMode}
        _css={css`
          ${tw`flex content-end`}
          z-index: 100;
        `}
      >
        {isDarkMode ? (
          <>
            <FiSun
              css={css`
                ${tw`fill-current text-red-400 w-4 h-4 my-auto md:inline-block mr-0 md:mr-1`}
              `}
            />
            <span
              css={css`
                ${tw`hidden md:inline-block`}
              `}
            >
              라이트 모드로 보기
            </span>
          </>
        ) : (
          <>
            <FiMoon
              css={css`
                ${tw`fill-current text-yellow-400 w-4 h-4 my-auto md:inline-block mx-0 md:mx-1`}
              `}
            />
            <span
              css={css`
                ${tw`hidden md:inline-block mr-0 md:mr-1`}
              `}
            >
              다크 모드로 보기
            </span>
          </>
        )}
      </Button>
      <Button
        title={"top page"}
        _css={css`
          ${tw`ml-2 my-auto`}
          z-index: 100;
        `}
        onClick={() => {
          window.scroll({ top: 0, behavior: "smooth" })
        }}
      >
        <AiOutlineArrowUp
          css={css`
            ${tw`w-4 h-4`}
          `}
        />
      </Button>
    </Wrapper>
  )
}

export default DarkmodeToggle
