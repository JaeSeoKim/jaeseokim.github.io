import React from "react"
import tw, { css } from "twin.macro"
import Divider from "./Divider"
import { FaFacebookF, FaTwitter } from "react-icons/fa"

const ShareButton = ({ color, icon, target, onClick }) => {
  return (
    <button
      css={css`
        ${tw`flex px-2 py-1 m-2 rounded text-white italic focus:outline-none`}
        background-color: ${color}
      `}
      onClick={onClick}
    >
      {icon}
      Share on {target}
    </button>
  )
}

const ShareButtons = ({ url, text }) => {
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

  return (
    <div css={tw`mx-4 py-4`}>
      <Divider color margin />
      <div css={tw`flex flex-row-reverse mt-4`}>
        <ShareButton
          color={"#2D87FD"}
          icon={<FaFacebookF css={tw`fill-current my-auto w-4 h-4 mr-1`} />}
          target={"Facebook"}
          onClick={onFackebookClick}
        />
        <ShareButton
          color={"#1CA1F2"}
          icon={<FaTwitter css={tw`fill-current my-auto w-4 h-4 mr-1`} />}
          target={"Twitter"}
          onClick={onTwitterClick}
        />
      </div>
    </div>
  )
}

export default ShareButtons
