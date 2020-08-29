import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import tw, { css } from "twin.macro"
import Divider from "./Divider"
import { whiteModeColor, darkModeColor } from "../../them-color"
import ThemeContext from "../lib/context/ThemContext"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

const CategoryMenu = ({ path }) => {
  const { isDarkMode } = useContext(ThemeContext)
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
  console.log(nodes)

  return (
    <>
      <Wrapper css={tw`block xl:hidden`}>
        <Divider color margin />
        <div css={tw`mx-4`}>test</div>
      </Wrapper>
      <div css={tw`hidden xl:block w-full max-w-screen-xl mx-auto`}>
        <div
          css={css`
            ${tw`float-left`}
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
          `}
        >
          <ul css={tw`mx-4 mt-2`}>
            <h3
              css={css`
                ${tw`font-bold mb-2 text-lg`}
                ${isDarkMode ? tw`text-gray-400` : tw`text-gray-700`};
              `}
            >
              Categories
            </h3>
            {nodes.map((category) => {
              console.log(decodeURI(path) === `/${category.relativePath}/`)
              if (category.relativePath !== "") {
                return (
                  <>
                    <li
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
                  </>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CategoryMenu
