import React, { useContext, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import tw, { css } from "twin.macro"
import { whiteModeColor, darkModeColor } from "../../them-color"
import ThemeContext from "../lib/context/ThemContext"

const Wrapper = tw.div`block xl:hidden w-full max-w-screen-md mx-auto`

const CategoryMenu = ({ path }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const [isVisible, setIsVisible] = useState(false)

  const {
    categories: { nodes },
  } = useStaticQuery(
    graphql`
      query {
        categories: allDirectory(
          filter: { absolutePath: { regex: "/^((?!image).)*$/" } }
        ) {
          nodes {
            relativePath
          }
        }
      }
    `
  )

  return (
    <>
      <Wrapper>
        <button
          css={css`
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
            ${tw`mx-4 mt-2 font-bold mb-2 text-lg`}
            ${isDarkMode ? tw`text-gray-400` : tw`text-gray-700`};
          `}
          onClick={() => {
            setIsVisible(!isVisible)
          }}
        >
          Categories List {isVisible ? "▲" : "▼"}
        </button>
        <ul
          css={css`
            ${tw`mx-4 mt-2`}
            display: ${isVisible ? "block" : "none"};
          `}
        >
          {nodes.map((category, index) => {
            if (category.relativePath !== "") {
              return (
                <li
                  key={`categorylist_${index}`}
                  css={css`
                    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                    ${tw`text-gray-500 text-base mx-2`}
                    ${path &&
                    decodeURI(path) === `/${category.relativePath}/` &&
                    `
                        font-size: 0.95rem;
                        color: ${isDarkMode ? "#DDDDDD" : "#555555"};
                        `}
                        &:hover {
                      color: ${isDarkMode ? "#DDDDDD" : "#555555"};
                    }
                  `}
                >
                  <Link to={`/${category.relativePath}/`}>
                    {category.relativePath
                      .replace("/", " ")
                      .trim()
                      .replace(" ", "/")}
                  </Link>
                </li>
              )
            }
            return ""
          })}
        </ul>
      </Wrapper>
      <div
        css={css`
          ::-webkit-scrollbar {
            width: 4px;
          }
          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
          ::-webkit-scrollbar-thumb {
            border-radius: 9999px;
            background-color: gray;
          }
          ::-webkit-scrollbar-button {
            width: 0;
            height: 0;
          }
          /* Firefox scrollbar */
          scrollbar-width: thin;
          scrollbar-color: gray transparent;
          display: none;
          @media screen and (min-width: 1280px) {
            float: left;
            position: sticky;
            top: 100px;
            width: calc((100vw - 720px) / 2 - 80px);
            max-width: 250px;
            margin-left: calc((100vw - 1280px) / 2);
            overflow: auto;
            word-break: break-word;
            max-height: calc(100vh - 200px);
            fontsize: 1rem;
            display: block;
            border-left-width: 4px;
            border-image: linear-gradient(
              180deg,
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
            border-image-slice: 1;
          }
        `}
      >
        <h3
          css={css`
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
            ${tw`mx-4 mt-2 font-bold mb-2 text-lg`}
            ${isDarkMode ? tw`text-gray-400` : tw`text-gray-700`};
          `}
        >
          <Link to={`/`}>Categories</Link>
        </h3>
        <ul css={tw`mx-4 mt-2`}>
          {nodes.map((category, index) => {
            if (category.relativePath !== "") {
              return (
                <li
                  key={`category_${index}`}
                  css={css`
                    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                    ${tw`text-gray-500 text-sm`}
                    ${path &&
                    decodeURI(path) === `/${category.relativePath}/` &&
                    `
                        font-size: 0.95rem;
                        color: ${isDarkMode ? "#DDDDDD" : "#555555"};
                        `}
                        &:hover {
                      color: ${isDarkMode ? "#DDDDDD" : "#555555"};
                    }
                  `}
                >
                  <Link to={`/${category.relativePath}/`}>
                    {category.relativePath
                      .replace("/", " ")
                      .trim()
                      .replace(" ", "/")}
                  </Link>
                </li>
              )
            }
            return ""
          })}
        </ul>
      </div>
    </>
  )
}

export default CategoryMenu
