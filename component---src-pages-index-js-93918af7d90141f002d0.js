(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{H2bQ:function(t,e,r){"use strict";var a=r("q1tI");e.a=function(t){var e="undefined"!=typeof window?window.sessionStorage.getItem(t+"_count"):1,r=Object(a.useState)(Number(e)),o=r[0],i=r[1],n=Object(a.useRef)(o);return Object(a.useEffect)((function(){n.current=o,window.sessionStorage.setItem(t+"_count",o)}),[o,t]),[o,n,function(){return i((function(t){return t+1}))}]}},RXBc:function(t,e,r){"use strict";r.r(e),r.d(e,"pageQuery",(function(){return v}));var a=r("KQm4"),o=r("wTIg"),i=r("q1tI"),n=r("vrFN"),c=r("4Fbo"),l=r("CZVI"),s=r("7oih"),b=r("Wbzz"),u=r("cr+I"),m=r.n(u),g=r("TepU"),f=r("TWQg"),d=r("H2bQ"),p=r("dar/"),h=r("qKvR"),j=Object(o.a)("div",{target:"e4c4vw0"})({name:"1bdwg0l",styles:"width:100%;max-width:768px;margin-left:auto;margin-right:auto;"});e.default=function(t){var e=t.data,r=t.location,o=e.allMarkdownRemark.edges,u=e.site.siteMetadata.configs.countOfInitialPost,v=Object(d.a)("index"),O=v[0],w=v[1],y=v[2],k=Object(i.useRef)(),x=Object(i.useState)({tag:"ALL",filteredPosts:o}),D=x[0],C=x[1],z=Object(i.useMemo)((function(){var t=[];o.map((function(e){var r=e.node;return t=[].concat(Object(a.a)(t),Object(a.a)(r.frontmatter.tags))}));for(var e=0;e<t.length;++e)for(var r=e+1;r<t.length;++r)t[e]===t[r]&&t.splice(r--,1);return t}),[o]),I=Object(i.useCallback)((function(t){void 0===t&&(t=D.tag),C("ALL"===t?{tag:t,filteredPosts:o}:{tag:t,filteredPosts:o.filter((function(e){return e.node.frontmatter.tags.includes(t)}))})}),[o,D.tag]);Object(f.a)((function(){o.length>w.current*u&&(y(),I())}),k);return Object(i.useEffect)((function(){if(r.href){var t=m.a.parseUrl(r.href).query.tag;t&&I(t)}}),[r.href,I]),Object(h.c)(s.a,null,Object(h.c)(n.a,{title:"Home"}),Object(h.c)(j,null,Object(h.c)(c.a,null)),Object(h.c)(p.a,null),Object(h.c)(j,null,Object(h.c)(g.a,{tags:z,onTagClick:function(t){Object(b.navigate)("?tag="+t),I(t)},state:D}),D.filteredPosts.slice(0,O*u).map((function(t,e){return Object(h.c)(l.a,{post:t,key:"post_"+e})}))),Object(h.c)("div",{ref:k}))};var v="3190130283"},TWQg:function(t,e,r){"use strict";var a=r("q1tI");e.a=function(t,e){Object(a.useEffect)((function(){var r;return e.current&&(r=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&t()}))}))).observe(e.current),function(){return r&&r.disconnect()}}),[e,t])}},"dar/":function(t,e,r){"use strict";var a=r("wTIg"),o=r("qKvR"),i=r("q1tI"),n=r.n(i),c=r("Wbzz"),l=r("T3Tk"),s=r("EB9Y"),b=Object(a.a)("div",{target:"eqvvi2y0"})({name:"11ijy78",styles:"display:block;width:100%;max-width:768px;margin-left:auto;margin-right:auto;@media (min-width: 1280px){display:none;}"}),u={name:"san2fj",styles:"margin-left:1rem;margin-right:1rem;margin-top:0.5rem;"};e.a=function(t){var e=t.path,r=Object(i.useContext)(s.a).isDarkMode,a=Object(i.useState)(!1),m=a[0],g=a[1],f=Object(c.useStaticQuery)("1900723382").categories.nodes;return Object(o.c)(n.a.Fragment,null,Object(o.c)(b,null,Object(o.c)("button",{css:Object(o.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);margin-left:1rem;margin-right:1rem;margin-top:0.5rem;font-weight:700;margin-bottom:0.5rem;font-size:1.125rem; ",r?{"--text-opacity":"1",color:"rgba(203, 213, 224, var(--text-opacity))"}:{"--text-opacity":"1",color:"rgba(74, 85, 104, var(--text-opacity))"},";"),onClick:function(){g(!m)}},"Categories List ",m?"▲":"▼"),Object(o.c)("ul",{css:Object(o.b)("margin-left:1rem;margin-right:1rem;margin-top:0.5rem; display:",m?"block":"none",";")},f.map((function(t,a){return""!==t.relativePath?Object(o.c)("li",{key:"categorylist_"+a,css:Object(o.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);--text-opacity:1;color:rgba(160, 174, 192, var(--text-opacity));font-size:1rem;margin-left:0.5rem;margin-right:0.5rem; ",e&&decodeURI(e)==="/"+t.relativePath+"/"&&"\n                        font-size: 0.95rem;\n                        color: "+(r?"#DDDDDD":"#555555")+";\n                        "," &:hover{color:",r?"#DDDDDD":"#555555",";}")},Object(o.c)(c.Link,{to:"/"+t.relativePath+"/"},t.relativePath.replace("/"," ").trim().replace(" ","/"))):""})))),Object(o.c)("div",{css:Object(o.b)("::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background-color:transparent;}::-webkit-scrollbar-thumb{border-radius:9999px;background-color:gray;}::-webkit-scrollbar-button{width:0;height:0;}scrollbar-width:thin;scrollbar-color:gray transparent;display:none;@media screen and (min-width:1280px){float:left;position:sticky;top:100px;width:calc((100vw - 720px) / 2 - 80px);max-width:250px;margin-left:calc((100vw - 1280px) / 2);overflow:auto;word-break:break-word;max-height:calc(100vh - 200px);fontsize:1rem;display:block;border-left-width:4px;border-image:linear-gradient( 180deg,",r?l.darkModeColor.mainColor1+","+l.darkModeColor.mainColor2+","+l.darkModeColor.mainColor3:l.whiteModeColor.mainColor1+","+l.whiteModeColor.mainColor2+","+l.whiteModeColor.mainColor3," );border-image-slice:1;}")},Object(o.c)("h3",{css:Object(o.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);margin-left:1rem;margin-right:1rem;margin-top:0.5rem;font-weight:700;margin-bottom:0.5rem;font-size:1.125rem; ",r?{"--text-opacity":"1",color:"rgba(203, 213, 224, var(--text-opacity))"}:{"--text-opacity":"1",color:"rgba(74, 85, 104, var(--text-opacity))"},";")},Object(o.c)(c.Link,{to:"/"},"Categories")),Object(o.c)("ul",{css:u},f.map((function(t,a){return""!==t.relativePath?Object(o.c)("li",{key:"category_"+a,css:Object(o.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);--text-opacity:1;color:rgba(160, 174, 192, var(--text-opacity));font-size:0.875rem; ",e&&decodeURI(e)==="/"+t.relativePath+"/"&&"\n                        font-size: 0.95rem;\n                        color: "+(r?"#DDDDDD":"#555555")+";\n                        "," &:hover{color:",r?"#DDDDDD":"#555555",";}")},Object(o.c)(c.Link,{to:"/"+t.relativePath+"/"},t.relativePath.replace("/"," ").trim().replace(" ","/"))):""})))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-93918af7d90141f002d0.js.map