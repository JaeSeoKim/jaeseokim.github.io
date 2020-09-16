import React from "react"
import PropTypes from "prop-types"
import tw, { css } from "twin.macro"
import { whiteModeColor } from "../them-color"
import { FaInfo } from "react-icons/fa"
import { jennifer_front_id } from "../gatsby-meta-config"

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
          {jennifer_front_id && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
              (function(j,en,ni,fer) {
                j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
                j['dmnaid']=fer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
                var b=Math.floor(new Date().getTime() / 60000) * 60000;var a=en.createElement(ni);
                a.src='https://d-collect.jennifersoft.com/'+fer+'/demian.js?'+b;a.async=true;
                en.getElementsByTagName(ni)[0].parentNode.appendChild(a);
              }(window,document,'script','${jennifer_front_id}'));
              `,
              }}
            />
          )}
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
