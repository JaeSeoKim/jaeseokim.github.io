const metaConfig = require("./gatsby-meta-config")
const { whiteModeColor } = require("./them-color")

module.exports = {
  siteMetadata: metaConfig,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              margin: 12,
              scrollOffset: 0,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "One Dark Pro",
              extensions: ["material-theme"],
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `toc-header`,
              maintainCase: false,
              removeAccents: true,
              elements: [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`],
            },
          },
          `gatsby-remark-emoji`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig.ga,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metaConfig.title,
        short_name: metaConfig.title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3F4145`,
        display: `minimal-ui`,
        icon: metaConfig.icon,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
  ],
}
