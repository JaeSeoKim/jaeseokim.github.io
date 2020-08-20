import React, { useContext } from "react"
import ThemeContext from "../lib/context/ThemContext"
import { darkModeColor, whiteModeColor } from "../../them-color"
import tw, { css } from "twin.macro"

const Divider = ({ vertical, color, margin, fat }) => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <>
      <div
        css={
          vertical
            ? [tw`h-full flex justify-center`, margin && tw`my-2`]
            : [tw`flex justify-center`, margin && tw`mx-2`]
        }
      >
        <div
          css={[
            tw`rounded-full`,
            fat
              ? vertical
                ? tw`h-full w-1 my-auto`
                : tw`w-full h-1`
              : vertical
              ? tw`h-full w-px my-auto`
              : tw`w-full h-px`,
            isDarkMode ? tw`bg-gray-800` : tw`bg-gray-100`,
            color &&
              css`
                background: linear-gradient(
                  ${vertical ? "180" : "270"}deg,
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
              `,
          ]}
        ></div>
      </div>
    </>
  )
}

export default Divider
