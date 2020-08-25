import React from "react"
import PropTypes from "prop-types"
import tw, { css } from "twin.macro"
import { whiteModeColor } from "../them-color"
import { FaInfo } from "react-icons/fa"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=0"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <noscript>
            <div
              css={css`
                ${tw`fixed bottom-0 left-0 ml-2 mb-2`}
                ${tw`inline-flex shadow items-center rounded text-white text-sm font-bold px-4 py-3`}
                  background-color: ${whiteModeColor.mainColor2};
                  z-index: 9999;
                `}
            >
              <FaInfo css={tw`fill-current w-6 h-6 mr-2`} />
              <div css={tw`ml-2`}>
                Please enable JavaScript to use this site.
                <br />
                JavaScript를 활성화 시켜주세요.
              </div>
            </div>
          </noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
