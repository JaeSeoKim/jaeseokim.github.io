import React, { useState, useEffect, useCallback, useMemo } from "react"
import tw from "twin.macro"
import SEO from "../components/seo"
import Layout from "../components/Layout"
import { graphql, navigate } from "gatsby"
import queryString from "query-string"
import Search from "../components/Search"
import Post from "../components/Post"
import Tags from "../components/Tags"
import Tag from "../components/Tag"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges ? data.allMarkdownRemark.edges : []
  const tags = useMemo(() => {
    var result = []
    posts.map(({ node }) => (result = [...result, ...node.frontmatter.tags]))
    for (var i = 0; i < result.length; ++i) {
      for (var j = i + 1; j < result.length; ++j) {
        if (result[i] === result[j]) result.splice(j--, 1)
      }
    }
    return result
  }, [posts])

  const [state, setState] = useState({
    query: "",
    tag: "ALL",
    filteredData: [],
  })

  const onTagClick = (tag) => {
    if (state.query !== "") {
      navigate(`?query=${state.query}&tag=${tag}`)
    } else {
      navigate(`?tag=${tag}`)
    }
    searchPost(state.query, tag)
  }

  const handleChange = (query) => {
    if (query.trim() === state.query.trim()) {
      setState({
        ...state,
        query,
      })
      return
    }
    searchPost(query, state.tag)
  }

  const searchPost = useCallback(
    (query, tag) => {
      if (query.trim() === "") {
        setState({
          query,
          tag,
          filteredData: [],
        })
        return
      }

      const filteredData = posts.filter((post) => {
        const searchQuery = query.toLowerCase().trim()
        const {
          rawMarkdownBody,
          frontmatter: { title, tags },
        } = post.node
        if (tag === "ALL") {
          return (
            (rawMarkdownBody &&
              rawMarkdownBody.toLowerCase().includes(searchQuery)) ||
            (title && title.toLowerCase().includes(searchQuery))
          )
        }
        if (tags.includes(tag))
          return (
            (rawMarkdownBody &&
              rawMarkdownBody.toLowerCase().includes(searchQuery)) ||
            (title && title.toLowerCase().includes(searchQuery))
          )
      })

      setState({
        tag: tag,
        query: query,
        filteredData: filteredData,
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
      <SEO title="Page Not Found" />
      <Wrapper>
        <Search
          value={state.query}
          onChange={(e) => handleChange(e.target.value)}
          location={location}
        />
        <div css={tw`mx-4 mt-4`}>
          <Tag
            tag={"ALL"}
            selectedTag={state.tag}
            index={"default"}
            onClick={onTagClick}
          />
          <Tags tags={tags.sort()} onClick={onTagClick} tag={state.tag} />
        </div>
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
          rawMarkdownBody
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
