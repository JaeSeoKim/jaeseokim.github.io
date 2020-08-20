import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import { Link } from "gatsby"
import ThemeContext from "../lib/context/ThemContext"
import { darkModeColor, whiteModeColor } from "../../them-color"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"

const Wrapper = tw.div`flex flex-wrap-reverse mt-16 md:flex-no-wrap md:justify-between`

const Button = tw.div`w-full md:w-1/2 m-2 md:m-4`

const Navigator = ({ pageContext }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const { previous, next } = pageContext
  return (
    <Wrapper>
      <Button>
        {previous && (
          <Link
            css={css`
              display: inline-block;
              transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
              text-align: left;
              width: 100%;
              height: 100%;
              padding: 0.5rem;
              background-color: ${isDarkMode ? "#333" : "#eee"};
              border-radius: 0.25rem;
              border-left-width: 4px;
              border-color: ${isDarkMode
                ? darkModeColor.mainColor2
                : whiteModeColor.mainColor2};
              &:hover {
                background-color: ${isDarkMode ? "#444" : "#ddd"};
              }
            `}
            to={previous.fields.slug}
            rel="prev"
          >
            <div css={tw`mr-4 ml-2 inline-block`}>
              <AiOutlineArrowLeft css={tw`block w-8 h-8`} />
            </div>
            <div css={tw`inline-block my-2`}>
              <p
                css={css`
                  color: ${isDarkMode
                    ? darkModeColor.textColor1
                    : whiteModeColor.textColor1};
                `}
              >
                이전 포스트
              </p>
              <p>{previous.frontmatter.title}</p>
            </div>
          </Link>
        )}
      </Button>
      <Button>
        {next && (
          <Link
            css={css`
              display: inline-block;
              transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
              text-align: right;
              width: 100%;
              height: 100%;
              padding: 0.5rem;
              background-color: ${isDarkMode ? "#333" : "#eee"};
              border-radius: 0.25rem;
              border-right-width: 4px;
              border-color: ${isDarkMode
                ? darkModeColor.mainColor2
                : whiteModeColor.mainColor2};
              &:hover {
                background-color: ${isDarkMode ? "#444" : "#ddd"};
              }
            `}
            to={next.fields.slug}
            rel="next"
          >
            <div css={tw`inline-block my-2`}>
              <p
                css={css`
                  color: ${isDarkMode
                    ? darkModeColor.mainColor2
                    : whiteModeColor.mainColor2};
                `}
              >
                다음 포스트
              </p>
              <p>{next.frontmatter.title}</p>
            </div>
            <div css={tw`ml-4 mr-2 inline-block`}>
              <AiOutlineArrowRight css={tw`block w-8 h-8`} />
            </div>
          </Link>
        )}
      </Button>
    </Wrapper>
  )
}

export default Navigator
