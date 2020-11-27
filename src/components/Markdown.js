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
        ? darkModeColor.textColor1
        : whiteModeColor.textColor1};
    }
    a:hover {
      text-decoration: underline;
    }
    p {
      margin: 0.3rem;
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
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
      background-color: ${isDarkMode ? "#333" : "#eee"};
    }
    th {
      background-color: ${isDarkMode ? "#333" : "#eee"};
    }
    table {
      margin-bottom: 1.5rem;
    }

    p > code,
    li > code {
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
      padding-right: 0.25rem;
      padding-left: 0.25rem;
      border-radius: 0.25rem;
      color: ${isDarkMode
        ? darkModeColor.textColor1
        : whiteModeColor.textColor1};
      background-color: ${isDarkMode ? "#333" : "#eee"};
      white-space: pre-line;
    }

    pre.grvsc-container {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    hr {
      margin-top: 24px;
      margin-bottom: 24px;
      height: 2px;
      border: none;
      background: linear-gradient(
        270deg,
        ${isDarkMode
          ? darkModeColor.mainColor1 +
            "," +
            darkModeColor.mainColor2 +
            "," +
            darkModeColor.mainColor3
          : whiteModeColor.mainColor1 +
            "," +
            whiteModeColor.mainColor2 +
            "," +
            whiteModeColor.mainColor3}
      );
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
