(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{H2bQ:function(t,e,r){"use strict";var a=r("q1tI");e.a=function(t){var e="undefined"!=typeof window?window.sessionStorage.getItem(t+"_count"):1,r=Object(a.useState)(Number(e)),i=r[0],o=r[1],n=Object(a.useRef)(i);return Object(a.useEffect)((function(){n.current=i,window.sessionStorage.setItem(t+"_count",i)}),[i,t]),[i,n,function(){return o((function(t){return t+1}))}]}},Mdw5:function(t,e,r){"use strict";r.r(e),r.d(e,"pageQuery",(function(){return w}));var a=r("KQm4"),i=r("wTIg"),o=r("q1tI"),n=r("vrFN"),c=r("4Fbo"),s=r("CZVI"),l=r("7oih"),b=r("Wbzz"),u=r("cr+I"),m=r.n(u),g=r("TepU"),d=r("TWQg"),f=r("H2bQ"),p=r("dar/"),h=r("qKvR"),j=Object(i.a)("div",{target:"e5hkq810"})({name:"1bdwg0l",styles:"width:100%;max-width:768px;margin-left:auto;margin-right:auto;"}),O={name:"1y7rtor",styles:"margin-top:1rem;padding-left:1rem;padding-right:1rem;font-size:2.25rem;font-weight:700;"},v={name:"b7ldc7",styles:"margin-left:1rem;margin-right:1rem;font-size:1.25rem;"};e.default=function(t){var e=t.data,r=t.location,i=e.allMarkdownRemark.edges,u=e.site.siteMetadata.configs.countOfInitialPost,w=String(r.pathname).split("/").join(" ").trim(),y=Object(f.a)(w),x=y[0],k=y[1],D=y[2],C=Object(o.useRef)(),z=Object(o.useState)({tag:"ALL",filteredPosts:i}),I=z[0],P=z[1],M=Object(o.useMemo)((function(){var t=[];i.map((function(e){var r=e.node;return t=[].concat(Object(a.a)(t),Object(a.a)(r.frontmatter.tags))}));for(var e=0;e<t.length;++e)for(var r=e+1;r<t.length;++r)t[e]===t[r]&&t.splice(r--,1);return t}),[i]),q=Object(o.useCallback)((function(t){void 0===t&&(t=I.tag),P("ALL"===t?{tag:t,filteredPosts:i}:{tag:t,filteredPosts:i.filter((function(e){return e.node.frontmatter.tags.includes(t)}))})}),[i,I.tag]);Object(d.a)((function(){i.length>k.current*u&&(D(),q())}),C);return Object(o.useEffect)((function(){if(r.href){var t=m.a.parseUrl(r.href).query.tag;t&&q(t)}}),[r.href,q]),Object(h.c)(l.a,null,Object(h.c)(n.a,{title:w}),Object(h.c)(j,null,Object(h.c)(c.a,null),Object(h.c)("h1",{className:"category-title",css:O},"#",w)),Object(h.c)(p.a,{path:r.pathname}),Object(h.c)(j,null,Object(h.c)(g.a,{tags:M,onTagClick:function(t){Object(b.navigate)("?tag="+t),q(t)},state:I}),0===I.filteredPosts.length&&Object(h.c)("div",{css:v},"no post.."),I.filteredPosts.slice(0,x*u).map((function(t,e){return Object(h.c)(s.a,{post:t,key:"post_"+e})}))),Object(h.c)("div",{ref:C}))};var w="3783701473"},TWQg:function(t,e,r){"use strict";var a=r("q1tI");e.a=function(t,e){Object(a.useEffect)((function(){var r;return e.current&&(r=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&t()}))}))).observe(e.current),function(){return r&&r.disconnect()}}),[e,t])}},"dar/":function(t,e,r){"use strict";var a=r("wTIg"),i=r("qKvR"),o=r("q1tI"),n=r.n(o),c=r("Wbzz"),s=r("T3Tk"),l=r("EB9Y"),b=Object(a.a)("div",{target:"eqvvi2y0"})({name:"11ijy78",styles:"display:block;width:100%;max-width:768px;margin-left:auto;margin-right:auto;@media (min-width: 1280px){display:none;}"}),u={name:"san2fj",styles:"margin-left:1rem;margin-right:1rem;margin-top:0.5rem;"},m={name:"san2fj",styles:"margin-left:1rem;margin-right:1rem;margin-top:0.5rem;"};e.a=function(t){var e=t.path,r=Object(o.useContext)(l.a).isDarkMode,a=Object(o.useState)(!1),g=a[0],d=a[1],f=Object(c.useStaticQuery)("1900723382").categories.nodes;return Object(i.c)(n.a.Fragment,null,Object(i.c)(b,null,Object(i.c)("ul",{css:u},Object(i.c)("button",{css:Object(i.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);font-weight:700;margin-bottom:0.5rem;font-size:1.125rem; ",r?{"--text-opacity":"1",color:"rgba(203, 213, 224, var(--text-opacity))"}:{"--text-opacity":"1",color:"rgba(74, 85, 104, var(--text-opacity))"},";"),onClick:function(){d(!g)}},"Categories List ",g?"▲":"▼"),g&&Object(i.c)("div",null,f.map((function(t,a){return""!==t.relativePath?Object(i.c)("li",{key:"categorylist_"+a,css:Object(i.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);--text-opacity:1;color:rgba(160, 174, 192, var(--text-opacity));font-size:1rem;margin-left:0.5rem;margin-right:0.5rem; ",e&&decodeURI(e)==="/"+t.relativePath+"/"&&"\n                        font-size: 0.95rem;\n                        color: "+(r?"#DDDDDD":"#555555")+";\n                        "," &:hover{color:",r?"#DDDDDD":"#555555",";}")},Object(i.c)(c.Link,{to:"/"+t.relativePath+"/"},t.relativePath.replace("/"," ").trim().replace(" ","/"))):""}))))),Object(i.c)("div",{css:Object(i.b)("::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background-color:transparent;}::-webkit-scrollbar-thumb{border-radius:9999px;background-color:gray;}::-webkit-scrollbar-button{width:0;height:0;}scrollbar-width:thin;scrollbar-color:gray transparent;display:none;@media screen and (min-width:1280px){float:left;position:sticky;top:100px;width:calc((100vw - 720px) / 2 - 80px);max-width:250px;margin-left:calc((100vw - 1280px) / 2);overflow:auto;word-break:break-word;max-height:calc(100vh - 200px);fontsize:1rem;display:flex;border-left-width:4px;border-image:linear-gradient( 180deg,",r?s.darkModeColor.mainColor1+","+s.darkModeColor.mainColor2+","+s.darkModeColor.mainColor3:s.whiteModeColor.mainColor1+","+s.whiteModeColor.mainColor2+","+s.whiteModeColor.mainColor3," );border-image-slice:1;}")},Object(i.c)("ul",{css:m},Object(i.c)("h3",{css:Object(i.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);font-weight:700;margin-bottom:0.5rem;font-size:1.125rem; ",r?{"--text-opacity":"1",color:"rgba(203, 213, 224, var(--text-opacity))"}:{"--text-opacity":"1",color:"rgba(74, 85, 104, var(--text-opacity))"},";")},Object(i.c)(c.Link,{to:"/"},"Categories")),f.map((function(t,a){return""!==t.relativePath?Object(i.c)("li",{key:"category_"+a,css:Object(i.b)("transition:all 300ms cubic-bezier(0.4,0,0.2,1);--text-opacity:1;color:rgba(160, 174, 192, var(--text-opacity));font-size:0.875rem; ",e&&decodeURI(e)==="/"+t.relativePath+"/"&&"\n                        font-size: 0.95rem;\n                        color: "+(r?"#DDDDDD":"#555555")+";\n                        "," &:hover{color:",r?"#DDDDDD":"#555555",";}")},Object(i.c)(c.Link,{to:"/"+t.relativePath+"/"},t.relativePath.replace("/"," ").trim().replace(" ","/"))):""})))))}}}]);
//# sourceMappingURL=component---src-templates-category-js-ffd1b02db0841888437e.js.map