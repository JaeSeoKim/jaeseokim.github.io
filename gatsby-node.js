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
  const categoryTemplate = require.resolve(`./src/templates/category.js`)

  return graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { draft: { eq: false } } }
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
        categories: allDirectory(
          filter: { absolutePath: { regex: "/^((?!image).)*$/" } }
        ) {
          nodes {
            relativePath
          }
          totalCount
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.postsRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

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

    const categories = result.data.categories.nodes

    categories.forEach((category) => {
      if (category.relativePath !== "") {
        createPage({
          path: `/${category.relativePath}/`,
          component: categoryTemplate,
          context: {
            categoryRegex: `/^(${__dirname}\/content\/posts\/)(${category.relativePath}\/)([^\/]*\.md$)/`,
          },
        })
      }
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
