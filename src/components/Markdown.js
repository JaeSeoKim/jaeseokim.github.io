import React, { useContext } from "react"
import { css } from "twin.macro"
import ThemeContext from "../lib/context/ThemContext"
import { whiteModeColor, darkModeColor } from "../../them-color"

const Markdown = ({ html }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const MarkdownCSS = css`
    font-size: 1rem;
    word-break: break-word;

    h1 > a > svg,
    h2 > a > svg,
    h3 > a > svg,
    h4 > a > svg,
    h5 > a > svg,
    h6 > a > svg {
      fill: ${isDarkMode ? "#fff" : "#000"};
    }

    h1,
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    h3,
    h4,
    h5,
    h6 {
      font-size: 1.125rem;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    @media (min-width: 640px) {
      h1,
      h2 {
        font-size: 1.5rem;
      }
      h3,
      h4,
      h5,
      h6 {
        font-size: 1.25rem;
      }
    }

    a {
      color: ${isDarkMode
        ? darkModeColor.mainColor2
        : whiteModeColor.mainColor2};
    }
    a:hover {
      text-decoration: underline;
    }
    p {
      margin: 0.3rem;
    }
    ul,
    ol {
      margin: 0.3rem;
      margin-left: 2rem;
    }
    li > p,
    li > ul,
    li > ol {
      margin-bottom: 0;
    }
    ol {
      list-style-type: decimal;
    }
    ul {
      list-style-type: disc;
    }
    blockquote {
      padding: 0.5rem;
      background-color: ${isDarkMode ? "#333" : "#eee"};
      border-radius: 0.1rem;
      margin: 0.3rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      border-left-width: 4px;
      border-color: ${isDarkMode
        ? darkModeColor.mainColor2
        : whiteModeColor.mainColor2};
    }
    blockquote > p {
      margin: 0.5rem;
    }
    blockquote > h1,
    blockquote > h2,
    blockquote > h3,
    blockquote > h4,
    blockquote > h5 {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    td,
    th {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      border-width: 1px;
      border-color: ${isDarkMode
        ? darkModeColor.mainColor2
        : whiteModeColor.mainColor2};
    }
    tr:nth-of-type(even) {
      background-color: ${isDarkMode ? "#2f2f2f" : "#eee"};
    }
    th {
      background-color: ${isDarkMode ? "#2f2f2f" : "#eee"};
    }
    table {
      margin-bottom: 1.5rem;
    }

    p > code {
      padding-right: 0.1rem;
      padding-left: 0.1rem;
      border-width: 1px;
      border-color: ${isDarkMode
        ? darkModeColor.mainColor2
        : whiteModeColor.mainColor2};
      border-radius: 0.25rem;
      color : ${isDarkMode
        ? darkModeColor.textColor1
        : whiteModeColor.textColor1};
      background-color: ${isDarkMode ? "#404040" : "#eee"};
      white-space: pre-line;
    }
  `
  return (
    <div>
      <div
        css={MarkdownCSS}
        className="markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default Markdown
