(self.webpackChunkalm_backend=self.webpackChunkalm_backend||[]).push([[857],{94654:(u,g,o)=>{var n=o(21078),f=o(35161);function c(l,p){return n(f(l,p),1)}u.exports=c},35161:(u,g,o)=>{var n=o(29932),f=o(67206),c=o(69199),l=o(1469);function p(h,d){var v=l(h)?n:c;return v(h,f(d,3))}u.exports=p},17061:(u,g,o)=>{var n=o(18698).default;function f(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */u.exports=f=function(){return l},u.exports.__esModule=!0,u.exports.default=u.exports;var c,l={},p=Object.prototype,h=p.hasOwnProperty,d=Object.defineProperty||function(r,t,e){r[t]=e.value},v=typeof Symbol=="function"?Symbol:{},x=v.iterator||"@@iterator",P=v.asyncIterator||"@@asyncIterator",_=v.toStringTag||"@@toStringTag";function j(r,t,e){return Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}),r[t]}try{j({},"")}catch{j=function(e,a,s){return e[a]=s}}function m(r,t,e,a){var s=t&&t.prototype instanceof I?t:I,i=Object.create(s.prototype),y=new Y(a||[]);return d(i,"_invoke",{value:X(r,e,y)}),i}function C(r,t,e){try{return{type:"normal",arg:r.call(t,e)}}catch(a){return{type:"throw",arg:a}}}l.wrap=m;var b="suspendedStart",B="suspendedYield",L="executing",O="completed",E={};function I(){}function A(){}function D(){}var R={};j(R,x,function(){return this});var $=Object.getPrototypeOf,k=$&&$($(z([])));k&&k!==p&&h.call(k,x)&&(R=k);var T=D.prototype=I.prototype=Object.create(R);function F(r){["next","throw","return"].forEach(function(t){j(r,t,function(e){return this._invoke(t,e)})})}function Z(r,t){function e(s,i,y,M){var w=C(r[s],r,i);if(w.type!=="throw"){var U=w.arg,S=U.value;return S&&n(S)=="object"&&h.call(S,"__await")?t.resolve(S.__await).then(function(W){e("next",W,y,M)},function(W){e("throw",W,y,M)}):t.resolve(S).then(function(W){U.value=W,y(U)},function(W){return e("throw",W,y,M)})}M(w.arg)}var a;d(this,"_invoke",{value:function(i,y){function M(){return new t(function(w,U){e(i,y,w,U)})}return a=a?a.then(M,M):M()}})}function X(r,t,e){var a=b;return function(s,i){if(a===L)throw new Error("Generator is already running");if(a===O){if(s==="throw")throw i;return{value:c,done:!0}}for(e.method=s,e.arg=i;;){var y=e.delegate;if(y){var M=K(y,e);if(M){if(M===E)continue;return M}}if(e.method==="next")e.sent=e._sent=e.arg;else if(e.method==="throw"){if(a===b)throw a=O,e.arg;e.dispatchException(e.arg)}else e.method==="return"&&e.abrupt("return",e.arg);a=L;var w=C(r,t,e);if(w.type==="normal"){if(a=e.done?O:B,w.arg===E)continue;return{value:w.arg,done:e.done}}w.type==="throw"&&(a=O,e.method="throw",e.arg=w.arg)}}}function K(r,t){var e=t.method,a=r.iterator[e];if(a===c)return t.delegate=null,e==="throw"&&r.iterator.return&&(t.method="return",t.arg=c,K(r,t),t.method==="throw")||e!=="return"&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+e+"' method")),E;var s=C(a,r.iterator,t.arg);if(s.type==="throw")return t.method="throw",t.arg=s.arg,t.delegate=null,E;var i=s.arg;return i?i.done?(t[r.resultName]=i.value,t.next=r.nextLoc,t.method!=="return"&&(t.method="next",t.arg=c),t.delegate=null,E):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,E)}function G(r){var t={tryLoc:r[0]};1 in r&&(t.catchLoc=r[1]),2 in r&&(t.finallyLoc=r[2],t.afterLoc=r[3]),this.tryEntries.push(t)}function N(r){var t=r.completion||{};t.type="normal",delete t.arg,r.completion=t}function Y(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(G,this),this.reset(!0)}function z(r){if(r||r===""){var t=r[x];if(t)return t.call(r);if(typeof r.next=="function")return r;if(!isNaN(r.length)){var e=-1,a=function s(){for(;++e<r.length;)if(h.call(r,e))return s.value=r[e],s.done=!1,s;return s.value=c,s.done=!0,s};return a.next=a}}throw new TypeError(n(r)+" is not iterable")}return A.prototype=D,d(T,"constructor",{value:D,configurable:!0}),d(D,"constructor",{value:A,configurable:!0}),A.displayName=j(D,_,"GeneratorFunction"),l.isGeneratorFunction=function(r){var t=typeof r=="function"&&r.constructor;return!!t&&(t===A||(t.displayName||t.name)==="GeneratorFunction")},l.mark=function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,D):(r.__proto__=D,j(r,_,"GeneratorFunction")),r.prototype=Object.create(T),r},l.awrap=function(r){return{__await:r}},F(Z.prototype),j(Z.prototype,P,function(){return this}),l.AsyncIterator=Z,l.async=function(r,t,e,a,s){s===void 0&&(s=Promise);var i=new Z(m(r,t,e,a),s);return l.isGeneratorFunction(t)?i:i.next().then(function(y){return y.done?y.value:i.next()})},F(T),j(T,_,"Generator"),j(T,x,function(){return this}),j(T,"toString",function(){return"[object Generator]"}),l.keys=function(r){var t=Object(r),e=[];for(var a in t)e.push(a);return e.reverse(),function s(){for(;e.length;){var i=e.pop();if(i in t)return s.value=i,s.done=!1,s}return s.done=!0,s}},l.values=z,Y.prototype={constructor:Y,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=c,this.done=!1,this.delegate=null,this.method="next",this.arg=c,this.tryEntries.forEach(N),!t)for(var e in this)e.charAt(0)==="t"&&h.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=c)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if(t.type==="throw")throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function a(U,S){return y.type="throw",y.arg=t,e.next=U,S&&(e.method="next",e.arg=c),!!S}for(var s=this.tryEntries.length-1;s>=0;--s){var i=this.tryEntries[s],y=i.completion;if(i.tryLoc==="root")return a("end");if(i.tryLoc<=this.prev){var M=h.call(i,"catchLoc"),w=h.call(i,"finallyLoc");if(M&&w){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(M){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!w)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var a=this.tryEntries.length-1;a>=0;--a){var s=this.tryEntries[a];if(s.tryLoc<=this.prev&&h.call(s,"finallyLoc")&&this.prev<s.finallyLoc){var i=s;break}}i&&(t==="break"||t==="continue")&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var y=i?i.completion:{};return y.type=t,y.arg=e,i?(this.method="next",this.next=i.finallyLoc,E):this.complete(y)},complete:function(t,e){if(t.type==="throw")throw t.arg;return t.type==="break"||t.type==="continue"?this.next=t.arg:t.type==="return"?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):t.type==="normal"&&e&&(this.next=e),E},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.finallyLoc===t)return this.complete(a.completion,a.afterLoc),N(a),E}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.tryLoc===t){var s=a.completion;if(s.type==="throw"){var i=s.arg;N(a)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,a){return this.delegate={iterator:z(t),resultName:e,nextLoc:a},this.method==="next"&&(this.arg=c),E}},l}u.exports=f,u.exports.__esModule=!0,u.exports.default=u.exports},18698:u=>{function g(o){return u.exports=g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},u.exports.__esModule=!0,u.exports.default=u.exports,g(o)}u.exports=g,u.exports.__esModule=!0,u.exports.default=u.exports},64687:(u,g,o)=>{var n=o(17061)();u.exports=n;try{regeneratorRuntime=n}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},15861:(u,g,o)=>{"use strict";o.d(g,{Z:()=>f});function n(c,l,p,h,d,v,x){try{var P=c[v](x),_=P.value}catch(j){p(j);return}P.done?l(_):Promise.resolve(_).then(h,d)}function f(c){return function(){var l=this,p=arguments;return new Promise(function(h,d){var v=c.apply(l,p);function x(_){n(v,h,d,x,P,"next",_)}function P(_){n(v,h,d,x,P,"throw",_)}x(void 0)})}}},17034:(u,g,o)=>{"use strict";o.d(g,{A:()=>h});var n=o(85893),f=o(88972),c=o(41580);const l=(0,f.ZP)(c.x)`
  display: grid;
  grid-template-columns: ${({hasSideNav:d})=>d?"auto 1fr":"1fr"};
`,p=(0,f.ZP)(c.x)`
  overflow-x: hidden;
`,h=({sideNav:d,children:v})=>(0,n.jsxs)(l,{hasSideNav:!!d,children:[d,(0,n.jsx)(p,{paddingBottom:10,children:v})]})},53192:(u,g,o)=>{"use strict";o.d(g,{m:()=>h});var n=o(85893),f=o(88972),c=o(11276);const l=`${232/16}rem`,p=(0,f.ZP)(c.r)`
  width: ${l};
  background: ${({theme:d})=>d.colors.neutral100};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid ${({theme:d})=>d.colors.neutral200};
  z-index: 1;
`,h=({ariaLabel:d,...v})=>(0,n.jsx)(p,{"aria-label":d,as:"nav",...v})},60984:(u,g,o)=>{"use strict";o.d(g,{p:()=>B});var n=o(85893),f=o(67294),c=o(97184),l=o(88972),p=o(7801),h=o(2504);const d=L=>{const O=(0,f.useRef)();return(0,f.useEffect)(()=>{O.current=L}),O.current};var v=o(70004),x=o(41580),P=o(8509),_=o(49123),j=o(11047),m=o(75515),C=o(12028);const b=(0,l.ZP)(v.i)`
  width: ${24/16}rem;
  background-color: ${({theme:L})=>L.colors.neutral200};
`,B=({as:L="h2",label:O,searchLabel:E="",searchable:I=!1,onChange:A=()=>{},value:D="",onClear:R=()=>{},onSubmit:$=()=>{},id:k})=>{const[T,F]=(0,f.useState)(!1),Z=d(T),X=(0,h.M)(k),K=(0,f.useRef)(void 0),G=(0,f.useRef)(void 0);(0,f.useEffect)(()=>{T&&K.current&&K.current.focus(),Z&&!T&&G.current&&G.current.focus()},[T,Z]);const N=()=>{F(t=>!t)},Y=t=>{R(t),K.current.focus()},z=t=>{t.relatedTarget?.id!==X&&F(!1)},r=t=>{t.key===p.y.ESCAPE&&F(!1)};return T?(0,n.jsxs)(x.x,{paddingLeft:4,paddingTop:5,paddingBottom:2,paddingRight:4,children:[(0,n.jsx)(P.U,{children:(0,n.jsx)(_.w,{name:"searchbar",value:D,onChange:A,placeholder:"e.g: strapi-plugin-abcd",onKeyDown:r,ref:K,onBlur:z,onClear:Y,onSubmit:$,clearLabel:"Clear",size:"S",children:E})}),(0,n.jsx)(x.x,{paddingLeft:2,paddingTop:4,children:(0,n.jsx)(b,{})})]}):(0,n.jsxs)(x.x,{paddingLeft:6,paddingTop:6,paddingBottom:2,paddingRight:4,children:[(0,n.jsxs)(j.k,{justifyContent:"space-between",alignItems:"flex-start",children:[(0,n.jsx)(m.Z,{variant:"beta",as:L,children:O}),I&&(0,n.jsx)(C.h,{ref:G,onClick:N,label:E,icon:(0,n.jsx)(c.Z,{})})]}),(0,n.jsx)(x.x,{paddingTop:4,children:(0,n.jsx)(b,{})})]})}},52305:(u,g,o)=>{"use strict";o.d(g,{E:()=>j});var n=o(85893),f=o(67294),c=o(71818),l=o(88972),p=o(41580),h=o(75515),d=o(11047),v=o(63507);const x=(0,l.ZP)(p.x)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: ${({theme:m})=>m.colors.neutral800};
  svg > * {
    fill: ${({theme:m})=>m.colors.neutral600};
  }

  &.active {
    ${({theme:m})=>`
      background-color: ${m.colors.primary100};
      border-right: 2px solid ${m.colors.primary600};
      svg > * {
        fill: ${m.colors.primary700};
      }
      ${h.Z} {
        color: ${m.colors.primary700};
        font-weight: 500;
      }
      `}
  }

  &:focus-visible {
    outline-offset: -2px;
  }
`,P=(0,l.ZP)(c.Z)`
  width: ${12/16}rem;
  height: ${4/16}rem;
  * {
    fill: ${({theme:m,$active:C})=>C?m.colors.primary600:m.colors.neutral600};
  }
`,_=l.ZP.div`
  svg {
    height: ${12/16}rem;
    width: ${12/16}rem;
  }
`,j=f.forwardRef(({children:m,icon:C=null,withBullet:b=!1,as:B=v.f,isSubSectionChild:L=!1,...O},E)=>(0,n.jsxs)(x,{as:B,icon:C,background:"neutral100",paddingLeft:L?9:7,paddingBottom:2,paddingTop:2,ref:E,...O,children:[(0,n.jsxs)(d.k,{children:[C?(0,n.jsx)(_,{children:C}):(0,n.jsx)(P,{}),(0,n.jsx)(p.x,{paddingLeft:2,children:(0,n.jsx)(h.Z,{as:"span",children:m})})]}),b&&(0,n.jsx)(p.x,{as:d.k,paddingRight:4,children:(0,n.jsx)(P,{$active:!0})})]}))},29489:(u,g,o)=>{"use strict";o.d(g,{D:()=>C});var n=o(85893),f=o(67294),c=o(88972),l=o(12645),p=o(11047),h=o(41580),d=o(75515);const v=(0,c.ZP)(p.k)`
  border: none;
  padding: 0;
  background: transparent;
`,x=c.ZP.div`
  display: flex;
  align-items: center;
  transform: rotateX(${({rotated:b})=>b?"0deg":"180deg"});
`,P=({collapsable:b=!1,label:B,onClick:L=()=>{},ariaExpanded:O,ariaControls:E})=>b?(0,n.jsxs)(v,{as:"button",onClick:L,"aria-expanded":O,"aria-controls":E,textAlign:"left",children:[(0,n.jsx)(h.x,{paddingRight:1,children:(0,n.jsx)(d.Z,{variant:"sigma",textColor:"neutral600",children:B})}),b&&(0,n.jsx)(x,{rotated:O,children:(0,n.jsx)(l.Z,{"aria-hidden":!0})})]}):(0,n.jsx)(v,{children:(0,n.jsx)(h.x,{paddingRight:1,children:(0,n.jsx)(d.Z,{variant:"sigma",textColor:"neutral600",children:B})})});var _=o(2504),j=o(30190);const m=(0,c.ZP)(h.x)`
  svg {
    height: ${4/16}rem;
    path {
      fill: ${({theme:b})=>b.colors.neutral500};
    }
  }
`,C=({collapsable:b=!1,label:B,badgeLabel:L,children:O,id:E})=>{const[I,A]=(0,f.useState)(!0),D=(0,_.M)(E);return(0,n.jsxs)(p.k,{direction:"column",alignItems:"stretch",gap:1,children:[(0,n.jsx)(m,{paddingLeft:6,paddingTop:2,paddingBottom:2,paddingRight:4,children:(0,n.jsxs)(h.x,{position:"relative",paddingRight:L?6:0,children:[(0,n.jsx)(P,{onClick:()=>{A(R=>!R)},ariaExpanded:I,ariaControls:D,collapsable:b,label:B}),L&&(0,n.jsx)(j.C,{backgroundColor:"neutral150",textColor:"neutral600",position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",children:L})]})}),(!b||I)&&(0,n.jsx)("ol",{id:D,children:f.Children.map(O,(R,$)=>(0,n.jsx)("li",{children:R},$))})]})}},34446:(u,g,o)=>{"use strict";o.d(g,{Z:()=>p});var n=o(85893),f=o(67294),c=o(41580),l=o(11047);const p=({children:h,spacing:d=2,horizontal:v=!1,...x})=>(0,n.jsx)(c.x,{paddingTop:2,paddingBottom:4,children:(0,n.jsx)(l.k,{as:"ol",gap:d,direction:v?"row":"column",alignItems:v?"center":"stretch",...x,children:f.Children.map(h,(P,_)=>(0,n.jsx)("li",{children:P},_))})})},71818:(u,g,o)=>{"use strict";o.d(g,{Z:()=>c});var n=o(85893);const f=l=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1rem",height:"1rem",fill:"none",viewBox:"0 0 4 4",...l,children:(0,n.jsx)("rect",{width:4,height:4,fill:"#A5A5BA",rx:2})}),c=f}}]);
