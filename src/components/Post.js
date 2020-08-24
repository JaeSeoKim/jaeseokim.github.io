import React from "react"
import tw, { css } from "twin.macro"
import { Link } from "gatsby"

const Post = ({ post }) => {
  return (
    <div
      css={css`
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        ${tw`mx-4 my-12 transform hover:scale-105`}
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
        <span
          css={css`
            ${tw`break-words`}
          `}
        >
          {post.node.excerpt}
        </span>
      </Link>
    </div>
  )
}

export default Post
