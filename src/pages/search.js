import React, { useState, useEffect, useCallback } from "react"
import tw from "twin.macro"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import queryString from "query-string"
import Search from "../components/Search"
import Post from "../components/Post"
import TagSelector from "../components/TagSelector"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges ? data.allMarkdownRemark.edges : []

  const [state, setState] = useState({
    query: "",
    tag: "ALL",
    filteredData: [],
    tags: [],
  })

  const onTagClick = (tag) => {
    setState((prev) => {
      const filteredData = prev.filteredData.filter((post) => {
        const {
          excerpt,
          frontmatter: { title, tags },
        } = post.node
        if (tags.includes(tag)) return (excerpt && excerpt) || (title && title)
        return []
      })
      return {
        ...prev,
        tag: tag,
        filteredData: filteredData,
      }
    })
  }

  const handleChange = (query) => {
    if (query.trim() === state.query.trim()) {
      setState({
        ...state,
        query,
      })
      return
    }
    searchPost(query, "ALL")
  }

  const searchPost = useCallback(
    (query, tag) => {
      if (query.trim() === "") {
        setState({
          query,
          tag,
          filteredData: [],
          tags: [],
        })
        return
      }

      const filteredData = posts.filter((post) => {
        const searchQuery = query.toLowerCase().trim()
        const {
          excerpt,
          frontmatter: { title, tags },
        } = post.node
        return (
          (excerpt && excerpt.toLowerCase().includes(searchQuery)) ||
          (title && title.toLowerCase().includes(searchQuery)) ||
          (tags && tags.includes(searchQuery))
        )
      })

      const searchTags = (filteredData) => {
        var result = []
        filteredData.map(
          ({ node }) => (result = [...result, ...node.frontmatter.tags])
        )
        for (var i = 0; i < result.length; ++i) {
          for (var j = i + 1; j < result.length; ++j) {
            if (result[i] === result[j]) result.splice(j--, 1)
          }
        }
        return result
      }

      setState(() => {
        const tagsData = searchTags(filteredData)
        return {
          tag: tag,
          query: query,
          filteredData: filteredData,
          tags: tagsData,
        }
      })
    },
    [posts]
  )

  useEffect(() => {
    if (location.href) {
      const {
        query: { query, tag },
      } = queryString.parseUrl(location.href)
      searchPost(query ? query : "", tag ? tag : "ALL")
    }
  }, [searchPost, location.href])

  return (
    <Layout>
      <SEO title="Search" />
      <Wrapper>
        <Search
          value={state.query}
          onChange={(e) => handleChange(e.target.value)}
          location={location}
        />
        <TagSelector tags={state.tags} onTagClick={onTagClick} state={state} />
        {state.filteredData.map((post, index) => (
          <Post post={post} key={`post_${index}`} />
        ))}
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY년 MM월 DD일")
            title
            tags
          }
        }
      }
    }
  }
`
