(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{RXBc:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",(function(){return p}));var n=a("KQm4"),r=a("wTIg"),c=a("q1tI"),o=a("vrFN"),i=a("4Fbo"),u=a("CZVI"),s=a("7oih"),f=a("Wbzz"),l=a("cr+I"),b=a.n(l),g=a("TepU"),d=a("qKvR"),j=Object(r.a)("div",{target:"e4c4vw0"})({name:"1bdwg0l",styles:"width:100%;max-width:768px;margin-left:auto;margin-right:auto;"});e.default=function(t){var e=t.data,a=t.location,r=e.allMarkdownRemark.edges,l=Object(c.useState)({tag:"ALL",filteredPosts:r}),p=l[0],O=l[1],v=Object(c.useMemo)((function(){var t=[];r.map((function(e){var a=e.node;return t=[].concat(Object(n.a)(t),Object(n.a)(a.frontmatter.tags))}));for(var e=0;e<t.length;++e)for(var a=e+1;a<t.length;++a)t[e]===t[a]&&t.splice(a--,1);return t}),[r]),m=Object(c.useCallback)((function(t){O("ALL"===t?{tag:t,filteredPosts:r}:{tag:t,filteredPosts:r.filter((function(e){return e.node.frontmatter.tags.includes(t)}))})}),[r]);return Object(c.useEffect)((function(){if(a.href){var t=b.a.parseUrl(a.href).query.tag;t&&m(t)}}),[a.href,m]),Object(d.c)(s.a,null,Object(d.c)(o.a,{title:"Home"}),Object(d.c)(j,null,Object(d.c)(i.a,null),Object(d.c)(g.a,{tags:v,onTagClick:function(t){Object(f.navigate)("?tag="+t),m(t)},state:p}),p.filteredPosts.map((function(t,e){return Object(d.c)(u.a,{post:t,key:"post_"+e})}))))};var p="3089110432"}}]);
//# sourceMappingURL=component---src-pages-index-js-fe2d1ba1ec63da8ff82e.js.map