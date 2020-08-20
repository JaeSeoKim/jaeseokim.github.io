const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // Hack due to Tailwind ^1.1.0 using `reduce-css-calc` which assumes node
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig()
  config.node = {
    fs: "empty",
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogPost.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allMarkdownRemark.edges.forEach((post, index) => {
      const previous =
        index === result.data.allMarkdownRemark.edges.length - 1
          ? null
          : result.data.allMarkdownRemark.edges[index + 1].node
      const next =
        index === 0 ? null : result.data.allMarkdownRemark.edges[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
