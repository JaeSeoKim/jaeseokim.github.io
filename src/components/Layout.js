import React, { useContext } from "react"
import ThemeContext from "../lib/context/ThemContext"
import tw, { css } from "twin.macro"
import Nav from "./Nav"
import DarkmodeToggle from "./DarkmodeToggle"
import Footer from "./Footer"

const Wrapper = tw.div`min-h-screen`
const Layout = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <Wrapper
      css={css`
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        background-color: ${isDarkMode ? "#1E1F21" : "#FFFFFF"};
        color: ${isDarkMode ? "#EEEEEE" : "#333333"};
      `}
    >
      <div
        css={css`
          min-height: calc(100vh - 100px);
        `}
      >
        <Nav />
        {children}
      </div>
      <DarkmodeToggle />
      <Footer />
    </Wrapper>
  )
}

export default Layout
