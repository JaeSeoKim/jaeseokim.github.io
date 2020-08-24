import React, { useState, useEffect, useCallback } from "react"
import tw from "twin.macro"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import queryString from "query-string"
import Search from "../components/Search"
import Post from "../components/Post"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data, location }) => {
  const [state, setState] = useState({
    query: "",
    filteredData: [],
  })

  const handleChange = (query) => {
    if (query.trim() === state.query.trim()) {
      setState({
        query,
        filteredData: state.filteredData,
      })
      return
    }
    searchPost(query)
  }

  const searchPost = useCallback(
    (query) => {
      if (query.trim() === "") {
        setState({
          query,
          filteredData: [],
        })
        return
      }
      const posts = data.allMarkdownRemark.edges || []

      const filteredData = posts.filter((post) => {
        const searchQuery = query.toLowerCase().trim()
        const {
          rawMarkdownBody,
          frontmatter: { title },
        } = post.node
        return (
          (rawMarkdownBody &&
            rawMarkdownBody.toLowerCase().includes(searchQuery)) ||
          (title && title.toLowerCase().includes(searchQuery))
        )
      })
      setState({
        query,
        filteredData,
      })
    },
    [data.allMarkdownRemark.edges]
  )

  useEffect(() => {
    if (location.href) {
      const {
        query: { query },
      } = queryString.parseUrl(location.href)
      searchPost(query ? query : "")
    }
  }, [searchPost, location.href])

  return (
    <Layout>
      <SEO title="Page Not Found" />
      <Wrapper>
        <Search
          value={state.query}
          onChange={(e) => handleChange(e.target.value)}
          location={location}
        />
        {state.filteredData.map((post, index) => {
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
          rawMarkdownBody
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
