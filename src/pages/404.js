import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { darkModeColor, whiteModeColor } from "../../them-color"
import ThemeContext from "../lib/context/ThemContext"

export default () => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <Layout>
      <SEO title="Page Not Found" />
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 1rem;
          background-color: ${isDarkMode ? "#333" : "#eee"};
          border-radius: 0.25rem;
          border-left-width: 4px;
          border-color: ${isDarkMode
            ? darkModeColor.mainColor2
            : whiteModeColor.mainColor2};
        `}
      >
        <span css={tw`text-6xl text-red-400 font-bold`}>404</span>
        <span css={tw`text-2xl font-semibold`}> : Page Not Found!</span>
      </div>
    </Layout>
  )
}
