import React from "react"
import tw from "twin.macro"

const PhotoFrame = ({ img = "", alt = "profileImg", _css }) => {
  return (
    <img
      src={img}
      onError={(e) => {
        e.target.src = "/img/profile.png"
      }}
      alt={alt}
      css={[tw`rounded-full border border-purple-300 h-40 w-40`, _css]}
    />
  )
}

export default PhotoFrame
