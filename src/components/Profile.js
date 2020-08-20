import React, { useContext } from "react"
import tw, { css } from "twin.macro"
import PhotoFrame from "./PhotoFrame"
import Divider from "./Divider"
import ThemeContext from "../lib/context/ThemContext"
import { whiteModeColor, darkModeColor } from "../../them-color"
import { FaFacebook, FaGithub } from "react-icons/fa"

const Wrapper = tw.div`w-full max-w-screen-md px-4 md:px-0 mx-auto pt-8 md:pt-12`
const ProfileContainer = tw.div`md:flex items-center px-2`

const Profile = () => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <Wrapper>
      <ProfileContainer>
        <PhotoFrame
          _css={tw`mr-8 mb-2 md:mb-4 h-24 w-24 md:h-40 md:w-40`}
          img={`https://avatars2.githubusercontent.com/u/48559454?v=4`}
        />
        <div>
          <span>Written by </span>
          <p
            css={css`
              ${tw`inline-block text-xl font-medium rounded-lg mb-2 px-1`}
              ${isDarkMode ? tw`bg-gray-800` : tw`bg-gray-200`}
                color: ${
                  isDarkMode
                    ? darkModeColor.mainColor1
                    : whiteModeColor.mainColor1
                };
              `}
          >
            @JaeSeoKim
          </p>
          <div css={tw`text-sm font-normal mb-2`}>
            보안과 개발을 좋아하는 학생 입니다~!
          </div>
        </div>
      </ProfileContainer>
      <Divider color />
      <a
        css={css`
          display: inline-block;
        `}
        href={`https://github.com/JaeSeoKim`}
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
      <a
        css={css`
          display: inline-block;
        `}
        href={`https://www.facebook.com/profile.php?id=100009150322038`}
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
    </Wrapper>
  )
}

export default Profile
