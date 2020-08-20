import tw, { css } from "twin.macro"
import React, { useContext } from "react"
import SEO from "../components/seo"
import Profile from "../components/Profile"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import ThemeContext from "../lib/context/ThemContext"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <Profile />
        {posts.map((post, index) => {
          return (
            <div
              css={css`
                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                ${tw`mx-4 my-12 transform hover:scale-105`}
              `}
            >
              <Link to={post.node.fields.slug} key={`post_${index}`}>
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
        })}
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD YYYY")
            title
          }
        }
      }
    }
  }
`
