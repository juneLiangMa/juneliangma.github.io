(self.webpackChunkphoto_blog=self.webpackChunkphoto_blog||[]).push([[179],{234:(e,t,n)=>{"use strict";var a=n(294),r=n(935),l=n(727),c=n(977),o=function(){return(o=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},s=function(e){return o(o({},e),{date:new Date(e.date)})},m=function(e){return"/data/photos/"+e+".webp"},u=function(e){return"/data/photos/"+e+".small.webp"},i=function(e,t){return u(t[e].path)},h=function(e,t){return m(t[e].path)},f=n(679);const p=function(e){var t=e.photoKey,n=e.photos;return a.createElement("div",{className:"t-center pv3"},a.createElement(f.LazyLoadImage,{className:"w-100",effect:"blur",alt:"Photo with Caption "+n[t].caption,placeholderSrc:i(t,n),src:h(t,n)}),a.createElement("p",null,n[t].caption))},d=function(e){var t=e.text,n=e.photos;return a.createElement(a.Fragment,null,null==t?void 0:t.split("\n").map((function(e,t){if(e.match(/!!([A-Z]|[a-z])+/g)){var r=e.replace("!!","");return void 0!==n&&n[r]?(console.log(r),a.createElement(p,{photoKey:r,photos:n})):a.createElement("p",{key:e+t},"WARNING: Missing Photo")}return a.createElement("p",{key:e+t},e)})))},E=function(){var e=(0,c.UO)().title,t=(0,a.useState)(void 0),n=t[0],r=t[1],l=(0,a.useState)(!0),s=l[0],m=l[1];(0,a.useEffect)((function(){fetch("/data/"+e+".json").then((function(e){return e.json()})).then((function(e){var t,n;m(!1),r((n={},(t=e).photos.forEach((function(e){n[e.id]=e})),{info:o(o({},t.info),{date:new Date(t.info.date)}),photos:n}))}))}),[]);var u=new Intl.DateTimeFormat("en-US",{dateStyle:"long"}),p=s||!n?null:a.createElement("div",{className:"t-center"},a.createElement(f.LazyLoadImage,{className:"w-100",effect:"blur",placeholderSrc:i(n.info.cover,n.photos),src:h(n.info.cover,n.photos)})),E=s?"Loading":null==n?void 0:n.info.title,v=s?"":u.format(null==n?void 0:n.info.date),g=s?"":null==n?void 0:n.info.post,N=s?null:null==n?void 0:n.info.tags.map((function(e){return a.createElement("span",{className:"bg-accent bold white ph1 rounded m1"},e.toUpperCase())}));return a.createElement(a.Fragment,null,p,a.createElement("div",{className:"t-center"},N),a.createElement("h1",{className:"t-center"},E),a.createElement("h4",{className:"t-center"},v),a.createElement(d,{text:g,photos:null==n?void 0:n.photos}))},v=function(e){var t=e.feedPost,n=t.tags.map((function(e){return a.createElement("span",{className:"bg-accent bold white ph1 rounded m1"},e.toUpperCase())})),r=t?a.createElement("div",{className:"t-center"},a.createElement(f.LazyLoadImage,{className:"w-100",effect:"blur",alt:"Cover Photo for "+t.title,placeholderSrc:u(t.cover),src:m(t.cover)})):null,c=new Intl.DateTimeFormat("en-US",{dateStyle:"long"}).format(t.date);return a.createElement("div",{className:"card"},r,a.createElement("div",{className:"t-center"},n),a.createElement("h2",{className:"t-center"},a.createElement(l.rU,{to:"/read/"+t.path},t.title)),a.createElement("h4",{className:"t-center"},c),a.createElement("p",{className:"t-center mt3 feed-desc ph3"},t.shortDescription,"..."))},g=function(e){var t=e.pagePath,n=e.numberOfItems,r=e.currentPage,c=e.itemsPerPage,o=e.maxButtonsVisible,s=Math.ceil(n/c),m=Math.ceil(o/2),u=Math.floor(o/2),i=Math.max(0,Math.max(0,r-m)-Math.abs(Math.min(0,s-(r+u)))),h=Math.min(s,Math.min(s,r+u)+Math.abs(Math.min(0,r-m))),f=Math.abs(h-i);console.log(m+": "+i+", "+u+": "+h+", "+f);var p=Array(f).fill(0).map((function(e,n){return a.createElement(l.rU,{className:i+n+1===r?"m1 rounded btn bg-accent b-accent white":"m1 rounded btn accent",to:t+"/"+(i+n+1)},i+n+1)}));return a.createElement("span",null,p)},N=function(){var e=(0,a.useState)(void 0),t=e[0],n=e[1],r=(0,a.useState)(void 0),c=r[0],o=r[1],i=(0,a.useState)(void 0),h=i[0],p=i[1];(0,a.useEffect)((function(){fetch("/data/posts.json").then((function(e){return e.json()})).then((function(e){e.posts.length>0?n(e.posts.map(s)):n(void 0)}))}),[]),(0,a.useEffect)((function(){if(t){var e=Math.floor(Math.random()*t.length),n=t[e];fetch("/data/"+n.path+".json").then((function(e){return e.json()})).then((function(e){var t=Math.floor(Math.random()*e.photos.length),a=e.photos[t].path;o(n),p(a)}))}}),[t]);var d=h?a.createElement("div",{className:"t-center"},a.createElement(f.LazyLoadImage,{className:"w-100",effect:"blur",placeholderSrc:u(h),src:m(h)})):null,E=c?a.createElement("h4",{className:"t-center"},"From ",a.createElement(l.rU,{to:"/read/"+c.path},c.title)):null;return a.createElement(a.Fragment,null,a.createElement("h1",{className:"t-center pt3"},"Page Not Found"),d,E)};const b=function(){var e=(0,c.UO)().page||"1",t=(0,a.useState)(void 0),n=t[0],r=t[1],l=(0,a.useState)(!0),o=l[0],m=l[1];(0,a.useEffect)((function(){fetch("/data/posts.json").then((function(e){return e.json()})).then((function(e){m(!1),r(e.posts.map(s))}))}),[]);var u=parseInt(e),i=!isNaN(u),h=!o&&n&&i?function(e,t){var n=4*Math.max(t-1,0);return e.slice(n,n+4)}(function(e,t){for(var n=0,a=t.length,r=e.length;n<a;n++,r++)e[r]=t[n];return e}([],n).sort((function(e,t){return t.date.getTime()-e.date.getTime()})),parseInt(e)):[],f=h.map((function(e){return a.createElement("div",{className:"mb2"},a.createElement(v,{feedPost:e}))})),p=i&&n?a.createElement(g,{pagePath:"/feed",numberOfItems:n.length,itemsPerPage:4,currentPage:u,maxButtonsVisible:5}):null;return o||0!=h.length?a.createElement(a.Fragment,null,f,a.createElement("hr",null),a.createElement("div",{className:"t-center pv2"},p)):a.createElement(N,null)};const w=function(){var e=(0,c.UO)().page||"1",t=(0,a.useState)(void 0),n=t[0],r=t[1],l=(0,a.useState)(!0),o=l[0],m=l[1];(0,a.useEffect)((function(){fetch("/data/posts.json").then((function(e){return e.json()})).then((function(e){m(!1),r(e.posts.map(s))}))}),[]);var u=parseInt(e),i=!isNaN(u),h=!o&&n&&i?function(e,t){var n=4*Math.max(t-1,0);return e.slice(n,n+4)}(n,parseInt(e)):[],f={};h.forEach((function(e){e.tags.forEach((function(t){f[t]||(f[t]={tag:t,posts:[]}),f[t].posts.push(e)}))}));var p=Object.keys(f).map((function(e){var t=function(e,t){for(var n=0,a=t.length,r=e.length;n<a;n++,r++)e[r]=t[n];return e}([],f[e].posts).sort((function(e,t){return t.date.getTime()-e.date.getTime()})).map((function(e){return a.createElement("div",{className:"collection-card mr2"},a.createElement(v,{feedPost:e}))}));return a.createElement("div",null,a.createElement("h3",null,e.toUpperCase()),a.createElement("div",{className:"collection"},t))}));return a.createElement(a.Fragment,null,p,a.createElement("hr",null))},M=function(){var e=(0,c.TH)().pathname;return(0,a.useEffect)((function(){window.scrollTo(0,0)}),[e]),null};r.render(a.createElement(a.StrictMode,null,a.createElement((function(){return a.createElement("div",{className:"c"},a.createElement(l.UT,null,a.createElement(M,null),a.createElement("h2",null,"Photo Blog"),a.createElement("hr",null),a.createElement("div",{className:"row mb3"},a.createElement("div",{className:"col"},a.createElement(l.rU,{to:"/",className:"ph2"},"Feed"),a.createElement(l.rU,{to:"/collections",className:"ph2"},"Collections"))),a.createElement(c.rs,null,a.createElement(c.AW,{path:"/read/:title",children:a.createElement(E,null)}),a.createElement(c.AW,{path:"/feed/:page",children:a.createElement(b,null)}),a.createElement(c.AW,{path:"/collections",children:a.createElement(w,null)}),a.createElement(c.AW,{exact:!0,path:"/",children:a.createElement(b,null)}),a.createElement(c.AW,{path:"*",children:a.createElement(N,null)}))))}),null)),document.getElementById("root"))}},e=>{"use strict";e.O(0,[921],(()=>(234,e(e.s=234)))),e.O()}]);
//# sourceMappingURL=main.280662d4d2586575e535.bundle.js.map