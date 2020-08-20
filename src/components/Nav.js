import React, { useState, useEffect, useContext } from "react"
import tw, { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"
import { whiteModeColor, darkModeColor } from "../../them-color"
import { Link } from "gatsby"

const Wrapper = tw.nav`
flex items-center justify-between flex-wrap p-5
`

var old_windows_Scrolly = 0

const Nav = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const [isVisible, setIsVisible] = useState(false)

  const backgroundCSS = css`
    background: linear-gradient(
      90deg,
      ${isDarkMode
        ? darkModeColor.mainColor1 + "," + darkModeColor.mainColor2
        : whiteModeColor.mainColor1 + "," + whiteModeColor.mainColor2}
    );
  `

  const handleScroll = (_e) => {
    if (window.scrollY < old_windows_Scrolly && window.scrollY > 10) {
      old_windows_Scrolly = window.scrollY + 5
      setIsVisible(true)
    } else {
      setIsVisible(false)
      old_windows_Scrolly = window.scrollY
    }
  }

  const Content = () => {
    return (
      <div css={tw`w-full max-w-screen-xl mx-auto`}>
        <Link css={tw`text-xl text-white font-bold`} to={"/"}>
          JaeSeoKim's Blog
        </Link>
      </div>
    )
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <Wrapper css={backgroundCSS}>
        <Content />
      </Wrapper>
      <Wrapper
        css={[
          backgroundCSS,
          tw`fixed w-full shadow`,
          css`
            z-index: 100;
            transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
            top: ${isVisible ? "0px" : "-100px"};
          `,
        ]}
      >
        <Content />
      </Wrapper>
    </>
  )
}

export default Nav
