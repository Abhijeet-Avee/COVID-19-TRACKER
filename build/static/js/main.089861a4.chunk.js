(this["webpackJsonpcovid-19-tracker"]=this["webpackJsonpcovid-19-tracker"]||[]).push([[0],{100:function(e,t,c){},101:function(e,t,c){},106:function(e,t,c){},107:function(e,t,c){},205:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),r=c(7),s=c.n(r),o=(c(98),c(23)),i=c.n(o),l=c(38),u=c(11),d=(c(100),c(241)),j=c(242),f=c(243),b=c(232),h=c(236),v=c(13),O=(c(101),c(237)),p=c(3);var x=function(e){var t=e.title,c=e.cases,n=e.isRed,a=e.isOrange,r=e.active,s=e.total,o=Object(v.a)(e,["title","cases","isRed","isOrange","active","total"]);return Object(p.jsx)(b.a,{onClick:o.onClick,className:"infoBox ".concat(r&&"infoBox--selected"," ").concat(n&&"infoBox--red"," \n        ").concat(a&&"infoBox--orange"),children:Object(p.jsxs)(h.a,{children:[Object(p.jsxs)(O.a,{className:"infoBox_title",color:"textSecondary",children:[t,"(1d)"]}),Object(p.jsx)("h2",{className:"infoBox_cases ".concat(a&&"infoBox_cases--orange"," ").concat(n&&"infoBox_cases--red"),children:c}),Object(p.jsxs)(O.a,{className:"infoBox_total",color:"textSecondary",children:[s," Total"]})]})})},m=(c(106),c(240)),g=c(245),y=c(238);var N=function(e){var t=e.center,c=Object(y.a)();return c.setView(t,c.getZoom()),null},w=c(88),C=c(244),k=c(239),S=c(14),_=c.n(S),B={cases:{hex:"#f06f0c",multiplier:400},recovered:{hex:"#7dd71d",multiplier:550},deaths:{hex:"#fb4443",multiplier:850}},I=function(e){return Object(w.a)(e).sort((function(e,t){return e.active>t.active?-1:1}))},T=function(e){return e?"+".concat(_()(e).format("0.0a")):"+0"},R=function(e,t){return e.map((function(e){return Object(p.jsx)(C.a,{center:[e.countryInfo.lat,e.countryInfo.long],radius:Math.sqrt(e[t])*B[t].multiplier,pathOptions:{fillOpacity:.4,color:B[t].hex,fillColor:B[t].hex},children:Object(p.jsx)(k.a,{children:Object(p.jsxs)("div",{className:"info-container",children:[Object(p.jsx)("div",{className:"info-flag",style:{backgroundImage:"url(".concat(e.countryInfo.flag,")")}}),Object(p.jsx)("div",{className:"info-name",children:e.country}),Object(p.jsxs)("div",{className:"info-confirmed",children:["Cases: ",_()(e.cases).format("0,0")]}),Object(p.jsxs)("div",{className:"info-recovered",children:["Recovered: ",_()(e.recovered).format("0,0")]}),Object(p.jsxs)("div",{className:"info-deaths",children:["Deaths: ",_()(e.deaths).format("0,0")]})]})})})}))};var D=function(e){var t=e.countries,c=e.casesType,n=e.center,a=e.zoom;return Object(p.jsx)("div",{className:"map",children:Object(p.jsxs)(m.a,{center:n,zoom:a,children:[Object(p.jsx)(g.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(p.jsx)(N,{center:n}),R(t,c)]})})};c(107);var A=function(e){var t=e.countries;return Object(p.jsx)("div",{className:"table",children:t.map((function(e){var t=e.country,c=e.active;return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:t}),Object(p.jsx)("td",{children:Object(p.jsx)("strong",{children:_()(c).format("0,0")})})]})}))})},E=c(87),F={cases:{rgba:"rgba(240, 111, 12, 0.4)",rgb:"rgb(240, 111, 12)"},recovered:{rgba:"rgba(125, 215, 29, 0.4)",rgb:"rgb(125, 215, 29)"},deaths:{rgba:"rgba(251, 68, 67, 0.4)",rgb:"rgba(251, 68, 67)"}},M={legend:{display:!1},elements:{point:{radius:0}},maintainAspectRatio:!1,tooltips:{mode:"index",intersect:!1,callbacks:{label:function(e,t){return _()(e.value).format("+0,0")}}},scales:{xAxes:[{type:"time",time:{format:"MM/DD/YY",tooltipFormat:"ll"}}],yAxes:[{gridLines:{display:!1},ticks:{callback:function(e,t,c){return _()(e).format("0a")}}}]}};var z=function(e){var t=e.casesType,c=void 0===t?"cases":t,a=Object(v.a)(e,["casesType"]),r=Object(n.useState)({}),s=Object(u.a)(r,2),o=s[0],d=s[1],j=function(e){var t,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cases",n=[];for(var a in e.cases){if(t){var r={x:a,y:e[c][a]-t};n.push(r)}t=e[c][a]}return n};return Object(n.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=90").then((function(e){return e.json()})).then((function(e){console.log(e);var t=j(e,c);d(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[c]),Object(p.jsx)("div",{className:a.className,children:(null===o||void 0===o?void 0:o.length)>0&&Object(p.jsx)(E.Line,{options:M,data:{datasets:[{backgroundColor:F[c].rgba,borderColor:F[c].rgb,data:o}]}})})};c(204);var L=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),c=t[0],a=t[1],r=Object(n.useState)("worldwide"),s=Object(u.a)(r,2),o=s[0],v=s[1],O=Object(n.useState)({}),m=Object(u.a)(O,2),g=m[0],y=m[1],N=Object(n.useState)([]),w=Object(u.a)(N,2),C=w[0],k=w[1],S=Object(n.useState)({lat:22.80746,lng:20.4796}),_=Object(u.a)(S,2),B=_[0],R=_[1],E=Object(n.useState)(2.5),F=Object(u.a)(E,2),M=F[0],L=F[1],J=Object(n.useState)([]),P=Object(u.a)(J,2),V=P[0],W=P[1],Y=Object(n.useState)("cases"),q=Object(u.a)(Y,2),K=q[0],Z=q[1];Object(n.useEffect)((function(){fetch("https://disease.sh/v3/covid-19/all?yesterday=true").then((function(e){return e.json()})).then((function(e){y(e)}))}),[]),Object(n.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://disease.sh/v3/covid-19/countries").then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return{name:e.country,value:e.countryInfo.iso2}})),c=I(e);k(c),W(e),a(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var G=function(){var e=Object(l.a)(i.a.mark((function e(t){var c,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.target.value,n="worldwide"===c?"https://disease.sh/v3/covid-19/all?yesterday=true":"https://disease.sh/v3/covid-19/countries/".concat(c,"?yesterday=true&strict=true"),e.next=4,fetch(n).then((function(e){return e.json()})).then((function(e){v(c),y(e),R("worldwide"===c?[22.80746,20.4796]:[e.countryInfo.lat,e.countryInfo.long]),L(4)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsxs)("div",{className:"app",children:[Object(p.jsxs)("div",{className:"app_left",children:[Object(p.jsxs)("div",{className:"app_header",children:[Object(p.jsx)("h1",{children:"COVID-19 TRACKER"}),Object(p.jsx)(d.a,{className:"app_dropdown",children:Object(p.jsxs)(j.a,{variant:"outlined",onChange:G,value:o,children:[Object(p.jsx)(f.a,{value:"worldwide",children:"Worldwide"}),c.map((function(e){return Object(p.jsx)(f.a,{value:e.value,children:e.name})}))]})})]}),Object(p.jsxs)("div",{className:"app_stats",children:[Object(p.jsx)(x,{isOrange:!0,active:"cases"===K,onClick:function(e){return Z("cases")},title:"Coronavirus Cases",cases:T(g.todayCases),total:T(g.cases)}),Object(p.jsx)(x,{active:"recovered"===K,onClick:function(e){return Z("recovered")},title:"Recovered",cases:T(g.todayRecovered),total:T(g.recovered)}),Object(p.jsx)(x,{isRed:!0,active:"deaths"===K,onClick:function(e){return Z("deaths")},title:"Deaths",cases:T(g.todayDeaths),total:T(g.deaths)})]}),Object(p.jsx)(D,{casesType:K,countries:V,center:B,zoom:M})]}),Object(p.jsx)(b.a,{className:"app_right",children:Object(p.jsxs)(h.a,{children:[Object(p.jsx)("h3",{children:"Active Cases by Country"}),Object(p.jsx)(A,{countries:C}),Object(p.jsxs)("h3",{className:"app_graphTitle",children:["Worldwide new ",K]}),Object(p.jsx)(z,{className:"app_graph",casesType:K})]})})]})},J=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,247)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),n(e),a(e),r(e),s(e)}))};s.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(L,{})}),document.getElementById("root")),J()},98:function(e,t,c){}},[[205,1,2]]]);
//# sourceMappingURL=main.089861a4.chunk.js.map