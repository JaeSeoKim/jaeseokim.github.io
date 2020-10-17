import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import PhotoFrame from "./PhotoFrame"
import Divider from "./Divider"
import ThemeContext from "../lib/context/ThemContext"
import { whiteModeColor, darkModeColor } from "../../them-color"
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaMedium,
  FaLinkedin,
} from "react-icons/fa"
import { graphql, useStaticQuery } from "gatsby"

const Wrapper = tw.div`w-full max-w-screen-md px-4 md:px-0 mx-auto pt-8 md:pt-12 mt-2 mb-4`
const ProfileContainer = tw.div`md:flex items-center px-2`

const Profile = () => {
  const {
    avatar: {
      childImageSharp: { fixed },
    },
    site: {
      siteMetadata: { author, introduction, social },
    },
  } = useStaticQuery(graphql`
    query ProfileQuery {
      avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
        childImageSharp {
          fixed(width: 128, height: 128) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          introduction
          social {
            twitter
            github
            medium
            facebook
            linkedin
          }
        }
      }
    }
  `)
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <Wrapper>
      <ProfileContainer>
        <PhotoFrame _css={tw`mr-8 mb-2 md:mb-4`} fixed={fixed} />
        <div>
          <span>Written by </span>
          <p
            css={css`
              ${tw`inline-block text-xl font-bold rounded-full mb-2 px-3`}
              ${isDarkMode ? tw`bg-gray-800` : tw`bg-gray-200`}
                color: ${isDarkMode
                ? darkModeColor.textColor1
                : whiteModeColor.textColor1};
            `}
          >
            @{author}
          </p>
          <div css={tw`text-sm font-normal mb-2`}>{introduction}</div>
        </div>
      </ProfileContainer>
      <Divider color margin />
      {social.github && (
        <a
          css={css`
            display: inline-block;
          `}
          title={"github Link"}
          href={`https://github.com/${social.github}`}
        >
          <FaGithub
            css={css`
              ${tw`w-8 h-8 mt-4 ml-4`}
              transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
              color: #888;
              &:hover {
                color: ${isDarkMode ? "#fff" : "#000"};
              }
            `}
          />
        </a>
      )}
      {social.facebook && (
        <a
          css={css`
            display: inline-block;
          `}
          title={"facebook Link"}
          href={`https://www.facebook.com/profile.php?id=${social.facebook}`}
        >
          <FaFacebook
            css={css`
              ${tw`w-8 h-8 mt-4 ml-4`}
              transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
              color: #888;
              &:hover {
                color: ${isDarkMode ? "#fff" : "#000"};
              }
            `}
          ></FaFacebook>
        </a>
      )}
      {social.twitter && (
        <a
          css={css`
            display: inline-block;
          `}
          title={"twitter Link"}
          href={`https://twitter.com/${social.twitter}`}
        >
          <FaTwitter
            css={css`
              ${tw`w-8 h-8 mt-4 ml-4`}
              transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
              color: #888;
              &:hover {
                color: ${isDarkMode ? "#fff" : "#000"};
              }
            `}
          ></FaTwitter>
        </a>
      )}
      {social.medium && (
        <a
          css={css`
            display: inline-block;
          `}
          title={"medium Link"}
          href={`https://medium.com/${social.medium}`}
        >
          <FaMedium
            css={css`
              ${tw`w-8 h-8 mt-4 ml-4`}
              transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
              color: #888;
              &:hover {
                color: ${isDarkMode ? "#fff" : "#000"};
              }
            `}
          ></FaMedium>
        </a>
      )}
      {social.linkedin && (
        <a
          css={css`
            display: inline-block;
          `}
          title={"linkedin Link"}
          href={`https://www.linkedin.com/in/${social.linkedin}`}
        >
          <FaLinkedin
            css={css`
              ${tw`w-8 h-8 mt-4 ml-4`}
              transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
              color: #888;
              &:hover {
                color: ${isDarkMode ? "#fff" : "#000"};
              }
            `}
          ></FaLinkedin>
        </a>
      )}
    </Wrapper>
  )
}

export default Profile
