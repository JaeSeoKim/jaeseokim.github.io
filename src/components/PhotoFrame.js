import React from "react"
import tw from "twin.macro"
import Image from "gatsby-image"

const PhotoFrame = ({ fixed, alt = "profileImg", _css }) => {
  return (
    <Image
      fixed={fixed}
      alt={alt}
      css={[tw`rounded-full border border-purple-300`, _css]}
    />
  )
}

export default PhotoFrame
