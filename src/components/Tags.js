import React from "react"
import Tag from "./Tag"

const Tags = ({ tags, onClick, tag: selectedTag, scrollToCenter }) => {
  return tags.map((tag, index) => (
    <Tag
      tag={tag}
      selectedTag={selectedTag}
      scrollToCenter={scrollToCenter}
      key={`tag_${index}`}
      onClick={onClick}
    />
  ))
}

export default Tags
