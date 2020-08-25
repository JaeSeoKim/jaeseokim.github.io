import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"
import SEO from "../components/seo"
import Profile from "../components/Profile"
import tw from "twin.macro"
import Markdown from "../components/Markdown"
import Navigator from "../components/Navigator"
import Divider from "../components/Divider"
import TableOfContents from "../components/TableOfContents"
import Layout from "../components/Layout"
import Utterances from "../components/Utterances"
import Tags from "../components/Tags"

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`
const NAV_OFFSET_Y = 36

export default ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html, tableOfContents, excerpt } = markdownRemark

  const [currentHeaderUrl, setCurrentHeaderUrl] = useState(undefined)

  const isTOCVisible = tableOfContents?.length > 0

  const handleTagClick = (tag) => {
    navigate(`/?tag=${tag}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      let aboveHeaderUrl
      const currentOffsetY = window.pageYOffset
      const headerElements = document.querySelectorAll(".toc-header")
      for (const elem of headerElements) {
        const { top } = elem.getBoundingClientRect()
        const elemTop = top + currentOffsetY
        const isLast = elem === headerElements[headerElements.length - 1]
        if (currentOffsetY < elemTop - NAV_OFFSET_Y) {
          aboveHeaderUrl &&
            setCurrentHeaderUrl(aboveHeaderUrl.split(window.location.origin)[1])
          !aboveHeaderUrl && setCurrentHeaderUrl(undefined)
          break
        } else {
          isLast &&
            setCurrentHeaderUrl(elem.href.split(window.location.origin)[1])
          !isLast && (aboveHeaderUrl = elem.href)
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <Layout>
        <SEO title={frontmatter.title} description={excerpt} />
        <div css={tw`mt-4 px-4`} className="blog-post-container">
          <div className="blog-post">
            <Wrapper>
              <h1
                className="blog-title"
                css={tw`text-4xl md:text-5xl font-bold mb-4`}
              >
                {frontmatter.title}
              </h1>
              <h2 className="blog-date" css={tw`text-base mb-4`}>
                {frontmatter.date}
              </h2>
              <div className="blog-tags" css={tw`mb-2`}>
                <Tags tags={frontmatter.tags} onClick={handleTagClick} />
              </div>
              <Divider color />
            </Wrapper>
            <div className={"blog-content"}>
              {isTOCVisible && (
                <TableOfContents
                  toc={tableOfContents}
                  currentHeaderUrl={currentHeaderUrl}
                />
              )}
              <Wrapper>
                <Markdown html={html} />
              </Wrapper>
            </div>
          </div>
        </div>
        <Wrapper>
          <Navigator pageContext={pageContext} />
          <Profile />
          <div css={tw`mx-2`}>
            <Utterances repo={"JaeSeoKim/jaeseokim.github.io"} />
          </div>
        </Wrapper>
      </Layout>
    </>
  )
}
export const pageQuery = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 200, truncate: true)
      html
      tableOfContents
      frontmatter {
        date(formatString: "MMMM DD YYYY")
        title
        tags
      }
    }
  }
`
