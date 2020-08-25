import tw from "twin.macro"
import React, { useMemo, useState, useEffect, useCallback } from "react"
import SEO from "../components/seo"
import Profile from "../components/Profile"
import Post from "../components/Post"
import Layout from "../components/Layout"
import { graphql, navigate } from "gatsby"
import queryString from "query-string"
import TagSelector from "../components/TagSelector"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
  const [state, setState] = useState({
    tag: "ALL",
    filteredPosts: posts,
  })

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

  const setFilteredPosts = useCallback(
    (tag) => {
      if (tag === "ALL") {
        setState({
          tag: tag,
          filteredPosts: posts,
        })
      } else {
        setState({
          tag: tag,
          filteredPosts: posts.filter((post) =>
            post.node.frontmatter.tags.includes(tag)
          ),
        })
      }
    },
    [posts]
  )

  const onTagClick = (tag) => {
    navigate(`?tag=${tag}`)
    setFilteredPosts(tag)
  }

  useEffect(() => {
    if (location.href) {
      const {
        query: { tag },
      } = queryString.parseUrl(location.href)
      if (tag) {
        setFilteredPosts(tag)
      }
    }
  }, [location.href, setFilteredPosts])

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <Profile />
        <TagSelector tags={tags} onTagClick={onTagClick} state={state} />
        {state.filteredPosts.map((post, index) => {
          return <Post post={post} key={`post_${index}`} />
        })}
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostsQuery {
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
            date(formatString: "MMMM DD YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
