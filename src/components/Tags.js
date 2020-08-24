import React from "react"
import Tag from "./Tag"

const Tags = ({ tags, onClick, tag: selectedTag }) => {
  return tags.map((tag, index) => (
    <Tag
      tag={tag}
      selectedTag={selectedTag}
      key={`tag_${index}`}
      onClick={onClick}
    />
  ))
}

export default Tags
