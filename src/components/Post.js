import React from "react"
import tw, { css } from "twin.macro"
import { Link } from "gatsby"
import Tags from "./Tags"
import Divider from "./Divider"
import { keyframes } from "@emotion/core"

const Post = ({ post }) => {
  const fadein = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
  `
  return (
    <>
      <div
        css={css`
          animation: ${fadein} 500ms;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          &:hover {
            --transform-scale-x: 1.02;
            --transform-scale-y: 1.02;
          }
          ${tw`mx-4 my-12 transform`}
        `}
      >
        <Link to={post.node.fields.slug}>
          <h1
            css={css`
              ${tw`text-xl font-semibold`}
            `}
          >
            {post.node.frontmatter.title}
          </h1>
          <h2
            css={css`
              ${tw`my-1 text-xs`}
            `}
          >
            {post.node.frontmatter.date}
          </h2>
          <div css={tw`my-4`}>
            <Tags tags={post.node.frontmatter.tags} onClick={() => {}} />
          </div>
          <div
            css={css`
              ${tw`break-words`}
            `}
          >
            {post.node.excerpt}
          </div>
        </Link>
      </div>
      <Divider margin color />
    </>
  )
}

export default Post
