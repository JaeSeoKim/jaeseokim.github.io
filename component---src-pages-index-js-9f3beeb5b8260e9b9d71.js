(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{RXBc:function(t,e,a){"use strict";a.r(e),a.d(e,"pageQuery",(function(){return w}));var n=a("t8Zj"),c=a("wTIg"),r=a("q1tI"),i=a("vrFN"),o=a("4Fbo"),u=a("CZVI"),s=a("7oih"),l=a("Wbzz"),f=a("cr+I"),b=a.n(f),g=a("TepU"),d=a("TWQg"),j=a("H2bQ"),O=a("dar/"),v=a("qKvR"),p=Object(c.a)("div",{target:"e4c4vw0"})({name:"1bdwg0l",styles:"width:100%;max-width:768px;margin-left:auto;margin-right:auto;"});e.default=function(t){var e=t.data,a=t.location,c=e.allMarkdownRemark.edges,f=e.site.siteMetadata.configs.countOfInitialPost,w=Object(j.a)("index"),h=w[0],m=w[1],k=w[2],I=Object(r.useRef)(),P=Object(r.useState)({tag:"ALL",filteredPosts:c}),y=P[0],L=P[1],R=Object(r.useMemo)((function(){var t=[];c.map((function(e){var a=e.node;return t=[].concat(Object(n.a)(t),Object(n.a)(a.frontmatter.tags))}));for(var e=0;e<t.length;++e)for(var a=e+1;a<t.length;++a)t[e]===t[a]&&t.splice(a--,1);return t}),[c]),T=Object(r.useCallback)((function(t){void 0===t&&(t=y.tag),L("ALL"===t?{tag:t,filteredPosts:c}:{tag:t,filteredPosts:c.filter((function(e){return e.node.frontmatter.tags.includes(t)}))})}),[c,y.tag]);Object(d.a)((function(){c.length>m.current*f&&(k(),T())}),I);return Object(r.useEffect)((function(){if(a.href){var t=b.a.parseUrl(a.href).query.tag;t&&T(t)}}),[a.href,T]),Object(v.c)(s.a,null,Object(v.c)(i.a,{title:"Home"}),Object(v.c)(p,null,Object(v.c)(o.a,null)),Object(v.c)(O.a,null),Object(v.c)(p,null,Object(v.c)(g.a,{tags:R,onTagClick:function(t){Object(l.navigate)("?tag="+t),T(t)},state:y}),y.filteredPosts.slice(0,h*f).map((function(t,e){return Object(v.c)(u.a,{post:t,key:"post_"+e})}))),Object(v.c)("div",{ref:I}))};var w="1232896088"}}]);
//# sourceMappingURL=component---src-pages-index-js-9f3beeb5b8260e9b9d71.js.map