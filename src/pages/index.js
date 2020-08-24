import tw from "twin.macro"
import React from "react"
import SEO from "../components/seo"
import Profile from "../components/Profile"
import Post from "../components/Post"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <Profile />
        {posts.map((post, index) => {
          return <Post post={post} key={`post_${index}`} />
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
