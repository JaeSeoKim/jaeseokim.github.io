import React, { useContext, useState } from "react"
import tw, { css } from "twin.macro"
import { keyframes } from "@emotion/core"
import Divider from "./Divider"
import { FaFacebookF, FaTwitter, FaLink, FaInfo } from "react-icons/fa"
import { whiteModeColor, darkModeColor } from "../../them-color"
import ThemeContext from "../lib/context/ThemContext"

var timeId1, timeId2

const ShareButton = ({ color, icon, target, onClick }) => {
  return (
    <button
      css={css`
        ${tw`flex px-3 py-1 my-2 ml-2 rounded text-white`}
        background-color: ${color}
      `}
      onClick={onClick}
    >
      {icon}
      Share with {target}
    </button>
  )
}

const ShareButtons = ({ url, text }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const [isCopy, setIsCopy] = useState({
    visible: false,
    end: true,
  })
  const onFackebookClick = () => {
    window.FB.ui({
      method: "share",
      mobile_iframe: true,
      href: url,
      quote: text,
    })
  }

  const onTwitterClick = () => {
    window.open(
      `https://twitter.com/share?url=${encodeURI(encodeURI(url))}&text=${text}`,
      "sharer",
      "toolbar=0,status=0,width=626,height=436"
    )
  }

  const onUrlClick = () => {
    const copyText = document.createElement("input")
    copyText.value = url

    document.body.appendChild(copyText)
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(copyText)

    setIsCopy({
      visible: true,
      end: false,
    })
    clearTimeout(timeId1)
    clearTimeout(timeId2)
    timeId1 = setTimeout(() => {
      setIsCopy({
        visible: true,
        end: true,
      })
    }, 1500)
    timeId2 = setTimeout(() => {
      setIsCopy({
        visible: false,
        end: false,
      })
    }, 2000)
  }

  const leftIn = keyframes`
  0% {
    transform: translateX(-2000px) scale(0.7);
    opacity: 0.7;
  }
  80% {
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
  `

  const leftOut = keyframes`
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  20% {
    -webkit-transform: translateX(0px) scale(0.7);
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translateX(-2000px) scale(0.7);
    transform: translateX(-2000px) scale(0.7);
    opacity: 0.7;
  }
  `

  return (
    <div>
      <div css={tw`my-4`}>
        <Divider color />
      </div>
      <div css={tw`flex flex-wrap justify-end mt-4 px-2`}>
        <ShareButton
          color={"#2D87FD"}
          icon={<FaFacebookF css={tw`fill-current my-auto mr-1`} />}
          target={"Facebook"}
          onClick={onFackebookClick}
        />
        <ShareButton
          color={"#1CA1F2"}
          icon={<FaTwitter css={tw`fill-current my-auto mr-1`} />}
          target={"Twitter"}
          onClick={onTwitterClick}
        />
        <ShareButton
          color={"#6E7783"}
          icon={<FaLink css={tw`fill-current my-auto mr-1`} />}
          target={"Url"}
          onClick={onUrlClick}
        />
      </div>
      {isCopy.visible && (
        <div
          css={css`
            animation: ${isCopy.end ? leftOut : leftIn} 500ms;
            ${tw`fixed my-auto top-0 left-0 ml-4 mt-4`}
            ${tw`inline-flex shadow items-center rounded text-white text-sm font-bold px-4 py-3`}
          background-color: ${isDarkMode
              ? darkModeColor.mainColor2
              : whiteModeColor.mainColor2};
            z-index: 9999;
          `}
        >
          <FaInfo css={tw`fill-current mr-2`} />
          <div css={tw`ml-2`}>링크가 복사 되었습니다.</div>
        </div>
      )}
    </div>
  )
}

export default ShareButtons
