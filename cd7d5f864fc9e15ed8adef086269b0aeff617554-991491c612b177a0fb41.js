(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"2vz6":function(e,t,r){"use strict";var i=r("qKvR"),a=r("q1tI"),o=r("EB9Y"),n=r("T3Tk");t.a=function(e){var t=e.onClick,r=e.tag,s=e.selectedTag,d=e.scrollToCenter,l=Object(a.useContext)(o.a).isDarkMode,c=Object(a.useRef)(null),u=Object(a.useCallback)((function(){d&&d(c),t&&t(r)}),[d,t,c,r]);return Object(a.useEffect)((function(){s===r&&d&&d(c)}),[d,s,c,r]),Object(i.c)("button",{ref:c,css:Object(i.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);font-size:1rem;font-weight:700;border-radius:9999px;margin-right:0.5rem;margin-top:0.25rem;margin-bottom:0.25rem;padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.75rem;padding-right:0.75rem;:focus{outline:0;} ",s===r?"color":"background-color",":",l?"#2d3748":"#edf2f7",";",s===r?"background-color":"color",":",l?n.darkModeColor.textColor1:n.whiteModeColor.textColor1,";"),onClick:u},r)}},"4Fbo":function(e,t,r){"use strict";var i=r("wTIg"),a=r("qKvR"),o=r("q1tI"),n=r("iYmT"),s=r("9eSz"),d=r.n(s),l=function(e){var t=e.fixed,r=e.alt,i=void 0===r?"profileImg":r,o=e._css;return Object(a.c)(d.a,{fixed:t,alt:i,css:Object(n.a)([{borderRadius:"9999px",borderWidth:"1px","--border-opacity":"1",borderColor:"rgba(214, 188, 250, var(--border-opacity))"},o])})},c=r("luWv"),u=r("EB9Y"),f=r("T3Tk"),g=r("ma3e"),m=r("Wbzz"),p=Object(i.a)("div",{target:"e16bs3iv0"})({name:"i3r5t2",styles:"width:100%;max-width:768px;padding-left:1rem;padding-right:1rem;margin-left:auto;margin-right:auto;padding-top:2rem;@media (min-width: 768px){padding-left:0;padding-right:0;padding-top:3rem;}"}),h=Object(i.a)("div",{target:"e16bs3iv1"})({name:"180ky7f",styles:"align-items:center;padding-left:0.5rem;padding-right:0.5rem;@media (min-width: 768px){display:flex;}"}),b={name:"1baulvz",styles:"display:inline-block;"},v={name:"1baulvz",styles:"display:inline-block;"},y={name:"1baulvz",styles:"display:inline-block;"},w={name:"1baulvz",styles:"display:inline-block;"},O={name:"1baulvz",styles:"display:inline-block;"},S={name:"vg2p6i",styles:"font-size:0.875rem;font-weight:400;margin-bottom:0.5rem;"};t.a=function(){var e=Object(m.useStaticQuery)("1081905842"),t=e.avatar.childImageSharp.fixed,r=e.site.siteMetadata,i=r.author,n=r.introduction,s=r.social,d=Object(o.useContext)(u.a).isDarkMode;return Object(a.c)(p,null,Object(a.c)(h,null,Object(a.c)(l,{_css:{marginRight:"2rem",marginBottom:"0.5rem","@media (min-width: 768px)":{marginBottom:"1rem"}},fixed:t}),Object(a.c)("div",null,Object(a.c)("span",null,"Written by "),Object(a.c)("p",{css:Object(a.b)("display:inline-block;font-size:1.25rem;font-weight:700;border-radius:9999px;margin-bottom:0.5rem;padding-left:0.75rem;padding-right:0.75rem; ",d?{"--bg-opacity":"1",backgroundColor:"rgba(45, 55, 72, var(--bg-opacity))"}:{"--bg-opacity":"1",backgroundColor:"rgba(237, 242, 247, var(--bg-opacity))"}," color:",d?f.darkModeColor.textColor1:f.whiteModeColor.textColor1,";")},"@",i),Object(a.c)("div",{css:S},n))),Object(a.c)(c.a,{color:!0}),s.github&&Object(a.c)("a",{css:b,title:"github Link",href:"https://github.com/"+s.github},Object(a.c)(g.c,{css:Object(a.b)("width:2rem;height:2rem;margin-top:1rem;margin-left:1rem; transition:all 300ms cubic-bezier(0,0,0.2,1);color:#888;&:hover{color:",d?"#fff":"#000",";}")})),s.facebook&&Object(a.c)("a",{css:v,title:"facebook Link",href:"https://www.facebook.com/profile.php?id="+s.facebook},Object(a.c)(g.a,{css:Object(a.b)("width:2rem;height:2rem;margin-top:1rem;margin-left:1rem; transition:all 300ms cubic-bezier(0,0,0.2,1);color:#888;&:hover{color:",d?"#fff":"#000",";}")})),s.twitter&&Object(a.c)("a",{css:y,title:"twitter Link",href:"https://twitter.com/"+s.twitter},Object(a.c)(g.f,{css:Object(a.b)("width:2rem;height:2rem;margin-top:1rem;margin-left:1rem; transition:all 300ms cubic-bezier(0,0,0.2,1);color:#888;&:hover{color:",d?"#fff":"#000",";}")})),s.medium&&Object(a.c)("a",{css:w,title:"medium Link",href:"https://medium.com/"+s.medium},Object(a.c)(g.e,{css:Object(a.b)("width:2rem;height:2rem;margin-top:1rem;margin-left:1rem; transition:all 300ms cubic-bezier(0,0,0.2,1);color:#888;&:hover{color:",d?"#fff":"#000",";}")})),s.linkedin&&Object(a.c)("a",{css:O,title:"linkedin Link",href:"https://www.linkedin.com/in/"+s.linkedin},Object(a.c)(g.d,{css:Object(a.b)("width:2rem;height:2rem;margin-top:1rem;margin-left:1rem; transition:all 300ms cubic-bezier(0,0,0.2,1);color:#888;&:hover{color:",d?"#fff":"#000",";}")})))}},"9eSz":function(e,t,r){"use strict";var i=r("TqRt");t.__esModule=!0,t.default=void 0;var a,o=i(r("PJYZ")),n=i(r("VbXa")),s=i(r("8OQS")),d=i(r("pVnL")),l=i(r("q1tI")),c=i(r("17x9")),u=function(e){var t=(0,d.default)({},e),r=t.resolutions,i=t.sizes,a=t.critical;return r&&(t.fixed=r,delete t.resolutions),i&&(t.fluid=i,delete t.sizes),a&&(t.loading="eager"),t.fluid&&(t.fluid=S([].concat(t.fluid))),t.fixed&&(t.fixed=S([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(v&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,r=e.fixed,i=m(t||r||[]);return i&&i.src},m=function(e){if(v&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var r=e.findIndex((function(e){return void 0===e.media}));if(-1!==r)return e[r]}return e[0]},p=Object.create({}),h=function(e){var t=u(e),r=g(t);return p[r]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,v="undefined"!=typeof window,y=v&&window.IntersectionObserver,w=new WeakMap;function O(e){return e.map((function(e){var t=e.src,r=e.srcSet,i=e.srcSetWebp,a=e.media,o=e.sizes;return l.default.createElement(l.default.Fragment,{key:t},i&&l.default.createElement("source",{type:"image/webp",media:a,srcSet:i,sizes:o}),l.default.createElement("source",{media:a,srcSet:r,sizes:o}))}))}function S(e){var t=[],r=[];return e.forEach((function(e){return(e.media?t:r).push(e)})),[].concat(t,r)}function k(e){return e.map((function(e){var t=e.src,r=e.media,i=e.tracedSVG;return l.default.createElement("source",{key:t,media:r,srcSet:i})}))}function j(e){return e.map((function(e){var t=e.src,r=e.media,i=e.base64;return l.default.createElement("source",{key:t,media:r,srcSet:i})}))}function C(e,t){var r=e.srcSet,i=e.srcSetWebp,a=e.media,o=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(a?'media="'+a+'" ':"")+'srcset="'+(t?i:r)+'" '+(o?'sizes="'+o+'" ':"")+"/>"}var x=function(e,t){var r=(void 0===a&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=new window.IntersectionObserver((function(e){e.forEach((function(e){if(w.has(e.target)){var t=w.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),w.delete(e.target),t())}}))}),{rootMargin:"200px"})),a);return r&&(r.observe(e),w.set(e,t)),function(){r.unobserve(e),w.delete(e)}},R=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',r=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",a=e.title?'title="'+e.title+'" ':"",o=e.alt?'alt="'+e.alt+'" ':'alt="" ',n=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",d=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",l=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?C(e,!0):"")+C(e)})).join("")+"<img "+l+n+s+r+i+t+o+a+d+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},z=l.default.forwardRef((function(e,t){var r=e.src,i=e.imageVariants,a=e.generateSources,o=e.spreadProps,n=e.ariaHidden,s=l.default.createElement(E,(0,d.default)({ref:t,src:r},o,{ariaHidden:n}));return i.length>1?l.default.createElement("picture",null,a(i),s):s})),E=l.default.forwardRef((function(e,t){var r=e.sizes,i=e.srcSet,a=e.src,o=e.style,n=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,g=e.ariaHidden,m=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return l.default.createElement("img",(0,d.default)({"aria-hidden":g,sizes:r,srcSet:i,src:a},m,{onLoad:n,onError:c,ref:t,loading:u,draggable:f,style:(0,d.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},o)}))}));E.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var L=function(e){function t(t){var r;(r=e.call(this,t)||this).seenBefore=v&&h(t),r.isCritical="eager"===t.loading||t.critical,r.addNoScript=!(r.isCritical&&!t.fadeIn),r.useIOSupport=!b&&y&&!r.isCritical&&!r.seenBefore;var i=r.isCritical||v&&(b||!r.useIOSupport);return r.state={isVisible:i,imgLoaded:!1,imgCached:!1,fadeIn:!r.seenBefore&&t.fadeIn},r.imageRef=l.default.createRef(),r.placeholderRef=t.placeholderRef||l.default.createRef(),r.handleImageLoaded=r.handleImageLoaded.bind((0,o.default)(r)),r.handleRef=r.handleRef.bind((0,o.default)(r)),r}(0,n.default)(t,e);var r=t.prototype;return r.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:h(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},r.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},r.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=x(e,(function(){var e=h(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},r.handleImageLoaded=function(){var e,t,r;e=this.props,t=u(e),(r=g(t))&&(p[r]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},r.render=function(){var e=u(this.props),t=e.title,r=e.alt,i=e.className,a=e.style,o=void 0===a?{}:a,n=e.imgStyle,s=void 0===n?{}:n,c=e.placeholderStyle,f=void 0===c?{}:c,g=e.placeholderClassName,p=e.fluid,h=e.fixed,b=e.backgroundColor,v=e.durationFadeIn,y=e.Tag,w=e.itemProp,S=e.loading,C=e.draggable,x=!1===this.state.fadeIn||this.state.imgLoaded,L=!0===this.state.fadeIn&&!this.state.imgCached,I=(0,d.default)({opacity:x?1:0,transition:L?"opacity "+v+"ms":"none"},s),T="boolean"==typeof b?"lightgray":b,V={transitionDelay:v+"ms"},M=(0,d.default)({opacity:this.state.imgLoaded?0:1},L&&V,s,f),q={title:t,alt:this.state.isVisible?"":r,style:M,className:g,itemProp:w};if(p){var W=p,H=m(p);return l.default.createElement(y,{className:(i||"")+" gatsby-image-wrapper",style:(0,d.default)({position:"relative",overflow:"hidden",maxWidth:H.maxWidth?H.maxWidth+"px":null,maxHeight:H.maxHeight?H.maxHeight+"px":null},o),ref:this.handleRef,key:"fluid-"+JSON.stringify(H.srcSet)},l.default.createElement(y,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/H.aspectRatio+"%"}}),T&&l.default.createElement(y,{"aria-hidden":!0,title:t,style:(0,d.default)({backgroundColor:T,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&V)}),H.base64&&l.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:H.base64,spreadProps:q,imageVariants:W,generateSources:j}),H.tracedSVG&&l.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:H.tracedSVG,spreadProps:q,imageVariants:W,generateSources:k}),this.state.isVisible&&l.default.createElement("picture",null,O(W),l.default.createElement(E,{alt:r,title:t,sizes:H.sizes,src:H.src,crossOrigin:this.props.crossOrigin,srcSet:H.srcSet,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:S,draggable:C})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:R((0,d.default)({alt:r,title:t,loading:S},H,{imageVariants:W}))}}))}if(h){var P=h,B=m(h),N=(0,d.default)({position:"relative",overflow:"hidden",display:"inline-block",width:B.width,height:B.height},o);return"inherit"===o.display&&delete N.display,l.default.createElement(y,{className:(i||"")+" gatsby-image-wrapper",style:N,ref:this.handleRef,key:"fixed-"+JSON.stringify(B.srcSet)},T&&l.default.createElement(y,{"aria-hidden":!0,title:t,style:(0,d.default)({backgroundColor:T,width:B.width,opacity:this.state.imgLoaded?0:1,height:B.height},L&&V)}),B.base64&&l.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:B.base64,spreadProps:q,imageVariants:P,generateSources:j}),B.tracedSVG&&l.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:B.tracedSVG,spreadProps:q,imageVariants:P,generateSources:k}),this.state.isVisible&&l.default.createElement("picture",null,O(P),l.default.createElement(E,{alt:r,title:t,width:B.width,height:B.height,sizes:B.sizes,src:B.src,crossOrigin:this.props.crossOrigin,srcSet:B.srcSet,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:S,draggable:C})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:R((0,d.default)({alt:r,title:t,loading:S},B,{imageVariants:P}))}}))}return null},t}(l.default.Component);L.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var I=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),T=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string,maxWidth:c.default.number,maxHeight:c.default.number});function V(e){return function(t,r,i){var a;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+i+"`, but their values are both `undefined`.");c.default.checkPropTypes(((a={})[r]=e,a),t,"prop",i)}}L.propTypes={resolutions:I,sizes:T,fixed:V(c.default.oneOfType([I,c.default.arrayOf(I)])),fluid:V(c.default.oneOfType([T,c.default.arrayOf(T)])),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var M=L;t.default=M},luWv:function(e,t,r){"use strict";var i=r("iYmT"),a=r("qKvR"),o=r("q1tI"),n=r.n(o),s=r("EB9Y"),d=r("T3Tk");t.a=function(e){var t=e.vertical,r=e.color,l=e.margin,c=e.fat,u=Object(o.useContext)(s.a).isDarkMode;return Object(a.c)(n.a.Fragment,null,Object(a.c)("div",{css:t?[{height:"100%",display:"flex",justifyContent:"center"},l&&{marginTop:"0.5rem",marginBottom:"0.5rem"}]:[{display:"flex",justifyContent:"center"},l&&{marginLeft:"0.5rem",marginRight:"0.5rem"}]},Object(a.c)("div",{css:Object(i.a)([{borderRadius:"9999px"},c?t?{height:"100%",width:"0.25rem",marginTop:"auto",marginBottom:"auto"}:{width:"100%",height:"0.25rem"}:t?{height:"100%",width:"1px",marginTop:"auto",marginBottom:"auto"}:{width:"100%",height:"1px"},u?{"--bg-opacity":"1",backgroundColor:"rgba(45, 55, 72, var(--bg-opacity))"}:{"--bg-opacity":"1",backgroundColor:"rgba(247, 250, 252, var(--bg-opacity))"},r&&Object(a.b)("background:linear-gradient( ",t?"180":"270","deg,",u?d.darkModeColor.mainColor1+","+d.darkModeColor.mainColor2+","+d.darkModeColor.mainColor3:d.whiteModeColor.mainColor1+","+d.whiteModeColor.mainColor2+","+d.whiteModeColor.mainColor3," );")])})))}},pOn1:function(e,t,r){"use strict";r("q1tI");var i=r("2vz6"),a=r("qKvR");t.a=function(e){var t=e.tags,r=e.onClick,o=e.tag,n=e.scrollToCenter;return t.map((function(e,t){return Object(a.c)(i.a,{tag:e,selectedTag:o,scrollToCenter:n,key:"tag_"+t,onClick:r})}))}}}]);
//# sourceMappingURL=cd7d5f864fc9e15ed8adef086269b0aeff617554-991491c612b177a0fb41.js.map