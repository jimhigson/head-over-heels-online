const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/browserAll-C8Jhehm9.js","assets/webworkerAll-Rg-rfT7l.js","assets/colorToUniform-ctgBpyc5.js","assets/WebGPURenderer-YqkhaZYM.js","assets/SharedSystems-AGn_bZbW.js","assets/WebGLRenderer-DIAl1ZcN.js"])))=>i.map(i=>d[i]);
function $v(t,e){for(var o=0;o<e.length;o++){const n=e[o];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in t)){const r=Object.getOwnPropertyDescriptor(n,i);r&&Object.defineProperty(t,i,r.get?r:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();function oi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var U0={exports:{}},Ua={},N0={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fs=Symbol.for("react.element"),Wv=Symbol.for("react.portal"),Hv=Symbol.for("react.fragment"),Xv=Symbol.for("react.strict_mode"),Vv=Symbol.for("react.profiler"),qv=Symbol.for("react.provider"),Yv=Symbol.for("react.context"),Qv=Symbol.for("react.forward_ref"),Kv=Symbol.for("react.suspense"),Jv=Symbol.for("react.memo"),e2=Symbol.for("react.lazy"),Pf=Symbol.iterator;function t2(t){return t===null||typeof t!="object"?null:(t=Pf&&t[Pf]||t["@@iterator"],typeof t=="function"?t:null)}var L0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$0=Object.assign,W0={};function ar(t,e,o){this.props=t,this.context=e,this.refs=W0,this.updater=o||L0}ar.prototype.isReactComponent={};ar.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ar.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function H0(){}H0.prototype=ar.prototype;function Dy(t,e,o){this.props=t,this.context=e,this.refs=W0,this.updater=o||L0}var By=Dy.prototype=new H0;By.constructor=Dy;$0(By,ar.prototype);By.isPureReactComponent=!0;var Tf=Array.isArray,X0=Object.prototype.hasOwnProperty,Gy={current:null},V0={key:!0,ref:!0,__self:!0,__source:!0};function q0(t,e,o){var n,i={},r=null,s=null;if(e!=null)for(n in e.ref!==void 0&&(s=e.ref),e.key!==void 0&&(r=""+e.key),e)X0.call(e,n)&&!V0.hasOwnProperty(n)&&(i[n]=e[n]);var l=arguments.length-2;if(l===1)i.children=o;else if(1<l){for(var a=Array(l),c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}if(t&&t.defaultProps)for(n in l=t.defaultProps,l)i[n]===void 0&&(i[n]=l[n]);return{$$typeof:Fs,type:t,key:r,ref:s,props:i,_owner:Gy.current}}function o2(t,e){return{$$typeof:Fs,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Uy(t){return typeof t=="object"&&t!==null&&t.$$typeof===Fs}function n2(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(o){return e[o]})}var jf=/\/+/g;function xc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?n2(""+t.key):e.toString(36)}function Tl(t,e,o,n,i){var r=typeof t;(r==="undefined"||r==="boolean")&&(t=null);var s=!1;if(t===null)s=!0;else switch(r){case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case Fs:case Wv:s=!0}}if(s)return s=t,i=i(s),t=n===""?"."+xc(s,0):n,Tf(i)?(o="",t!=null&&(o=t.replace(jf,"$&/")+"/"),Tl(i,e,o,"",function(c){return c})):i!=null&&(Uy(i)&&(i=o2(i,o+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(jf,"$&/")+"/")+t)),e.push(i)),1;if(s=0,n=n===""?".":n+":",Tf(t))for(var l=0;l<t.length;l++){r=t[l];var a=n+xc(r,l);s+=Tl(r,e,o,a,i)}else if(a=t2(t),typeof a=="function")for(t=a.call(t),l=0;!(r=t.next()).done;)r=r.value,a=n+xc(r,l++),s+=Tl(r,e,o,a,i);else if(r==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return s}function Hs(t,e,o){if(t==null)return t;var n=[],i=0;return Tl(t,n,"","",function(r){return e.call(o,r,i++)}),n}function i2(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(o){(t._status===0||t._status===-1)&&(t._status=1,t._result=o)},function(o){(t._status===0||t._status===-1)&&(t._status=2,t._result=o)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var nt={current:null},jl={transition:null},r2={ReactCurrentDispatcher:nt,ReactCurrentBatchConfig:jl,ReactCurrentOwner:Gy};function Y0(){throw Error("act(...) is not supported in production builds of React.")}ne.Children={map:Hs,forEach:function(t,e,o){Hs(t,function(){e.apply(this,arguments)},o)},count:function(t){var e=0;return Hs(t,function(){e++}),e},toArray:function(t){return Hs(t,function(e){return e})||[]},only:function(t){if(!Uy(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ne.Component=ar;ne.Fragment=Hv;ne.Profiler=Vv;ne.PureComponent=Dy;ne.StrictMode=Xv;ne.Suspense=Kv;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=r2;ne.act=Y0;ne.cloneElement=function(t,e,o){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var n=$0({},t.props),i=t.key,r=t.ref,s=t._owner;if(e!=null){if(e.ref!==void 0&&(r=e.ref,s=Gy.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(a in e)X0.call(e,a)&&!V0.hasOwnProperty(a)&&(n[a]=e[a]===void 0&&l!==void 0?l[a]:e[a])}var a=arguments.length-2;if(a===1)n.children=o;else if(1<a){l=Array(a);for(var c=0;c<a;c++)l[c]=arguments[c+2];n.children=l}return{$$typeof:Fs,type:t.type,key:i,ref:r,props:n,_owner:s}};ne.createContext=function(t){return t={$$typeof:Yv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:qv,_context:t},t.Consumer=t};ne.createElement=q0;ne.createFactory=function(t){var e=q0.bind(null,t);return e.type=t,e};ne.createRef=function(){return{current:null}};ne.forwardRef=function(t){return{$$typeof:Qv,render:t}};ne.isValidElement=Uy;ne.lazy=function(t){return{$$typeof:e2,_payload:{_status:-1,_result:t},_init:i2}};ne.memo=function(t,e){return{$$typeof:Jv,type:t,compare:e===void 0?null:e}};ne.startTransition=function(t){var e=jl.transition;jl.transition={};try{t()}finally{jl.transition=e}};ne.unstable_act=Y0;ne.useCallback=function(t,e){return nt.current.useCallback(t,e)};ne.useContext=function(t){return nt.current.useContext(t)};ne.useDebugValue=function(){};ne.useDeferredValue=function(t){return nt.current.useDeferredValue(t)};ne.useEffect=function(t,e){return nt.current.useEffect(t,e)};ne.useId=function(){return nt.current.useId()};ne.useImperativeHandle=function(t,e,o){return nt.current.useImperativeHandle(t,e,o)};ne.useInsertionEffect=function(t,e){return nt.current.useInsertionEffect(t,e)};ne.useLayoutEffect=function(t,e){return nt.current.useLayoutEffect(t,e)};ne.useMemo=function(t,e){return nt.current.useMemo(t,e)};ne.useReducer=function(t,e,o){return nt.current.useReducer(t,e,o)};ne.useRef=function(t){return nt.current.useRef(t)};ne.useState=function(t){return nt.current.useState(t)};ne.useSyncExternalStore=function(t,e,o){return nt.current.useSyncExternalStore(t,e,o)};ne.useTransition=function(){return nt.current.useTransition()};ne.version="18.3.1";N0.exports=ne;var x=N0.exports;const s2=oi(x),Q0=$v({__proto__:null,default:s2},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l2=x,a2=Symbol.for("react.element"),c2=Symbol.for("react.fragment"),u2=Object.prototype.hasOwnProperty,p2=l2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y2={key:!0,ref:!0,__self:!0,__source:!0};function K0(t,e,o){var n,i={},r=null,s=null;o!==void 0&&(r=""+o),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(s=e.ref);for(n in e)u2.call(e,n)&&!y2.hasOwnProperty(n)&&(i[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps,e)i[n]===void 0&&(i[n]=e[n]);return{$$typeof:a2,type:t,key:r,ref:s,props:i,_owner:p2.current}}Ua.Fragment=c2;Ua.jsx=K0;Ua.jsxs=K0;U0.exports=Ua;var P=U0.exports,J0={exports:{}},St={},em={exports:{}},tm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(Z,R){var T=Z.length;Z.push(R);e:for(;0<T;){var Q=T-1>>>1,A=Z[Q];if(0<i(A,R))Z[Q]=R,Z[T]=A,T=Q;else break e}}function o(Z){return Z.length===0?null:Z[0]}function n(Z){if(Z.length===0)return null;var R=Z[0],T=Z.pop();if(T!==R){Z[0]=T;e:for(var Q=0,A=Z.length,L=A>>>1;Q<L;){var X=2*(Q+1)-1,G=Z[X],K=X+1,re=Z[K];if(0>i(G,T))K<A&&0>i(re,G)?(Z[Q]=re,Z[K]=T,Q=K):(Z[Q]=G,Z[X]=T,Q=X);else if(K<A&&0>i(re,T))Z[Q]=re,Z[K]=T,Q=K;else break e}}return R}function i(Z,R){var T=Z.sortIndex-R.sortIndex;return T!==0?T:Z.id-R.id}if(typeof performance=="object"&&typeof performance.now=="function"){var r=performance;t.unstable_now=function(){return r.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var a=[],c=[],u=1,p=null,y=3,d=!1,g=!1,f=!1,b=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k(Z){for(var R=o(c);R!==null;){if(R.callback===null)n(c);else if(R.startTime<=Z)n(c),R.sortIndex=R.expirationTime,e(a,R);else break;R=o(c)}}function w(Z){if(f=!1,k(Z),!g)if(o(a)!==null)g=!0,H(v);else{var R=o(c);R!==null&&F(w,R.startTime-Z)}}function v(Z,R){g=!1,f&&(f=!1,h(S),S=-1),d=!0;var T=y;try{for(k(R),p=o(a);p!==null&&(!(p.expirationTime>R)||Z&&!D());){var Q=p.callback;if(typeof Q=="function"){p.callback=null,y=p.priorityLevel;var A=Q(p.expirationTime<=R);R=t.unstable_now(),typeof A=="function"?p.callback=A:p===o(a)&&n(a),k(R)}else n(a);p=o(a)}if(p!==null)var L=!0;else{var X=o(c);X!==null&&F(w,X.startTime-R),L=!1}return L}finally{p=null,y=T,d=!1}}var E=!1,z=null,S=-1,C=5,_=-1;function D(){return!(t.unstable_now()-_<C)}function B(){if(z!==null){var Z=t.unstable_now();_=Z;var R=!0;try{R=z(!0,Z)}finally{R?M():(E=!1,z=null)}}else E=!1}var M;if(typeof m=="function")M=function(){m(B)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,W=j.port2;j.port1.onmessage=B,M=function(){W.postMessage(null)}}else M=function(){b(B,0)};function H(Z){z=Z,E||(E=!0,M())}function F(Z,R){S=b(function(){Z(t.unstable_now())},R)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(Z){Z.callback=null},t.unstable_continueExecution=function(){g||d||(g=!0,H(v))},t.unstable_forceFrameRate=function(Z){0>Z||125<Z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<Z?Math.floor(1e3/Z):5},t.unstable_getCurrentPriorityLevel=function(){return y},t.unstable_getFirstCallbackNode=function(){return o(a)},t.unstable_next=function(Z){switch(y){case 1:case 2:case 3:var R=3;break;default:R=y}var T=y;y=R;try{return Z()}finally{y=T}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(Z,R){switch(Z){case 1:case 2:case 3:case 4:case 5:break;default:Z=3}var T=y;y=Z;try{return R()}finally{y=T}},t.unstable_scheduleCallback=function(Z,R,T){var Q=t.unstable_now();switch(typeof T=="object"&&T!==null?(T=T.delay,T=typeof T=="number"&&0<T?Q+T:Q):T=Q,Z){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=T+A,Z={id:u++,callback:R,priorityLevel:Z,startTime:T,expirationTime:A,sortIndex:-1},T>Q?(Z.sortIndex=T,e(c,Z),o(a)===null&&Z===o(c)&&(f?(h(S),S=-1):f=!0,F(w,T-Q))):(Z.sortIndex=A,e(a,Z),g||d||(g=!0,H(v))),Z},t.unstable_shouldYield=D,t.unstable_wrapCallback=function(Z){var R=y;return function(){var T=y;y=R;try{return Z.apply(this,arguments)}finally{y=T}}}})(tm);em.exports=tm;var d2=em.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f2=x,zt=d2;function I(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)e+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var om=new Set,rs={};function ni(t,e){qi(t,e),qi(t+"Capture",e)}function qi(t,e){for(rs[t]=e,t=0;t<e.length;t++)om.add(e[t])}var Co=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qu=Object.prototype.hasOwnProperty,h2=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,If={},Ff={};function g2(t){return qu.call(Ff,t)?!0:qu.call(If,t)?!1:h2.test(t)?Ff[t]=!0:(If[t]=!0,!1)}function m2(t,e,o,n){if(o!==null&&o.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return n?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function b2(t,e,o,n){if(e===null||typeof e>"u"||m2(t,e,o,n))return!0;if(n)return!1;if(o!==null)switch(o.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function it(t,e,o,n,i,r,s){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=n,this.attributeNamespace=i,this.mustUseProperty=o,this.propertyName=t,this.type=e,this.sanitizeURL=r,this.removeEmptyString=s}var Le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Le[t]=new it(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Le[e]=new it(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Le[t]=new it(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Le[t]=new it(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Le[t]=new it(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Le[t]=new it(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Le[t]=new it(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Le[t]=new it(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Le[t]=new it(t,5,!1,t.toLowerCase(),null,!1,!1)});var Ny=/[\-:]([a-z])/g;function Ly(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Ny,Ly);Le[e]=new it(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Ny,Ly);Le[e]=new it(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Ny,Ly);Le[e]=new it(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Le[t]=new it(t,1,!1,t.toLowerCase(),null,!1,!1)});Le.xlinkHref=new it("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Le[t]=new it(t,1,!1,t.toLowerCase(),null,!0,!0)});function $y(t,e,o,n){var i=Le.hasOwnProperty(e)?Le[e]:null;(i!==null?i.type!==0:n||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(b2(e,o,i,n)&&(o=null),n||i===null?g2(e)&&(o===null?t.removeAttribute(e):t.setAttribute(e,""+o)):i.mustUseProperty?t[i.propertyName]=o===null?i.type===3?!1:"":o:(e=i.attributeName,n=i.attributeNamespace,o===null?t.removeAttribute(e):(i=i.type,o=i===3||i===4&&o===!0?"":""+o,n?t.setAttributeNS(n,e,o):t.setAttribute(e,o))))}var jo=f2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xs=Symbol.for("react.element"),Si=Symbol.for("react.portal"),Ei=Symbol.for("react.fragment"),Wy=Symbol.for("react.strict_mode"),Yu=Symbol.for("react.profiler"),nm=Symbol.for("react.provider"),im=Symbol.for("react.context"),Hy=Symbol.for("react.forward_ref"),Qu=Symbol.for("react.suspense"),Ku=Symbol.for("react.suspense_list"),Xy=Symbol.for("react.memo"),Uo=Symbol.for("react.lazy"),rm=Symbol.for("react.offscreen"),Mf=Symbol.iterator;function xr(t){return t===null||typeof t!="object"?null:(t=Mf&&t[Mf]||t["@@iterator"],typeof t=="function"?t:null)}var Ee=Object.assign,kc;function Or(t){if(kc===void 0)try{throw Error()}catch(o){var e=o.stack.trim().match(/\n( *(at )?)/);kc=e&&e[1]||""}return`
`+kc+t}var wc=!1;function vc(t,e){if(!t||wc)return"";wc=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var n=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){n=c}t.call(e.prototype)}else{try{throw Error()}catch(c){n=c}t()}}catch(c){if(c&&n&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),r=n.stack.split(`
`),s=i.length-1,l=r.length-1;1<=s&&0<=l&&i[s]!==r[l];)l--;for(;1<=s&&0<=l;s--,l--)if(i[s]!==r[l]){if(s!==1||l!==1)do if(s--,l--,0>l||i[s]!==r[l]){var a=`
`+i[s].replace(" at new "," at ");return t.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",t.displayName)),a}while(1<=s&&0<=l);break}}}finally{wc=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?Or(t):""}function x2(t){switch(t.tag){case 5:return Or(t.type);case 16:return Or("Lazy");case 13:return Or("Suspense");case 19:return Or("SuspenseList");case 0:case 2:case 15:return t=vc(t.type,!1),t;case 11:return t=vc(t.type.render,!1),t;case 1:return t=vc(t.type,!0),t;default:return""}}function Ju(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ei:return"Fragment";case Si:return"Portal";case Yu:return"Profiler";case Wy:return"StrictMode";case Qu:return"Suspense";case Ku:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case im:return(t.displayName||"Context")+".Consumer";case nm:return(t._context.displayName||"Context")+".Provider";case Hy:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Xy:return e=t.displayName||null,e!==null?e:Ju(t.type)||"Memo";case Uo:e=t._payload,t=t._init;try{return Ju(t(e))}catch{}}return null}function k2(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ju(e);case 8:return e===Wy?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function rn(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function sm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function w2(t){var e=sm(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),n=""+t[e];if(!t.hasOwnProperty(e)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var i=o.get,r=o.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(s){n=""+s,r.call(this,s)}}),Object.defineProperty(t,e,{enumerable:o.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Vs(t){t._valueTracker||(t._valueTracker=w2(t))}function lm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var o=e.getValue(),n="";return t&&(n=sm(t)?t.checked?"true":"false":t.value),t=n,t!==o?(e.setValue(t),!0):!1}function oa(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ep(t,e){var o=e.checked;return Ee({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function Of(t,e){var o=e.defaultValue==null?"":e.defaultValue,n=e.checked!=null?e.checked:e.defaultChecked;o=rn(e.value!=null?e.value:o),t._wrapperState={initialChecked:n,initialValue:o,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function am(t,e){e=e.checked,e!=null&&$y(t,"checked",e,!1)}function tp(t,e){am(t,e);var o=rn(e.value),n=e.type;if(o!=null)n==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(n==="submit"||n==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?op(t,e.type,o):e.hasOwnProperty("defaultValue")&&op(t,e.type,rn(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Df(t,e,o){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var n=e.type;if(!(n!=="submit"&&n!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,o||e===t.value||(t.value=e),t.defaultValue=e}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function op(t,e,o){(e!=="number"||oa(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var Dr=Array.isArray;function Oi(t,e,o,n){if(t=t.options,e){e={};for(var i=0;i<o.length;i++)e["$"+o[i]]=!0;for(o=0;o<t.length;o++)i=e.hasOwnProperty("$"+t[o].value),t[o].selected!==i&&(t[o].selected=i),i&&n&&(t[o].defaultSelected=!0)}else{for(o=""+rn(o),e=null,i=0;i<t.length;i++){if(t[i].value===o){t[i].selected=!0,n&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function np(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(I(91));return Ee({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Bf(t,e){var o=e.value;if(o==null){if(o=e.children,e=e.defaultValue,o!=null){if(e!=null)throw Error(I(92));if(Dr(o)){if(1<o.length)throw Error(I(93));o=o[0]}e=o}e==null&&(e=""),o=e}t._wrapperState={initialValue:rn(o)}}function cm(t,e){var o=rn(e.value),n=rn(e.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),e.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),n!=null&&(t.defaultValue=""+n)}function Gf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function um(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ip(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?um(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var qs,pm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,o,n,i){MSApp.execUnsafeLocalFunction(function(){return t(e,o,n,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(qs=qs||document.createElement("div"),qs.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=qs.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ss(t,e){if(e){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=e;return}}t.textContent=e}var Wr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},v2=["Webkit","ms","Moz","O"];Object.keys(Wr).forEach(function(t){v2.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Wr[e]=Wr[t]})});function ym(t,e,o){return e==null||typeof e=="boolean"||e===""?"":o||typeof e!="number"||e===0||Wr.hasOwnProperty(t)&&Wr[t]?(""+e).trim():e+"px"}function dm(t,e){t=t.style;for(var o in e)if(e.hasOwnProperty(o)){var n=o.indexOf("--")===0,i=ym(o,e[o],n);o==="float"&&(o="cssFloat"),n?t.setProperty(o,i):t[o]=i}}var z2=Ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function rp(t,e){if(e){if(z2[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(I(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(I(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(I(61))}if(e.style!=null&&typeof e.style!="object")throw Error(I(62))}}function sp(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lp=null;function Vy(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ap=null,Di=null,Bi=null;function Uf(t){if(t=Ds(t)){if(typeof ap!="function")throw Error(I(280));var e=t.stateNode;e&&(e=Ha(e),ap(t.stateNode,t.type,e))}}function fm(t){Di?Bi?Bi.push(t):Bi=[t]:Di=t}function hm(){if(Di){var t=Di,e=Bi;if(Bi=Di=null,Uf(t),e)for(t=0;t<e.length;t++)Uf(e[t])}}function gm(t,e){return t(e)}function mm(){}var zc=!1;function bm(t,e,o){if(zc)return t(e,o);zc=!0;try{return gm(t,e,o)}finally{zc=!1,(Di!==null||Bi!==null)&&(mm(),hm())}}function ls(t,e){var o=t.stateNode;if(o===null)return null;var n=Ha(o);if(n===null)return null;o=n[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(t=t.type,n=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!n;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(I(231,e,typeof o));return o}var cp=!1;if(Co)try{var kr={};Object.defineProperty(kr,"passive",{get:function(){cp=!0}}),window.addEventListener("test",kr,kr),window.removeEventListener("test",kr,kr)}catch{cp=!1}function S2(t,e,o,n,i,r,s,l,a){var c=Array.prototype.slice.call(arguments,3);try{e.apply(o,c)}catch(u){this.onError(u)}}var Hr=!1,na=null,ia=!1,up=null,E2={onError:function(t){Hr=!0,na=t}};function _2(t,e,o,n,i,r,s,l,a){Hr=!1,na=null,S2.apply(E2,arguments)}function C2(t,e,o,n,i,r,s,l,a){if(_2.apply(this,arguments),Hr){if(Hr){var c=na;Hr=!1,na=null}else throw Error(I(198));ia||(ia=!0,up=c)}}function ii(t){var e=t,o=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(o=e.return),t=e.return;while(t)}return e.tag===3?o:null}function xm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Nf(t){if(ii(t)!==t)throw Error(I(188))}function Z2(t){var e=t.alternate;if(!e){if(e=ii(t),e===null)throw Error(I(188));return e!==t?null:t}for(var o=t,n=e;;){var i=o.return;if(i===null)break;var r=i.alternate;if(r===null){if(n=i.return,n!==null){o=n;continue}break}if(i.child===r.child){for(r=i.child;r;){if(r===o)return Nf(i),t;if(r===n)return Nf(i),e;r=r.sibling}throw Error(I(188))}if(o.return!==n.return)o=i,n=r;else{for(var s=!1,l=i.child;l;){if(l===o){s=!0,o=i,n=r;break}if(l===n){s=!0,n=i,o=r;break}l=l.sibling}if(!s){for(l=r.child;l;){if(l===o){s=!0,o=r,n=i;break}if(l===n){s=!0,n=r,o=i;break}l=l.sibling}if(!s)throw Error(I(189))}}if(o.alternate!==n)throw Error(I(190))}if(o.tag!==3)throw Error(I(188));return o.stateNode.current===o?t:e}function km(t){return t=Z2(t),t!==null?wm(t):null}function wm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=wm(t);if(e!==null)return e;t=t.sibling}return null}var vm=zt.unstable_scheduleCallback,Lf=zt.unstable_cancelCallback,A2=zt.unstable_shouldYield,R2=zt.unstable_requestPaint,Ce=zt.unstable_now,P2=zt.unstable_getCurrentPriorityLevel,qy=zt.unstable_ImmediatePriority,zm=zt.unstable_UserBlockingPriority,ra=zt.unstable_NormalPriority,T2=zt.unstable_LowPriority,Sm=zt.unstable_IdlePriority,Na=null,lo=null;function j2(t){if(lo&&typeof lo.onCommitFiberRoot=="function")try{lo.onCommitFiberRoot(Na,t,void 0,(t.current.flags&128)===128)}catch{}}var Wt=Math.clz32?Math.clz32:M2,I2=Math.log,F2=Math.LN2;function M2(t){return t>>>=0,t===0?32:31-(I2(t)/F2|0)|0}var Ys=64,Qs=4194304;function Br(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function sa(t,e){var o=t.pendingLanes;if(o===0)return 0;var n=0,i=t.suspendedLanes,r=t.pingedLanes,s=o&268435455;if(s!==0){var l=s&~i;l!==0?n=Br(l):(r&=s,r!==0&&(n=Br(r)))}else s=o&~i,s!==0?n=Br(s):r!==0&&(n=Br(r));if(n===0)return 0;if(e!==0&&e!==n&&!(e&i)&&(i=n&-n,r=e&-e,i>=r||i===16&&(r&4194240)!==0))return e;if(n&4&&(n|=o&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=n;0<e;)o=31-Wt(e),i=1<<o,n|=t[o],e&=~i;return n}function O2(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function D2(t,e){for(var o=t.suspendedLanes,n=t.pingedLanes,i=t.expirationTimes,r=t.pendingLanes;0<r;){var s=31-Wt(r),l=1<<s,a=i[s];a===-1?(!(l&o)||l&n)&&(i[s]=O2(l,e)):a<=e&&(t.expiredLanes|=l),r&=~l}}function pp(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Em(){var t=Ys;return Ys<<=1,!(Ys&4194240)&&(Ys=64),t}function Sc(t){for(var e=[],o=0;31>o;o++)e.push(t);return e}function Ms(t,e,o){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Wt(e),t[e]=o}function B2(t,e){var o=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var n=t.eventTimes;for(t=t.expirationTimes;0<o;){var i=31-Wt(o),r=1<<i;e[i]=0,n[i]=-1,t[i]=-1,o&=~r}}function Yy(t,e){var o=t.entangledLanes|=e;for(t=t.entanglements;o;){var n=31-Wt(o),i=1<<n;i&e|t[n]&e&&(t[n]|=e),o&=~i}}var pe=0;function _m(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Cm,Qy,Zm,Am,Rm,yp=!1,Ks=[],Yo=null,Qo=null,Ko=null,as=new Map,cs=new Map,Lo=[],G2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function $f(t,e){switch(t){case"focusin":case"focusout":Yo=null;break;case"dragenter":case"dragleave":Qo=null;break;case"mouseover":case"mouseout":Ko=null;break;case"pointerover":case"pointerout":as.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":cs.delete(e.pointerId)}}function wr(t,e,o,n,i,r){return t===null||t.nativeEvent!==r?(t={blockedOn:e,domEventName:o,eventSystemFlags:n,nativeEvent:r,targetContainers:[i]},e!==null&&(e=Ds(e),e!==null&&Qy(e)),t):(t.eventSystemFlags|=n,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function U2(t,e,o,n,i){switch(e){case"focusin":return Yo=wr(Yo,t,e,o,n,i),!0;case"dragenter":return Qo=wr(Qo,t,e,o,n,i),!0;case"mouseover":return Ko=wr(Ko,t,e,o,n,i),!0;case"pointerover":var r=i.pointerId;return as.set(r,wr(as.get(r)||null,t,e,o,n,i)),!0;case"gotpointercapture":return r=i.pointerId,cs.set(r,wr(cs.get(r)||null,t,e,o,n,i)),!0}return!1}function Pm(t){var e=In(t.target);if(e!==null){var o=ii(e);if(o!==null){if(e=o.tag,e===13){if(e=xm(o),e!==null){t.blockedOn=e,Rm(t.priority,function(){Zm(o)});return}}else if(e===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Il(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var o=dp(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var n=new o.constructor(o.type,o);lp=n,o.target.dispatchEvent(n),lp=null}else return e=Ds(o),e!==null&&Qy(e),t.blockedOn=o,!1;e.shift()}return!0}function Wf(t,e,o){Il(t)&&o.delete(e)}function N2(){yp=!1,Yo!==null&&Il(Yo)&&(Yo=null),Qo!==null&&Il(Qo)&&(Qo=null),Ko!==null&&Il(Ko)&&(Ko=null),as.forEach(Wf),cs.forEach(Wf)}function vr(t,e){t.blockedOn===e&&(t.blockedOn=null,yp||(yp=!0,zt.unstable_scheduleCallback(zt.unstable_NormalPriority,N2)))}function us(t){function e(i){return vr(i,t)}if(0<Ks.length){vr(Ks[0],t);for(var o=1;o<Ks.length;o++){var n=Ks[o];n.blockedOn===t&&(n.blockedOn=null)}}for(Yo!==null&&vr(Yo,t),Qo!==null&&vr(Qo,t),Ko!==null&&vr(Ko,t),as.forEach(e),cs.forEach(e),o=0;o<Lo.length;o++)n=Lo[o],n.blockedOn===t&&(n.blockedOn=null);for(;0<Lo.length&&(o=Lo[0],o.blockedOn===null);)Pm(o),o.blockedOn===null&&Lo.shift()}var Gi=jo.ReactCurrentBatchConfig,la=!0;function L2(t,e,o,n){var i=pe,r=Gi.transition;Gi.transition=null;try{pe=1,Ky(t,e,o,n)}finally{pe=i,Gi.transition=r}}function $2(t,e,o,n){var i=pe,r=Gi.transition;Gi.transition=null;try{pe=4,Ky(t,e,o,n)}finally{pe=i,Gi.transition=r}}function Ky(t,e,o,n){if(la){var i=dp(t,e,o,n);if(i===null)Ic(t,e,n,aa,o),$f(t,n);else if(U2(i,t,e,o,n))n.stopPropagation();else if($f(t,n),e&4&&-1<G2.indexOf(t)){for(;i!==null;){var r=Ds(i);if(r!==null&&Cm(r),r=dp(t,e,o,n),r===null&&Ic(t,e,n,aa,o),r===i)break;i=r}i!==null&&n.stopPropagation()}else Ic(t,e,n,null,o)}}var aa=null;function dp(t,e,o,n){if(aa=null,t=Vy(n),t=In(t),t!==null)if(e=ii(t),e===null)t=null;else if(o=e.tag,o===13){if(t=xm(e),t!==null)return t;t=null}else if(o===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return aa=t,null}function Tm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(P2()){case qy:return 1;case zm:return 4;case ra:case T2:return 16;case Sm:return 536870912;default:return 16}default:return 16}}var Wo=null,Jy=null,Fl=null;function jm(){if(Fl)return Fl;var t,e=Jy,o=e.length,n,i="value"in Wo?Wo.value:Wo.textContent,r=i.length;for(t=0;t<o&&e[t]===i[t];t++);var s=o-t;for(n=1;n<=s&&e[o-n]===i[r-n];n++);return Fl=i.slice(t,1<n?1-n:void 0)}function Ml(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Js(){return!0}function Hf(){return!1}function Et(t){function e(o,n,i,r,s){this._reactName=o,this._targetInst=i,this.type=n,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(o=t[l],this[l]=o?o(r):r[l]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?Js:Hf,this.isPropagationStopped=Hf,this}return Ee(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Js)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Js)},persist:function(){},isPersistent:Js}),e}var cr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ed=Et(cr),Os=Ee({},cr,{view:0,detail:0}),W2=Et(Os),Ec,_c,zr,La=Ee({},Os,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:td,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==zr&&(zr&&t.type==="mousemove"?(Ec=t.screenX-zr.screenX,_c=t.screenY-zr.screenY):_c=Ec=0,zr=t),Ec)},movementY:function(t){return"movementY"in t?t.movementY:_c}}),Xf=Et(La),H2=Ee({},La,{dataTransfer:0}),X2=Et(H2),V2=Ee({},Os,{relatedTarget:0}),Cc=Et(V2),q2=Ee({},cr,{animationName:0,elapsedTime:0,pseudoElement:0}),Y2=Et(q2),Q2=Ee({},cr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),K2=Et(Q2),J2=Ee({},cr,{data:0}),Vf=Et(J2),e3={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},t3={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},o3={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function n3(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=o3[t])?!!e[t]:!1}function td(){return n3}var i3=Ee({},Os,{key:function(t){if(t.key){var e=e3[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ml(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?t3[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:td,charCode:function(t){return t.type==="keypress"?Ml(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ml(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),r3=Et(i3),s3=Ee({},La,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qf=Et(s3),l3=Ee({},Os,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:td}),a3=Et(l3),c3=Ee({},cr,{propertyName:0,elapsedTime:0,pseudoElement:0}),u3=Et(c3),p3=Ee({},La,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),y3=Et(p3),d3=[9,13,27,32],od=Co&&"CompositionEvent"in window,Xr=null;Co&&"documentMode"in document&&(Xr=document.documentMode);var f3=Co&&"TextEvent"in window&&!Xr,Im=Co&&(!od||Xr&&8<Xr&&11>=Xr),Yf=" ",Qf=!1;function Fm(t,e){switch(t){case"keyup":return d3.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Mm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var _i=!1;function h3(t,e){switch(t){case"compositionend":return Mm(e);case"keypress":return e.which!==32?null:(Qf=!0,Yf);case"textInput":return t=e.data,t===Yf&&Qf?null:t;default:return null}}function g3(t,e){if(_i)return t==="compositionend"||!od&&Fm(t,e)?(t=jm(),Fl=Jy=Wo=null,_i=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Im&&e.locale!=="ko"?null:e.data;default:return null}}var m3={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Kf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!m3[t.type]:e==="textarea"}function Om(t,e,o,n){fm(n),e=ca(e,"onChange"),0<e.length&&(o=new ed("onChange","change",null,o,n),t.push({event:o,listeners:e}))}var Vr=null,ps=null;function b3(t){Vm(t,0)}function $a(t){var e=Ai(t);if(lm(e))return t}function x3(t,e){if(t==="change")return e}var Dm=!1;if(Co){var Zc;if(Co){var Ac="oninput"in document;if(!Ac){var Jf=document.createElement("div");Jf.setAttribute("oninput","return;"),Ac=typeof Jf.oninput=="function"}Zc=Ac}else Zc=!1;Dm=Zc&&(!document.documentMode||9<document.documentMode)}function eh(){Vr&&(Vr.detachEvent("onpropertychange",Bm),ps=Vr=null)}function Bm(t){if(t.propertyName==="value"&&$a(ps)){var e=[];Om(e,ps,t,Vy(t)),bm(b3,e)}}function k3(t,e,o){t==="focusin"?(eh(),Vr=e,ps=o,Vr.attachEvent("onpropertychange",Bm)):t==="focusout"&&eh()}function w3(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return $a(ps)}function v3(t,e){if(t==="click")return $a(e)}function z3(t,e){if(t==="input"||t==="change")return $a(e)}function S3(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xt=typeof Object.is=="function"?Object.is:S3;function ys(t,e){if(Xt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var o=Object.keys(t),n=Object.keys(e);if(o.length!==n.length)return!1;for(n=0;n<o.length;n++){var i=o[n];if(!qu.call(e,i)||!Xt(t[i],e[i]))return!1}return!0}function th(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function oh(t,e){var o=th(t);t=0;for(var n;o;){if(o.nodeType===3){if(n=t+o.textContent.length,t<=e&&n>=e)return{node:o,offset:e-t};t=n}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=th(o)}}function Gm(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Gm(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Um(){for(var t=window,e=oa();e instanceof t.HTMLIFrameElement;){try{var o=typeof e.contentWindow.location.href=="string"}catch{o=!1}if(o)t=e.contentWindow;else break;e=oa(t.document)}return e}function nd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function E3(t){var e=Um(),o=t.focusedElem,n=t.selectionRange;if(e!==o&&o&&o.ownerDocument&&Gm(o.ownerDocument.documentElement,o)){if(n!==null&&nd(o)){if(e=n.start,t=n.end,t===void 0&&(t=e),"selectionStart"in o)o.selectionStart=e,o.selectionEnd=Math.min(t,o.value.length);else if(t=(e=o.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=o.textContent.length,r=Math.min(n.start,i);n=n.end===void 0?r:Math.min(n.end,i),!t.extend&&r>n&&(i=n,n=r,r=i),i=oh(o,r);var s=oh(o,n);i&&s&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==s.node||t.focusOffset!==s.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),r>n?(t.addRange(e),t.extend(s.node,s.offset)):(e.setEnd(s.node,s.offset),t.addRange(e)))}}for(e=[],t=o;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<e.length;o++)t=e[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var _3=Co&&"documentMode"in document&&11>=document.documentMode,Ci=null,fp=null,qr=null,hp=!1;function nh(t,e,o){var n=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;hp||Ci==null||Ci!==oa(n)||(n=Ci,"selectionStart"in n&&nd(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),qr&&ys(qr,n)||(qr=n,n=ca(fp,"onSelect"),0<n.length&&(e=new ed("onSelect","select",null,e,o),t.push({event:e,listeners:n}),e.target=Ci)))}function el(t,e){var o={};return o[t.toLowerCase()]=e.toLowerCase(),o["Webkit"+t]="webkit"+e,o["Moz"+t]="moz"+e,o}var Zi={animationend:el("Animation","AnimationEnd"),animationiteration:el("Animation","AnimationIteration"),animationstart:el("Animation","AnimationStart"),transitionend:el("Transition","TransitionEnd")},Rc={},Nm={};Co&&(Nm=document.createElement("div").style,"AnimationEvent"in window||(delete Zi.animationend.animation,delete Zi.animationiteration.animation,delete Zi.animationstart.animation),"TransitionEvent"in window||delete Zi.transitionend.transition);function Wa(t){if(Rc[t])return Rc[t];if(!Zi[t])return t;var e=Zi[t],o;for(o in e)if(e.hasOwnProperty(o)&&o in Nm)return Rc[t]=e[o];return t}var Lm=Wa("animationend"),$m=Wa("animationiteration"),Wm=Wa("animationstart"),Hm=Wa("transitionend"),Xm=new Map,ih="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(t,e){Xm.set(t,e),ni(e,[t])}for(var Pc=0;Pc<ih.length;Pc++){var Tc=ih[Pc],C3=Tc.toLowerCase(),Z3=Tc[0].toUpperCase()+Tc.slice(1);yn(C3,"on"+Z3)}yn(Lm,"onAnimationEnd");yn($m,"onAnimationIteration");yn(Wm,"onAnimationStart");yn("dblclick","onDoubleClick");yn("focusin","onFocus");yn("focusout","onBlur");yn(Hm,"onTransitionEnd");qi("onMouseEnter",["mouseout","mouseover"]);qi("onMouseLeave",["mouseout","mouseover"]);qi("onPointerEnter",["pointerout","pointerover"]);qi("onPointerLeave",["pointerout","pointerover"]);ni("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ni("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ni("onBeforeInput",["compositionend","keypress","textInput","paste"]);ni("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ni("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ni("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),A3=new Set("cancel close invalid load scroll toggle".split(" ").concat(Gr));function rh(t,e,o){var n=t.type||"unknown-event";t.currentTarget=o,C2(n,e,void 0,t),t.currentTarget=null}function Vm(t,e){e=(e&4)!==0;for(var o=0;o<t.length;o++){var n=t[o],i=n.event;n=n.listeners;e:{var r=void 0;if(e)for(var s=n.length-1;0<=s;s--){var l=n[s],a=l.instance,c=l.currentTarget;if(l=l.listener,a!==r&&i.isPropagationStopped())break e;rh(i,l,c),r=a}else for(s=0;s<n.length;s++){if(l=n[s],a=l.instance,c=l.currentTarget,l=l.listener,a!==r&&i.isPropagationStopped())break e;rh(i,l,c),r=a}}}if(ia)throw t=up,ia=!1,up=null,t}function he(t,e){var o=e[kp];o===void 0&&(o=e[kp]=new Set);var n=t+"__bubble";o.has(n)||(qm(e,t,2,!1),o.add(n))}function jc(t,e,o){var n=0;e&&(n|=4),qm(o,t,n,e)}var tl="_reactListening"+Math.random().toString(36).slice(2);function ds(t){if(!t[tl]){t[tl]=!0,om.forEach(function(o){o!=="selectionchange"&&(A3.has(o)||jc(o,!1,t),jc(o,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[tl]||(e[tl]=!0,jc("selectionchange",!1,e))}}function qm(t,e,o,n){switch(Tm(e)){case 1:var i=L2;break;case 4:i=$2;break;default:i=Ky}o=i.bind(null,e,o,t),i=void 0,!cp||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),n?i!==void 0?t.addEventListener(e,o,{capture:!0,passive:i}):t.addEventListener(e,o,!0):i!==void 0?t.addEventListener(e,o,{passive:i}):t.addEventListener(e,o,!1)}function Ic(t,e,o,n,i){var r=n;if(!(e&1)&&!(e&2)&&n!==null)e:for(;;){if(n===null)return;var s=n.tag;if(s===3||s===4){var l=n.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(s===4)for(s=n.return;s!==null;){var a=s.tag;if((a===3||a===4)&&(a=s.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;s=s.return}for(;l!==null;){if(s=In(l),s===null)return;if(a=s.tag,a===5||a===6){n=r=s;continue e}l=l.parentNode}}n=n.return}bm(function(){var c=r,u=Vy(o),p=[];e:{var y=Xm.get(t);if(y!==void 0){var d=ed,g=t;switch(t){case"keypress":if(Ml(o)===0)break e;case"keydown":case"keyup":d=r3;break;case"focusin":g="focus",d=Cc;break;case"focusout":g="blur",d=Cc;break;case"beforeblur":case"afterblur":d=Cc;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=Xf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=X2;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=a3;break;case Lm:case $m:case Wm:d=Y2;break;case Hm:d=u3;break;case"scroll":d=W2;break;case"wheel":d=y3;break;case"copy":case"cut":case"paste":d=K2;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=qf}var f=(e&4)!==0,b=!f&&t==="scroll",h=f?y!==null?y+"Capture":null:y;f=[];for(var m=c,k;m!==null;){k=m;var w=k.stateNode;if(k.tag===5&&w!==null&&(k=w,h!==null&&(w=ls(m,h),w!=null&&f.push(fs(m,w,k)))),b)break;m=m.return}0<f.length&&(y=new d(y,g,null,o,u),p.push({event:y,listeners:f}))}}if(!(e&7)){e:{if(y=t==="mouseover"||t==="pointerover",d=t==="mouseout"||t==="pointerout",y&&o!==lp&&(g=o.relatedTarget||o.fromElement)&&(In(g)||g[Zo]))break e;if((d||y)&&(y=u.window===u?u:(y=u.ownerDocument)?y.defaultView||y.parentWindow:window,d?(g=o.relatedTarget||o.toElement,d=c,g=g?In(g):null,g!==null&&(b=ii(g),g!==b||g.tag!==5&&g.tag!==6)&&(g=null)):(d=null,g=c),d!==g)){if(f=Xf,w="onMouseLeave",h="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(f=qf,w="onPointerLeave",h="onPointerEnter",m="pointer"),b=d==null?y:Ai(d),k=g==null?y:Ai(g),y=new f(w,m+"leave",d,o,u),y.target=b,y.relatedTarget=k,w=null,In(u)===c&&(f=new f(h,m+"enter",g,o,u),f.target=k,f.relatedTarget=b,w=f),b=w,d&&g)t:{for(f=d,h=g,m=0,k=f;k;k=ci(k))m++;for(k=0,w=h;w;w=ci(w))k++;for(;0<m-k;)f=ci(f),m--;for(;0<k-m;)h=ci(h),k--;for(;m--;){if(f===h||h!==null&&f===h.alternate)break t;f=ci(f),h=ci(h)}f=null}else f=null;d!==null&&sh(p,y,d,f,!1),g!==null&&b!==null&&sh(p,b,g,f,!0)}}e:{if(y=c?Ai(c):window,d=y.nodeName&&y.nodeName.toLowerCase(),d==="select"||d==="input"&&y.type==="file")var v=x3;else if(Kf(y))if(Dm)v=z3;else{v=w3;var E=k3}else(d=y.nodeName)&&d.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(v=v3);if(v&&(v=v(t,c))){Om(p,v,o,u);break e}E&&E(t,y,c),t==="focusout"&&(E=y._wrapperState)&&E.controlled&&y.type==="number"&&op(y,"number",y.value)}switch(E=c?Ai(c):window,t){case"focusin":(Kf(E)||E.contentEditable==="true")&&(Ci=E,fp=c,qr=null);break;case"focusout":qr=fp=Ci=null;break;case"mousedown":hp=!0;break;case"contextmenu":case"mouseup":case"dragend":hp=!1,nh(p,o,u);break;case"selectionchange":if(_3)break;case"keydown":case"keyup":nh(p,o,u)}var z;if(od)e:{switch(t){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else _i?Fm(t,o)&&(S="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(S="onCompositionStart");S&&(Im&&o.locale!=="ko"&&(_i||S!=="onCompositionStart"?S==="onCompositionEnd"&&_i&&(z=jm()):(Wo=u,Jy="value"in Wo?Wo.value:Wo.textContent,_i=!0)),E=ca(c,S),0<E.length&&(S=new Vf(S,t,null,o,u),p.push({event:S,listeners:E}),z?S.data=z:(z=Mm(o),z!==null&&(S.data=z)))),(z=f3?h3(t,o):g3(t,o))&&(c=ca(c,"onBeforeInput"),0<c.length&&(u=new Vf("onBeforeInput","beforeinput",null,o,u),p.push({event:u,listeners:c}),u.data=z))}Vm(p,e)})}function fs(t,e,o){return{instance:t,listener:e,currentTarget:o}}function ca(t,e){for(var o=e+"Capture",n=[];t!==null;){var i=t,r=i.stateNode;i.tag===5&&r!==null&&(i=r,r=ls(t,o),r!=null&&n.unshift(fs(t,r,i)),r=ls(t,e),r!=null&&n.push(fs(t,r,i))),t=t.return}return n}function ci(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function sh(t,e,o,n,i){for(var r=e._reactName,s=[];o!==null&&o!==n;){var l=o,a=l.alternate,c=l.stateNode;if(a!==null&&a===n)break;l.tag===5&&c!==null&&(l=c,i?(a=ls(o,r),a!=null&&s.unshift(fs(o,a,l))):i||(a=ls(o,r),a!=null&&s.push(fs(o,a,l)))),o=o.return}s.length!==0&&t.push({event:e,listeners:s})}var R3=/\r\n?/g,P3=/\u0000|\uFFFD/g;function lh(t){return(typeof t=="string"?t:""+t).replace(R3,`
`).replace(P3,"")}function ol(t,e,o){if(e=lh(e),lh(t)!==e&&o)throw Error(I(425))}function ua(){}var gp=null,mp=null;function bp(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var xp=typeof setTimeout=="function"?setTimeout:void 0,T3=typeof clearTimeout=="function"?clearTimeout:void 0,ah=typeof Promise=="function"?Promise:void 0,j3=typeof queueMicrotask=="function"?queueMicrotask:typeof ah<"u"?function(t){return ah.resolve(null).then(t).catch(I3)}:xp;function I3(t){setTimeout(function(){throw t})}function Fc(t,e){var o=e,n=0;do{var i=o.nextSibling;if(t.removeChild(o),i&&i.nodeType===8)if(o=i.data,o==="/$"){if(n===0){t.removeChild(i),us(e);return}n--}else o!=="$"&&o!=="$?"&&o!=="$!"||n++;o=i}while(o);us(e)}function Jo(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ch(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(e===0)return t;e--}else o==="/$"&&e++}t=t.previousSibling}return null}var ur=Math.random().toString(36).slice(2),ro="__reactFiber$"+ur,hs="__reactProps$"+ur,Zo="__reactContainer$"+ur,kp="__reactEvents$"+ur,F3="__reactListeners$"+ur,M3="__reactHandles$"+ur;function In(t){var e=t[ro];if(e)return e;for(var o=t.parentNode;o;){if(e=o[Zo]||o[ro]){if(o=e.alternate,e.child!==null||o!==null&&o.child!==null)for(t=ch(t);t!==null;){if(o=t[ro])return o;t=ch(t)}return e}t=o,o=t.parentNode}return null}function Ds(t){return t=t[ro]||t[Zo],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ai(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(I(33))}function Ha(t){return t[hs]||null}var wp=[],Ri=-1;function dn(t){return{current:t}}function ge(t){0>Ri||(t.current=wp[Ri],wp[Ri]=null,Ri--)}function de(t,e){Ri++,wp[Ri]=t.current,t.current=e}var sn={},Ye=dn(sn),ut=dn(!1),Nn=sn;function Yi(t,e){var o=t.type.contextTypes;if(!o)return sn;var n=t.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===e)return n.__reactInternalMemoizedMaskedChildContext;var i={},r;for(r in o)i[r]=e[r];return n&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function pt(t){return t=t.childContextTypes,t!=null}function pa(){ge(ut),ge(Ye)}function uh(t,e,o){if(Ye.current!==sn)throw Error(I(168));de(Ye,e),de(ut,o)}function Ym(t,e,o){var n=t.stateNode;if(e=e.childContextTypes,typeof n.getChildContext!="function")return o;n=n.getChildContext();for(var i in n)if(!(i in e))throw Error(I(108,k2(t)||"Unknown",i));return Ee({},o,n)}function ya(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||sn,Nn=Ye.current,de(Ye,t),de(ut,ut.current),!0}function ph(t,e,o){var n=t.stateNode;if(!n)throw Error(I(169));o?(t=Ym(t,e,Nn),n.__reactInternalMemoizedMergedChildContext=t,ge(ut),ge(Ye),de(Ye,t)):ge(ut),de(ut,o)}var wo=null,Xa=!1,Mc=!1;function Qm(t){wo===null?wo=[t]:wo.push(t)}function O3(t){Xa=!0,Qm(t)}function fn(){if(!Mc&&wo!==null){Mc=!0;var t=0,e=pe;try{var o=wo;for(pe=1;t<o.length;t++){var n=o[t];do n=n(!0);while(n!==null)}wo=null,Xa=!1}catch(i){throw wo!==null&&(wo=wo.slice(t+1)),vm(qy,fn),i}finally{pe=e,Mc=!1}}return null}var Pi=[],Ti=0,da=null,fa=0,Ct=[],Zt=0,Ln=null,vo=1,zo="";function vn(t,e){Pi[Ti++]=fa,Pi[Ti++]=da,da=t,fa=e}function Km(t,e,o){Ct[Zt++]=vo,Ct[Zt++]=zo,Ct[Zt++]=Ln,Ln=t;var n=vo;t=zo;var i=32-Wt(n)-1;n&=~(1<<i),o+=1;var r=32-Wt(e)+i;if(30<r){var s=i-i%5;r=(n&(1<<s)-1).toString(32),n>>=s,i-=s,vo=1<<32-Wt(e)+i|o<<i|n,zo=r+t}else vo=1<<r|o<<i|n,zo=t}function id(t){t.return!==null&&(vn(t,1),Km(t,1,0))}function rd(t){for(;t===da;)da=Pi[--Ti],Pi[Ti]=null,fa=Pi[--Ti],Pi[Ti]=null;for(;t===Ln;)Ln=Ct[--Zt],Ct[Zt]=null,zo=Ct[--Zt],Ct[Zt]=null,vo=Ct[--Zt],Ct[Zt]=null}var kt=null,xt=null,me=!1,Lt=null;function Jm(t,e){var o=Pt(5,null,null,0);o.elementType="DELETED",o.stateNode=e,o.return=t,e=t.deletions,e===null?(t.deletions=[o],t.flags|=16):e.push(o)}function yh(t,e){switch(t.tag){case 5:var o=t.type;return e=e.nodeType!==1||o.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,kt=t,xt=Jo(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,kt=t,xt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(o=Ln!==null?{id:vo,overflow:zo}:null,t.memoizedState={dehydrated:e,treeContext:o,retryLane:1073741824},o=Pt(18,null,null,0),o.stateNode=e,o.return=t,t.child=o,kt=t,xt=null,!0):!1;default:return!1}}function vp(t){return(t.mode&1)!==0&&(t.flags&128)===0}function zp(t){if(me){var e=xt;if(e){var o=e;if(!yh(t,e)){if(vp(t))throw Error(I(418));e=Jo(o.nextSibling);var n=kt;e&&yh(t,e)?Jm(n,o):(t.flags=t.flags&-4097|2,me=!1,kt=t)}}else{if(vp(t))throw Error(I(418));t.flags=t.flags&-4097|2,me=!1,kt=t}}}function dh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;kt=t}function nl(t){if(t!==kt)return!1;if(!me)return dh(t),me=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!bp(t.type,t.memoizedProps)),e&&(e=xt)){if(vp(t))throw eb(),Error(I(418));for(;e;)Jm(t,e),e=Jo(e.nextSibling)}if(dh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(I(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(e===0){xt=Jo(t.nextSibling);break e}e--}else o!=="$"&&o!=="$!"&&o!=="$?"||e++}t=t.nextSibling}xt=null}}else xt=kt?Jo(t.stateNode.nextSibling):null;return!0}function eb(){for(var t=xt;t;)t=Jo(t.nextSibling)}function Qi(){xt=kt=null,me=!1}function sd(t){Lt===null?Lt=[t]:Lt.push(t)}var D3=jo.ReactCurrentBatchConfig;function Sr(t,e,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(I(309));var n=o.stateNode}if(!n)throw Error(I(147,t));var i=n,r=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===r?e.ref:(e=function(s){var l=i.refs;s===null?delete l[r]:l[r]=s},e._stringRef=r,e)}if(typeof t!="string")throw Error(I(284));if(!o._owner)throw Error(I(290,t))}return t}function il(t,e){throw t=Object.prototype.toString.call(e),Error(I(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function fh(t){var e=t._init;return e(t._payload)}function tb(t){function e(h,m){if(t){var k=h.deletions;k===null?(h.deletions=[m],h.flags|=16):k.push(m)}}function o(h,m){if(!t)return null;for(;m!==null;)e(h,m),m=m.sibling;return null}function n(h,m){for(h=new Map;m!==null;)m.key!==null?h.set(m.key,m):h.set(m.index,m),m=m.sibling;return h}function i(h,m){return h=nn(h,m),h.index=0,h.sibling=null,h}function r(h,m,k){return h.index=k,t?(k=h.alternate,k!==null?(k=k.index,k<m?(h.flags|=2,m):k):(h.flags|=2,m)):(h.flags|=1048576,m)}function s(h){return t&&h.alternate===null&&(h.flags|=2),h}function l(h,m,k,w){return m===null||m.tag!==6?(m=Lc(k,h.mode,w),m.return=h,m):(m=i(m,k),m.return=h,m)}function a(h,m,k,w){var v=k.type;return v===Ei?u(h,m,k.props.children,w,k.key):m!==null&&(m.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===Uo&&fh(v)===m.type)?(w=i(m,k.props),w.ref=Sr(h,m,k),w.return=h,w):(w=Ll(k.type,k.key,k.props,null,h.mode,w),w.ref=Sr(h,m,k),w.return=h,w)}function c(h,m,k,w){return m===null||m.tag!==4||m.stateNode.containerInfo!==k.containerInfo||m.stateNode.implementation!==k.implementation?(m=$c(k,h.mode,w),m.return=h,m):(m=i(m,k.children||[]),m.return=h,m)}function u(h,m,k,w,v){return m===null||m.tag!==7?(m=Gn(k,h.mode,w,v),m.return=h,m):(m=i(m,k),m.return=h,m)}function p(h,m,k){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Lc(""+m,h.mode,k),m.return=h,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Xs:return k=Ll(m.type,m.key,m.props,null,h.mode,k),k.ref=Sr(h,null,m),k.return=h,k;case Si:return m=$c(m,h.mode,k),m.return=h,m;case Uo:var w=m._init;return p(h,w(m._payload),k)}if(Dr(m)||xr(m))return m=Gn(m,h.mode,k,null),m.return=h,m;il(h,m)}return null}function y(h,m,k,w){var v=m!==null?m.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return v!==null?null:l(h,m,""+k,w);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Xs:return k.key===v?a(h,m,k,w):null;case Si:return k.key===v?c(h,m,k,w):null;case Uo:return v=k._init,y(h,m,v(k._payload),w)}if(Dr(k)||xr(k))return v!==null?null:u(h,m,k,w,null);il(h,k)}return null}function d(h,m,k,w,v){if(typeof w=="string"&&w!==""||typeof w=="number")return h=h.get(k)||null,l(m,h,""+w,v);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Xs:return h=h.get(w.key===null?k:w.key)||null,a(m,h,w,v);case Si:return h=h.get(w.key===null?k:w.key)||null,c(m,h,w,v);case Uo:var E=w._init;return d(h,m,k,E(w._payload),v)}if(Dr(w)||xr(w))return h=h.get(k)||null,u(m,h,w,v,null);il(m,w)}return null}function g(h,m,k,w){for(var v=null,E=null,z=m,S=m=0,C=null;z!==null&&S<k.length;S++){z.index>S?(C=z,z=null):C=z.sibling;var _=y(h,z,k[S],w);if(_===null){z===null&&(z=C);break}t&&z&&_.alternate===null&&e(h,z),m=r(_,m,S),E===null?v=_:E.sibling=_,E=_,z=C}if(S===k.length)return o(h,z),me&&vn(h,S),v;if(z===null){for(;S<k.length;S++)z=p(h,k[S],w),z!==null&&(m=r(z,m,S),E===null?v=z:E.sibling=z,E=z);return me&&vn(h,S),v}for(z=n(h,z);S<k.length;S++)C=d(z,h,S,k[S],w),C!==null&&(t&&C.alternate!==null&&z.delete(C.key===null?S:C.key),m=r(C,m,S),E===null?v=C:E.sibling=C,E=C);return t&&z.forEach(function(D){return e(h,D)}),me&&vn(h,S),v}function f(h,m,k,w){var v=xr(k);if(typeof v!="function")throw Error(I(150));if(k=v.call(k),k==null)throw Error(I(151));for(var E=v=null,z=m,S=m=0,C=null,_=k.next();z!==null&&!_.done;S++,_=k.next()){z.index>S?(C=z,z=null):C=z.sibling;var D=y(h,z,_.value,w);if(D===null){z===null&&(z=C);break}t&&z&&D.alternate===null&&e(h,z),m=r(D,m,S),E===null?v=D:E.sibling=D,E=D,z=C}if(_.done)return o(h,z),me&&vn(h,S),v;if(z===null){for(;!_.done;S++,_=k.next())_=p(h,_.value,w),_!==null&&(m=r(_,m,S),E===null?v=_:E.sibling=_,E=_);return me&&vn(h,S),v}for(z=n(h,z);!_.done;S++,_=k.next())_=d(z,h,S,_.value,w),_!==null&&(t&&_.alternate!==null&&z.delete(_.key===null?S:_.key),m=r(_,m,S),E===null?v=_:E.sibling=_,E=_);return t&&z.forEach(function(B){return e(h,B)}),me&&vn(h,S),v}function b(h,m,k,w){if(typeof k=="object"&&k!==null&&k.type===Ei&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case Xs:e:{for(var v=k.key,E=m;E!==null;){if(E.key===v){if(v=k.type,v===Ei){if(E.tag===7){o(h,E.sibling),m=i(E,k.props.children),m.return=h,h=m;break e}}else if(E.elementType===v||typeof v=="object"&&v!==null&&v.$$typeof===Uo&&fh(v)===E.type){o(h,E.sibling),m=i(E,k.props),m.ref=Sr(h,E,k),m.return=h,h=m;break e}o(h,E);break}else e(h,E);E=E.sibling}k.type===Ei?(m=Gn(k.props.children,h.mode,w,k.key),m.return=h,h=m):(w=Ll(k.type,k.key,k.props,null,h.mode,w),w.ref=Sr(h,m,k),w.return=h,h=w)}return s(h);case Si:e:{for(E=k.key;m!==null;){if(m.key===E)if(m.tag===4&&m.stateNode.containerInfo===k.containerInfo&&m.stateNode.implementation===k.implementation){o(h,m.sibling),m=i(m,k.children||[]),m.return=h,h=m;break e}else{o(h,m);break}else e(h,m);m=m.sibling}m=$c(k,h.mode,w),m.return=h,h=m}return s(h);case Uo:return E=k._init,b(h,m,E(k._payload),w)}if(Dr(k))return g(h,m,k,w);if(xr(k))return f(h,m,k,w);il(h,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,m!==null&&m.tag===6?(o(h,m.sibling),m=i(m,k),m.return=h,h=m):(o(h,m),m=Lc(k,h.mode,w),m.return=h,h=m),s(h)):o(h,m)}return b}var Ki=tb(!0),ob=tb(!1),ha=dn(null),ga=null,ji=null,ld=null;function ad(){ld=ji=ga=null}function cd(t){var e=ha.current;ge(ha),t._currentValue=e}function Sp(t,e,o){for(;t!==null;){var n=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,n!==null&&(n.childLanes|=e)):n!==null&&(n.childLanes&e)!==e&&(n.childLanes|=e),t===o)break;t=t.return}}function Ui(t,e){ga=t,ld=ji=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ct=!0),t.firstContext=null)}function Ft(t){var e=t._currentValue;if(ld!==t)if(t={context:t,memoizedValue:e,next:null},ji===null){if(ga===null)throw Error(I(308));ji=t,ga.dependencies={lanes:0,firstContext:t}}else ji=ji.next=t;return e}var Fn=null;function ud(t){Fn===null?Fn=[t]:Fn.push(t)}function nb(t,e,o,n){var i=e.interleaved;return i===null?(o.next=o,ud(e)):(o.next=i.next,i.next=o),e.interleaved=o,Ao(t,n)}function Ao(t,e){t.lanes|=e;var o=t.alternate;for(o!==null&&(o.lanes|=e),o=t,t=t.return;t!==null;)t.childLanes|=e,o=t.alternate,o!==null&&(o.childLanes|=e),o=t,t=t.return;return o.tag===3?o.stateNode:null}var No=!1;function pd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ib(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function So(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function en(t,e,o){var n=t.updateQueue;if(n===null)return null;if(n=n.shared,se&2){var i=n.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),n.pending=e,Ao(t,o)}return i=n.interleaved,i===null?(e.next=e,ud(n)):(e.next=i.next,i.next=e),n.interleaved=e,Ao(t,o)}function Ol(t,e,o){if(e=e.updateQueue,e!==null&&(e=e.shared,(o&4194240)!==0)){var n=e.lanes;n&=t.pendingLanes,o|=n,e.lanes=o,Yy(t,o)}}function hh(t,e){var o=t.updateQueue,n=t.alternate;if(n!==null&&(n=n.updateQueue,o===n)){var i=null,r=null;if(o=o.firstBaseUpdate,o!==null){do{var s={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};r===null?i=r=s:r=r.next=s,o=o.next}while(o!==null);r===null?i=r=e:r=r.next=e}else i=r=e;o={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:r,shared:n.shared,effects:n.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=e:t.next=e,o.lastBaseUpdate=e}function ma(t,e,o,n){var i=t.updateQueue;No=!1;var r=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var a=l,c=a.next;a.next=null,s===null?r=c:s.next=c,s=a;var u=t.alternate;u!==null&&(u=u.updateQueue,l=u.lastBaseUpdate,l!==s&&(l===null?u.firstBaseUpdate=c:l.next=c,u.lastBaseUpdate=a))}if(r!==null){var p=i.baseState;s=0,u=c=a=null,l=r;do{var y=l.lane,d=l.eventTime;if((n&y)===y){u!==null&&(u=u.next={eventTime:d,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var g=t,f=l;switch(y=e,d=o,f.tag){case 1:if(g=f.payload,typeof g=="function"){p=g.call(d,p,y);break e}p=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=f.payload,y=typeof g=="function"?g.call(d,p,y):g,y==null)break e;p=Ee({},p,y);break e;case 2:No=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,y=i.effects,y===null?i.effects=[l]:y.push(l))}else d={eventTime:d,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},u===null?(c=u=d,a=p):u=u.next=d,s|=y;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;y=l,l=y.next,y.next=null,i.lastBaseUpdate=y,i.shared.pending=null}}while(!0);if(u===null&&(a=p),i.baseState=a,i.firstBaseUpdate=c,i.lastBaseUpdate=u,e=i.shared.interleaved,e!==null){i=e;do s|=i.lane,i=i.next;while(i!==e)}else r===null&&(i.shared.lanes=0);Wn|=s,t.lanes=s,t.memoizedState=p}}function gh(t,e,o){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var n=t[e],i=n.callback;if(i!==null){if(n.callback=null,n=o,typeof i!="function")throw Error(I(191,i));i.call(n)}}}var Bs={},ao=dn(Bs),gs=dn(Bs),ms=dn(Bs);function Mn(t){if(t===Bs)throw Error(I(174));return t}function yd(t,e){switch(de(ms,e),de(gs,t),de(ao,Bs),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ip(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ip(e,t)}ge(ao),de(ao,e)}function Ji(){ge(ao),ge(gs),ge(ms)}function rb(t){Mn(ms.current);var e=Mn(ao.current),o=ip(e,t.type);e!==o&&(de(gs,t),de(ao,o))}function dd(t){gs.current===t&&(ge(ao),ge(gs))}var xe=dn(0);function ba(t){for(var e=t;e!==null;){if(e.tag===13){var o=e.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Oc=[];function fd(){for(var t=0;t<Oc.length;t++)Oc[t]._workInProgressVersionPrimary=null;Oc.length=0}var Dl=jo.ReactCurrentDispatcher,Dc=jo.ReactCurrentBatchConfig,$n=0,ve=null,Fe=null,De=null,xa=!1,Yr=!1,bs=0,B3=0;function We(){throw Error(I(321))}function hd(t,e){if(e===null)return!1;for(var o=0;o<e.length&&o<t.length;o++)if(!Xt(t[o],e[o]))return!1;return!0}function gd(t,e,o,n,i,r){if($n=r,ve=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Dl.current=t===null||t.memoizedState===null?L3:$3,t=o(n,i),Yr){r=0;do{if(Yr=!1,bs=0,25<=r)throw Error(I(301));r+=1,De=Fe=null,e.updateQueue=null,Dl.current=W3,t=o(n,i)}while(Yr)}if(Dl.current=ka,e=Fe!==null&&Fe.next!==null,$n=0,De=Fe=ve=null,xa=!1,e)throw Error(I(300));return t}function md(){var t=bs!==0;return bs=0,t}function no(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return De===null?ve.memoizedState=De=t:De=De.next=t,De}function Mt(){if(Fe===null){var t=ve.alternate;t=t!==null?t.memoizedState:null}else t=Fe.next;var e=De===null?ve.memoizedState:De.next;if(e!==null)De=e,Fe=t;else{if(t===null)throw Error(I(310));Fe=t,t={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},De===null?ve.memoizedState=De=t:De=De.next=t}return De}function xs(t,e){return typeof e=="function"?e(t):e}function Bc(t){var e=Mt(),o=e.queue;if(o===null)throw Error(I(311));o.lastRenderedReducer=t;var n=Fe,i=n.baseQueue,r=o.pending;if(r!==null){if(i!==null){var s=i.next;i.next=r.next,r.next=s}n.baseQueue=i=r,o.pending=null}if(i!==null){r=i.next,n=n.baseState;var l=s=null,a=null,c=r;do{var u=c.lane;if(($n&u)===u)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),n=c.hasEagerState?c.eagerState:t(n,c.action);else{var p={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(l=a=p,s=n):a=a.next=p,ve.lanes|=u,Wn|=u}c=c.next}while(c!==null&&c!==r);a===null?s=n:a.next=l,Xt(n,e.memoizedState)||(ct=!0),e.memoizedState=n,e.baseState=s,e.baseQueue=a,o.lastRenderedState=n}if(t=o.interleaved,t!==null){i=t;do r=i.lane,ve.lanes|=r,Wn|=r,i=i.next;while(i!==t)}else i===null&&(o.lanes=0);return[e.memoizedState,o.dispatch]}function Gc(t){var e=Mt(),o=e.queue;if(o===null)throw Error(I(311));o.lastRenderedReducer=t;var n=o.dispatch,i=o.pending,r=e.memoizedState;if(i!==null){o.pending=null;var s=i=i.next;do r=t(r,s.action),s=s.next;while(s!==i);Xt(r,e.memoizedState)||(ct=!0),e.memoizedState=r,e.baseQueue===null&&(e.baseState=r),o.lastRenderedState=r}return[r,n]}function sb(){}function lb(t,e){var o=ve,n=Mt(),i=e(),r=!Xt(n.memoizedState,i);if(r&&(n.memoizedState=i,ct=!0),n=n.queue,bd(ub.bind(null,o,n,t),[t]),n.getSnapshot!==e||r||De!==null&&De.memoizedState.tag&1){if(o.flags|=2048,ks(9,cb.bind(null,o,n,i,e),void 0,null),Ge===null)throw Error(I(349));$n&30||ab(o,e,i)}return i}function ab(t,e,o){t.flags|=16384,t={getSnapshot:e,value:o},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.stores=[t]):(o=e.stores,o===null?e.stores=[t]:o.push(t))}function cb(t,e,o,n){e.value=o,e.getSnapshot=n,pb(e)&&yb(t)}function ub(t,e,o){return o(function(){pb(e)&&yb(t)})}function pb(t){var e=t.getSnapshot;t=t.value;try{var o=e();return!Xt(t,o)}catch{return!0}}function yb(t){var e=Ao(t,1);e!==null&&Ht(e,t,1,-1)}function mh(t){var e=no();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xs,lastRenderedState:t},e.queue=t,t=t.dispatch=N3.bind(null,ve,t),[e.memoizedState,t]}function ks(t,e,o,n){return t={tag:t,create:e,destroy:o,deps:n,next:null},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.lastEffect=t.next=t):(o=e.lastEffect,o===null?e.lastEffect=t.next=t:(n=o.next,o.next=t,t.next=n,e.lastEffect=t)),t}function db(){return Mt().memoizedState}function Bl(t,e,o,n){var i=no();ve.flags|=t,i.memoizedState=ks(1|e,o,void 0,n===void 0?null:n)}function Va(t,e,o,n){var i=Mt();n=n===void 0?null:n;var r=void 0;if(Fe!==null){var s=Fe.memoizedState;if(r=s.destroy,n!==null&&hd(n,s.deps)){i.memoizedState=ks(e,o,r,n);return}}ve.flags|=t,i.memoizedState=ks(1|e,o,r,n)}function bh(t,e){return Bl(8390656,8,t,e)}function bd(t,e){return Va(2048,8,t,e)}function fb(t,e){return Va(4,2,t,e)}function hb(t,e){return Va(4,4,t,e)}function gb(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function mb(t,e,o){return o=o!=null?o.concat([t]):null,Va(4,4,gb.bind(null,e,t),o)}function xd(){}function bb(t,e){var o=Mt();e=e===void 0?null:e;var n=o.memoizedState;return n!==null&&e!==null&&hd(e,n[1])?n[0]:(o.memoizedState=[t,e],t)}function xb(t,e){var o=Mt();e=e===void 0?null:e;var n=o.memoizedState;return n!==null&&e!==null&&hd(e,n[1])?n[0]:(t=t(),o.memoizedState=[t,e],t)}function kb(t,e,o){return $n&21?(Xt(o,e)||(o=Em(),ve.lanes|=o,Wn|=o,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ct=!0),t.memoizedState=o)}function G3(t,e){var o=pe;pe=o!==0&&4>o?o:4,t(!0);var n=Dc.transition;Dc.transition={};try{t(!1),e()}finally{pe=o,Dc.transition=n}}function wb(){return Mt().memoizedState}function U3(t,e,o){var n=on(t);if(o={lane:n,action:o,hasEagerState:!1,eagerState:null,next:null},vb(t))zb(e,o);else if(o=nb(t,e,o,n),o!==null){var i=et();Ht(o,t,n,i),Sb(o,e,n)}}function N3(t,e,o){var n=on(t),i={lane:n,action:o,hasEagerState:!1,eagerState:null,next:null};if(vb(t))zb(e,i);else{var r=t.alternate;if(t.lanes===0&&(r===null||r.lanes===0)&&(r=e.lastRenderedReducer,r!==null))try{var s=e.lastRenderedState,l=r(s,o);if(i.hasEagerState=!0,i.eagerState=l,Xt(l,s)){var a=e.interleaved;a===null?(i.next=i,ud(e)):(i.next=a.next,a.next=i),e.interleaved=i;return}}catch{}finally{}o=nb(t,e,i,n),o!==null&&(i=et(),Ht(o,t,n,i),Sb(o,e,n))}}function vb(t){var e=t.alternate;return t===ve||e!==null&&e===ve}function zb(t,e){Yr=xa=!0;var o=t.pending;o===null?e.next=e:(e.next=o.next,o.next=e),t.pending=e}function Sb(t,e,o){if(o&4194240){var n=e.lanes;n&=t.pendingLanes,o|=n,e.lanes=o,Yy(t,o)}}var ka={readContext:Ft,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useInsertionEffect:We,useLayoutEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useMutableSource:We,useSyncExternalStore:We,useId:We,unstable_isNewReconciler:!1},L3={readContext:Ft,useCallback:function(t,e){return no().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:bh,useImperativeHandle:function(t,e,o){return o=o!=null?o.concat([t]):null,Bl(4194308,4,gb.bind(null,e,t),o)},useLayoutEffect:function(t,e){return Bl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Bl(4,2,t,e)},useMemo:function(t,e){var o=no();return e=e===void 0?null:e,t=t(),o.memoizedState=[t,e],t},useReducer:function(t,e,o){var n=no();return e=o!==void 0?o(e):e,n.memoizedState=n.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},n.queue=t,t=t.dispatch=U3.bind(null,ve,t),[n.memoizedState,t]},useRef:function(t){var e=no();return t={current:t},e.memoizedState=t},useState:mh,useDebugValue:xd,useDeferredValue:function(t){return no().memoizedState=t},useTransition:function(){var t=mh(!1),e=t[0];return t=G3.bind(null,t[1]),no().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,o){var n=ve,i=no();if(me){if(o===void 0)throw Error(I(407));o=o()}else{if(o=e(),Ge===null)throw Error(I(349));$n&30||ab(n,e,o)}i.memoizedState=o;var r={value:o,getSnapshot:e};return i.queue=r,bh(ub.bind(null,n,r,t),[t]),n.flags|=2048,ks(9,cb.bind(null,n,r,o,e),void 0,null),o},useId:function(){var t=no(),e=Ge.identifierPrefix;if(me){var o=zo,n=vo;o=(n&~(1<<32-Wt(n)-1)).toString(32)+o,e=":"+e+"R"+o,o=bs++,0<o&&(e+="H"+o.toString(32)),e+=":"}else o=B3++,e=":"+e+"r"+o.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},$3={readContext:Ft,useCallback:bb,useContext:Ft,useEffect:bd,useImperativeHandle:mb,useInsertionEffect:fb,useLayoutEffect:hb,useMemo:xb,useReducer:Bc,useRef:db,useState:function(){return Bc(xs)},useDebugValue:xd,useDeferredValue:function(t){var e=Mt();return kb(e,Fe.memoizedState,t)},useTransition:function(){var t=Bc(xs)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:sb,useSyncExternalStore:lb,useId:wb,unstable_isNewReconciler:!1},W3={readContext:Ft,useCallback:bb,useContext:Ft,useEffect:bd,useImperativeHandle:mb,useInsertionEffect:fb,useLayoutEffect:hb,useMemo:xb,useReducer:Gc,useRef:db,useState:function(){return Gc(xs)},useDebugValue:xd,useDeferredValue:function(t){var e=Mt();return Fe===null?e.memoizedState=t:kb(e,Fe.memoizedState,t)},useTransition:function(){var t=Gc(xs)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:sb,useSyncExternalStore:lb,useId:wb,unstable_isNewReconciler:!1};function Ut(t,e){if(t&&t.defaultProps){e=Ee({},e),t=t.defaultProps;for(var o in t)e[o]===void 0&&(e[o]=t[o]);return e}return e}function Ep(t,e,o,n){e=t.memoizedState,o=o(n,e),o=o==null?e:Ee({},e,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var qa={isMounted:function(t){return(t=t._reactInternals)?ii(t)===t:!1},enqueueSetState:function(t,e,o){t=t._reactInternals;var n=et(),i=on(t),r=So(n,i);r.payload=e,o!=null&&(r.callback=o),e=en(t,r,i),e!==null&&(Ht(e,t,i,n),Ol(e,t,i))},enqueueReplaceState:function(t,e,o){t=t._reactInternals;var n=et(),i=on(t),r=So(n,i);r.tag=1,r.payload=e,o!=null&&(r.callback=o),e=en(t,r,i),e!==null&&(Ht(e,t,i,n),Ol(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var o=et(),n=on(t),i=So(o,n);i.tag=2,e!=null&&(i.callback=e),e=en(t,i,n),e!==null&&(Ht(e,t,n,o),Ol(e,t,n))}};function xh(t,e,o,n,i,r,s){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(n,r,s):e.prototype&&e.prototype.isPureReactComponent?!ys(o,n)||!ys(i,r):!0}function Eb(t,e,o){var n=!1,i=sn,r=e.contextType;return typeof r=="object"&&r!==null?r=Ft(r):(i=pt(e)?Nn:Ye.current,n=e.contextTypes,r=(n=n!=null)?Yi(t,i):sn),e=new e(o,r),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=qa,t.stateNode=e,e._reactInternals=t,n&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=r),e}function kh(t,e,o,n){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(o,n),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(o,n),e.state!==t&&qa.enqueueReplaceState(e,e.state,null)}function _p(t,e,o,n){var i=t.stateNode;i.props=o,i.state=t.memoizedState,i.refs={},pd(t);var r=e.contextType;typeof r=="object"&&r!==null?i.context=Ft(r):(r=pt(e)?Nn:Ye.current,i.context=Yi(t,r)),i.state=t.memoizedState,r=e.getDerivedStateFromProps,typeof r=="function"&&(Ep(t,e,r,o),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&qa.enqueueReplaceState(i,i.state,null),ma(t,o,i,n),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function er(t,e){try{var o="",n=e;do o+=x2(n),n=n.return;while(n);var i=o}catch(r){i=`
Error generating stack: `+r.message+`
`+r.stack}return{value:t,source:e,stack:i,digest:null}}function Uc(t,e,o){return{value:t,source:null,stack:o??null,digest:e??null}}function Cp(t,e){try{console.error(e.value)}catch(o){setTimeout(function(){throw o})}}var H3=typeof WeakMap=="function"?WeakMap:Map;function _b(t,e,o){o=So(-1,o),o.tag=3,o.payload={element:null};var n=e.value;return o.callback=function(){va||(va=!0,Op=n),Cp(t,e)},o}function Cb(t,e,o){o=So(-1,o),o.tag=3;var n=t.type.getDerivedStateFromError;if(typeof n=="function"){var i=e.value;o.payload=function(){return n(i)},o.callback=function(){Cp(t,e)}}var r=t.stateNode;return r!==null&&typeof r.componentDidCatch=="function"&&(o.callback=function(){Cp(t,e),typeof n!="function"&&(tn===null?tn=new Set([this]):tn.add(this));var s=e.stack;this.componentDidCatch(e.value,{componentStack:s!==null?s:""})}),o}function wh(t,e,o){var n=t.pingCache;if(n===null){n=t.pingCache=new H3;var i=new Set;n.set(e,i)}else i=n.get(e),i===void 0&&(i=new Set,n.set(e,i));i.has(o)||(i.add(o),t=sz.bind(null,t,e,o),e.then(t,t))}function vh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function zh(t,e,o,n,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(e=So(-1,1),e.tag=2,en(o,e,1))),o.lanes|=1),t)}var X3=jo.ReactCurrentOwner,ct=!1;function Je(t,e,o,n){e.child=t===null?ob(e,null,o,n):Ki(e,t.child,o,n)}function Sh(t,e,o,n,i){o=o.render;var r=e.ref;return Ui(e,i),n=gd(t,e,o,n,r,i),o=md(),t!==null&&!ct?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Ro(t,e,i)):(me&&o&&id(e),e.flags|=1,Je(t,e,n,i),e.child)}function Eh(t,e,o,n,i){if(t===null){var r=o.type;return typeof r=="function"&&!Cd(r)&&r.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(e.tag=15,e.type=r,Zb(t,e,r,n,i)):(t=Ll(o.type,null,n,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(r=t.child,!(t.lanes&i)){var s=r.memoizedProps;if(o=o.compare,o=o!==null?o:ys,o(s,n)&&t.ref===e.ref)return Ro(t,e,i)}return e.flags|=1,t=nn(r,n),t.ref=e.ref,t.return=e,e.child=t}function Zb(t,e,o,n,i){if(t!==null){var r=t.memoizedProps;if(ys(r,n)&&t.ref===e.ref)if(ct=!1,e.pendingProps=n=r,(t.lanes&i)!==0)t.flags&131072&&(ct=!0);else return e.lanes=t.lanes,Ro(t,e,i)}return Zp(t,e,o,n,i)}function Ab(t,e,o){var n=e.pendingProps,i=n.children,r=t!==null?t.memoizedState:null;if(n.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},de(Fi,mt),mt|=o;else{if(!(o&1073741824))return t=r!==null?r.baseLanes|o:o,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,de(Fi,mt),mt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=r!==null?r.baseLanes:o,de(Fi,mt),mt|=n}else r!==null?(n=r.baseLanes|o,e.memoizedState=null):n=o,de(Fi,mt),mt|=n;return Je(t,e,i,o),e.child}function Rb(t,e){var o=e.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(e.flags|=512,e.flags|=2097152)}function Zp(t,e,o,n,i){var r=pt(o)?Nn:Ye.current;return r=Yi(e,r),Ui(e,i),o=gd(t,e,o,n,r,i),n=md(),t!==null&&!ct?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Ro(t,e,i)):(me&&n&&id(e),e.flags|=1,Je(t,e,o,i),e.child)}function _h(t,e,o,n,i){if(pt(o)){var r=!0;ya(e)}else r=!1;if(Ui(e,i),e.stateNode===null)Gl(t,e),Eb(e,o,n),_p(e,o,n,i),n=!0;else if(t===null){var s=e.stateNode,l=e.memoizedProps;s.props=l;var a=s.context,c=o.contextType;typeof c=="object"&&c!==null?c=Ft(c):(c=pt(o)?Nn:Ye.current,c=Yi(e,c));var u=o.getDerivedStateFromProps,p=typeof u=="function"||typeof s.getSnapshotBeforeUpdate=="function";p||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==n||a!==c)&&kh(e,s,n,c),No=!1;var y=e.memoizedState;s.state=y,ma(e,n,s,i),a=e.memoizedState,l!==n||y!==a||ut.current||No?(typeof u=="function"&&(Ep(e,o,u,n),a=e.memoizedState),(l=No||xh(e,o,l,n,y,a,c))?(p||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=n,e.memoizedState=a),s.props=n,s.state=a,s.context=c,n=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),n=!1)}else{s=e.stateNode,ib(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:Ut(e.type,l),s.props=c,p=e.pendingProps,y=s.context,a=o.contextType,typeof a=="object"&&a!==null?a=Ft(a):(a=pt(o)?Nn:Ye.current,a=Yi(e,a));var d=o.getDerivedStateFromProps;(u=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==p||y!==a)&&kh(e,s,n,a),No=!1,y=e.memoizedState,s.state=y,ma(e,n,s,i);var g=e.memoizedState;l!==p||y!==g||ut.current||No?(typeof d=="function"&&(Ep(e,o,d,n),g=e.memoizedState),(c=No||xh(e,o,c,n,y,g,a)||!1)?(u||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,g,a),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,g,a)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=1024),e.memoizedProps=n,e.memoizedState=g),s.props=n,s.state=g,s.context=a,n=c):(typeof s.componentDidUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=1024),n=!1)}return Ap(t,e,o,n,r,i)}function Ap(t,e,o,n,i,r){Rb(t,e);var s=(e.flags&128)!==0;if(!n&&!s)return i&&ph(e,o,!1),Ro(t,e,r);n=e.stateNode,X3.current=e;var l=s&&typeof o.getDerivedStateFromError!="function"?null:n.render();return e.flags|=1,t!==null&&s?(e.child=Ki(e,t.child,null,r),e.child=Ki(e,null,l,r)):Je(t,e,l,r),e.memoizedState=n.state,i&&ph(e,o,!0),e.child}function Pb(t){var e=t.stateNode;e.pendingContext?uh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&uh(t,e.context,!1),yd(t,e.containerInfo)}function Ch(t,e,o,n,i){return Qi(),sd(i),e.flags|=256,Je(t,e,o,n),e.child}var Rp={dehydrated:null,treeContext:null,retryLane:0};function Pp(t){return{baseLanes:t,cachePool:null,transitions:null}}function Tb(t,e,o){var n=e.pendingProps,i=xe.current,r=!1,s=(e.flags&128)!==0,l;if((l=s)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(r=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),de(xe,i&1),t===null)return zp(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(s=n.children,t=n.fallback,r?(n=e.mode,r=e.child,s={mode:"hidden",children:s},!(n&1)&&r!==null?(r.childLanes=0,r.pendingProps=s):r=Ka(s,n,0,null),t=Gn(t,n,o,null),r.return=e,t.return=e,r.sibling=t,e.child=r,e.child.memoizedState=Pp(o),e.memoizedState=Rp,t):kd(e,s));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return V3(t,e,s,n,l,i,o);if(r){r=n.fallback,s=e.mode,i=t.child,l=i.sibling;var a={mode:"hidden",children:n.children};return!(s&1)&&e.child!==i?(n=e.child,n.childLanes=0,n.pendingProps=a,e.deletions=null):(n=nn(i,a),n.subtreeFlags=i.subtreeFlags&14680064),l!==null?r=nn(l,r):(r=Gn(r,s,o,null),r.flags|=2),r.return=e,n.return=e,n.sibling=r,e.child=n,n=r,r=e.child,s=t.child.memoizedState,s=s===null?Pp(o):{baseLanes:s.baseLanes|o,cachePool:null,transitions:s.transitions},r.memoizedState=s,r.childLanes=t.childLanes&~o,e.memoizedState=Rp,n}return r=t.child,t=r.sibling,n=nn(r,{mode:"visible",children:n.children}),!(e.mode&1)&&(n.lanes=o),n.return=e,n.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=n,e.memoizedState=null,n}function kd(t,e){return e=Ka({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function rl(t,e,o,n){return n!==null&&sd(n),Ki(e,t.child,null,o),t=kd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function V3(t,e,o,n,i,r,s){if(o)return e.flags&256?(e.flags&=-257,n=Uc(Error(I(422))),rl(t,e,s,n)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(r=n.fallback,i=e.mode,n=Ka({mode:"visible",children:n.children},i,0,null),r=Gn(r,i,s,null),r.flags|=2,n.return=e,r.return=e,n.sibling=r,e.child=n,e.mode&1&&Ki(e,t.child,null,s),e.child.memoizedState=Pp(s),e.memoizedState=Rp,r);if(!(e.mode&1))return rl(t,e,s,null);if(i.data==="$!"){if(n=i.nextSibling&&i.nextSibling.dataset,n)var l=n.dgst;return n=l,r=Error(I(419)),n=Uc(r,n,void 0),rl(t,e,s,n)}if(l=(s&t.childLanes)!==0,ct||l){if(n=Ge,n!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(n.suspendedLanes|s)?0:i,i!==0&&i!==r.retryLane&&(r.retryLane=i,Ao(t,i),Ht(n,t,i,-1))}return _d(),n=Uc(Error(I(421))),rl(t,e,s,n)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=lz.bind(null,t),i._reactRetry=e,null):(t=r.treeContext,xt=Jo(i.nextSibling),kt=e,me=!0,Lt=null,t!==null&&(Ct[Zt++]=vo,Ct[Zt++]=zo,Ct[Zt++]=Ln,vo=t.id,zo=t.overflow,Ln=e),e=kd(e,n.children),e.flags|=4096,e)}function Zh(t,e,o){t.lanes|=e;var n=t.alternate;n!==null&&(n.lanes|=e),Sp(t.return,e,o)}function Nc(t,e,o,n,i){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:n,tail:o,tailMode:i}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=n,r.tail=o,r.tailMode=i)}function jb(t,e,o){var n=e.pendingProps,i=n.revealOrder,r=n.tail;if(Je(t,e,n.children,o),n=xe.current,n&2)n=n&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Zh(t,o,e);else if(t.tag===19)Zh(t,o,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}n&=1}if(de(xe,n),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(o=e.child,i=null;o!==null;)t=o.alternate,t!==null&&ba(t)===null&&(i=o),o=o.sibling;o=i,o===null?(i=e.child,e.child=null):(i=o.sibling,o.sibling=null),Nc(e,!1,i,o,r);break;case"backwards":for(o=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&ba(t)===null){e.child=i;break}t=i.sibling,i.sibling=o,o=i,i=t}Nc(e,!0,o,null,r);break;case"together":Nc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Gl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ro(t,e,o){if(t!==null&&(e.dependencies=t.dependencies),Wn|=e.lanes,!(o&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(I(153));if(e.child!==null){for(t=e.child,o=nn(t,t.pendingProps),e.child=o,o.return=e;t.sibling!==null;)t=t.sibling,o=o.sibling=nn(t,t.pendingProps),o.return=e;o.sibling=null}return e.child}function q3(t,e,o){switch(e.tag){case 3:Pb(e),Qi();break;case 5:rb(e);break;case 1:pt(e.type)&&ya(e);break;case 4:yd(e,e.stateNode.containerInfo);break;case 10:var n=e.type._context,i=e.memoizedProps.value;de(ha,n._currentValue),n._currentValue=i;break;case 13:if(n=e.memoizedState,n!==null)return n.dehydrated!==null?(de(xe,xe.current&1),e.flags|=128,null):o&e.child.childLanes?Tb(t,e,o):(de(xe,xe.current&1),t=Ro(t,e,o),t!==null?t.sibling:null);de(xe,xe.current&1);break;case 19:if(n=(o&e.childLanes)!==0,t.flags&128){if(n)return jb(t,e,o);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),de(xe,xe.current),n)break;return null;case 22:case 23:return e.lanes=0,Ab(t,e,o)}return Ro(t,e,o)}var Ib,Tp,Fb,Mb;Ib=function(t,e){for(var o=e.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break;for(;o.sibling===null;){if(o.return===null||o.return===e)return;o=o.return}o.sibling.return=o.return,o=o.sibling}};Tp=function(){};Fb=function(t,e,o,n){var i=t.memoizedProps;if(i!==n){t=e.stateNode,Mn(ao.current);var r=null;switch(o){case"input":i=ep(t,i),n=ep(t,n),r=[];break;case"select":i=Ee({},i,{value:void 0}),n=Ee({},n,{value:void 0}),r=[];break;case"textarea":i=np(t,i),n=np(t,n),r=[];break;default:typeof i.onClick!="function"&&typeof n.onClick=="function"&&(t.onclick=ua)}rp(o,n);var s;o=null;for(c in i)if(!n.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(s in l)l.hasOwnProperty(s)&&(o||(o={}),o[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(rs.hasOwnProperty(c)?r||(r=[]):(r=r||[]).push(c,null));for(c in n){var a=n[c];if(l=i?.[c],n.hasOwnProperty(c)&&a!==l&&(a!=null||l!=null))if(c==="style")if(l){for(s in l)!l.hasOwnProperty(s)||a&&a.hasOwnProperty(s)||(o||(o={}),o[s]="");for(s in a)a.hasOwnProperty(s)&&l[s]!==a[s]&&(o||(o={}),o[s]=a[s])}else o||(r||(r=[]),r.push(c,o)),o=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(r=r||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(r=r||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(rs.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&he("scroll",t),r||l===a||(r=[])):(r=r||[]).push(c,a))}o&&(r=r||[]).push("style",o);var c=r;(e.updateQueue=c)&&(e.flags|=4)}};Mb=function(t,e,o,n){o!==n&&(e.flags|=4)};function Er(t,e){if(!me)switch(t.tailMode){case"hidden":e=t.tail;for(var o=null;e!==null;)e.alternate!==null&&(o=e),e=e.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var n=null;o!==null;)o.alternate!==null&&(n=o),o=o.sibling;n===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:n.sibling=null}}function He(t){var e=t.alternate!==null&&t.alternate.child===t.child,o=0,n=0;if(e)for(var i=t.child;i!==null;)o|=i.lanes|i.childLanes,n|=i.subtreeFlags&14680064,n|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)o|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=n,t.childLanes=o,e}function Y3(t,e,o){var n=e.pendingProps;switch(rd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return He(e),null;case 1:return pt(e.type)&&pa(),He(e),null;case 3:return n=e.stateNode,Ji(),ge(ut),ge(Ye),fd(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(nl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Lt!==null&&(Gp(Lt),Lt=null))),Tp(t,e),He(e),null;case 5:dd(e);var i=Mn(ms.current);if(o=e.type,t!==null&&e.stateNode!=null)Fb(t,e,o,n,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!n){if(e.stateNode===null)throw Error(I(166));return He(e),null}if(t=Mn(ao.current),nl(e)){n=e.stateNode,o=e.type;var r=e.memoizedProps;switch(n[ro]=e,n[hs]=r,t=(e.mode&1)!==0,o){case"dialog":he("cancel",n),he("close",n);break;case"iframe":case"object":case"embed":he("load",n);break;case"video":case"audio":for(i=0;i<Gr.length;i++)he(Gr[i],n);break;case"source":he("error",n);break;case"img":case"image":case"link":he("error",n),he("load",n);break;case"details":he("toggle",n);break;case"input":Of(n,r),he("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!r.multiple},he("invalid",n);break;case"textarea":Bf(n,r),he("invalid",n)}rp(o,r),i=null;for(var s in r)if(r.hasOwnProperty(s)){var l=r[s];s==="children"?typeof l=="string"?n.textContent!==l&&(r.suppressHydrationWarning!==!0&&ol(n.textContent,l,t),i=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(r.suppressHydrationWarning!==!0&&ol(n.textContent,l,t),i=["children",""+l]):rs.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&he("scroll",n)}switch(o){case"input":Vs(n),Df(n,r,!0);break;case"textarea":Vs(n),Gf(n);break;case"select":case"option":break;default:typeof r.onClick=="function"&&(n.onclick=ua)}n=i,e.updateQueue=n,n!==null&&(e.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=um(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=s.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof n.is=="string"?t=s.createElement(o,{is:n.is}):(t=s.createElement(o),o==="select"&&(s=t,n.multiple?s.multiple=!0:n.size&&(s.size=n.size))):t=s.createElementNS(t,o),t[ro]=e,t[hs]=n,Ib(t,e,!1,!1),e.stateNode=t;e:{switch(s=sp(o,n),o){case"dialog":he("cancel",t),he("close",t),i=n;break;case"iframe":case"object":case"embed":he("load",t),i=n;break;case"video":case"audio":for(i=0;i<Gr.length;i++)he(Gr[i],t);i=n;break;case"source":he("error",t),i=n;break;case"img":case"image":case"link":he("error",t),he("load",t),i=n;break;case"details":he("toggle",t),i=n;break;case"input":Of(t,n),i=ep(t,n),he("invalid",t);break;case"option":i=n;break;case"select":t._wrapperState={wasMultiple:!!n.multiple},i=Ee({},n,{value:void 0}),he("invalid",t);break;case"textarea":Bf(t,n),i=np(t,n),he("invalid",t);break;default:i=n}rp(o,i),l=i;for(r in l)if(l.hasOwnProperty(r)){var a=l[r];r==="style"?dm(t,a):r==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&pm(t,a)):r==="children"?typeof a=="string"?(o!=="textarea"||a!=="")&&ss(t,a):typeof a=="number"&&ss(t,""+a):r!=="suppressContentEditableWarning"&&r!=="suppressHydrationWarning"&&r!=="autoFocus"&&(rs.hasOwnProperty(r)?a!=null&&r==="onScroll"&&he("scroll",t):a!=null&&$y(t,r,a,s))}switch(o){case"input":Vs(t),Df(t,n,!1);break;case"textarea":Vs(t),Gf(t);break;case"option":n.value!=null&&t.setAttribute("value",""+rn(n.value));break;case"select":t.multiple=!!n.multiple,r=n.value,r!=null?Oi(t,!!n.multiple,r,!1):n.defaultValue!=null&&Oi(t,!!n.multiple,n.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=ua)}switch(o){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return He(e),null;case 6:if(t&&e.stateNode!=null)Mb(t,e,t.memoizedProps,n);else{if(typeof n!="string"&&e.stateNode===null)throw Error(I(166));if(o=Mn(ms.current),Mn(ao.current),nl(e)){if(n=e.stateNode,o=e.memoizedProps,n[ro]=e,(r=n.nodeValue!==o)&&(t=kt,t!==null))switch(t.tag){case 3:ol(n.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ol(n.nodeValue,o,(t.mode&1)!==0)}r&&(e.flags|=4)}else n=(o.nodeType===9?o:o.ownerDocument).createTextNode(n),n[ro]=e,e.stateNode=n}return He(e),null;case 13:if(ge(xe),n=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(me&&xt!==null&&e.mode&1&&!(e.flags&128))eb(),Qi(),e.flags|=98560,r=!1;else if(r=nl(e),n!==null&&n.dehydrated!==null){if(t===null){if(!r)throw Error(I(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(I(317));r[ro]=e}else Qi(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;He(e),r=!1}else Lt!==null&&(Gp(Lt),Lt=null),r=!0;if(!r)return e.flags&65536?e:null}return e.flags&128?(e.lanes=o,e):(n=n!==null,n!==(t!==null&&t.memoizedState!==null)&&n&&(e.child.flags|=8192,e.mode&1&&(t===null||xe.current&1?Me===0&&(Me=3):_d())),e.updateQueue!==null&&(e.flags|=4),He(e),null);case 4:return Ji(),Tp(t,e),t===null&&ds(e.stateNode.containerInfo),He(e),null;case 10:return cd(e.type._context),He(e),null;case 17:return pt(e.type)&&pa(),He(e),null;case 19:if(ge(xe),r=e.memoizedState,r===null)return He(e),null;if(n=(e.flags&128)!==0,s=r.rendering,s===null)if(n)Er(r,!1);else{if(Me!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=ba(t),s!==null){for(e.flags|=128,Er(r,!1),n=s.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),e.subtreeFlags=0,n=o,o=e.child;o!==null;)r=o,t=n,r.flags&=14680066,s=r.alternate,s===null?(r.childLanes=0,r.lanes=t,r.child=null,r.subtreeFlags=0,r.memoizedProps=null,r.memoizedState=null,r.updateQueue=null,r.dependencies=null,r.stateNode=null):(r.childLanes=s.childLanes,r.lanes=s.lanes,r.child=s.child,r.subtreeFlags=0,r.deletions=null,r.memoizedProps=s.memoizedProps,r.memoizedState=s.memoizedState,r.updateQueue=s.updateQueue,r.type=s.type,t=s.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return de(xe,xe.current&1|2),e.child}t=t.sibling}r.tail!==null&&Ce()>tr&&(e.flags|=128,n=!0,Er(r,!1),e.lanes=4194304)}else{if(!n)if(t=ba(s),t!==null){if(e.flags|=128,n=!0,o=t.updateQueue,o!==null&&(e.updateQueue=o,e.flags|=4),Er(r,!0),r.tail===null&&r.tailMode==="hidden"&&!s.alternate&&!me)return He(e),null}else 2*Ce()-r.renderingStartTime>tr&&o!==1073741824&&(e.flags|=128,n=!0,Er(r,!1),e.lanes=4194304);r.isBackwards?(s.sibling=e.child,e.child=s):(o=r.last,o!==null?o.sibling=s:e.child=s,r.last=s)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ce(),e.sibling=null,o=xe.current,de(xe,n?o&1|2:o&1),e):(He(e),null);case 22:case 23:return Ed(),n=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==n&&(e.flags|=8192),n&&e.mode&1?mt&1073741824&&(He(e),e.subtreeFlags&6&&(e.flags|=8192)):He(e),null;case 24:return null;case 25:return null}throw Error(I(156,e.tag))}function Q3(t,e){switch(rd(e),e.tag){case 1:return pt(e.type)&&pa(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ji(),ge(ut),ge(Ye),fd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return dd(e),null;case 13:if(ge(xe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(I(340));Qi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ge(xe),null;case 4:return Ji(),null;case 10:return cd(e.type._context),null;case 22:case 23:return Ed(),null;case 24:return null;default:return null}}var sl=!1,Xe=!1,K3=typeof WeakSet=="function"?WeakSet:Set,O=null;function Ii(t,e){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(n){_e(t,e,n)}else o.current=null}function jp(t,e,o){try{o()}catch(n){_e(t,e,n)}}var Ah=!1;function J3(t,e){if(gp=la,t=Um(),nd(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var n=o.getSelection&&o.getSelection();if(n&&n.rangeCount!==0){o=n.anchorNode;var i=n.anchorOffset,r=n.focusNode;n=n.focusOffset;try{o.nodeType,r.nodeType}catch{o=null;break e}var s=0,l=-1,a=-1,c=0,u=0,p=t,y=null;t:for(;;){for(var d;p!==o||i!==0&&p.nodeType!==3||(l=s+i),p!==r||n!==0&&p.nodeType!==3||(a=s+n),p.nodeType===3&&(s+=p.nodeValue.length),(d=p.firstChild)!==null;)y=p,p=d;for(;;){if(p===t)break t;if(y===o&&++c===i&&(l=s),y===r&&++u===n&&(a=s),(d=p.nextSibling)!==null)break;p=y,y=p.parentNode}p=d}o=l===-1||a===-1?null:{start:l,end:a}}else o=null}o=o||{start:0,end:0}}else o=null;for(mp={focusedElem:t,selectionRange:o},la=!1,O=e;O!==null;)if(e=O,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,O=t;else for(;O!==null;){e=O;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var f=g.memoizedProps,b=g.memoizedState,h=e.stateNode,m=h.getSnapshotBeforeUpdate(e.elementType===e.type?f:Ut(e.type,f),b);h.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var k=e.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(I(163))}}catch(w){_e(e,e.return,w)}if(t=e.sibling,t!==null){t.return=e.return,O=t;break}O=e.return}return g=Ah,Ah=!1,g}function Qr(t,e,o){var n=e.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var i=n=n.next;do{if((i.tag&t)===t){var r=i.destroy;i.destroy=void 0,r!==void 0&&jp(e,o,r)}i=i.next}while(i!==n)}}function Ya(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var o=e=e.next;do{if((o.tag&t)===t){var n=o.create;o.destroy=n()}o=o.next}while(o!==e)}}function Ip(t){var e=t.ref;if(e!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof e=="function"?e(t):e.current=t}}function Ob(t){var e=t.alternate;e!==null&&(t.alternate=null,Ob(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ro],delete e[hs],delete e[kp],delete e[F3],delete e[M3])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Db(t){return t.tag===5||t.tag===3||t.tag===4}function Rh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Db(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Fp(t,e,o){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?o.nodeType===8?o.parentNode.insertBefore(t,e):o.insertBefore(t,e):(o.nodeType===8?(e=o.parentNode,e.insertBefore(t,o)):(e=o,e.appendChild(t)),o=o._reactRootContainer,o!=null||e.onclick!==null||(e.onclick=ua));else if(n!==4&&(t=t.child,t!==null))for(Fp(t,e,o),t=t.sibling;t!==null;)Fp(t,e,o),t=t.sibling}function Mp(t,e,o){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?o.insertBefore(t,e):o.appendChild(t);else if(n!==4&&(t=t.child,t!==null))for(Mp(t,e,o),t=t.sibling;t!==null;)Mp(t,e,o),t=t.sibling}var Ue=null,Nt=!1;function Io(t,e,o){for(o=o.child;o!==null;)Bb(t,e,o),o=o.sibling}function Bb(t,e,o){if(lo&&typeof lo.onCommitFiberUnmount=="function")try{lo.onCommitFiberUnmount(Na,o)}catch{}switch(o.tag){case 5:Xe||Ii(o,e);case 6:var n=Ue,i=Nt;Ue=null,Io(t,e,o),Ue=n,Nt=i,Ue!==null&&(Nt?(t=Ue,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):Ue.removeChild(o.stateNode));break;case 18:Ue!==null&&(Nt?(t=Ue,o=o.stateNode,t.nodeType===8?Fc(t.parentNode,o):t.nodeType===1&&Fc(t,o),us(t)):Fc(Ue,o.stateNode));break;case 4:n=Ue,i=Nt,Ue=o.stateNode.containerInfo,Nt=!0,Io(t,e,o),Ue=n,Nt=i;break;case 0:case 11:case 14:case 15:if(!Xe&&(n=o.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){i=n=n.next;do{var r=i,s=r.destroy;r=r.tag,s!==void 0&&(r&2||r&4)&&jp(o,e,s),i=i.next}while(i!==n)}Io(t,e,o);break;case 1:if(!Xe&&(Ii(o,e),n=o.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=o.memoizedProps,n.state=o.memoizedState,n.componentWillUnmount()}catch(l){_e(o,e,l)}Io(t,e,o);break;case 21:Io(t,e,o);break;case 22:o.mode&1?(Xe=(n=Xe)||o.memoizedState!==null,Io(t,e,o),Xe=n):Io(t,e,o);break;default:Io(t,e,o)}}function Ph(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new K3),e.forEach(function(n){var i=az.bind(null,t,n);o.has(n)||(o.add(n),n.then(i,i))})}}function Bt(t,e){var o=e.deletions;if(o!==null)for(var n=0;n<o.length;n++){var i=o[n];try{var r=t,s=e,l=s;e:for(;l!==null;){switch(l.tag){case 5:Ue=l.stateNode,Nt=!1;break e;case 3:Ue=l.stateNode.containerInfo,Nt=!0;break e;case 4:Ue=l.stateNode.containerInfo,Nt=!0;break e}l=l.return}if(Ue===null)throw Error(I(160));Bb(r,s,i),Ue=null,Nt=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(c){_e(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Gb(e,t),e=e.sibling}function Gb(t,e){var o=t.alternate,n=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Bt(e,t),Jt(t),n&4){try{Qr(3,t,t.return),Ya(3,t)}catch(f){_e(t,t.return,f)}try{Qr(5,t,t.return)}catch(f){_e(t,t.return,f)}}break;case 1:Bt(e,t),Jt(t),n&512&&o!==null&&Ii(o,o.return);break;case 5:if(Bt(e,t),Jt(t),n&512&&o!==null&&Ii(o,o.return),t.flags&32){var i=t.stateNode;try{ss(i,"")}catch(f){_e(t,t.return,f)}}if(n&4&&(i=t.stateNode,i!=null)){var r=t.memoizedProps,s=o!==null?o.memoizedProps:r,l=t.type,a=t.updateQueue;if(t.updateQueue=null,a!==null)try{l==="input"&&r.type==="radio"&&r.name!=null&&am(i,r),sp(l,s);var c=sp(l,r);for(s=0;s<a.length;s+=2){var u=a[s],p=a[s+1];u==="style"?dm(i,p):u==="dangerouslySetInnerHTML"?pm(i,p):u==="children"?ss(i,p):$y(i,u,p,c)}switch(l){case"input":tp(i,r);break;case"textarea":cm(i,r);break;case"select":var y=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!r.multiple;var d=r.value;d!=null?Oi(i,!!r.multiple,d,!1):y!==!!r.multiple&&(r.defaultValue!=null?Oi(i,!!r.multiple,r.defaultValue,!0):Oi(i,!!r.multiple,r.multiple?[]:"",!1))}i[hs]=r}catch(f){_e(t,t.return,f)}}break;case 6:if(Bt(e,t),Jt(t),n&4){if(t.stateNode===null)throw Error(I(162));i=t.stateNode,r=t.memoizedProps;try{i.nodeValue=r}catch(f){_e(t,t.return,f)}}break;case 3:if(Bt(e,t),Jt(t),n&4&&o!==null&&o.memoizedState.isDehydrated)try{us(e.containerInfo)}catch(f){_e(t,t.return,f)}break;case 4:Bt(e,t),Jt(t);break;case 13:Bt(e,t),Jt(t),i=t.child,i.flags&8192&&(r=i.memoizedState!==null,i.stateNode.isHidden=r,!r||i.alternate!==null&&i.alternate.memoizedState!==null||(zd=Ce())),n&4&&Ph(t);break;case 22:if(u=o!==null&&o.memoizedState!==null,t.mode&1?(Xe=(c=Xe)||u,Bt(e,t),Xe=c):Bt(e,t),Jt(t),n&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(O=t,u=t.child;u!==null;){for(p=O=u;O!==null;){switch(y=O,d=y.child,y.tag){case 0:case 11:case 14:case 15:Qr(4,y,y.return);break;case 1:Ii(y,y.return);var g=y.stateNode;if(typeof g.componentWillUnmount=="function"){n=y,o=y.return;try{e=n,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(f){_e(n,o,f)}}break;case 5:Ii(y,y.return);break;case 22:if(y.memoizedState!==null){jh(p);continue}}d!==null?(d.return=y,O=d):jh(p)}u=u.sibling}e:for(u=null,p=t;;){if(p.tag===5){if(u===null){u=p;try{i=p.stateNode,c?(r=i.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"):(l=p.stateNode,a=p.memoizedProps.style,s=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=ym("display",s))}catch(f){_e(t,t.return,f)}}}else if(p.tag===6){if(u===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(f){_e(t,t.return,f)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;u===p&&(u=null),p=p.return}u===p&&(u=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Bt(e,t),Jt(t),n&4&&Ph(t);break;case 21:break;default:Bt(e,t),Jt(t)}}function Jt(t){var e=t.flags;if(e&2){try{e:{for(var o=t.return;o!==null;){if(Db(o)){var n=o;break e}o=o.return}throw Error(I(160))}switch(n.tag){case 5:var i=n.stateNode;n.flags&32&&(ss(i,""),n.flags&=-33);var r=Rh(t);Mp(t,r,i);break;case 3:case 4:var s=n.stateNode.containerInfo,l=Rh(t);Fp(t,l,s);break;default:throw Error(I(161))}}catch(a){_e(t,t.return,a)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function ez(t,e,o){O=t,Ub(t)}function Ub(t,e,o){for(var n=(t.mode&1)!==0;O!==null;){var i=O,r=i.child;if(i.tag===22&&n){var s=i.memoizedState!==null||sl;if(!s){var l=i.alternate,a=l!==null&&l.memoizedState!==null||Xe;l=sl;var c=Xe;if(sl=s,(Xe=a)&&!c)for(O=i;O!==null;)s=O,a=s.child,s.tag===22&&s.memoizedState!==null?Ih(i):a!==null?(a.return=s,O=a):Ih(i);for(;r!==null;)O=r,Ub(r),r=r.sibling;O=i,sl=l,Xe=c}Th(t)}else i.subtreeFlags&8772&&r!==null?(r.return=i,O=r):Th(t)}}function Th(t){for(;O!==null;){var e=O;if(e.flags&8772){var o=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Xe||Ya(5,e);break;case 1:var n=e.stateNode;if(e.flags&4&&!Xe)if(o===null)n.componentDidMount();else{var i=e.elementType===e.type?o.memoizedProps:Ut(e.type,o.memoizedProps);n.componentDidUpdate(i,o.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var r=e.updateQueue;r!==null&&gh(e,r,n);break;case 3:var s=e.updateQueue;if(s!==null){if(o=null,e.child!==null)switch(e.child.tag){case 5:o=e.child.stateNode;break;case 1:o=e.child.stateNode}gh(e,s,o)}break;case 5:var l=e.stateNode;if(o===null&&e.flags&4){o=l;var a=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break;case"img":a.src&&(o.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var p=u.dehydrated;p!==null&&us(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(I(163))}Xe||e.flags&512&&Ip(e)}catch(y){_e(e,e.return,y)}}if(e===t){O=null;break}if(o=e.sibling,o!==null){o.return=e.return,O=o;break}O=e.return}}function jh(t){for(;O!==null;){var e=O;if(e===t){O=null;break}var o=e.sibling;if(o!==null){o.return=e.return,O=o;break}O=e.return}}function Ih(t){for(;O!==null;){var e=O;try{switch(e.tag){case 0:case 11:case 15:var o=e.return;try{Ya(4,e)}catch(a){_e(e,o,a)}break;case 1:var n=e.stateNode;if(typeof n.componentDidMount=="function"){var i=e.return;try{n.componentDidMount()}catch(a){_e(e,i,a)}}var r=e.return;try{Ip(e)}catch(a){_e(e,r,a)}break;case 5:var s=e.return;try{Ip(e)}catch(a){_e(e,s,a)}}}catch(a){_e(e,e.return,a)}if(e===t){O=null;break}var l=e.sibling;if(l!==null){l.return=e.return,O=l;break}O=e.return}}var tz=Math.ceil,wa=jo.ReactCurrentDispatcher,wd=jo.ReactCurrentOwner,It=jo.ReactCurrentBatchConfig,se=0,Ge=null,Pe=null,Ne=0,mt=0,Fi=dn(0),Me=0,ws=null,Wn=0,Qa=0,vd=0,Kr=null,lt=null,zd=0,tr=1/0,ko=null,va=!1,Op=null,tn=null,ll=!1,Ho=null,za=0,Jr=0,Dp=null,Ul=-1,Nl=0;function et(){return se&6?Ce():Ul!==-1?Ul:Ul=Ce()}function on(t){return t.mode&1?se&2&&Ne!==0?Ne&-Ne:D3.transition!==null?(Nl===0&&(Nl=Em()),Nl):(t=pe,t!==0||(t=window.event,t=t===void 0?16:Tm(t.type)),t):1}function Ht(t,e,o,n){if(50<Jr)throw Jr=0,Dp=null,Error(I(185));Ms(t,o,n),(!(se&2)||t!==Ge)&&(t===Ge&&(!(se&2)&&(Qa|=o),Me===4&&$o(t,Ne)),yt(t,n),o===1&&se===0&&!(e.mode&1)&&(tr=Ce()+500,Xa&&fn()))}function yt(t,e){var o=t.callbackNode;D2(t,e);var n=sa(t,t===Ge?Ne:0);if(n===0)o!==null&&Lf(o),t.callbackNode=null,t.callbackPriority=0;else if(e=n&-n,t.callbackPriority!==e){if(o!=null&&Lf(o),e===1)t.tag===0?O3(Fh.bind(null,t)):Qm(Fh.bind(null,t)),j3(function(){!(se&6)&&fn()}),o=null;else{switch(_m(n)){case 1:o=qy;break;case 4:o=zm;break;case 16:o=ra;break;case 536870912:o=Sm;break;default:o=ra}o=qb(o,Nb.bind(null,t))}t.callbackPriority=e,t.callbackNode=o}}function Nb(t,e){if(Ul=-1,Nl=0,se&6)throw Error(I(327));var o=t.callbackNode;if(Ni()&&t.callbackNode!==o)return null;var n=sa(t,t===Ge?Ne:0);if(n===0)return null;if(n&30||n&t.expiredLanes||e)e=Sa(t,n);else{e=n;var i=se;se|=2;var r=$b();(Ge!==t||Ne!==e)&&(ko=null,tr=Ce()+500,Bn(t,e));do try{iz();break}catch(l){Lb(t,l)}while(!0);ad(),wa.current=r,se=i,Pe!==null?e=0:(Ge=null,Ne=0,e=Me)}if(e!==0){if(e===2&&(i=pp(t),i!==0&&(n=i,e=Bp(t,i))),e===1)throw o=ws,Bn(t,0),$o(t,n),yt(t,Ce()),o;if(e===6)$o(t,n);else{if(i=t.current.alternate,!(n&30)&&!oz(i)&&(e=Sa(t,n),e===2&&(r=pp(t),r!==0&&(n=r,e=Bp(t,r))),e===1))throw o=ws,Bn(t,0),$o(t,n),yt(t,Ce()),o;switch(t.finishedWork=i,t.finishedLanes=n,e){case 0:case 1:throw Error(I(345));case 2:zn(t,lt,ko);break;case 3:if($o(t,n),(n&130023424)===n&&(e=zd+500-Ce(),10<e)){if(sa(t,0)!==0)break;if(i=t.suspendedLanes,(i&n)!==n){et(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=xp(zn.bind(null,t,lt,ko),e);break}zn(t,lt,ko);break;case 4:if($o(t,n),(n&4194240)===n)break;for(e=t.eventTimes,i=-1;0<n;){var s=31-Wt(n);r=1<<s,s=e[s],s>i&&(i=s),n&=~r}if(n=i,n=Ce()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*tz(n/1960))-n,10<n){t.timeoutHandle=xp(zn.bind(null,t,lt,ko),n);break}zn(t,lt,ko);break;case 5:zn(t,lt,ko);break;default:throw Error(I(329))}}}return yt(t,Ce()),t.callbackNode===o?Nb.bind(null,t):null}function Bp(t,e){var o=Kr;return t.current.memoizedState.isDehydrated&&(Bn(t,e).flags|=256),t=Sa(t,e),t!==2&&(e=lt,lt=o,e!==null&&Gp(e)),t}function Gp(t){lt===null?lt=t:lt.push.apply(lt,t)}function oz(t){for(var e=t;;){if(e.flags&16384){var o=e.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var n=0;n<o.length;n++){var i=o[n],r=i.getSnapshot;i=i.value;try{if(!Xt(r(),i))return!1}catch{return!1}}}if(o=e.child,e.subtreeFlags&16384&&o!==null)o.return=e,e=o;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $o(t,e){for(e&=~vd,e&=~Qa,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var o=31-Wt(e),n=1<<o;t[o]=-1,e&=~n}}function Fh(t){if(se&6)throw Error(I(327));Ni();var e=sa(t,0);if(!(e&1))return yt(t,Ce()),null;var o=Sa(t,e);if(t.tag!==0&&o===2){var n=pp(t);n!==0&&(e=n,o=Bp(t,n))}if(o===1)throw o=ws,Bn(t,0),$o(t,e),yt(t,Ce()),o;if(o===6)throw Error(I(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,zn(t,lt,ko),yt(t,Ce()),null}function Sd(t,e){var o=se;se|=1;try{return t(e)}finally{se=o,se===0&&(tr=Ce()+500,Xa&&fn())}}function Hn(t){Ho!==null&&Ho.tag===0&&!(se&6)&&Ni();var e=se;se|=1;var o=It.transition,n=pe;try{if(It.transition=null,pe=1,t)return t()}finally{pe=n,It.transition=o,se=e,!(se&6)&&fn()}}function Ed(){mt=Fi.current,ge(Fi)}function Bn(t,e){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,T3(o)),Pe!==null)for(o=Pe.return;o!==null;){var n=o;switch(rd(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&pa();break;case 3:Ji(),ge(ut),ge(Ye),fd();break;case 5:dd(n);break;case 4:Ji();break;case 13:ge(xe);break;case 19:ge(xe);break;case 10:cd(n.type._context);break;case 22:case 23:Ed()}o=o.return}if(Ge=t,Pe=t=nn(t.current,null),Ne=mt=e,Me=0,ws=null,vd=Qa=Wn=0,lt=Kr=null,Fn!==null){for(e=0;e<Fn.length;e++)if(o=Fn[e],n=o.interleaved,n!==null){o.interleaved=null;var i=n.next,r=o.pending;if(r!==null){var s=r.next;r.next=i,n.next=s}o.pending=n}Fn=null}return t}function Lb(t,e){do{var o=Pe;try{if(ad(),Dl.current=ka,xa){for(var n=ve.memoizedState;n!==null;){var i=n.queue;i!==null&&(i.pending=null),n=n.next}xa=!1}if($n=0,De=Fe=ve=null,Yr=!1,bs=0,wd.current=null,o===null||o.return===null){Me=1,ws=e,Pe=null;break}e:{var r=t,s=o.return,l=o,a=e;if(e=Ne,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,u=l,p=u.tag;if(!(u.mode&1)&&(p===0||p===11||p===15)){var y=u.alternate;y?(u.updateQueue=y.updateQueue,u.memoizedState=y.memoizedState,u.lanes=y.lanes):(u.updateQueue=null,u.memoizedState=null)}var d=vh(s);if(d!==null){d.flags&=-257,zh(d,s,l,r,e),d.mode&1&&wh(r,c,e),e=d,a=c;var g=e.updateQueue;if(g===null){var f=new Set;f.add(a),e.updateQueue=f}else g.add(a);break e}else{if(!(e&1)){wh(r,c,e),_d();break e}a=Error(I(426))}}else if(me&&l.mode&1){var b=vh(s);if(b!==null){!(b.flags&65536)&&(b.flags|=256),zh(b,s,l,r,e),sd(er(a,l));break e}}r=a=er(a,l),Me!==4&&(Me=2),Kr===null?Kr=[r]:Kr.push(r),r=s;do{switch(r.tag){case 3:r.flags|=65536,e&=-e,r.lanes|=e;var h=_b(r,a,e);hh(r,h);break e;case 1:l=a;var m=r.type,k=r.stateNode;if(!(r.flags&128)&&(typeof m.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(tn===null||!tn.has(k)))){r.flags|=65536,e&=-e,r.lanes|=e;var w=Cb(r,l,e);hh(r,w);break e}}r=r.return}while(r!==null)}Hb(o)}catch(v){e=v,Pe===o&&o!==null&&(Pe=o=o.return);continue}break}while(!0)}function $b(){var t=wa.current;return wa.current=ka,t===null?ka:t}function _d(){(Me===0||Me===3||Me===2)&&(Me=4),Ge===null||!(Wn&268435455)&&!(Qa&268435455)||$o(Ge,Ne)}function Sa(t,e){var o=se;se|=2;var n=$b();(Ge!==t||Ne!==e)&&(ko=null,Bn(t,e));do try{nz();break}catch(i){Lb(t,i)}while(!0);if(ad(),se=o,wa.current=n,Pe!==null)throw Error(I(261));return Ge=null,Ne=0,Me}function nz(){for(;Pe!==null;)Wb(Pe)}function iz(){for(;Pe!==null&&!A2();)Wb(Pe)}function Wb(t){var e=Vb(t.alternate,t,mt);t.memoizedProps=t.pendingProps,e===null?Hb(t):Pe=e,wd.current=null}function Hb(t){var e=t;do{var o=e.alternate;if(t=e.return,e.flags&32768){if(o=Q3(o,e),o!==null){o.flags&=32767,Pe=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Me=6,Pe=null;return}}else if(o=Y3(o,e,mt),o!==null){Pe=o;return}if(e=e.sibling,e!==null){Pe=e;return}Pe=e=t}while(e!==null);Me===0&&(Me=5)}function zn(t,e,o){var n=pe,i=It.transition;try{It.transition=null,pe=1,rz(t,e,o,n)}finally{It.transition=i,pe=n}return null}function rz(t,e,o,n){do Ni();while(Ho!==null);if(se&6)throw Error(I(327));o=t.finishedWork;var i=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(I(177));t.callbackNode=null,t.callbackPriority=0;var r=o.lanes|o.childLanes;if(B2(t,r),t===Ge&&(Pe=Ge=null,Ne=0),!(o.subtreeFlags&2064)&&!(o.flags&2064)||ll||(ll=!0,qb(ra,function(){return Ni(),null})),r=(o.flags&15990)!==0,o.subtreeFlags&15990||r){r=It.transition,It.transition=null;var s=pe;pe=1;var l=se;se|=4,wd.current=null,J3(t,o),Gb(o,t),E3(mp),la=!!gp,mp=gp=null,t.current=o,ez(o),R2(),se=l,pe=s,It.transition=r}else t.current=o;if(ll&&(ll=!1,Ho=t,za=i),r=t.pendingLanes,r===0&&(tn=null),j2(o.stateNode),yt(t,Ce()),e!==null)for(n=t.onRecoverableError,o=0;o<e.length;o++)i=e[o],n(i.value,{componentStack:i.stack,digest:i.digest});if(va)throw va=!1,t=Op,Op=null,t;return za&1&&t.tag!==0&&Ni(),r=t.pendingLanes,r&1?t===Dp?Jr++:(Jr=0,Dp=t):Jr=0,fn(),null}function Ni(){if(Ho!==null){var t=_m(za),e=It.transition,o=pe;try{if(It.transition=null,pe=16>t?16:t,Ho===null)var n=!1;else{if(t=Ho,Ho=null,za=0,se&6)throw Error(I(331));var i=se;for(se|=4,O=t.current;O!==null;){var r=O,s=r.child;if(O.flags&16){var l=r.deletions;if(l!==null){for(var a=0;a<l.length;a++){var c=l[a];for(O=c;O!==null;){var u=O;switch(u.tag){case 0:case 11:case 15:Qr(8,u,r)}var p=u.child;if(p!==null)p.return=u,O=p;else for(;O!==null;){u=O;var y=u.sibling,d=u.return;if(Ob(u),u===c){O=null;break}if(y!==null){y.return=d,O=y;break}O=d}}}var g=r.alternate;if(g!==null){var f=g.child;if(f!==null){g.child=null;do{var b=f.sibling;f.sibling=null,f=b}while(f!==null)}}O=r}}if(r.subtreeFlags&2064&&s!==null)s.return=r,O=s;else e:for(;O!==null;){if(r=O,r.flags&2048)switch(r.tag){case 0:case 11:case 15:Qr(9,r,r.return)}var h=r.sibling;if(h!==null){h.return=r.return,O=h;break e}O=r.return}}var m=t.current;for(O=m;O!==null;){s=O;var k=s.child;if(s.subtreeFlags&2064&&k!==null)k.return=s,O=k;else e:for(s=m;O!==null;){if(l=O,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ya(9,l)}}catch(v){_e(l,l.return,v)}if(l===s){O=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,O=w;break e}O=l.return}}if(se=i,fn(),lo&&typeof lo.onPostCommitFiberRoot=="function")try{lo.onPostCommitFiberRoot(Na,t)}catch{}n=!0}return n}finally{pe=o,It.transition=e}}return!1}function Mh(t,e,o){e=er(o,e),e=_b(t,e,1),t=en(t,e,1),e=et(),t!==null&&(Ms(t,1,e),yt(t,e))}function _e(t,e,o){if(t.tag===3)Mh(t,t,o);else for(;e!==null;){if(e.tag===3){Mh(e,t,o);break}else if(e.tag===1){var n=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(tn===null||!tn.has(n))){t=er(o,t),t=Cb(e,t,1),e=en(e,t,1),t=et(),e!==null&&(Ms(e,1,t),yt(e,t));break}}e=e.return}}function sz(t,e,o){var n=t.pingCache;n!==null&&n.delete(e),e=et(),t.pingedLanes|=t.suspendedLanes&o,Ge===t&&(Ne&o)===o&&(Me===4||Me===3&&(Ne&130023424)===Ne&&500>Ce()-zd?Bn(t,0):vd|=o),yt(t,e)}function Xb(t,e){e===0&&(t.mode&1?(e=Qs,Qs<<=1,!(Qs&130023424)&&(Qs=4194304)):e=1);var o=et();t=Ao(t,e),t!==null&&(Ms(t,e,o),yt(t,o))}function lz(t){var e=t.memoizedState,o=0;e!==null&&(o=e.retryLane),Xb(t,o)}function az(t,e){var o=0;switch(t.tag){case 13:var n=t.stateNode,i=t.memoizedState;i!==null&&(o=i.retryLane);break;case 19:n=t.stateNode;break;default:throw Error(I(314))}n!==null&&n.delete(e),Xb(t,o)}var Vb;Vb=function(t,e,o){if(t!==null)if(t.memoizedProps!==e.pendingProps||ut.current)ct=!0;else{if(!(t.lanes&o)&&!(e.flags&128))return ct=!1,q3(t,e,o);ct=!!(t.flags&131072)}else ct=!1,me&&e.flags&1048576&&Km(e,fa,e.index);switch(e.lanes=0,e.tag){case 2:var n=e.type;Gl(t,e),t=e.pendingProps;var i=Yi(e,Ye.current);Ui(e,o),i=gd(null,e,n,t,i,o);var r=md();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,pt(n)?(r=!0,ya(e)):r=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,pd(e),i.updater=qa,e.stateNode=i,i._reactInternals=e,_p(e,n,t,o),e=Ap(null,e,n,!0,r,o)):(e.tag=0,me&&r&&id(e),Je(null,e,i,o),e=e.child),e;case 16:n=e.elementType;e:{switch(Gl(t,e),t=e.pendingProps,i=n._init,n=i(n._payload),e.type=n,i=e.tag=uz(n),t=Ut(n,t),i){case 0:e=Zp(null,e,n,t,o);break e;case 1:e=_h(null,e,n,t,o);break e;case 11:e=Sh(null,e,n,t,o);break e;case 14:e=Eh(null,e,n,Ut(n.type,t),o);break e}throw Error(I(306,n,""))}return e;case 0:return n=e.type,i=e.pendingProps,i=e.elementType===n?i:Ut(n,i),Zp(t,e,n,i,o);case 1:return n=e.type,i=e.pendingProps,i=e.elementType===n?i:Ut(n,i),_h(t,e,n,i,o);case 3:e:{if(Pb(e),t===null)throw Error(I(387));n=e.pendingProps,r=e.memoizedState,i=r.element,ib(t,e),ma(e,n,null,o);var s=e.memoizedState;if(n=s.element,r.isDehydrated)if(r={element:n,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},e.updateQueue.baseState=r,e.memoizedState=r,e.flags&256){i=er(Error(I(423)),e),e=Ch(t,e,n,o,i);break e}else if(n!==i){i=er(Error(I(424)),e),e=Ch(t,e,n,o,i);break e}else for(xt=Jo(e.stateNode.containerInfo.firstChild),kt=e,me=!0,Lt=null,o=ob(e,null,n,o),e.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Qi(),n===i){e=Ro(t,e,o);break e}Je(t,e,n,o)}e=e.child}return e;case 5:return rb(e),t===null&&zp(e),n=e.type,i=e.pendingProps,r=t!==null?t.memoizedProps:null,s=i.children,bp(n,i)?s=null:r!==null&&bp(n,r)&&(e.flags|=32),Rb(t,e),Je(t,e,s,o),e.child;case 6:return t===null&&zp(e),null;case 13:return Tb(t,e,o);case 4:return yd(e,e.stateNode.containerInfo),n=e.pendingProps,t===null?e.child=Ki(e,null,n,o):Je(t,e,n,o),e.child;case 11:return n=e.type,i=e.pendingProps,i=e.elementType===n?i:Ut(n,i),Sh(t,e,n,i,o);case 7:return Je(t,e,e.pendingProps,o),e.child;case 8:return Je(t,e,e.pendingProps.children,o),e.child;case 12:return Je(t,e,e.pendingProps.children,o),e.child;case 10:e:{if(n=e.type._context,i=e.pendingProps,r=e.memoizedProps,s=i.value,de(ha,n._currentValue),n._currentValue=s,r!==null)if(Xt(r.value,s)){if(r.children===i.children&&!ut.current){e=Ro(t,e,o);break e}}else for(r=e.child,r!==null&&(r.return=e);r!==null;){var l=r.dependencies;if(l!==null){s=r.child;for(var a=l.firstContext;a!==null;){if(a.context===n){if(r.tag===1){a=So(-1,o&-o),a.tag=2;var c=r.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?a.next=a:(a.next=u.next,u.next=a),c.pending=a}}r.lanes|=o,a=r.alternate,a!==null&&(a.lanes|=o),Sp(r.return,o,e),l.lanes|=o;break}a=a.next}}else if(r.tag===10)s=r.type===e.type?null:r.child;else if(r.tag===18){if(s=r.return,s===null)throw Error(I(341));s.lanes|=o,l=s.alternate,l!==null&&(l.lanes|=o),Sp(s,o,e),s=r.sibling}else s=r.child;if(s!==null)s.return=r;else for(s=r;s!==null;){if(s===e){s=null;break}if(r=s.sibling,r!==null){r.return=s.return,s=r;break}s=s.return}r=s}Je(t,e,i.children,o),e=e.child}return e;case 9:return i=e.type,n=e.pendingProps.children,Ui(e,o),i=Ft(i),n=n(i),e.flags|=1,Je(t,e,n,o),e.child;case 14:return n=e.type,i=Ut(n,e.pendingProps),i=Ut(n.type,i),Eh(t,e,n,i,o);case 15:return Zb(t,e,e.type,e.pendingProps,o);case 17:return n=e.type,i=e.pendingProps,i=e.elementType===n?i:Ut(n,i),Gl(t,e),e.tag=1,pt(n)?(t=!0,ya(e)):t=!1,Ui(e,o),Eb(e,n,i),_p(e,n,i,o),Ap(null,e,n,!0,t,o);case 19:return jb(t,e,o);case 22:return Ab(t,e,o)}throw Error(I(156,e.tag))};function qb(t,e){return vm(t,e)}function cz(t,e,o,n){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pt(t,e,o,n){return new cz(t,e,o,n)}function Cd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function uz(t){if(typeof t=="function")return Cd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Hy)return 11;if(t===Xy)return 14}return 2}function nn(t,e){var o=t.alternate;return o===null?(o=Pt(t.tag,e,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=e,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,e=t.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Ll(t,e,o,n,i,r){var s=2;if(n=t,typeof t=="function")Cd(t)&&(s=1);else if(typeof t=="string")s=5;else e:switch(t){case Ei:return Gn(o.children,i,r,e);case Wy:s=8,i|=8;break;case Yu:return t=Pt(12,o,e,i|2),t.elementType=Yu,t.lanes=r,t;case Qu:return t=Pt(13,o,e,i),t.elementType=Qu,t.lanes=r,t;case Ku:return t=Pt(19,o,e,i),t.elementType=Ku,t.lanes=r,t;case rm:return Ka(o,i,r,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case nm:s=10;break e;case im:s=9;break e;case Hy:s=11;break e;case Xy:s=14;break e;case Uo:s=16,n=null;break e}throw Error(I(130,t==null?t:typeof t,""))}return e=Pt(s,o,e,i),e.elementType=t,e.type=n,e.lanes=r,e}function Gn(t,e,o,n){return t=Pt(7,t,n,e),t.lanes=o,t}function Ka(t,e,o,n){return t=Pt(22,t,n,e),t.elementType=rm,t.lanes=o,t.stateNode={isHidden:!1},t}function Lc(t,e,o){return t=Pt(6,t,null,e),t.lanes=o,t}function $c(t,e,o){return e=Pt(4,t.children!==null?t.children:[],t.key,e),e.lanes=o,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function pz(t,e,o,n,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Sc(0),this.expirationTimes=Sc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Sc(0),this.identifierPrefix=n,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Zd(t,e,o,n,i,r,s,l,a){return t=new pz(t,e,o,l,a),e===1?(e=1,r===!0&&(e|=8)):e=0,r=Pt(3,null,null,e),t.current=r,r.stateNode=t,r.memoizedState={element:n,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},pd(r),t}function yz(t,e,o){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Si,key:n==null?null:""+n,children:t,containerInfo:e,implementation:o}}function Yb(t){if(!t)return sn;t=t._reactInternals;e:{if(ii(t)!==t||t.tag!==1)throw Error(I(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(pt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(I(171))}if(t.tag===1){var o=t.type;if(pt(o))return Ym(t,o,e)}return e}function Qb(t,e,o,n,i,r,s,l,a){return t=Zd(o,n,!0,t,i,r,s,l,a),t.context=Yb(null),o=t.current,n=et(),i=on(o),r=So(n,i),r.callback=e??null,en(o,r,i),t.current.lanes=i,Ms(t,i,n),yt(t,n),t}function Ja(t,e,o,n){var i=e.current,r=et(),s=on(i);return o=Yb(o),e.context===null?e.context=o:e.pendingContext=o,e=So(r,s),e.payload={element:t},n=n===void 0?null:n,n!==null&&(e.callback=n),t=en(i,e,s),t!==null&&(Ht(t,i,s,r),Ol(t,i,s)),s}function Ea(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Oh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<e?o:e}}function Ad(t,e){Oh(t,e),(t=t.alternate)&&Oh(t,e)}function dz(){return null}var Kb=typeof reportError=="function"?reportError:function(t){console.error(t)};function Rd(t){this._internalRoot=t}ec.prototype.render=Rd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(I(409));Ja(t,e,null,null)};ec.prototype.unmount=Rd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Hn(function(){Ja(null,t,null,null)}),e[Zo]=null}};function ec(t){this._internalRoot=t}ec.prototype.unstable_scheduleHydration=function(t){if(t){var e=Am();t={blockedOn:null,target:t,priority:e};for(var o=0;o<Lo.length&&e!==0&&e<Lo[o].priority;o++);Lo.splice(o,0,t),o===0&&Pm(t)}};function Pd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function tc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Dh(){}function fz(t,e,o,n,i){if(i){if(typeof n=="function"){var r=n;n=function(){var c=Ea(s);r.call(c)}}var s=Qb(e,n,t,0,null,!1,!1,"",Dh);return t._reactRootContainer=s,t[Zo]=s.current,ds(t.nodeType===8?t.parentNode:t),Hn(),s}for(;i=t.lastChild;)t.removeChild(i);if(typeof n=="function"){var l=n;n=function(){var c=Ea(a);l.call(c)}}var a=Zd(t,0,!1,null,null,!1,!1,"",Dh);return t._reactRootContainer=a,t[Zo]=a.current,ds(t.nodeType===8?t.parentNode:t),Hn(function(){Ja(e,a,o,n)}),a}function oc(t,e,o,n,i){var r=o._reactRootContainer;if(r){var s=r;if(typeof i=="function"){var l=i;i=function(){var a=Ea(s);l.call(a)}}Ja(e,s,t,i)}else s=fz(o,e,t,i,n);return Ea(s)}Cm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var o=Br(e.pendingLanes);o!==0&&(Yy(e,o|1),yt(e,Ce()),!(se&6)&&(tr=Ce()+500,fn()))}break;case 13:Hn(function(){var n=Ao(t,1);if(n!==null){var i=et();Ht(n,t,1,i)}}),Ad(t,1)}};Qy=function(t){if(t.tag===13){var e=Ao(t,134217728);if(e!==null){var o=et();Ht(e,t,134217728,o)}Ad(t,134217728)}};Zm=function(t){if(t.tag===13){var e=on(t),o=Ao(t,e);if(o!==null){var n=et();Ht(o,t,e,n)}Ad(t,e)}};Am=function(){return pe};Rm=function(t,e){var o=pe;try{return pe=t,e()}finally{pe=o}};ap=function(t,e,o){switch(e){case"input":if(tp(t,o),e=o.name,o.type==="radio"&&e!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<o.length;e++){var n=o[e];if(n!==t&&n.form===t.form){var i=Ha(n);if(!i)throw Error(I(90));lm(n),tp(n,i)}}}break;case"textarea":cm(t,o);break;case"select":e=o.value,e!=null&&Oi(t,!!o.multiple,e,!1)}};gm=Sd;mm=Hn;var hz={usingClientEntryPoint:!1,Events:[Ds,Ai,Ha,fm,hm,Sd]},_r={findFiberByHostInstance:In,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},gz={bundleType:_r.bundleType,version:_r.version,rendererPackageName:_r.rendererPackageName,rendererConfig:_r.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:jo.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=km(t),t===null?null:t.stateNode},findFiberByHostInstance:_r.findFiberByHostInstance||dz,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var al=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!al.isDisabled&&al.supportsFiber)try{Na=al.inject(gz),lo=al}catch{}}St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hz;St.createPortal=function(t,e){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pd(e))throw Error(I(200));return yz(t,e,null,o)};St.createRoot=function(t,e){if(!Pd(t))throw Error(I(299));var o=!1,n="",i=Kb;return e!=null&&(e.unstable_strictMode===!0&&(o=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Zd(t,1,!1,null,null,o,!1,n,i),t[Zo]=e.current,ds(t.nodeType===8?t.parentNode:t),new Rd(e)};St.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(I(188)):(t=Object.keys(t).join(","),Error(I(268,t)));return t=km(e),t=t===null?null:t.stateNode,t};St.flushSync=function(t){return Hn(t)};St.hydrate=function(t,e,o){if(!tc(e))throw Error(I(200));return oc(null,t,e,!0,o)};St.hydrateRoot=function(t,e,o){if(!Pd(t))throw Error(I(405));var n=o!=null&&o.hydratedSources||null,i=!1,r="",s=Kb;if(o!=null&&(o.unstable_strictMode===!0&&(i=!0),o.identifierPrefix!==void 0&&(r=o.identifierPrefix),o.onRecoverableError!==void 0&&(s=o.onRecoverableError)),e=Qb(e,null,t,1,o??null,i,!1,r,s),t[Zo]=e.current,ds(t),n)for(t=0;t<n.length;t++)o=n[t],i=o._getVersion,i=i(o._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[o,i]:e.mutableSourceEagerHydrationData.push(o,i);return new ec(e)};St.render=function(t,e,o){if(!tc(e))throw Error(I(200));return oc(null,t,e,!1,o)};St.unmountComponentAtNode=function(t){if(!tc(t))throw Error(I(40));return t._reactRootContainer?(Hn(function(){oc(null,null,t,!1,function(){t._reactRootContainer=null,t[Zo]=null})}),!0):!1};St.unstable_batchedUpdates=Sd;St.unstable_renderSubtreeIntoContainer=function(t,e,o,n){if(!tc(o))throw Error(I(200));if(t==null||t._reactInternals===void 0)throw Error(I(38));return oc(t,e,o,!1,n)};St.version="18.3.1-next-f1338f8080-20240426";function Jb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jb)}catch(t){console.error(t)}}Jb(),J0.exports=St;var pr=J0.exports;const ex=oi(pr);var tx,Bh=pr;tx=Bh.createRoot,Bh.hydrateRoot;const mz="modulepreload",bz=function(t){return"/head-over-heels-online/"+t},Gh={},_a=function(e,o,n){let i=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=s?.nonce||s?.getAttribute("nonce");i=Promise.allSettled(o.map(a=>{if(a=bz(a),a in Gh)return;Gh[a]=!0;const c=a.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":mz,c||(p.as="script"),p.crossOrigin="",p.href=a,l&&p.setAttribute("nonce",l),document.head.appendChild(p),c)return new Promise((y,d)=>{p.addEventListener("load",y),p.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${a}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var N=(t=>(t.Application="application",t.WebGLPipes="webgl-pipes",t.WebGLPipesAdaptor="webgl-pipes-adaptor",t.WebGLSystem="webgl-system",t.WebGPUPipes="webgpu-pipes",t.WebGPUPipesAdaptor="webgpu-pipes-adaptor",t.WebGPUSystem="webgpu-system",t.CanvasSystem="canvas-system",t.CanvasPipesAdaptor="canvas-pipes-adaptor",t.CanvasPipes="canvas-pipes",t.Asset="asset",t.LoadParser="load-parser",t.ResolveParser="resolve-parser",t.CacheParser="cache-parser",t.DetectionParser="detection-parser",t.MaskEffect="mask-effect",t.BlendMode="blend-mode",t.TextureSource="texture-source",t.Environment="environment",t.ShapeBuilder="shape-builder",t.Batcher="batcher",t))(N||{});const Up=t=>{if(typeof t=="function"||typeof t=="object"&&t.extension){if(!t.extension)throw new Error("Extension class must have an extension object");t={...typeof t.extension!="object"?{type:t.extension}:t.extension,ref:t}}if(typeof t=="object")t={...t};else throw new Error("Invalid extension type");return typeof t.type=="string"&&(t.type=[t.type]),t},cl=(t,e)=>Up(t).priority??e,tt={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...t){return t.map(Up).forEach(e=>{e.type.forEach(o=>this._removeHandlers[o]?.(e))}),this},add(...t){return t.map(Up).forEach(e=>{e.type.forEach(o=>{const n=this._addHandlers,i=this._queue;n[o]?n[o]?.(e):(i[o]=i[o]||[],i[o]?.push(e))})}),this},handle(t,e,o){const n=this._addHandlers,i=this._removeHandlers;if(n[t]||i[t])throw new Error(`Extension type ${t} already has a handler`);n[t]=e,i[t]=o;const r=this._queue;return r[t]&&(r[t]?.forEach(s=>e(s)),delete r[t]),this},handleByMap(t,e){return this.handle(t,o=>{o.name&&(e[o.name]=o.ref)},o=>{o.name&&delete e[o.name]})},handleByNamedList(t,e,o=-1){return this.handle(t,n=>{e.findIndex(r=>r.name===n.name)>=0||(e.push({name:n.name,value:n.ref}),e.sort((r,s)=>cl(s.value,o)-cl(r.value,o)))},n=>{const i=e.findIndex(r=>r.name===n.name);i!==-1&&e.splice(i,1)})},handleByList(t,e,o=-1){return this.handle(t,n=>{e.includes(n.ref)||(e.push(n.ref),e.sort((i,r)=>cl(r,o)-cl(i,o)))},n=>{const i=e.indexOf(n.ref);i!==-1&&e.splice(i,1)})}},xz={extension:{type:N.Environment,name:"browser",priority:-1},test:()=>!0,load:async()=>{await _a(()=>import("./browserAll-C8Jhehm9.js"),__vite__mapDeps([0,1,2]))}},kz={extension:{type:N.Environment,name:"webworker",priority:0},test:()=>typeof self<"u"&&self.WorkerGlobalScope!==void 0,load:async()=>{await _a(()=>import("./webworkerAll-Rg-rfT7l.js"),__vite__mapDeps([1,2]))}};class st{constructor(e,o,n){this._x=o||0,this._y=n||0,this._observer=e}clone(e){return new st(e??this._observer,this._x,this._y)}set(e=0,o=e){return(this._x!==e||this._y!==o)&&(this._x=e,this._y=o,this._observer._onUpdate(this)),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer._onUpdate(this)),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}toString(){return`[pixi.js/math:ObservablePoint x=0 y=0 scope=${this._observer}]`}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer._onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer._onUpdate(this))}}var ox={exports:{}};(function(t){var e=Object.prototype.hasOwnProperty,o="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(o=!1));function i(a,c,u){this.fn=a,this.context=c,this.once=u||!1}function r(a,c,u,p,y){if(typeof u!="function")throw new TypeError("The listener must be a function");var d=new i(u,p||a,y),g=o?o+c:c;return a._events[g]?a._events[g].fn?a._events[g]=[a._events[g],d]:a._events[g].push(d):(a._events[g]=d,a._eventsCount++),a}function s(a,c){--a._eventsCount===0?a._events=new n:delete a._events[c]}function l(){this._events=new n,this._eventsCount=0}l.prototype.eventNames=function(){var c=[],u,p;if(this._eventsCount===0)return c;for(p in u=this._events)e.call(u,p)&&c.push(o?p.slice(1):p);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(u)):c},l.prototype.listeners=function(c){var u=o?o+c:c,p=this._events[u];if(!p)return[];if(p.fn)return[p.fn];for(var y=0,d=p.length,g=new Array(d);y<d;y++)g[y]=p[y].fn;return g},l.prototype.listenerCount=function(c){var u=o?o+c:c,p=this._events[u];return p?p.fn?1:p.length:0},l.prototype.emit=function(c,u,p,y,d,g){var f=o?o+c:c;if(!this._events[f])return!1;var b=this._events[f],h=arguments.length,m,k;if(b.fn){switch(b.once&&this.removeListener(c,b.fn,void 0,!0),h){case 1:return b.fn.call(b.context),!0;case 2:return b.fn.call(b.context,u),!0;case 3:return b.fn.call(b.context,u,p),!0;case 4:return b.fn.call(b.context,u,p,y),!0;case 5:return b.fn.call(b.context,u,p,y,d),!0;case 6:return b.fn.call(b.context,u,p,y,d,g),!0}for(k=1,m=new Array(h-1);k<h;k++)m[k-1]=arguments[k];b.fn.apply(b.context,m)}else{var w=b.length,v;for(k=0;k<w;k++)switch(b[k].once&&this.removeListener(c,b[k].fn,void 0,!0),h){case 1:b[k].fn.call(b[k].context);break;case 2:b[k].fn.call(b[k].context,u);break;case 3:b[k].fn.call(b[k].context,u,p);break;case 4:b[k].fn.call(b[k].context,u,p,y);break;default:if(!m)for(v=1,m=new Array(h-1);v<h;v++)m[v-1]=arguments[v];b[k].fn.apply(b[k].context,m)}}return!0},l.prototype.on=function(c,u,p){return r(this,c,u,p,!1)},l.prototype.once=function(c,u,p){return r(this,c,u,p,!0)},l.prototype.removeListener=function(c,u,p,y){var d=o?o+c:c;if(!this._events[d])return this;if(!u)return s(this,d),this;var g=this._events[d];if(g.fn)g.fn===u&&(!y||g.once)&&(!p||g.context===p)&&s(this,d);else{for(var f=0,b=[],h=g.length;f<h;f++)(g[f].fn!==u||y&&!g[f].once||p&&g[f].context!==p)&&b.push(g[f]);b.length?this._events[d]=b.length===1?b[0]:b:s(this,d)}return this},l.prototype.removeAllListeners=function(c){var u;return c?(u=o?o+c:c,this._events[u]&&s(this,u)):(this._events=new n,this._eventsCount=0),this},l.prototype.off=l.prototype.removeListener,l.prototype.addListener=l.prototype.on,l.prefixed=o,l.EventEmitter=l,t.exports=l})(ox);var wz=ox.exports;const Yt=oi(wz),vz=Math.PI*2,zz=180/Math.PI,or=Math.PI/180;class qe{constructor(e=0,o=0){this.x=0,this.y=0,this.x=e,this.y=o}clone(){return new qe(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,o=e){return this.x=e,this.y=o,this}toString(){return`[pixi.js/math:Point x=${this.x} y=${this.y}]`}static get shared(){return Wc.x=0,Wc.y=0,Wc}}const Wc=new qe;class le{constructor(e=1,o=0,n=0,i=1,r=0,s=0){this.array=null,this.a=e,this.b=o,this.c=n,this.d=i,this.tx=r,this.ty=s}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,o,n,i,r,s){return this.a=e,this.b=o,this.c=n,this.d=i,this.tx=r,this.ty=s,this}toArray(e,o){this.array||(this.array=new Float32Array(9));const n=o||this.array;return e?(n[0]=this.a,n[1]=this.b,n[2]=0,n[3]=this.c,n[4]=this.d,n[5]=0,n[6]=this.tx,n[7]=this.ty,n[8]=1):(n[0]=this.a,n[1]=this.c,n[2]=this.tx,n[3]=this.b,n[4]=this.d,n[5]=this.ty,n[6]=0,n[7]=0,n[8]=1),n}apply(e,o){o=o||new qe;const n=e.x,i=e.y;return o.x=this.a*n+this.c*i+this.tx,o.y=this.b*n+this.d*i+this.ty,o}applyInverse(e,o){o=o||new qe;const n=this.a,i=this.b,r=this.c,s=this.d,l=this.tx,a=this.ty,c=1/(n*s+r*-i),u=e.x,p=e.y;return o.x=s*c*u+-r*c*p+(a*r-l*s)*c,o.y=n*c*p+-i*c*u+(-a*n+l*i)*c,o}translate(e,o){return this.tx+=e,this.ty+=o,this}scale(e,o){return this.a*=e,this.d*=o,this.c*=e,this.b*=o,this.tx*=e,this.ty*=o,this}rotate(e){const o=Math.cos(e),n=Math.sin(e),i=this.a,r=this.c,s=this.tx;return this.a=i*o-this.b*n,this.b=i*n+this.b*o,this.c=r*o-this.d*n,this.d=r*n+this.d*o,this.tx=s*o-this.ty*n,this.ty=s*n+this.ty*o,this}append(e){const o=this.a,n=this.b,i=this.c,r=this.d;return this.a=e.a*o+e.b*i,this.b=e.a*n+e.b*r,this.c=e.c*o+e.d*i,this.d=e.c*n+e.d*r,this.tx=e.tx*o+e.ty*i+this.tx,this.ty=e.tx*n+e.ty*r+this.ty,this}appendFrom(e,o){const n=e.a,i=e.b,r=e.c,s=e.d,l=e.tx,a=e.ty,c=o.a,u=o.b,p=o.c,y=o.d;return this.a=n*c+i*p,this.b=n*u+i*y,this.c=r*c+s*p,this.d=r*u+s*y,this.tx=l*c+a*p+o.tx,this.ty=l*u+a*y+o.ty,this}setTransform(e,o,n,i,r,s,l,a,c){return this.a=Math.cos(l+c)*r,this.b=Math.sin(l+c)*r,this.c=-Math.sin(l-a)*s,this.d=Math.cos(l-a)*s,this.tx=e-(n*this.a+i*this.c),this.ty=o-(n*this.b+i*this.d),this}prepend(e){const o=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const n=this.a,i=this.c;this.a=n*e.a+this.b*e.c,this.b=n*e.b+this.b*e.d,this.c=i*e.a+this.d*e.c,this.d=i*e.b+this.d*e.d}return this.tx=o*e.a+this.ty*e.c+e.tx,this.ty=o*e.b+this.ty*e.d+e.ty,this}decompose(e){const o=this.a,n=this.b,i=this.c,r=this.d,s=e.pivot,l=-Math.atan2(-i,r),a=Math.atan2(n,o),c=Math.abs(l+a);return c<1e-5||Math.abs(vz-c)<1e-5?(e.rotation=a,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=l,e.skew.y=a),e.scale.x=Math.sqrt(o*o+n*n),e.scale.y=Math.sqrt(i*i+r*r),e.position.x=this.tx+(s.x*o+s.y*i),e.position.y=this.ty+(s.x*n+s.y*r),e}invert(){const e=this.a,o=this.b,n=this.c,i=this.d,r=this.tx,s=e*i-o*n;return this.a=i/s,this.b=-o/s,this.c=-n/s,this.d=e/s,this.tx=(n*this.ty-i*r)/s,this.ty=-(e*this.ty-o*r)/s,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new le;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}equals(e){return e.a===this.a&&e.b===this.b&&e.c===this.c&&e.d===this.d&&e.tx===this.tx&&e.ty===this.ty}toString(){return`[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`}static get IDENTITY(){return Ez.identity()}static get shared(){return Sz.identity()}}const Sz=new le,Ez=new le,Sn=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],En=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],_n=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],Cn=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],Np=[],nx=[],ul=Math.sign;function _z(){for(let t=0;t<16;t++){const e=[];Np.push(e);for(let o=0;o<16;o++){const n=ul(Sn[t]*Sn[o]+_n[t]*En[o]),i=ul(En[t]*Sn[o]+Cn[t]*En[o]),r=ul(Sn[t]*_n[o]+_n[t]*Cn[o]),s=ul(En[t]*_n[o]+Cn[t]*Cn[o]);for(let l=0;l<16;l++)if(Sn[l]===n&&En[l]===i&&_n[l]===r&&Cn[l]===s){e.push(l);break}}}for(let t=0;t<16;t++){const e=new le;e.set(Sn[t],En[t],_n[t],Cn[t],0,0),nx.push(e)}}_z();const be={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:t=>Sn[t],uY:t=>En[t],vX:t=>_n[t],vY:t=>Cn[t],inv:t=>t&8?t&15:-t&7,add:(t,e)=>Np[t][e],sub:(t,e)=>Np[t][be.inv(e)],rotate180:t=>t^4,isVertical:t=>(t&3)===2,byDirection:(t,e)=>Math.abs(t)*2<=Math.abs(e)?e>=0?be.S:be.N:Math.abs(e)*2<=Math.abs(t)?t>0?be.E:be.W:e>0?t>0?be.SE:be.SW:t>0?be.NE:be.NW,matrixAppendRotationInv:(t,e,o=0,n=0)=>{const i=nx[be.inv(e)];i.tx=o,i.ty=n,t.append(i)}},pl=[new qe,new qe,new qe,new qe];class Te{constructor(e=0,o=0,n=0,i=0){this.type="rectangle",this.x=Number(e),this.y=Number(o),this.width=Number(n),this.height=Number(i)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}isEmpty(){return this.left===this.right||this.top===this.bottom}static get EMPTY(){return new Te(0,0,0,0)}clone(){return new Te(this.x,this.y,this.width,this.height)}copyFromBounds(e){return this.x=e.minX,this.y=e.minY,this.width=e.maxX-e.minX,this.height=e.maxY-e.minY,this}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,o){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&o>=this.y&&o<this.y+this.height}strokeContains(e,o,n){const{width:i,height:r}=this;if(i<=0||r<=0)return!1;const s=this.x,l=this.y,a=s-n/2,c=s+i+n/2,u=l-n/2,p=l+r+n/2,y=s+n/2,d=s+i-n/2,g=l+n/2,f=l+r-n/2;return e>=a&&e<=c&&o>=u&&o<=p&&!(e>y&&e<d&&o>g&&o<f)}intersects(e,o){if(!o){const S=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=S)return!1;const _=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>_}const n=this.left,i=this.right,r=this.top,s=this.bottom;if(i<=n||s<=r)return!1;const l=pl[0].set(e.left,e.top),a=pl[1].set(e.left,e.bottom),c=pl[2].set(e.right,e.top),u=pl[3].set(e.right,e.bottom);if(c.x<=l.x||a.y<=l.y)return!1;const p=Math.sign(o.a*o.d-o.b*o.c);if(p===0||(o.apply(l,l),o.apply(a,a),o.apply(c,c),o.apply(u,u),Math.max(l.x,a.x,c.x,u.x)<=n||Math.min(l.x,a.x,c.x,u.x)>=i||Math.max(l.y,a.y,c.y,u.y)<=r||Math.min(l.y,a.y,c.y,u.y)>=s))return!1;const y=p*(a.y-l.y),d=p*(l.x-a.x),g=y*n+d*r,f=y*i+d*r,b=y*n+d*s,h=y*i+d*s;if(Math.max(g,f,b,h)<=y*l.x+d*l.y||Math.min(g,f,b,h)>=y*u.x+d*u.y)return!1;const m=p*(l.y-c.y),k=p*(c.x-l.x),w=m*n+k*r,v=m*i+k*r,E=m*n+k*s,z=m*i+k*s;return!(Math.max(w,v,E,z)<=m*l.x+k*l.y||Math.min(w,v,E,z)>=m*u.x+k*u.y)}pad(e=0,o=e){return this.x-=e,this.y-=o,this.width+=e*2,this.height+=o*2,this}fit(e){const o=Math.max(this.x,e.x),n=Math.min(this.x+this.width,e.x+e.width),i=Math.max(this.y,e.y),r=Math.min(this.y+this.height,e.y+e.height);return this.x=o,this.width=Math.max(n-o,0),this.y=i,this.height=Math.max(r-i,0),this}ceil(e=1,o=.001){const n=Math.ceil((this.x+this.width-o)*e)/e,i=Math.ceil((this.y+this.height-o)*e)/e;return this.x=Math.floor((this.x+o)*e)/e,this.y=Math.floor((this.y+o)*e)/e,this.width=n-this.x,this.height=i-this.y,this}enlarge(e){const o=Math.min(this.x,e.x),n=Math.max(this.x+this.width,e.x+e.width),i=Math.min(this.y,e.y),r=Math.max(this.y+this.height,e.y+e.height);return this.x=o,this.width=n-o,this.y=i,this.height=r-i,this}getBounds(e){return e=e||new Te,e.copyFrom(this),e}toString(){return`[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`}}const Hc={default:-1};function je(t="default"){return Hc[t]===void 0&&(Hc[t]=-1),++Hc[t]}const Uh={},ue="8.0.0",Cz="8.3.4";function $(t,e,o=3){if(Uh[e])return;let n=new Error().stack;typeof n>"u"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`):(n=n.split(`
`).splice(o).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${t}`),console.warn(n),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`),console.warn(n))),Uh[e]=!0}const ix=()=>{};function Ca(t){return t+=t===0?1:0,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t+1}function Nh(t){return!(t&t-1)&&!!t}function Zz(t){const e={};for(const o in t)t[o]!==void 0&&(e[o]=t[o]);return e}const Lh=Object.create(null);function Az(t){const e=Lh[t];return e===void 0&&(Lh[t]=je("resource")),e}const rx=class sx extends Yt{constructor(e={}){super(),this._resourceType="textureSampler",this._touched=0,this._maxAnisotropy=1,this.destroyed=!1,e={...sx.defaultOptions,...e},this.addressMode=e.addressMode,this.addressModeU=e.addressModeU??this.addressModeU,this.addressModeV=e.addressModeV??this.addressModeV,this.addressModeW=e.addressModeW??this.addressModeW,this.scaleMode=e.scaleMode,this.magFilter=e.magFilter??this.magFilter,this.minFilter=e.minFilter??this.minFilter,this.mipmapFilter=e.mipmapFilter??this.mipmapFilter,this.lodMinClamp=e.lodMinClamp,this.lodMaxClamp=e.lodMaxClamp,this.compare=e.compare,this.maxAnisotropy=e.maxAnisotropy??1}set addressMode(e){this.addressModeU=e,this.addressModeV=e,this.addressModeW=e}get addressMode(){return this.addressModeU}set wrapMode(e){$(ue,"TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=e}get wrapMode(){return this.addressMode}set scaleMode(e){this.magFilter=e,this.minFilter=e,this.mipmapFilter=e}get scaleMode(){return this.magFilter}set maxAnisotropy(e){this._maxAnisotropy=Math.min(e,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get _resourceId(){return this._sharedResourceId||this._generateResourceId()}update(){this.emit("change",this),this._sharedResourceId=null}_generateResourceId(){const e=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._sharedResourceId=Az(e),this._resourceId}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this.removeAllListeners()}};rx.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};let Rz=rx;const lx=class ax extends Yt{constructor(e={}){super(),this.options=e,this.uid=je("textureSource"),this._resourceType="textureSource",this._resourceId=je("resource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm",this.dimension="2d",this.antialias=!1,this._touched=0,this._batchTick=-1,this._textureBindLocation=-1,e={...ax.defaultOptions,...e},this.label=e.label??"",this.resource=e.resource,this.autoGarbageCollect=e.autoGarbageCollect,this._resolution=e.resolution,e.width?this.pixelWidth=e.width*this._resolution:this.pixelWidth=this.resource?this.resourceWidth??1:1,e.height?this.pixelHeight=e.height*this._resolution:this.pixelHeight=this.resource?this.resourceHeight??1:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=e.format,this.dimension=e.dimensions,this.mipLevelCount=e.mipLevelCount,this.autoGenerateMipmaps=e.autoGenerateMipmaps,this.sampleCount=e.sampleCount,this.antialias=e.antialias,this.alphaMode=e.alphaMode,this.style=new Rz(Zz(e)),this.destroyed=!1,this._refreshPOT()}get source(){return this}get style(){return this._style}set style(e){this.style!==e&&(this._style?.off("change",this._onStyleChange,this),this._style=e,this._style?.on("change",this._onStyleChange,this),this._onStyleChange())}get addressMode(){return this._style.addressMode}set addressMode(e){this._style.addressMode=e}get repeatMode(){return this._style.addressMode}set repeatMode(e){this._style.addressMode=e}get magFilter(){return this._style.magFilter}set magFilter(e){this._style.magFilter=e}get minFilter(){return this._style.minFilter}set minFilter(e){this._style.minFilter=e}get mipmapFilter(){return this._style.mipmapFilter}set mipmapFilter(e){this._style.mipmapFilter=e}get lodMinClamp(){return this._style.lodMinClamp}set lodMinClamp(e){this._style.lodMinClamp=e}get lodMaxClamp(){return this._style.lodMaxClamp}set lodMaxClamp(e){this._style.lodMaxClamp=e}_onStyleChange(){this.emit("styleChange",this)}update(){if(this.resource){const e=this._resolution;if(this.resize(this.resourceWidth/e,this.resourceHeight/e))return}this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){this._resourceId=je("resource"),this.emit("change",this),this.emit("unload",this)}get resourceWidth(){const{resource:e}=this;return e.naturalWidth||e.videoWidth||e.displayWidth||e.width}get resourceHeight(){const{resource:e}=this;return e.naturalHeight||e.videoHeight||e.displayHeight||e.height}get resolution(){return this._resolution}set resolution(e){this._resolution!==e&&(this._resolution=e,this.width=this.pixelWidth/e,this.height=this.pixelHeight/e)}resize(e,o,n){n=n||this._resolution,e=e||this.width,o=o||this.height;const i=Math.round(e*n),r=Math.round(o*n);return this.width=i/n,this.height=r/n,this._resolution=n,this.pixelWidth===i&&this.pixelHeight===r?!1:(this._refreshPOT(),this.pixelWidth=i,this.pixelHeight=r,this.emit("resize",this),this._resourceId=je("resource"),this.emit("change",this),!0)}updateMipmaps(){this.autoGenerateMipmaps&&this.mipLevelCount>1&&this.emit("updateMipmaps",this)}set wrapMode(e){this._style.wrapMode=e}get wrapMode(){return this._style.wrapMode}set scaleMode(e){this._style.scaleMode=e}get scaleMode(){return this._style.scaleMode}_refreshPOT(){this.isPowerOfTwo=Nh(this.pixelWidth)&&Nh(this.pixelHeight)}static test(e){throw new Error("Unimplemented")}};lx.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"premultiply-alpha-on-upload",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,autoGarbageCollect:!1};let dt=lx;class Td extends dt{constructor(e){const o=e.resource||new Float32Array(e.width*e.height*4);let n=e.format;n||(o instanceof Float32Array?n="rgba32float":o instanceof Int32Array||o instanceof Uint32Array?n="rgba32uint":o instanceof Int16Array||o instanceof Uint16Array?n="rgba16uint":(o instanceof Int8Array,n="bgra8unorm")),super({...e,resource:o,format:n}),this.uploadMethodId="buffer"}static test(e){return e instanceof Int8Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array}}Td.extension=N.TextureSource;const $h=new le;class Pz{constructor(e,o){this.mapCoord=new le,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,typeof o>"u"?this.clampMargin=e.width<10?0:.5:this.clampMargin=o,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){this.texture!==e&&(this._texture?.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,o){o===void 0&&(o=e);const n=this.mapCoord;for(let i=0;i<e.length;i+=2){const r=e[i],s=e[i+1];o[i]=r*n.a+s*n.c+n.tx,o[i+1]=r*n.b+s*n.d+n.ty}return o}update(){const e=this._texture;this._updateID++;const o=e.uvs;this.mapCoord.set(o.x1-o.x0,o.y1-o.y0,o.x3-o.x0,o.y3-o.y0,o.x0,o.y0);const n=e.orig,i=e.trim;i&&($h.set(n.width/i.width,0,0,n.height/i.height,-i.x/i.width,-i.y/i.height),this.mapCoord.append($h));const r=e.source,s=this.uClampFrame,l=this.clampMargin/r._resolution,a=this.clampOffset/r._resolution;return s[0]=(e.frame.x+l+a)/r.width,s[1]=(e.frame.y+l+a)/r.height,s[2]=(e.frame.x+e.frame.width-l+a)/r.width,s[3]=(e.frame.y+e.frame.height-l+a)/r.height,this.uClampOffset[0]=this.clampOffset/r.pixelWidth,this.uClampOffset[1]=this.clampOffset/r.pixelHeight,this.isSimple=e.frame.width===r.width&&e.frame.height===r.height&&e.rotate===0,!0}}class V extends Yt{constructor({source:e,label:o,frame:n,orig:i,trim:r,defaultAnchor:s,defaultBorders:l,rotate:a,dynamic:c}={}){if(super(),this.uid=je("texture"),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=new Te,this.noFrame=!1,this.dynamic=!1,this.isTexture=!0,this.label=o,this.source=e?.source??new dt,this.noFrame=!n,n)this.frame.copyFrom(n);else{const{width:u,height:p}=this._source;this.frame.width=u,this.frame.height=p}this.orig=i||this.frame,this.trim=r,this.rotate=a??0,this.defaultAnchor=s,this.defaultBorders=l,this.destroyed=!1,this.dynamic=c||!1,this.updateUvs()}set source(e){this._source&&this._source.off("resize",this.update,this),this._source=e,e.on("resize",this.update,this),this.emit("update",this)}get source(){return this._source}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new Pz(this)),this._textureMatrix}get width(){return this.orig.width}get height(){return this.orig.height}updateUvs(){const{uvs:e,frame:o}=this,{width:n,height:i}=this._source,r=o.x/n,s=o.y/i,l=o.width/n,a=o.height/i;let c=this.rotate;if(c){const u=l/2,p=a/2,y=r+u,d=s+p;c=be.add(c,be.NW),e.x0=y+u*be.uX(c),e.y0=d+p*be.uY(c),c=be.add(c,2),e.x1=y+u*be.uX(c),e.y1=d+p*be.uY(c),c=be.add(c,2),e.x2=y+u*be.uX(c),e.y2=d+p*be.uY(c),c=be.add(c,2),e.x3=y+u*be.uX(c),e.y3=d+p*be.uY(c)}else e.x0=r,e.y0=s,e.x1=r+l,e.y1=s,e.x2=r+l,e.y2=s+a,e.x3=r,e.y3=s+a}destroy(e=!1){this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}update(){this.noFrame&&(this.frame.width=this._source.width,this.frame.height=this._source.height),this.updateUvs(),this.emit("update",this)}get baseTexture(){return $(ue,"Texture.baseTexture is now Texture.source"),this._source}}V.EMPTY=new V({label:"EMPTY",source:new dt({label:"EMPTY"})});V.EMPTY.destroy=ix;V.WHITE=new V({source:new Td({resource:new Uint8Array([255,255,255,255]),width:1,height:1,alphaMode:"premultiply-alpha-on-upload",label:"WHITE"}),label:"WHITE"});V.WHITE.destroy=ix;function Tz(t,e,o,n){const{width:i,height:r}=o.orig,s=o.trim;if(s){const l=s.width,a=s.height;t.minX=s.x-e._x*i-n,t.maxX=t.minX+l,t.minY=s.y-e._y*r-n,t.maxY=t.minY+a}else t.minX=-e._x*i-n,t.maxX=t.minX+i,t.minY=-e._y*r-n,t.maxY=t.minY+r}const Wh=new le;class co{constructor(e=1/0,o=1/0,n=-1/0,i=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=Wh,this.minX=e,this.minY=o,this.maxX=n,this.maxY=i}isEmpty(){return this.minX>this.maxX||this.minY>this.maxY}get rectangle(){this._rectangle||(this._rectangle=new Te);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):e.copyFromBounds(this),e}clear(){return this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=Wh,this}set(e,o,n,i){this.minX=e,this.minY=o,this.maxX=n,this.maxY=i}addFrame(e,o,n,i,r){r||(r=this.matrix);const s=r.a,l=r.b,a=r.c,c=r.d,u=r.tx,p=r.ty;let y=this.minX,d=this.minY,g=this.maxX,f=this.maxY,b=s*e+a*o+u,h=l*e+c*o+p;b<y&&(y=b),h<d&&(d=h),b>g&&(g=b),h>f&&(f=h),b=s*n+a*o+u,h=l*n+c*o+p,b<y&&(y=b),h<d&&(d=h),b>g&&(g=b),h>f&&(f=h),b=s*e+a*i+u,h=l*e+c*i+p,b<y&&(y=b),h<d&&(d=h),b>g&&(g=b),h>f&&(f=h),b=s*n+a*i+u,h=l*n+c*i+p,b<y&&(y=b),h<d&&(d=h),b>g&&(g=b),h>f&&(f=h),this.minX=y,this.minY=d,this.maxX=g,this.maxY=f}addRect(e,o){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height,o)}addBounds(e,o){this.addFrame(e.minX,e.minY,e.maxX,e.maxY,o)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const o=this.minX,n=this.minY,i=this.maxX,r=this.maxY,{a:s,b:l,c:a,d:c,tx:u,ty:p}=e;let y=s*o+a*n+u,d=l*o+c*n+p;this.minX=y,this.minY=d,this.maxX=y,this.maxY=d,y=s*i+a*n+u,d=l*i+c*n+p,this.minX=y<this.minX?y:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=y>this.maxX?y:this.maxX,this.maxY=d>this.maxY?d:this.maxY,y=s*o+a*r+u,d=l*o+c*r+p,this.minX=y<this.minX?y:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=y>this.maxX?y:this.maxX,this.maxY=d>this.maxY?d:this.maxY,y=s*i+a*r+u,d=l*i+c*r+p,this.minX=y<this.minX?y:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=y>this.maxX?y:this.maxX,this.maxY=d>this.maxY?d:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}fitBounds(e,o,n,i){return this.minX<e&&(this.minX=e),this.maxX>o&&(this.maxX=o),this.minY<n&&(this.minY=n),this.maxY>i&&(this.maxY=i),this}pad(e,o=e){return this.minX-=e,this.maxX+=e,this.minY-=o,this.maxY+=o,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new co(this.minX,this.minY,this.maxX,this.maxY)}scale(e,o=e){return this.minX*=e,this.minY*=o,this.maxX*=e,this.maxY*=o,this}get x(){return this.minX}set x(e){const o=this.maxX-this.minX;this.minX=e,this.maxX=e+o}get y(){return this.minY}set y(e){const o=this.maxY-this.minY;this.minY=e,this.maxY=e+o}get width(){return this.maxX-this.minX}set width(e){this.maxX=this.minX+e}get height(){return this.maxY-this.minY}set height(e){this.maxY=this.minY+e}get left(){return this.minX}get right(){return this.maxX}get top(){return this.minY}get bottom(){return this.maxY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,o,n,i){let r=this.minX,s=this.minY,l=this.maxX,a=this.maxY;i||(i=this.matrix);const c=i.a,u=i.b,p=i.c,y=i.d,d=i.tx,g=i.ty;for(let f=o;f<n;f+=2){const b=e[f],h=e[f+1],m=c*b+p*h+d,k=u*b+y*h+g;r=m<r?m:r,s=k<s?k:s,l=m>l?m:l,a=k>a?k:a}this.minX=r,this.minY=s,this.maxX=l,this.maxY=a}containsPoint(e,o){return this.minX<=e&&this.minY<=o&&this.maxX>=e&&this.maxY>=o}toString(){return`[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}var jz={grad:.9,turn:360,rad:360/(2*Math.PI)},ho=function(t){return typeof t=="string"?t.length>0:typeof t=="number"},Be=function(t,e,o){return e===void 0&&(e=0),o===void 0&&(o=Math.pow(10,e)),Math.round(o*t)/o+0},Tt=function(t,e,o){return e===void 0&&(e=0),o===void 0&&(o=1),t>o?o:t>e?t:e},cx=function(t){return(t=isFinite(t)?t%360:0)>0?t:t+360},Hh=function(t){return{r:Tt(t.r,0,255),g:Tt(t.g,0,255),b:Tt(t.b,0,255),a:Tt(t.a)}},Xc=function(t){return{r:Be(t.r),g:Be(t.g),b:Be(t.b),a:Be(t.a,3)}},Iz=/^#([0-9a-f]{3,8})$/i,yl=function(t){var e=t.toString(16);return e.length<2?"0"+e:e},ux=function(t){var e=t.r,o=t.g,n=t.b,i=t.a,r=Math.max(e,o,n),s=r-Math.min(e,o,n),l=s?r===e?(o-n)/s:r===o?2+(n-e)/s:4+(e-o)/s:0;return{h:60*(l<0?l+6:l),s:r?s/r*100:0,v:r/255*100,a:i}},px=function(t){var e=t.h,o=t.s,n=t.v,i=t.a;e=e/360*6,o/=100,n/=100;var r=Math.floor(e),s=n*(1-o),l=n*(1-(e-r)*o),a=n*(1-(1-e+r)*o),c=r%6;return{r:255*[n,l,s,s,a,n][c],g:255*[a,n,n,l,s,s][c],b:255*[s,s,a,n,n,l][c],a:i}},Xh=function(t){return{h:cx(t.h),s:Tt(t.s,0,100),l:Tt(t.l,0,100),a:Tt(t.a)}},Vh=function(t){return{h:Be(t.h),s:Be(t.s),l:Be(t.l),a:Be(t.a,3)}},qh=function(t){return px((o=(e=t).s,{h:e.h,s:(o*=((n=e.l)<50?n:100-n)/100)>0?2*o/(n+o)*100:0,v:n+o,a:e.a}));var e,o,n},es=function(t){return{h:(e=ux(t)).h,s:(i=(200-(o=e.s))*(n=e.v)/100)>0&&i<200?o*n/100/(i<=100?i:200-i)*100:0,l:i/2,a:e.a};var e,o,n,i},Fz=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Mz=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Oz=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Dz=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Lp={string:[[function(t){var e=Iz.exec(t);return e?(t=e[1]).length<=4?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:t.length===4?Be(parseInt(t[3]+t[3],16)/255,2):1}:t.length===6||t.length===8?{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:t.length===8?Be(parseInt(t.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(t){var e=Oz.exec(t)||Dz.exec(t);return e?e[2]!==e[4]||e[4]!==e[6]?null:Hh({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(t){var e=Fz.exec(t)||Mz.exec(t);if(!e)return null;var o,n,i=Xh({h:(o=e[1],n=e[2],n===void 0&&(n="deg"),Number(o)*(jz[n]||1)),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)});return qh(i)},"hsl"]],object:[[function(t){var e=t.r,o=t.g,n=t.b,i=t.a,r=i===void 0?1:i;return ho(e)&&ho(o)&&ho(n)?Hh({r:Number(e),g:Number(o),b:Number(n),a:Number(r)}):null},"rgb"],[function(t){var e=t.h,o=t.s,n=t.l,i=t.a,r=i===void 0?1:i;if(!ho(e)||!ho(o)||!ho(n))return null;var s=Xh({h:Number(e),s:Number(o),l:Number(n),a:Number(r)});return qh(s)},"hsl"],[function(t){var e=t.h,o=t.s,n=t.v,i=t.a,r=i===void 0?1:i;if(!ho(e)||!ho(o)||!ho(n))return null;var s=function(l){return{h:cx(l.h),s:Tt(l.s,0,100),v:Tt(l.v,0,100),a:Tt(l.a)}}({h:Number(e),s:Number(o),v:Number(n),a:Number(r)});return px(s)},"hsv"]]},Yh=function(t,e){for(var o=0;o<e.length;o++){var n=e[o][0](t);if(n)return[n,e[o][1]]}return[null,void 0]},Bz=function(t){return typeof t=="string"?Yh(t.trim(),Lp.string):typeof t=="object"&&t!==null?Yh(t,Lp.object):[null,void 0]},Vc=function(t,e){var o=es(t);return{h:o.h,s:Tt(o.s+100*e,0,100),l:o.l,a:o.a}},qc=function(t){return(299*t.r+587*t.g+114*t.b)/1e3/255},Qh=function(t,e){var o=es(t);return{h:o.h,s:o.s,l:Tt(o.l+100*e,0,100),a:o.a}},$p=function(){function t(e){this.parsed=Bz(e)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return t.prototype.isValid=function(){return this.parsed!==null},t.prototype.brightness=function(){return Be(qc(this.rgba),2)},t.prototype.isDark=function(){return qc(this.rgba)<.5},t.prototype.isLight=function(){return qc(this.rgba)>=.5},t.prototype.toHex=function(){return e=Xc(this.rgba),o=e.r,n=e.g,i=e.b,s=(r=e.a)<1?yl(Be(255*r)):"","#"+yl(o)+yl(n)+yl(i)+s;var e,o,n,i,r,s},t.prototype.toRgb=function(){return Xc(this.rgba)},t.prototype.toRgbString=function(){return e=Xc(this.rgba),o=e.r,n=e.g,i=e.b,(r=e.a)<1?"rgba("+o+", "+n+", "+i+", "+r+")":"rgb("+o+", "+n+", "+i+")";var e,o,n,i,r},t.prototype.toHsl=function(){return Vh(es(this.rgba))},t.prototype.toHslString=function(){return e=Vh(es(this.rgba)),o=e.h,n=e.s,i=e.l,(r=e.a)<1?"hsla("+o+", "+n+"%, "+i+"%, "+r+")":"hsl("+o+", "+n+"%, "+i+"%)";var e,o,n,i,r},t.prototype.toHsv=function(){return e=ux(this.rgba),{h:Be(e.h),s:Be(e.s),v:Be(e.v),a:Be(e.a,3)};var e},t.prototype.invert=function(){return eo({r:255-(e=this.rgba).r,g:255-e.g,b:255-e.b,a:e.a});var e},t.prototype.saturate=function(e){return e===void 0&&(e=.1),eo(Vc(this.rgba,e))},t.prototype.desaturate=function(e){return e===void 0&&(e=.1),eo(Vc(this.rgba,-e))},t.prototype.grayscale=function(){return eo(Vc(this.rgba,-1))},t.prototype.lighten=function(e){return e===void 0&&(e=.1),eo(Qh(this.rgba,e))},t.prototype.darken=function(e){return e===void 0&&(e=.1),eo(Qh(this.rgba,-e))},t.prototype.rotate=function(e){return e===void 0&&(e=15),this.hue(this.hue()+e)},t.prototype.alpha=function(e){return typeof e=="number"?eo({r:(o=this.rgba).r,g:o.g,b:o.b,a:e}):Be(this.rgba.a,3);var o},t.prototype.hue=function(e){var o=es(this.rgba);return typeof e=="number"?eo({h:e,s:o.s,l:o.l,a:o.a}):Be(o.h)},t.prototype.isEqual=function(e){return this.toHex()===eo(e).toHex()},t}(),eo=function(t){return t instanceof $p?t:new $p(t)},Kh=[],Gz=function(t){t.forEach(function(e){Kh.indexOf(e)<0&&(e($p,Lp),Kh.push(e))})};function Uz(t,e){var o={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},n={};for(var i in o)n[o[i]]=i;var r={};t.prototype.toName=function(s){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var l,a,c=n[this.toHex()];if(c)return c;if(s?.closest){var u=this.toRgb(),p=1/0,y="black";if(!r.length)for(var d in o)r[d]=new t(o[d]).toRgb();for(var g in o){var f=(l=u,a=r[g],Math.pow(l.r-a.r,2)+Math.pow(l.g-a.g,2)+Math.pow(l.b-a.b,2));f<p&&(p=f,y=g)}return y}},e.string.push([function(s){var l=s.toLowerCase(),a=l==="transparent"?"#0000":o[l];return a?new t(a).toRgb():null},"name"])}Gz([Uz]);const nr=class Ur{constructor(e=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=e}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(e){return this.value=e,this}set value(e){if(e instanceof Ur)this._value=this._cloneSource(e._value),this._int=e._int,this._components.set(e._components);else{if(e===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,e))&&(this._value=this._cloneSource(e),this._normalize(this._value))}}get value(){return this._value}_cloneSource(e){return typeof e=="string"||typeof e=="number"||e instanceof Number||e===null?e:Array.isArray(e)||ArrayBuffer.isView(e)?e.slice(0):typeof e=="object"&&e!==null?{...e}:e}_isSourceEqual(e,o){const n=typeof e;if(n!==typeof o)return!1;if(n==="number"||n==="string"||e instanceof Number)return e===o;if(Array.isArray(e)&&Array.isArray(o)||ArrayBuffer.isView(e)&&ArrayBuffer.isView(o))return e.length!==o.length?!1:e.every((r,s)=>r===o[s]);if(e!==null&&o!==null){const r=Object.keys(e),s=Object.keys(o);return r.length!==s.length?!1:r.every(l=>e[l]===o[l])}return e===o}toRgba(){const[e,o,n,i]=this._components;return{r:e,g:o,b:n,a:i}}toRgb(){const[e,o,n]=this._components;return{r:e,g:o,b:n}}toRgbaString(){const[e,o,n]=this.toUint8RgbArray();return`rgba(${e},${o},${n},${this.alpha})`}toUint8RgbArray(e){const[o,n,i]=this._components;return this._arrayRgb||(this._arrayRgb=[]),e=e||this._arrayRgb,e[0]=Math.round(o*255),e[1]=Math.round(n*255),e[2]=Math.round(i*255),e}toArray(e){this._arrayRgba||(this._arrayRgba=[]),e=e||this._arrayRgba;const[o,n,i,r]=this._components;return e[0]=o,e[1]=n,e[2]=i,e[3]=r,e}toRgbArray(e){this._arrayRgb||(this._arrayRgb=[]),e=e||this._arrayRgb;const[o,n,i]=this._components;return e[0]=o,e[1]=n,e[2]=i,e}toNumber(){return this._int}toBgrNumber(){const[e,o,n]=this.toUint8RgbArray();return(n<<16)+(o<<8)+e}toLittleEndianNumber(){const e=this._int;return(e>>16)+(e&65280)+((e&255)<<16)}multiply(e){const[o,n,i,r]=Ur._temp.setValue(e)._components;return this._components[0]*=o,this._components[1]*=n,this._components[2]*=i,this._components[3]*=r,this._refreshInt(),this._value=null,this}premultiply(e,o=!0){return o&&(this._components[0]*=e,this._components[1]*=e,this._components[2]*=e),this._components[3]=e,this._refreshInt(),this._value=null,this}toPremultiplied(e,o=!0){if(e===1)return(255<<24)+this._int;if(e===0)return o?0:this._int;let n=this._int>>16&255,i=this._int>>8&255,r=this._int&255;return o&&(n=n*e+.5|0,i=i*e+.5|0,r=r*e+.5|0),(e*255<<24)+(n<<16)+(i<<8)+r}toHex(){const e=this._int.toString(16);return`#${"000000".substring(0,6-e.length)+e}`}toHexa(){const o=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-o.length)+o}setAlpha(e){return this._components[3]=this._clamp(e),this}_normalize(e){let o,n,i,r;if((typeof e=="number"||e instanceof Number)&&e>=0&&e<=16777215){const s=e;o=(s>>16&255)/255,n=(s>>8&255)/255,i=(s&255)/255,r=1}else if((Array.isArray(e)||e instanceof Float32Array)&&e.length>=3&&e.length<=4)e=this._clamp(e),[o,n,i,r=1]=e;else if((e instanceof Uint8Array||e instanceof Uint8ClampedArray)&&e.length>=3&&e.length<=4)e=this._clamp(e,0,255),[o,n,i,r=255]=e,o/=255,n/=255,i/=255,r/=255;else if(typeof e=="string"||typeof e=="object"){if(typeof e=="string"){const l=Ur.HEX_PATTERN.exec(e);l&&(e=`#${l[2]}`)}const s=eo(e);s.isValid()&&({r:o,g:n,b:i,a:r}=s.rgba,o/=255,n/=255,i/=255)}if(o!==void 0)this._components[0]=o,this._components[1]=n,this._components[2]=i,this._components[3]=r,this._refreshInt();else throw new Error(`Unable to convert color ${e}`)}_refreshInt(){this._clamp(this._components);const[e,o,n]=this._components;this._int=(e*255<<16)+(o*255<<8)+(n*255|0)}_clamp(e,o=0,n=1){return typeof e=="number"?Math.min(Math.max(e,o),n):(e.forEach((i,r)=>{e[r]=Math.min(Math.max(i,o),n)}),e)}static isColorLike(e){return typeof e=="number"||typeof e=="string"||e instanceof Number||e instanceof Ur||Array.isArray(e)||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Float32Array||e.r!==void 0&&e.g!==void 0&&e.b!==void 0||e.r!==void 0&&e.g!==void 0&&e.b!==void 0&&e.a!==void 0||e.h!==void 0&&e.s!==void 0&&e.l!==void 0||e.h!==void 0&&e.s!==void 0&&e.l!==void 0&&e.a!==void 0||e.h!==void 0&&e.s!==void 0&&e.v!==void 0||e.h!==void 0&&e.s!==void 0&&e.v!==void 0&&e.a!==void 0}};nr.shared=new nr;nr._temp=new nr;nr.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;let Y=nr;const Nz={cullArea:null,cullable:!1,cullableChildren:!0};class jd{constructor(e,o){this._pool=[],this._count=0,this._index=0,this._classType=e,o&&this.prepopulate(o)}prepopulate(e){for(let o=0;o<e;o++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){let o;return this._index>0?o=this._pool[--this._index]:o=new this._classType,o.init?.(e),o}return(e){e.reset?.(),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._index}get totalUsed(){return this._count-this._index}clear(){this._pool.length=0,this._index=0}}class Lz{constructor(){this._poolsByClass=new Map}prepopulate(e,o){this.getPool(e).prepopulate(o)}get(e,o){return this.getPool(e).get(o)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new jd(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(o=>{const n=e[o._classType.name]?o._classType.name+o._classType.ID:o._classType.name;e[n]={free:o.totalFree,used:o.totalUsed,size:o.totalSize}}),e}}const Eo=new Lz;function $z(t,e,o){const n=t.length;let i;if(e>=n||o===0)return;o=e+o>n?n-e:o;const r=n-o;for(i=e;i<r;++i)t[i]=t[i+o];t.length=r}const Wz={allowChildren:!0,removeChildren(t=0,e){const o=e??this.children.length,n=o-t,i=[];if(n>0&&n<=o){for(let s=o-1;s>=t;s--){const l=this.children[s];l&&(i.push(l),l.parent=null)}$z(this.children,t,o);const r=this.renderGroup||this.parentRenderGroup;r&&r.removeChildren(i);for(let s=0;s<i.length;++s)this.emit("childRemoved",i[s],this,s),i[s].emit("removed",this);return i}else if(n===0&&this.children.length===0)return i;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(t){const e=this.getChildAt(t);return this.removeChild(e)},getChildAt(t){if(t<0||t>=this.children.length)throw new Error(`getChildAt: Index (${t}) does not exist.`);return this.children[t]},setChildIndex(t,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(t),this.addChildAt(t,e)},getChildIndex(t){const e=this.children.indexOf(t);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(t,e){this.allowChildren||$(ue,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:o}=this;if(e<0||e>o.length)throw new Error(`${t}addChildAt: The index ${e} supplied is out of bounds ${o.length}`);if(t.parent){const i=t.parent.children.indexOf(t);if(t.parent===this&&i===e)return t;i!==-1&&t.parent.children.splice(i,1)}e===o.length?o.push(t):o.splice(e,0,t),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t._updateFlags=15;const n=this.renderGroup||this.parentRenderGroup;return n&&n.addChild(t),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",t,this,e),t.emit("added",this),t},swapChildren(t,e){if(t===e)return;const o=this.getChildIndex(t),n=this.getChildIndex(e);this.children[o]=e,this.children[n]=t;const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0),this._didContainerChangeTick++},removeFromParent(){this.parent?.removeChild(this)},reparentChild(...t){return t.length===1?this.reparentChildAt(t[0],this.children.length):(t.forEach(e=>this.reparentChildAt(e,this.children.length)),t[0])},reparentChildAt(t,e){if(t.parent===this)return this.setChildIndex(t,e),t;const o=t.worldTransform.clone();t.removeFromParent(),this.addChildAt(t,e);const n=this.worldTransform.clone();return n.invert(),o.prepend(n),t.setFromMatrix(o),t}};class Jh{constructor(){this.pipe="filter",this.priority=1}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null,this.filterArea=null}}class Hz{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let o=0;o<this._tests.length;o++){const n=this._tests[o];if(n.test(e))return Eo.get(n.maskClass,e)}return e}returnMaskEffect(e){Eo.return(e)}}const Wp=new Hz;tt.handleByList(N.MaskEffect,Wp._effectClasses);const Xz={_maskEffect:null,_filterEffect:null,effects:[],addEffect(t){if(this.effects.indexOf(t)!==-1)return;this.effects.push(t),this.effects.sort((n,i)=>n.priority-i.priority);const o=this.renderGroup||this.parentRenderGroup;o&&(o.structureDidChange=!0),this._updateIsSimple()},removeEffect(t){const e=this.effects.indexOf(t);e!==-1&&(this.effects.splice(e,1),this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateIsSimple())},set mask(t){const e=this._maskEffect;e?.mask!==t&&(e&&(this.removeEffect(e),Wp.returnMaskEffect(e),this._maskEffect=null),t!=null&&(this._maskEffect=Wp.getMaskEffect(t),this.addEffect(this._maskEffect)))},get mask(){return this._maskEffect?.mask},set filters(t){!Array.isArray(t)&&t&&(t=[t]);const e=this._filterEffect||(this._filterEffect=new Jh);t=t;const o=t?.length>0,n=e.filters?.length>0,i=o!==n;t=Array.isArray(t)?t.slice(0):t,e.filters=Object.freeze(t),i&&(o?this.addEffect(e):(this.removeEffect(e),e.filters=t??null))},get filters(){return this._filterEffect?.filters},set filterArea(t){this._filterEffect||(this._filterEffect=new Jh),this._filterEffect.filterArea=t},get filterArea(){return this._filterEffect?.filterArea}},Vz={label:null,get name(){return $(ue,"Container.name property has been removed, use Container.label instead"),this.label},set name(t){$(ue,"Container.name property has been removed, use Container.label instead"),this.label=t},getChildByName(t,e=!1){return this.getChildByLabel(t,e)},getChildByLabel(t,e=!1){const o=this.children;for(let n=0;n<o.length;n++){const i=o[n];if(i.label===t||t instanceof RegExp&&t.test(i.label))return i}if(e)for(let n=0;n<o.length;n++){const r=o[n].getChildByLabel(t,!0);if(r)return r}return null},getChildrenByLabel(t,e=!1,o=[]){const n=this.children;for(let i=0;i<n.length;i++){const r=n[i];(r.label===t||t instanceof RegExp&&t.test(r.label))&&o.push(r)}if(e)for(let i=0;i<n.length;i++)n[i].getChildrenByLabel(t,!0,o);return o}},_o=new jd(le),ir=new jd(co);function yx(t,e,o){o.clear();let n,i;return t.parent?e?n=t.parent.worldTransform:(i=_o.get().identity(),n=Za(t,i)):n=le.IDENTITY,dx(t,o,n,e),i&&_o.return(i),o.isValid||o.set(0,0,0,0),o}function dx(t,e,o,n){if(!t.visible||!t.measurable)return;let i;n?i=t.worldTransform:(t.updateLocalTransform(),i=_o.get(),i.appendFrom(t.localTransform,o));const r=e,s=!!t.effects.length;if(s&&(e=ir.get().clear()),t.boundsArea)e.addRect(t.boundsArea,i);else{t.addBounds&&(e.matrix=i,t.addBounds(e));for(let l=0;l<t.children.length;l++)dx(t.children[l],e,i,n)}if(s){for(let l=0;l<t.effects.length;l++)t.effects[l].addBounds?.(e);r.addBounds(e,le.IDENTITY),ir.return(e)}n||_o.return(i)}function Za(t,e){const o=t.parent;return o&&(Za(o,e),o.updateLocalTransform(),e.append(o.localTransform)),e}let Yc=0;const eg=500;function Ie(...t){Yc!==eg&&(Yc++,Yc===eg?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...t))}function fx(t,e,o){return e.clear(),o||(o=le.IDENTITY),hx(t,e,o,t,!0),e.isValid||e.set(0,0,0,0),e}function hx(t,e,o,n,i){let r;if(i)r=_o.get(),r=o.copyTo(r);else{if(!t.visible||!t.measurable)return;t.updateLocalTransform();const a=t.localTransform;r=_o.get(),r.appendFrom(a,o)}const s=e,l=!!t.effects.length;if(l&&(e=ir.get().clear()),t.boundsArea)e.addRect(t.boundsArea,r);else{t.renderPipeId&&(e.matrix=r,t.addBounds(e));const a=t.children;for(let c=0;c<a.length;c++)hx(a[c],e,r,n,!1)}if(l){for(let a=0;a<t.effects.length;a++)t.effects[a].addLocalBounds?.(e,n);s.addBounds(e,le.IDENTITY),ir.return(e)}_o.return(r)}function gx(t,e){const o=t.children;for(let n=0;n<o.length;n++){const i=o[n],r=i.uid,s=(i._didViewChangeTick&65535)<<16|i._didContainerChangeTick&65535,l=e.index;(e.data[l]!==r||e.data[l+1]!==s)&&(e.data[e.index]=r,e.data[e.index+1]=s,e.didChange=!0),e.index=l+2,i.children.length&&gx(i,e)}return e.didChange}const qz=new le,Yz={_localBoundsCacheId:-1,_localBoundsCacheData:null,_setWidth(t,e){const o=Math.sign(this.scale.x)||1;e!==0?this.scale.x=t/e*o:this.scale.x=o},_setHeight(t,e){const o=Math.sign(this.scale.y)||1;e!==0?this.scale.y=t/e*o:this.scale.y=o},getLocalBounds(){this._localBoundsCacheData||(this._localBoundsCacheData={data:[],index:1,didChange:!1,localBounds:new co});const t=this._localBoundsCacheData;return t.index=1,t.didChange=!1,t.data[0]!==this._didViewChangeTick&&(t.didChange=!0,t.data[0]=this._didViewChangeTick),gx(this,t),t.didChange&&fx(this,t.localBounds,qz),t.localBounds},getBounds(t,e){return yx(this,t,e||new co)}},Qz={_onRender:null,set onRender(t){const e=this.renderGroup||this.parentRenderGroup;if(!t){this._onRender&&e?.removeOnRender(this),this._onRender=null;return}this._onRender||e?.addOnRender(this),this._onRender=t},get onRender(){return this._onRender}},Kz={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(t){this._zIndex!==t&&(this._zIndex=t,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(Jz))}};function Jz(t,e){return t._zIndex-e._zIndex}const e4={getGlobalPosition(t=new qe,e=!1){return this.parent?this.parent.toGlobal(this._position,t,e):(t.x=this._position.x,t.y=this._position.y),t},toGlobal(t,e,o=!1){if(!o){this.updateLocalTransform();const n=Za(this,new le);return n.append(this.localTransform),n.apply(t,e)}return this.worldTransform.apply(t,e)},toLocal(t,e,o,n){if(e&&(t=e.toGlobal(t,o,n)),!n){this.updateLocalTransform();const i=Za(this,new le);return i.append(this.localTransform),i.applyInverse(t,o)}return this.worldTransform.applyInverse(t,o)}};let t4=0;class mx{constructor(){this.uid=je("instructionSet"),this.instructions=[],this.instructionSize=0,this.renderables=[],this.tick=0}reset(){this.instructionSize=0,this.tick=t4++}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}}class o4{constructor(){this.renderPipeId="renderGroup",this.root=null,this.canBundle=!1,this.renderGroupParent=null,this.renderGroupChildren=[],this.worldTransform=new le,this.worldColorAlpha=4294967295,this.worldColor=16777215,this.worldAlpha=1,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new mx,this._onRenderContainers=[]}init(e){this.root=e,e._onRender&&this.addOnRender(e),e.didChange=!0;const o=e.children;for(let n=0;n<o.length;n++)this.addChild(o[n])}reset(){this.renderGroupChildren.length=0;for(const e in this.childrenToUpdate){const o=this.childrenToUpdate[e];o.list.fill(null),o.index=0}this.childrenRenderablesToUpdate.index=0,this.childrenRenderablesToUpdate.list.fill(null),this.root=null,this.updateTick=0,this.structureDidChange=!0,this._onRenderContainers.length=0,this.renderGroupParent=null}get localTransform(){return this.root.localTransform}addRenderGroupChild(e){e.renderGroupParent&&e.renderGroupParent._removeRenderGroupChild(e),e.renderGroupParent=this,this.renderGroupChildren.push(e)}_removeRenderGroupChild(e){const o=this.renderGroupChildren.indexOf(e);o>-1&&this.renderGroupChildren.splice(o,1),e.renderGroupParent=null}addChild(e){if(this.structureDidChange=!0,e.parentRenderGroup=this,e.updateTick=-1,e.parent===this.root?e.relativeRenderGroupDepth=1:e.relativeRenderGroupDepth=e.parent.relativeRenderGroupDepth+1,e.didChange=!0,this.onChildUpdate(e),e.renderGroup){this.addRenderGroupChild(e.renderGroup);return}e._onRender&&this.addOnRender(e);const o=e.children;for(let n=0;n<o.length;n++)this.addChild(o[n])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&(e.renderGroup||this.removeOnRender(e)),e.parentRenderGroup=null,e.renderGroup){this._removeRenderGroupChild(e.renderGroup);return}const o=e.children;for(let n=0;n<o.length;n++)this.removeChild(o[n])}removeChildren(e){for(let o=0;o<e.length;o++)this.removeChild(e[o])}onChildUpdate(e){let o=this.childrenToUpdate[e.relativeRenderGroupDepth];o||(o=this.childrenToUpdate[e.relativeRenderGroupDepth]={index:0,list:[]}),o.list[o.index++]=e}updateRenderable(e){e.globalDisplayStatus<7||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.renderPipeId].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}get isRenderable(){return this.root.localDisplayStatus===7&&this.worldAlpha>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(){for(let e=0;e<this._onRenderContainers.length;e++)this._onRenderContainers[e]._onRender()}destroy(){this.renderGroupParent=null,this.root=null,this.childrenRenderablesToUpdate=null,this.childrenToUpdate=null,this.renderGroupChildren=null,this._onRenderContainers=null,this.instructionSet=null}getChildren(e=[]){const o=this.root.children;for(let n=0;n<o.length;n++)this._getChildren(o[n],e);return e}_getChildren(e,o=[]){if(o.push(e),e.renderGroup)return o;const n=e.children;for(let i=0;i<n.length;i++)this._getChildren(n[i],o);return o}}function n4(t,e,o={}){for(const n in e)!o[n]&&e[n]!==void 0&&(t[n]=e[n])}const Qc=new st(null),Kc=new st(null),Jc=new st(null,1,1),tg=1,i4=2,eu=4;class ye extends Yt{constructor(e={}){super(),this.uid=je("renderable"),this._updateFlags=15,this.renderGroup=null,this.parentRenderGroup=null,this.parentRenderGroupIndex=0,this.didChange=!1,this.didViewUpdate=!1,this.relativeRenderGroupDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new le,this.relativeGroupTransform=new le,this.groupTransform=this.relativeGroupTransform,this.destroyed=!1,this._position=new st(this,0,0),this._scale=Jc,this._pivot=Kc,this._skew=Qc,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=16777215,this.localAlpha=1,this.groupAlpha=1,this.groupColor=16777215,this.groupColorAlpha=4294967295,this.localBlendMode="inherit",this.groupBlendMode="normal",this.localDisplayStatus=7,this.globalDisplayStatus=7,this._didContainerChangeTick=0,this._didViewChangeTick=0,this._didLocalTransformChangeId=-1,this.effects=[],n4(this,e,{children:!0,parent:!0,effects:!0}),e.children?.forEach(o=>this.addChild(o)),e.parent?.addChild(this)}static mixin(e){Object.defineProperties(ye.prototype,Object.getOwnPropertyDescriptors(e))}set _didChangeId(e){this._didViewChangeTick=e>>12&4095,this._didContainerChangeTick=e&4095}get _didChangeId(){return this._didContainerChangeTick&4095|(this._didViewChangeTick&4095)<<12}addChild(...e){if(this.allowChildren||$(ue,"addChild: Only Containers will be allowed to add children in v8.0.0"),e.length>1){for(let i=0;i<e.length;i++)this.addChild(e[i]);return e[0]}const o=e[0];if(o.parent===this)return this.children.splice(this.children.indexOf(o),1),this.children.push(o),this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),o;o.parent&&o.parent.removeChild(o),this.children.push(o),this.sortableChildren&&(this.sortDirty=!0),o.parent=this,o.didChange=!0,o.didViewUpdate=!1,o._updateFlags=15;const n=this.renderGroup||this.parentRenderGroup;return n&&n.addChild(o),this.emit("childAdded",o,this,this.children.length-1),o.emit("added",this),this._didViewChangeTick++,o._zIndex!==0&&o.depthOfChildModified(),o}removeChild(...e){if(e.length>1){for(let i=0;i<e.length;i++)this.removeChild(e[i]);return e[0]}const o=e[0],n=this.children.indexOf(o);return n>-1&&(this._didViewChangeTick++,this.children.splice(n,1),this.renderGroup?this.renderGroup.removeChild(o):this.parentRenderGroup&&this.parentRenderGroup.removeChild(o),o.parent=null,this.emit("childRemoved",o,this,n),o.emit("removed",this)),o}_onUpdate(e){e&&e===this._skew&&this._updateSkew(),this._didContainerChangeTick++,!this.didChange&&(this.didChange=!0,this.parentRenderGroup&&this.parentRenderGroup.onChildUpdate(this))}set isRenderGroup(e){!!this.renderGroup!==e&&(e?this.enableRenderGroup():this.disableRenderGroup())}get isRenderGroup(){return!!this.renderGroup}enableRenderGroup(){if(this.renderGroup)return;const e=this.parentRenderGroup;e?.removeChild(this),this.renderGroup=Eo.get(o4,this),this.groupTransform=le.IDENTITY,e?.addChild(this),this._updateIsSimple()}disableRenderGroup(){if(!this.renderGroup)return;const e=this.parentRenderGroup;e?.removeChild(this),Eo.return(this.renderGroup),this.renderGroup=null,this.groupTransform=this.relativeGroupTransform,e?.addChild(this),this._updateIsSimple()}_updateIsSimple(){this.isSimple=!this.renderGroup&&this.effects.length===0}get worldTransform(){return this._worldTransform||(this._worldTransform=new le),this.renderGroup?this._worldTransform.copyFrom(this.renderGroup.worldTransform):this.parentRenderGroup&&this._worldTransform.appendFrom(this.relativeGroupTransform,this.parentRenderGroup.worldTransform),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this._skew))}get angle(){return this.rotation*zz}set angle(e){this.rotation=e*or}get pivot(){return this._pivot===Kc&&(this._pivot=new st(this,0,0)),this._pivot}set pivot(e){this._pivot===Kc&&(this._pivot=new st(this,0,0)),typeof e=="number"?this._pivot.set(e):this._pivot.copyFrom(e)}get skew(){return this._skew===Qc&&(this._skew=new st(this,0,0)),this._skew}set skew(e){this._skew===Qc&&(this._skew=new st(this,0,0)),this._skew.copyFrom(e)}get scale(){return this._scale===Jc&&(this._scale=new st(this,1,1)),this._scale}set scale(e){this._scale===Jc&&(this._scale=new st(this,0,0)),typeof e=="number"?this._scale.set(e):this._scale.copyFrom(e)}get width(){return Math.abs(this.scale.x*this.getLocalBounds().width)}set width(e){const o=this.getLocalBounds().width;this._setWidth(e,o)}get height(){return Math.abs(this.scale.y*this.getLocalBounds().height)}set height(e){const o=this.getLocalBounds().height;this._setHeight(e,o)}getSize(e){e||(e={});const o=this.getLocalBounds();return e.width=Math.abs(this.scale.x*o.width),e.height=Math.abs(this.scale.y*o.height),e}setSize(e,o){const n=this.getLocalBounds();typeof e=="object"?(o=e.height??e.width,e=e.width):o??(o=e),e!==void 0&&this._setWidth(e,n.width),o!==void 0&&this._setHeight(o,n.height)}_updateSkew(){const e=this._rotation,o=this._skew;this._cx=Math.cos(e+o._y),this._sx=Math.sin(e+o._y),this._cy=-Math.sin(e-o._x),this._sy=Math.cos(e-o._x)}updateTransform(e){return this.position.set(typeof e.x=="number"?e.x:this.position.x,typeof e.y=="number"?e.y:this.position.y),this.scale.set(typeof e.scaleX=="number"?e.scaleX||1:this.scale.x,typeof e.scaleY=="number"?e.scaleY||1:this.scale.y),this.rotation=typeof e.rotation=="number"?e.rotation:this.rotation,this.skew.set(typeof e.skewX=="number"?e.skewX:this.skew.x,typeof e.skewY=="number"?e.skewY:this.skew.y),this.pivot.set(typeof e.pivotX=="number"?e.pivotX:this.pivot.x,typeof e.pivotY=="number"?e.pivotY:this.pivot.y),this}setFromMatrix(e){e.decompose(this)}updateLocalTransform(){const e=this._didContainerChangeTick;if(this._didLocalTransformChangeId===e)return;this._didLocalTransformChangeId=e;const o=this.localTransform,n=this._scale,i=this._pivot,r=this._position,s=n._x,l=n._y,a=i._x,c=i._y;o.a=this._cx*s,o.b=this._sx*s,o.c=this._cy*l,o.d=this._sy*l,o.tx=r._x-(a*o.a+c*o.c),o.ty=r._y-(a*o.b+c*o.d)}set alpha(e){e!==this.localAlpha&&(this.localAlpha=e,this._updateFlags|=tg,this._onUpdate())}get alpha(){return this.localAlpha}set tint(e){const n=Y.shared.setValue(e??16777215).toBgrNumber();n!==this.localColor&&(this.localColor=n,this._updateFlags|=tg,this._onUpdate())}get tint(){const e=this.localColor;return((e&255)<<16)+(e&65280)+(e>>16&255)}set blendMode(e){this.localBlendMode!==e&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=i4,this.localBlendMode=e,this._onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localDisplayStatus&2)}set visible(e){const o=e?2:0;(this.localDisplayStatus&2)!==o&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=eu,this.localDisplayStatus^=2,this._onUpdate())}get culled(){return!(this.localDisplayStatus&4)}set culled(e){const o=e?0:4;(this.localDisplayStatus&4)!==o&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=eu,this.localDisplayStatus^=4,this._onUpdate())}get renderable(){return!!(this.localDisplayStatus&1)}set renderable(e){const o=e?1:0;(this.localDisplayStatus&1)!==o&&(this._updateFlags|=eu,this.localDisplayStatus^=1,this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._onUpdate())}get isRenderable(){return this.localDisplayStatus===7&&this.groupAlpha>0}destroy(e=!1){if(this.destroyed)return;this.destroyed=!0;const o=this.removeChildren(0,this.children.length);if(this.removeFromParent(),this.parent=null,this._maskEffect=null,this._filterEffect=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed",this),this.removeAllListeners(),typeof e=="boolean"?e:e?.children)for(let i=0;i<o.length;++i)o[i].destroy(e);this.renderGroup?.destroy(),this.renderGroup=null}}ye.mixin(Wz);ye.mixin(e4);ye.mixin(Qz);ye.mixin(Yz);ye.mixin(Xz);ye.mixin(Vz);ye.mixin(Kz);ye.mixin(Nz);class bx extends ye{constructor(){super(...arguments),this.canBundle=!0,this.allowChildren=!1,this._roundPixels=0,this._lastUsed=0,this._lastInstructionTick=-1,this._bounds=new co(0,1,0,0),this._boundsDirty=!0}_updateBounds(){}get roundPixels(){return!!this._roundPixels}set roundPixels(e){this._roundPixels=e?1:0}containsPoint(e){const o=this.bounds,{x:n,y:i}=e;return n>=o.minX&&n<=o.maxX&&i>=o.minY&&i<=o.maxY}destroy(e){super.destroy(e),this._bounds=null}}class Xn extends bx{constructor(e=V.EMPTY){e instanceof V&&(e={texture:e});const{texture:o=V.EMPTY,anchor:n,roundPixels:i,width:r,height:s,...l}=e;super({label:"Sprite",...l}),this.renderPipeId="sprite",this.batched=!0,this._didSpriteUpdate=!1,this._sourceBounds={minX:0,maxX:1,minY:0,maxY:0},this._sourceBoundsDirty=!0,this._anchor=new st({_onUpdate:()=>{this.onViewUpdate()}}),n?this.anchor=n:o.defaultAnchor&&(this.anchor=o.defaultAnchor),this.texture=o,this.allowChildren=!1,this.roundPixels=i??!1,r!==void 0&&(this.width=r),s!==void 0&&(this.height=s)}static from(e,o=!1){return e instanceof V?new Xn(e):new Xn(V.from(e,o))}set texture(e){e||(e=V.EMPTY);const o=this._texture;o!==e&&(o&&o.dynamic&&o.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this._width&&this._setWidth(this._width,this._texture.orig.width),this._height&&this._setHeight(this._height,this._texture.orig.height),this.onViewUpdate())}get texture(){return this._texture}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get sourceBounds(){return this._sourceBoundsDirty&&(this._updateSourceBounds(),this._sourceBoundsDirty=!1),this._sourceBounds}containsPoint(e){const o=this.sourceBounds;return e.x>=o.maxX&&e.x<=o.minX&&e.y>=o.maxY&&e.y<=o.minY}addBounds(e){const o=this._texture.trim?this.sourceBounds:this.bounds;e.addFrame(o.minX,o.minY,o.maxX,o.maxY)}onViewUpdate(){if(this._didViewChangeTick++,this._didSpriteUpdate=!0,this._sourceBoundsDirty=this._boundsDirty=!0,this.didViewUpdate)return;this.didViewUpdate=!0;const e=this.renderGroup||this.parentRenderGroup;e&&e.onChildViewUpdate(this)}_updateBounds(){Tz(this._bounds,this._anchor,this._texture,0)}_updateSourceBounds(){const e=this._anchor,o=this._texture,n=this._sourceBounds,{width:i,height:r}=o.orig;n.maxX=-e._x*i,n.minX=n.maxX+i,n.maxY=-e._y*r,n.minY=n.maxY+r}destroy(e=!1){if(super.destroy(e),typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(n)}this._texture=null,this._bounds=null,this._sourceBounds=null,this._anchor=null}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get width(){return Math.abs(this.scale.x)*this._texture.orig.width}set width(e){this._setWidth(e,this._texture.orig.width),this._width=e}get height(){return Math.abs(this.scale.y)*this._texture.orig.height}set height(e){this._setHeight(e,this._texture.orig.height),this._height=e}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this._texture.orig.width,e.height=Math.abs(this.scale.y)*this._texture.orig.height,e}setSize(e,o){typeof e=="object"?(o=e.height??e.width,e=e.width):o??(o=e),e!==void 0&&this._setWidth(e,this._texture.orig.width),o!==void 0&&this._setHeight(o,this._texture.orig.height)}}const r4=new co;function xx(t,e,o){const n=r4;t.measurable=!0,yx(t,o,n),e.addBoundsMask(n),t.measurable=!1}function kx(t,e,o){const n=ir.get();t.measurable=!0;const i=_o.get().identity(),r=wx(t,o,i);fx(t,n,r),t.measurable=!1,e.addBoundsMask(n),_o.return(i),ir.return(n)}function wx(t,e,o){return t?(t!==e&&(wx(t.parent,e,o),t.updateLocalTransform(),o.append(t.localTransform)),o):(Ie("Mask bounds, renderable is not inside the root container"),o)}class vx{constructor(e){this.priority=0,this.pipe="alphaMask",e?.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Xn),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,o){xx(this.mask,e,o)}addLocalBounds(e,o){kx(this.mask,e,o)}containsPoint(e,o){const n=this.mask;return o(n,e)}destroy(){this.reset()}static test(e){return e instanceof Xn}}vx.extension=N.MaskEffect;class zx{constructor(e){this.priority=0,this.pipe="colorMask",e?.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}zx.extension=N.MaskEffect;class Sx{constructor(e){this.priority=0,this.pipe="stencilMask",e?.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,o){xx(this.mask,e,o)}addLocalBounds(e,o){kx(this.mask,e,o)}containsPoint(e,o){const n=this.mask;return o(n,e)}destroy(){this.reset()}static test(e){return e instanceof ye}}Sx.extension=N.MaskEffect;const s4={createCanvas:(t,e)=>{const o=document.createElement("canvas");return o.width=t,o.height=e,o},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>document.baseURI??window.location.href,getFontFaceSet:()=>document.fonts,fetch:(t,e)=>fetch(t,e),parseXML:t=>new DOMParser().parseFromString(t,"text/xml")};let og=s4;const ze={get(){return og},set(t){og=t}};class Id extends dt{constructor(e){e.resource||(e.resource=ze.get().createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),super(e),this.uploadMethodId="image",this.autoDensity=e.autoDensity;const o=e.resource;(this.pixelWidth!==o.width||this.pixelWidth!==o.height)&&this.resizeCanvas(),this.transparent=!!e.transparent}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),(this.resource.width!==this.pixelWidth||this.resource.height!==this.pixelHeight)&&(this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight)}resize(e=this.width,o=this.height,n=this._resolution){const i=super.resize(e,o,n);return i&&this.resizeCanvas(),i}static test(e){return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement||globalThis.OffscreenCanvas&&e instanceof OffscreenCanvas}get context2D(){return this._context2D||(this._context2D=this.resource.getContext("2d"))}}Id.extension=N.TextureSource;class ri extends dt{constructor(e){if(e.resource&&globalThis.HTMLImageElement&&e.resource instanceof HTMLImageElement){const o=ze.get().createCanvas(e.resource.width,e.resource.height);o.getContext("2d").drawImage(e.resource,0,0,e.resource.width,e.resource.height),e.resource=o,Ie("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.")}super(e),this.uploadMethodId="image",this.autoGarbageCollect=!0}static test(e){return globalThis.HTMLImageElement&&e instanceof HTMLImageElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||globalThis.VideoFrame&&e instanceof VideoFrame}}ri.extension=N.TextureSource;var Aa=(t=>(t[t.INTERACTION=50]="INTERACTION",t[t.HIGH=25]="HIGH",t[t.NORMAL=0]="NORMAL",t[t.LOW=-25]="LOW",t[t.UTILITY=-50]="UTILITY",t))(Aa||{});class tu{constructor(e,o=null,n=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=o,this.priority=n,this._once=i}match(e,o=null){return this._fn===e&&this._context===o}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const o=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),o}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const o=this.next;return this.next=e?null:o,this.previous=null,o}}const Ex=class gt{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new tu(null,null,1/0),this.deltaMS=1/gt.targetFPMS,this.elapsedMS=1/gt.targetFPMS,this._tick=e=>{this._requestId=null,this.started&&(this.update(e),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(e,o,n=Aa.NORMAL){return this._addListener(new tu(e,o,n))}addOnce(e,o,n=Aa.NORMAL){return this._addListener(new tu(e,o,n,!0))}_addListener(e){let o=this._head.next,n=this._head;if(!o)e.connect(n);else{for(;o;){if(e.priority>o.priority){e.connect(n);break}n=o,o=o.next}e.previous||e.connect(n)}return this._startIfPossible(),this}remove(e,o){let n=this._head.next;for(;n;)n.match(e,o)?n=n.destroy():n=n.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let e=0,o=this._head;for(;o=o.next;)e++;return e}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let e=this._head.next;for(;e;)e=e.destroy(!0);this._head.destroy(),this._head=null}}update(e=performance.now()){let o;if(e>this.lastTime){if(o=this.elapsedMS=e-this.lastTime,o>this._maxElapsedMS&&(o=this._maxElapsedMS),o*=this.speed,this._minElapsedMS){const r=e-this._lastFrame|0;if(r<this._minElapsedMS)return;this._lastFrame=e-r%this._minElapsedMS}this.deltaMS=o,this.deltaTime=this.deltaMS*gt.targetFPMS;const n=this._head;let i=n.next;for(;i;)i=i.emit(this);n.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=e}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(e){const o=Math.min(this.maxFPS,e),n=Math.min(Math.max(0,o)/1e3,gt.targetFPMS);this._maxElapsedMS=1/n}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(e){if(e===0)this._minElapsedMS=0;else{const o=Math.max(this.minFPS,e);this._minElapsedMS=1/(o/1e3)}}static get shared(){if(!gt._shared){const e=gt._shared=new gt;e.autoStart=!0,e._protected=!0}return gt._shared}static get system(){if(!gt._system){const e=gt._system=new gt;e.autoStart=!0,e._protected=!0}return gt._system}};Ex.targetFPMS=.06;let Xo=Ex,ou;async function _x(){return ou??(ou=(async()=>{const e=document.createElement("canvas").getContext("webgl");if(!e)return"premultiply-alpha-on-upload";const o=await new Promise(s=>{const l=document.createElement("video");l.onloadeddata=()=>s(l),l.onerror=()=>s(null),l.autoplay=!1,l.crossOrigin="anonymous",l.preload="auto",l.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",l.load()});if(!o)return"premultiply-alpha-on-upload";const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o);const r=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,r),e.deleteFramebuffer(i),e.deleteTexture(n),e.getExtension("WEBGL_lose_context")?.loseContext(),r[0]<=r[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),ou}const nc=class Cx extends dt{constructor(e){super(e),this.isReady=!1,this.uploadMethodId="video",e={...Cx.defaultOptions,...e},this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=e.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=e.autoPlay!==!1,this.alphaMode=e.alphaMode??"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onCanPlayThrough=this._onCanPlayThrough.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),e.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const e=Xo.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-e)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const e=this.resource,o=this.options;return(e.readyState===e.HAVE_ENOUGH_DATA||e.readyState===e.HAVE_FUTURE_DATA)&&e.width&&e.height&&(e.complete=!0),e.addEventListener("play",this._onPlayStart),e.addEventListener("pause",this._onPlayStop),e.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._mediaReady():(o.preload||e.addEventListener("canplay",this._onCanPlay),e.addEventListener("canplaythrough",this._onCanPlayThrough),e.addEventListener("error",this._onError,!0)),this.alphaMode=await _x(),this._load=new Promise((n,i)=>{this.isValid?n(this):(this._resolve=n,this._reject=i,o.preloadTimeoutMs!==void 0&&(this._preloadTimeout=setTimeout(()=>{this._onError(new ErrorEvent(`Preload exceeded timeout of ${o.preloadTimeoutMs}ms`))})),e.load())}),this._load}_onError(e){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",e),this._reject&&(this._reject(e),this._reject=null,this._resolve=null)}_isSourcePlaying(){const e=this.resource;return!e.paused&&!e.ended}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._mediaReady(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){this.resource.removeEventListener("canplay",this._onCanPlay),this._mediaReady()}_onCanPlayThrough(){this.resource.removeEventListener("canplaythrough",this._onCanPlay),this._preloadTimeout&&(clearTimeout(this._preloadTimeout),this._preloadTimeout=void 0),this._mediaReady()}_mediaReady(){const e=this.resource;this.isValid&&(this.isReady=!0,this.resize(e.videoWidth,e.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const e=this.resource;e&&(e.removeEventListener("play",this._onPlayStart),e.removeEventListener("pause",this._onPlayStop),e.removeEventListener("seeked",this._onSeeked),e.removeEventListener("canplay",this._onCanPlay),e.removeEventListener("canplaythrough",this._onCanPlayThrough),e.removeEventListener("error",this._onError,!0),e.pause(),e.src="",e.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(e){e!==this._updateFPS&&(this._updateFPS=e,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.resource.requestVideoFrameCallback?(this._isConnectedToTicker&&(Xo.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(Xo.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(Xo.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}static test(e){return globalThis.HTMLVideoElement&&e instanceof HTMLVideoElement}};nc.extension=N.TextureSource;nc.defaultOptions={...dt.defaultOptions,autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1};nc.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};let $l=nc;const $t=(t,e,o=!1)=>(Array.isArray(t)||(t=[t]),e?t.map(n=>typeof n=="string"||o?e(n):n):t);class l4{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){const o=this._cache.get(e);return o||Ie(`[Assets] Asset id ${e} was not found in the Cache`),o}set(e,o){const n=$t(e);let i;for(let a=0;a<this.parsers.length;a++){const c=this.parsers[a];if(c.test(o)){i=c.getCacheableAssets(n,o);break}}const r=new Map(Object.entries(i||{}));i||n.forEach(a=>{r.set(a,o)});const s=[...r.keys()],l={cacheKeys:s,keys:n};n.forEach(a=>{this._cacheMap.set(a,l)}),s.forEach(a=>{const c=i?i[a]:o;this._cache.has(a)&&this._cache.get(a)!==c&&Ie("[Cache] already has key:",a),this._cache.set(a,r.get(a))})}remove(e){if(!this._cacheMap.has(e)){Ie(`[Assets] Asset id ${e} was not found in the Cache`);return}const o=this._cacheMap.get(e);o.cacheKeys.forEach(i=>{this._cache.delete(i)}),o.keys.forEach(i=>{this._cacheMap.delete(i)})}get parsers(){return this._parsers}}const ke=new l4,Hp=[];tt.handleByList(N.TextureSource,Hp);function Zx(t={}){const e=t&&t.resource,o=e?t.resource:t,n=e?t:{resource:t};for(let i=0;i<Hp.length;i++){const r=Hp[i];if(r.test(o))return new r(n)}throw new Error(`Could not find a source type for resource: ${n.resource}`)}function a4(t={},e=!1){const o=t&&t.resource,n=o?t.resource:t,i=o?t:{resource:t};if(!e&&ke.has(n))return ke.get(n);const r=new V({source:Zx(i)});return r.on("destroy",()=>{ke.has(n)&&ke.remove(n)}),e||ke.set(n,r),r}function c4(t,e=!1){return typeof t=="string"?ke.get(t):t instanceof dt?new V({source:t}):a4(t,e)}V.from=c4;dt.from=Zx;tt.add(vx,zx,Sx,$l,ri,Id,Td);var hn=(t=>(t[t.Low=0]="Low",t[t.Normal=1]="Normal",t[t.High=2]="High",t))(hn||{});function Gt(t){if(typeof t!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(t)}`)}function Cr(t){return t.split("?")[0].split("#")[0]}function u4(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function p4(t,e,o){return t.replace(new RegExp(u4(e),"g"),o)}function y4(t,e){let o="",n=0,i=-1,r=0,s=-1;for(let l=0;l<=t.length;++l){if(l<t.length)s=t.charCodeAt(l);else{if(s===47)break;s=47}if(s===47){if(!(i===l-1||r===1))if(i!==l-1&&r===2){if(o.length<2||n!==2||o.charCodeAt(o.length-1)!==46||o.charCodeAt(o.length-2)!==46){if(o.length>2){const a=o.lastIndexOf("/");if(a!==o.length-1){a===-1?(o="",n=0):(o=o.slice(0,a),n=o.length-1-o.lastIndexOf("/")),i=l,r=0;continue}}else if(o.length===2||o.length===1){o="",n=0,i=l,r=0;continue}}}else o.length>0?o+=`/${t.slice(i+1,l)}`:o=t.slice(i+1,l),n=l-i-1;i=l,r=0}else s===46&&r!==-1?++r:r=-1}return o}const wt={toPosix(t){return p4(t,"\\","/")},isUrl(t){return/^https?:/.test(this.toPosix(t))},isDataUrl(t){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(t)},isBlobUrl(t){return t.startsWith("blob:")},hasProtocol(t){return/^[^/:]+:/.test(this.toPosix(t))},getProtocol(t){Gt(t),t=this.toPosix(t);const e=/^file:\/\/\//.exec(t);if(e)return e[0];const o=/^[^/:]+:\/{0,2}/.exec(t);return o?o[0]:""},toAbsolute(t,e,o){if(Gt(t),this.isDataUrl(t)||this.isBlobUrl(t))return t;const n=Cr(this.toPosix(e??ze.get().getBaseUrl())),i=Cr(this.toPosix(o??this.rootname(n)));return t=this.toPosix(t),t.startsWith("/")?wt.join(i,t.slice(1)):this.isAbsolute(t)?t:this.join(n,t)},normalize(t){if(Gt(t),t.length===0)return".";if(this.isDataUrl(t)||this.isBlobUrl(t))return t;t=this.toPosix(t);let e="";const o=t.startsWith("/");this.hasProtocol(t)&&(e=this.rootname(t),t=t.slice(e.length));const n=t.endsWith("/");return t=y4(t),t.length>0&&n&&(t+="/"),o?`/${t}`:e+t},isAbsolute(t){return Gt(t),t=this.toPosix(t),this.hasProtocol(t)?!0:t.startsWith("/")},join(...t){if(t.length===0)return".";let e;for(let o=0;o<t.length;++o){const n=t[o];if(Gt(n),n.length>0)if(e===void 0)e=n;else{const i=t[o-1]??"";this.joinExtensions.includes(this.extname(i).toLowerCase())?e+=`/../${n}`:e+=`/${n}`}}return e===void 0?".":this.normalize(e)},dirname(t){if(Gt(t),t.length===0)return".";t=this.toPosix(t);let e=t.charCodeAt(0);const o=e===47;let n=-1,i=!0;const r=this.getProtocol(t),s=t;t=t.slice(r.length);for(let l=t.length-1;l>=1;--l)if(e=t.charCodeAt(l),e===47){if(!i){n=l;break}}else i=!1;return n===-1?o?"/":this.isUrl(s)?r+t:r:o&&n===1?"//":r+t.slice(0,n)},rootname(t){Gt(t),t=this.toPosix(t);let e="";if(t.startsWith("/")?e="/":e=this.getProtocol(t),this.isUrl(t)){const o=t.indexOf("/",e.length);o!==-1?e=t.slice(0,o):e=t,e.endsWith("/")||(e+="/")}return e},basename(t,e){Gt(t),e&&Gt(e),t=Cr(this.toPosix(t));let o=0,n=-1,i=!0,r;if(e!==void 0&&e.length>0&&e.length<=t.length){if(e.length===t.length&&e===t)return"";let s=e.length-1,l=-1;for(r=t.length-1;r>=0;--r){const a=t.charCodeAt(r);if(a===47){if(!i){o=r+1;break}}else l===-1&&(i=!1,l=r+1),s>=0&&(a===e.charCodeAt(s)?--s===-1&&(n=r):(s=-1,n=l))}return o===n?n=l:n===-1&&(n=t.length),t.slice(o,n)}for(r=t.length-1;r>=0;--r)if(t.charCodeAt(r)===47){if(!i){o=r+1;break}}else n===-1&&(i=!1,n=r+1);return n===-1?"":t.slice(o,n)},extname(t){Gt(t),t=Cr(this.toPosix(t));let e=-1,o=0,n=-1,i=!0,r=0;for(let s=t.length-1;s>=0;--s){const l=t.charCodeAt(s);if(l===47){if(!i){o=s+1;break}continue}n===-1&&(i=!1,n=s+1),l===46?e===-1?e=s:r!==1&&(r=1):e!==-1&&(r=-1)}return e===-1||n===-1||r===0||r===1&&e===n-1&&e===o+1?"":t.slice(e,n)},parse(t){Gt(t);const e={root:"",dir:"",base:"",ext:"",name:""};if(t.length===0)return e;t=Cr(this.toPosix(t));let o=t.charCodeAt(0);const n=this.isAbsolute(t);let i;e.root=this.rootname(t),n||this.hasProtocol(t)?i=1:i=0;let r=-1,s=0,l=-1,a=!0,c=t.length-1,u=0;for(;c>=i;--c){if(o=t.charCodeAt(c),o===47){if(!a){s=c+1;break}continue}l===-1&&(a=!1,l=c+1),o===46?r===-1?r=c:u!==1&&(u=1):r!==-1&&(u=-1)}return r===-1||l===-1||u===0||u===1&&r===l-1&&r===s+1?l!==-1&&(s===0&&n?e.base=e.name=t.slice(1,l):e.base=e.name=t.slice(s,l)):(s===0&&n?(e.name=t.slice(1,r),e.base=t.slice(1,l)):(e.name=t.slice(s,r),e.base=t.slice(s,l)),e.ext=t.slice(r,l)),e.dir=this.dirname(t),e},sep:"/",delimiter:":",joinExtensions:[".html"]};function Ax(t,e,o,n,i){const r=e[o];for(let s=0;s<r.length;s++){const l=r[s];o<e.length-1?Ax(t.replace(n[o],l),e,o+1,n,i):i.push(t.replace(n[o],l))}}function d4(t){const e=/\{(.*?)\}/g,o=t.match(e),n=[];if(o){const i=[];o.forEach(r=>{const s=r.substring(1,r.length-1).split(",");i.push(s)}),Ax(t,i,0,o,n)}else n.push(t);return n}const Ra=t=>!Array.isArray(t);class yr{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,o)=>`${e}${this._bundleIdConnector}${o}`,extractAssetIdFromBundle:(e,o)=>o.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){if(this._bundleIdConnector=e.connector??this._bundleIdConnector,this._createBundleAssetId=e.createBundleAssetId??this._createBundleAssetId,this._extractAssetIdFromBundle=e.extractAssetIdFromBundle??this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(o=>{this._preferredOrder.push(o),o.priority||(o.priority=Object.keys(o.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const o=e;this._defaultSearchParams=Object.keys(o).map(n=>`${encodeURIComponent(n)}=${encodeURIComponent(o[n])}`).join("&")}}getAlias(e){const{alias:o,src:n}=e;return $t(o||n,r=>typeof r=="string"?r:Array.isArray(r)?r.map(s=>s?.src??s):r?.src?r.src:r,!0)}addManifest(e){this._manifest&&Ie("[Resolver] Manifest already exists, this will be overwritten"),this._manifest=e,e.bundles.forEach(o=>{this.addBundle(o.name,o.assets)})}addBundle(e,o){const n=[];let i=o;Array.isArray(o)||(i=Object.entries(o).map(([r,s])=>typeof s=="string"||Array.isArray(s)?{alias:r,src:s}:{alias:r,...s})),i.forEach(r=>{const s=r.src,l=r.alias;let a;if(typeof l=="string"){const c=this._createBundleAssetId(e,l);n.push(c),a=[l,c]}else{const c=l.map(u=>this._createBundleAssetId(e,u));n.push(...c),a=[...l,...c]}this.add({...r,alias:a,src:s})}),this._bundles[e]=n}add(e){const o=[];Array.isArray(e)?o.push(...e):o.push(e);let n;n=r=>{this.hasKey(r)&&Ie(`[Resolver] already has key: ${r} overwriting`)},$t(o).forEach(r=>{const{src:s}=r;let{data:l,format:a,loadParser:c}=r;const u=$t(s).map(d=>typeof d=="string"?d4(d):Array.isArray(d)?d:[d]),p=this.getAlias(r);Array.isArray(p)?p.forEach(n):n(p);const y=[];u.forEach(d=>{d.forEach(g=>{let f={};if(typeof g!="object"){f.src=g;for(let b=0;b<this._parsers.length;b++){const h=this._parsers[b];if(h.test(g)){f=h.parse(g);break}}}else l=g.data??l,a=g.format??a,c=g.loadParser??c,f={...f,...g};if(!p)throw new Error(`[Resolver] alias is undefined for this asset: ${f.src}`);f=this._buildResolvedAsset(f,{aliases:p,data:l,format:a,loadParser:c}),y.push(f)})}),p.forEach(d=>{this._assetMap[d]=y})})}resolveBundle(e){const o=Ra(e);e=$t(e);const n={};return e.forEach(i=>{const r=this._bundles[i];if(r){const s=this.resolve(r),l={};for(const a in s){const c=s[a];l[this._extractAssetIdFromBundle(i,a)]=c}n[i]=l}}),o?n[e[0]]:n}resolveUrl(e){const o=this.resolve(e);if(typeof e!="string"){const n={};for(const i in o)n[i]=o[i].src;return n}return o.src}resolve(e){const o=Ra(e);e=$t(e);const n={};return e.forEach(i=>{if(!this._resolverHash[i])if(this._assetMap[i]){let r=this._assetMap[i];const s=this._getPreferredOrder(r);s?.priority.forEach(l=>{s.params[l].forEach(a=>{const c=r.filter(u=>u[l]?u[l]===a:!1);c.length&&(r=c)})}),this._resolverHash[i]=r[0]}else this._resolverHash[i]=this._buildResolvedAsset({alias:[i],src:i},{});n[i]=this._resolverHash[i]}),o?n[e[0]]:n}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let o=0;o<e.length;o++){const n=e[0],i=this._preferredOrder.find(r=>r.params.format.includes(n.format));if(i)return i}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const o=/\?/.test(e)?"&":"?";return`${e}${o}${this._defaultSearchParams}`}_buildResolvedAsset(e,o){const{aliases:n,data:i,loadParser:r,format:s}=o;return(this._basePath||this._rootPath)&&(e.src=wt.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=n??e.alias??[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data={...i||{},...e.data},e.loadParser=r??e.loadParser,e.format=s??e.format??f4(e.src),e}}yr.RETINA_PREFIX=/@([0-9\.]+)x/;function f4(t){return t.split(".").pop().split("?").shift().split("#").shift()}const Xp=(t,e)=>{const o=e.split("?")[1];return o&&(t+=`?${o}`),t},Rx=class Nr{constructor(e,o){this.linkedSheets=[],this._texture=e instanceof V?e:null,this.textureSource=e.source,this.textures={},this.animations={},this.data=o;const n=parseFloat(o.meta.scale);n?(this.resolution=n,e.source.resolution=this.resolution):this.resolution=e.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(e=>{this._callback=e,this._batchIndex=0,this._frameKeys.length<=Nr.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(e){let o=e;const n=Nr.BATCH_SIZE;for(;o-e<n&&o<this._frameKeys.length;){const i=this._frameKeys[o],r=this._frames[i],s=r.frame;if(s){let l=null,a=null;const c=r.trimmed!==!1&&r.sourceSize?r.sourceSize:r.frame,u=new Te(0,0,Math.floor(c.w)/this.resolution,Math.floor(c.h)/this.resolution);r.rotated?l=new Te(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):l=new Te(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),r.trimmed!==!1&&r.spriteSourceSize&&(a=new Te(Math.floor(r.spriteSourceSize.x)/this.resolution,Math.floor(r.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution)),this.textures[i]=new V({source:this.textureSource,frame:l,orig:u,trim:a,rotate:r.rotated?2:0,defaultAnchor:r.anchor,defaultBorders:r.borders,label:i.toString()})}o++}}_processAnimations(){const e=this.data.animations||{};for(const o in e){this.animations[o]=[];for(let n=0;n<e[o].length;n++){const i=e[o][n];this.animations[o].push(this.textures[i])}}}_parseComplete(){const e=this._callback;this._callback=null,this._batchIndex=0,e.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*Nr.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*Nr.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(e=!1){for(const o in this.textures)this.textures[o].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,e&&(this._texture?.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};Rx.BATCH_SIZE=1e3;let Vp=Rx;const h4=["jpg","png","jpeg","avif","webp","basis","etc2","bc7","bc6h","bc5","bc4","bc3","bc2","bc1","eac","astc"];function Px(t,e,o){const n={};if(t.forEach(i=>{n[i]=e}),Object.keys(e.textures).forEach(i=>{n[i]=e.textures[i]}),!o){const i=wt.dirname(t[0]);e.linkedSheets.forEach((r,s)=>{const l=Px([`${i}/${e.data.meta.related_multi_packs[s]}`],r,!0);Object.assign(n,l)})}return n}const g4={extension:N.Asset,cache:{test:t=>t instanceof Vp,getCacheableAssets:(t,e)=>Px(t,e,!1)},resolver:{extension:{type:N.ResolveParser,name:"resolveSpritesheet"},test:t=>{const o=t.split("?")[0].split("."),n=o.pop(),i=o.pop();return n==="json"&&h4.includes(i)},parse:t=>{const e=t.split(".");return{resolution:parseFloat(yr.RETINA_PREFIX.exec(t)?.[1]??"1"),format:e[e.length-2],src:t}}},loader:{name:"spritesheetLoader",extension:{type:N.LoadParser,priority:hn.Normal,name:"spritesheetLoader"},async testParse(t,e){return wt.extname(e.src).toLowerCase()===".json"&&!!t.frames},async parse(t,e,o){const{texture:n,imageFilename:i}=e?.data??{};let r=wt.dirname(e.src);r&&r.lastIndexOf("/")!==r.length-1&&(r+="/");let s;if(n instanceof V)s=n;else{const c=Xp(r+(i??t.meta.image),e.src);s=(await o.load([c]))[c]}const l=new Vp(s.source,t);await l.parse();const a=t?.meta?.related_multi_packs;if(Array.isArray(a)){const c=[];for(const p of a){if(typeof p!="string")continue;let y=r+p;e.data?.ignoreMultiPack||(y=Xp(y,e.src),c.push(o.load({src:y,data:{ignoreMultiPack:!0}})))}const u=await Promise.all(c);l.linkedSheets=u,u.forEach(p=>{p.linkedSheets=[l].concat(l.linkedSheets.filter(y=>y!==p))})}return l},async unload(t,e,o){await o.unload(t.textureSource._sourceOrigin),t.destroy(!1)}}};tt.add(g4);const nu=Object.create(null),ng=Object.create(null);function Fd(t,e){let o=ng[t];return o===void 0&&(nu[e]===void 0&&(nu[e]=1),ng[t]=o=nu[e]++),o}let dl;function Tx(){return(!dl||dl?.isContextLost())&&(dl=ze.get().createCanvas().getContext("webgl",{})),dl}let fl;function m4(){if(!fl){fl="mediump";const t=Tx();t&&t.getShaderPrecisionFormat&&(fl=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision?"highp":"mediump")}return fl}function b4(t,e,o){return e?t:o?(t=t.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${t}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${t}
        `}function x4(t,e,o){const n=o?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(t.substring(0,9)!=="precision"){let i=o?e.requestedFragmentPrecision:e.requestedVertexPrecision;return i==="highp"&&n!=="highp"&&(i="mediump"),`precision ${i} float;
${t}`}else if(n!=="highp"&&t.substring(0,15)==="precision highp")return t.replace("precision highp","precision mediump");return t}function k4(t,e){return e?`#version 300 es
${t}`:t}const w4={},v4={};function z4(t,{name:e="pixi-program"},o=!0){e=e.replace(/\s+/g,"-"),e+=o?"-fragment":"-vertex";const n=o?w4:v4;return n[e]?(n[e]++,e+=`-${n[e]}`):n[e]=1,t.indexOf("#define SHADER_NAME")!==-1?t:`${`#define SHADER_NAME ${e}`}
${t}`}function S4(t,e){return e?t.replace("#version 300 es",""):t}const iu={stripVersion:S4,ensurePrecision:x4,addProgramDefines:b4,setProgramName:z4,insertVersion:k4},ru=Object.create(null),jx=class qp{constructor(e){e={...qp.defaultOptions,...e};const o=e.fragment.indexOf("#version 300 es")!==-1,n={stripVersion:o,ensurePrecision:{requestedFragmentPrecision:e.preferredFragmentPrecision,requestedVertexPrecision:e.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:m4()},setProgramName:{name:e.name},addProgramDefines:o,insertVersion:o};let i=e.fragment,r=e.vertex;Object.keys(iu).forEach(s=>{const l=n[s];i=iu[s](i,l,!0),r=iu[s](r,l,!1)}),this.fragment=i,this.vertex=r,this._key=Fd(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(e){const o=`${e.vertex}:${e.fragment}`;return ru[o]||(ru[o]=new qp(e)),ru[o]}};jx.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let oe=jx;const ig={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function E4(t){return ig[t]??ig.float32}const _4={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function C4({source:t,entryPoint:e}){const o={},n=t.indexOf(`fn ${e}`);if(n!==-1){const i=t.indexOf("->",n);if(i!==-1){const r=t.substring(n,i),s=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let l;for(;(l=s.exec(r))!==null;){const a=_4[l[3]]??"float32";o[l[2]]={location:parseInt(l[1],10),format:a,stride:E4(a).stride,offset:0,instance:!1,start:0}}}}return o}function su(t){const e=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,o=/@group\((\d+)\)/,n=/@binding\((\d+)\)/,i=/var(<[^>]+>)? (\w+)/,r=/:\s*(\w+)/,s=/struct\s+(\w+)\s*{([^}]+)}/g,l=/(\w+)\s*:\s*([\w\<\>]+)/g,a=/struct\s+(\w+)/,c=t.match(e)?.map(p=>({group:parseInt(p.match(o)[1],10),binding:parseInt(p.match(n)[1],10),name:p.match(i)[2],isUniform:p.match(i)[1]==="<uniform>",type:p.match(r)[1]}));if(!c)return{groups:[],structs:[]};const u=t.match(s)?.map(p=>{const y=p.match(a)[1],d=p.match(l).reduce((g,f)=>{const[b,h]=f.split(":");return g[b.trim()]=h.trim(),g},{});return d?{name:y,members:d}:null}).filter(({name:p})=>c.some(y=>y.type===p))??[];return{groups:c,structs:u}}var Lr=(t=>(t[t.VERTEX=1]="VERTEX",t[t.FRAGMENT=2]="FRAGMENT",t[t.COMPUTE=4]="COMPUTE",t))(Lr||{});function Z4({groups:t}){const e=[];for(let o=0;o<t.length;o++){const n=t[o];e[n.group]||(e[n.group]=[]),n.isUniform?e[n.group].push({binding:n.binding,visibility:Lr.VERTEX|Lr.FRAGMENT,buffer:{type:"uniform"}}):n.type==="sampler"?e[n.group].push({binding:n.binding,visibility:Lr.FRAGMENT,sampler:{type:"filtering"}}):n.type==="texture_2d"&&e[n.group].push({binding:n.binding,visibility:Lr.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function A4({groups:t}){const e=[];for(let o=0;o<t.length;o++){const n=t[o];e[n.group]||(e[n.group]={}),e[n.group][n.name]=n.binding}return e}function R4(t,e){const o=new Set,n=new Set,i=[...t.structs,...e.structs].filter(s=>o.has(s.name)?!1:(o.add(s.name),!0)),r=[...t.groups,...e.groups].filter(s=>{const l=`${s.name}-${s.binding}`;return n.has(l)?!1:(n.add(l),!0)});return{structs:i,groups:r}}const lu=Object.create(null);class te{constructor(e){this._layoutKey=0,this._attributeLocationsKey=0;const{fragment:o,vertex:n,layout:i,gpuLayout:r,name:s}=e;if(this.name=s,this.fragment=o,this.vertex=n,o.source===n.source){const l=su(o.source);this.structsAndGroups=l}else{const l=su(n.source),a=su(o.source);this.structsAndGroups=R4(l,a)}this.layout=i??A4(this.structsAndGroups),this.gpuLayout=r??Z4(this.structsAndGroups),this.autoAssignGlobalUniforms=this.layout[0]?.globalUniforms!==void 0,this.autoAssignLocalUniforms=this.layout[1]?.localUniforms!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:e,fragment:o}=this,n=e.source+o.source+e.entryPoint+o.entryPoint;this._layoutKey=Fd(n,"program")}get attributeData(){return this._attributeData??(this._attributeData=C4(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(e){const o=`${e.vertex.source}:${e.fragment.source}:${e.fragment.entryPoint}:${e.vertex.entryPoint}`;return lu[o]||(lu[o]=new te(e)),lu[o]}}const Ix=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>"],P4=Ix.reduce((t,e)=>(t[e]=!0,t),{});function T4(t,e){switch(t){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const Fx=class Mx{constructor(e,o){this._touched=0,this.uid=je("uniform"),this._resourceType="uniformGroup",this._resourceId=je("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,o={...Mx.defaultOptions,...o},this.uniformStructures=e;const n={};for(const i in e){const r=e[i];if(r.name=i,r.size=r.size??1,!P4[r.type])throw new Error(`Uniform type ${r.type} is not supported. Supported uniform types are: ${Ix.join(", ")}`);r.value??(r.value=T4(r.type,r.size)),n[i]=r.value}this.uniforms=n,this._dirtyId=1,this.ubo=o.ubo,this.isStatic=o.isStatic,this._signature=Fd(Object.keys(n).map(i=>`${i}-${e[i].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};Fx.defaultOptions={ubo:!1,isStatic:!1};let Md=Fx;class Wl{constructor(e){this.resources=Object.create(null),this._dirty=!0;let o=0;for(const n in e){const i=e[n];this.setResource(i,o++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let o=0;for(const n in this.resources)e[o++]=this.resources[n]._resourceId;this._key=e.join("|")}setResource(e,o){const n=this.resources[o];e!==n&&(n&&e.off?.("change",this.onResourceChange,this),e.on?.("change",this.onResourceChange,this),this.resources[o]=e,this._dirty=!0)}getResource(e){return this.resources[e]}_touch(e){const o=this.resources;for(const n in o)o[n]._touched=e}destroy(){const e=this.resources;for(const o in e)e[o].off?.("change",this.onResourceChange,this);this.resources=null}onResourceChange(e){if(this._dirty=!0,e.destroyed){const o=this.resources;for(const n in o)o[n]===e&&(o[n]=null)}else this._updateKey()}}var Pa=(t=>(t[t.WEBGL=1]="WEBGL",t[t.WEBGPU=2]="WEBGPU",t[t.BOTH=3]="BOTH",t))(Pa||{});class ic extends Yt{constructor(e){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:o,glProgram:n,groups:i,resources:r,compatibleRenderers:s,groupMap:l}=e;this.gpuProgram=o,this.glProgram=n,s===void 0&&(s=0,o&&(s|=Pa.WEBGPU),n&&(s|=Pa.WEBGL)),this.compatibleRenderers=s;const a={};if(!r&&!i&&(r={}),r&&i)throw new Error("[Shader] Cannot have both resources and groups");if(!o&&i&&!l)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!o&&i&&l)for(const c in l)for(const u in l[c]){const p=l[c][u];a[p]={group:c,binding:u,name:p}}else if(o&&i&&!l){const c=o.structsAndGroups.groups;l={},c.forEach(u=>{l[u.group]=l[u.group]||{},l[u.group][u.binding]=u.name,a[u.name]=u})}else if(r){i={},l={},o&&o.structsAndGroups.groups.forEach(p=>{l[p.group]=l[p.group]||{},l[p.group][p.binding]=p.name,a[p.name]=p});let c=0;for(const u in r)a[u]||(i[99]||(i[99]=new Wl,this._ownedBindGroups.push(i[99])),a[u]={group:99,binding:c,name:u},l[99]=l[99]||{},l[99][c]=u,c++);for(const u in r){const p=u;let y=r[u];!y.source&&!y._resourceType&&(y=new Md(y));const d=a[p];d&&(i[d.group]||(i[d.group]=new Wl,this._ownedBindGroups.push(i[d.group])),i[d.group].setResource(y,d.binding))}}this.groups=i,this._uniformBindMap=l,this.resources=this._buildResourceAccessor(i,a)}addResource(e,o,n){var i,r;(i=this._uniformBindMap)[o]||(i[o]={}),(r=this._uniformBindMap[o])[n]||(r[n]=e),this.groups[o]||(this.groups[o]=new Wl,this._ownedBindGroups.push(this.groups[o]))}_buildResourceAccessor(e,o){const n={};for(const i in o){const r=o[i];Object.defineProperty(n,r.name,{get(){return e[r.group].getResource(r.binding)},set(s){e[r.group].setResource(s,r.binding)}})}return n}destroy(e=!1){this.emit("destroy",this),e&&(this.gpuProgram?.destroy(),this.glProgram?.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(o=>{o.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(e){const{gpu:o,gl:n,...i}=e;let r,s;return o&&(r=te.from(o)),n&&(s=oe.from(n)),new ic({gpuProgram:r,glProgram:s,...i})}}const j4={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},au=0,cu=1,uu=2,pu=3,yu=4,du=5,Yp=class Ox{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<au)}set blend(e){!!(this.data&1<<au)!==e&&(this.data^=1<<au)}get offsets(){return!!(this.data&1<<cu)}set offsets(e){!!(this.data&1<<cu)!==e&&(this.data^=1<<cu)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<uu)}set culling(e){!!(this.data&1<<uu)!==e&&(this.data^=1<<uu)}get depthTest(){return!!(this.data&1<<pu)}set depthTest(e){!!(this.data&1<<pu)!==e&&(this.data^=1<<pu)}get depthMask(){return!!(this.data&1<<du)}set depthMask(e){!!(this.data&1<<du)!==e&&(this.data^=1<<du)}get clockwiseFrontFace(){return!!(this.data&1<<yu)}set clockwiseFrontFace(e){!!(this.data&1<<yu)!==e&&(this.data^=1<<yu)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=j4[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const e=new Ox;return e.depthTest=!1,e.blend=!0,e}};Yp.default2d=Yp.for2d();let I4=Yp;const Dx=class Qp extends ic{constructor(e){e={...Qp.defaultOptions,...e},super(e),this.enabled=!0,this._state=I4.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.addResource("uTexture",0,1)}apply(e,o,n,i){e.applyFilter(this,o,n,i)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:o,gl:n,...i}=e;let r,s;return o&&(r=te.from(o)),n&&(s=oe.from(n)),new Qp({gpuProgram:r,glProgram:s,...i})}};Dx.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1};let ie=Dx;const Kp=[];tt.handleByNamedList(N.Environment,Kp);async function F4(t){if(!t)for(let e=0;e<Kp.length;e++){const o=Kp[e];if(o.value.test()){await o.value.load();return}}}let Zr;function M4(){if(typeof Zr=="boolean")return Zr;try{Zr=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Zr=!1}return Zr}var Od={exports:{}};Od.exports=rc;Od.exports.default=rc;function rc(t,e,o){o=o||2;var n=e&&e.length,i=n?e[0]*o:t.length,r=Bx(t,0,i,o,!0),s=[];if(!r||r.next===r.prev)return s;var l,a,c,u,p,y,d;if(n&&(r=U4(t,e,r,o)),t.length>80*o){l=c=t[0],a=u=t[1];for(var g=o;g<i;g+=o)p=t[g],y=t[g+1],p<l&&(l=p),y<a&&(a=y),p>c&&(c=p),y>u&&(u=y);d=Math.max(c-l,u-a),d=d!==0?32767/d:0}return vs(r,s,o,l,a,d,0),s}function Bx(t,e,o,n,i){var r,s;if(i===ty(t,e,o,n)>0)for(r=e;r<o;r+=n)s=rg(r,t[r],t[r+1],s);else for(r=o-n;r>=e;r-=n)s=rg(r,t[r],t[r+1],s);return s&&sc(s,s.next)&&(Ss(s),s=s.next),s}function Vn(t,e){if(!t)return t;e||(e=t);var o=t,n;do if(n=!1,!o.steiner&&(sc(o,o.next)||we(o.prev,o,o.next)===0)){if(Ss(o),o=e=o.prev,o===o.next)break;n=!0}else o=o.next;while(n||o!==e);return e}function vs(t,e,o,n,i,r,s){if(t){!s&&r&&H4(t,n,i,r);for(var l=t,a,c;t.prev!==t.next;){if(a=t.prev,c=t.next,r?D4(t,n,i,r):O4(t)){e.push(a.i/o|0),e.push(t.i/o|0),e.push(c.i/o|0),Ss(t),t=c.next,l=c.next;continue}if(t=c,t===l){s?s===1?(t=B4(Vn(t),e,o),vs(t,e,o,n,i,r,2)):s===2&&G4(t,e,o,n,i,r):vs(Vn(t),e,o,n,i,r,1);break}}}}function O4(t){var e=t.prev,o=t,n=t.next;if(we(e,o,n)>=0)return!1;for(var i=e.x,r=o.x,s=n.x,l=e.y,a=o.y,c=n.y,u=i<r?i<s?i:s:r<s?r:s,p=l<a?l<c?l:c:a<c?a:c,y=i>r?i>s?i:s:r>s?r:s,d=l>a?l>c?l:c:a>c?a:c,g=n.next;g!==e;){if(g.x>=u&&g.x<=y&&g.y>=p&&g.y<=d&&Mi(i,l,r,a,s,c,g.x,g.y)&&we(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function D4(t,e,o,n){var i=t.prev,r=t,s=t.next;if(we(i,r,s)>=0)return!1;for(var l=i.x,a=r.x,c=s.x,u=i.y,p=r.y,y=s.y,d=l<a?l<c?l:c:a<c?a:c,g=u<p?u<y?u:y:p<y?p:y,f=l>a?l>c?l:c:a>c?a:c,b=u>p?u>y?u:y:p>y?p:y,h=Jp(d,g,e,o,n),m=Jp(f,b,e,o,n),k=t.prevZ,w=t.nextZ;k&&k.z>=h&&w&&w.z<=m;){if(k.x>=d&&k.x<=f&&k.y>=g&&k.y<=b&&k!==i&&k!==s&&Mi(l,u,a,p,c,y,k.x,k.y)&&we(k.prev,k,k.next)>=0||(k=k.prevZ,w.x>=d&&w.x<=f&&w.y>=g&&w.y<=b&&w!==i&&w!==s&&Mi(l,u,a,p,c,y,w.x,w.y)&&we(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;k&&k.z>=h;){if(k.x>=d&&k.x<=f&&k.y>=g&&k.y<=b&&k!==i&&k!==s&&Mi(l,u,a,p,c,y,k.x,k.y)&&we(k.prev,k,k.next)>=0)return!1;k=k.prevZ}for(;w&&w.z<=m;){if(w.x>=d&&w.x<=f&&w.y>=g&&w.y<=b&&w!==i&&w!==s&&Mi(l,u,a,p,c,y,w.x,w.y)&&we(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function B4(t,e,o){var n=t;do{var i=n.prev,r=n.next.next;!sc(i,r)&&Gx(i,n,n.next,r)&&zs(i,r)&&zs(r,i)&&(e.push(i.i/o|0),e.push(n.i/o|0),e.push(r.i/o|0),Ss(n),Ss(n.next),n=t=r),n=n.next}while(n!==t);return Vn(n)}function G4(t,e,o,n,i,r){var s=t;do{for(var l=s.next.next;l!==s.prev;){if(s.i!==l.i&&q4(s,l)){var a=Ux(s,l);s=Vn(s,s.next),a=Vn(a,a.next),vs(s,e,o,n,i,r,0),vs(a,e,o,n,i,r,0);return}l=l.next}s=s.next}while(s!==t)}function U4(t,e,o,n){var i=[],r,s,l,a,c;for(r=0,s=e.length;r<s;r++)l=e[r]*n,a=r<s-1?e[r+1]*n:t.length,c=Bx(t,l,a,n,!1),c===c.next&&(c.steiner=!0),i.push(V4(c));for(i.sort(N4),r=0;r<i.length;r++)o=L4(i[r],o);return o}function N4(t,e){return t.x-e.x}function L4(t,e){var o=$4(t,e);if(!o)return e;var n=Ux(o,t);return Vn(n,n.next),Vn(o,o.next)}function $4(t,e){var o=e,n=t.x,i=t.y,r=-1/0,s;do{if(i<=o.y&&i>=o.next.y&&o.next.y!==o.y){var l=o.x+(i-o.y)*(o.next.x-o.x)/(o.next.y-o.y);if(l<=n&&l>r&&(r=l,s=o.x<o.next.x?o:o.next,l===n))return s}o=o.next}while(o!==e);if(!s)return null;var a=s,c=s.x,u=s.y,p=1/0,y;o=s;do n>=o.x&&o.x>=c&&n!==o.x&&Mi(i<u?n:r,i,c,u,i<u?r:n,i,o.x,o.y)&&(y=Math.abs(i-o.y)/(n-o.x),zs(o,t)&&(y<p||y===p&&(o.x>s.x||o.x===s.x&&W4(s,o)))&&(s=o,p=y)),o=o.next;while(o!==a);return s}function W4(t,e){return we(t.prev,t,e.prev)<0&&we(e.next,t,t.next)<0}function H4(t,e,o,n){var i=t;do i.z===0&&(i.z=Jp(i.x,i.y,e,o,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,X4(i)}function X4(t){var e,o,n,i,r,s,l,a,c=1;do{for(o=t,t=null,r=null,s=0;o;){for(s++,n=o,l=0,e=0;e<c&&(l++,n=n.nextZ,!!n);e++);for(a=c;l>0||a>0&&n;)l!==0&&(a===0||!n||o.z<=n.z)?(i=o,o=o.nextZ,l--):(i=n,n=n.nextZ,a--),r?r.nextZ=i:t=i,i.prevZ=r,r=i;o=n}r.nextZ=null,c*=2}while(s>1);return t}function Jp(t,e,o,n,i){return t=(t-o)*i|0,e=(e-n)*i|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function V4(t){var e=t,o=t;do(e.x<o.x||e.x===o.x&&e.y<o.y)&&(o=e),e=e.next;while(e!==t);return o}function Mi(t,e,o,n,i,r,s,l){return(i-s)*(e-l)>=(t-s)*(r-l)&&(t-s)*(n-l)>=(o-s)*(e-l)&&(o-s)*(r-l)>=(i-s)*(n-l)}function q4(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!Y4(t,e)&&(zs(t,e)&&zs(e,t)&&Q4(t,e)&&(we(t.prev,t,e.prev)||we(t,e.prev,e))||sc(t,e)&&we(t.prev,t,t.next)>0&&we(e.prev,e,e.next)>0)}function we(t,e,o){return(e.y-t.y)*(o.x-e.x)-(e.x-t.x)*(o.y-e.y)}function sc(t,e){return t.x===e.x&&t.y===e.y}function Gx(t,e,o,n){var i=gl(we(t,e,o)),r=gl(we(t,e,n)),s=gl(we(o,n,t)),l=gl(we(o,n,e));return!!(i!==r&&s!==l||i===0&&hl(t,o,e)||r===0&&hl(t,n,e)||s===0&&hl(o,t,n)||l===0&&hl(o,e,n))}function hl(t,e,o){return e.x<=Math.max(t.x,o.x)&&e.x>=Math.min(t.x,o.x)&&e.y<=Math.max(t.y,o.y)&&e.y>=Math.min(t.y,o.y)}function gl(t){return t>0?1:t<0?-1:0}function Y4(t,e){var o=t;do{if(o.i!==t.i&&o.next.i!==t.i&&o.i!==e.i&&o.next.i!==e.i&&Gx(o,o.next,t,e))return!0;o=o.next}while(o!==t);return!1}function zs(t,e){return we(t.prev,t,t.next)<0?we(t,e,t.next)>=0&&we(t,t.prev,e)>=0:we(t,e,t.prev)<0||we(t,t.next,e)<0}function Q4(t,e){var o=t,n=!1,i=(t.x+e.x)/2,r=(t.y+e.y)/2;do o.y>r!=o.next.y>r&&o.next.y!==o.y&&i<(o.next.x-o.x)*(r-o.y)/(o.next.y-o.y)+o.x&&(n=!n),o=o.next;while(o!==t);return n}function Ux(t,e){var o=new ey(t.i,t.x,t.y),n=new ey(e.i,e.x,e.y),i=t.next,r=e.prev;return t.next=e,e.prev=t,o.next=i,i.prev=o,n.next=o,o.prev=n,r.next=n,n.prev=r,n}function rg(t,e,o,n){var i=new ey(t,e,o);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ss(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function ey(t,e,o){this.i=t,this.x=e,this.y=o,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}rc.deviation=function(t,e,o,n){var i=e&&e.length,r=i?e[0]*o:t.length,s=Math.abs(ty(t,0,r,o));if(i)for(var l=0,a=e.length;l<a;l++){var c=e[l]*o,u=l<a-1?e[l+1]*o:t.length;s-=Math.abs(ty(t,c,u,o))}var p=0;for(l=0;l<n.length;l+=3){var y=n[l]*o,d=n[l+1]*o,g=n[l+2]*o;p+=Math.abs((t[y]-t[g])*(t[d+1]-t[y+1])-(t[y]-t[d])*(t[g+1]-t[y+1]))}return s===0&&p===0?0:Math.abs((p-s)/s)};function ty(t,e,o,n){for(var i=0,r=e,s=o-n;r<o;r+=n)i+=(t[s]-t[r])*(t[r+1]+t[s+1]),s=r;return i}rc.flatten=function(t){for(var e=t[0][0].length,o={vertices:[],holes:[],dimensions:e},n=0,i=0;i<t.length;i++){for(var r=0;r<t[i].length;r++)for(var s=0;s<e;s++)o.vertices.push(t[i][r][s]);i>0&&(n+=t[i-1].length,o.holes.push(n))}return o};var K4=Od.exports;const J4=oi(K4);var Nx=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Nx||{});class eS{constructor(e){this.items=[],this._name=e}emit(e,o,n,i,r,s,l,a){const{name:c,items:u}=this;for(let p=0,y=u.length;p<y;p++)u[p][c](e,o,n,i,r,s,l,a);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const o=this.items.indexOf(e);return o!==-1&&this.items.splice(o,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const tS=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],Lx=class $x extends Yt{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const o=[...tS,...this.config.runners??[]];this._addRunners(...o),this._unsafeEvalCheck()}async init(e={}){const o=e.skipExtensionImports===!0?!0:e.manageImports===!1;await F4(o),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const n in this._systemsHash)e={...this._systemsHash[n].constructor.defaultOptions,...e};e={...$x.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let n=0;n<this.runners.init.items.length;n++)await this.runners.init.items[n].init(e);this._initOptions=e}render(e,o){let n=e;if(n instanceof ye&&(n={container:n},o&&($(ue,"passing a second argument is deprecated, please use render options instead"),n.target=o.renderTexture)),n.target||(n.target=this.view.renderTarget),n.target===this.view.renderTarget&&(this._lastObjectRendered=n.container,n.clearColor=this.background.colorRgba),n.clearColor){const i=Array.isArray(n.clearColor)&&n.clearColor.length===4;n.clearColor=i?n.clearColor:Y.shared.setValue(n.clearColor).toArray()}n.transform||(n.container.updateLocalTransform(),n.transform=n.container.localTransform),this.runners.prerender.emit(n),this.runners.renderStart.emit(n),this.runners.render.emit(n),this.runners.renderEnd.emit(n),this.runners.postrender.emit(n)}resize(e,o,n){const i=this.view.resolution;this.view.resize(e,o,n),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),n!==void 0&&n!==i&&this.runners.resolutionChange.emit(n)}clear(e={}){const o=this;e.target||(e.target=o.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Nx.ALL);const{clear:n,clearColor:i,target:r}=e;Y.shared.setValue(i??this.background.colorRgba),o.renderTarget.clear(r,n,Y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(o=>{this.runners[o]=new eS(o)})}_addSystems(e){let o;for(o in e){const n=e[o];this._addSystem(n.value,n.name)}}_addSystem(e,o){const n=new e(this);if(this[o])throw new Error(`Whoops! The name "${o}" is already in use`);this[o]=n,this._systemsHash[o]=n;for(const i in this.runners)this.runners[i].add(n);return this}_addPipes(e,o){const n=o.reduce((i,r)=>(i[r.name]=r.value,i),{});e.forEach(i=>{const r=i.value,s=i.name,l=n[s];this.renderPipes[s]=new r(this,l?new l:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(o=>{o.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!M4())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};Lx.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Wx=Lx,ml;function oS(t){return ml!==void 0||(ml=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Wx.defaultOptions.failIfMajorPerformanceCaveat};try{if(!ze.get().getWebGLRenderingContext())return!1;let n=ze.get().createCanvas().getContext("webgl",e);const i=!!n?.getContextAttributes()?.stencil;if(n){const r=n.getExtension("WEBGL_lose_context");r&&r.loseContext()}return n=null,i}catch{return!1}})()),ml}let bl;async function nS(t={}){return bl!==void 0||(bl=await(async()=>{const e=ze.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),bl}const sg=["webgl","webgpu","canvas"];async function iS(t){let e=[];t.preference?(e.push(t.preference),sg.forEach(r=>{r!==t.preference&&e.push(r)})):e=sg.slice();let o,n={};for(let r=0;r<e.length;r++){const s=e[r];if(s==="webgpu"&&await nS()){const{WebGPURenderer:l}=await _a(async()=>{const{WebGPURenderer:a}=await import("./WebGPURenderer-YqkhaZYM.js");return{WebGPURenderer:a}},__vite__mapDeps([3,2,4]));o=l,n={...t,...t.webgpu};break}else if(s==="webgl"&&oS(t.failIfMajorPerformanceCaveat??Wx.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:l}=await _a(async()=>{const{WebGLRenderer:a}=await import("./WebGLRenderer-DIAl1ZcN.js");return{WebGLRenderer:a}},__vite__mapDeps([5,2,4]));o=l,n={...t,...t.webgl};break}else if(s==="canvas")throw n={...t},new Error("CanvasRenderer is not yet implemented")}if(delete n.webgpu,delete n.webgl,!o)throw new Error("No available renderer for the current environment");const i=new o;return await i.init(n),i}const Hx="8.4.1";class Xx{static init(){globalThis.__PIXI_APP_INIT__?.(this,Hx)}static destroy(){}}Xx.extension=N.Application;class rS{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Hx)}destroy(){this._renderer=null}}rS.extension={type:[N.WebGLSystem,N.WebGPUSystem],name:"initHook",priority:-10};const Vx=class oy{constructor(...e){this.stage=new ye,e[0]!==void 0&&$(ue,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await iS(e),oy._plugins.forEach(o=>{o.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return $(ue,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,o=!1){const n=oy._plugins.slice(0);n.reverse(),n.forEach(i=>{i.destroy.call(this)}),this.stage.destroy(o),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Vx._plugins=[];let qx=Vx;tt.handleByList(N.Application,qx._plugins);tt.add(Xx);class Yx extends Yt{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.applyFillAsTint=!0,this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return $(ue,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return $(ue,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return $(ue,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return $(ue,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return $(ue,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners();for(const o in this.chars)this.chars[o].texture?.destroy();this.chars=null,e&&(this.pages.forEach(o=>o.texture.destroy(!0)),this.pages=null)}}const Qx=class ny{constructor(e,o,n,i){this.uid=je("fillGradient"),this.type="linear",this.gradientStops=[],this._styleKey=null,this.x0=e,this.y0=o,this.x1=n,this.y1=i}addColorStop(e,o){return this.gradientStops.push({offset:e,color:Y.shared.setValue(o).toHexa()}),this._styleKey=null,this}buildLinearGradient(){const e=ny.defaultTextureSize,{gradientStops:o}=this,n=ze.get().createCanvas();n.width=e,n.height=e;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,ny.defaultTextureSize,1);for(let f=0;f<o.length;f++){const b=o[f];r.addColorStop(b.offset,b.color)}i.fillStyle=r,i.fillRect(0,0,e,e),this.texture=new V({source:new ri({resource:n,addressModeU:"clamp-to-edge",addressModeV:"repeat"})});const{x0:s,y0:l,x1:a,y1:c}=this,u=new le,p=a-s,y=c-l,d=Math.sqrt(p*p+y*y),g=Math.atan2(y,p);u.translate(-s,-l),u.scale(1/e,1/e),u.rotate(-g),u.scale(256/d,1),this.transform=u,this._styleKey=null}get styleKey(){if(this._styleKey)return this._styleKey;const e=this.gradientStops.map(i=>`${i.offset}-${i.color}`).join("-"),o=this.texture.uid,n=this.transform.toArray().join("-");return`fill-gradient-${this.uid}-${e}-${o}-${n}-${this.x0}-${this.y0}-${this.x1}-${this.y1}`}};Qx.defaultTextureSize=256;let Es=Qx;const lg={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class lc{constructor(e,o){this.uid=je("fillPattern"),this.transform=new le,this._styleKey=null,this.texture=e,this.transform.scale(1/e.frame.width,1/e.frame.height),o&&(e.source.style.addressModeU=lg[o].addressModeU,e.source.style.addressModeV=lg[o].addressModeV)}setTransform(e){const o=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/o.frame.width,1/o.frame.height),this._styleKey=null}get styleKey(){return this._styleKey?this._styleKey:(this._styleKey=`fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`,this._styleKey)}}var sS=aS,fu={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},lS=/([astvzqmhlc])([^astvzqmhlc]*)/ig;function aS(t){var e=[];return t.replace(lS,function(o,n,i){var r=n.toLowerCase();for(i=uS(i),r=="m"&&i.length>2&&(e.push([n].concat(i.splice(0,2))),r="l",n=n=="m"?"l":"L");;){if(i.length==fu[r])return i.unshift(n),e.push(i);if(i.length<fu[r])throw new Error("malformed path data");e.push([n].concat(i.splice(0,fu[r])))}}),e}var cS=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;function uS(t){var e=t.match(cS);return e?e.map(Number):[]}const pS=oi(sS);function yS(t,e){const o=pS(t),n=[];let i=null,r=0,s=0;for(let l=0;l<o.length;l++){const a=o[l],c=a[0],u=a;switch(c){case"M":r=u[1],s=u[2],e.moveTo(r,s);break;case"m":r+=u[1],s+=u[2],e.moveTo(r,s);break;case"H":r=u[1],e.lineTo(r,s);break;case"h":r+=u[1],e.lineTo(r,s);break;case"V":s=u[1],e.lineTo(r,s);break;case"v":s+=u[1],e.lineTo(r,s);break;case"L":r=u[1],s=u[2],e.lineTo(r,s);break;case"l":r+=u[1],s+=u[2],e.lineTo(r,s);break;case"C":r=u[5],s=u[6],e.bezierCurveTo(u[1],u[2],u[3],u[4],r,s);break;case"c":e.bezierCurveTo(r+u[1],s+u[2],r+u[3],s+u[4],r+u[5],s+u[6]),r+=u[5],s+=u[6];break;case"S":r=u[3],s=u[4],e.bezierCurveToShort(u[1],u[2],r,s);break;case"s":e.bezierCurveToShort(r+u[1],s+u[2],r+u[3],s+u[4]),r+=u[3],s+=u[4];break;case"Q":r=u[3],s=u[4],e.quadraticCurveTo(u[1],u[2],r,s);break;case"q":e.quadraticCurveTo(r+u[1],s+u[2],r+u[3],s+u[4]),r+=u[3],s+=u[4];break;case"T":r=u[1],s=u[2],e.quadraticCurveToShort(r,s);break;case"t":r+=u[1],s+=u[2],e.quadraticCurveToShort(r,s);break;case"A":r=u[6],s=u[7],e.arcToSvg(u[1],u[2],u[3],u[4],u[5],r,s);break;case"a":r+=u[6],s+=u[7],e.arcToSvg(u[1],u[2],u[3],u[4],u[5],r,s);break;case"Z":case"z":e.closePath(),n.length>0&&(i=n.pop(),i?(r=i.startX,s=i.startY):(r=0,s=0)),i=null;break;default:Ie(`Unknown SVG path command: ${c}`)}c!=="Z"&&c!=="z"&&i===null&&(i={startX:r,startY:s},n.push(i))}return e}class Dd{constructor(e=0,o=0,n=0){this.type="circle",this.x=e,this.y=o,this.radius=n}clone(){return new Dd(this.x,this.y,this.radius)}contains(e,o){if(this.radius<=0)return!1;const n=this.radius*this.radius;let i=this.x-e,r=this.y-o;return i*=i,r*=r,i+r<=n}strokeContains(e,o,n){if(this.radius===0)return!1;const i=this.x-e,r=this.y-o,s=this.radius,l=n/2,a=Math.sqrt(i*i+r*r);return a<s+l&&a>s-l}getBounds(e){return e=e||new Te,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}toString(){return`[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`}}class Bd{constructor(e=0,o=0,n=0,i=0){this.type="ellipse",this.x=e,this.y=o,this.halfWidth=n,this.halfHeight=i}clone(){return new Bd(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,o){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let n=(e-this.x)/this.halfWidth,i=(o-this.y)/this.halfHeight;return n*=n,i*=i,n+i<=1}strokeContains(e,o,n){const{halfWidth:i,halfHeight:r}=this;if(i<=0||r<=0)return!1;const s=n/2,l=i-s,a=r-s,c=i+s,u=r+s,p=e-this.x,y=o-this.y,d=p*p/(l*l)+y*y/(a*a),g=p*p/(c*c)+y*y/(u*u);return d>1&&g<=1}getBounds(e){return e=e||new Te,e.x=this.x-this.halfWidth,e.y=this.y-this.halfHeight,e.width=this.halfWidth*2,e.height=this.halfHeight*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}toString(){return`[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`}}function dS(t,e,o,n,i,r){const s=t-o,l=e-n,a=i-o,c=r-n,u=s*a+l*c,p=a*a+c*c;let y=-1;p!==0&&(y=u/p);let d,g;y<0?(d=o,g=n):y>1?(d=i,g=r):(d=o+y*a,g=n+y*c);const f=t-d,b=e-g;return f*f+b*b}class ts{constructor(...e){this.type="polygon";let o=Array.isArray(e[0])?e[0]:e;if(typeof o[0]!="number"){const n=[];for(let i=0,r=o.length;i<r;i++)n.push(o[i].x,o[i].y);o=n}this.points=o,this.closePath=!0}clone(){const e=this.points.slice(),o=new ts(e);return o.closePath=this.closePath,o}contains(e,o){let n=!1;const i=this.points.length/2;for(let r=0,s=i-1;r<i;s=r++){const l=this.points[r*2],a=this.points[r*2+1],c=this.points[s*2],u=this.points[s*2+1];a>o!=u>o&&e<(c-l)*((o-a)/(u-a))+l&&(n=!n)}return n}strokeContains(e,o,n){const i=n/2,r=i*i,{points:s}=this,l=s.length-(this.closePath?0:2);for(let a=0;a<l;a+=2){const c=s[a],u=s[a+1],p=s[(a+2)%s.length],y=s[(a+3)%s.length];if(dS(e,o,c,u,p,y)<=r)return!0}return!1}getBounds(e){e=e||new Te;const o=this.points;let n=1/0,i=-1/0,r=1/0,s=-1/0;for(let l=0,a=o.length;l<a;l+=2){const c=o[l],u=o[l+1];n=c<n?c:n,i=c>i?c:i,r=u<r?u:r,s=u>s?u:s}return e.x=n,e.width=i-n,e.y=r,e.height=s-r,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}toString(){return`[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((e,o)=>`${e}, ${o}`,"")}]`}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}const xl=(t,e,o,n,i,r)=>{const s=t-o,l=e-n,a=Math.sqrt(s*s+l*l);return a>=i-r&&a<=i+r};class Gd{constructor(e=0,o=0,n=0,i=0,r=20){this.type="roundedRectangle",this.x=e,this.y=o,this.width=n,this.height=i,this.radius=r}getBounds(e){return e=e||new Te,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new Gd(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,o){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&o>=this.y&&o<=this.y+this.height){const n=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(o>=this.y+n&&o<=this.y+this.height-n||e>=this.x+n&&e<=this.x+this.width-n)return!0;let i=e-(this.x+n),r=o-(this.y+n);const s=n*n;if(i*i+r*r<=s||(i=e-(this.x+this.width-n),i*i+r*r<=s)||(r=o-(this.y+this.height-n),i*i+r*r<=s)||(i=e-(this.x+n),i*i+r*r<=s))return!0}return!1}strokeContains(e,o,n){const{x:i,y:r,width:s,height:l,radius:a}=this,c=n/2,u=i+a,p=r+a,y=s-a*2,d=l-a*2,g=i+s,f=r+l;return(e>=i-c&&e<=i+c||e>=g-c&&e<=g+c)&&o>=p&&o<=p+d||(o>=r-c&&o<=r+c||o>=f-c&&o<=f+c)&&e>=u&&e<=u+y?!0:e<u&&o<p&&xl(e,o,u,p,a,c)||e>g-a&&o<p&&xl(e,o,g-a,p,a,c)||e>g-a&&o>f-a&&xl(e,o,g-a,f-a,a,c)||e<u&&o>f-a&&xl(e,o,u,f-a,a,c)}toString(){return`[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`}}const fS=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function hS(t){let e="";for(let o=0;o<t;++o)o>0&&(e+=`
else `),o<t-1&&(e+=`if(test == ${o}.0){}`);return e}function gS(t,e){if(t===0)throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");const o=e.createShader(e.FRAGMENT_SHADER);try{for(;;){const n=fS.replace(/%forloop%/gi,hS(t));if(e.shaderSource(o,n),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))t=t/2|0;else break}}finally{e.deleteShader(o)}return t}let ui=null;function Kx(){if(ui)return ui;const t=Tx();return ui=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),ui=gS(ui,t),t.getExtension("WEBGL_lose_context")?.loseContext(),ui}const Jx={};function mS(t,e){let o=2166136261;for(let n=0;n<e;n++)o^=t[n].uid,o=Math.imul(o,16777619),o>>>=0;return Jx[o]||bS(t,e,o)}let hu=0;function bS(t,e,o){const n={};let i=0;hu||(hu=Kx());for(let s=0;s<hu;s++){const l=s<e?t[s]:V.EMPTY.source;n[i++]=l.source,n[i++]=l.style}const r=new Wl(n);return Jx[o]=r,r}class ag{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function cg(t,e){const o=t.byteLength/8|0,n=new Float64Array(t,0,o);new Float64Array(e,0,o).set(n);const r=t.byteLength-o*8;if(r>0){const s=new Uint8Array(t,o*8,r);new Uint8Array(e,o*8,r).set(s)}}const xS={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var kS=(t=>(t[t.DISABLED=0]="DISABLED",t[t.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",t[t.MASK_ACTIVE=2]="MASK_ACTIVE",t[t.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",t[t.NONE=4]="NONE",t))(kS||{});function ug(t,e){return e.alphaMode==="no-premultiply-alpha"&&xS[t]||t}class wS{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const o=this.textures[e];this.textures[e]=null,this.ids[o.uid]=null}this.count=0}}class vS{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new wS,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}const e1=[];let iy=0;function pg(){return iy>0?e1[--iy]:new vS}function yg(t){e1[iy++]=t}let Ar=0;const t1=class Hl{constructor(e={}){this.uid=je("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],Hl.defaultOptions.maxTextures=Hl.defaultOptions.maxTextures??Kx(),e={...Hl.defaultOptions,...e};const{maxTextures:o,attributesInitialSize:n,indicesInitialSize:i}=e;this.attributeBuffer=new ag(n*4),this.indexBuffer=new Uint16Array(i),this.maxTextures=o}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let e=0;e<this.batchIndex;e++)yg(this.batches[e]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e._indexStart=this.indexSize,e._attributeStart=this.attributeSize,e._batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.attributeSize*this.vertexSize}checkAndUpdateTexture(e,o){const n=e._batch.textures.ids[o._source.uid];return!n&&n!==0?!1:(e._textureId=n,e.texture=o,!0)}updateElement(e){this.dirty=!0;const o=this.attributeBuffer;e.packAsQuad?this.packQuadAttributes(e,o.float32View,o.uint32View,e._attributeStart,e._textureId):this.packAttributes(e,o.float32View,o.uint32View,e._attributeStart,e._textureId)}break(e){const o=this._elements;if(!o[this.elementStart])return;let n=pg(),i=n.textures;i.clear();const r=o[this.elementStart];let s=ug(r.blendMode,r.texture._source);this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const l=this.attributeBuffer.float32View,a=this.attributeBuffer.uint32View,c=this.indexBuffer;let u=this._batchIndexSize,p=this._batchIndexStart,y="startBatch";const d=this.maxTextures;for(let g=this.elementStart;g<this.elementSize;++g){const f=o[g];o[g]=null;const h=f.texture._source,m=ug(f.blendMode,h),k=s!==m;if(h._batchTick===Ar&&!k){f._textureId=h._textureBindLocation,u+=f.indexSize,f.packAsQuad?(this.packQuadAttributes(f,l,a,f._attributeStart,f._textureId),this.packQuadIndex(c,f._indexStart,f._attributeStart/this.vertexSize)):(this.packAttributes(f,l,a,f._attributeStart,f._textureId),this.packIndex(f,c,f._indexStart,f._attributeStart/this.vertexSize)),f._batch=n;continue}h._batchTick=Ar,(i.count>=d||k)&&(this._finishBatch(n,p,u-p,i,s,e,y),y="renderBatch",p=u,s=m,n=pg(),i=n.textures,i.clear(),++Ar),f._textureId=h._textureBindLocation=i.count,i.ids[h.uid]=i.count,i.textures[i.count++]=h,f._batch=n,u+=f.indexSize,f.packAsQuad?(this.packQuadAttributes(f,l,a,f._attributeStart,f._textureId),this.packQuadIndex(c,f._indexStart,f._attributeStart/this.vertexSize)):(this.packAttributes(f,l,a,f._attributeStart,f._textureId),this.packIndex(f,c,f._indexStart,f._attributeStart/this.vertexSize))}i.count>0&&(this._finishBatch(n,p,u-p,i,s,e,y),p=u,++Ar),this.elementStart=this.elementSize,this._batchIndexStart=p,this._batchIndexSize=u}_finishBatch(e,o,n,i,r,s,l){e.gpuBindGroup=null,e.bindGroup=null,e.action=l,e.batcher=this,e.textures=i,e.blendMode=r,e.start=o,e.size=n,++Ar,this.batches[this.batchIndex++]=e,s.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<=this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const o=Math.max(e,this.attributeBuffer.size*2),n=new ag(o);cg(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(e){const o=this.indexBuffer;let n=Math.max(e,o.length*1.5);n+=n%2;const i=n>65535?new Uint32Array(n):new Uint16Array(n);if(i.BYTES_PER_ELEMENT!==o.BYTES_PER_ELEMENT)for(let r=0;r<o.length;r++)i[r]=o[r];else cg(o.buffer,i.buffer);this.indexBuffer=i}packQuadIndex(e,o,n){e[o]=n+0,e[o+1]=n+1,e[o+2]=n+2,e[o+3]=n+0,e[o+4]=n+2,e[o+5]=n+3}packIndex(e,o,n,i){const r=e.indices,s=e.indexSize,l=e.indexOffset,a=e.attributeOffset;for(let c=0;c<s;c++)o[n++]=i+r[c+l]-a}destroy(){for(let e=0;e<this.batches.length;e++)yg(this.batches[e]);this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e]._batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};t1.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6};let zS=t1;var at=(t=>(t[t.MAP_READ=1]="MAP_READ",t[t.MAP_WRITE=2]="MAP_WRITE",t[t.COPY_SRC=4]="COPY_SRC",t[t.COPY_DST=8]="COPY_DST",t[t.INDEX=16]="INDEX",t[t.VERTEX=32]="VERTEX",t[t.UNIFORM=64]="UNIFORM",t[t.STORAGE=128]="STORAGE",t[t.INDIRECT=256]="INDIRECT",t[t.QUERY_RESOLVE=512]="QUERY_RESOLVE",t[t.STATIC=1024]="STATIC",t))(at||{});class _s extends Yt{constructor(e){let{data:o,size:n}=e;const{usage:i,label:r,shrinkToFit:s}=e;super(),this.uid=je("buffer"),this._resourceType="buffer",this._resourceId=je("resource"),this._touched=0,this._updateID=1,this.shrinkToFit=!0,this.destroyed=!1,o instanceof Array&&(o=new Float32Array(o)),this._data=o,n=n??o?.byteLength;const l=!!o;this.descriptor={size:n,usage:i,mappedAtCreation:l,label:r},this.shrinkToFit=s??!0}get data(){return this._data}set data(e){this.setDataWithSize(e,e.length,!0)}get static(){return!!(this.descriptor.usage&at.STATIC)}set static(e){e?this.descriptor.usage|=at.STATIC:this.descriptor.usage&=~at.STATIC}setDataWithSize(e,o,n){if(this._updateID++,this._updateSize=o*e.BYTES_PER_ELEMENT,this._data===e){n&&this.emit("update",this);return}const i=this._data;if(this._data=e,i.length!==e.length){!this.shrinkToFit&&e.byteLength<i.byteLength?n&&this.emit("update",this):(this.descriptor.size=e.byteLength,this._resourceId=je("resource"),this.emit("change",this));return}n&&this.emit("update",this)}update(e){this._updateSize=e??this._updateSize,this._updateID++,this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function o1(t,e){if(!(t instanceof _s)){let o=e?at.INDEX:at.VERTEX;t instanceof Array&&(e?(t=new Uint32Array(t),o=at.INDEX|at.COPY_DST):(t=new Float32Array(t),o=at.VERTEX|at.COPY_DST)),t=new _s({data:t,label:e?"index-mesh-buffer":"vertex-mesh-buffer",usage:o})}return t}function SS(t,e,o){const n=t.getAttribute(e);if(!n)return o.minX=0,o.minY=0,o.maxX=0,o.maxY=0,o;const i=n.buffer.data;let r=1/0,s=1/0,l=-1/0,a=-1/0;const c=i.BYTES_PER_ELEMENT,u=(n.offset||0)/c,p=(n.stride||2*4)/c;for(let y=u;y<i.length;y+=p){const d=i[y],g=i[y+1];d>l&&(l=d),g>a&&(a=g),d<r&&(r=d),g<s&&(s=g)}return o.minX=r,o.minY=s,o.maxX=l,o.maxY=a,o}function ES(t){return(t instanceof _s||Array.isArray(t)||t.BYTES_PER_ELEMENT)&&(t={buffer:t}),t.buffer=o1(t.buffer,!1),t}class _S extends Yt{constructor(e){const{attributes:o,indexBuffer:n,topology:i}=e;super(),this.uid=je("geometry"),this._layoutKey=0,this.instanceCount=1,this._bounds=new co,this._boundsDirty=!0,this.attributes=o,this.buffers=[],this.instanceCount=e.instanceCount||1;for(const r in o){const s=o[r]=ES(o[r]);this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this),s.buffer.on("change",this.onBufferUpdate,this))}n&&(this.indexBuffer=o1(n,!0),this.buffers.push(this.indexBuffer)),this.topology=i||"triangle-list"}onBufferUpdate(){this._boundsDirty=!0,this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const o=this.attributes[e];return o.buffer.data.length/(o.stride/4||o.size)}return 0}get bounds(){return this._boundsDirty?(this._boundsDirty=!1,SS(this,"aPosition",this._bounds)):this._bounds}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(o=>o.destroy()),this.attributes=null,this.buffers=null,this.indexBuffer=null,this._bounds=null}}const CS=new Float32Array(1),ZS=new Uint32Array(1);class AS extends _S{constructor(){const o=new _s({data:CS,label:"attribute-batch-buffer",usage:at.VERTEX|at.COPY_DST,shrinkToFit:!1}),n=new _s({data:ZS,label:"index-batch-buffer",usage:at.INDEX|at.COPY_DST,shrinkToFit:!1}),i=6*4;super({attributes:{aPosition:{buffer:o,format:"float32x2",stride:i,offset:0},aUV:{buffer:o,format:"float32x2",stride:i,offset:2*4},aColor:{buffer:o,format:"unorm8x4",stride:i,offset:4*4},aTextureIdAndRound:{buffer:o,format:"uint16x2",stride:i,offset:5*4}},indexBuffer:n})}}function dg(t,e,o){if(t)for(const n in t){const i=n.toLocaleLowerCase(),r=e[i];if(r){let s=t[n];n==="header"&&(s=s.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),o&&r.push(`//----${o}----//`),r.push(s)}else Ie(`${n} placement hook does not exist in shader`)}}const RS=/\{\{(.*?)\}\}/g;function fg(t){const e={};return(t.match(RS)?.map(n=>n.replace(/[{()}]/g,""))??[]).forEach(n=>{e[n]=[]}),e}function hg(t,e){let o;const n=/@in\s+([^;]+);/g;for(;(o=n.exec(t))!==null;)e.push(o[1])}function gg(t,e,o=!1){const n=[];hg(e,n),t.forEach(l=>{l.header&&hg(l.header,n)});const i=n;o&&i.sort();const r=i.map((l,a)=>`       @location(${a}) ${l},`).join(`
`);let s=e.replace(/@in\s+[^;]+;\s*/g,"");return s=s.replace("{{in}}",`
${r}
`),s}function mg(t,e){let o;const n=/@out\s+([^;]+);/g;for(;(o=n.exec(t))!==null;)e.push(o[1])}function PS(t){const o=/\b(\w+)\s*:/g.exec(t);return o?o[1]:""}function TS(t){const e=/@.*?\s+/g;return t.replace(e,"")}function jS(t,e){const o=[];mg(e,o),t.forEach(a=>{a.header&&mg(a.header,o)});let n=0;const i=o.sort().map(a=>a.indexOf("builtin")>-1?a:`@location(${n++}) ${a}`).join(`,
`),r=o.sort().map(a=>`       var ${TS(a)};`).join(`
`),s=`return VSOutput(
                ${o.sort().map(a=>` ${PS(a)}`).join(`,
`)});`;let l=e.replace(/@out\s+[^;]+;\s*/g,"");return l=l.replace("{{struct}}",`
${i}
`),l=l.replace("{{start}}",`
${r}
`),l=l.replace("{{return}}",`
${s}
`),l}function bg(t,e){let o=t;for(const n in e){const i=e[n];i.join(`
`).length?o=o.replace(`{{${n}}}`,`//-----${n} START-----//
${i.join(`
`)}
//----${n} FINISH----//`):o=o.replace(`{{${n}}}`,"")}return o}const Vo=Object.create(null),gu=new Map;let IS=0;function FS({template:t,bits:e}){const o=n1(t,e);if(Vo[o])return Vo[o];const{vertex:n,fragment:i}=OS(t,e);return Vo[o]=i1(n,i,e),Vo[o]}function MS({template:t,bits:e}){const o=n1(t,e);return Vo[o]||(Vo[o]=i1(t.vertex,t.fragment,e)),Vo[o]}function OS(t,e){const o=e.map(s=>s.vertex).filter(s=>!!s),n=e.map(s=>s.fragment).filter(s=>!!s);let i=gg(o,t.vertex,!0);i=jS(o,i);const r=gg(n,t.fragment,!0);return{vertex:i,fragment:r}}function n1(t,e){return e.map(o=>(gu.has(o)||gu.set(o,IS++),gu.get(o))).sort((o,n)=>o-n).join("-")+t.vertex+t.fragment}function i1(t,e,o){const n=fg(t),i=fg(e);return o.forEach(r=>{dg(r.vertex,n,r.name),dg(r.fragment,i,r.name)}),{vertex:bg(t,n),fragment:bg(e,i)}}const DS=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,BS=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,GS=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,US=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
        
        {{end}}
    }
`,NS={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},LS={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function $S({bits:t,name:e}){const o=FS({template:{fragment:BS,vertex:DS},bits:[NS,...t]});return te.from({name:e,vertex:{source:o.vertex,entryPoint:"main"},fragment:{source:o.fragment,entryPoint:"main"}})}function WS({bits:t,name:e}){return new oe({name:e,...MS({template:{vertex:GS,fragment:US},bits:[LS,...t]})})}const HS={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},XS={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},mu={};function VS(t){const e=[];if(t===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let o=0;for(let n=0;n<t;n++)e.push(`@group(1) @binding(${o++}) var textureSource${n+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${o++}) var textureSampler${n+1}: sampler;`)}return e.join(`
`)}function qS(t){const e=[];if(t===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let o=0;o<t;o++)o===t-1?e.push("  default:{"):e.push(`  case ${o}:{`),e.push(`      outColor = textureSampleGrad(textureSource${o+1}, textureSampler${o+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function YS(t){return mu[t]||(mu[t]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${VS(t)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${qS(t)}
            `}}),mu[t]}const bu={};function QS(t){const e=[];for(let o=0;o<t;o++)o>0&&e.push("else"),o<t-1&&e.push(`if(vTextureId < ${o}.5)`),e.push("{"),e.push(`	outColor = texture(uTextures[${o}], vUV);`),e.push("}");return e.join(`
`)}function KS(t){return bu[t]||(bu[t]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${t}];

            `,main:`

                ${QS(t)}
            `}}),bu[t]}const JS={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},eE={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},xg={};function tE(t){let e=xg[t];if(e)return e;const o=new Int32Array(t);for(let n=0;n<t;n++)o[n]=n;return e=xg[t]=new Md({uTextures:{value:o,type:"i32",size:t}},{isStatic:!0}),e}class oE extends ic{constructor(e){const o=WS({name:"batch",bits:[XS,KS(e),eE]}),n=$S({name:"batch",bits:[HS,YS(e),JS]});super({glProgram:o,gpuProgram:n,resources:{batchSamplers:tE(e)}})}}let kg=null;const r1=class s1 extends zS{constructor(){super(...arguments),this.geometry=new AS,this.shader=kg||(kg=new oE(this.maxTextures)),this.name=s1.extension.name,this.vertexSize=6}packAttributes(e,o,n,i,r){const s=r<<16|e.roundPixels&65535,l=e.transform,a=l.a,c=l.b,u=l.c,p=l.d,y=l.tx,d=l.ty,{positions:g,uvs:f}=e,b=e.color,h=e.attributeOffset,m=h+e.attributeSize;for(let k=h;k<m;k++){const w=k*2,v=g[w],E=g[w+1];o[i++]=a*v+u*E+y,o[i++]=p*E+c*v+d,o[i++]=f[w],o[i++]=f[w+1],n[i++]=b,n[i++]=s}}packQuadAttributes(e,o,n,i,r){const s=e.texture,l=e.transform,a=l.a,c=l.b,u=l.c,p=l.d,y=l.tx,d=l.ty,g=e.bounds,f=g.maxX,b=g.minX,h=g.maxY,m=g.minY,k=s.uvs,w=e.color,v=r<<16|e.roundPixels&65535;o[i+0]=a*b+u*m+y,o[i+1]=p*m+c*b+d,o[i+2]=k.x0,o[i+3]=k.y0,n[i+4]=w,n[i+5]=v,o[i+6]=a*f+u*m+y,o[i+7]=p*m+c*f+d,o[i+8]=k.x1,o[i+9]=k.y1,n[i+10]=w,n[i+11]=v,o[i+12]=a*f+u*h+y,o[i+13]=p*h+c*f+d,o[i+14]=k.x2,o[i+15]=k.y2,n[i+16]=w,n[i+17]=v,o[i+18]=a*b+u*h+y,o[i+19]=p*h+c*b+d,o[i+20]=k.x3,o[i+21]=k.y3,n[i+22]=w,n[i+23]=v}};r1.extension={type:[N.Batcher],name:"default"};let nE=r1;function iE(t,e,o,n,i,r,s,l=null){let a=0;o*=e,i*=r;const c=l.a,u=l.b,p=l.c,y=l.d,d=l.tx,g=l.ty;for(;a<s;){const f=t[o],b=t[o+1];n[i]=c*f+p*b+d,n[i+1]=u*f+y*b+g,i+=r,o+=e,a++}}function rE(t,e,o,n){let i=0;for(e*=o;i<n;)t[e]=0,t[e+1]=0,e+=o,i++}function l1(t,e,o,n,i){const r=e.a,s=e.b,l=e.c,a=e.d,c=e.tx,u=e.ty;o=o||0,n=n||2,i=i||t.length/n-o;let p=o*n;for(let y=0;y<i;y++){const d=t[p],g=t[p+1];t[p]=r*d+l*g+c,t[p+1]=s*d+a*g+u,p+=n}}function sE(t,e){if(t===16777215||!e)return e;if(e===16777215||!t)return t;const o=t>>16&255,n=t>>8&255,i=t&255,r=e>>16&255,s=e>>8&255,l=e&255,a=o*r/255,c=n*s/255,u=i*l/255;return(a<<16)+(c<<8)+u}const lE=new le;class a1{constructor(){this.packAsQuad=!1,this.batcherName="default",this.applyTransform=!0,this.roundPixels=0,this._batcher=null,this._batch=null}get uvs(){return this.geometryData.uvs}get positions(){return this.geometryData.vertices}get indices(){return this.geometryData.indices}get blendMode(){return this.applyTransform?this.renderable.groupBlendMode:"normal"}get color(){const e=this.baseColor,o=e>>16|e&65280|(e&255)<<16,n=this.renderable;return n?sE(o,n.groupColor)+(this.alpha*n.groupAlpha*255<<24):o+(this.alpha*255<<24)}get transform(){return this.renderable?.groupTransform||lE}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.attributeOffset=this.attributeOffset,e.attributeSize=this.attributeSize,e.baseColor=this.baseColor,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}reset(){this.applyTransform=!0,this.renderable=null}}const Cs={extension:{type:N.ShapeBuilder,name:"circle"},build(t,e){let o,n,i,r,s,l;if(t.type==="circle"){const w=t;o=w.x,n=w.y,s=l=w.radius,i=r=0}else if(t.type==="ellipse"){const w=t;o=w.x,n=w.y,s=w.halfWidth,l=w.halfHeight,i=r=0}else{const w=t,v=w.width/2,E=w.height/2;o=w.x+v,n=w.y+E,s=l=Math.max(0,Math.min(w.radius,Math.min(v,E))),i=v-s,r=E-l}if(!(s>=0&&l>=0&&i>=0&&r>=0))return e;const a=Math.ceil(2.3*Math.sqrt(s+l)),c=a*8+(i?4:0)+(r?4:0);if(c===0)return e;if(a===0)return e[0]=e[6]=o+i,e[1]=e[3]=n+r,e[2]=e[4]=o-i,e[5]=e[7]=n-r,e;let u=0,p=a*4+(i?2:0)+2,y=p,d=c,g=i+s,f=r,b=o+g,h=o-g,m=n+f;if(e[u++]=b,e[u++]=m,e[--p]=m,e[--p]=h,r){const w=n-f;e[y++]=h,e[y++]=w,e[--d]=w,e[--d]=b}for(let w=1;w<a;w++){const v=Math.PI/2*(w/a),E=i+Math.cos(v)*s,z=r+Math.sin(v)*l,S=o+E,C=o-E,_=n+z,D=n-z;e[u++]=S,e[u++]=_,e[--p]=_,e[--p]=C,e[y++]=C,e[y++]=D,e[--d]=D,e[--d]=S}g=i,f=r+l,b=o+g,h=o-g,m=n+f;const k=n-f;return e[u++]=b,e[u++]=m,e[--d]=k,e[--d]=b,i&&(e[u++]=h,e[u++]=m,e[--d]=k,e[--d]=h),e},triangulate(t,e,o,n,i,r){if(t.length===0)return;let s=0,l=0;for(let u=0;u<t.length;u+=2)s+=t[u],l+=t[u+1];s/=t.length/2,l/=t.length/2;let a=n;e[a*o]=s,e[a*o+1]=l;const c=a++;for(let u=0;u<t.length;u+=2)e[a*o]=t[u],e[a*o+1]=t[u+1],u>0&&(i[r++]=a,i[r++]=c,i[r++]=a-1),a++;i[r++]=c+1,i[r++]=c,i[r++]=a-1}},aE={...Cs,extension:{...Cs.extension,name:"ellipse"}},cE={...Cs,extension:{...Cs.extension,name:"roundedRectangle"}},uE=1e-4,wg=1e-4;function pE(t){const e=t.length;if(e<6)return 1;let o=0;for(let n=0,i=t[e-2],r=t[e-1];n<e;n+=2){const s=t[n],l=t[n+1];o+=(s-i)*(l+r),i=s,r=l}return o<0?-1:1}function vg(t,e,o,n,i,r,s,l){const a=t-o*i,c=e-n*i,u=t+o*r,p=e+n*r;let y,d;s?(y=n,d=-o):(y=-n,d=o);const g=a+y,f=c+d,b=u+y,h=p+d;return l.push(g,f),l.push(b,h),2}function wn(t,e,o,n,i,r,s,l){const a=o-t,c=n-e;let u=Math.atan2(a,c),p=Math.atan2(i-t,r-e);l&&u<p?u+=Math.PI*2:!l&&u>p&&(p+=Math.PI*2);let y=u;const d=p-u,g=Math.abs(d),f=Math.sqrt(a*a+c*c),b=(15*g*Math.sqrt(f)/Math.PI>>0)+1,h=d/b;if(y+=h,l){s.push(t,e),s.push(o,n);for(let m=1,k=y;m<b;m++,k+=h)s.push(t,e),s.push(t+Math.sin(k)*f,e+Math.cos(k)*f);s.push(t,e),s.push(i,r)}else{s.push(o,n),s.push(t,e);for(let m=1,k=y;m<b;m++,k+=h)s.push(t+Math.sin(k)*f,e+Math.cos(k)*f),s.push(t,e);s.push(i,r),s.push(t,e)}return b*2}function yE(t,e,o,n,i,r,s,l,a){const c=uE;if(t.length===0)return;const u=e;let p=u.alignment;if(e.alignment!==.5){let A=pE(t);p=(p-.5)*A+.5}const y=new qe(t[0],t[1]),d=new qe(t[t.length-2],t[t.length-1]),g=n,f=Math.abs(y.x-d.x)<c&&Math.abs(y.y-d.y)<c;if(g){t=t.slice(),f&&(t.pop(),t.pop(),d.set(t[t.length-2],t[t.length-1]));const A=(y.x+d.x)*.5,L=(d.y+y.y)*.5;t.unshift(A,L),t.push(A,L)}const b=i,h=t.length/2;let m=t.length;const k=b.length/2,w=u.width/2,v=w*w,E=u.miterLimit*u.miterLimit;let z=t[0],S=t[1],C=t[2],_=t[3],D=0,B=0,M=-(S-_),j=z-C,W=0,H=0,F=Math.sqrt(M*M+j*j);M/=F,j/=F,M*=w,j*=w;const Z=p,R=(1-Z)*2,T=Z*2;g||(u.cap==="round"?m+=wn(z-M*(R-T)*.5,S-j*(R-T)*.5,z-M*R,S-j*R,z+M*T,S+j*T,b,!0)+2:u.cap==="square"&&(m+=vg(z,S,M,j,R,T,!0,b))),b.push(z-M*R,S-j*R),b.push(z+M*T,S+j*T);for(let A=1;A<h-1;++A){z=t[(A-1)*2],S=t[(A-1)*2+1],C=t[A*2],_=t[A*2+1],D=t[(A+1)*2],B=t[(A+1)*2+1],M=-(S-_),j=z-C,F=Math.sqrt(M*M+j*j),M/=F,j/=F,M*=w,j*=w,W=-(_-B),H=C-D,F=Math.sqrt(W*W+H*H),W/=F,H/=F,W*=w,H*=w;const L=C-z,X=S-_,G=C-D,K=B-_,re=L*G+X*K,Ze=X*G-K*L,Ke=Ze<0;if(Math.abs(Ze)<.001*Math.abs(re)){b.push(C-M*R,_-j*R),b.push(C+M*T,_+j*T),re>=0&&(u.join==="round"?m+=wn(C,_,C-M*R,_-j*R,C-W*R,_-H*R,b,!1)+4:m+=2,b.push(C-W*T,_-H*T),b.push(C+W*R,_+H*R));continue}const yo=(-M+z)*(-j+_)-(-M+C)*(-j+S),Ws=(-W+D)*(-H+_)-(-W+C)*(-H+B),ai=(L*Ws-G*yo)/Ze,fo=(K*yo-X*Ws)/Ze,bc=(ai-C)*(ai-C)+(fo-_)*(fo-_),mn=C+(ai-C)*R,bn=_+(fo-_)*R,xn=C-(ai-C)*T,kn=_-(fo-_)*T,Nv=Math.min(L*L+X*X,G*G+K*K),Rf=Ke?R:T,Lv=Nv+Rf*Rf*v;bc<=Lv?u.join==="bevel"||bc/v>E?(Ke?(b.push(mn,bn),b.push(C+M*T,_+j*T),b.push(mn,bn),b.push(C+W*T,_+H*T)):(b.push(C-M*R,_-j*R),b.push(xn,kn),b.push(C-W*R,_-H*R),b.push(xn,kn)),m+=2):u.join==="round"?Ke?(b.push(mn,bn),b.push(C+M*T,_+j*T),m+=wn(C,_,C+M*T,_+j*T,C+W*T,_+H*T,b,!0)+4,b.push(mn,bn),b.push(C+W*T,_+H*T)):(b.push(C-M*R,_-j*R),b.push(xn,kn),m+=wn(C,_,C-M*R,_-j*R,C-W*R,_-H*R,b,!1)+4,b.push(C-W*R,_-H*R),b.push(xn,kn)):(b.push(mn,bn),b.push(xn,kn)):(b.push(C-M*R,_-j*R),b.push(C+M*T,_+j*T),u.join==="round"?Ke?m+=wn(C,_,C+M*T,_+j*T,C+W*T,_+H*T,b,!0)+2:m+=wn(C,_,C-M*R,_-j*R,C-W*R,_-H*R,b,!1)+2:u.join==="miter"&&bc/v<=E&&(Ke?(b.push(xn,kn),b.push(xn,kn)):(b.push(mn,bn),b.push(mn,bn)),m+=2),b.push(C-W*R,_-H*R),b.push(C+W*T,_+H*T),m+=2)}z=t[(h-2)*2],S=t[(h-2)*2+1],C=t[(h-1)*2],_=t[(h-1)*2+1],M=-(S-_),j=z-C,F=Math.sqrt(M*M+j*j),M/=F,j/=F,M*=w,j*=w,b.push(C-M*R,_-j*R),b.push(C+M*T,_+j*T),g||(u.cap==="round"?m+=wn(C-M*(R-T)*.5,_-j*(R-T)*.5,C-M*R,_-j*R,C+M*T,_+j*T,b,!1)+2:u.cap==="square"&&(m+=vg(C,_,M,j,R,T,!1,b)));const Q=wg*wg;for(let A=k;A<m+k-2;++A)z=b[A*2],S=b[A*2+1],C=b[(A+1)*2],_=b[(A+1)*2+1],D=b[(A+2)*2],B=b[(A+2)*2+1],!(Math.abs(z*(_-B)+C*(B-S)+D*(S-_))<Q)&&l.push(A,A+1,A+2)}function c1(t,e,o,n,i,r,s){const l=J4(t,e,2);if(!l)return;for(let c=0;c<l.length;c+=3)r[s++]=l[c]+i,r[s++]=l[c+1]+i,r[s++]=l[c+2]+i;let a=i*n;for(let c=0;c<t.length;c+=2)o[a]=t[c],o[a+1]=t[c+1],a+=n}const dE=[],fE={extension:{type:N.ShapeBuilder,name:"polygon"},build(t,e){for(let o=0;o<t.points.length;o++)e[o]=t.points[o];return e},triangulate(t,e,o,n,i,r){c1(t,dE,e,o,n,i,r)}},hE={extension:{type:N.ShapeBuilder,name:"rectangle"},build(t,e){const o=t,n=o.x,i=o.y,r=o.width,s=o.height;return r>=0&&s>=0&&(e[0]=n,e[1]=i,e[2]=n+r,e[3]=i,e[4]=n+r,e[5]=i+s,e[6]=n,e[7]=i+s),e},triangulate(t,e,o,n,i,r){let s=0;n*=o,e[n+s]=t[0],e[n+s+1]=t[1],s+=o,e[n+s]=t[2],e[n+s+1]=t[3],s+=o,e[n+s]=t[6],e[n+s+1]=t[7],s+=o,e[n+s]=t[4],e[n+s+1]=t[5],s+=o;const l=n/o;i[r++]=l,i[r++]=l+1,i[r++]=l+2,i[r++]=l+1,i[r++]=l+3,i[r++]=l+2}},gE={extension:{type:N.ShapeBuilder,name:"triangle"},build(t,e){return e[0]=t.x,e[1]=t.y,e[2]=t.x2,e[3]=t.y2,e[4]=t.x3,e[5]=t.y3,e},triangulate(t,e,o,n,i,r){let s=0;n*=o,e[n+s]=t[0],e[n+s+1]=t[1],s+=o,e[n+s]=t[2],e[n+s+1]=t[3],s+=o,e[n+s]=t[4],e[n+s+1]=t[5];const l=n/o;i[r++]=l,i[r++]=l+1,i[r++]=l+2}},ac={};tt.handleByMap(N.ShapeBuilder,ac);tt.add(hE,fE,gE,Cs,aE,cE);const mE=new Te;function bE(t,e){const{geometryData:o,batches:n}=e;n.length=0,o.indices.length=0,o.vertices.length=0,o.uvs.length=0;for(let i=0;i<t.instructions.length;i++){const r=t.instructions[i];if(r.action==="texture")xE(r.data,n,o);else if(r.action==="fill"||r.action==="stroke"){const s=r.action==="stroke",l=r.data.path.shapePath,a=r.data.style,c=r.data.hole;s&&c&&zg(c.shapePath,a,null,!0,n,o),zg(l,a,c,s,n,o)}}}function xE(t,e,o){const{vertices:n,uvs:i,indices:r}=o,s=r.length,l=n.length/2,a=[],c=ac.rectangle,u=mE,p=t.image;u.x=t.dx,u.y=t.dy,u.width=t.dw,u.height=t.dh;const y=t.transform;c.build(u,a),y&&l1(a,y),c.triangulate(a,n,2,l,r,s);const d=p.uvs;i.push(d.x0,d.y0,d.x1,d.y1,d.x3,d.y3,d.x2,d.y2);const g=Eo.get(a1);g.indexOffset=s,g.indexSize=r.length-s,g.attributeOffset=l,g.attributeSize=n.length/2-l,g.baseColor=t.style,g.alpha=t.alpha,g.texture=p,g.geometryData=o,e.push(g)}function zg(t,e,o,n,i,r){const{vertices:s,uvs:l,indices:a}=r,c=t.shapePrimitives.length-1;t.shapePrimitives.forEach(({shape:u,transform:p},y)=>{const d=a.length,g=s.length/2,f=[],b=ac[u.type];if(b.build(u,f),p&&l1(f,p),n){const w=u.closePath??!0;yE(f,e,!1,w,s,2,g,a)}else if(o&&c===y){c!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const w=[],v=f.slice();kE(o.shapePath).forEach(z=>{w.push(v.length/2),v.push(...z)}),c1(v,w,s,2,g,a,d)}else b.triangulate(f,s,2,g,a,d);const h=l.length/2,m=e.texture;if(m!==V.WHITE){const w=e.matrix;w&&(p&&w.append(p.clone().invert()),iE(s,2,g,l,h,2,s.length/2-g,w))}else rE(l,h,2,s.length/2-g);const k=Eo.get(a1);k.indexOffset=d,k.indexSize=a.length-d,k.attributeOffset=g,k.attributeSize=s.length/2-g,k.baseColor=e.color,k.alpha=e.alpha,k.texture=m,k.geometryData=r,i.push(k)})}function kE(t){if(!t)return[];const e=t.shapePrimitives,o=[];for(let n=0;n<e.length;n++){const i=e[n].shape,r=[];ac[i.type].build(i,r),o.push(r)}return o}class wE{constructor(){this.batches=[],this.geometryData={vertices:[],uvs:[],indices:[]}}}class vE{constructor(){this.batcher=new nE,this.instructions=new mx}init(){this.instructions.reset()}get geometry(){return $(Cz,"GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."),this.batcher.geometry}}const Ud=class ry{constructor(){this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null)}init(e){ry.defaultOptions.bezierSmoothness=e?.bezierSmoothness??ry.defaultOptions.bezierSmoothness}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let o=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){o?this._cleanGraphicsContextData(e):o=this._initContext(e),bE(e,o);const n=e.batchMode;e.customShader||n==="no-batch"?o.isBatchable=!1:n==="auto"&&(o.isBatchable=o.geometryData.vertices.length<400),e.dirty=!1}return o}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_initContextRenderData(e){const o=Eo.get(vE),{batches:n,geometryData:i}=this._gpuContextHash[e.uid],r=i.vertices.length,s=i.indices.length;for(let u=0;u<n.length;u++)n[u].applyTransform=!1;const l=o.batcher;l.ensureAttributeBuffer(r),l.ensureIndexBuffer(s),l.begin();for(let u=0;u<n.length;u++){const p=n[u];l.add(p)}l.finish(o.instructions);const a=l.geometry;a.indexBuffer.setDataWithSize(l.indexBuffer,l.indexSize,!0),a.buffers[0].setDataWithSize(l.attributeBuffer.float32View,l.attributeSize,!0);const c=l.batches;for(let u=0;u<c.length;u++){const p=c[u];p.bindGroup=mS(p.textures.textures,p.textures.count)}return this._graphicsDataContextHash[e.uid]=o,o}_initContext(e){const o=new wE;return o.context=e,this._gpuContextHash[e.uid]=o,e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),e.off("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const o=this._gpuContextHash[e.uid];o.isBatchable||this._graphicsDataContextHash[e.uid]&&(Eo.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),o.batches&&o.batches.forEach(n=>{Eo.return(n)})}destroy(){for(const e in this._gpuContextHash)this._gpuContextHash[e]&&this.onGraphicsContextDestroy(this._gpuContextHash[e].context)}};Ud.extension={type:[N.WebGLSystem,N.WebGPUSystem,N.CanvasSystem],name:"graphicsContext"};Ud.defaultOptions={bezierSmoothness:.5};let u1=Ud;const zE=8,kl=11920929e-14,SE=1;function p1(t,e,o,n,i,r,s,l,a,c){const p=Math.min(.99,Math.max(0,c??u1.defaultOptions.bezierSmoothness));let y=(SE-p)/1;return y*=y,EE(e,o,n,i,r,s,l,a,t,y),t}function EE(t,e,o,n,i,r,s,l,a,c){sy(t,e,o,n,i,r,s,l,a,c,0),a.push(s,l)}function sy(t,e,o,n,i,r,s,l,a,c,u){if(u>zE)return;const p=(t+o)/2,y=(e+n)/2,d=(o+i)/2,g=(n+r)/2,f=(i+s)/2,b=(r+l)/2,h=(p+d)/2,m=(y+g)/2,k=(d+f)/2,w=(g+b)/2,v=(h+k)/2,E=(m+w)/2;if(u>0){let z=s-t,S=l-e;const C=Math.abs((o-s)*S-(n-l)*z),_=Math.abs((i-s)*S-(r-l)*z);if(C>kl&&_>kl){if((C+_)*(C+_)<=c*(z*z+S*S)){a.push(v,E);return}}else if(C>kl){if(C*C<=c*(z*z+S*S)){a.push(v,E);return}}else if(_>kl){if(_*_<=c*(z*z+S*S)){a.push(v,E);return}}else if(z=v-(t+s)/2,S=E-(e+l)/2,z*z+S*S<=c){a.push(v,E);return}}sy(t,e,p,y,h,m,v,E,a,c,u+1),sy(v,E,k,w,f,b,s,l,a,c,u+1)}const _E=8,CE=11920929e-14,ZE=1;function AE(t,e,o,n,i,r,s,l){const c=Math.min(.99,Math.max(0,l??u1.defaultOptions.bezierSmoothness));let u=(ZE-c)/1;return u*=u,RE(e,o,n,i,r,s,t,u),t}function RE(t,e,o,n,i,r,s,l){ly(s,t,e,o,n,i,r,l,0),s.push(i,r)}function ly(t,e,o,n,i,r,s,l,a){if(a>_E)return;const c=(e+n)/2,u=(o+i)/2,p=(n+r)/2,y=(i+s)/2,d=(c+p)/2,g=(u+y)/2;let f=r-e,b=s-o;const h=Math.abs((n-r)*b-(i-s)*f);if(h>CE){if(h*h<=l*(f*f+b*b)){t.push(d,g);return}}else if(f=d-(e+r)/2,b=g-(o+s)/2,f*f+b*b<=l){t.push(d,g);return}ly(t,e,o,c,u,d,g,l,a+1),ly(t,d,g,p,y,r,s,l,a+1)}function y1(t,e,o,n,i,r,s,l){let a=Math.abs(i-r);(!s&&i>r||s&&r>i)&&(a=2*Math.PI-a),l=l||Math.max(6,Math.floor(6*Math.pow(n,1/3)*(a/Math.PI))),l=Math.max(l,3);let c=a/l,u=i;c*=s?-1:1;for(let p=0;p<l+1;p++){const y=Math.cos(u),d=Math.sin(u),g=e+y*n,f=o+d*n;t.push(g,f),u+=c}}function PE(t,e,o,n,i,r){const s=t[t.length-2],a=t[t.length-1]-o,c=s-e,u=i-o,p=n-e,y=Math.abs(a*p-c*u);if(y<1e-8||r===0){(t[t.length-2]!==e||t[t.length-1]!==o)&&t.push(e,o);return}const d=a*a+c*c,g=u*u+p*p,f=a*u+c*p,b=r*Math.sqrt(d)/y,h=r*Math.sqrt(g)/y,m=b*f/d,k=h*f/g,w=b*p+h*c,v=b*u+h*a,E=c*(h+m),z=a*(h+m),S=p*(b+k),C=u*(b+k),_=Math.atan2(z-v,E-w),D=Math.atan2(C-v,S-w);y1(t,w+e,v+o,r,_,D,c*u>p*a)}const os=Math.PI*2,xu={centerX:0,centerY:0,ang1:0,ang2:0},ku=({x:t,y:e},o,n,i,r,s,l,a)=>{t*=o,e*=n;const c=i*t-r*e,u=r*t+i*e;return a.x=c+s,a.y=u+l,a};function TE(t,e){const o=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),n=e===1.5707963267948966?.551915024494:o,i=Math.cos(t),r=Math.sin(t),s=Math.cos(t+e),l=Math.sin(t+e);return[{x:i-r*n,y:r+i*n},{x:s+l*n,y:l-s*n},{x:s,y:l}]}const Sg=(t,e,o,n)=>{const i=t*n-e*o<0?-1:1;let r=t*o+e*n;return r>1&&(r=1),r<-1&&(r=-1),i*Math.acos(r)},jE=(t,e,o,n,i,r,s,l,a,c,u,p,y)=>{const d=Math.pow(i,2),g=Math.pow(r,2),f=Math.pow(u,2),b=Math.pow(p,2);let h=d*g-d*b-g*f;h<0&&(h=0),h/=d*b+g*f,h=Math.sqrt(h)*(s===l?-1:1);const m=h*i/r*p,k=h*-r/i*u,w=c*m-a*k+(t+o)/2,v=a*m+c*k+(e+n)/2,E=(u-m)/i,z=(p-k)/r,S=(-u-m)/i,C=(-p-k)/r,_=Sg(1,0,E,z);let D=Sg(E,z,S,C);l===0&&D>0&&(D-=os),l===1&&D<0&&(D+=os),y.centerX=w,y.centerY=v,y.ang1=_,y.ang2=D};function IE(t,e,o,n,i,r,s,l=0,a=0,c=0){if(r===0||s===0)return;const u=Math.sin(l*os/360),p=Math.cos(l*os/360),y=p*(e-n)/2+u*(o-i)/2,d=-u*(e-n)/2+p*(o-i)/2;if(y===0&&d===0)return;r=Math.abs(r),s=Math.abs(s);const g=Math.pow(y,2)/Math.pow(r,2)+Math.pow(d,2)/Math.pow(s,2);g>1&&(r*=Math.sqrt(g),s*=Math.sqrt(g)),jE(e,o,n,i,r,s,a,c,u,p,y,d,xu);let{ang1:f,ang2:b}=xu;const{centerX:h,centerY:m}=xu;let k=Math.abs(b)/(os/4);Math.abs(1-k)<1e-7&&(k=1);const w=Math.max(Math.ceil(k),1);b/=w;let v=t[t.length-2],E=t[t.length-1];const z={x:0,y:0};for(let S=0;S<w;S++){const C=TE(f,b),{x:_,y:D}=ku(C[0],r,s,p,u,h,m,z),{x:B,y:M}=ku(C[1],r,s,p,u,h,m,z),{x:j,y:W}=ku(C[2],r,s,p,u,h,m,z);p1(t,v,E,_,D,B,M,j,W),v=j,E=W,f+=b}}function FE(t,e,o){const n=(s,l)=>{const a=l.x-s.x,c=l.y-s.y,u=Math.sqrt(a*a+c*c),p=a/u,y=c/u;return{len:u,nx:p,ny:y}},i=(s,l)=>{s===0?t.moveTo(l.x,l.y):t.lineTo(l.x,l.y)};let r=e[e.length-1];for(let s=0;s<e.length;s++){const l=e[s%e.length],a=l.radius??o;if(a<=0){i(s,l),r=l;continue}const c=e[(s+1)%e.length],u=n(l,r),p=n(l,c);if(u.len<1e-4||p.len<1e-4){i(s,l),r=l;continue}let y=Math.asin(u.nx*p.ny-u.ny*p.nx),d=1,g=!1;u.nx*p.nx-u.ny*-p.ny<0?y<0?y=Math.PI+y:(y=Math.PI-y,d=-1,g=!0):y>0&&(d=-1,g=!0);const f=y/2;let b,h=Math.abs(Math.cos(f)*a/Math.sin(f));h>Math.min(u.len/2,p.len/2)?(h=Math.min(u.len/2,p.len/2),b=Math.abs(h*Math.sin(f)/Math.cos(f))):b=a;const m=l.x+p.nx*h+-p.ny*b*d,k=l.y+p.ny*h+p.nx*b*d,w=Math.atan2(u.ny,u.nx)+Math.PI/2*d,v=Math.atan2(p.ny,p.nx)-Math.PI/2*d;s===0&&t.moveTo(m+Math.cos(w)*b,k+Math.sin(w)*b),t.arc(m,k,b,w,v,g),r=l}}function ME(t,e,o,n){const i=(l,a)=>Math.sqrt((l.x-a.x)**2+(l.y-a.y)**2),r=(l,a,c)=>({x:l.x+(a.x-l.x)*c,y:l.y+(a.y-l.y)*c}),s=e.length;for(let l=0;l<s;l++){const a=e[(l+1)%s],c=a.radius??o;if(c<=0){l===0?t.moveTo(a.x,a.y):t.lineTo(a.x,a.y);continue}const u=e[l],p=e[(l+2)%s],y=i(u,a);let d;if(y<1e-4)d=a;else{const b=Math.min(y/2,c);d=r(a,u,b/y)}const g=i(p,a);let f;if(g<1e-4)f=a;else{const b=Math.min(g/2,c);f=r(a,p,b/g)}l===0?t.moveTo(d.x,d.y):t.lineTo(d.x,d.y),t.quadraticCurveTo(a.x,a.y,f.x,f.y,n)}}const OE=new Te;class DE{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new co,this._graphicsPath2D=e}moveTo(e,o){return this.startPoly(e,o),this}lineTo(e,o){this._ensurePoly();const n=this._currentPoly.points,i=n[n.length-2],r=n[n.length-1];return(i!==e||r!==o)&&n.push(e,o),this}arc(e,o,n,i,r,s){this._ensurePoly(!1);const l=this._currentPoly.points;return y1(l,e,o,n,i,r,s),this}arcTo(e,o,n,i,r){this._ensurePoly();const s=this._currentPoly.points;return PE(s,e,o,n,i,r),this}arcToSvg(e,o,n,i,r,s,l){const a=this._currentPoly.points;return IE(a,this._currentPoly.lastX,this._currentPoly.lastY,s,l,e,o,n,i,r),this}bezierCurveTo(e,o,n,i,r,s,l){this._ensurePoly();const a=this._currentPoly;return p1(this._currentPoly.points,a.lastX,a.lastY,e,o,n,i,r,s,l),this}quadraticCurveTo(e,o,n,i,r){this._ensurePoly();const s=this._currentPoly;return AE(this._currentPoly.points,s.lastX,s.lastY,e,o,n,i,r),this}closePath(){return this.endPoly(!0),this}addPath(e,o){this.endPoly(),o&&!o.isIdentity()&&(e=e.clone(!0),e.transform(o));for(let n=0;n<e.instructions.length;n++){const i=e.instructions[n];this[i.action](...i.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,o,n,i,r){return this.drawShape(new Te(e,o,n,i),r),this}circle(e,o,n,i){return this.drawShape(new Dd(e,o,n),i),this}poly(e,o,n){const i=new ts(e);return i.closePath=o,this.drawShape(i,n),this}regularPoly(e,o,n,i,r=0,s){i=Math.max(i|0,3);const l=-1*Math.PI/2+r,a=Math.PI*2/i,c=[];for(let u=0;u<i;u++){const p=u*a+l;c.push(e+n*Math.cos(p),o+n*Math.sin(p))}return this.poly(c,!0,s),this}roundPoly(e,o,n,i,r,s=0,l){if(i=Math.max(i|0,3),r<=0)return this.regularPoly(e,o,n,i,s);const a=n*Math.sin(Math.PI/i)-.001;r=Math.min(r,a);const c=-1*Math.PI/2+s,u=Math.PI*2/i,p=(i-2)*Math.PI/i/2;for(let y=0;y<i;y++){const d=y*u+c,g=e+n*Math.cos(d),f=o+n*Math.sin(d),b=d+Math.PI+p,h=d-Math.PI-p,m=g+r*Math.cos(b),k=f+r*Math.sin(b),w=g+r*Math.cos(h),v=f+r*Math.sin(h);y===0?this.moveTo(m,k):this.lineTo(m,k),this.quadraticCurveTo(g,f,w,v,l)}return this.closePath()}roundShape(e,o,n=!1,i){return e.length<3?this:(n?ME(this,e,o,i):FE(this,e,o),this.closePath())}filletRect(e,o,n,i,r){if(r===0)return this.rect(e,o,n,i);const s=Math.min(n,i)/2,l=Math.min(s,Math.max(-s,r)),a=e+n,c=o+i,u=l<0?-l:0,p=Math.abs(l);return this.moveTo(e,o+p).arcTo(e+u,o+u,e+p,o,p).lineTo(a-p,o).arcTo(a-u,o+u,a,o+p,p).lineTo(a,c-p).arcTo(a-u,c-u,e+n-p,c,p).lineTo(e+p,c).arcTo(e+u,c-u,e,c-p,p).closePath()}chamferRect(e,o,n,i,r,s){if(r<=0)return this.rect(e,o,n,i);const l=Math.min(r,Math.min(n,i)/2),a=e+n,c=o+i,u=[e+l,o,a-l,o,a,o+l,a,c-l,a-l,c,e+l,c,e,c-l,e,o+l];for(let p=u.length-1;p>=2;p-=2)u[p]===u[p-2]&&u[p-1]===u[p-3]&&u.splice(p-1,2);return this.poly(u,!0,s)}ellipse(e,o,n,i,r){return this.drawShape(new Bd(e,o,n,i),r),this}roundRect(e,o,n,i,r,s){return this.drawShape(new Gd(e,o,n,i,r),s),this}drawShape(e,o){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:o}),this}startPoly(e,o){let n=this._currentPoly;return n&&this.endPoly(),n=new ts,n.points.push(e,o),this._currentPoly=n,this}endPoly(e=!1){const o=this._currentPoly;return o&&o.points.length>2&&(o.closePath=e,this.shapePrimitives.push({shape:o})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new ts,e)){const o=this.shapePrimitives[this.shapePrimitives.length-1];if(o){let n=o.shape.x,i=o.shape.y;if(o.transform&&!o.transform.isIdentity()){const r=o.transform,s=n;n=r.a*n+r.c*i+r.tx,i=r.b*s+r.d*i+r.ty}this._currentPoly.points.push(n,i)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let o=0;o<e.instructions.length;o++){const n=e.instructions[o];this[n.action](...n.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const o=this.shapePrimitives;for(let n=0;n<o.length;n++){const i=o[n],r=i.shape.getBounds(OE);i.transform?e.addRect(r,i.transform):e.addRect(r)}return e}}class rr{constructor(e){this.instructions=[],this.uid=je("graphicsPath"),this._dirty=!0,typeof e=="string"?yS(e,this):this.instructions=e?.slice()??[]}get shapePath(){return this._shapePath||(this._shapePath=new DE(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,o){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,o]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,o,n,i,r){const s=this.instructions[this.instructions.length-1],l=this.getLastPoint(qe.shared);let a=0,c=0;if(!s||s.action!=="bezierCurveTo")a=l.x,c=l.y;else{a=s.data[2],c=s.data[3];const u=l.x,p=l.y;a=u+(u-a),c=p+(p-c)}return this.instructions.push({action:"bezierCurveTo",data:[a,c,e,o,n,i,r]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,o,n){const i=this.instructions[this.instructions.length-1],r=this.getLastPoint(qe.shared);let s=0,l=0;if(!i||i.action!=="quadraticCurveTo")s=r.x,l=r.y;else{s=i.data[0],l=i.data[1];const a=r.x,c=r.y;s=a+(a-s),l=c+(c-l)}return this.instructions.push({action:"quadraticCurveTo",data:[s,l,e,o,n]}),this._dirty=!0,this}rect(e,o,n,i,r){return this.instructions.push({action:"rect",data:[e,o,n,i,r]}),this._dirty=!0,this}circle(e,o,n,i){return this.instructions.push({action:"circle",data:[e,o,n,i]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}regularPoly(...e){return this.instructions.push({action:"regularPoly",data:e}),this._dirty=!0,this}roundPoly(...e){return this.instructions.push({action:"roundPoly",data:e}),this._dirty=!0,this}roundShape(...e){return this.instructions.push({action:"roundShape",data:e}),this._dirty=!0,this}filletRect(...e){return this.instructions.push({action:"filletRect",data:e}),this._dirty=!0,this}chamferRect(...e){return this.instructions.push({action:"chamferRect",data:e}),this._dirty=!0,this}star(e,o,n,i,r,s,l){r=r||i/2;const a=-1*Math.PI/2+s,c=n*2,u=Math.PI*2/c,p=[];for(let y=0;y<c;y++){const d=y%2?r:i,g=y*u+a;p.push(e+d*Math.cos(g),o+d*Math.sin(g))}return this.poly(p,!0,l),this}clone(e=!1){const o=new rr;if(!e)o.instructions=this.instructions.slice();else for(let n=0;n<this.instructions.length;n++){const i=this.instructions[n];o.instructions.push({action:i.action,data:i.data.slice()})}return o}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const o=e.a,n=e.b,i=e.c,r=e.d,s=e.tx,l=e.ty;let a=0,c=0,u=0,p=0,y=0,d=0,g=0,f=0;for(let b=0;b<this.instructions.length;b++){const h=this.instructions[b],m=h.data;switch(h.action){case"moveTo":case"lineTo":a=m[0],c=m[1],m[0]=o*a+i*c+s,m[1]=n*a+r*c+l;break;case"bezierCurveTo":u=m[0],p=m[1],y=m[2],d=m[3],a=m[4],c=m[5],m[0]=o*u+i*p+s,m[1]=n*u+r*p+l,m[2]=o*y+i*d+s,m[3]=n*y+r*d+l,m[4]=o*a+i*c+s,m[5]=n*a+r*c+l;break;case"quadraticCurveTo":u=m[0],p=m[1],a=m[2],c=m[3],m[0]=o*u+i*p+s,m[1]=n*u+r*p+l,m[2]=o*a+i*c+s,m[3]=n*a+r*c+l;break;case"arcToSvg":a=m[5],c=m[6],g=m[0],f=m[1],m[0]=o*g+i*f,m[1]=n*g+r*f,m[5]=o*a+i*c+s,m[6]=n*a+r*c+l;break;case"circle":m[4]=Rr(m[3],e);break;case"rect":m[4]=Rr(m[4],e);break;case"ellipse":m[8]=Rr(m[8],e);break;case"roundRect":m[5]=Rr(m[5],e);break;case"addPath":m[0].transform(e);break;case"poly":m[2]=Rr(m[2],e);break;default:Ie("unknown transform action",h.action);break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}getLastPoint(e){let o=this.instructions.length-1,n=this.instructions[o];if(!n)return e.x=0,e.y=0,e;for(;n.action==="closePath";){if(o--,o<0)return e.x=0,e.y=0,e;n=this.instructions[o]}switch(n.action){case"moveTo":case"lineTo":e.x=n.data[0],e.y=n.data[1];break;case"quadraticCurveTo":e.x=n.data[2],e.y=n.data[3];break;case"bezierCurveTo":e.x=n.data[4],e.y=n.data[5];break;case"arc":case"arcToSvg":e.x=n.data[5],e.y=n.data[6];break;case"addPath":n.data[0].getLastPoint(e);break}return e}}function Rr(t,e){return t?t.prepend(e):e.clone()}function BE(t,e){if(typeof t=="string"){const n=document.createElement("div");n.innerHTML=t.trim(),t=n.querySelector("svg")}const o={context:e,path:new rr};return d1(t,o,null,null),e}function d1(t,e,o,n){const i=t.children,{fillStyle:r,strokeStyle:s}=GE(t);r&&o?o={...o,...r}:r&&(o=r),s&&n?n={...n,...s}:s&&(n=s),e.context.fillStyle=o,e.context.strokeStyle=n;let l,a,c,u,p,y,d,g,f,b,h,m,k,w,v,E,z;switch(t.nodeName.toLowerCase()){case"path":w=t.getAttribute("d"),v=new rr(w),e.context.path(v),o&&e.context.fill(),n&&e.context.stroke();break;case"circle":d=Oe(t,"cx",0),g=Oe(t,"cy",0),f=Oe(t,"r",0),e.context.ellipse(d,g,f,f),o&&e.context.fill(),n&&e.context.stroke();break;case"rect":l=Oe(t,"x",0),a=Oe(t,"y",0),E=Oe(t,"width",0),z=Oe(t,"height",0),b=Oe(t,"rx",0),h=Oe(t,"ry",0),b||h?e.context.roundRect(l,a,E,z,b||h):e.context.rect(l,a,E,z),o&&e.context.fill(),n&&e.context.stroke();break;case"ellipse":d=Oe(t,"cx",0),g=Oe(t,"cy",0),b=Oe(t,"rx",0),h=Oe(t,"ry",0),e.context.beginPath(),e.context.ellipse(d,g,b,h),o&&e.context.fill(),n&&e.context.stroke();break;case"line":c=Oe(t,"x1",0),u=Oe(t,"y1",0),p=Oe(t,"x2",0),y=Oe(t,"y2",0),e.context.beginPath(),e.context.moveTo(c,u),e.context.lineTo(p,y),n&&e.context.stroke();break;case"polygon":k=t.getAttribute("points"),m=k.match(/\d+/g).map(S=>parseInt(S,10)),e.context.poly(m,!0),o&&e.context.fill(),n&&e.context.stroke();break;case"polyline":k=t.getAttribute("points"),m=k.match(/\d+/g).map(S=>parseInt(S,10)),e.context.poly(m,!1),n&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${t.nodeName}> elements unsupported`);break}}for(let S=0;S<i.length;S++)d1(i[S],e,o,n)}function Oe(t,e,o){const n=t.getAttribute(e);return n?Number(n):o}function GE(t){const e=t.getAttribute("style"),o={},n={};let i=!1,r=!1;if(e){const s=e.split(";");for(let l=0;l<s.length;l++){const a=s[l],[c,u]=a.split(":");switch(c){case"stroke":u!=="none"&&(o.color=Y.shared.setValue(u).toNumber(),r=!0);break;case"stroke-width":o.width=Number(u);break;case"fill":u!=="none"&&(i=!0,n.color=Y.shared.setValue(u).toNumber());break;case"fill-opacity":n.alpha=Number(u);break;case"stroke-opacity":o.alpha=Number(u);break;case"opacity":n.alpha=Number(u),o.alpha=Number(u);break}}}else{const s=t.getAttribute("stroke");s&&s!=="none"&&(r=!0,o.color=Y.shared.setValue(s).toNumber(),o.width=Oe(t,"stroke-width",1));const l=t.getAttribute("fill");l&&l!=="none"&&(i=!0,n.color=Y.shared.setValue(l).toNumber())}return{strokeStyle:r?o:null,fillStyle:i?n:null}}function UE(t){return Y.isColorLike(t)}function Eg(t){return t instanceof lc}function _g(t){return t instanceof Es}function NE(t,e,o){const n=Y.shared.setValue(e??0);return t.color=n.toNumber(),t.alpha=n.alpha===1?o.alpha:n.alpha,t.texture=V.WHITE,{...o,...t}}function Cg(t,e,o){return t.fill=e,t.color=16777215,t.texture=e.texture,t.matrix=e.transform,{...o,...t}}function Zg(t,e,o){return e.buildLinearGradient(),t.fill=e,t.color=16777215,t.texture=e.texture,t.matrix=e.transform,{...o,...t}}function LE(t,e){const o={...e,...t};if(o.texture){if(o.texture!==V.WHITE){const r=o.matrix?.invert()||new le;r.translate(o.texture.frame.x,o.texture.frame.y),r.scale(1/o.texture.source.width,1/o.texture.source.height),o.matrix=r}const i=o.texture.source.style;i.addressMode==="clamp-to-edge"&&(i.addressMode="repeat",i.update())}const n=Y.shared.setValue(o.color);return o.alpha*=n.alpha,o.color=n.toNumber(),o.matrix=o.matrix?o.matrix.clone():null,o}function On(t,e){if(t==null)return null;const o={},n=t;return UE(t)?NE(o,t,e):Eg(t)?Cg(o,t,e):_g(t)?Zg(o,t,e):n.fill&&Eg(n.fill)?Cg(n,n.fill,e):n.fill&&_g(n.fill)?Zg(n,n.fill,e):LE(n,e)}function Ta(t,e){const{width:o,alignment:n,miterLimit:i,cap:r,join:s,...l}=e,a=On(t,l);return a?{width:o,alignment:n,miterLimit:i,cap:r,join:s,...a}:null}const $E=new qe,Ag=new le,Nd=class to extends Yt{constructor(){super(...arguments),this.uid=je("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new rr,this._transform=new le,this._fillStyle={...to.defaultFillStyle},this._strokeStyle={...to.defaultStrokeStyle},this._stateStack=[],this._tick=0,this._bounds=new co,this._boundsDirty=!0}clone(){const e=new to;return e.batchMode=this.batchMode,e.instructions=this.instructions.slice(),e._activePath=this._activePath.clone(),e._transform=this._transform.clone(),e._fillStyle={...this._fillStyle},e._strokeStyle={...this._strokeStyle},e._stateStack=this._stateStack.slice(),e._bounds=this._bounds.clone(),e._boundsDirty=!0,e}get fillStyle(){return this._fillStyle}set fillStyle(e){this._fillStyle=On(e,to.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(e){this._strokeStyle=Ta(e,to.defaultStrokeStyle)}setFillStyle(e){return this._fillStyle=On(e,to.defaultFillStyle),this}setStrokeStyle(e){return this._strokeStyle=On(e,to.defaultStrokeStyle),this}texture(e,o,n,i,r,s){return this.instructions.push({action:"texture",data:{image:e,dx:n||0,dy:i||0,dw:r||e.frame.width,dh:s||e.frame.height,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:o?Y.shared.setValue(o).toNumber():16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new rr,this}fill(e,o){let n;const i=this.instructions[this.instructions.length-1];return this._tick===0&&i&&i.action==="stroke"?n=i.data.path:n=this._activePath.clone(),n?(e!=null&&(o!==void 0&&typeof e=="number"&&($(ue,"GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),e={color:e,alpha:o}),this._fillStyle=On(e,to.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:n}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}_initNextPathLocation(){const{x:e,y:o}=this._activePath.getLastPoint(qe.shared);this._activePath.clear(),this._activePath.moveTo(e,o)}stroke(e){let o;const n=this.instructions[this.instructions.length-1];return this._tick===0&&n&&n.action==="fill"?o=n.data.path:o=this._activePath.clone(),o?(e!=null&&(this._strokeStyle=Ta(e,to.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:o}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}cut(){for(let e=0;e<2;e++){const o=this.instructions[this.instructions.length-1-e],n=this._activePath.clone();if(o&&(o.action==="stroke"||o.action==="fill"))if(o.data.hole)o.data.hole.addPath(n);else{o.data.hole=n;break}}return this._initNextPathLocation(),this}arc(e,o,n,i,r,s){this._tick++;const l=this._transform;return this._activePath.arc(l.a*e+l.c*o+l.tx,l.b*e+l.d*o+l.ty,n,i,r,s),this}arcTo(e,o,n,i,r){this._tick++;const s=this._transform;return this._activePath.arcTo(s.a*e+s.c*o+s.tx,s.b*e+s.d*o+s.ty,s.a*n+s.c*i+s.tx,s.b*n+s.d*i+s.ty,r),this}arcToSvg(e,o,n,i,r,s,l){this._tick++;const a=this._transform;return this._activePath.arcToSvg(e,o,n,i,r,a.a*s+a.c*l+a.tx,a.b*s+a.d*l+a.ty),this}bezierCurveTo(e,o,n,i,r,s,l){this._tick++;const a=this._transform;return this._activePath.bezierCurveTo(a.a*e+a.c*o+a.tx,a.b*e+a.d*o+a.ty,a.a*n+a.c*i+a.tx,a.b*n+a.d*i+a.ty,a.a*r+a.c*s+a.tx,a.b*r+a.d*s+a.ty,l),this}closePath(){return this._tick++,this._activePath?.closePath(),this}ellipse(e,o,n,i){return this._tick++,this._activePath.ellipse(e,o,n,i,this._transform.clone()),this}circle(e,o,n){return this._tick++,this._activePath.circle(e,o,n,this._transform.clone()),this}path(e){return this._tick++,this._activePath.addPath(e,this._transform.clone()),this}lineTo(e,o){this._tick++;const n=this._transform;return this._activePath.lineTo(n.a*e+n.c*o+n.tx,n.b*e+n.d*o+n.ty),this}moveTo(e,o){this._tick++;const n=this._transform,i=this._activePath.instructions,r=n.a*e+n.c*o+n.tx,s=n.b*e+n.d*o+n.ty;return i.length===1&&i[0].action==="moveTo"?(i[0].data[0]=r,i[0].data[1]=s,this):(this._activePath.moveTo(r,s),this)}quadraticCurveTo(e,o,n,i,r){this._tick++;const s=this._transform;return this._activePath.quadraticCurveTo(s.a*e+s.c*o+s.tx,s.b*e+s.d*o+s.ty,s.a*n+s.c*i+s.tx,s.b*n+s.d*i+s.ty,r),this}rect(e,o,n,i){return this._tick++,this._activePath.rect(e,o,n,i,this._transform.clone()),this}roundRect(e,o,n,i,r){return this._tick++,this._activePath.roundRect(e,o,n,i,r,this._transform.clone()),this}poly(e,o){return this._tick++,this._activePath.poly(e,o,this._transform.clone()),this}regularPoly(e,o,n,i,r=0,s){return this._tick++,this._activePath.regularPoly(e,o,n,i,r,s),this}roundPoly(e,o,n,i,r,s){return this._tick++,this._activePath.roundPoly(e,o,n,i,r,s),this}roundShape(e,o,n,i){return this._tick++,this._activePath.roundShape(e,o,n,i),this}filletRect(e,o,n,i,r){return this._tick++,this._activePath.filletRect(e,o,n,i,r),this}chamferRect(e,o,n,i,r,s){return this._tick++,this._activePath.chamferRect(e,o,n,i,r,s),this}star(e,o,n,i,r=0,s=0){return this._tick++,this._activePath.star(e,o,n,i,r,s,this._transform.clone()),this}svg(e){return this._tick++,BE(e,this),this}restore(){const e=this._stateStack.pop();return e&&(this._transform=e.transform,this._fillStyle=e.fillStyle,this._strokeStyle=e.strokeStyle),this}save(){return this._stateStack.push({transform:this._transform.clone(),fillStyle:{...this._fillStyle},strokeStyle:{...this._strokeStyle}}),this}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(e){return this._transform.rotate(e),this}scale(e,o=e){return this._transform.scale(e,o),this}setTransform(e,o,n,i,r,s){return e instanceof le?(this._transform.set(e.a,e.b,e.c,e.d,e.tx,e.ty),this):(this._transform.set(e,o,n,i,r,s),this)}transform(e,o,n,i,r,s){return e instanceof le?(this._transform.append(e),this):(Ag.set(e,o,n,i,r,s),this._transform.append(Ag),this)}translate(e,o=e){return this._transform.translate(e,o),this}clear(){return this._activePath.clear(),this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const e=this._bounds;e.clear();for(let o=0;o<this.instructions.length;o++){const n=this.instructions[o],i=n.action;if(i==="fill"){const r=n.data;e.addBounds(r.path.bounds)}else if(i==="texture"){const r=n.data;e.addFrame(r.dx,r.dy,r.dx+r.dw,r.dy+r.dh,r.transform)}if(i==="stroke"){const r=n.data,s=r.style.width/2,l=r.path.bounds;e.addFrame(l.minX-s,l.minY-s,l.maxX+s,l.maxY+s)}}return e}containsPoint(e){if(!this.bounds.containsPoint(e.x,e.y))return!1;const o=this.instructions;let n=!1;for(let i=0;i<o.length;i++){const r=o[i],s=r.data,l=s.path;if(!r.action||!l)continue;const a=s.style,c=l.shapePath.shapePrimitives;for(let u=0;u<c.length;u++){const p=c[u].shape;if(!a||!p)continue;const y=c[u].transform,d=y?y.applyInverse(e,$E):e;r.action==="fill"?n=p.contains(d.x,d.y):n=p.strokeContains(d.x,d.y,a.width);const g=s.hole;if(g){const f=g.shapePath?.shapePrimitives;if(f)for(let b=0;b<f.length;b++)f[b].shape.contains(d.x,d.y)&&(n=!1)}if(n)return!0}}return n}destroy(e=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(n),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(n)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};Nd.defaultFillStyle={color:16777215,alpha:1,texture:V.WHITE,matrix:null,fill:null};Nd.defaultStrokeStyle={width:1,color:16777215,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:V.WHITE,matrix:null,fill:null};let At=Nd;const Rg=["align","breakWords","cssOverrides","fontVariant","fontWeight","leading","letterSpacing","lineHeight","padding","textBaseline","trim","whiteSpace","wordWrap","wordWrapWidth","fontFamily","fontStyle","fontSize"];function WE(t){const e=[];let o=0;for(let n=0;n<Rg.length;n++){const i=`_${Rg[n]}`;e[o++]=t[i]}return o=f1(t._fill,e,o),o=HE(t._stroke,e,o),o=XE(t.dropShadow,e,o),e.join("-")}function f1(t,e,o){return t&&(e[o++]=t.color,e[o++]=t.alpha,e[o++]=t.fill?.styleKey),o}function HE(t,e,o){return t&&(o=f1(t,e,o),e[o++]=t.width,e[o++]=t.alignment,e[o++]=t.cap,e[o++]=t.join,e[o++]=t.miterLimit),o}function XE(t,e,o){return t&&(e[o++]=t.alpha,e[o++]=t.angle,e[o++]=t.blur,e[o++]=t.distance,e[o++]=Y.shared.setValue(t.color).toNumber()),o}const Ld=class bi extends Yt{constructor(e={}){super(),VE(e);const o={...bi.defaultTextStyle,...e};for(const n in o){const i=n;this[i]=o[n]}this.update()}get align(){return this._align}set align(e){this._align=e,this.update()}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords=e,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(e){e!==null&&typeof e=="object"?this._dropShadow=this._createProxy({...bi.defaultDropShadow,...e}):this._dropShadow=e?this._createProxy({...bi.defaultDropShadow}):null,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily=e,this.update()}get fontSize(){return this._fontSize}set fontSize(e){typeof e=="string"?this._fontSize=parseInt(e,10):this._fontSize=e,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle=e,this.update()}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant=e,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight=e,this.update()}get leading(){return this._leading}set leading(e){this._leading=e,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing=e,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight=e,this.update()}get padding(){return this._padding}set padding(e){this._padding=e,this.update()}get trim(){return this._trim}set trim(e){this._trim=e,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline=e,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace=e,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap=e,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth=e,this.update()}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...At.defaultFillStyle,...e},()=>{this._fill=On({...this._originalFill},At.defaultFillStyle)})),this._fill=On(e===0?"black":e,At.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...At.defaultStrokeStyle,...e},()=>{this._stroke=Ta({...this._originalStroke},At.defaultStrokeStyle)})),this._stroke=Ta(e,At.defaultStrokeStyle),this.update())}_generateKey(){return this._styleKey=WE(this),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}reset(){const e=bi.defaultTextStyle;for(const o in e)this[o]=e[o]}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new bi({align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(e=!1){if(this.removeAllListeners(),typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(n),this._originalFill?.texture&&this._originalFill.texture.destroy(n),this._stroke?.texture&&this._stroke.texture.destroy(n),this._originalStroke?.texture&&this._originalStroke.texture.destroy(n)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,o){return new Proxy(e,{set:(n,i,r)=>(n[i]=r,o?.(i,r),this.update(),!0)})}_isFillStyle(e){return(e??null)!==null&&!(Y.isColorLike(e)||e instanceof Es||e instanceof lc)}};Ld.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};Ld.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let Zs=Ld;function VE(t){const e=t;if(typeof e.dropShadow=="boolean"&&e.dropShadow){const o=Zs.defaultDropShadow;t.dropShadow={alpha:e.dropShadowAlpha??o.alpha,angle:e.dropShadowAngle??o.angle,blur:e.dropShadowBlur??o.blur,color:e.dropShadowColor??o.color,distance:e.dropShadowDistance??o.distance}}if(e.strokeThickness!==void 0){$(ue,"strokeThickness is now a part of stroke");const o=e.stroke;let n={};if(Y.isColorLike(o))n.color=o;else if(o instanceof Es||o instanceof lc)n.fill=o;else if(Object.hasOwnProperty.call(o,"color")||Object.hasOwnProperty.call(o,"fill"))n=o;else throw new Error("Invalid stroke value.");t.stroke={...n,width:e.strokeThickness}}if(Array.isArray(e.fillGradientStops)){$(ue,"gradient fill is now a fill pattern: `new FillGradient(...)`");let o;t.fontSize==null?t.fontSize=Zs.defaultTextStyle.fontSize:typeof t.fontSize=="string"?o=parseInt(t.fontSize,10):o=t.fontSize;const n=new Es(0,0,0,o*1.7),i=e.fillGradientStops.map(r=>Y.shared.setValue(r).toNumber());i.forEach((r,s)=>{const l=s/(i.length-1);n.addColorStop(l,r)}),t.fill={fill:n}}}class qE{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,o){const n=ze.get().createCanvas();n.width=e,n.height=o;const i=n.getContext("2d");return{canvas:n,context:i}}getOptimalCanvasAndContext(e,o,n=1){e=Math.ceil(e*n-1e-6),o=Math.ceil(o*n-1e-6),e=Ca(e),o=Ca(o);const i=(e<<17)+(o<<1);this._canvasPool[i]||(this._canvasPool[i]=[]);let r=this._canvasPool[i].pop();return r||(r=this._createCanvasAndContext(e,o)),r}returnCanvasAndContext(e){const o=e.canvas,{width:n,height:i}=o,r=(n<<17)+(i<<1);this._canvasPool[r].push(e)}clear(){this._canvasPool={}}}const Pg=new qE,YE=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function ay(t){const e=typeof t.fontSize=="number"?`${t.fontSize}px`:t.fontSize;let o=t.fontFamily;Array.isArray(t.fontFamily)||(o=t.fontFamily.split(","));for(let n=o.length-1;n>=0;n--){let i=o[n].trim();!/([\"\'])[^\'\"]+\1/.test(i)&&!YE.includes(i)&&(i=`"${i}"`),o[n]=i}return`${t.fontStyle} ${t.fontVariant} ${t.fontWeight} ${e} ${o.join(",")}`}const wu={willReadFrequently:!0},Qt=class U{static get experimentalLetterSpacingSupported(){let e=U._experimentalLetterSpacingSupported;if(e!==void 0){const o=ze.get().getCanvasRenderingContext2D().prototype;e=U._experimentalLetterSpacingSupported="letterSpacing"in o||"textLetterSpacing"in o}return e}constructor(e,o,n,i,r,s,l,a,c){this.text=e,this.style=o,this.width=n,this.height=i,this.lines=r,this.lineWidths=s,this.lineHeight=l,this.maxLineWidth=a,this.fontProperties=c}static measureText(e=" ",o,n=U._canvas,i=o.wordWrap){const r=`${e}:${o.styleKey}`;if(U._measurementCache[r])return U._measurementCache[r];const s=ay(o),l=U.measureFont(s);l.fontSize===0&&(l.fontSize=o.fontSize,l.ascent=o.fontSize);const a=U.__context;a.font=s;const u=(i?U._wordWrap(e,o,n):e).split(/(?:\r\n|\r|\n)/),p=new Array(u.length);let y=0;for(let m=0;m<u.length;m++){const k=U._measureText(u[m],o.letterSpacing,a);p[m]=k,y=Math.max(y,k)}const d=o._stroke?.width||0;let g=y+d;o.dropShadow&&(g+=o.dropShadow.distance);const f=o.lineHeight||l.fontSize;let b=Math.max(f,l.fontSize+d)+(u.length-1)*(f+o.leading);return o.dropShadow&&(b+=o.dropShadow.distance),new U(e,o,g,b,u,p,f+o.leading,y,l)}static _measureText(e,o,n){let i=!1;U.experimentalLetterSpacingSupported&&(U.experimentalLetterSpacing?(n.letterSpacing=`${o}px`,n.textLetterSpacing=`${o}px`,i=!0):(n.letterSpacing="0px",n.textLetterSpacing="0px"));let r=n.measureText(e).width;return r>0&&(i?r-=o:r+=(U.graphemeSegmenter(e).length-1)*o),r}static _wordWrap(e,o,n=U._canvas){const i=n.getContext("2d",wu);let r=0,s="",l="";const a=Object.create(null),{letterSpacing:c,whiteSpace:u}=o,p=U._collapseSpaces(u),y=U._collapseNewlines(u);let d=!p;const g=o.wordWrapWidth+c,f=U._tokenize(e);for(let b=0;b<f.length;b++){let h=f[b];if(U._isNewline(h)){if(!y){l+=U._addLine(s),d=!p,s="",r=0;continue}h=" "}if(p){const k=U.isBreakingSpace(h),w=U.isBreakingSpace(s[s.length-1]);if(k&&w)continue}const m=U._getFromCache(h,c,a,i);if(m>g)if(s!==""&&(l+=U._addLine(s),s="",r=0),U.canBreakWords(h,o.breakWords)){const k=U.wordWrapSplit(h);for(let w=0;w<k.length;w++){let v=k[w],E=v,z=1;for(;k[w+z];){const C=k[w+z];if(!U.canBreakChars(E,C,h,w,o.breakWords))v+=C;else break;E=C,z++}w+=z-1;const S=U._getFromCache(v,c,a,i);S+r>g&&(l+=U._addLine(s),d=!1,s="",r=0),s+=v,r+=S}}else{s.length>0&&(l+=U._addLine(s),s="",r=0);const k=b===f.length-1;l+=U._addLine(h,!k),d=!1,s="",r=0}else m+r>g&&(d=!1,l+=U._addLine(s),s="",r=0),(s.length>0||!U.isBreakingSpace(h)||d)&&(s+=h,r+=m)}return l+=U._addLine(s,!1),l}static _addLine(e,o=!0){return e=U._trimRight(e),e=o?`${e}
`:e,e}static _getFromCache(e,o,n,i){let r=n[e];return typeof r!="number"&&(r=U._measureText(e,o,i)+o,n[e]=r),r}static _collapseSpaces(e){return e==="normal"||e==="pre-line"}static _collapseNewlines(e){return e==="normal"}static _trimRight(e){if(typeof e!="string")return"";for(let o=e.length-1;o>=0;o--){const n=e[o];if(!U.isBreakingSpace(n))break;e=e.slice(0,-1)}return e}static _isNewline(e){return typeof e!="string"?!1:U._newlines.includes(e.charCodeAt(0))}static isBreakingSpace(e,o){return typeof e!="string"?!1:U._breakingSpaces.includes(e.charCodeAt(0))}static _tokenize(e){const o=[];let n="";if(typeof e!="string")return o;for(let i=0;i<e.length;i++){const r=e[i],s=e[i+1];if(U.isBreakingSpace(r,s)||U._isNewline(r)){n!==""&&(o.push(n),n=""),o.push(r);continue}n+=r}return n!==""&&o.push(n),o}static canBreakWords(e,o){return o}static canBreakChars(e,o,n,i,r){return!0}static wordWrapSplit(e){return U.graphemeSegmenter(e)}static measureFont(e){if(U._fonts[e])return U._fonts[e];const o=U._context;o.font=e;const n=o.measureText(U.METRICS_STRING+U.BASELINE_SYMBOL),i={ascent:n.actualBoundingBoxAscent,descent:n.actualBoundingBoxDescent,fontSize:n.actualBoundingBoxAscent+n.actualBoundingBoxDescent};return U._fonts[e]=i,i}static clearMetrics(e=""){e?delete U._fonts[e]:U._fonts={}}static get _canvas(){if(!U.__canvas){let e;try{const o=new OffscreenCanvas(0,0);if(o.getContext("2d",wu)?.measureText)return U.__canvas=o,o;e=ze.get().createCanvas()}catch{e=ze.get().createCanvas()}e.width=e.height=10,U.__canvas=e}return U.__canvas}static get _context(){return U.__context||(U.__context=U._canvas.getContext("2d",wu)),U.__context}};Qt.METRICS_STRING="|ÉqÅ";Qt.BASELINE_SYMBOL="M";Qt.BASELINE_MULTIPLIER=1.4;Qt.HEIGHT_MULTIPLIER=2;Qt.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter=="function"){const t=new Intl.Segmenter;return e=>[...t.segment(e)].map(o=>o.segment)}return t=>[...t]})();Qt.experimentalLetterSpacing=!1;Qt._fonts={};Qt._newlines=[10,13];Qt._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288];Qt._measurementCache={};let Tg=Qt;function jg(t,e){if(t.texture===V.WHITE&&!t.fill)return Y.shared.setValue(t.color).setAlpha(t.alpha??1).toHexa();if(t.fill){if(t.fill instanceof lc){const o=t.fill,n=e.createPattern(o.texture.source.resource,"repeat"),i=o.transform.copyTo(le.shared);return i.scale(o.texture.frame.width,o.texture.frame.height),n.setTransform(i),n}else if(t.fill instanceof Es){const o=t.fill;if(o.type==="linear"){const n=e.createLinearGradient(o.x0,o.y0,o.x1,o.y1);return o.gradientStops.forEach(i=>{n.addColorStop(i.offset,Y.shared.setValue(i.color).toHex())}),n}}}else{const o=e.createPattern(t.texture.source.resource,"repeat"),n=t.matrix.copyTo(le.shared);return n.scale(t.texture.frame.width,t.texture.frame.height),o.setTransform(n),o}return Ie("FillStyle not recognised",t),"red"}function h1(t){if(t==="")return[];typeof t=="string"&&(t=[t]);const e=[];for(let o=0,n=t.length;o<n;o++){const i=t[o];if(Array.isArray(i)){if(i.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);if(i[0].length===0||i[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const r=i[0].charCodeAt(0),s=i[1].charCodeAt(0);if(s<r)throw new Error("[BitmapFont]: Invalid character range.");for(let l=r,a=s;l<=a;l++)e.push(String.fromCharCode(l))}else e.push(...Array.from(i))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}const g1=class m1 extends Yx{constructor(e){super(),this.resolution=1,this.pages=[],this._padding=0,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const o={...m1.defaultOptions,...e};this._textureSize=o.textureSize,this._mipmap=o.mipmap;const n=o.style.clone();o.overrideFill&&(n._fill.color=16777215,n._fill.alpha=1,n._fill.texture=V.WHITE,n._fill.fill=null),this.applyFillAsTint=o.overrideFill;const i=n.fontSize;n.fontSize=this.baseMeasurementFontSize;const r=ay(n);o.overrideSize?n._stroke&&(n._stroke.width*=this.baseRenderedFontSize/i):n.fontSize=this.baseRenderedFontSize=i,this._style=n,this._skipKerning=o.skipKerning??!1,this.resolution=o.resolution??1,this._padding=o.padding??4,this.fontMetrics=Tg.measureFont(r),this.lineHeight=n.lineHeight||this.fontMetrics.fontSize||n.fontSize}ensureCharacters(e){const o=h1(e).filter(f=>!this._currentChars.includes(f)).filter((f,b,h)=>h.indexOf(f)===b);if(!o.length)return;this._currentChars=[...this._currentChars,...o];let n;this._currentPageIndex===-1?n=this._nextPage():n=this.pages[this._currentPageIndex];let{canvas:i,context:r}=n.canvasAndContext,s=n.texture.source;const l=this._style;let a=this._currentX,c=this._currentY;const u=this.baseRenderedFontSize/this.baseMeasurementFontSize,p=this._padding*u,y=l.fontStyle==="italic"?2:1;let d=0,g=!1;for(let f=0;f<o.length;f++){const b=o[f],h=Tg.measureText(b,l,i,!1);h.lineHeight=h.height;const m=y*h.width*u,k=h.height*u,w=m+p*2,v=k+p*2;if(g=!1,b!==`
`&&b!=="\r"&&b!=="	"&&b!==" "&&(g=!0,d=Math.ceil(Math.max(v,d))),a+w>this._textureSize&&(c+=d,d=v,a=0,c+d>this._textureSize)){s.update();const z=this._nextPage();i=z.canvasAndContext.canvas,r=z.canvasAndContext.context,s=z.texture.source,c=0}const E=m/u-(l.dropShadow?.distance??0)-(l._stroke?.width??0);if(this.chars[b]={id:b.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:E,kerning:{}},g){this._drawGlyph(r,h,a+p,c+p,u,l);const z=s.width*u,S=s.height*u,C=new Te(a/z*s.width,c/S*s.height,w/z*s.width,v/S*s.height);this.chars[b].texture=new V({source:s,frame:C}),a+=Math.ceil(w)}}s.update(),this._currentX=a,this._currentY=c,this._skipKerning&&this._applyKerning(o,r)}get pageTextures(){return $(ue,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,o){const n=this._measureCache;for(let i=0;i<e.length;i++){const r=e[i];for(let s=0;s<this._currentChars.length;s++){const l=this._currentChars[s];let a=n[r];a||(a=n[r]=o.measureText(r).width);let c=n[l];c||(c=n[l]=o.measureText(l).width);let u=o.measureText(r+l).width,p=u-(a+c);p&&(this.chars[r].kerning[l]=p),u=o.measureText(r+l).width,p=u-(a+c),p&&(this.chars[l].kerning[r]=p)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,o=Pg.getOptimalCanvasAndContext(this._textureSize,this._textureSize,e);this._setupContext(o.context,this._style,e);const n=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),i=new V({source:new ri({resource:o.canvas,resolution:n,alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:this._mipmap})}),r={canvasAndContext:o,texture:i};return this.pages[this._currentPageIndex]=r,r}_setupContext(e,o,n){o.fontSize=this.baseRenderedFontSize,e.scale(n,n),e.font=ay(o),o.fontSize=this.baseMeasurementFontSize,e.textBaseline=o.textBaseline;const i=o._stroke,r=i?.width??0;if(i&&(e.lineWidth=r,e.lineJoin=i.join,e.miterLimit=i.miterLimit,e.strokeStyle=jg(i,e)),o._fill&&(e.fillStyle=jg(o._fill,e)),o.dropShadow){const s=o.dropShadow,l=Y.shared.setValue(s.color).toArray(),a=s.blur*n,c=s.distance*n;e.shadowColor=`rgba(${l[0]*255},${l[1]*255},${l[2]*255},${s.alpha})`,e.shadowBlur=a,e.shadowOffsetX=Math.cos(s.angle)*c,e.shadowOffsetY=Math.sin(s.angle)*c}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,o,n,i,r,s){const l=o.text,a=o.fontProperties,u=(s._stroke?.width??0)*r,p=n+u/2,y=i-u/2,d=a.descent*r,g=o.lineHeight*r;s.stroke&&u&&e.strokeText(l,p,y+g-d),s._fill&&e.fillText(l,p,y+g-d)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:o,texture:n}=this.pages[e];o.canvas.width=o.canvas.width,Pg.returnCanvasAndContext(o),n.destroy(!0)}this.pages=null}};g1.defaultOptions={textureSize:512,style:new Zs,mipmap:!0};let Ig=g1;function QE(t,e,o,n){const i={width:0,height:0,offsetY:0,scale:e.fontSize/o.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};i.offsetY=o.baseLineOffset;let r=i.lines[0],s=null,l=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},c=g=>{const f=r.width;for(let b=0;b<a.index;b++){const h=g.positions[b];r.chars.push(g.chars[b]),r.charPositions.push(h+f)}r.width+=g.width,l=!1,a.width=0,a.index=0,a.chars.length=0},u=()=>{let g=r.chars.length-1;if(n){let f=r.chars[g];for(;f===" ";)r.width-=o.chars[f].xAdvance,f=r.chars[--g]}i.width=Math.max(i.width,r.width),r={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},l=!0,i.lines.push(r),i.height+=o.lineHeight},p=o.baseMeasurementFontSize/e.fontSize,y=e.letterSpacing*p,d=e.wordWrapWidth*p;for(let g=0;g<t.length+1;g++){let f;const b=g===t.length;b||(f=t[g]);const h=o.chars[f]||o.chars[" "];if(/(?:\s)/.test(f)||f==="\r"||f===`
`||b){if(!l&&e.wordWrap&&r.width+a.width-y>d?(u(),c(a),b||r.charPositions.push(0)):(a.start=r.width,c(a),b||r.charPositions.push(0)),f==="\r"||f===`
`)r.width!==0&&u();else if(!b){const v=h.xAdvance+(h.kerning[s]||0)+y;r.width+=v,r.spaceWidth=v,r.spacesIndex.push(r.charPositions.length),r.chars.push(f)}}else{const w=h.kerning[s]||0,v=h.xAdvance+w+y;a.positions[a.index++]=a.width+w,a.chars.push(f),a.width+=v}s=f}return u(),e.align==="center"?KE(i):e.align==="right"?JE(i):e.align==="justify"&&e_(i),i}function KE(t){for(let e=0;e<t.lines.length;e++){const o=t.lines[e],n=t.width/2-o.width/2;for(let i=0;i<o.charPositions.length;i++)o.charPositions[i]+=n}}function JE(t){for(let e=0;e<t.lines.length;e++){const o=t.lines[e],n=t.width-o.width;for(let i=0;i<o.charPositions.length;i++)o.charPositions[i]+=n}}function e_(t){const e=t.width;for(let o=0;o<t.lines.length;o++){const n=t.lines[o];let i=0,r=n.spacesIndex[i++],s=0;const l=n.spacesIndex.length,c=(e-n.width)/l;for(let u=0;u<n.charPositions.length;u++)u===r&&(r=n.spacesIndex[i++],s+=c),n.charPositions[u]+=s}}let wl=0;class t_{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(e,o){let n=`${o.fontFamily}-bitmap`,i=!0;if(o._fill.fill&&!o._stroke)n+=o._fill.fill.styleKey,i=!1;else if(o._stroke||o.dropShadow){let s=o.styleKey;s=s.substring(0,s.lastIndexOf("-")),n=`${s}-bitmap`,i=!1}if(!ke.has(n)){const s=new Ig({style:o,overrideFill:i,overrideSize:!0,...this.defaultOptions});wl++,wl>50&&Ie("BitmapText",`You have dynamically created ${wl} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``),s.once("destroy",()=>{wl--,ke.remove(n)}),ke.set(n,s)}const r=ke.get(n);return r.ensureCharacters?.(e),r}getLayout(e,o,n=!0){const i=this.getFont(e,o);return QE([...e],o,i,n)}measureText(e,o,n=!0){return this.getLayout(e,o,n)}install(...e){let o=e[0];typeof o=="string"&&(o={name:o,style:e[1],chars:e[2]?.chars,resolution:e[2]?.resolution,padding:e[2]?.padding,skipKerning:e[2]?.skipKerning},$(ue,"BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));const n=o?.name;if(!n)throw new Error("[BitmapFontManager] Property `name` is required.");o={...this.defaultOptions,...o};const i=o.style,r=i instanceof Zs?i:new Zs(i),s=r._fill.fill!==null&&r._fill.fill!==void 0,l=new Ig({style:r,overrideFill:s,skipKerning:o.skipKerning,padding:o.padding,resolution:o.resolution,overrideSize:!1}),a=h1(o.chars);return l.ensureCharacters(a.join("")),ke.set(`${n}-bitmap`,l),l.once("destroy",()=>ke.remove(`${n}-bitmap`)),l}uninstall(e){const o=`${e}-bitmap`,n=ke.get(o);n&&(ke.remove(o),n.destroy())}}const Fg=new t_;class b1 extends Yx{constructor(e,o){super();const{textures:n,data:i}=e;Object.keys(i.pages).forEach(r=>{const s=i.pages[parseInt(r,10)],l=n[s.id];this.pages.push({texture:l})}),Object.keys(i.chars).forEach(r=>{const s=i.chars[r],{frame:l,source:a}=n[s.page],c=new Te(s.x+l.x,s.y+l.y,s.width,s.height),u=new V({source:a,frame:c});this.chars[r]={id:r.codePointAt(0),xOffset:s.xOffset,yOffset:s.yOffset,xAdvance:s.xAdvance,kerning:s.kerning??{},texture:u}}),this.baseRenderedFontSize=i.fontSize,this.baseMeasurementFontSize=i.fontSize,this.fontMetrics={ascent:0,descent:0,fontSize:i.fontSize},this.baseLineOffset=i.baseLineOffset,this.lineHeight=i.lineHeight,this.fontFamily=i.fontFamily,this.distanceField=i.distanceField??{type:"none",range:0},this.url=o}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:o}=this.pages[e];o.destroy(!0)}this.pages=null}static install(e){Fg.install(e)}static uninstall(e){Fg.uninstall(e)}}const vu={test(t){return typeof t=="string"&&t.startsWith("info face=")},parse(t){const e=t.match(/^[a-z]+\s+.+$/gm),o={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const p in e){const y=e[p].match(/^[a-z]+/gm)[0],d=e[p].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),g={};for(const f in d){const b=d[f].split("="),h=b[0],m=b[1].replace(/"/gm,""),k=parseFloat(m),w=isNaN(k)?m:k;g[h]=w}o[y].push(g)}const n={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[i]=o.info,[r]=o.common,[s]=o.distanceField??[];s&&(n.distanceField={range:parseInt(s.distanceRange,10),type:s.fieldType}),n.fontSize=parseInt(i.size,10),n.fontFamily=i.face,n.lineHeight=parseInt(r.lineHeight,10);const l=o.page;for(let p=0;p<l.length;p++)n.pages.push({id:parseInt(l[p].id,10)||0,file:l[p].file});const a={};n.baseLineOffset=n.lineHeight-parseInt(r.base,10);const c=o.char;for(let p=0;p<c.length;p++){const y=c[p],d=parseInt(y.id,10);let g=y.letter??y.char??String.fromCharCode(d);g==="space"&&(g=" "),a[d]=g,n.chars[g]={id:d,page:parseInt(y.page,10)||0,x:parseInt(y.x,10),y:parseInt(y.y,10),width:parseInt(y.width,10),height:parseInt(y.height,10),xOffset:parseInt(y.xoffset,10),yOffset:parseInt(y.yoffset,10),xAdvance:parseInt(y.xadvance,10),kerning:{}}}const u=o.kerning||[];for(let p=0;p<u.length;p++){const y=parseInt(u[p].first,10),d=parseInt(u[p].second,10),g=parseInt(u[p].amount,10);n.chars[a[d]].kerning[a[y]]=g}return n}},Mg={test(t){const e=t;return typeof e!="string"&&"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(t){const e={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},o=t.getElementsByTagName("info")[0],n=t.getElementsByTagName("common")[0],i=t.getElementsByTagName("distanceField")[0];i&&(e.distanceField={type:i.getAttribute("fieldType"),range:parseInt(i.getAttribute("distanceRange"),10)});const r=t.getElementsByTagName("page"),s=t.getElementsByTagName("char"),l=t.getElementsByTagName("kerning");e.fontSize=parseInt(o.getAttribute("size"),10),e.fontFamily=o.getAttribute("face"),e.lineHeight=parseInt(n.getAttribute("lineHeight"),10);for(let c=0;c<r.length;c++)e.pages.push({id:parseInt(r[c].getAttribute("id"),10)||0,file:r[c].getAttribute("file")});const a={};e.baseLineOffset=e.lineHeight-parseInt(n.getAttribute("base"),10);for(let c=0;c<s.length;c++){const u=s[c],p=parseInt(u.getAttribute("id"),10);let y=u.getAttribute("letter")??u.getAttribute("char")??String.fromCharCode(p);y==="space"&&(y=" "),a[p]=y,e.chars[y]={id:p,page:parseInt(u.getAttribute("page"),10)||0,x:parseInt(u.getAttribute("x"),10),y:parseInt(u.getAttribute("y"),10),width:parseInt(u.getAttribute("width"),10),height:parseInt(u.getAttribute("height"),10),xOffset:parseInt(u.getAttribute("xoffset"),10),yOffset:parseInt(u.getAttribute("yoffset"),10),xAdvance:parseInt(u.getAttribute("xadvance"),10),kerning:{}}}for(let c=0;c<l.length;c++){const u=parseInt(l[c].getAttribute("first"),10),p=parseInt(l[c].getAttribute("second"),10),y=parseInt(l[c].getAttribute("amount"),10);e.chars[a[p]].kerning[a[u]]=y}return e}},Og={test(t){return typeof t=="string"&&t.includes("<font>")?Mg.test(ze.get().parseXML(t)):!1},parse(t){return Mg.parse(ze.get().parseXML(t))}},o_=[".xml",".fnt"],n_={extension:{type:N.CacheParser,name:"cacheBitmapFont"},test:t=>t instanceof b1,getCacheableAssets(t,e){const o={};return t.forEach(n=>{o[n]=e,o[`${n}-bitmap`]=e}),o[`${e.fontFamily}-bitmap`]=e,o}},i_={extension:{type:N.LoadParser,priority:hn.Normal},name:"loadBitmapFont",test(t){return o_.includes(wt.extname(t).toLowerCase())},async testParse(t){return vu.test(t)||Og.test(t)},async parse(t,e,o){const n=vu.test(t)?vu.parse(t):Og.parse(t),{src:i}=e,{pages:r}=n,s=[],l=n.distanceField?{scaleMode:"linear",alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:!1,resolution:1}:{};for(let p=0;p<r.length;++p){const y=r[p].file;let d=wt.join(wt.dirname(i),y);d=Xp(d,i),s.push({src:d,data:l})}const a=await o.load(s),c=s.map(p=>a[p.src]);return new b1({data:n,textures:c},i)},async load(t,e){return await(await ze.get().fetch(t)).text()},async unload(t,e,o){await Promise.all(t.pages.map(n=>o.unload(n.texture.source._sourceOrigin))),t.destroy()}};class r_{constructor(e,o=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=o}add(e){e.forEach(o=>{this._assetList.push(o)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],o=Math.min(this._assetList.length,this._maxConcurrent);for(let n=0;n<o;n++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const s_={extension:{type:N.CacheParser,name:"cacheTextureArray"},test:t=>Array.isArray(t)&&t.every(e=>e instanceof V),getCacheableAssets:(t,e)=>{const o={};return t.forEach(n=>{e.forEach((i,r)=>{o[n+(r===0?"":r+1)]=i})}),o}};async function x1(t){if("Image"in globalThis)return new Promise(e=>{const o=new Image;o.onload=()=>{e(!0)},o.onerror=()=>{e(!1)},o.src=t});if("createImageBitmap"in globalThis&&"fetch"in globalThis){try{const e=await(await fetch(t)).blob();await createImageBitmap(e)}catch{return!1}return!0}return!1}const l_={extension:{type:N.DetectionParser,priority:1},test:async()=>x1("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),add:async t=>[...t,"avif"],remove:async t=>t.filter(e=>e!=="avif")},Dg=["png","jpg","jpeg"],a_={extension:{type:N.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async t=>[...t,...Dg],remove:async t=>t.filter(e=>!Dg.includes(e))},c_="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function $d(t){return c_?!1:document.createElement("video").canPlayType(t)!==""}const u_={extension:{type:N.DetectionParser,priority:0},test:async()=>$d("video/mp4"),add:async t=>[...t,"mp4","m4v"],remove:async t=>t.filter(e=>e!=="mp4"&&e!=="m4v")},p_={extension:{type:N.DetectionParser,priority:0},test:async()=>$d("video/ogg"),add:async t=>[...t,"ogv"],remove:async t=>t.filter(e=>e!=="ogv")},y_={extension:{type:N.DetectionParser,priority:0},test:async()=>$d("video/webm"),add:async t=>[...t,"webm"],remove:async t=>t.filter(e=>e!=="webm")},d_={extension:{type:N.DetectionParser,priority:0},test:async()=>x1("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),add:async t=>[...t,"webp"],remove:async t=>t.filter(e=>e!=="webp")};class f_{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,o,n)=>(this._parsersValidated=!1,e[o]=n,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,o){const n={promise:null,parser:null};return n.promise=(async()=>{let i=null,r=null;if(o.loadParser&&(r=this._parserHash[o.loadParser],r||Ie(`[Assets] specified load parser "${o.loadParser}" not found while loading ${e}`)),!r){for(let s=0;s<this.parsers.length;s++){const l=this.parsers[s];if(l.load&&l.test?.(e,o,this)){r=l;break}}if(!r)return Ie(`[Assets] ${e} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),null}i=await r.load(e,o,this),n.parser=r;for(let s=0;s<this.parsers.length;s++){const l=this.parsers[s];l.parse&&l.parse&&await l.testParse?.(i,o,this)&&(i=await l.parse(i,o,this)||i,n.parser=l)}return i})(),n}async load(e,o){this._parsersValidated||this._validateParsers();let n=0;const i={},r=Ra(e),s=$t(e,c=>({alias:[c],src:c,data:{}})),l=s.length,a=s.map(async c=>{const u=wt.toAbsolute(c.src);if(!i[c.src])try{this.promiseCache[u]||(this.promiseCache[u]=this._getLoadPromiseAndParser(u,c)),i[c.src]=await this.promiseCache[u].promise,o&&o(++n/l)}catch(p){throw delete this.promiseCache[u],delete i[c.src],new Error(`[Loader.load] Failed to load ${u}.
${p}`)}});return await Promise.all(a),r?i[s[0].src]:i}async unload(e){const n=$t(e,i=>({alias:[i],src:i})).map(async i=>{const r=wt.toAbsolute(i.src),s=this.promiseCache[r];if(s){const l=await s.promise;delete this.promiseCache[r],await s.parser?.unload?.(l,i,this)}});await Promise.all(n)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,o)=>(o.name?e[o.name]&&Ie(`[Assets] loadParser name conflict "${o.name}"`):Ie("[Assets] loadParser should have a name"),{...e,[o.name]:o}),{})}}function dr(t,e){if(Array.isArray(e)){for(const o of e)if(t.startsWith(`data:${o}`))return!0;return!1}return t.startsWith(`data:${e}`)}function fr(t,e){const o=t.split("?")[0],n=wt.extname(o).toLowerCase();return Array.isArray(e)?e.includes(n):n===e}const h_=".json",g_="application/json",m_={extension:{type:N.LoadParser,priority:hn.Low},name:"loadJson",test(t){return dr(t,g_)||fr(t,h_)},async load(t){return await(await ze.get().fetch(t)).json()}},b_=".txt",x_="text/plain",k_={name:"loadTxt",extension:{type:N.LoadParser,priority:hn.Low,name:"loadTxt"},test(t){return dr(t,x_)||fr(t,b_)},async load(t){return await(await ze.get().fetch(t)).text()}},w_=["normal","bold","100","200","300","400","500","600","700","800","900"],v_=[".ttf",".otf",".woff",".woff2"],z_=["font/ttf","font/otf","font/woff","font/woff2"],S_=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function E_(t){const e=wt.extname(t),i=wt.basename(t,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(l=>l.charAt(0).toUpperCase()+l.slice(1));let r=i.length>0;for(const l of i)if(!l.match(S_)){r=!1;break}let s=i.join(" ");return r||(s=`"${s.replace(/[\\"]/g,"\\$&")}"`),s}const __=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;function C_(t){return __.test(t)?t:encodeURI(t)}const Z_={extension:{type:N.LoadParser,priority:hn.Low},name:"loadWebFont",test(t){return dr(t,z_)||fr(t,v_)},async load(t,e){const o=ze.get().getFontFaceSet();if(o){const n=[],i=e.data?.family??E_(t),r=e.data?.weights?.filter(l=>w_.includes(l))??["normal"],s=e.data??{};for(let l=0;l<r.length;l++){const a=r[l],c=new FontFace(i,`url(${C_(t)})`,{...s,weight:a});await c.load(),o.add(c),n.push(c)}return ke.set(`${i}-and-url`,{url:t,fontFaces:n}),n.length===1?n[0]:n}return Ie("[loadWebFont] FontFace API is not supported. Skipping loading font"),null},unload(t){(Array.isArray(t)?t:[t]).forEach(e=>{ke.remove(e.family),ze.get().getFontFaceSet().delete(e)})}};function Wd(t,e=1){const o=yr.RETINA_PREFIX?.exec(t);return o?parseFloat(o[1]):e}function Hd(t,e,o){t.label=o,t._sourceOrigin=o;const n=new V({source:t,label:o}),i=()=>{delete e.promiseCache[o],ke.has(o)&&ke.remove(o)};return n.source.once("destroy",()=>{e.promiseCache[o]&&(Ie("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."),i())}),n.once("destroy",()=>{t.destroyed||(Ie("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),i())}),n}const A_=".svg",R_="image/svg+xml",P_={extension:{type:N.LoadParser,priority:hn.Low,name:"loadSVG"},name:"loadSVG",config:{crossOrigin:"anonymous",parseAsGraphicsContext:!1},test(t){return dr(t,R_)||fr(t,A_)},async load(t,e,o){return e.data.parseAsGraphicsContext??this.config.parseAsGraphicsContext?j_(t):T_(t,e,o,this.config.crossOrigin)},unload(t){t.destroy(!0)}};async function T_(t,e,o,n){const r=await(await ze.get().fetch(t)).blob(),s=URL.createObjectURL(r),l=new Image;l.src=s,l.crossOrigin=n,await l.decode(),URL.revokeObjectURL(s);const a=document.createElement("canvas"),c=a.getContext("2d"),u=e.data?.resolution||Wd(t),p=e.data?.width??l.width,y=e.data?.height??l.height;a.width=p*u,a.height=y*u,c.drawImage(l,0,0,p*u,y*u);const{parseAsGraphicsContext:d,...g}=e.data,f=new ri({resource:a,alphaMode:"premultiply-alpha-on-upload",resolution:u,...g});return Hd(f,o,t)}async function j_(t){const o=await(await ze.get().fetch(t)).text(),n=new At;return n.svg(o),n}const I_=`(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;let Li=null,cy=class{constructor(){Li||(Li=URL.createObjectURL(new Blob([I_],{type:"application/javascript"}))),this.worker=new Worker(Li)}};cy.revokeObjectURL=function(){Li&&(URL.revokeObjectURL(Li),Li=null)};const F_=`(function () {
    'use strict';

    async function loadImageBitmap(url, alphaMode) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
      }
      const imageBlob = await response.blob();
      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);
    }
    self.onmessage = async (event) => {
      try {
        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);
        self.postMessage({
          data: imageBitmap,
          uuid: event.data.uuid,
          id: event.data.id
        }, [imageBitmap]);
      } catch (e) {
        self.postMessage({
          error: e,
          uuid: event.data.uuid,
          id: event.data.id
        });
      }
    };

})();
`;let $i=null;class k1{constructor(){$i||($i=URL.createObjectURL(new Blob([F_],{type:"application/javascript"}))),this.worker=new Worker($i)}}k1.revokeObjectURL=function(){$i&&(URL.revokeObjectURL($i),$i=null)};let Bg=0,zu;class M_{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const{worker:o}=new cy;o.addEventListener("message",n=>{o.terminate(),cy.revokeObjectURL(),e(n.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e,o){return this._run("loadImageBitmap",[e,o?.data?.alphaMode])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){zu===void 0&&(zu=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<zu&&(this._createdWorkers++,e=new k1().worker,e.addEventListener("message",o=>{this._complete(o.data),this._returnWorker(o.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),this._resolveHash[e.uuid]=null}async _run(e,o){await this._initWorkers();const n=new Promise((i,r)=>{this._queue.push({id:e,arguments:o,resolve:i,reject:r})});return this._next(),n}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const o=this._queue.pop(),n=o.id;this._resolveHash[Bg]={resolve:o.resolve,reject:o.reject},e.postMessage({data:o.arguments,uuid:Bg++,id:n})}}const Gg=new M_,O_=[".jpeg",".jpg",".png",".webp",".avif"],D_=["image/jpeg","image/png","image/webp","image/avif"];async function B_(t,e){const o=await ze.get().fetch(t);if(!o.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${t}: ${o.status} ${o.statusText}`);const n=await o.blob();return e?.data?.alphaMode==="premultiplied-alpha"?createImageBitmap(n,{premultiplyAlpha:"none"}):createImageBitmap(n)}const w1={name:"loadTextures",extension:{type:N.LoadParser,priority:hn.High,name:"loadTextures"},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(t){return dr(t,D_)||fr(t,O_)},async load(t,e,o){let n=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await Gg.isImageBitmapSupported()?n=await Gg.loadImageBitmap(t,e):n=await B_(t,e):n=await new Promise(r=>{n=new Image,n.crossOrigin=this.config.crossOrigin,n.src=t,n.complete?r(n):n.onload=()=>{r(n)}});const i=new ri({resource:n,alphaMode:"premultiply-alpha-on-upload",resolution:e.data?.resolution||Wd(t),...e.data});return Hd(i,o,t)},unload(t){t.destroy(!0)}},v1=[".mp4",".m4v",".webm",".ogg",".ogv",".h264",".avi",".mov"],G_=v1.map(t=>`video/${t.substring(1)}`);function U_(t,e,o){o===void 0&&!e.startsWith("data:")?t.crossOrigin=L_(e):o!==!1&&(t.crossOrigin=typeof o=="string"?o:"anonymous")}function N_(t){return new Promise((e,o)=>{t.addEventListener("canplaythrough",n),t.addEventListener("error",i),t.load();function n(){r(),e()}function i(s){r(),o(s)}function r(){t.removeEventListener("canplaythrough",n),t.removeEventListener("error",i)}})}function L_(t,e=globalThis.location){if(t.startsWith("data:"))return"";e=e||globalThis.location;const o=new URL(t,document.baseURI);return o.hostname!==e.hostname||o.port!==e.port||o.protocol!==e.protocol?"anonymous":""}const $_={name:"loadVideo",extension:{type:N.LoadParser,name:"loadVideo"},test(t){const e=dr(t,G_),o=fr(t,v1);return e||o},async load(t,e,o){const n={...$l.defaultOptions,resolution:e.data?.resolution||Wd(t),alphaMode:e.data?.alphaMode||await _x(),...e.data},i=document.createElement("video"),r={preload:n.autoLoad!==!1?"auto":void 0,"webkit-playsinline":n.playsinline!==!1?"":void 0,playsinline:n.playsinline!==!1?"":void 0,muted:n.muted===!0?"":void 0,loop:n.loop===!0?"":void 0,autoplay:n.autoPlay!==!1?"":void 0};Object.keys(r).forEach(a=>{const c=r[a];c!==void 0&&i.setAttribute(a,c)}),n.muted===!0&&(i.muted=!0),U_(i,t,n.crossorigin);const s=document.createElement("source");let l;if(t.startsWith("data:"))l=t.slice(5,t.indexOf(";"));else if(!t.startsWith("blob:")){const a=t.split("?")[0].slice(t.lastIndexOf(".")+1).toLowerCase();l=$l.MIME_TYPES[a]||`video/${a}`}return s.src=t,l&&(s.type=l),new Promise(a=>{const c=async()=>{const u=new $l({...n,resource:i});i.removeEventListener("canplay",c),e.data.preload&&await N_(i),a(Hd(u,o,t))};i.addEventListener("canplay",c),i.appendChild(s)})},unload(t){t.destroy(!0)}},z1={extension:{type:N.ResolveParser,name:"resolveTexture"},test:w1.test,parse:t=>({resolution:parseFloat(yr.RETINA_PREFIX.exec(t)?.[1]??"1"),format:t.split(".").pop(),src:t})},W_={extension:{type:N.ResolveParser,priority:-2,name:"resolveJson"},test:t=>yr.RETINA_PREFIX.test(t)&&t.endsWith(".json"),parse:z1.parse};class H_{constructor(){this._detections=[],this._initialized=!1,this.resolver=new yr,this.loader=new f_,this.cache=ke,this._backgroundLoader=new r_(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){if(this._initialized){Ie("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");return}if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let r=e.manifest;typeof r=="string"&&(r=await this.load(r)),this.resolver.addManifest(r)}const o=e.texturePreference?.resolution??1,n=typeof o=="number"?[o]:o,i=await this._detectFormats({preferredFormats:e.texturePreference?.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:i,resolution:n}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,o){this._initialized||await this.init();const n=Ra(e),i=$t(e).map(l=>{if(typeof l!="string"){const a=this.resolver.getAlias(l);return a.some(c=>!this.resolver.hasKey(c))&&this.add(l),Array.isArray(a)?a[0]:a}return this.resolver.hasKey(l)||this.add({alias:l,src:l}),l}),r=this.resolver.resolve(i),s=await this._mapLoadToResolve(r,o);return n?s[i[0]]:s}addBundle(e,o){this.resolver.addBundle(e,o)}async loadBundle(e,o){this._initialized||await this.init();let n=!1;typeof e=="string"&&(n=!0,e=[e]);const i=this.resolver.resolveBundle(e),r={},s=Object.keys(i);let l=0,a=0;const c=()=>{o?.(++l/a)},u=s.map(p=>{const y=i[p];return a+=Object.keys(y).length,this._mapLoadToResolve(y,c).then(d=>{r[p]=d})});return await Promise.all(u),n?r[e[0]]:r}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const o=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(o))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const o=this.resolver.resolveBundle(e);Object.values(o).forEach(n=>{this._backgroundLoader.add(Object.values(n))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return ke.get(e);const o={};for(let n=0;n<e.length;n++)o[n]=ke.get(e[n]);return o}async _mapLoadToResolve(e,o){const n=[...new Set(Object.values(e))];this._backgroundLoader.active=!1;const i=await this.loader.load(n,o);this._backgroundLoader.active=!0;const r={};return n.forEach(s=>{const l=i[s.src],a=[s.src];s.alias&&a.push(...s.alias),a.forEach(c=>{r[c]=l}),ke.set(a,l)}),r}async unload(e){this._initialized||await this.init();const o=$t(e).map(i=>typeof i!="string"?i.src:i),n=this.resolver.resolve(o);await this._unloadFromResolved(n)}async unloadBundle(e){this._initialized||await this.init(),e=$t(e);const o=this.resolver.resolveBundle(e),n=Object.keys(o).map(i=>this._unloadFromResolved(o[i]));await Promise.all(n)}async _unloadFromResolved(e){const o=Object.values(e);o.forEach(n=>{ke.remove(n.src)}),await this.loader.unload(o)}async _detectFormats(e){let o=[];e.preferredFormats&&(o=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const n of e.detections)e.skipDetections||await n.test()?o=await n.add(o):e.skipDetections||(o=await n.remove(o));return o=o.filter((n,i)=>o.indexOf(n)===i),o}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(o=>{o.config&&Object.keys(o.config).filter(n=>n in e).forEach(n=>{o.config[n]=e[n]})})}}const $r=new H_;tt.handleByList(N.LoadParser,$r.loader.parsers).handleByList(N.ResolveParser,$r.resolver.parsers).handleByList(N.CacheParser,$r.cache.parsers).handleByList(N.DetectionParser,$r.detections);tt.add(s_,a_,l_,d_,u_,p_,y_,m_,k_,Z_,P_,w1,$_,i_,n_,z1,W_);const Ug={loader:N.LoadParser,resolver:N.ResolveParser,cache:N.CacheParser,detection:N.DetectionParser};tt.handle(N.Asset,t=>{const e=t.ref;Object.entries(Ug).filter(([o])=>!!e[o]).forEach(([o,n])=>tt.add(Object.assign(e[o],{extension:e[o].extension??n})))},t=>{const e=t.ref;Object.keys(Ug).filter(o=>!!e[o]).forEach(o=>tt.remove(e[o]))});var X_=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,V_=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Ng=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct AlphaUniforms {
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
 
    var sample = textureSample(uTexture, uSampler, uv);
    
    return sample * alphaUniforms.uAlpha;
}`;const S1=class E1 extends ie{constructor(e){e={...E1.defaultOptions,...e};const o=te.from({vertex:{source:Ng,entryPoint:"mainVertex"},fragment:{source:Ng,entryPoint:"mainFragment"}}),n=oe.from({vertex:X_,fragment:V_,name:"alpha-filter"}),{alpha:i,...r}=e,s=new Md({uAlpha:{value:i,type:"f32"}});super({...r,gpuProgram:o,glProgram:n,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};S1.defaultOptions={alpha:1};let q_=S1,Y_=0;class Q_{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,o,n){const i=new dt({...this.textureOptions,width:e,height:o,resolution:1,antialias:n,autoGarbageCollect:!0});return new V({source:i,label:`texturePool_${Y_++}`})}getOptimalTexture(e,o,n=1,i){let r=Math.ceil(e*n-1e-6),s=Math.ceil(o*n-1e-6);r=Ca(r),s=Ca(s);const l=(r<<17)+(s<<1)+(i?1:0);this._texturePool[l]||(this._texturePool[l]=[]);let a=this._texturePool[l].pop();return a||(a=this.createTexture(r,s,i)),a.source._resolution=n,a.source.width=r/n,a.source.height=s/n,a.source.pixelWidth=r,a.source.pixelHeight=s,a.frame.x=0,a.frame.y=0,a.frame.width=e,a.frame.height=o,a.updateUvs(),this._poolKeyHash[a.uid]=l,a}getSameSizeTexture(e,o=!1){const n=e.source;return this.getOptimalTexture(e.width,e.height,n._resolution,o)}returnTexture(e){const o=this._poolKeyHash[e.uid];this._texturePool[o].push(e)}clear(e){if(e=e!==!1,e)for(const o in this._texturePool){const n=this._texturePool[o];if(n)for(let i=0;i<n.length;i++)n[i].destroy(!0)}this._texturePool={}}}const jt=new Q_,_1={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},K_=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uTexture;","out vec4 finalColor;","void main(void)","{","    finalColor = vec4(0.0);","    %blur%","}"].join(`
`);function J_(t){const e=_1[t],o=e.length;let n=K_,i="";const r="finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";let s;for(let l=0;l<t;l++){let a=r.replace("%index%",l.toString());s=l,l>=o&&(s=t-l-1),a=a.replace("%value%",e[s].toString()),i+=a,i+=`
`}return n=n.replace("%blur%",i),n=n.replace("%size%",t.toString()),n}const e5=`
    in vec2 aPosition;

    uniform float uStrength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * uStrength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;function t5(t,e){const o=Math.ceil(t/2);let n=e5,i="",r;e?r="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":r="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let s=0;s<t;s++){let l=r.replace("%index%",s.toString());l=l.replace("%sampleIndex%",`${s-(o-1)}.0`),i+=l,i+=`
`}return n=n.replace("%blur%",i),n=n.replace("%size%",t.toString()),n=n.replace("%dimension%",e?"z":"w"),n}function o5(t,e){const o=t5(e,t),n=J_(e);return oe.from({vertex:o,fragment:n,name:`blur-${t?"horizontal":"vertical"}-pass-filter`})}var n5=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlurUniforms {
  uStrength:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    %blur-struct%
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}


@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {

  let filteredCord = filterTextureCoord(aPosition);

  let pixelStrength = gfu.uInputSize.%dimension% * blurUniforms.uStrength;

  return VSOutput(
   filterVertexPosition(aPosition),
    %blur-vertex-out%
  );
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  %blur-fragment-in%
) -> @location(0) vec4<f32> {

    var   finalColor = vec4(0.0);

    %blur-sampling%

    return finalColor;
}`;function i5(t,e){const o=_1[e],n=o.length,i=[],r=[],s=[];for(let p=0;p<e;p++){i[p]=`@location(${p}) offset${p}: vec2<f32>,`,t?r[p]=`filteredCord + vec2(${p-n+1} * pixelStrength, 0.0),`:r[p]=`filteredCord + vec2(0.0, ${p-n+1} * pixelStrength),`;const y=p<n?p:e-p-1,d=o[y].toString();s[p]=`finalColor += textureSample(uTexture, uSampler, offset${p}) * ${d};`}const l=i.join(`
`),a=r.join(`
`),c=s.join(`
`),u=n5.replace("%blur-struct%",l).replace("%blur-vertex-out%",a).replace("%blur-fragment-in%",l).replace("%blur-sampling%",c).replace("%dimension%",t?"z":"w");return te.from({vertex:{source:u,entryPoint:"mainVertex"},fragment:{source:u,entryPoint:"mainFragment"}})}const C1=class Z1 extends ie{constructor(e){e={...Z1.defaultOptions,...e};const o=o5(e.horizontal,e.kernelSize),n=i5(e.horizontal,e.kernelSize);super({glProgram:o,gpuProgram:n,resources:{blurUniforms:{uStrength:{value:0,type:"f32"}}},...e}),this.horizontal=e.horizontal,this._quality=0,this.quality=e.quality,this.blur=e.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(e,o,n,i){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)e.applyFilter(this,o,n,i);else{const r=jt.getSameSizeTexture(o);let s=o,l=r;this._state.blend=!1;const a=e.renderer.type===Pa.WEBGPU;for(let c=0;c<this.passes-1;c++){e.applyFilter(this,s,l,c===0?!0:a);const u=l;l=s,s=u}this._state.blend=!0,e.applyFilter(this,s,n,i),jt.returnTexture(r)}}get blur(){return this.strength}set blur(e){this.padding=1+Math.abs(e)*2,this.strength=e}get quality(){return this._quality}set quality(e){this._quality=e,this.passes=e}};C1.defaultOptions={strength:8,quality:4,kernelSize:5};let Lg=C1;class qn extends bx{constructor(e){e instanceof At&&(e={context:e});const{context:o,roundPixels:n,...i}=e||{};super({label:"Graphics",...i}),this.renderPipeId="graphics",o?this._context=o:this._context=this._ownedContext=new At,this._context.on("update",this.onViewUpdate,this),this.allowChildren=!1,this.roundPixels=n??!1}set context(e){e!==this._context&&(this._context.off("update",this.onViewUpdate,this),this._context=e,this._context.on("update",this.onViewUpdate,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onViewUpdate(){if(this._didViewChangeTick++,this._didGraphicsUpdate=!0,this.didViewUpdate)return;this.didViewUpdate=!0;const e=this.renderGroup||this.parentRenderGroup;e&&e.onChildViewUpdate(this)}destroy(e){this._ownedContext&&!e?this._ownedContext.destroy(e):(e===!0||e?.context===!0)&&this._context.destroy(e),this._ownedContext=null,this._context=null,super.destroy(e)}_callContextMethod(e,o){return this.context[e](...o),this}setFillStyle(...e){return this._callContextMethod("setFillStyle",e)}setStrokeStyle(...e){return this._callContextMethod("setStrokeStyle",e)}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}regularPoly(...e){return this._callContextMethod("regularPoly",e)}roundPoly(...e){return this._callContextMethod("roundPoly",e)}roundShape(...e){return this._callContextMethod("roundShape",e)}filletRect(...e){return this._callContextMethod("filletRect",e)}chamferRect(...e){return this._callContextMethod("chamferRect",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(e){this._context.fillStyle=e}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(e){this._context.strokeStyle=e}clone(e=!1){return e?new qn(this._context.clone()):(this._ownedContext=null,new qn(this._context))}lineStyle(e,o,n){$(ue,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const i={};return e&&(i.width=e),o&&(i.color=o),n&&(i.alpha=n),this.context.strokeStyle=i,this}beginFill(e,o){$(ue,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const n={};return e&&(n.color=e),o&&(n.alpha=o),this.context.fillStyle=n,this}endFill(){$(ue,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const e=this.context.strokeStyle;return(e.width!==At.defaultStrokeStyle.width||e.color!==At.defaultStrokeStyle.color||e.alpha!==At.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...e){return $(ue,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return $(ue,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return $(ue,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return $(ue,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return $(ue,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return $(ue,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}class ja extends Xn{constructor(...e){let o=e[0];Array.isArray(e[0])&&(o={textures:e[0],autoUpdate:e[1]});const{textures:n,autoUpdate:i,...r}=o,[s]=n;super({...r,texture:s instanceof V?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=i??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=n}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Xo.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Xo.shared.add(this.update,this,Aa.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const o=e.deltaTime,n=this.animationSpeed*o,i=this.currentFrame;if(this._durations!==null){let r=this._currentTime%1*this._durations[this.currentFrame];for(r+=n/60*1e3;r<0;)this._currentTime--,r+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*o);for(this._currentTime=Math.floor(this._currentTime);r>=this._durations[this.currentFrame];)r-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=r/this._durations[this.currentFrame]}else this._currentTime+=n;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):i!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<i||this.animationSpeed<0&&this.currentFrame>i)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const o=[];for(let n=0;n<e.length;++n)o.push(V.from(e[n]));return new ja(o)}static fromImages(e){const o=[];for(let n=0;n<e.length;++n)o.push(V.from(e[n]));return new ja(o)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof V)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let o=0;o<e.length;o++)this._textures.push(e[o].texture),this._durations.push(e[o].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const o=this.currentFrame;this._currentTime=e,o!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Xo.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Xo.shared.add(this.update,this),this._isConnectedToTicker=!0))}}const Pr=new Map;function r5(t,e){if(!Pr.has(t)){const o=new V({source:new Id({resource:t,...e})}),n=()=>{Pr.get(t)===o&&Pr.delete(t)};o.once("destroy",n),o.source.once("destroy",n),Pr.set(t,o)}return Pr.get(t)}const A1=class R1{constructor(e={}){if(this.uid=je("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,e={...R1.defaultOptions,...e},this.stencil=e.stencil,this.depth=e.depth,this.isRoot=e.isRoot,typeof e.colorTextures=="number"){this._managedColorTextures=!0;for(let o=0;o<e.colorTextures;o++)this.colorTextures.push(new dt({width:e.width,height:e.height,resolution:e.resolution,antialias:e.antialias}))}else{this.colorTextures=[...e.colorTextures.map(n=>n.source)];const o=this.colorTexture.source;this.resize(o.width,o.height,o._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(e.depthStencilTexture||this.stencil)&&(e.depthStencilTexture instanceof V||e.depthStencilTexture instanceof dt?this.depthStencilTexture=e.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){const e=this._size;return e[0]=this.pixelWidth,e[1]=this.pixelHeight,e}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(e){this.resize(e.width,e.height,e._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new dt({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(e,o,n=this.resolution,i=!1){this.dirtyId++,this.colorTextures.forEach((r,s)=>{i&&s===0||r.source.resize(e,o,n)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(e,o,n)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(e=>{e.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};A1.defaultOptions={width:0,height:0,resolution:1,colorTextures:1,stencil:!1,depth:!1,antialias:!1,isRoot:!1};let s5=A1;const Xd=class P1{get autoDensity(){return this.texture.source.autoDensity}set autoDensity(e){this.texture.source.autoDensity=e}get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){e={...P1.defaultOptions,...e},e.view&&($(ue,"ViewSystem.view has been renamed to ViewSystem.canvas"),e.canvas=e.view),this.screen=new Te(0,0,e.width,e.height),this.canvas=e.canvas||ze.get().createCanvas(),this.antialias=!!e.antialias,this.texture=r5(this.canvas,e),this.renderTarget=new s5({colorTextures:[this.texture],depth:!!e.depth,isRoot:!0}),this.texture.source.transparent=e.backgroundAlpha<1,this.resolution=e.resolution}resize(e,o,n){this.texture.source.resize(e,o,n),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height}destroy(e=!1){(typeof e=="boolean"?e:!!e?.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};Xd.extension={type:[N.WebGLSystem,N.WebGPUSystem,N.CanvasSystem],name:"view",priority:0};Xd.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};let l5=Xd;tt.add(xz,kz);const Vd=t=>t.characterRooms[t.currentCharacter],pi=["yellow","green","cyan","magenta","white"],Ia={width:256,height:192},Xl={w:32,h:16},io={w:16,h:55},Fo={w:24,h:56},rt={w:32,h:28},q={w:24,h:24},a5="/head-over-heels-online/assets/sprites-CQ3Bs24U.png",qd={jail:{walls:["bars"]},blacktooth:{walls:["armour","shield","plain"]},bookworld:{walls:["person","book"]},egyptus:{walls:["sarcophagus","hieroglyphics"]},market:{walls:["passage","fruits","more-fruits"]},moonbase:{walls:["window1","window2","window3","coil"]},penitentiary:{walls:["loop","skeleton"]},safari:{walls:["window","shield","wall"]}},go=Object.keys(qd),yi=(t,{x:e,y:o},n)=>{function*i(){yield[`${t}.left`,{frame:{x:e,y:o,...n}}],yield[`${t}.away`,{frame:{x:e+n.w+2,y:o,...n}}],yield[`${t}.towards`,{frame:{x:e,y:o+n.h+2,...n}}],yield[`${t}.right`,{frame:{x:e+n.w+2,y:o+n.h+2,...n}}]}return Object.fromEntries(i())},Re=(t,e,{x:o,y:n},i)=>{function*r(){for(let s=0;s<e;s++)yield[`${t}.${s+1}`,{frame:{x:o+s*(i.w+1),y:n,...i}}]}return Object.fromEntries(r())},Yd=["away","towards","left","right"],T1={away:{x:0,y:1,z:0},left:{x:1,y:0,z:0},right:{x:-1,y:0,z:0},towards:{x:0,y:-1,z:0},down:{x:0,y:0,z:-1},up:{x:0,y:0,z:1}},c5=t=>t==="x"?"y":"x",u5=(t,...e)=>e.reduce((o,n)=>({x:o.x+(n.x??0),y:o.y+(n.y??0)}),t),j1=(t,e)=>({x:t.x*e,y:t.y*e,z:t.z*e}),As=(t,...e)=>e.reduce((o,n)=>({x:o.x+(n.x??0),y:o.y+(n.y??0),z:o.z+(n.z??0)}),t),p5=({x:t,y:e,z:o},{x:n,y:i,z:r})=>t===n&&e===i&&o===r,cc={x:0,y:0,z:0},I1=["x","y","z"];function*y5(t,e){yield`${t}.walking.${e}.1`,yield`${t}.walking.${e}.2`,yield`${t}.walking.${e}.3`,yield`${t}.walking.${e}.2`}function $g(t){return Yd.reduce((e,o)=>({...e,[`${t}.walking.${o}`]:[...y5(t,o)]}),{})}const d5={...Re("head.walking.towards",3,{x:4,y:266},q),...Re("head.walking.right",3,{x:80,y:266},q),...Re("head.walking.left",3,{x:4,y:240},q),...Re("head.walking.away",3,{x:80,y:240},q),...Re("head.idle.towards",2,{x:4,y:304},q),...Re("head.idle.right",2,{x:4,y:329},q),"head.falling.towards":{frame:{x:54,y:304,...q}},"head.falling.right":{frame:{x:79,y:304,...q}},...Re("heels.walking.towards",3,{x:159,y:266},q),...Re("heels.walking.right",3,{x:235,y:266},q),...Re("heels.walking.left",3,{x:159,y:240},q),...Re("heels.walking.away",3,{x:235,y:240},q)},Wg={frames:d5,animations:{...$g("head"),...$g("heels"),"head.idle.right":[...new Array(50).fill("head.idle.right.1"),"head.idle.right.2","head.idle.right.1","head.idle.right.2"],"head.idle.towards":[...new Array(50).fill("head.idle.towards.1"),"head.idle.towards.2","head.idle.towards.1","head.idle.towards.2"]}},Se={w:16,d:16,h:12},f5={near:{x:{x:16,y:56},y:{x:8,y:56}},far:{x:{x:8,y:52},y:{x:16,y:52}}},h5={x:{x:8,y:24},y:{x:6,y:22}},Mo=(t,e,o)=>{function*n(i,r,s){const l=qd[i].walls,{w:a,h:c}=io,u=a>>1,p=l.length;let y=0;for(;y<l.length;y++)yield[`${i}.wall.${l[y]}.left`,{frame:{x:r+a*y,y:s-u*y,...io}}],yield[`${i}.wall.${l[y]}.away`,{frame:{x:r+a*((p<<1)-y-1),y:s-u*y,...io}}];const d=y-1;yield[`${i}.floor`,{frame:{x:r+d*a,y:s-d*u+c+1,...Xl}}]}return Object.fromEntries(n(t,e,o))},g5=await $r.load(a5),m5={frames:{...Mo("blacktooth",487,335),...Mo("bookworld",356,23),...Mo("egyptus",435,23),...Mo("jail",455,351),...Mo("market",378,244),...Mo("moonbase",384,141),...Mo("penitentiary",513,23),...Mo("safari",482,244),"generic.edge.right":{frame:{x:536,y:392,w:8,h:9}},"generic.edge.towards":{frame:{x:527,y:392,w:8,h:9}},"generic.wall.overdraw":{frame:{x:210,y:37,w:io.w,h:Xl.h*2}},"generic.wall.overdraw.debug":{frame:{x:210,y:4,w:io.w,h:Xl.h*2}},"generic.floor.deadly":{frame:{x:379,y:444,...Xl}},"generic.door.legs.base":{frame:{x:314,y:60,w:io.w,h:9}},"generic.door.legs.pillar":{frame:{x:314,y:48,w:io.w,h:12}},"generic.door.front.y":{frame:{x:227,y:13,...Fo}},"generic.door.back.y":{frame:{x:243,y:5,...Fo}},"generic.door.legs.threshold.y":{frame:{x:331,y:30,w:io.w,h:18}},"generic.door.threshold.x":{frame:{x:270,y:70,w:26,h:19}},"generic.door.threshold.y":{frame:{x:241,y:70,w:26,h:19}},"generic.door.platform.towards":{frame:{x:270,y:144,w:32,h:32}},"generic.door.front.x":{frame:{x:286,y:13,...Fo}},"generic.door.back.x":{frame:{x:270,y:5,...Fo}},"generic.door.legs.threshold.x":{frame:{x:314,y:30,w:io.w,h:18}},"generic.door.platform.left":{frame:{x:235,y:114,w:32,h:28}},"moonbase.door.front.y":{frame:{x:344,y:161,...Fo}},"moonbase.door.back.y":{frame:{x:360,y:153,...Fo}},"moonbase.door.front.x":{frame:{x:528,y:161,...Fo}},"moonbase.door.back.x":{frame:{x:512,y:153,...Fo}},teleporter:{frame:{x:4,y:450,...rt}},...Re("teleporter.flashing",2,{x:37,y:450},rt),"barrier.x":{frame:{x:313,y:389,w:24,h:24}},"barrier.y":{frame:{x:313,y:414,w:24,h:24}},"block.organic":{frame:{x:172,y:388,...rt}},"block.artificial":{frame:{x:138,y:388,...rt}},"block.tower":{frame:{x:286,y:414,...q}},volcano:{frame:{x:344,y:414,...rt}},toaster:{frame:{x:111,y:423,...rt}},spikes:{frame:{x:379,y:414,...rt}},"conveyor.x":{frame:{x:259,y:440,...rt}},"conveyor.y":{frame:{x:292,y:440,...rt}},bunny:{frame:{x:340,y:358,...q}},donuts:{frame:{x:313,y:358,...q}},crown:{frame:{x:367,y:358,...q}},hooter:{frame:{x:286,y:358,...q}},bag:{frame:{x:259,y:358,...q}},...Re("fish",2,{x:259,y:388},q),"spring.compressed":{frame:{x:4,y:421,...q}},"spring.released":{frame:{x:29,y:421,...q}},...Re("lift",4,{x:259,y:474},q),"lift.static":{frame:{x:359,y:474,...q}},...Re("dalek",2,{x:4,y:4},q),"headless-base":{frame:{x:57,y:4,...q}},joystick:{frame:{x:259,y:414,...q}},anvil:{frame:{x:144,y:423,...rt}},"book.x":{frame:{x:184,y:450,...rt}},"book.y":{frame:{x:222,y:450,...rt}},sandwich:{frame:{x:4,y:356,...rt}},sticks:{frame:{x:4,y:391,...q}},cube:{frame:{x:31,y:391,...q}},drum:{frame:{x:58,y:391,...q}},"switch.off":{frame:{x:111,y:454,...q}},"switch.on":{frame:{x:136,y:454,...q}},...yi("american-football-head",{x:4,y:34},{w:24,h:32}),...yi("charles",{x:118,y:34},q),...yi("cyberman",{x:61,y:34},q),...yi("monkey",{x:118,y:90},q),...yi("elephant",{x:118,y:146},q),...yi("computer-bot",{x:173,y:146},q),...Re("bubbles",3,{x:4,y:107},q),...Re("turtle.left",2,{x:4,y:137},q),...Re("turtle.away",2,{x:55,y:137},q),...Re("turtle.towards",2,{x:4,y:163},q),...Re("turtle.right",2,{x:55,y:163},q),...Re("helicopter-bug",4,{x:4,y:194},q),"hush-puppy":{frame:{x:163,y:300,...rt}},ball:{frame:{x:84,y:4,...q}},puck:{frame:{x:111,y:367,...q}},"puck.deadly":{frame:{x:111,y:392,...q}},...Wg.frames},animations:{"teleporter.flashing":["teleporter.flashing.1","teleporter.flashing.2"],fish:["fish.1","fish.2"],lift:["lift.1","lift.2","lift.3","lift.4"],dalek:["dalek.1","dalek.2"],"turtle.left":["turtle.left.1","turtle.left.2"],"turtle.away":["turtle.away.1","turtle.away.2"],"turtle.towards":["turtle.towards.1","turtle.towards.2"],"turtle.right":["turtle.right.1","turtle.right.2"],"helicopter-bug":["helicopter-bug.1","helicopter-bug.2","helicopter-bug.3","helicopter-bug.4"],bubbles:["bubbles.1","bubbles.2"],...Wg.animations},meta:{scale:1}},Rt=new Vp(g5,m5);await Rt.parse();Rt.textureSource.scaleMode="nearest";const Su=(t,e)=>{const o=qo(t);return e.x=o.x,e.y=o.y,e},Hg=({x:t=0,y:e=0,z:o=0})=>-(t+e)/2-o,Ae=({x:t=0,y:e=0,z:o=0})=>({x:e-t,y:-(t+e)/2-o}),so=({x:t=0,y:e=0,z:o=0})=>({x:t*Se.w,y:e*Se.d,z:o*Se.h}),qo=t=>Ae(so(t)),F1=t=>{const e={},o=t.items.values().filter(n=>n.type==="doorNear");for(const{config:{axis:n},position:{x:i,y:r}}of o)n==="x"?r<0?e.towards=!0:r===t.size.y*Se.d&&(e.away=!0):i<0?e.right=!0:i===t.size.x*Se.w&&(e.left=!0);return e},M1=t=>{const e=F1(t),o=e.right?-.5:0,n=t.size.x+(e.left?.5:0),i=e.towards?-.5:0,r=t.size.y+(e.away?.5:0),s=qo({x:o,y:r}),l=qo({x:n,y:i}),a=qo({x:o,y:i}),c=qo({x:n,y:r}),u=c.y+io.h;return{blockXMin:o,blockXMax:n,blockYMin:i,blockYMax:r,rightSide:s,leftSide:l,frontSide:a,backSide:c,top:u}};function b5(t){return{all:t=t||new Map,on:function(e,o){var n=t.get(e);n?n.push(o):t.set(e,[o])},off:function(e,o){var n=t.get(e);n&&(o?n.splice(n.indexOf(o)>>>0,1):t.set(e,[]))},emit:function(e,o){var n=t.get(e);n&&n.slice().map(function(i){i(o)}),(n=t.get("*"))&&n.slice().map(function(i){i(e,o)})}}}const O1=t=>t.type==="head"||t.type==="heels",x5=(t,e)=>e.type===t,Eu=["head","heels","pickup","portable-block","baddie","spring"];function D1(t){return t.falls}const _t={renders:!0,renderPositionDirty:!1,renderingDirty:!1,falls:!1};function Qd(t){if(t.positionContainer===void 0)throw new Error("Item does not have a container")}const B1=Object.entries,k5=Object.fromEntries,w5={x:12,y:12,z:Se.h},Xg={x:14,y:14,z:Se.h},v5={x:16,y:16,z:Se.h},G1=50,Kd={x:Se.w,y:0,z:999},U1={...Kd,z:G1},Jd={x:0,y:Se.d,z:999},N1={...Jd,z:G1},z5=t=>{switch(t.type){case"spring":case"portable-block":case"lift":case"player":case"pickup":return{aabb:w5};case"ball":case"switch":case"fish":return{aabb:Xg};case"block":case"book":case"conveyor":case"deadly-block":case"hush-puppy":case"baddie":case"teleporter":return{aabb:v5};case"barrier":return{aabb:t.config.axis==="y"?{x:3,y:15,z:Se.h}:{x:15,y:3,z:Se.h}};case"wall":return t.config.side==="left"||t.config.side==="right"?{aabb:Jd,renderAabb:N1}:{aabb:Kd,renderAabb:U1};default:return console.warn("giving default aabb for item",t),{aabb:Xg}}};function*S5(t){for(let e=t.size.y-1;e>=0;e--){const o=t.walls.left[e];o!=="none"&&(yield{..._t,type:"wall",id:`wall-left-${e}`,config:{side:"left",style:o},position:so({x:t.size.x,y:e,z:0}),state:{},aabb:Jd,renderAabb:N1}),Object.values(t.items).find(i=>i.type==="door"&&i.config.axis==="y"&&i.position.x===0&&(i.position.y===e||i.position.y+1===e))!==void 0||(yield{..._t,type:"wall",id:`wall-right-${e}`,config:{side:"left",style:"none"},position:so({x:0,y:e,z:0}),state:{},aabb:{x:0,y:Se.d,z:999},renders:!1})}for(let e=t.size.x-1;e>=0;e--){const o=t.walls.away[e];o!=="none"&&(yield{..._t,type:"wall",id:`wall-away-${e}`,config:{side:"away",style:o},position:so({x:e,y:t.size.y,z:0}),state:{},aabb:Kd,renderAabb:U1}),Object.values(t.items).find(i=>i.type==="door"&&i.config.axis==="x"&&(i.position.x===e||i.position.x+1===e)&&i.position.y===0)!==void 0||(yield{..._t,type:"wall",id:`wall-towards-${e}`,config:{side:"towards",style:"none"},position:so({x:e,y:0,z:0}),state:{},aabb:{x:Se.w,y:0,z:999},renders:!1})}}const Tr=t=>{const e=so(t.position),{aabb:o,renderAabb:n}=z5(t);return o===void 0?{position:e,aabb:o}:{position:{...t.type==="wall"?e:u5(e,{x:(Se.w-o.x)/2,y:(Se.d-o.y)/2}),z:e.z},aabb:o,renderAabb:n}};function*E5(t,e){switch(e.type){case"door":{const{config:{axis:o},position:n}=e,i=o==="x"?"y":"x",r=o==="x"&&e.position.y===0||o==="y"&&e.position.x===0,s={[i]:r?n[i]-.5:n[i]};yield{...e,..._t,id:`${t}/far`,config:{...e.config,inHiddenWall:r},type:"doorFar",position:so({...e.position,[o]:e.position[o]+1.5,...s}),state:{},aabb:{x:8,y:8,z:48}},yield{...e,..._t,id:`${t}/near`,config:{...e.config,inHiddenWall:r},type:"doorNear",position:so({...e.position,...s}),state:{},aabb:{x:8,y:8,z:48}};return}case"player":{e.config.which==="head"?yield{type:"head",config:{},..._t,id:"head",state:{facing:"towards",movement:"idle",jumpRemaining:0,hasHooter:!1,fast:0,shield:0,standingOn:null,lives:8,donuts:0},...Tr(e),falls:!0}:yield{type:"heels",config:{},..._t,id:"heels",state:{facing:"towards",movement:"idle",jumpRemaining:0,carrying:null,hasBag:!1,jumps:0,shield:0,standingOn:null,lives:8},...Tr(e),falls:!0};return}case"pickup":case"portable-block":case"baddie":case"spring":{yield{...e,..._t,id:t,renderingDirty:!1,renderPositionDirty:!1,state:{standingOn:null},...Tr(e),falls:Eu.includes(e.type)};return}case"teleporter":{yield{...e,..._t,id:t,renderingDirty:!1,renderPositionDirty:!1,state:{flashing:!1},...Tr(e),falls:Eu.includes(e.type)};return}default:yield{...e,..._t,id:t,renderingDirty:!1,renderPositionDirty:!1,state:{},...Tr(e),falls:Eu.includes(e.type)}}}const _5=({aabb:t,position:e},{aabb:o,position:n},i=["x","y","z"])=>{for(const r of i)if(e[r]+t[r]<=n[r]||e[r]>=n[r]+o[r])return!1;return!0},ef=(t,e,o=["x","y","z"])=>e.filter(n=>t.id!==n.id&&_5(t,n,o));function*C5(t){const e=B1(t);for(const[o,n]of e)yield*E5(o,n)}const Z5=t=>({..._t,type:"floor",id:"floor",config:{},position:so({x:0,y:0,z:0}),state:{},aabb:{...so(t.size),z:0},renders:!1}),A5=t=>{for(const e of t)if(D1(e)){const o=As(e.position,{z:-1}),n=ef({position:o,aabb:e.aabb,id:e.id},t);for(const i of n){const r=i.position.z+i.aabb.z,s=e.position.z;if(r===s){e.state.standingOn=i,console.log(e,"is standing on",i);break}}}},uy=t=>{const e=[Z5(t),...S5(t),...C5(t.items)];return A5(e),{...t,items:e}},R5=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Å","Ä","Ö","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","-","_","=","+","[","]","{","}",";",":","'",'"',",",".","/","<",">","?","\\","|"," ","Enter","Shift","Control","`","~","Tab","Backspace","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadSubtract","NumpadMultiply","NumpadDivide","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"],Vg=t=>R5.includes(t),P5=[...Yd,"jump","fire","carry","swop","pause"],mo={right:["P"],towards:["A"],left:["O"],away:["Q"],jump:[" ","M"],carry:["C","M"],fire:["N"],swop:["Enter"],pause:["H"]},T5={right:["ArrowRight",...mo.right],towards:["ArrowDown",...mo.towards],left:["ArrowLeft",...mo.left],away:["ArrowUp",...mo.away],jump:mo.jump,carry:["Shift",...mo.carry],fire:["Control",...mo.fire],swop:mo.swop,pause:["F8",...mo.pause]};function*qg(t,e){for(const[o,n]of B1(t))n.includes(e)&&(yield o)}const Yg=t=>t.length===1?t.toUpperCase():t,j5=({keyAssignment:t,inputState:e})=>{const o=({key:i})=>{const r=Yg(i);if(!Vg(r)){console.log("do not recognise key: ",r);return}for(const s of qg(t,r))e[s]=!0},n=({key:i})=>{const r=Yg(i);if(Vg(r))for(const s of qg(t,r))e[s]=!1};return window.addEventListener("keydown",o,!1),window.addEventListener("keyup",n,!1),()=>{console.log("removing listeners on keys"),window.removeEventListener("keydown",o,!1),window.removeEventListener("keyup",n,!1)}},I5=t=>{const e={};for(const o of Object.values(t.rooms))for(const n of Object.values(o.items))if(n.type==="player"){const i=n.config.which;e[i]=o.id}if(e.head===void 0)throw new Error("couldn't find head in campaign");if(e.heels===void 0)throw new Error("couldn't find heels in campaign");return e},F5=t=>{const e=I5(t),o=uy(t.rooms[e.head]),n=uy(t.rooms[e.heels]);return{keyAssignment:T5,currentCharacter:"head",characterRooms:{head:o,heels:n},inputState:k5(P5.map(i=>[i,!1]))}},M5=async t=>{const e=()=>{if(t.renderer.width===0||t.renderer.height===0)return;const o=Math.floor(Math.min(t.renderer.width/Ia.width,t.renderer.height/Ia.height));console.log("scale factor is:",o),t.stage.scale=o};t.renderer.on("resize",()=>e()),e()},_u={basic:new Y("rgb(210, 210, 210)"),dimmed:new Y("rgb(120, 120, 120)")},Cu={basic:new Y("hsl(50,58%,70%)"),dimmed:new Y("hsl(30,20%,40%)")},Qg={basic:new Y("hsl(290,25%,60%)"),dimmed:new Y("hsl(290,25%,40%)")},vl={basic:new Y("hsl(183, 28%, 50%)"),dimmed:new Y("hsl(183, 28%,30%)")},Zu={basic:new Y("hsl(73,35%,48%)"),dimmed:new Y("hsl(73,35%,30%)")},L1={white:{main:_u,edges:{towards:vl,right:Cu}},yellow:{main:Cu,edges:{towards:Zu,right:_u}},magenta:{main:Qg,edges:{towards:Zu,right:vl}},cyan:{main:vl,edges:{towards:Qg,right:_u}},green:{main:Zu,edges:{towards:vl,right:Cu}}};var ae=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,ce=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}`,O5=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uGamma;
uniform float uContrast;
uniform float uSaturation;
uniform float uBrightness;
uniform vec4 uColor;

void main()
{
    vec4 c = texture(uTexture, vTextureCoord);

    if (c.a > 0.0) {
        c.rgb /= c.a;

        vec3 rgb = pow(c.rgb, vec3(1. / uGamma));
        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, uSaturation), uContrast);
        rgb.r *= uColor.r;
        rgb.g *= uColor.g;
        rgb.b *= uColor.b;
        c.rgb = rgb * uBrightness;

        c.rgb *= c.a;
    }

    finalColor = c * uColor.a;
}
`,D5=`struct AdjustmentUniforms {
  uGamma: f32,
  uContrast: f32,
  uSaturation: f32,
  uBrightness: f32,
  uColor: vec4<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> adjustmentUniforms : AdjustmentUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  var sample = textureSample(uTexture, uSampler, uv);
  let color = adjustmentUniforms.uColor;

  if (sample.a > 0.0) 
  {
    sample = vec4<f32>(sample.rgb / sample.a, sample.a);
    var rgb: vec3<f32> = pow(sample.rgb, vec3<f32>(1. / adjustmentUniforms.uGamma));
    rgb = mix(vec3<f32>(.5), mix(vec3<f32>(dot(vec3<f32>(.2125, .7154, .0721), rgb)), rgb, adjustmentUniforms.uSaturation), adjustmentUniforms.uContrast);
    rgb.r *= color.r;
    rgb.g *= color.g;
    rgb.b *= color.b;
    sample = vec4<f32>(rgb.rgb * adjustmentUniforms.uBrightness, sample.a);
    sample = vec4<f32>(sample.rgb * sample.a, sample.a);
  }

  return sample * color.a;
}`,B5=Object.defineProperty,G5=(t,e,o)=>e in t?B5(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,$1=(t,e,o)=>(G5(t,typeof e!="symbol"?e+"":e,o),o);const U5=class W1 extends ie{constructor(e){e={...W1.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:D5,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:O5,name:"adjustment-filter"});super({gpuProgram:o,glProgram:n,resources:{adjustmentUniforms:{uGamma:{value:e.gamma,type:"f32"},uContrast:{value:e.contrast,type:"f32"},uSaturation:{value:e.saturation,type:"f32"},uBrightness:{value:e.brightness,type:"f32"},uColor:{value:[e.red,e.green,e.blue,e.alpha],type:"vec4<f32>"}}}}),$1(this,"uniforms"),this.uniforms=this.resources.adjustmentUniforms.uniforms}get gamma(){return this.uniforms.uGamma}set gamma(e){this.uniforms.uGamma=e}get contrast(){return this.uniforms.uContrast}set contrast(e){this.uniforms.uContrast=e}get saturation(){return this.uniforms.uSaturation}set saturation(e){this.uniforms.uSaturation=e}get brightness(){return this.uniforms.uBrightness}set brightness(e){this.uniforms.uBrightness=e}get red(){return this.uniforms.uColor[0]}set red(e){this.uniforms.uColor[0]=e}get green(){return this.uniforms.uColor[1]}set green(e){this.uniforms.uColor[1]=e}get blue(){return this.uniforms.uColor[2]}set blue(e){this.uniforms.uColor[2]=e}get alpha(){return this.uniforms.uColor[3]}set alpha(e){this.uniforms.uColor[3]=e}};$1(U5,"DEFAULT_OPTIONS",{gamma:1,contrast:1,saturation:1,brightness:1,red:1,green:1,blue:1,alpha:1});var N5=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample top right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample bottom right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));

    // Sample bottom left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));

    // Average
    color *= 0.25;

    finalColor = color;
}`,L5=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4<f32>(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y));
  // Average
  color *= 0.25;

  return color;
}`,$5=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

uniform vec4 uInputClamp;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample top right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Average
    color *= 0.25;

    finalColor = color;
}
`,W5=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Average
  color *= 0.25;
    
  return color;
}`,H5=Object.defineProperty,X5=(t,e,o)=>e in t?H5(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Zn=(t,e,o)=>(X5(t,typeof e!="symbol"?e+"":e,o),o);const H1=class X1 extends ie{constructor(...e){let o=e[0]??{};(typeof o=="number"||Array.isArray(o))&&($("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),o={strength:o},e[1]!==void 0&&(o.quality=e[1]),e[2]!==void 0&&(o.clamp=e[2])),o={...X1.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:o?.clamp?W5:L5,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:o?.clamp?$5:N5,name:"kawase-blur-filter"});super({gpuProgram:n,glProgram:i,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Zn(this,"uniforms"),Zn(this,"_pixelSize",{x:0,y:0}),Zn(this,"_clamp"),Zn(this,"_kernels",[]),Zn(this,"_blur"),Zn(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=o.pixelSize??{x:1,y:1},Array.isArray(o.strength)?this.kernels=o.strength:typeof o.strength=="number"&&(this._blur=o.strength,this.quality=o.quality??3),this._clamp=!!o.clamp}apply(e,o,n,i){const r=this.pixelSizeX/o.source.width,s=this.pixelSizeY/o.source.height;let l;if(this._quality===1||this._blur===0)l=this._kernels[0]+.5,this.uniforms.uOffset[0]=l*r,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,o,n,i);else{const a=jt.getSameSizeTexture(o);let c=o,u=a,p;const y=this._quality-1;for(let d=0;d<y;d++)l=this._kernels[d]+.5,this.uniforms.uOffset[0]=l*r,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,u,!0),p=c,c=u,u=p;l=this._kernels[y]+.5,this.uniforms.uOffset[0]=l*r,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,n,i),jt.returnTexture(a)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,o)=>e+o+.5,0))}_generateKernels(){const e=this._blur,o=this._quality,n=[e];if(e>0){let i=e;const r=e/o;for(let s=1;s<o;s++)i-=r,n.push(i)}this._kernels=n,this._updatePadding()}};Zn(H1,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let V1=H1;var V5=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;
uniform float uBloomScale;
uniform float uBrightness;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);
    color.rgb *= uBrightness;
    vec4 bloomColor = vec4(texture(uMapTexture, vTextureCoord).rgb, 0.0);
    bloomColor.rgb *= uBloomScale;
    finalColor = color + bloomColor;
}
`,q5=`struct AdvancedBloomUniforms {
  uBloomScale: f32,
  uBrightness: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> advancedBloomUniforms : AdvancedBloomUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color = textureSample(uTexture, uSampler, uv);
  color = vec4<f32>(color.rgb * advancedBloomUniforms.uBrightness, color.a);

  var bloomColor = vec4<f32>(textureSample(uMapTexture, uSampler, uv).rgb, 0.0);
  bloomColor = vec4<f32>(bloomColor.rgb * advancedBloomUniforms.uBloomScale, bloomColor.a);
  
  return color + bloomColor;
}
`,Y5=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uThreshold;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);

    // A simple & fast algorithm for getting brightness.
    // It's inaccuracy , but good enought for this feature.
    float _max = max(max(color.r, color.g), color.b);
    float _min = min(min(color.r, color.g), color.b);
    float brightness = (_max + _min) * 0.5;

    if(brightness > uThreshold) {
        finalColor = color;
    } else {
        finalColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
`,Q5=`struct ExtractBrightnessUniforms {
  uThreshold: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> extractBrightnessUniforms : ExtractBrightnessUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  // A simple & fast algorithm for getting brightness.
  // It's inaccurate, but good enough for this feature.
  let max: f32 = max(max(color.r, color.g), color.b);
  let min: f32 = min(min(color.r, color.g), color.b);
  let brightness: f32 = (max + min) * 0.5;

  return select(vec4<f32>(0.), color, brightness > extractBrightnessUniforms.uThreshold);
}
`,K5=Object.defineProperty,J5=(t,e,o)=>e in t?K5(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,q1=(t,e,o)=>(J5(t,typeof e!="symbol"?e+"":e,o),o);const Y1=class Q1 extends ie{constructor(e){e={...Q1.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:Q5,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:Y5,name:"extract-brightness-filter"});super({gpuProgram:o,glProgram:n,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),q1(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};q1(Y1,"DEFAULT_OPTIONS",{threshold:.5});let eC=Y1;var tC=Object.defineProperty,oC=(t,e,o)=>e in t?tC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,xi=(t,e,o)=>(oC(t,typeof e!="symbol"?e+"":e,o),o);const nC=class K1 extends ie{constructor(e){e={...K1.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:q5,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:V5,name:"advanced-bloom-filter"});super({gpuProgram:o,glProgram:n,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:V.WHITE}}),xi(this,"uniforms"),xi(this,"bloomScale",1),xi(this,"brightness",1),xi(this,"_extractFilter"),xi(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new eC({threshold:e.threshold}),this._blurFilter=new V1({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,o,n,i){const r=jt.getSameSizeTexture(o);this._extractFilter.apply(e,o,r,!0);const s=jt.getSameSizeTexture(o);this._blurFilter.apply(e,r,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,o,n,i),jt.returnTexture(s),jt.returnTexture(r)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};xi(nC,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});var iC=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uSize;
uniform vec3 uColor;
uniform float uReplaceColor;

uniform vec4 uInputSize;

vec2 mapCoord( vec2 coord )
{
    coord *= uInputSize.xy;
    coord += uInputSize.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= uInputSize.zw;
    coord /= uInputSize.xy;

    return coord;
}

vec2 pixelate(vec2 coord, vec2 size)
{
    return floor(coord / size) * size;
}

vec2 getMod(vec2 coord, vec2 size)
{
    return mod(coord, size) / size;
}

float character(float n, vec2 p)
{
    p = floor(p*vec2(4.0, 4.0) + 2.5);

    if (clamp(p.x, 0.0, 4.0) == p.x)
    {
        if (clamp(p.y, 0.0, 4.0) == p.y)
        {
            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;
        }
    }
    return 0.0;
}

void main()
{
    vec2 coord = mapCoord(vTextureCoord);

    // get the grid position
    vec2 pixCoord = pixelate(coord, vec2(uSize));
    pixCoord = unmapCoord(pixCoord);

    // sample the color at grid position
    vec4 color = texture(uTexture, pixCoord);

    // brightness of the color as it's perceived by the human eye
    float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;

    // determine the character to use
    float n =  65536.0;             // .
    if (gray > 0.2) n = 65600.0;    // :
    if (gray > 0.3) n = 332772.0;   // *
    if (gray > 0.4) n = 15255086.0; // o
    if (gray > 0.5) n = 23385164.0; // &
    if (gray > 0.6) n = 15252014.0; // 8
    if (gray > 0.7) n = 13199452.0; // @
    if (gray > 0.8) n = 11512810.0; // #

    // get the mod..
    vec2 modd = getMod(coord, vec2(uSize));

    finalColor = (uReplaceColor > 0.5 ? vec4(uColor, 1.) : color) * character( n, vec2(-1.0) + modd * 2.0);
}
`,rC=`struct AsciiUniforms {
    uSize: f32,
    uColor: vec3<f32>,
    uReplaceColor: f32,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> asciiUniforms : AsciiUniforms;

@fragment
fn mainFragment(
    @location(0) uv: vec2<f32>,
    @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
    let pixelSize: f32 = asciiUniforms.uSize;
    let coord: vec2<f32> = mapCoord(uv);

    // get the rounded color..
    var pixCoord: vec2<f32> = pixelate(coord, vec2<f32>(pixelSize));
    pixCoord = unmapCoord(pixCoord);

    var color = textureSample(uTexture, uSampler, pixCoord);

    // determine the character to use
    let gray: f32 = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
    
    var n: f32 = 65536.0; // .
    if (gray > 0.2) {
        n = 65600.0;    // :
    }
    if (gray > 0.3) {
        n = 332772.0;   // *
    }
    if (gray > 0.4) {
        n = 15255086.0; // o
    }
    if (gray > 0.5) {
        n = 23385164.0; // &
    }
    if (gray > 0.6) {
        n = 15252014.0; // 8
    }
    if (gray > 0.7) {
        n = 13199452.0; // @
    }
    if (gray > 0.8) {
        n = 11512810.0; // #
    }

    // get the mod..
    let modd: vec2<f32> = getMod(coord, vec2<f32>(pixelSize));
    return select(color, vec4<f32>(asciiUniforms.uColor, 1.), asciiUniforms.uReplaceColor > 0.5) * character(n, vec2<f32>(-1.0) + modd * 2.0);
}

fn pixelate(coord: vec2<f32>, size: vec2<f32>) -> vec2<f32>
{
    return floor( coord / size ) * size;
}

fn getMod(coord: vec2<f32>, size: vec2<f32>) -> vec2<f32>
{
    return moduloVec2( coord , size) / size;
}

fn character(n: f32, p: vec2<f32>) -> f32
{
    var q: vec2<f32> = floor(p*vec2<f32>(4.0, 4.0) + 2.5);

    if (clamp(q.x, 0.0, 4.0) == q.x)
    {
        if (clamp(q.y, 0.0, 4.0) == q.y)
        {
        if (i32(modulo(n/exp2(q.x + 5.0*q.y), 2.0)) == 1)
        {
            return 1.0;
        }
        }
    }

    return 0.0;
}

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

fn moduloVec2(x: vec2<f32>, y: vec2<f32>) -> vec2<f32>
{
  return x - y * floor(x/y);
}

fn mapCoord(coord: vec2<f32> ) -> vec2<f32>
{
    var mappedCoord: vec2<f32> = coord;
    mappedCoord *= gfu.uInputSize.xy;
    mappedCoord += gfu.uOutputFrame.xy;
    return mappedCoord;
}

fn unmapCoord(coord: vec2<f32> ) -> vec2<f32>
{
    var mappedCoord: vec2<f32> = coord;
    mappedCoord -= gfu.uOutputFrame.xy;
    mappedCoord /= gfu.uInputSize.xy;
    return mappedCoord;
}`,sC=Object.defineProperty,lC=(t,e,o)=>e in t?sC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,py=(t,e,o)=>(lC(t,typeof e!="symbol"?e+"":e,o),o);const aC=class J1 extends ie{constructor(...e){let o=e[0]??{};typeof o=="number"&&($("6.0.0","AsciiFilter constructor params are now options object. See params: { size, color, replaceColor }"),o={size:o});const n=o?.color&&o.replaceColor!==!1;o={...J1.DEFAULT_OPTIONS,...o};const i=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:rC,entryPoint:"mainFragment"}}),r=oe.from({vertex:ae,fragment:iC,name:"ascii-filter"});super({gpuProgram:i,glProgram:r,resources:{asciiUniforms:{uSize:{value:o.size,type:"f32"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uReplaceColor:{value:Number(n),type:"f32"}}}}),py(this,"uniforms"),py(this,"_color"),this.uniforms=this.resources.asciiUniforms.uniforms,this._color=new Y,this.color=o.color??16777215}get size(){return this.uniforms.uSize}set size(e){this.uniforms.uSize=e}get color(){return this._color.value}set color(e){this._color.setValue(e);const[o,n,i]=this._color.toArray();this.uniforms.uColor[0]=o,this.uniforms.uColor[1]=n,this.uniforms.uColor[2]=i}get replaceColor(){return this.uniforms.uReplaceColor>.5}set replaceColor(e){this.uniforms.uReplaceColor=e?1:0}};py(aC,"DEFAULT_OPTIONS",{size:8,color:16777215,replaceColor:!1});var cC=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTransform;
uniform vec3 uLightColor;
uniform float uLightAlpha;
uniform vec3 uShadowColor;
uniform float uShadowAlpha;

uniform vec4 uInputSize;

void main(void) {
    vec2 transform = vec2(1.0 / uInputSize) * vec2(uTransform.x, uTransform.y);
    vec4 color = texture(uTexture, vTextureCoord);
    float light = texture(uTexture, vTextureCoord - transform).a;
    float shadow = texture(uTexture, vTextureCoord + transform).a;

    color.rgb = mix(color.rgb, uLightColor, clamp((color.a - light) * uLightAlpha, 0.0, 1.0));
    color.rgb = mix(color.rgb, uShadowColor, clamp((color.a - shadow) * uShadowAlpha, 0.0, 1.0));
    finalColor = vec4(color.rgb * color.a, color.a);
}
`,uC=`struct BevelUniforms {
  uLightColor: vec3<f32>,
  uLightAlpha: f32,
  uShadowColor: vec3<f32>,
  uShadowAlpha: f32,
  uTransform: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> bevelUniforms : BevelUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let transform = vec2<f32>(1.0 / gfu.uInputSize.xy) * vec2<f32>(bevelUniforms.uTransform.x, bevelUniforms.uTransform.y);
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let lightSample: f32 = textureSample(uTexture, uSampler, uv - transform).a;
  let shadowSample: f32 = textureSample(uTexture, uSampler, uv + transform).a;

  let light = vec4<f32>(bevelUniforms.uLightColor, bevelUniforms.uLightAlpha);
  let shadow = vec4<f32>(bevelUniforms.uShadowColor, bevelUniforms.uShadowAlpha);

  color = vec4<f32>(mix(color.rgb, light.rgb, clamp((color.a - lightSample) * light.a, 0.0, 1.0)), color.a);
  color = vec4<f32>(mix(color.rgb, shadow.rgb, clamp((color.a - shadowSample) * shadow.a, 0.0, 1.0)), color.a);
  
  return vec4<f32>(color.rgb * color.a, color.a);
}`,pC=Object.defineProperty,yC=(t,e,o)=>e in t?pC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ki=(t,e,o)=>(yC(t,typeof e!="symbol"?e+"":e,o),o);const dC=class ek extends ie{constructor(e){e={...ek.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:uC,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:cC,name:"bevel-filter"});super({gpuProgram:o,glProgram:n,resources:{bevelUniforms:{uLightColor:{value:new Float32Array(3),type:"vec3<f32>"},uLightAlpha:{value:e.lightAlpha,type:"f32"},uShadowColor:{value:new Float32Array(3),type:"vec3<f32>"},uShadowAlpha:{value:e.shadowAlpha,type:"f32"},uTransform:{value:new Float32Array(2),type:"vec2<f32>"}}},padding:1}),ki(this,"uniforms"),ki(this,"_thickness"),ki(this,"_rotation"),ki(this,"_lightColor"),ki(this,"_shadowColor"),this.uniforms=this.resources.bevelUniforms.uniforms,this._lightColor=new Y,this._shadowColor=new Y,this.lightColor=e.lightColor??16777215,this.shadowColor=e.shadowColor??0,Object.assign(this,e)}get rotation(){return this._rotation/or}set rotation(e){this._rotation=e*or,this._updateTransform()}get thickness(){return this._thickness}set thickness(e){this._thickness=e,this._updateTransform()}get lightColor(){return this._lightColor.value}set lightColor(e){this._lightColor.setValue(e);const[o,n,i]=this._lightColor.toArray();this.uniforms.uLightColor[0]=o,this.uniforms.uLightColor[1]=n,this.uniforms.uLightColor[2]=i}get lightAlpha(){return this.uniforms.uLightAlpha}set lightAlpha(e){this.uniforms.uLightAlpha=e}get shadowColor(){return this._shadowColor.value}set shadowColor(e){this._shadowColor.setValue(e);const[o,n,i]=this._shadowColor.toArray();this.uniforms.uShadowColor[0]=o,this.uniforms.uShadowColor[1]=n,this.uniforms.uShadowColor[2]=i}get shadowAlpha(){return this.uniforms.uShadowAlpha}set shadowAlpha(e){this.uniforms.uShadowAlpha=e}_updateTransform(){this.uniforms.uTransform[0]=this.thickness*Math.cos(this._rotation),this.uniforms.uTransform[1]=this.thickness*Math.sin(this._rotation)}};ki(dC,"DEFAULT_OPTIONS",{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7});var fC=Object.defineProperty,hC=(t,e,o)=>e in t?fC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Vl=(t,e,o)=>(hC(t,typeof e!="symbol"?e+"":e,o),o);const gC=class tk extends q_{constructor(...e){let o=e[0]??{};if(typeof o=="number"||Array.isArray(o)||"x"in o&&"y"in o){$("6.0.0","BloomFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }");let n=o;Array.isArray(n)&&(n={x:n[0],y:n[1]}),o={strength:n},e[1]!==void 0&&(o.quality=e[1]),e[2]!==void 0&&(o.resolution=e[2]),e[3]!==void 0&&(o.kernelSize=e[3])}o={...tk.DEFAULT_OPTIONS,...o},super(),Vl(this,"_blurXFilter"),Vl(this,"_blurYFilter"),Vl(this,"_strength"),this._strength={x:2,y:2},o.strength&&(typeof o.strength=="number"?(this._strength.x=o.strength,this._strength.y=o.strength):(this._strength.x=o.strength.x,this._strength.y=o.strength.y)),this._blurXFilter=new Lg({...o,horizontal:!0,strength:this.strengthX}),this._blurYFilter=new Lg({...o,horizontal:!1,strength:this.strengthY}),this._blurYFilter.blendMode="screen",Object.assign(this,o)}apply(e,o,n,i){const r=jt.getSameSizeTexture(o);e.applyFilter(this,o,n,i),this._blurXFilter.apply(e,o,r,!0),this._blurYFilter.apply(e,r,n,!1),jt.returnTexture(r)}get strength(){return this._strength}set strength(e){this._strength=typeof e=="number"?{x:e,y:e}:e,this._updateStrength()}get strengthX(){return this.strength.x}set strengthX(e){this.strength.x=e,this._updateStrength()}get strengthY(){return this.strength.y}set strengthY(e){this.strength.y=e,this._updateStrength()}_updateStrength(){this._blurXFilter.blur=this.strengthX,this._blurYFilter.blur=this.strengthY}get blur(){return $("6.0.0","BloomFilter.blur is deprecated, please use BloomFilter.strength instead"),this.strengthX}set blur(e){$("6.0.0","BloomFilter.blur is deprecated, please use BloomFilter.strength instead"),this.strength=e}get blurX(){return $("6.0.0","BloomFilter.blurX is deprecated, please use BloomFilter.strengthX instead"),this.strengthX}set blurX(e){$("6.0.0","BloomFilter.blurX is deprecated, please use BloomFilter.strengthX instead"),this.strengthX=e}get blurY(){return $("6.0.0","BloomFilter.blurY is deprecated, please use BloomFilter.strengthY instead"),this.strengthY}set blurY(e){$("6.0.0","BloomFilter.blurY is deprecated, please use BloomFilter.strengthY instead"),this.strengthY=e}};Vl(gC,"DEFAULT_OPTIONS",{strength:{x:2,y:2},quality:4,resolution:1,kernelSize:5});var mC=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uDimensions;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uStrength;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

void main()
{
    vec2 coord = vTextureCoord * uInputSize.xy;
    coord -= uCenter * uDimensions.xy;
    float distance = length(coord);

    if (distance < uRadius) {
        float percent = distance / uRadius;
        if (uStrength > 0.0) {
            coord *= mix(1.0, smoothstep(0.0, uRadius / distance, percent), uStrength * 0.75);
        } else {
            coord *= mix(1.0, pow(percent, 1.0 + uStrength * 0.75) * uRadius / distance, 1.0 - percent);
        }
    }

    coord += uCenter * uDimensions.xy;
    coord /= uInputSize.xy;
    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    vec4 color = texture(uTexture, clampedCoord);

    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    finalColor = color;
}
`,bC=`struct BulgePinchUniforms {
  uDimensions: vec2<f32>,
  uCenter: vec2<f32>,
  uRadius: f32,
  uStrength: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> bulgePinchUniforms : BulgePinchUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let dimensions: vec2<f32> = bulgePinchUniforms.uDimensions;
  let center: vec2<f32> = bulgePinchUniforms.uCenter;
  let radius: f32 = bulgePinchUniforms.uRadius;
  let strength: f32 = bulgePinchUniforms.uStrength;
  var coord: vec2<f32> = (uv * gfu.uInputSize.xy) - center * dimensions.xy;

  let distance: f32 = length(coord);

  if (distance < radius) {
      let percent: f32 = distance / radius;
      if (strength > 0.0) {
          coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);
      } else {
          coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);
      }
  }
    coord += (center * dimensions.xy);
    coord /= gfu.uInputSize.xy;

    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);
    var color: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);
    if (coord.x != clampedCoord.x && coord.y != clampedCoord.y) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    return color;
}

fn compareVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
  if (x.x == y.x && x.y == y.y)
  {
    return true;
  }

  return false;
}`,xC=Object.defineProperty,kC=(t,e,o)=>e in t?xC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ok=(t,e,o)=>(kC(t,typeof e!="symbol"?e+"":e,o),o);const wC=class nk extends ie{constructor(e){e={...nk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:bC,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:mC,name:"bulge-pinch-filter"});super({gpuProgram:o,glProgram:n,resources:{bulgePinchUniforms:{uDimensions:{value:[0,0],type:"vec2<f32>"},uCenter:{value:e.center,type:"vec2<f32>"},uRadius:{value:e.radius,type:"f32"},uStrength:{value:e.strength,type:"f32"}}}}),ok(this,"uniforms"),this.uniforms=this.resources.bulgePinchUniforms.uniforms,Object.assign(this,e)}apply(e,o,n,i){this.uniforms.uDimensions[0]=o.frame.width,this.uniforms.uDimensions[1]=o.frame.height,e.applyFilter(this,o,n,i)}get center(){return this.uniforms.uCenter}set center(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uCenter=e}get centerX(){return this.uniforms.uCenter.x}set centerX(e){this.uniforms.uCenter.x=e}get centerY(){return this.uniforms.uCenter.y}set centerY(e){this.uniforms.uCenter.y=e}get radius(){return this.uniforms.uRadius}set radius(e){this.uniforms.uRadius=e}get strength(){return this.uniforms.uStrength}set strength(e){this.uniforms.uStrength=e}};ok(wC,"DEFAULT_OPTIONS",{center:{x:.5,y:.5},radius:100,strength:1});var vC=`precision highp float;
in vec2 vTextureCoord;
in vec2 vFilterCoord;
out vec4 finalColor;

const int TYPE_LINEAR = 0;
const int TYPE_RADIAL = 1;
const int TYPE_CONIC = 2;
const int MAX_STOPS = 32;

uniform sampler2D uTexture;
uniform vec4 uOptions;
uniform vec2 uCounts;
uniform vec3 uColors[MAX_STOPS];
uniform vec4 uStops[MAX_STOPS];

const float PI = 3.1415926538;
const float PI_2 = PI*2.;

struct ColorStop {
    float offset;
    vec3 color;
    float alpha;
};

mat2 rotate2d(float angle){
    return mat2(cos(angle), -sin(angle),
    sin(angle), cos(angle));
}

float projectLinearPosition(vec2 pos, float angle){
    vec2 center = vec2(0.5);
    vec2 result = pos - center;
    result = rotate2d(angle) * result;
    result = result + center;
    return clamp(result.x, 0., 1.);
}

float projectRadialPosition(vec2 pos) {
    float r = distance(pos, vec2(0.5));
    return clamp(2.*r, 0., 1.);
}

float projectAnglePosition(vec2 pos, float angle) {
    vec2 center = pos - vec2(0.5);
    float polarAngle=atan(-center.y, center.x);
    return mod(polarAngle + angle, PI_2) / PI_2;
}

float projectPosition(vec2 pos, int type, float angle) {
    if (type == TYPE_LINEAR) {
        return projectLinearPosition(pos, angle);
    } else if (type == TYPE_RADIAL) {
        return projectRadialPosition(pos);
    } else if (type == TYPE_CONIC) {
        return projectAnglePosition(pos, angle);
    }

    return pos.y;
}

void main(void) {
    int uType = int(uOptions[0]);
    float uAngle = uOptions[1];
    float uAlpha = uOptions[2];
    float uReplace = uOptions[3];

    int uNumStops = int(uCounts[0]);
    float uMaxColors = uCounts[1];

    // current/original color
    vec4 currentColor = texture(uTexture, vTextureCoord);

    // skip calculations if gradient alpha is 0
    if (0.0 == uAlpha) {
        finalColor = currentColor;
        return;
    }

    // project position
    float y = projectPosition(vFilterCoord, int(uType), radians(uAngle));

    // check gradient bounds
    float offsetMin = uStops[0][0];
    float offsetMax = 0.0;

    int numStops = int(uNumStops);

    for (int i = 0; i < MAX_STOPS; i++) {
        if (i == numStops-1){ // last index
            offsetMax = uStops[i][0];
        }
    }

    if (y  < offsetMin || y > offsetMax) {
        finalColor = currentColor;
        return;
    }

    // limit colors
    if (uMaxColors > 0.) {
        float stepSize = 1./uMaxColors;
        float stepNumber = float(floor(y/stepSize));
        y = stepSize * (stepNumber + 0.5);// offset by 0.5 to use color from middle of segment
    }

    // find color stops
    ColorStop from;
    ColorStop to;

    for (int i = 0; i < MAX_STOPS; i++) {
        if (y >= uStops[i][0]) {
            from = ColorStop(uStops[i][0], uColors[i], uStops[i][1]);
            to = ColorStop(uStops[i+1][0], uColors[i+1], uStops[i+1][1]);
        }

        if (i == numStops-1){ // last index
            break;
        }
    }

    // mix colors from stops
    vec4 colorFrom = vec4(from.color * from.alpha, from.alpha);
    vec4 colorTo = vec4(to.color * to.alpha, to.alpha);

    float segmentHeight = to.offset - from.offset;
    float relativePos = y - from.offset;// position from 0 to [segmentHeight]
    float relativePercent = relativePos / segmentHeight;// position in percent between [from.offset] and [to.offset].

    float gradientAlpha = uAlpha * currentColor.a;
    vec4 gradientColor = mix(colorFrom, colorTo, relativePercent) * gradientAlpha;

    if (uReplace < 0.5) {
        // mix resulting color with current color
        finalColor = gradientColor + currentColor*(1.-gradientColor.a);
    } else {
        // replace with gradient color
        finalColor = gradientColor;
    }
}
`,zC=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vFilterCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vFilterCoord = vTextureCoord * uInputSize.xy / uOutputFrame.zw;
}
`,Kg=`struct BaseUniforms {
  uOptions: vec4<f32>,
  uCounts: vec2<f32>,
};

struct StopsUniforms {
  uColors: array<vec3<f32>, MAX_STOPS>,
  uStops: array<vec4<f32>, MAX_STOPS>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> baseUniforms : BaseUniforms;
@group(1) @binding(1) var<uniform> stopsUniforms : StopsUniforms;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>,
  @location(1) coord : vec2<f32>
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn filterCoord( vTextureCoord:vec2<f32> ) -> vec2<f32>
{
    return vTextureCoord * gfu.uInputSize.xy / gfu.uOutputFrame.zw;
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  let vTextureCoord: vec2<f32> = filterTextureCoord(aPosition);
  return VSOutput(
   filterVertexPosition(aPosition),
   vTextureCoord,
   filterCoord(vTextureCoord),
  );
}

struct ColorStop {
  offset: f32,
  color: vec3<f32>,
  alpha: f32,
};

fn rotate2d(angle: f32) -> mat2x2<f32>{
  return mat2x2(cos(angle), -sin(angle),
  sin(angle), cos(angle));
}

fn projectLinearPosition(pos: vec2<f32>, angle: f32) -> f32 {
  var center: vec2<f32> = vec2<f32>(0.5);
  var result: vec2<f32> = pos - center;
  result = rotate2d(angle) * result;
  result = result + center;
  return clamp(result.x, 0.0, 1.0);
}

fn projectRadialPosition(pos: vec2<f32>) -> f32 {
  var r: f32 = distance(pos, vec2<f32>(0.5));
  return clamp(2.0 * r, 0.0, 1.0);
}

fn projectAnglePosition(pos: vec2<f32>, angle: f32) -> f32 {
  var center: vec2<f32> = pos - vec2<f32>(0.5, 0.5);
  var polarAngle: f32 = atan2(-center.y, center.x);
  return ((polarAngle + angle) % PI_2) / PI_2;
}

fn projectPosition(pos: vec2<f32>, gradientType: i32, angle: f32) -> f32 {
  if (gradientType == TYPE_LINEAR) {
      return projectLinearPosition(pos, angle);
  } else if (gradientType == TYPE_RADIAL) {
      return projectRadialPosition(pos);
  } else if (gradientType == TYPE_CONIC) {
      return projectAnglePosition(pos, angle);
  }

  return pos.y;
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>,
  @location(1) coord : vec2<f32>
) -> @location(0) vec4<f32> {
  let uType: i32 = i32(baseUniforms.uOptions[0]);
  let uAngle: f32 = baseUniforms.uOptions[1];
  let uAlpha: f32 = baseUniforms.uOptions[2];
  let uReplace: f32 = baseUniforms.uOptions[3];

  let uNumStops: i32 = i32(baseUniforms.uCounts[0]);
  let uMaxColors: f32 = baseUniforms.uCounts[1];

  // current/original color
  var currentColor: vec4<f32> = textureSample(uTexture, uSampler, uv);

  // skip calculations if gradient alpha is 0
  if (uAlpha == 0.0) { return currentColor; }

  // project position
  var y: f32 = projectPosition(coord, uType, radians(uAngle));

  // check gradient bounds
  var offsetMin: f32 = stopsUniforms.uStops[0][0];
  var offsetMax: f32 = 0.0;

  let numStops: i32 = uNumStops;

  for (var i: i32 = 0; i < MAX_STOPS; i = i + 1) {
      if (i == numStops - 1) { // last index
          offsetMax = stopsUniforms.uStops[i][0];
      }
  }

  if (y  < offsetMin || y > offsetMax) { return currentColor; }

  // limit colors
  if (uMaxColors > 0.0) {
      var stepSize: f32 = 1.0 / uMaxColors;
      var stepNumber: f32 = floor(y / stepSize);
      y = stepSize * (stepNumber + 0.5); // offset by 0.5 to use color from middle of segment
  }

  // find color stops
  var stopFrom: ColorStop;
  var stopTo: ColorStop;

  for (var i: i32 = 0; i < MAX_STOPS; i = i + 1) {
      if (y >= stopsUniforms.uStops[i][0]) {
          stopFrom = ColorStop(stopsUniforms.uStops[i][0], stopsUniforms.uColors[i], stopsUniforms.uStops[i][1]);
          stopTo = ColorStop(stopsUniforms.uStops[i + 1][0], stopsUniforms.uColors[i + 1], stopsUniforms.uStops[i + 1][1]);
      }

      if (i == numStops - 1) { // last index
          break;
      }
  }

  // mix colors from stops
  var colorFrom: vec4<f32> = vec4<f32>(stopFrom.color * stopFrom.alpha, stopFrom.alpha);
  var colorTo: vec4<f32> = vec4<f32>(stopTo.color * stopTo.alpha, stopTo.alpha);

  var segmentHeight: f32 = stopTo.offset - stopFrom.offset;
  var relativePos: f32 = y - stopFrom.offset; // position from 0 to [segmentHeight]
  var relativePercent: f32 = relativePos / segmentHeight; // position in percent between [from.offset] and [to.offset].

  var gradientAlpha: f32 = uAlpha * currentColor.a;
  var gradientColor: vec4<f32> = mix(colorFrom, colorTo, relativePercent) * gradientAlpha;

  if (uReplace < 0.5) {
      // mix resulting color with current color
      return gradientColor + currentColor * (1.0 - gradientColor.a);
  } else {
      // replace with gradient color
      return gradientColor;
  }
}

const PI: f32 = 3.14159265358979323846264;
const PI_2: f32 = PI * 2.0;

const TYPE_LINEAR: i32 = 0;
const TYPE_RADIAL: i32 = 1;
const TYPE_CONIC: i32 = 2;
const MAX_STOPS: i32 = 32;`,si=si||{};si.stringify=function(){var t={"visit_linear-gradient":function(e){return t.visit_gradient(e)},"visit_repeating-linear-gradient":function(e){return t.visit_gradient(e)},"visit_radial-gradient":function(e){return t.visit_gradient(e)},"visit_repeating-radial-gradient":function(e){return t.visit_gradient(e)},visit_gradient:function(e){var o=t.visit(e.orientation);return o&&(o+=", "),e.type+"("+o+t.visit(e.colorStops)+")"},visit_shape:function(e){var o=e.value,n=t.visit(e.at),i=t.visit(e.style);return i&&(o+=" "+i),n&&(o+=" at "+n),o},"visit_default-radial":function(e){var o="",n=t.visit(e.at);return n&&(o+=n),o},"visit_extent-keyword":function(e){var o=e.value,n=t.visit(e.at);return n&&(o+=" at "+n),o},"visit_position-keyword":function(e){return e.value},visit_position:function(e){return t.visit(e.value.x)+" "+t.visit(e.value.y)},"visit_%":function(e){return e.value+"%"},visit_em:function(e){return e.value+"em"},visit_px:function(e){return e.value+"px"},visit_literal:function(e){return t.visit_color(e.value,e)},visit_hex:function(e){return t.visit_color("#"+e.value,e)},visit_rgb:function(e){return t.visit_color("rgb("+e.value.join(", ")+")",e)},visit_rgba:function(e){return t.visit_color("rgba("+e.value.join(", ")+")",e)},visit_color:function(e,o){var n=e,i=t.visit(o.length);return i&&(n+=" "+i),n},visit_angular:function(e){return e.value+"deg"},visit_directional:function(e){return"to "+e.value},visit_array:function(e){var o="",n=e.length;return e.forEach(function(i,r){o+=t.visit(i),r<n-1&&(o+=", ")}),o},visit:function(e){if(!e)return"";var o="";if(e instanceof Array)return t.visit_array(e,o);if(e.type){var n=t["visit_"+e.type];if(n)return n(e);throw Error("Missing visitor visit_"+e.type)}else throw Error("Invalid node.")}};return function(e){return t.visit(e)}}();var si=si||{};si.parse=function(){var t={linearGradient:/^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,repeatingLinearGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,radialGradient:/^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,repeatingRadialGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,sideOrCorner:/^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,extentKeywords:/^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,positionKeywords:/^(left|center|right|top|bottom)/i,pixelValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,percentageValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,emValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,angleValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,startCall:/^\(/,endCall:/^\)/,comma:/^,/,hexColor:/^\#([0-9a-fA-F]+)/,literalColor:/^([a-zA-Z]+)/,rgbColor:/^rgb/i,rgbaColor:/^rgba/i,number:/^(([0-9]*\.[0-9]+)|([0-9]+\.?))/},e="";function o(F){var Z=new Error(e+": "+F);throw Z.source=e,Z}function n(){var F=i();return e.length>0&&o("Invalid input not EOF"),F}function i(){return k(r)}function r(){return s("linear-gradient",t.linearGradient,a)||s("repeating-linear-gradient",t.repeatingLinearGradient,a)||s("radial-gradient",t.radialGradient,p)||s("repeating-radial-gradient",t.repeatingRadialGradient,p)}function s(F,Z,R){return l(Z,function(T){var Q=R();return Q&&(W(t.comma)||o("Missing comma before color stops")),{type:F,orientation:Q,colorStops:k(w)}})}function l(F,Z){var R=W(F);if(R){W(t.startCall)||o("Missing (");var T=Z(R);return W(t.endCall)||o("Missing )"),T}}function a(){return c()||u()}function c(){return j("directional",t.sideOrCorner,1)}function u(){return j("angular",t.angleValue,1)}function p(){var F,Z=y(),R;return Z&&(F=[],F.push(Z),R=e,W(t.comma)&&(Z=y(),Z?F.push(Z):e=R)),F}function y(){var F=d()||g();if(F)F.at=b();else{var Z=f();if(Z){F=Z;var R=b();R&&(F.at=R)}else{var T=h();T&&(F={type:"default-radial",at:T})}}return F}function d(){var F=j("shape",/^(circle)/i,0);return F&&(F.style=M()||f()),F}function g(){var F=j("shape",/^(ellipse)/i,0);return F&&(F.style=D()||f()),F}function f(){return j("extent-keyword",t.extentKeywords,1)}function b(){if(j("position",/^at/,0)){var F=h();return F||o("Missing positioning value"),F}}function h(){var F=m();if(F.x||F.y)return{type:"position",value:F}}function m(){return{x:D(),y:D()}}function k(F){var Z=F(),R=[];if(Z)for(R.push(Z);W(t.comma);)Z=F(),Z?R.push(Z):o("One extra comma");return R}function w(){var F=v();return F||o("Expected color definition"),F.length=D(),F}function v(){return z()||C()||S()||E()}function E(){return j("literal",t.literalColor,0)}function z(){return j("hex",t.hexColor,1)}function S(){return l(t.rgbColor,function(){return{type:"rgb",value:k(_)}})}function C(){return l(t.rgbaColor,function(){return{type:"rgba",value:k(_)}})}function _(){return W(t.number)[1]}function D(){return j("%",t.percentageValue,1)||B()||M()}function B(){return j("position-keyword",t.positionKeywords,1)}function M(){return j("px",t.pixelValue,1)||j("em",t.emValue,1)}function j(F,Z,R){var T=W(Z);if(T)return{type:F,value:T[R]}}function W(F){var Z,R;return R=/^[\n\r\t\s]+/.exec(e),R&&H(R[0].length),Z=F.exec(e),Z&&H(Z[0].length),Z}function H(F){e=e.substr(F)}return function(F){return e=F.toString(),n()}}();var SC=si.parse;si.stringify;function EC(t){const e=SC(jC(t));if(e.length===0)throw new Error("Invalid CSS gradient.");if(e.length!==1)throw new Error("Unsupported CSS gradient (multiple gradients is not supported).");const o=e[0],n=_C(o.type),i=CC(o.colorStops),r=PC(o.orientation);return{type:n,stops:i,angle:r}}function _C(t){const e={"linear-gradient":0,"radial-gradient":1};if(!(t in e))throw new Error(`Unsupported gradient type "${t}"`);return e[t]}function CC(t){const e=AC(t),o=[],n=new Y;for(let i=0;i<t.length;i++){const r=ZC(t[i]),s=n.setValue(r).toArray();o.push({offset:e[i],color:s.slice(0,3),alpha:s[3]})}return o}function ZC(t){switch(t.type){case"hex":return`#${t.value}`;case"literal":return t.value;default:return`${t.type}(${t.value.join(",")})`}}function AC(t){const e=[];for(let r=0;r<t.length;r++){const s=t[r];let l=-1;s.type==="literal"&&s.length&&"type"in s.length&&s.length.type==="%"&&"value"in s.length&&(l=parseFloat(s.length.value)/100),e.push(l)}const n=r=>{for(let s=r;s<e.length;s++)if(e[s]!==-1)return{indexDelta:s-r,offset:e[s]};return{indexDelta:e.length-1-r,offset:1}};let i=0;for(let r=0;r<e.length;r++){const s=e[r];if(s!==-1)i=s;else if(r===0)e[r]=0;else if(r+1===e.length)e[r]=1;else{const l=n(r),c=(l.offset-i)/(1+l.indexDelta);for(let u=0;u<=l.indexDelta;u++)e[r+u]=i+(u+1)*c;r+=l.indexDelta,i=e[r]}}return e.map(RC)}function RC(t){return t.toString().length>6?parseFloat(t.toString().substring(0,6)):t}function PC(t){if(typeof t>"u")return 0;if("type"in t&&"value"in t)switch(t.type){case"angular":return parseFloat(t.value);case"directional":return TC(t.value)}return 0}function TC(t){const e={left:270,top:0,bottom:180,right:90,"left top":315,"top left":315,"left bottom":225,"bottom left":225,"right top":45,"top right":45,"right bottom":135,"bottom right":135};if(!(t in e))throw new Error(`Unsupported directional value "${t}"`);return e[t]}function jC(t){let e=t.replace(/\s{2,}/gu," ");return e=e.replace(/;/g,""),e=e.replace(/ ,/g,","),e=e.replace(/\( /g,"("),e=e.replace(/ \)/g,")"),e.trim()}var IC=Object.defineProperty,FC=(t,e,o)=>e in t?IC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Un=(t,e,o)=>(FC(t,typeof e!="symbol"?e+"":e,o),o);const Au=90;function MC(t){return[...t].sort((e,o)=>e.offset-o.offset)}const Rs=class ql extends ie{constructor(e){if(e&&"css"in e?e={...EC(e.css||""),alpha:e.alpha??ql.defaults.alpha,maxColors:e.maxColors??ql.defaults.maxColors}:e={...ql.defaults,...e},!e.stops||e.stops.length<2)throw new Error("ColorGradientFilter requires at least 2 color stops.");const o=te.from({vertex:{source:Kg,entryPoint:"mainVertex"},fragment:{source:Kg,entryPoint:"mainFragment"}}),n=oe.from({vertex:zC,fragment:vC,name:"color-gradient-filter"}),i=32;super({gpuProgram:o,glProgram:n,resources:{baseUniforms:{uOptions:{value:[e.type,e.angle??Au,e.alpha,e.replace?1:0],type:"vec4<f32>"},uCounts:{value:[e.stops.length,e.maxColors],type:"vec2<f32>"}},stopsUniforms:{uColors:{value:new Float32Array(i*3),type:"vec3<f32>",size:i},uStops:{value:new Float32Array(i*4),type:"vec4<f32>",size:i}}}}),Un(this,"baseUniforms"),Un(this,"stopsUniforms"),Un(this,"_stops",[]),this.baseUniforms=this.resources.baseUniforms.uniforms,this.stopsUniforms=this.resources.stopsUniforms.uniforms,Object.assign(this,e)}get stops(){return this._stops}set stops(e){const o=MC(e),n=new Y;let i,r,s;for(let l=0;l<o.length;l++){n.setValue(o[l].color);const a=l*3;[i,r,s]=n.toArray(),this.stopsUniforms.uColors[a]=i,this.stopsUniforms.uColors[a+1]=r,this.stopsUniforms.uColors[a+2]=s,this.stopsUniforms.uStops[l*4]=o[l].offset,this.stopsUniforms.uStops[l*4+1]=o[l].alpha}this.baseUniforms.uCounts[0]=o.length,this._stops=o}get type(){return this.baseUniforms.uOptions[0]}set type(e){this.baseUniforms.uOptions[0]=e}get angle(){return this.baseUniforms.uOptions[1]+Au}set angle(e){this.baseUniforms.uOptions[1]=e-Au}get alpha(){return this.baseUniforms.uOptions[2]}set alpha(e){this.baseUniforms.uOptions[2]=e}get maxColors(){return this.baseUniforms.uCounts[1]}set maxColors(e){this.baseUniforms.uCounts[1]=e}get replace(){return this.baseUniforms.uOptions[3]>.5}set replace(e){this.baseUniforms.uOptions[3]=e?1:0}};Un(Rs,"LINEAR",0);Un(Rs,"RADIAL",1);Un(Rs,"CONIC",2);Un(Rs,"defaults",{type:Rs.LINEAR,stops:[{offset:0,color:16711680,alpha:1},{offset:1,color:255,alpha:1}],alpha:1,angle:90,maxColors:0,replace:!1});var OC=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;
uniform float uMix;
uniform float uSize;
uniform float uSliceSize;
uniform float uSlicePixelSize;
uniform float uSliceInnerSize;

void main() {
    vec4 color = texture(uTexture, vTextureCoord.xy);
    vec4 adjusted;

    if (color.a > 0.0) {
        color.rgb /= color.a;
        float innerWidth = uSize - 1.0;
        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);
        float zSlice1 = min(zSlice0 + 1.0, innerWidth);
        float xOffset = uSlicePixelSize * 0.5 + color.r * uSliceInnerSize;
        float s0 = xOffset + (zSlice0 * uSliceSize);
        float s1 = xOffset + (zSlice1 * uSliceSize);
        float yOffset = uSliceSize * 0.5 + color.g * (1.0 - uSliceSize);
        vec4 slice0Color = texture(uMapTexture, vec2(s0,yOffset));
        vec4 slice1Color = texture(uMapTexture, vec2(s1,yOffset));
        float zOffset = fract(color.b * innerWidth);
        adjusted = mix(slice0Color, slice1Color, zOffset);

        color.rgb *= color.a;
    }

    finalColor = vec4(mix(color, adjusted, uMix).rgb, color.a);

}`,DC=`struct ColorMapUniforms {
  uMix: f32,
  uSize: f32,
  uSliceSize: f32,
  uSlicePixelSize: f32,
  uSliceInnerSize: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> colorMapUniforms : ColorMapUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;
@group(1) @binding(2) var uMapSampler: sampler;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color:vec4<f32> = textureSample(uTexture, uSampler, uv);

  var adjusted: vec4<f32>;

  var altColor: vec4<f32> = vec4<f32>(color.rgb / color.a, color.a);
  let innerWidth: f32 = colorMapUniforms.uSize - 1.0;
  let zSlice0: f32 = min(floor(color.b * innerWidth), innerWidth);
  let zSlice1: f32 = min(zSlice0 + 1.0, innerWidth);
  let xOffset: f32 = colorMapUniforms.uSlicePixelSize * 0.5 + color.r * colorMapUniforms.uSliceInnerSize;
  let s0: f32 = xOffset + (zSlice0 * colorMapUniforms.uSliceSize);
  let s1: f32 = xOffset + (zSlice1 * colorMapUniforms.uSliceSize);
  let yOffset: f32 = colorMapUniforms.uSliceSize * 0.5 + color.g * (1.0 - colorMapUniforms.uSliceSize);
  let slice0Color: vec4<f32> = textureSample(uMapTexture, uMapSampler, vec2(s0,yOffset));
  let slice1Color: vec4<f32> = textureSample(uMapTexture, uMapSampler, vec2(s1,yOffset));
  let zOffset: f32 = fract(color.b * innerWidth);
  adjusted = mix(slice0Color, slice1Color, zOffset);
  altColor = vec4<f32>(color.rgb * color.a, color.a);

  let realColor: vec4<f32> = select(color, altColor, color.a > 0.0);

  return vec4<f32>(mix(realColor, adjusted, colorMapUniforms.uMix).rgb, realColor.a);
}`,BC=Object.defineProperty,GC=(t,e,o)=>e in t?BC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,xo=(t,e,o)=>(GC(t,typeof e!="symbol"?e+"":e,o),o);const UC=class ik extends ie{constructor(...e){let o=e[0]??{};if((o instanceof V||o instanceof dt)&&($("6.0.0","ColorMapFilter constructor params are now options object. See params: { colorMap, nearest, mix }"),o={colorMap:o},e[1]!==void 0&&(o.nearest=e[1]),e[2]!==void 0&&(o.mix=e[2])),o={...ik.DEFAULT_OPTIONS,...o},!o.colorMap)throw Error("No color map texture source was provided to ColorMapFilter");const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:DC,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:OC,name:"color-map-filter"});super({gpuProgram:n,glProgram:i,resources:{colorMapUniforms:{uMix:{value:o.mix,type:"f32"},uSize:{value:0,type:"f32"},uSliceSize:{value:0,type:"f32"},uSlicePixelSize:{value:0,type:"f32"},uSliceInnerSize:{value:0,type:"f32"}},uMapTexture:o.colorMap.source,uMapSampler:o.colorMap.source.style}}),xo(this,"uniforms"),xo(this,"_size",0),xo(this,"_sliceSize",0),xo(this,"_slicePixelSize",0),xo(this,"_sliceInnerSize",0),xo(this,"_nearest",!1),xo(this,"_scaleMode","linear"),xo(this,"_colorMap"),this.uniforms=this.resources.colorMapUniforms.uniforms,Object.assign(this,o)}get mix(){return this.uniforms.uMix}set mix(e){this.uniforms.uMix=e}get colorSize(){return this._size}get colorMap(){return this._colorMap}set colorMap(e){if(!e||e===this.colorMap)return;const o=e instanceof V?e.source:e;o.style.scaleMode=this._scaleMode,o.autoGenerateMipmaps=!1,this._size=o.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms.uSize=this._size,this.uniforms.uSliceSize=this._sliceSize,this.uniforms.uSlicePixelSize=this._slicePixelSize,this.uniforms.uSliceInnerSize=this._sliceInnerSize,this.resources.uMapTexture=o,this._colorMap=e}get nearest(){return this._nearest}set nearest(e){this._nearest=e,this._scaleMode=e?"nearest":"linear";const o=this._colorMap;o&&o.source&&(o.source.scaleMode=this._scaleMode,o.source.autoGenerateMipmaps=!1,o.source.style.update(),o.source.update())}updateColorMap(){const e=this._colorMap;e?.source&&(e.source.update(),this.colorMap=e)}destroy(){this._colorMap?.destroy(),super.destroy()}};xo(UC,"DEFAULT_OPTIONS",{colorMap:V.WHITE,nearest:!1,mix:1});var NC=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uAlpha;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);
    finalColor = vec4(mix(c.rgb, uColor.rgb, c.a * uAlpha), c.a);
}
`,LC=`struct ColorOverlayUniforms {
    uColor: vec3<f32>,
    uAlpha: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> colorOverlayUniforms : ColorOverlayUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
    let c = textureSample(uTexture, uSampler, uv);
    return vec4<f32>(mix(c.rgb, colorOverlayUniforms.uColor.rgb, c.a * colorOverlayUniforms.uAlpha), c.a);
}
`,$C=Object.defineProperty,WC=(t,e,o)=>e in t?$C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,yy=(t,e,o)=>(WC(t,typeof e!="symbol"?e+"":e,o),o);const HC=class rk extends ie{constructor(...e){let o=e[0]??{};(typeof o=="number"||Array.isArray(o)||o instanceof Float32Array)&&($("6.0.0","ColorOverlayFilter constructor params are now options object. See params: { color, alpha }"),o={color:o},e[1]!==void 0&&(o.alpha=e[1])),o={...rk.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:LC,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:NC,name:"color-overlay-filter"});super({gpuProgram:n,glProgram:i,resources:{colorOverlayUniforms:{uColor:{value:new Float32Array(3),type:"vec3<f32>"},uAlpha:{value:o.alpha,type:"f32"}}}}),yy(this,"uniforms"),yy(this,"_color"),this.uniforms=this.resources.colorOverlayUniforms.uniforms,this._color=new Y,this.color=o.color??0}get color(){return this._color.value}set color(e){this._color.setValue(e);const[o,n,i]=this._color.toArray();this.uniforms.uColor[0]=o,this.uniforms.uColor[1]=n,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}};yy(HC,"DEFAULT_OPTIONS",{color:0,alpha:1});var XC=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uOriginalColor;
uniform vec3 uTargetColor;
uniform float uTolerance;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);
    vec3 colorDiff = uOriginalColor - (c.rgb / max(c.a, 0.0000000001));
    float colorDistance = length(colorDiff);
    float doReplace = step(colorDistance, uTolerance);
    finalColor = vec4(mix(c.rgb, (uTargetColor + colorDiff) * c.a, doReplace), c.a);
}
`,VC=`struct ColorReplaceUniforms {
  uOriginalColor: vec3<f32>,
  uTargetColor: vec3<f32>,
  uTolerance: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> colorReplaceUniforms : ColorReplaceUniforms;

@fragment
fn mainFragment(
   @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let sample: vec4<f32> = textureSample(uTexture, uSampler, uv);

  let colorDiff: vec3<f32> = colorReplaceUniforms.uOriginalColor - (sample.rgb / max(sample.a, 0.0000000001));
  let colorDistance: f32 = length(colorDiff);
  let doReplace: f32 = step(colorDistance, colorReplaceUniforms.uTolerance);

  return vec4<f32>(mix(sample.rgb, (colorReplaceUniforms.uTargetColor + colorDiff) * sample.a, doReplace), sample.a);
}`,qC=Object.defineProperty,YC=(t,e,o)=>e in t?qC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Yl=(t,e,o)=>(YC(t,typeof e!="symbol"?e+"":e,o),o);const sk=class lk extends ie{constructor(...e){let o=e[0]??{};(typeof o=="number"||Array.isArray(o)||o instanceof Float32Array)&&($("6.0.0","ColorReplaceFilter constructor params are now options object. See params: { originalColor, targetColor, tolerance }"),o={originalColor:o},e[1]!==void 0&&(o.targetColor=e[1]),e[2]!==void 0&&(o.tolerance=e[2])),o={...lk.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:VC,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:XC,name:"color-replace-filter"});super({gpuProgram:n,glProgram:i,resources:{colorReplaceUniforms:{uOriginalColor:{value:new Float32Array(3),type:"vec3<f32>"},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"},uTolerance:{value:o.tolerance,type:"f32"}}}}),Yl(this,"uniforms"),Yl(this,"_originalColor"),Yl(this,"_targetColor"),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this._originalColor=new Y,this._targetColor=new Y,this.originalColor=o.originalColor??16711680,this.targetColor=o.targetColor??0,Object.assign(this,o)}get originalColor(){return this._originalColor.value}set originalColor(e){this._originalColor.setValue(e);const[o,n,i]=this._originalColor.toArray();this.uniforms.uOriginalColor[0]=o,this.uniforms.uOriginalColor[1]=n,this.uniforms.uOriginalColor[2]=i}get targetColor(){return this._targetColor.value}set targetColor(e){this._targetColor.setValue(e);const[o,n,i]=this._targetColor.toArray();this.uniforms.uTargetColor[0]=o,this.uniforms.uTargetColor[1]=n,this.uniforms.uTargetColor[2]=i}get tolerance(){return this.uniforms.uTolerance}set tolerance(e){this.uniforms.uTolerance=e}set newColor(e){$("6.0.0","ColorReplaceFilter.newColor is deprecated, please use ColorReplaceFilter.targetColor instead"),this.targetColor=e}get newColor(){return $("6.0.0","ColorReplaceFilter.newColor is deprecated, please use ColorReplaceFilter.targetColor instead"),this.targetColor}set epsilon(e){$("6.0.0","ColorReplaceFilter.epsilon is deprecated, please use ColorReplaceFilter.tolerance instead"),this.tolerance=e}get epsilon(){return $("6.0.0","ColorReplaceFilter.epsilon is deprecated, please use ColorReplaceFilter.tolerance instead"),this.tolerance}};Yl(sk,"DEFAULT_OPTIONS",{originalColor:16711680,targetColor:0,tolerance:.4});let Jg=sk;var QC=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTexelSize;
uniform mat3 uMatrix;

void main(void)
{
    vec4 c11 = texture(uTexture, vTextureCoord - uTexelSize); // top left
    vec4 c12 = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - uTexelSize.y)); // top center
    vec4 c13 = texture(uTexture, vec2(vTextureCoord.x + uTexelSize.x, vTextureCoord.y - uTexelSize.y)); // top right

    vec4 c21 = texture(uTexture, vec2(vTextureCoord.x - uTexelSize.x, vTextureCoord.y)); // mid left
    vec4 c22 = texture(uTexture, vTextureCoord); // mid center
    vec4 c23 = texture(uTexture, vec2(vTextureCoord.x + uTexelSize.x, vTextureCoord.y)); // mid right

    vec4 c31 = texture(uTexture, vec2(vTextureCoord.x - uTexelSize.x, vTextureCoord.y + uTexelSize.y)); // bottom left
    vec4 c32 = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + uTexelSize.y)); // bottom center
    vec4 c33 = texture(uTexture, vTextureCoord + uTexelSize); // bottom right

    finalColor =
        c11 * uMatrix[0][0] + c12 * uMatrix[0][1] + c13 * uMatrix[0][2] +
        c21 * uMatrix[1][0] + c22 * uMatrix[1][1] + c23 * uMatrix[1][2] +
        c31 * uMatrix[2][0] + c32 * uMatrix[2][1] + c33 * uMatrix[2][2];

    finalColor.a = c22.a;
}`,KC=`struct ConvolutionUniforms {
    uMatrix: mat3x3<f32>,
    uTexelSize: vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> convolutionUniforms : ConvolutionUniforms;

@fragment
fn mainFragment(
    @location(0) uv: vec2<f32>,
    @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
    let texelSize = convolutionUniforms.uTexelSize;
    let matrix = convolutionUniforms.uMatrix;

    let c11: vec4<f32> = textureSample(uTexture, uSampler, uv - texelSize); // top left
    let c12: vec4<f32> = textureSample(uTexture, uSampler, vec2<f32>(uv.x, uv.y - texelSize.y)); // top center
    let c13: vec4<f32> = textureSample(uTexture, uSampler, vec2<f32>(uv.x + texelSize.x, uv.y - texelSize.y)); // top right

    let c21: vec4<f32> = textureSample(uTexture, uSampler, vec2<f32>(uv.x - texelSize.x, uv.y)); // mid left
    let c22: vec4<f32> = textureSample(uTexture, uSampler, uv); // mid center
    let c23: vec4<f32> = textureSample(uTexture, uSampler, vec2<f32>(uv.x + texelSize.x, uv.y)); // mid right

    let c31: vec4<f32> = textureSample(uTexture, uSampler, vec2<f32>(uv.x - texelSize.x, uv.y + texelSize.y)); // bottom left
    let c32: vec4<f32> = textureSample(uTexture, uSampler, vec2<f32>(uv.x, uv.y + texelSize.y)); // bottom center
    let c33: vec4<f32> = textureSample(uTexture, uSampler, uv + texelSize); // bottom right

    var finalColor: vec4<f32> = vec4<f32>(
        c11 * matrix[0][0] + c12 * matrix[0][1] + c13 * matrix[0][2] +
        c21 * matrix[1][0] + c22 * matrix[1][1] + c23 * matrix[1][2] +
        c31 * matrix[2][0] + c32 * matrix[2][1] + c33 * matrix[2][2]
    );

    finalColor.a = c22.a;

    return finalColor;
}`,JC=Object.defineProperty,e7=(t,e,o)=>e in t?JC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ak=(t,e,o)=>(e7(t,typeof e!="symbol"?e+"":e,o),o);const t7=class ck extends ie{constructor(...e){let o=e[0]??{};Array.isArray(o)&&($("6.0.0","ConvolutionFilter constructor params are now options object. See params: { matrix, width, height }"),o={matrix:o},e[1]!==void 0&&(o.width=e[1]),e[2]!==void 0&&(o.height=e[2])),o={...ck.DEFAULT_OPTIONS,...o};const n=o.width??200,i=o.height??200,r=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:KC,entryPoint:"mainFragment"}}),s=oe.from({vertex:ae,fragment:QC,name:"convolution-filter"});super({gpuProgram:r,glProgram:s,resources:{convolutionUniforms:{uMatrix:{value:o.matrix,type:"mat3x3<f32>"},uTexelSize:{value:{x:1/n,y:1/i},type:"vec2<f32>"}}}}),ak(this,"uniforms"),this.uniforms=this.resources.convolutionUniforms.uniforms,this.width=n,this.height=i}get matrix(){return this.uniforms.uMatrix}set matrix(e){e.forEach((o,n)=>{this.uniforms.uMatrix[n]=o})}get width(){return 1/this.uniforms.uTexelSize.x}set width(e){this.uniforms.uTexelSize.x=1/e}get height(){return 1/this.uniforms.uTexelSize.y}set height(e){this.uniforms.uTexelSize.y=1/e}};ak(t7,"DEFAULT_OPTIONS",{matrix:new Float32Array(9),width:200,height:200});var o7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec4 uLine;
uniform vec2 uNoise;
uniform vec3 uVignette;
uniform float uSeed;
uniform float uTime;
uniform vec2 uDimensions;

uniform vec4 uInputSize;

const float SQRT_2 = 1.414213;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float vignette(vec3 co, vec2 coord)
{
    float outter = SQRT_2 - uVignette[0] * SQRT_2;
    vec2 dir = vec2(0.5) - coord;
    dir.y *= uDimensions.y / uDimensions.x;
    float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + uVignette[2] * SQRT_2), 0.0, 1.0);
    return darker + (1.0 - darker) * (1.0 - uVignette[1]);
}

float noise(vec2 coord)
{
    vec2 pixelCoord = coord * uInputSize.xy;
    pixelCoord.x = floor(pixelCoord.x / uNoise[1]);
    pixelCoord.y = floor(pixelCoord.y / uNoise[1]);
    return (rand(pixelCoord * uNoise[1] * uSeed) - 0.5) * uNoise[0];
}

vec3 interlaceLines(vec3 co, vec2 coord)
{
    vec3 color = co;

    float curvature = uLine[0];
    float lineWidth = uLine[1];
    float lineContrast = uLine[2];
    float verticalLine = uLine[3];

    vec2 dir = vec2(coord * uInputSize.xy / uDimensions - 0.5);

    float _c = curvature > 0. ? curvature : 1.;
    float k = curvature > 0. ? (length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;
    vec2 uv = dir * k;
    float v = verticalLine > 0.5 ? uv.x * uDimensions.x : uv.y * uDimensions.y;
    v *= min(1.0, 2.0 / lineWidth ) / _c;
    float j = 1. + cos(v * 1.2 - uTime) * 0.5 * lineContrast;
    color *= j;

    float segment = verticalLine > 0.5 ? mod((dir.x + .5) * uDimensions.x, 4.) : mod((dir.y + .5) * uDimensions.y, 4.);
    color *= 0.99 + ceil(segment) * 0.015;

    return color;
}

void main(void)
{
    finalColor = texture(uTexture, vTextureCoord);
    vec2 coord = vTextureCoord * uInputSize.xy / uDimensions;

    if (uNoise[0] > 0.0 && uNoise[1] > 0.0)
    {
        float n = noise(vTextureCoord);
        finalColor += vec4(n, n, n, finalColor.a);
    }

    if (uVignette[0] > 0.)
    {
        float v = vignette(finalColor.rgb, coord);
        finalColor *= vec4(v, v, v, finalColor.a);
    }

    if (uLine[1] > 0.0)
    {
        finalColor = vec4(interlaceLines(finalColor.rgb, vTextureCoord), finalColor.a);  
    }
}
`,n7=`struct CRTUniforms {
    uLine: vec4<f32>,
    uNoise: vec2<f32>,
    uVignette: vec3<f32>,
    uSeed: f32,
    uTime: f32,
    uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> crtUniforms : CRTUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
    
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let coord: vec2<f32> = uv * gfu.uInputSize.xy / crtUniforms.uDimensions;

  let uNoise = crtUniforms.uNoise;

  if (uNoise[0] > 0.0 && uNoise[1] > 0.0)
  {
    color += vec4<f32>(vec3<f32>(noise(uv)), color.a);
  }

  if (crtUniforms.uVignette[0] > 0.)
  {
    color *= vec4<f32>(vec3<f32>(vignette(color.rgb, coord)), color.a);
  }

  if (crtUniforms.uLine[1] > 0.0)
  {
    color = vec4<f32>(vec3<f32>(interlaceLines(color.rgb, uv)), color.a);  
  }

  return color;
}

const SQRT_2: f32 = 1.414213;

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

fn rand(co: vec2<f32>) -> f32
{
  return fract(sin(dot(co, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn vignette(co: vec3<f32>, coord: vec2<f32>) -> f32
{
  let uVignette = crtUniforms.uVignette;
  let uDimensions = crtUniforms.uDimensions;
  
  let outter: f32 = SQRT_2 - uVignette[0] * SQRT_2;
  var dir: vec2<f32> = vec2<f32>(0.5) - coord;
  dir.y *= uDimensions.y / uDimensions.x;
  let darker: f32 = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + uVignette[2] * SQRT_2), 0.0, 1.0);
  return darker + (1.0 - darker) * (1.0 - uVignette[1]);
}

fn noise(coord: vec2<f32>) -> f32
{
  let uNoise = crtUniforms.uNoise;
  let uSeed = crtUniforms.uSeed;

  var pixelCoord: vec2<f32> = coord * gfu.uInputSize.xy;
  pixelCoord.x = floor(pixelCoord.x / uNoise[1]);
  pixelCoord.y = floor(pixelCoord.y / uNoise[1]);
  return (rand(pixelCoord * uNoise[1] * uSeed) - 0.5) * uNoise[0];
}

fn interlaceLines(co: vec3<f32>, coord: vec2<f32>) -> vec3<f32>
{
  var color = co;

  let uDimensions = crtUniforms.uDimensions;

  let curvature: f32 = crtUniforms.uLine[0];
  let lineWidth: f32 = crtUniforms.uLine[1];
  let lineContrast: f32 = crtUniforms.uLine[2];
  let verticalLine: f32 = crtUniforms.uLine[3];

  let dir: vec2<f32> = vec2<f32>(coord * gfu.uInputSize.xy / uDimensions - 0.5);

  let _c: f32 = select(1., curvature, curvature > 0.);
  let k: f32 = select(1., (length(dir * dir) * 0.25 * _c * _c + 0.935 * _c), curvature > 0.);
  let uv: vec2<f32> = dir * k;
  let v: f32 = select(uv.y * uDimensions.y, uv.x * uDimensions.x, verticalLine > 0.5) * min(1.0, 2.0 / lineWidth ) / _c;
  let j: f32 = 1. + cos(v * 1.2 - crtUniforms.uTime) * 0.5 * lineContrast;
  color *= j;

  let segment: f32 = select(modulo((dir.y + .5) * uDimensions.y, 4.), modulo((dir.x + .5) * uDimensions.x, 4.), verticalLine > 0.5);
  color *= 0.99 + ceil(segment) * 0.015;

  return color;
}`,i7=Object.defineProperty,r7=(t,e,o)=>e in t?i7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Ql=(t,e,o)=>(r7(t,typeof e!="symbol"?e+"":e,o),o);const s7=class uk extends ie{constructor(e){e={...uk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:n7,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:o7,name:"crt-filter"});super({gpuProgram:o,glProgram:n,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ql(this,"uniforms"),Ql(this,"seed"),Ql(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,o,n,i){this.uniforms.uDimensions[0]=o.frame.width,this.uniforms.uDimensions[1]=o.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,o,n,i)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ql(s7,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});var l7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uAngle;
uniform float uScale;
uniform bool uGrayScale;

uniform vec4 uInputSize;

float pattern()
{
    float s = sin(uAngle), c = cos(uAngle);
    vec2 tex = vTextureCoord * uInputSize.xy;
    vec2 point = vec2(
        c * tex.x - s * tex.y,
        s * tex.x + c * tex.y
    ) * uScale;
    return (sin(point.x) * sin(point.y)) * 4.0;
    }

    void main()
    {
    vec4 color = texture(uTexture, vTextureCoord);
    vec3 colorRGB = vec3(color);

    if (uGrayScale)
    {
        colorRGB = vec3(color.r + color.g + color.b) / 3.0;
    }

    finalColor = vec4(colorRGB * 10.0 - 5.0 + pattern(), color.a);
}
`,a7=`struct DotUniforms {
  uScale:f32,
  uAngle:f32,
  uGrayScale:f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> dotUniforms : DotUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let gray: vec3<f32> = vec3<f32>(dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114)));
  // dotUniforms.uGrayScale == 1 doesn't ever pass so it is converted to a float and compared to 0.5 instead 
  let finalColor: vec3<f32> = select(color.rgb, gray, f32(dotUniforms.uGrayScale) >= 0.5);

  return vec4<f32>(finalColor * 10.0 - 5.0 + pattern(uv), color.a);
}

fn pattern(uv: vec2<f32>) -> f32
{
  let s: f32 = sin(dotUniforms.uAngle);
  let c: f32 = cos(dotUniforms.uAngle);
  
  let tex: vec2<f32> = uv * gfu.uInputSize.xy;
  
  let p: vec2<f32> = vec2<f32>(
      c * tex.x - s * tex.y,
      s * tex.x + c * tex.y
  ) * dotUniforms.uScale;

  return (sin(p.x) * sin(p.y)) * 4.0;
}`,c7=Object.defineProperty,u7=(t,e,o)=>e in t?c7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,p7=(t,e,o)=>(u7(t,e+"",o),o);const y7=class pk extends ie{constructor(...e){let o=e[0]??{};typeof o=="number"&&($("6.0.0","DotFilter constructor params are now options object. See params: { scale, angle, grayscale }"),o={scale:o},e[1]!==void 0&&(o.angle=e[1]),e[2]!==void 0&&(o.grayscale=e[2])),o={...pk.DEFAULT_OPTIONS,...o};const n={uScale:{value:o.scale,type:"f32"},uAngle:{value:o.angle,type:"f32"},uGrayScale:{value:o.grayscale?1:0,type:"f32"}},i=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:a7,entryPoint:"mainFragment"}}),r=oe.from({vertex:ae,fragment:l7,name:"dot-filter"});super({gpuProgram:i,glProgram:r,resources:{dotUniforms:n}})}get scale(){return this.resources.dotUniforms.uniforms.uScale}set scale(e){this.resources.dotUniforms.uniforms.uScale=e}get angle(){return this.resources.dotUniforms.uniforms.uAngle}set angle(e){this.resources.dotUniforms.uniforms.uAngle=e}get grayscale(){return this.resources.dotUniforms.uniforms.uGrayScale===1}set grayscale(e){this.resources.dotUniforms.uniforms.uGrayScale=e?1:0}};p7(y7,"DEFAULT_OPTIONS",{scale:1,angle:5,grayscale:!0});var d7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec3 uColor;
uniform vec2 uOffset;

uniform vec4 uInputSize;

void main(void){
    vec4 sample = texture(uTexture, vTextureCoord - uOffset * uInputSize.zw);

    // Premultiply alpha
    sample.rgb = uColor.rgb * sample.a;

    // alpha user alpha
    sample *= uAlpha;

    finalColor = sample;
}`,f7=`struct DropShadowUniforms {
  uAlpha: f32,
  uColor: vec3<f32>,
  uOffset: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> dropShadowUniforms : DropShadowUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv - dropShadowUniforms.uOffset * gfu.uInputSize.zw);

  // Premultiply alpha
  color = vec4<f32>(vec3<f32>(dropShadowUniforms.uColor.rgb * color.a), color.a);
  // alpha user alpha
  color *= dropShadowUniforms.uAlpha;

  return color;
}`,h7=Object.defineProperty,g7=(t,e,o)=>e in t?h7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,wi=(t,e,o)=>(g7(t,typeof e!="symbol"?e+"":e,o),o);const m7=class yk extends ie{constructor(e){e={...yk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:f7,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:d7,name:"drop-shadow-filter"});super({gpuProgram:o,glProgram:n,resources:{dropShadowUniforms:{uAlpha:{value:e.alpha,type:"f32"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uOffset:{value:e.offset,type:"vec2<f32>"}}},resolution:e.resolution}),wi(this,"uniforms"),wi(this,"shadowOnly",!1),wi(this,"_color"),wi(this,"_blurFilter"),wi(this,"_basePass"),this.uniforms=this.resources.dropShadowUniforms.uniforms,this._color=new Y,this.color=e.color??0,this._blurFilter=new V1({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),this._basePass=new ie({gpuProgram:te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:`
                    @group(0) @binding(1) var uTexture: texture_2d<f32>; 
                    @group(0) @binding(2) var uSampler: sampler;
                    @fragment
                    fn mainFragment(
                        @builtin(position) position: vec4<f32>,
                        @location(0) uv : vec2<f32>
                    ) -> @location(0) vec4<f32> {
                        return textureSample(uTexture, uSampler, uv);
                    }
                    `,entryPoint:"mainFragment"}}),glProgram:oe.from({vertex:ae,fragment:`
                in vec2 vTextureCoord;
                out vec4 finalColor;
                uniform sampler2D uTexture;

                void main(void){
                    finalColor = texture(uTexture, vTextureCoord);
                }
                `,name:"drop-shadow-filter"}),resources:{}}),Object.assign(this,e)}apply(e,o,n,i){const r=jt.getSameSizeTexture(o);e.applyFilter(this,o,r,!0),this._blurFilter.apply(e,r,n,i),this.shadowOnly||e.applyFilter(this._basePass,o,n,!1),jt.returnTexture(r)}get offset(){return this.uniforms.uOffset}set offset(e){this.uniforms.uOffset=e,this._updatePadding()}get offsetX(){return this.offset.x}set offsetX(e){this.offset.x=e,this._updatePadding()}get offsetY(){return this.offset.y}set offsetY(e){this.offset.y=e,this._updatePadding()}get color(){return this._color.value}set color(e){this._color.setValue(e);const[o,n,i]=this._color.toArray();this.uniforms.uColor[0]=o,this.uniforms.uColor[1]=n,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e,this._updatePadding()}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e,this._updatePadding()}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}_updatePadding(){const e=Math.max(Math.abs(this.offsetX),Math.abs(this.offsetY));this.padding=e+this.blur*2+this.quality*4}};wi(m7,"DEFAULT_OPTIONS",{offset:{x:4,y:4},color:0,alpha:.5,shadowOnly:!1,kernels:void 0,blur:2,quality:3,pixelSize:{x:1,y:1},resolution:1});var b7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uDisplacementMap;
uniform float uSeed;
uniform vec2 uDimensions;
uniform float uAspect;
uniform float uFillMode;
uniform float uOffset;
uniform float uDirection;
uniform vec2 uRed;
uniform vec2 uGreen;
uniform vec2 uBlue;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const int TRANSPARENT = 0;
const int ORIGINAL = 1;
const int LOOP = 2;
const int CLAMP = 3;
const int MIRROR = 4;

void main(void)
{
    vec2 coord = (vTextureCoord * uInputSize.xy) / uDimensions;

    if (coord.x > 1.0 || coord.y > 1.0) {
        return;
    }

    float sinDir = sin(uDirection);
    float cosDir = cos(uDirection);

    float cx = coord.x - 0.5;
    float cy = (coord.y - 0.5) * uAspect;
    float ny = (-sinDir * cx + cosDir * cy) / uAspect + 0.5;

    // displacementMap: repeat
    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);

    // displacementMap: mirror
    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);

    vec4 dc = texture(uDisplacementMap, vec2(0.5, ny));

    float displacement = (dc.r - dc.g) * (uOffset / uInputSize.x);

    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * uAspect);

    int fillMode = int(uFillMode);

    if (fillMode == CLAMP) {
        coord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    } else {
        if( coord.x > uInputClamp.z ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.x -= uInputClamp.z;
            } else if (fillMode == MIRROR) {
                coord.x = uInputClamp.z * 2.0 - coord.x;
            }
        } else if( coord.x < uInputClamp.x ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.x += uInputClamp.z;
            } else if (fillMode == MIRROR) {
                coord.x *= -uInputClamp.z;
            }
        }

        if( coord.y > uInputClamp.w ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.y -= uInputClamp.w;
            } else if (fillMode == MIRROR) {
                coord.y = uInputClamp.w * 2.0 - coord.y;
            }
        } else if( coord.y < uInputClamp.y ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.y += uInputClamp.w;
            } else if (fillMode == MIRROR) {
                coord.y *= -uInputClamp.w;
            }
        }
    }

    finalColor.r = texture(uTexture, coord + uRed * (1.0 - uSeed * 0.4) / uInputSize.xy).r;
    finalColor.g = texture(uTexture, coord + uGreen * (1.0 - uSeed * 0.3) / uInputSize.xy).g;
    finalColor.b = texture(uTexture, coord + uBlue * (1.0 - uSeed * 0.2) / uInputSize.xy).b;
    finalColor.a = texture(uTexture, coord).a;
}
`,x7=`struct GlitchUniforms {
  uSeed: f32,
  uDimensions: vec2<f32>,
  uAspect: f32,
  uFillMode: f32,
  uOffset: f32,
  uDirection: f32,
  uRed: vec2<f32>,
  uGreen: vec2<f32>,
  uBlue: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> glitchUniforms : GlitchUniforms;
@group(1) @binding(1) var uDisplacementMap: texture_2d<f32>; 
@group(1) @binding(2) var uDisplacementSampler: sampler; 

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uSeed: f32 = glitchUniforms.uSeed;
  let uDimensions: vec2<f32> = glitchUniforms.uDimensions;
  let uAspect: f32 = glitchUniforms.uAspect;
  let uOffset: f32 = glitchUniforms.uOffset;
  let uDirection: f32 = glitchUniforms.uDirection;
  let uRed: vec2<f32> = glitchUniforms.uRed;
  let uGreen: vec2<f32> = glitchUniforms.uGreen;
  let uBlue: vec2<f32> = glitchUniforms.uBlue;

  let uInputSize: vec4<f32> = gfu.uInputSize;
  let uInputClamp: vec4<f32> = gfu.uInputClamp;

  var discarded: bool = false;
  var coord: vec2<f32> = (uv * uInputSize.xy) / uDimensions;

    if (coord.x > 1.0 || coord.y > 1.0) {
      discarded = true;
    }

    let sinDir: f32 = sin(uDirection);
    let cosDir: f32 = cos(uDirection);

    let cx: f32 = coord.x - 0.5;
    let cy: f32 = (coord.y - 0.5) * uAspect;
    var ny: f32 = (-sinDir * cx + cosDir * cy) / uAspect + 0.5;

    ny = select(select(ny, -ny, ny < 0.0), 2.0 - ny, ny > 1.0);

    let dc: vec4<f32> = textureSample(uDisplacementMap, uDisplacementSampler, vec2<f32>(0.5, ny));

    let displacement: f32 = (dc.r - dc.g) * (uOffset / uInputSize.x);

    coord = uv + vec2<f32>(cosDir * displacement, sinDir * displacement * uAspect);

    let fillMode: i32 = i32(glitchUniforms.uFillMode);

    if (fillMode == CLAMP) {
      coord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    } else {
      if (coord.x > uInputClamp.z) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.x = coord.x - uInputClamp.z;
        } else if (fillMode == MIRROR) {
          coord.x = uInputClamp.z * 2.0 - coord.x;
        }
      } else if (coord.x < uInputClamp.x) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.x = coord.x + uInputClamp.z;
        } else if (fillMode == MIRROR) {
          coord.x = coord.x * -uInputClamp.z;
        }
      }

      if (coord.y > uInputClamp.w) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.y = coord.y - uInputClamp.w;
        } else if (fillMode == MIRROR) {
          coord.y = uInputClamp.w * 2.0 - coord.y;
        }
      } else if (coord.y < uInputClamp.y) {
        if (fillMode == TRANSPARENT) {
          discarded = true;
        } else if (fillMode == LOOP) {
          coord.y = coord.y + uInputClamp.w;
        } else if (fillMode == MIRROR) {
          coord.y = coord.y * -uInputClamp.w;
        }
      }
    }

    let seedR: f32 = 1.0 - uSeed * 0.4;
    let seedG: f32 = 1.0 - uSeed * 0.3;
    let seedB: f32 = 1.0 - uSeed * 0.2;

    let offsetR: vec2<f32> = vec2(uRed.x * seedR / uInputSize.x, uRed.y * seedR / uInputSize.y);
    let offsetG: vec2<f32> = vec2(uGreen.x * seedG / uInputSize.x, uGreen.y * seedG / uInputSize.y);
    let offsetB: vec2<f32> = vec2(uBlue.x * seedB / uInputSize.x, uBlue.y * seedB / uInputSize.y);

    let r = textureSample(uTexture, uSampler, coord + offsetR).r;
    let g = textureSample(uTexture, uSampler, coord + offsetG).g;
    let b = textureSample(uTexture, uSampler, coord + offsetB).b;
    let a = textureSample(uTexture, uSampler, coord).a;

    return select(vec4<f32>(r, g, b, a), vec4<f32>(0.0,0.0,0.0,0.0), discarded);
}

const TRANSPARENT: i32 = 0;
const ORIGINAL: i32 = 1;
const LOOP: i32 = 2;
const CLAMP: i32 = 3;
const MIRROR: i32 = 4;`,k7=Object.defineProperty,w7=(t,e,o)=>e in t?k7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,oo=(t,e,o)=>(w7(t,typeof e!="symbol"?e+"":e,o),o);const v7=class dk extends ie{constructor(e){e={...dk.defaults,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:x7,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:b7,name:"glitch-filter"}),i=document.createElement("canvas");i.width=4,i.height=e.sampleSize??512;const r=new V({source:new ri({resource:i})});super({gpuProgram:o,glProgram:n,resources:{glitchUniforms:{uSeed:{value:e?.seed??0,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"},uAspect:{value:1,type:"f32"},uFillMode:{value:e?.fillMode??0,type:"f32"},uOffset:{value:e?.offset??100,type:"f32"},uDirection:{value:e?.direction??0,type:"f32"},uRed:{value:e.red,type:"vec2<f32>"},uGreen:{value:e.green,type:"vec2<f32>"},uBlue:{value:e.blue,type:"vec2<f32>"}},uDisplacementMap:r.source,uDisplacementSampler:r.source.style}}),oo(this,"uniforms"),oo(this,"average",!1),oo(this,"minSize",8),oo(this,"sampleSize",512),oo(this,"_canvas"),oo(this,"texture"),oo(this,"_slices",0),oo(this,"_sizes",new Float32Array(1)),oo(this,"_offsets",new Float32Array(1)),this.uniforms=this.resources.glitchUniforms.uniforms,this._canvas=i,this.texture=r,Object.assign(this,e)}apply(e,o,n,i){const{width:r,height:s}=o.frame;this.uniforms.uDimensions[0]=r,this.uniforms.uDimensions[1]=s,this.uniforms.uAspect=s/r,e.applyFilter(this,o,n,i)}_randomizeSizes(){const e=this._sizes,o=this._slices-1,n=this.sampleSize,i=Math.min(this.minSize/n,.9/this._slices);if(this.average){const r=this._slices;let s=1;for(let l=0;l<o;l++){const a=s/(r-l),c=Math.max(a*(1-Math.random()*.6),i);e[l]=c,s-=c}e[o]=s}else{let r=1;const s=Math.sqrt(1/this._slices);for(let l=0;l<o;l++){const a=Math.max(s*r*Math.random(),i);e[l]=a,r-=a}e[o]=r}this.shuffle()}shuffle(){const e=this._sizes,o=this._slices-1;for(let n=o;n>0;n--){const i=Math.random()*n>>0,r=e[n];e[n]=e[i],e[i]=r}}_randomizeOffsets(){for(let e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)}refresh(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()}redraw(){const e=this.sampleSize,o=this.texture,n=this._canvas.getContext("2d");n.clearRect(0,0,8,e);let i,r=0;for(let s=0;s<this._slices;s++){i=Math.floor(this._offsets[s]*256);const l=this._sizes[s]*e,a=i>0?i:0,c=i<0?-i:0;n.fillStyle=`rgba(${a}, ${c}, 0, 1)`,n.fillRect(0,r>>0,e,l+1>>0),r+=l}o.source.update()}set sizes(e){const o=Math.min(this._slices,e.length);for(let n=0;n<o;n++)this._sizes[n]=e[n]}get sizes(){return this._sizes}set offsets(e){const o=Math.min(this._slices,e.length);for(let n=0;n<o;n++)this._offsets[n]=e[n]}get offsets(){return this._offsets}get slices(){return this._slices}set slices(e){this._slices!==e&&(this._slices=e,this._sizes=new Float32Array(e),this._offsets=new Float32Array(e),this.refresh())}get offset(){return this.uniforms.uOffset}set offset(e){this.uniforms.uOffset=e}get seed(){return this.uniforms.uSeed}set seed(e){this.uniforms.uSeed=e}get fillMode(){return this.uniforms.uFillMode}set fillMode(e){this.uniforms.uFillMode=e}get direction(){return this.uniforms.uDirection/or}set direction(e){this.uniforms.uDirection=e*or}get red(){return this.uniforms.uRed}set red(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uRed=e}get green(){return this.uniforms.uGreen}set green(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uGreen=e}get blue(){return this.uniforms.uBlue}set blue(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uBlue=e}destroy(){this.texture?.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null}};oo(v7,"defaults",{slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:{x:0,y:0},green:{x:0,y:0},blue:{x:0,y:0},minSize:8,sampleSize:512});var z7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uStrength;
uniform vec3 uColor;
uniform float uKnockout;
uniform float uAlpha;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159265358979323846264;

// Hard-assignment of DIST and ANGLE_STEP_SIZE instead of using uDistance and uQuality to allow them to be use on GLSL loop conditions
const float DIST = __DIST__;
const float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.);
const float ANGLE_STEP_NUM = ceil(PI * 2. / ANGLE_STEP_SIZE);
const float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.) / 2.;

void main(void) {
    vec2 px = vec2(1.) / uInputSize.xy;

    float totalAlpha = 0.;

    vec2 direction;
    vec2 displaced;
    vec4 curColor;

    for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {
      direction = vec2(cos(angle), sin(angle)) * px;

      for (float curDistance = 0.; curDistance < DIST; curDistance++) {
          displaced = clamp(vTextureCoord + direction * (curDistance + 1.), uInputClamp.xy, uInputClamp.zw);
          curColor = texture(uTexture, displaced);
          totalAlpha += (DIST - curDistance) * curColor.a;
      }
    }
    
    curColor = texture(uTexture, vTextureCoord);

    vec4 glowColor = vec4(uColor, uAlpha);
    bool knockout = uKnockout > .5;
    float innerStrength = uStrength[0];
    float outerStrength = uStrength[1];

    float alphaRatio = totalAlpha / MAX_TOTAL_ALPHA;
    float innerGlowAlpha = (1. - alphaRatio) * innerStrength * curColor.a * uAlpha;
    float innerGlowStrength = min(1., innerGlowAlpha);
    
    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);
    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a) * uAlpha;
    float outerGlowStrength = min(1. - innerColor.a, outerGlowAlpha);
    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;

    if (knockout) {
      float resultAlpha = outerGlowAlpha + innerGlowAlpha;
      finalColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);
    }
    else {
      finalColor = innerColor + outerGlowColor;
    }
}
`,S7=`struct GlowUniforms {
  uDistance: f32,
  uStrength: vec2<f32>,
  uColor: vec3<f32>,
  uAlpha: f32,
  uQuality: f32,
  uKnockout: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> glowUniforms : GlowUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let quality = glowUniforms.uQuality;
  let distance = glowUniforms.uDistance;

  let dist: f32 = glowUniforms.uDistance;
  let angleStepSize: f32 = min(1. / quality / distance, PI * 2.0);
  let angleStepNum: f32 = ceil(PI * 2.0 / angleStepSize);

  let px: vec2<f32> = vec2<f32>(1.0 / gfu.uInputSize.xy);

  var totalAlpha: f32 = 0.0;

  var direction: vec2<f32>;
  var displaced: vec2<f32>;
  var curColor: vec4<f32>;

  for (var angle = 0.0; angle < PI * 2.0; angle += angleStepSize) {
    direction = vec2<f32>(cos(angle), sin(angle)) * px;
    for (var curDistance = 0.0; curDistance < dist; curDistance+=1) {
      displaced = vec2<f32>(clamp(uv + direction * (curDistance + 1.0), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
      curColor = textureSample(uTexture, uSampler, displaced);
      totalAlpha += (dist - curDistance) * curColor.a;
    }
  }
    
  curColor = textureSample(uTexture, uSampler, uv);

  let glowColorRGB = glowUniforms.uColor;
  let glowAlpha = glowUniforms.uAlpha;
  let glowColor = vec4<f32>(glowColorRGB, glowAlpha);
  let knockout: bool = glowUniforms.uKnockout > 0.5;
  let innerStrength = glowUniforms.uStrength[0];
  let outerStrength = glowUniforms.uStrength[1];

  let alphaRatio: f32 = (totalAlpha / (angleStepNum * dist * (dist + 1.0) / 2.0));
  let innerGlowAlpha: f32 = (1.0 - alphaRatio) * innerStrength * curColor.a * glowAlpha;
  let innerGlowStrength: f32 = min(1.0, innerGlowAlpha);
  
  let innerColor: vec4<f32> = mix(curColor, glowColor, innerGlowStrength);
  let outerGlowAlpha: f32 = alphaRatio * outerStrength * (1. - curColor.a) * glowAlpha;
  let outerGlowStrength: f32 = min(1.0 - innerColor.a, outerGlowAlpha);
  let outerGlowColor: vec4<f32> = outerGlowStrength * glowColor.rgba;
  
  if (knockout) {
    let resultAlpha: f32 = outerGlowAlpha + innerGlowAlpha;
    return vec4<f32>(glowColor.rgb * resultAlpha, resultAlpha);
  }
  else {
    return innerColor + outerGlowColor;
  }
}

const PI: f32 = 3.14159265358979323846264;`,E7=Object.defineProperty,_7=(t,e,o)=>e in t?E7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,dy=(t,e,o)=>(_7(t,typeof e!="symbol"?e+"":e,o),o);const C7=class fk extends ie{constructor(e){e={...fk.DEFAULT_OPTIONS,...e};const o=e.distance??10,n=e.quality??.1,i=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:S7,entryPoint:"mainFragment"}}),r=oe.from({vertex:ae,fragment:z7.replace(/__ANGLE_STEP_SIZE__/gi,`${(1/n/o).toFixed(7)}`).replace(/__DIST__/gi,`${o.toFixed(0)}.0`),name:"glow-filter"});super({gpuProgram:i,glProgram:r,resources:{glowUniforms:{uDistance:{value:o,type:"f32"},uStrength:{value:[e.innerStrength,e.outerStrength],type:"vec2<f32>"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uAlpha:{value:e.alpha,type:"f32"},uQuality:{value:n,type:"f32"},uKnockout:{value:e?.knockout??!1?1:0,type:"f32"}}},padding:o}),dy(this,"uniforms"),dy(this,"_color"),this.uniforms=this.resources.glowUniforms.uniforms,this._color=new Y,this.color=e.color??16777215}get distance(){return this.uniforms.uDistance}set distance(e){this.uniforms.uDistance=this.padding=e}get innerStrength(){return this.uniforms.uStrength[0]}set innerStrength(e){this.uniforms.uStrength[0]=e}get outerStrength(){return this.uniforms.uStrength[1]}set outerStrength(e){this.uniforms.uStrength[1]=e}get color(){return this._color.value}set color(e){this._color.setValue(e);const[o,n,i]=this._color.toArray();this.uniforms.uColor[0]=o,this.uniforms.uColor[1]=n,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}get quality(){return this.uniforms.uQuality}set quality(e){this.uniforms.uQuality=e}get knockout(){return this.uniforms.uKnockout===1}set knockout(e){this.uniforms.uKnockout=e?1:0}};dy(C7,"DEFAULT_OPTIONS",{distance:10,outerStrength:4,innerStrength:0,color:16777215,alpha:1,quality:.1,knockout:!1});var Z7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uDimensions;
uniform float uParallel;
uniform vec2 uLight;
uniform float uAspect;
uniform float uTime;
uniform vec3 uRay;

uniform vec4 uInputSize;

\${PERLIN}

void main(void) {
    vec2 uDimensions = uDimensions;
    bool uParallel = uParallel > 0.5;
    vec2 uLight = uLight;
    float uAspect = uAspect;

    vec2 coord = vTextureCoord * uInputSize.xy / uDimensions;

    float d;

    if (uParallel) {
        float _cos = uLight.x;
        float _sin = uLight.y;
        d = (_cos * coord.x) + (_sin * coord.y * uAspect);
    } else {
        float dx = coord.x - uLight.x / uDimensions.x;
        float dy = (coord.y - uLight.y / uDimensions.y) * uAspect;
        float dis = sqrt(dx * dx + dy * dy) + 0.00001;
        d = dy / dis;
    }

    float uTime = uTime;
    vec3 uRay = uRay;

    float gain = uRay[0];
    float lacunarity = uRay[1];
    float alpha = uRay[2];

    vec3 dir = vec3(d, d, 0.0);
    float noise = turb(dir + vec3(uTime, 0.0, 62.1 + uTime) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);
    noise = mix(noise, 0.0, 0.3);
    //fade vertically.
    vec4 mist = vec4(vec3(noise), 1.0) * (1.0 - coord.y);
    mist.a = 1.0;
    // apply user alpha
    mist *= alpha;

    finalColor = texture(uTexture, vTextureCoord) + mist;
}
`,A7=`struct GodrayUniforms {
  uLight: vec2<f32>,
  uParallel: f32,
  uAspect: f32,
  uTime: f32,
  uRay: vec3<f32>,
  uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> godrayUniforms : GodrayUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uDimensions: vec2<f32> = godrayUniforms.uDimensions;
  let uParallel: bool = godrayUniforms.uParallel > 0.5;
  let uLight: vec2<f32> = godrayUniforms.uLight;
  let uAspect: f32 = godrayUniforms.uAspect;

  let coord: vec2<f32> = uv * gfu.uInputSize.xy / uDimensions;

  var d: f32;

  if (uParallel) {
    let _cos: f32 = uLight.x;
    let _sin: f32 = uLight.y;
    d = (_cos * coord.x) + (_sin * coord.y * uAspect);
  } else {
    let dx: f32 = coord.x - uLight.x / uDimensions.x;
    let dy: f32 = (coord.y - uLight.y / uDimensions.y) * uAspect;
    let dis: f32 = sqrt(dx * dx + dy * dy) + 0.00001;
    d = dy / dis;
  }

  let uTime: f32 = godrayUniforms.uTime;
  let uRay: vec3<f32> = godrayUniforms.uRay;
  
  let gain = uRay[0];
  let lacunarity = uRay[1];
  let alpha = uRay[2];

  let dir: vec3<f32> = vec3<f32>(d, d, 0.0);
  var noise: f32 = turb(dir + vec3<f32>(uTime, 0.0, 62.1 + uTime) * 0.05, vec3<f32>(480.0, 320.0, 480.0), lacunarity, gain);
  noise = mix(noise, 0.0, 0.3);
  //fade vertically.
  var mist: vec4<f32> = vec4<f32>(vec3<f32>(noise), 1.0) * (1.0 - coord.y);
  mist.a = 1.0;
  // apply user alpha
  mist *= alpha;
  return textureSample(uTexture, uSampler, uv) + mist;
}

\${PERLIN}`,R7=`vec3 mod289(vec3 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x)
{
    return mod289(((x * 34.0) + 1.0) * x);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}
float turb(vec3 P, vec3 rep, float lacunarity, float gain)
{
    float sum = 0.0;
    float sc = 1.0;
    float totalgain = 1.0;
    for (float i = 0.0; i < 6.0; i++)
    {
        sum += totalgain * pnoise(P * sc, rep);
        sc *= lacunarity;
        totalgain *= gain;
    }
    return abs(sum);
}
`,P7=`// Taken from https://gist.github.com/munrocket/236ed5ba7e409b8bdf1ff6eca5dcdc39

fn moduloVec3(x: vec3<f32>, y: vec3<f32>) -> vec3<f32>
{
  return x - y * floor(x/y);
}
fn mod289Vec3(x: vec3<f32>) -> vec3<f32>
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn mod289Vec4(x: vec4<f32>) -> vec4<f32>
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn permute4(x: vec4<f32>) -> vec4<f32>
{
    return mod289Vec4(((x * 34.0) + 1.0) * x);
}
fn taylorInvSqrt(r: vec4<f32>) -> vec4<f32>
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
fn fade3(t: vec3<f32>) -> vec3<f32>
{
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
fn fade2(t: vec2<f32>) -> vec2<f32> { return t * t * t * (t * (t * 6. - 15.) + 10.); }

fn perlinNoise2(P: vec2<f32>) -> f32 {
  var Pi: vec4<f32> = floor(P.xyxy) + vec4<f32>(0., 0., 1., 1.);
  let Pf = fract(P.xyxy) - vec4<f32>(0., 0., 1., 1.);
  Pi = Pi % vec4<f32>(289.); // To avoid truncation effects in permutation
  let ix = Pi.xzxz;
  let iy = Pi.yyww;
  let fx = Pf.xzxz;
  let fy = Pf.yyww;
  let i = permute4(permute4(ix) + iy);
  var gx: vec4<f32> = 2. * fract(i * 0.0243902439) - 1.; // 1/41 = 0.024...
  let gy = abs(gx) - 0.5;
  let tx = floor(gx + 0.5);
  gx = gx - tx;
  var g00: vec2<f32> = vec2<f32>(gx.x, gy.x);
  var g10: vec2<f32> = vec2<f32>(gx.y, gy.y);
  var g01: vec2<f32> = vec2<f32>(gx.z, gy.z);
  var g11: vec2<f32> = vec2<f32>(gx.w, gy.w);
  let norm = 1.79284291400159 - 0.85373472095314 *
      vec4<f32>(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 = g00 * norm.x;
  g01 = g01 * norm.y;
  g10 = g10 * norm.z;
  g11 = g11 * norm.w;
  let n00 = dot(g00, vec2<f32>(fx.x, fy.x));
  let n10 = dot(g10, vec2<f32>(fx.y, fy.y));
  let n01 = dot(g01, vec2<f32>(fx.z, fy.z));
  let n11 = dot(g11, vec2<f32>(fx.w, fy.w));
  let fade_xy = fade2(Pf.xy);
  let n_x = mix(vec2<f32>(n00, n01), vec2<f32>(n10, n11), vec2<f32>(fade_xy.x));
  let n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// Classic Perlin noise, periodic variant
fn perlinNoise3(P: vec3<f32>, rep: vec3<f32>) -> f32
{
    var Pi0: vec3<f32> = moduloVec3(floor(P), rep); // Integer part, modulo period
    var Pi1: vec3<f32> = moduloVec3(Pi0 + vec3<f32>(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289Vec3(Pi0);
    Pi1 = mod289Vec3(Pi1);
    let Pf0: vec3<f32> = fract(P); // Fractional part for interpolation
    let Pf1: vec3<f32> = Pf0 - vec3<f32>(1.0); // Fractional part - 1.0
    let ix: vec4<f32> = vec4<f32>(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    let iy: vec4<f32> = vec4<f32>(Pi0.yy, Pi1.yy);
    let iz0: vec4<f32> = Pi0.zzzz;
    let iz1: vec4<f32> = Pi1.zzzz;
    let ixy: vec4<f32> = permute4(permute4(ix) + iy);
    let ixy0: vec4<f32> = permute4(ixy + iz0);
    let ixy1: vec4<f32> = permute4(ixy + iz1);
    var gx0: vec4<f32> = ixy0 * (1.0 / 7.0);
    var gy0: vec4<f32> = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    let gz0: vec4<f32> = vec4<f32>(0.5) - abs(gx0) - abs(gy0);
    let sz0: vec4<f32> = step(gz0, vec4<f32>(0.0));
    gx0 -= sz0 * (step(vec4<f32>(0.0), gx0) - 0.5);
    gy0 -= sz0 * (step(vec4<f32>(0.0), gy0) - 0.5);
    var gx1: vec4<f32> = ixy1 * (1.0 / 7.0);
    var gy1: vec4<f32> = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    let gz1: vec4<f32> = vec4<f32>(0.5) - abs(gx1) - abs(gy1);
    let sz1: vec4<f32> = step(gz1, vec4<f32>(0.0));
    gx1 -= sz1 * (step(vec4<f32>(0.0), gx1) - 0.5);
    gy1 -= sz1 * (step(vec4<f32>(0.0), gy1) - 0.5);
    var g000: vec3<f32> = vec3<f32>(gx0.x, gy0.x, gz0.x);
    var g100: vec3<f32> = vec3<f32>(gx0.y, gy0.y, gz0.y);
    var g010: vec3<f32> = vec3<f32>(gx0.z, gy0.z, gz0.z);
    var g110: vec3<f32> = vec3<f32>(gx0.w, gy0.w, gz0.w);
    var g001: vec3<f32> = vec3<f32>(gx1.x, gy1.x, gz1.x);
    var g101: vec3<f32> = vec3<f32>(gx1.y, gy1.y, gz1.y);
    var g011: vec3<f32> = vec3<f32>(gx1.z, gy1.z, gz1.z);
    var g111: vec3<f32> = vec3<f32>(gx1.w, gy1.w, gz1.w);
    let norm0: vec4<f32> = taylorInvSqrt(vec4<f32>(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    let norm1: vec4<f32> = taylorInvSqrt(vec4<f32>(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    let n000: f32 = dot(g000, Pf0);
    let n100: f32 = dot(g100, vec3<f32>(Pf1.x, Pf0.yz));
    let n010: f32 = dot(g010, vec3<f32>(Pf0.x, Pf1.y, Pf0.z));
    let n110: f32 = dot(g110, vec3<f32>(Pf1.xy, Pf0.z));
    let n001: f32 = dot(g001, vec3<f32>(Pf0.xy, Pf1.z));
    let n101: f32 = dot(g101, vec3<f32>(Pf1.x, Pf0.y, Pf1.z));
    let n011: f32 = dot(g011, vec3<f32>(Pf0.x, Pf1.yz));
    let n111: f32 = dot(g111, Pf1);
    let fade_xyz: vec3<f32> = fade3(Pf0);
    let n_z: vec4<f32> = mix(vec4<f32>(n000, n100, n010, n110), vec4<f32>(n001, n101, n011, n111), fade_xyz.z);
    let n_yz: vec2<f32> = mix(n_z.xy, n_z.zw, fade_xyz.y);
    let n_xyz: f32 = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}
fn turb(P: vec3<f32>, rep: vec3<f32>, lacunarity: f32, gain: f32) -> f32
{
    var sum: f32 = 0.0;
    var sc: f32 = 1.0;
    var totalgain: f32 = 1.0;
    for (var i = 0.0; i < 6.0; i += 1)
    {
        sum += totalgain * perlinNoise3(P * sc, rep);
        sc *= lacunarity;
        totalgain *= gain;
    }
    return abs(sum);
}`,T7=Object.defineProperty,j7=(t,e,o)=>e in t?T7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,vi=(t,e,o)=>(j7(t,typeof e!="symbol"?e+"":e,o),o);const I7=class hk extends ie{constructor(e){e={...hk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:A7.replace("${PERLIN}",P7),entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:Z7.replace("${PERLIN}",R7),name:"god-ray-filter"});super({gpuProgram:o,glProgram:n,resources:{godrayUniforms:{uLight:{value:new Float32Array(2),type:"vec2<f32>"},uParallel:{value:0,type:"f32"},uAspect:{value:0,type:"f32"},uTime:{value:e.time,type:"f32"},uRay:{value:new Float32Array(3),type:"vec3<f32>"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),vi(this,"uniforms"),vi(this,"time",0),vi(this,"_angleLight",[0,0]),vi(this,"_angle",0),vi(this,"_center"),this.uniforms=this.resources.godrayUniforms.uniforms,Object.assign(this,e)}apply(e,o,n,i){const r=o.frame.width,s=o.frame.height;this.uniforms.uLight[0]=this.parallel?this._angleLight[0]:this._center.x,this.uniforms.uLight[1]=this.parallel?this._angleLight[1]:this._center.y,this.uniforms.uDimensions[0]=r,this.uniforms.uDimensions[1]=s,this.uniforms.uAspect=s/r,this.uniforms.uTime=this.time,e.applyFilter(this,o,n,i)}get angle(){return this._angle}set angle(e){this._angle=e;const o=e*or;this._angleLight[0]=Math.cos(o),this._angleLight[1]=Math.sin(o)}get parallel(){return this.uniforms.uParallel>.5}set parallel(e){this.uniforms.uParallel=e?1:0}get center(){return this._center}set center(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._center=e}get centerX(){return this.center.x}set centerX(e){this.center.x=e}get centerY(){return this.center.y}set centerY(e){this.center.y=e}get gain(){return this.uniforms.uRay[0]}set gain(e){this.uniforms.uRay[0]=e}get lacunarity(){return this.uniforms.uRay[1]}set lacunarity(e){this.uniforms.uRay[1]=e}get alpha(){return this.uniforms.uRay[2]}set alpha(e){this.uniforms.uRay[2]=e}};vi(I7,"DEFAULT_OPTIONS",{angle:30,gain:.5,lacunarity:2.5,parallel:!0,time:0,center:{x:0,y:0},alpha:1});var F7=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uHsl;
uniform float uAlpha;
uniform float uColorize;

// https://en.wikipedia.org/wiki/Luma_(video)
const vec3 weight = vec3(0.299, 0.587, 0.114);

float getWeightedAverage(vec3 rgb) {
    return rgb.r * weight.r + rgb.g * weight.g + rgb.b * weight.b;
}

// https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786?permalink_comment_id=3195243#gistcomment-3195243
const vec3 k = vec3(0.57735, 0.57735, 0.57735);

vec3 hueShift(vec3 color, float angle) {
    float cosAngle = cos(angle);
    return vec3(
    color * cosAngle +
    cross(k, color) * sin(angle) +
    k * dot(k, color) * (1.0 - cosAngle)
    );
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    vec3 resultRGB = color.rgb;

    float hue = uHsl[0];
    float saturation = uHsl[1];
    float lightness = uHsl[2];

    // colorize
    if (uColorize > 0.5) {
        resultRGB = vec3(getWeightedAverage(resultRGB), 0., 0.);
    }

    // hue
    resultRGB = hueShift(resultRGB, hue);

    // saturation
    // https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/huesaturation.js
    float average = (resultRGB.r + resultRGB.g + resultRGB.b) / 3.0;

    if (saturation > 0.) {
        resultRGB += (average - resultRGB) * (1. - 1. / (1.001 - saturation));
    } else {
        resultRGB -= (average - resultRGB) * saturation;
    }

    // lightness
    resultRGB = mix(resultRGB, vec3(ceil(lightness)) * color.a, abs(lightness));

    // alpha
    finalColor = mix(color, vec4(resultRGB, color.a), uAlpha);
}
`,M7=`struct HslUniforms {
  uHsl:vec3<f32>,
  uColorize:f32,
  uAlpha:f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> hslUniforms : HslUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
    let color: vec4<f32> = textureSample(uTexture, uSampler, uv);
    var resultRGB: vec3<f32> = color.rgb;

    let hue: f32 = hslUniforms.uHsl[0];
    let saturation: f32 = hslUniforms.uHsl[1];
    let lightness: f32 = hslUniforms.uHsl[2];

    // colorize
    if (hslUniforms.uColorize > 0.5) {
        resultRGB = vec3<f32>(dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114)), 0., 0.);
    }

    // hue
    resultRGB = hueShift(resultRGB, hue);

    // saturation
    // https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/huesaturation.js
    let average: f32 = (resultRGB.r + resultRGB.g + resultRGB.b) / 3.0;

    if (saturation > 0.) {
        resultRGB += (average - resultRGB) * (1. - 1. / (1.001 - saturation));
    } else {
        resultRGB -= (average - resultRGB) * saturation;
    }

    // lightness
    resultRGB = mix(resultRGB, vec3<f32>(ceil(lightness)) * color.a, abs(lightness));

    // alpha
    return mix(color, vec4<f32>(resultRGB, color.a), hslUniforms.uAlpha);
}

// https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786?permalink_comment_id=3195243#gistcomment-3195243
const k: vec3<f32> = vec3(0.57735, 0.57735, 0.57735);

fn hueShift(color: vec3<f32>, angle: f32) -> vec3<f32> 
{
    let cosAngle: f32 = cos(angle);
    return vec3<f32>(
    color * cosAngle +
    cross(k, color) * sin(angle) +
    k * dot(k, color) * (1.0 - cosAngle)
    );
}`,O7=Object.defineProperty,D7=(t,e,o)=>e in t?O7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,fy=(t,e,o)=>(D7(t,typeof e!="symbol"?e+"":e,o),o);const B7=class gk extends ie{constructor(e){e={...gk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:M7,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:F7,name:"hsl-adjustment-filter"});super({gpuProgram:o,glProgram:n,resources:{hslUniforms:{uHsl:{value:new Float32Array(3),type:"vec3<f32>"},uColorize:{value:e.colorize?1:0,type:"f32"},uAlpha:{value:e.alpha,type:"f32"}}}}),fy(this,"uniforms"),fy(this,"_hue"),this.uniforms=this.resources.hslUniforms.uniforms,Object.assign(this,e)}get hue(){return this._hue}set hue(e){this._hue=e,this.uniforms.uHsl[0]=e*(Math.PI/180)}get saturation(){return this.uniforms.uHsl[1]}set saturation(e){this.uniforms.uHsl[1]=e}get lightness(){return this.uniforms.uHsl[2]}set lightness(e){this.uniforms.uHsl[2]=e}get colorize(){return this.uniforms.uColorize===1}set colorize(e){this.uniforms.uColorize=e?1:0}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}};fy(B7,"DEFAULT_OPTIONS",{hue:0,saturation:0,lightness:0,colorize:!1,alpha:1});var G7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uVelocity;
uniform int uKernelSize;
uniform float uOffset;

uniform vec4 uInputSize;

const int MAX_KERNEL_SIZE = 2048;

// Notice:
// the perfect way:
//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);
// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.
// So use uKernelSize directly.

void main(void)
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (uKernelSize == 0)
    {
        finalColor = color;
        return;
    }

    vec2 velocity = uVelocity / uInputSize.xy;
    float offset = -uOffset / length(uVelocity) - 0.5;
    int k = uKernelSize - 1;

    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {
        if (i == k) {
            break;
        }
        vec2 bias = velocity * (float(i) / float(k) + offset);
        color += texture(uTexture, vTextureCoord + bias);
    }
    finalColor = color / float(uKernelSize);
}
`,U7=`struct MotionBlurUniforms {
  uVelocity: vec2<f32>,
  uKernelSize: f32,
  uOffset: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> motionBlurUniforms : MotionBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uVelocity = motionBlurUniforms.uVelocity;
  let uKernelSize = motionBlurUniforms.uKernelSize;
  let uOffset = motionBlurUniforms.uOffset;

  let velocity: vec2<f32> = uVelocity / gfu.uInputSize.xy;
  let offset: f32 = -uOffset / length(uVelocity) - 0.5;
  let k: i32 = i32(min(uKernelSize - 1, MAX_KERNEL_SIZE - 1));

  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  for(var i: i32 = 0; i < k; i += 1) {
    let bias: vec2<f32> = velocity * (f32(i) / f32(k) + offset);
    color += textureSample(uTexture, uSampler, uv + bias);
  }
  
  return select(color / f32(uKernelSize), textureSample(uTexture, uSampler, uv), uKernelSize == 0);
}

const MAX_KERNEL_SIZE: f32 = 2048;`,N7=Object.defineProperty,L7=(t,e,o)=>e in t?N7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,hy=(t,e,o)=>(L7(t,typeof e!="symbol"?e+"":e,o),o);const $7=class mk extends ie{constructor(...e){let o=e[0]??{};if(Array.isArray(o)||"x"in o&&"y"in o||o instanceof st){$("6.0.0","MotionBlurFilter constructor params are now options object. See params: { velocity, kernelSize, offset }");const r="x"in o?o.x:o[0],s="y"in o?o.y:o[1];o={velocity:{x:r,y:s}},e[1]!==void 0&&(o.kernelSize=e[1]),e[2]!==void 0&&(o.offset=e[2])}o={...mk.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:U7,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:G7,name:"motion-blur-filter"});super({gpuProgram:n,glProgram:i,resources:{motionBlurUniforms:{uVelocity:{value:o.velocity,type:"vec2<f32>"},uKernelSize:{value:Math.trunc(o.kernelSize??5),type:"i32"},uOffset:{value:o.offset,type:"f32"}}}}),hy(this,"uniforms"),hy(this,"_kernelSize"),this.uniforms=this.resources.motionBlurUniforms.uniforms,Object.assign(this,o)}get velocity(){return this.uniforms.uVelocity}set velocity(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uVelocity=e,this._updateDirty()}get velocityX(){return this.velocity.x}set velocityX(e){this.velocity.x=e,this._updateDirty()}get velocityY(){return this.velocity.y}set velocityY(e){this.velocity.y=e,this._updateDirty()}get kernelSize(){return this._kernelSize}set kernelSize(e){this._kernelSize=e,this._updateDirty()}get offset(){return this.uniforms.uOffset}set offset(e){this.uniforms.uOffset=e}_updateDirty(){this.padding=(Math.max(Math.abs(this.velocityX),Math.abs(this.velocityY))>>0)+1,this.uniforms.uKernelSize=this.velocityX!==0||this.velocityY!==0?this._kernelSize:0}};hy($7,"DEFAULT_OPTIONS",{velocity:{x:0,y:0},kernelSize:5,offset:0});var W7=`in vec2 vTextureCoord;
out vec4 finalColor;

const int MAX_COLORS = \${MAX_COLORS};

uniform sampler2D uTexture;
uniform vec3 uOriginalColors[MAX_COLORS];
uniform vec3 uTargetColors[MAX_COLORS];
uniform float uTolerance;

void main(void)
{
    finalColor = texture(uTexture, vTextureCoord);

    float alpha = finalColor.a;
    if (alpha < 0.0001)
    {
      return;
    }

    vec3 color = finalColor.rgb / alpha;

    for(int i = 0; i < MAX_COLORS; i++)
    {
      vec3 origColor = uOriginalColors[i];
      if (origColor.r < 0.0)
      {
        break;
      }
      vec3 colorDiff = origColor - color;
      if (length(colorDiff) < uTolerance)
      {
        vec3 targetColor = uTargetColors[i];
        finalColor = vec4((targetColor + colorDiff) * alpha, alpha);
        return;
      }
    }
}
`,H7=`struct MultiColorReplaceUniforms {
  uOriginalColors: array<vec3<f32>, MAX_COLORS>,
  uTargetColors: array<vec3<f32>, MAX_COLORS>,
  uTolerance:f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> multiColorReplaceUniforms : MultiColorReplaceUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOriginalColors = multiColorReplaceUniforms.uOriginalColors;
  let uTargetColors = multiColorReplaceUniforms.uTargetColors;
  let uTolerance = multiColorReplaceUniforms.uTolerance;

  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  let alpha: f32 = color.a;

  if (alpha > 0.0001)
  {
    var modColor: vec3<f32> = vec3<f32>(color.rgb) / alpha;

    for(var i: i32 = 0; i < MAX_COLORS; i += 1)
    {
      let origColor: vec3<f32> = uOriginalColors[i];
      if (origColor.r < 0.0)
      {
        break;
      }
      let colorDiff: vec3<f32> = origColor - modColor;
      
      if (length(colorDiff) < uTolerance)
      {
        let targetColor: vec3<f32> = uTargetColors[i];
        color = vec4((targetColor + colorDiff) * alpha, alpha);
        return color;
      }
    }
  }

  return color;
}

const MAX_COLORS: i32 = \${MAX_COLORS};`,X7=Object.defineProperty,V7=(t,e,o)=>e in t?X7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Kl=(t,e,o)=>(V7(t,typeof e!="symbol"?e+"":e,o),o);const q7=class bk extends ie{constructor(...e){let o=e[0]??{};Array.isArray(o)&&($("6.0.0","MultiColorReplaceFilter constructor params are now options object. See params: { replacements, tolerance, maxColors }"),o={replacements:o},e[1]&&(o.tolerance=e[1]),e[2]&&(o.maxColors=e[2])),o={...bk.DEFAULT_OPTIONS,...o};const n=o.maxColors??o.replacements.length,i=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:H7.replace(/\$\{MAX_COLORS\}/g,n.toFixed(0)),entryPoint:"mainFragment"}}),r=oe.from({vertex:ae,fragment:W7.replace(/\$\{MAX_COLORS\}/g,n.toFixed(0)),name:"multi-color-replace-filter"});super({gpuProgram:i,glProgram:r,resources:{multiColorReplaceUniforms:{uOriginalColors:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uTargetColors:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uTolerance:{value:o.tolerance,type:"f32"}}}}),Kl(this,"uniforms"),Kl(this,"_replacements",[]),Kl(this,"_maxColors"),this._maxColors=n,this.uniforms=this.resources.multiColorReplaceUniforms.uniforms,this.replacements=o.replacements}set replacements(e){const o=this.uniforms.uOriginalColors,n=this.uniforms.uTargetColors,i=e.length,r=new Y;if(i>this._maxColors)throw new Error(`Length of replacements (${i}) exceeds the maximum colors length (${this._maxColors})`);o[i*3]=-1;let s,l,a;for(let c=0;c<i;c++){const u=e[c];r.setValue(u[0]),[s,l,a]=r.toArray(),o[c*3]=s,o[c*3+1]=l,o[c*3+2]=a,r.setValue(u[1]),[s,l,a]=r.toArray(),n[c*3]=s,n[c*3+1]=l,n[c*3+2]=a}this._replacements=e}get replacements(){return this._replacements}refresh(){this.replacements=this._replacements}get maxColors(){return this._maxColors}get tolerance(){return this.uniforms.uTolerance}set tolerance(e){this.uniforms.uTolerance=e}set epsilon(e){$("6.0.0","MultiColorReplaceFilter.epsilon is deprecated, please use MultiColorReplaceFilter.tolerance instead"),this.tolerance=e}get epsilon(){return $("6.0.0","MultiColorReplaceFilter.epsilon is deprecated, please use MultiColorReplaceFilter.tolerance instead"),this.tolerance}};Kl(q7,"DEFAULT_OPTIONS",{replacements:[[16711680,255]],tolerance:.05,maxColors:void 0});var Y7=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uSepia;
uniform vec2 uNoise;
uniform vec3 uScratch;
uniform vec3 uVignetting;
uniform float uSeed;
uniform vec2 uDimensions;

uniform vec4 uInputSize;

const float SQRT_2 = 1.414213;
const vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 Overlay(vec3 src, vec3 dst)
{
    // if (dst <= 0.5) then: 2 * src * dst
    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)
    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),
                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),
                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));
}


void main()
{
    finalColor = texture(uTexture, vTextureCoord);
    vec3 color = finalColor.rgb;

    if (uSepia > 0.0)
    {
        float gray = (color.x + color.y + color.z) / 3.0;
        vec3 grayscale = vec3(gray);

        color = Overlay(SEPIA_RGB, grayscale);

        color = grayscale + uSepia * (color - grayscale);
    }

    vec2 coord = vTextureCoord * uInputSize.xy / uDimensions.xy;

    float vignette = uVignetting[0];
    float vignetteAlpha = uVignetting[1];
    float vignetteBlur = uVignetting[2];

    if (vignette > 0.0)
    {
        float outter = SQRT_2 - vignette * SQRT_2;
        vec2 dir = vec2(vec2(0.5, 0.5) - coord);
        dir.y *= uDimensions.y / uDimensions.x;
        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignetteBlur * SQRT_2), 0.0, 1.0);
        color.rgb *= darker + (1.0 - darker) * (1.0 - vignetteAlpha);
    }

    float scratch = uScratch[0];
    float scratchDensity = uScratch[1];
    float scratchWidth = uScratch[2];

    if (scratchDensity > uSeed && scratch != 0.0)
    {
        float phase = uSeed * 256.0;
        float s = mod(floor(phase), 2.0);
        float dist = 1.0 / scratchDensity;
        float d = distance(coord, vec2(uSeed * dist, abs(s - uSeed * dist)));
        if (d < uSeed * 0.6 + 0.4)
        {
            highp float period = scratchDensity * 10.0;

            float xx = coord.x * period + phase;
            float aa = abs(mod(xx, 0.5) * 4.0);
            float bb = mod(floor(xx / 0.5), 2.0);
            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);

            float kk = 2.0 * period;
            float dw = scratchWidth / uDimensions.x * (0.75 + uSeed);
            float dh = dw * kk;

            float tine = (yy - (2.0 - dh));

            if (tine > 0.0) {
                float _sign = sign(scratch);

                tine = s * tine / period + scratch + 0.1;
                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);

                color.rgb *= tine;
            }
        }
    }

    float noise = uNoise[0];
    float noiseSize = uNoise[1];

    if (noise > 0.0 && noiseSize > 0.0)
    {
        vec2 pixelCoord = vTextureCoord.xy * uInputSize.xy;
        pixelCoord.x = floor(pixelCoord.x / noiseSize);
        pixelCoord.y = floor(pixelCoord.y / noiseSize);
        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + uSeed * 512.0, 1024.0 - uSeed * 512.0);
        // float _noise = snoise(d) * 0.5;
        float _noise = rand(pixelCoord * noiseSize * uSeed) - 0.5;
        color += _noise * noise;
    }

    finalColor.rgb = color;
}`,Q7=`struct OldFilmUniforms {
    uSepia: f32,
    uNoise: vec2<f32>,
    uScratch: vec3<f32>,
    uVignetting: vec3<f32>,
    uSeed: f32,
    uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> oldFilmUniforms : OldFilmUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  if (oldFilmUniforms.uSepia > 0.)
  {
    color = vec4<f32>(sepia(color.rgb), color.a);
  }

  let coord: vec2<f32> = uv * gfu.uInputSize.xy / oldFilmUniforms.uDimensions;

  if (oldFilmUniforms.uVignetting[0] > 0.)
  {
    color *= vec4<f32>(vec3<f32>(vignette(color.rgb, coord)), color.a);
  }

  let uScratch = oldFilmUniforms.uScratch; 

  if (uScratch[1] > oldFilmUniforms.uSeed && uScratch[0] != 0.)
  {
    color = vec4<f32>(scratch(color.rgb, coord), color.a);
  }

  let uNoise = oldFilmUniforms.uNoise;

  if (uNoise[0] > 0.0 && uNoise[1] > 0.0)
  {
    color += vec4<f32>(vec3<f32>(noise(uv)), color.a);
  }

  return color;
}

const SQRT_2: f32 = 1.414213;
const SEPIA_RGB: vec3<f32> = vec3<f32>(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

fn rand(co: vec2<f32>) -> f32
{
  return fract(sin(dot(co, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn overlay(src: vec3<f32>, dst: vec3<f32>) -> vec3<f32>
{
    // if (dst <= 0.5) then: 2 * src * dst
    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)

    return vec3<f32>(
      select((1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)), (2.0 * src.x * dst.x), (dst.x <= 0.5)), 
      select((1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)), (2.0 * src.y * dst.y), (dst.y <= 0.5)),
      select((1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)), (2.0 * src.z * dst.z), (dst.z <= 0.5))
    );
}

fn sepia(co: vec3<f32>) -> vec3<f32>
{
  let gray: f32 = (co.x + co.y + co.z) / 3.0;
  let grayscale: vec3<f32> = vec3<f32>(gray);
  let color = overlay(SEPIA_RGB, grayscale);
  return grayscale + oldFilmUniforms.uSepia * (color - grayscale);
}

fn vignette(co: vec3<f32>, coord: vec2<f32>) -> f32
{
  let uVignetting = oldFilmUniforms.uVignetting;
  let uDimensions = oldFilmUniforms.uDimensions;
  
  let outter: f32 = SQRT_2 - uVignetting[0] * SQRT_2;
  var dir: vec2<f32> = vec2<f32>(vec2<f32>(0.5) - coord);
  dir.y *= uDimensions.y / uDimensions.x;
  let darker: f32 = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + uVignetting[2] * SQRT_2), 0.0, 1.0);
  return darker + (1.0 - darker) * (1.0 - uVignetting[1]);
}

fn scratch(co: vec3<f32>, coord: vec2<f32>) -> vec3<f32>
{
  var color = co;
  let uScratch = oldFilmUniforms.uScratch;
  let uSeed = oldFilmUniforms.uSeed;
  let uDimensions = oldFilmUniforms.uDimensions;

  let phase: f32 = uSeed * 256.0;
  let s: f32 = modulo(floor(phase), 2.0);
  let dist: f32 = 1.0 / uScratch[1];
  let d: f32 = distance(coord, vec2<f32>(uSeed * dist, abs(s - uSeed * dist)));

  if (d < uSeed * 0.6 + 0.4)
  {
    let period: f32 = uScratch[1] * 10.0;

    let xx: f32 = coord.x * period + phase;
    let aa: f32 = abs(modulo(xx, 0.5) * 4.0);
    let bb: f32 = modulo(floor(xx / 0.5), 2.0);
    let yy: f32 = (1.0 - bb) * aa + bb * (2.0 - aa);

    let kk: f32 = 2.0 * period;
    let dw: f32 = uScratch[2] / uDimensions.x * (0.75 + uSeed);
    let dh: f32 = dw * kk;

    var tine: f32 = (yy - (2.0 - dh));

    if (tine > 0.0) {
        let _sign: f32 = sign(uScratch[0]);

        tine = s * tine / period + uScratch[0] + 0.1;
        tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);

        color *= tine;
    }
  }

  return color;
}

fn noise(coord: vec2<f32>) -> f32
{
  let uNoise = oldFilmUniforms.uNoise;
  let uSeed = oldFilmUniforms.uSeed;

  var pixelCoord: vec2<f32> = coord * gfu.uInputSize.xy;
  pixelCoord.x = floor(pixelCoord.x / uNoise[1]);
  pixelCoord.y = floor(pixelCoord.y / uNoise[1]);
  return (rand(pixelCoord * uNoise[1] * uSeed) - 0.5) * uNoise[0];
}`,K7=Object.defineProperty,J7=(t,e,o)=>e in t?K7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,gy=(t,e,o)=>(J7(t,typeof e!="symbol"?e+"":e,o),o);const eZ=class xk extends ie{constructor(e){e={...xk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:Q7,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:Y7,name:"old-film-filter"});super({gpuProgram:o,glProgram:n,resources:{oldFilmUniforms:{uSepia:{value:e.sepia,type:"f32"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uScratch:{value:new Float32Array(3),type:"vec3<f32>"},uVignetting:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),gy(this,"uniforms"),gy(this,"seed"),this.uniforms=this.resources.oldFilmUniforms.uniforms,Object.assign(this,e)}apply(e,o,n,i){this.uniforms.uDimensions[0]=o.frame.width,this.uniforms.uDimensions[1]=o.frame.height,this.uniforms.uSeed=this.seed,e.applyFilter(this,o,n,i)}get sepia(){return this.uniforms.uSepia}set sepia(e){this.uniforms.uSepia=e}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get scratch(){return this.uniforms.uScratch[0]}set scratch(e){this.uniforms.uScratch[0]=e}get scratchDensity(){return this.uniforms.uScratch[1]}set scratchDensity(e){this.uniforms.uScratch[1]=e}get scratchWidth(){return this.uniforms.uScratch[2]}set scratchWidth(e){this.uniforms.uScratch[2]=e}get vignetting(){return this.uniforms.uVignetting[0]}set vignetting(e){this.uniforms.uVignetting[0]=e}get vignettingAlpha(){return this.uniforms.uVignetting[1]}set vignettingAlpha(e){this.uniforms.uVignetting[1]=e}get vignettingBlur(){return this.uniforms.uVignetting[2]}set vignettingBlur(e){this.uniforms.uVignetting[2]=e}};gy(eZ,"DEFAULT_OPTIONS",{sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,seed:0});var tZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uThickness;
uniform vec3 uColor;
uniform float uAlpha;
uniform float uKnockout;

uniform vec4 uInputClamp;

const float DOUBLE_PI = 2. * 3.14159265358979323846264;
const float ANGLE_STEP = \${ANGLE_STEP};

float outlineMaxAlphaAtPos(vec2 pos) {
    if (uThickness.x == 0. || uThickness.y == 0.) {
        return 0.;
    }

    vec4 displacedColor;
    vec2 displacedPos;
    float maxAlpha = 0.;

    for (float angle = 0.; angle <= DOUBLE_PI; angle += ANGLE_STEP) {
        displacedPos.x = vTextureCoord.x + uThickness.x * cos(angle);
        displacedPos.y = vTextureCoord.y + uThickness.y * sin(angle);
        displacedColor = texture(uTexture, clamp(displacedPos, uInputClamp.xy, uInputClamp.zw));
        maxAlpha = max(maxAlpha, displacedColor.a);
    }

    return maxAlpha;
}

void main(void) {
    vec4 sourceColor = texture(uTexture, vTextureCoord);
    vec4 contentColor = sourceColor * float(uKnockout < 0.5);
    float outlineAlpha = uAlpha * outlineMaxAlphaAtPos(vTextureCoord.xy) * (1.-sourceColor.a);
    vec4 outlineColor = vec4(vec3(uColor) * outlineAlpha, outlineAlpha);
    finalColor = contentColor + outlineColor;
}
`,oZ=`struct OutlineUniforms {
  uThickness:vec2<f32>,
  uColor:vec3<f32>,
  uAlpha:f32,
  uAngleStep:f32,
  uKnockout:f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> outlineUniforms : OutlineUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let sourceColor: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let contentColor: vec4<f32> = sourceColor * (1. - outlineUniforms.uKnockout);
  
  let outlineAlpha: f32 = outlineUniforms.uAlpha * outlineMaxAlphaAtPos(uv) * (1. - sourceColor.a);
  let outlineColor: vec4<f32> = vec4<f32>(vec3<f32>(outlineUniforms.uColor) * outlineAlpha, outlineAlpha);
  
  return contentColor + outlineColor;
}

fn outlineMaxAlphaAtPos(uv: vec2<f32>) -> f32 {
  let thickness = outlineUniforms.uThickness;

  if (thickness.x == 0. || thickness.y == 0.) {
    return 0.;
  }
  
  let angleStep = outlineUniforms.uAngleStep;

  var displacedColor: vec4<f32>;
  var displacedPos: vec2<f32>;

  var maxAlpha: f32 = 0.;
  var displaced: vec2<f32>;
  var curColor: vec4<f32>;

  for (var angle = 0.; angle <= DOUBLE_PI; angle += angleStep)
  {
    displaced.x = uv.x + thickness.x * cos(angle);
    displaced.y = uv.y + thickness.y * sin(angle);
    curColor = textureSample(uTexture, uSampler, clamp(displaced, gfu.uInputClamp.xy, gfu.uInputClamp.zw));
    maxAlpha = max(maxAlpha, curColor.a);
  }

  return maxAlpha;
}

const DOUBLE_PI: f32 = 3.14159265358979323846264 * 2.;`,nZ=Object.defineProperty,iZ=(t,e,o)=>e in t?nZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Dn=(t,e,o)=>(iZ(t,typeof e!="symbol"?e+"":e,o),o);const tf=class An extends ie{constructor(...e){let o=e[0]??{};typeof o=="number"&&($("6.0.0","OutlineFilter constructor params are now options object. See params: { thickness, color, quality, alpha, knockout }"),o={thickness:o},e[1]!==void 0&&(o.color=e[1]),e[2]!==void 0&&(o.quality=e[2]),e[3]!==void 0&&(o.alpha=e[3]),e[4]!==void 0&&(o.knockout=e[4])),o={...An.DEFAULT_OPTIONS,...o};const n=o.quality??.1,i=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:oZ,entryPoint:"mainFragment"}}),r=oe.from({vertex:ae,fragment:tZ.replace(/\$\{ANGLE_STEP\}/,An.getAngleStep(n).toFixed(7)),name:"outline-filter"});super({gpuProgram:i,glProgram:r,resources:{outlineUniforms:{uThickness:{value:new Float32Array(2),type:"vec2<f32>"},uColor:{value:new Float32Array(3),type:"vec3<f32>"},uAlpha:{value:o.alpha,type:"f32"},uAngleStep:{value:0,type:"f32"},uKnockout:{value:o.knockout?1:0,type:"f32"}}}}),Dn(this,"uniforms"),Dn(this,"_thickness"),Dn(this,"_quality"),Dn(this,"_color"),this.uniforms=this.resources.outlineUniforms.uniforms,this.uniforms.uAngleStep=An.getAngleStep(n),this._color=new Y,this.color=o.color??0,Object.assign(this,o)}apply(e,o,n,i){this.uniforms.uThickness[0]=this.thickness/o.source.width,this.uniforms.uThickness[1]=this.thickness/o.source.height,e.applyFilter(this,o,n,i)}static getAngleStep(e){return parseFloat((Math.PI*2/Math.max(e*An.MAX_SAMPLES,An.MIN_SAMPLES)).toFixed(7))}get thickness(){return this._thickness}set thickness(e){this._thickness=this.padding=e}get color(){return this._color.value}set color(e){this._color.setValue(e);const[o,n,i]=this._color.toArray();this.uniforms.uColor[0]=o,this.uniforms.uColor[1]=n,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}get quality(){return this._quality}set quality(e){this._quality=e,this.uniforms.uAngleStep=An.getAngleStep(e)}get knockout(){return this.uniforms.uKnockout===1}set knockout(e){this.uniforms.uKnockout=e?1:0}};Dn(tf,"DEFAULT_OPTIONS",{thickness:1,color:0,alpha:1,quality:.1,knockout:!1});Dn(tf,"MIN_SAMPLES",1);Dn(tf,"MAX_SAMPLES",100);var rZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uRadian;
uniform vec2 uCenter;
uniform float uRadius;
uniform int uKernelSize;

uniform vec4 uInputSize;

const int MAX_KERNEL_SIZE = 2048;

void main(void)
{
    vec4 color = texture(uTexture, vTextureCoord);

    if (uKernelSize == 0)
    {
        finalColor = color;
        return;
    }

    float aspect = uInputSize.y / uInputSize.x;
    vec2 center = uCenter.xy / uInputSize.xy;
    float gradient = uRadius / uInputSize.x * 0.3;
    float radius = uRadius / uInputSize.x - gradient * 0.5;
    int k = uKernelSize - 1;

    vec2 coord = vTextureCoord;
    vec2 dir = vec2(center - coord);
    float dist = length(vec2(dir.x, dir.y * aspect));

    float radianStep = uRadian;
    if (radius >= 0.0 && dist > radius) {
        float delta = dist - radius;
        float gap = gradient;
        float scale = 1.0 - abs(delta / gap);
        if (scale <= 0.0) {
            finalColor = color;
            return;
        }
        radianStep *= scale;
    }
    radianStep /= float(k);

    float s = sin(radianStep);
    float c = cos(radianStep);
    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));

    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {
        if (i == k) {
            break;
        }

        coord -= center;
        coord.y *= aspect;
        coord = rotationMatrix * coord;
        coord.y /= aspect;
        coord += center;

        vec4 sample = texture(uTexture, coord);

        // switch to pre-multiplied alpha to correctly blur transparent images
        // sample.rgb *= sample.a;

        color += sample;
    }

    finalColor = color / float(uKernelSize);
}
`,sZ=`struct RadialBlurUniforms {
  uRadian: f32,
  uCenter: vec2<f32>,
  uKernelSize: f32,
  uRadius: f32,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> radialBlurUniforms : RadialBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uRadian = radialBlurUniforms.uRadian;
  let uCenter = radialBlurUniforms.uCenter;
  let uKernelSize = radialBlurUniforms.uKernelSize;
  let uRadius = radialBlurUniforms.uRadius;
  
  var returnColorOnly = false;

  if (uKernelSize == 0)
  {
    returnColorOnly = true;
  }

  let aspect: f32 = gfu.uInputSize.y / gfu.uInputSize.x;
  let center: vec2<f32> = uCenter.xy / gfu.uInputSize.xy;
  let gradient: f32 = uRadius / gfu.uInputSize.x * 0.3;
  let radius: f32 = uRadius / gfu.uInputSize.x - gradient * 0.5;
  let k: i32 = i32(uKernelSize - 1);

  var coord: vec2<f32> = uv;
  let dir: vec2<f32> = vec2<f32>(center - coord);
  let dist: f32 = length(vec2<f32>(dir.x, dir.y * aspect));

  var radianStep: f32 = uRadian;
  
  if (radius >= 0.0 && dist > radius)
  {
    let delta: f32 = dist - radius;
    let gap: f32 = gradient;
    let scale: f32 = 1.0 - abs(delta / gap);
    if (scale <= 0.0) {
      returnColorOnly = true;
    }
    radianStep *= scale;
  }

  radianStep /= f32(k);

  let s: f32 = sin(radianStep);
  let c: f32 = cos(radianStep);
  let rotationMatrix: mat2x2<f32> = mat2x2<f32>(vec2<f32>(c, -s), vec2<f32>(s, c));
  
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let baseColor = vec4<f32>(color);

  let minK: i32 = min(i32(uKernelSize) - 1, MAX_KERNEL_SIZE - 1);

  for(var i: i32 = 0; i < minK; i += 1) 
  {
    coord -= center;
    coord.y *= aspect;
    coord = rotationMatrix * coord;
    coord.y /= aspect;
    coord += center;
    let sample: vec4<f32> = textureSample(uTexture, uSampler, coord);
    // switch to pre-multiplied alpha to correctly blur transparent images
    // sample.rgb *= sample.a;
    color += sample;
  }

  return select(color / f32(uKernelSize), baseColor, returnColorOnly);
}

const MAX_KERNEL_SIZE: i32 = 2048;`,lZ=Object.defineProperty,aZ=(t,e,o)=>e in t?lZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Jl=(t,e,o)=>(aZ(t,typeof e!="symbol"?e+"":e,o),o);const cZ=class kk extends ie{constructor(...e){let o=e[0]??{};if(typeof o=="number"){if($("6.0.0","RadialBlurFilter constructor params are now options object. See params: { angle, center, kernelSize, radius }"),o={angle:o},e[1]){const r="x"in e[1]?e[1].x:e[1][0],s="y"in e[1]?e[1].y:e[1][1];o.center={x:r,y:s}}e[2]&&(o.kernelSize=e[2]),e[3]&&(o.radius=e[3])}o={...kk.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:sZ,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:rZ,name:"radial-blur-filter"});super({gpuProgram:n,glProgram:i,resources:{radialBlurUniforms:{uRadian:{value:0,type:"f32"},uCenter:{value:o.center,type:"vec2<f32>"},uKernelSize:{value:o.kernelSize,type:"i32"},uRadius:{value:o.radius,type:"f32"}}}}),Jl(this,"uniforms"),Jl(this,"_angle"),Jl(this,"_kernelSize"),this.uniforms=this.resources.radialBlurUniforms.uniforms,Object.assign(this,o)}_updateKernelSize(){this.uniforms.uKernelSize=this._angle!==0?this.kernelSize:0}get angle(){return this._angle}set angle(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180,this._updateKernelSize()}get center(){return this.uniforms.uCenter}set center(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uCenter=e}get centerX(){return this.center.x}set centerX(e){this.center.x=e}get centerY(){return this.center.y}set centerY(e){this.center.y=e}get kernelSize(){return this._kernelSize}set kernelSize(e){this._kernelSize=e,this._updateKernelSize()}get radius(){return this.uniforms.uRadius}set radius(e){this.uniforms.uRadius=e<0||e===1/0?-1:e}};Jl(cZ,"DEFAULT_OPTIONS",{angle:0,center:{x:0,y:0},kernelSize:5,radius:-1});var uZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uMirror;
uniform float uBoundary;
uniform vec2 uAmplitude;
uniform vec2 uWavelength;
uniform vec2 uAlpha;
uniform float uTime;
uniform vec2 uDimensions;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(void)
{
    vec2 pixelCoord = vTextureCoord.xy * uInputSize.xy;
    vec2 coord = pixelCoord / uDimensions;

    if (coord.y < uBoundary) {
        finalColor = texture(uTexture, vTextureCoord);
        return;
    }

    float k = (coord.y - uBoundary) / (1. - uBoundary + 0.0001);
    float areaY = uBoundary * uDimensions.y / uInputSize.y;
    float v = areaY + areaY - vTextureCoord.y;
    float y = uMirror > 0.5 ? v : vTextureCoord.y;

    float _amplitude = ((uAmplitude.y - uAmplitude.x) * k + uAmplitude.x ) / uInputSize.x;
    float _waveLength = ((uWavelength.y - uWavelength.x) * k + uWavelength.x) / uInputSize.y;
    float _alpha = (uAlpha.y - uAlpha.x) * k + uAlpha.x;

    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - uTime) * _amplitude;
    x = clamp(x, uInputClamp.x, uInputClamp.z);

    vec4 color = texture(uTexture, vec2(x, y));

    finalColor = color * _alpha;
}
`,pZ=`struct ReflectionUniforms {
  uMirror: f32,
  uBoundary: f32,
  uAmplitude: vec2<f32>,
  uWavelength: vec2<f32>,
  uAlpha: vec2<f32>,
  uTime: f32,
  uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> reflectionUniforms : ReflectionUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uDimensions: vec2<f32> = reflectionUniforms.uDimensions;
  let uBoundary: f32 = reflectionUniforms.uBoundary;
  let uMirror: bool = reflectionUniforms.uMirror > 0.5;
  let uAmplitude: vec2<f32> = reflectionUniforms.uAmplitude;
  let uWavelength: vec2<f32> = reflectionUniforms.uWavelength;
  let uAlpha: vec2<f32> = reflectionUniforms.uAlpha;
  let uTime: f32 = reflectionUniforms.uTime;

  let pixelCoord: vec2<f32> = uv * gfu.uInputSize.xy;
  let coord: vec2<f32> = pixelCoord /uDimensions;
  var returnColorOnly: bool = false;

  if (coord.y < uBoundary) {
    returnColorOnly = true;
  }

  let k: f32 = (coord.y - uBoundary) / (1. - uBoundary + 0.0001);
  let areaY: f32 = uBoundary * uDimensions.y / gfu.uInputSize.y;
  let v: f32 = areaY + areaY - uv.y;
  let y: f32 = select(uv.y, v, uMirror);

  let amplitude: f32 = ((uAmplitude.y - uAmplitude.x) * k + uAmplitude.x ) / gfu.uInputSize.x;
  let waveLength: f32 = ((uWavelength.y - uWavelength.x) * k + uWavelength.x) / gfu.uInputSize.y;
  let alpha: f32 = select((uAlpha.y - uAlpha.x) * k + uAlpha.x, 1., returnColorOnly);

  var x: f32 = uv.x + cos(v * 6.28 / waveLength - uTime) * amplitude;
  x = clamp(x, gfu.uInputClamp.x, gfu.uInputClamp.z);
  
  return textureSample(uTexture, uSampler, select(vec2<f32>(x, y), uv, returnColorOnly)) * alpha;
}

fn rand(co: vec2<f32>) -> f32 
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}`,yZ=Object.defineProperty,dZ=(t,e,o)=>e in t?yZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,my=(t,e,o)=>(dZ(t,typeof e!="symbol"?e+"":e,o),o);const fZ=class wk extends ie{constructor(e){e={...wk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:pZ,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:uZ,name:"reflection-filter"});super({gpuProgram:o,glProgram:n,resources:{reflectionUniforms:{uMirror:{value:e.mirror?1:0,type:"f32"},uBoundary:{value:e.boundary,type:"f32"},uAmplitude:{value:e.amplitude,type:"vec2<f32>"},uWavelength:{value:e.waveLength,type:"vec2<f32>"},uAlpha:{value:e.alpha,type:"vec2<f32>"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),my(this,"uniforms"),my(this,"time",0),this.uniforms=this.resources.reflectionUniforms.uniforms,Object.assign(this,e)}apply(e,o,n,i){this.uniforms.uDimensions[0]=o.frame.width,this.uniforms.uDimensions[1]=o.frame.height,this.uniforms.uTime=this.time,e.applyFilter(this,o,n,i)}get mirror(){return this.uniforms.uMirror>.5}set mirror(e){this.uniforms.uMirror=e?1:0}get boundary(){return this.uniforms.uBoundary}set boundary(e){this.uniforms.uBoundary=e}get amplitude(){return Array.from(this.uniforms.uAmplitude)}set amplitude(e){this.uniforms.uAmplitude[0]=e[0],this.uniforms.uAmplitude[1]=e[1]}get amplitudeStart(){return this.uniforms.uAmplitude[0]}set amplitudeStart(e){this.uniforms.uAmplitude[0]=e}get amplitudeEnd(){return this.uniforms.uAmplitude[1]}set amplitudeEnd(e){this.uniforms.uAmplitude[1]=e}get waveLength(){return Array.from(this.uniforms.uWavelength)}set waveLength(e){this.uniforms.uWavelength[0]=e[0],this.uniforms.uWavelength[1]=e[1]}get wavelengthStart(){return this.uniforms.uWavelength[0]}set wavelengthStart(e){this.uniforms.uWavelength[0]=e}get wavelengthEnd(){return this.uniforms.uWavelength[1]}set wavelengthEnd(e){this.uniforms.uWavelength[1]=e}get alpha(){return Array.from(this.uniforms.uAlpha)}set alpha(e){this.uniforms.uAlpha[0]=e[0],this.uniforms.uAlpha[1]=e[1]}get alphaStart(){return this.uniforms.uAlpha[0]}set alphaStart(e){this.uniforms.uAlpha[0]=e}get alphaEnd(){return this.uniforms.uAlpha[1]}set alphaEnd(e){this.uniforms.uAlpha[1]=e}};my(fZ,"DEFAULT_OPTIONS",{mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0});var hZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec4 uInputSize;
uniform vec2 uRed;
uniform vec2 uGreen;
uniform vec2 uBlue;

void main(void)
{
   float r = texture(uTexture, vTextureCoord + uRed/uInputSize.xy).r;
   float g = texture(uTexture, vTextureCoord + uGreen/uInputSize.xy).g;
   float b = texture(uTexture, vTextureCoord + uBlue/uInputSize.xy).b;
   float a = texture(uTexture, vTextureCoord).a;
   finalColor = vec4(r, g, b, a);
}
`,gZ=`struct RgbSplitUniforms {
    uRed: vec2<f32>,
    uGreen: vec2<f32>,
    uBlue: vec3<f32>,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> rgbSplitUniforms : RgbSplitUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
    let r = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uRed.x / gfu.uInputSize.x, rgbSplitUniforms.uRed.y / gfu.uInputSize.y)).r;
    let g = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uGreen.x / gfu.uInputSize.x, rgbSplitUniforms.uGreen.y / gfu.uInputSize.y)).g;
    let b = textureSample(uTexture, uSampler, uv + vec2<f32>(rgbSplitUniforms.uBlue.x / gfu.uInputSize.x, rgbSplitUniforms.uBlue.y / gfu.uInputSize.y)).b;
    let a = textureSample(uTexture, uSampler, uv).a;
    return vec4<f32>(r, g, b, a);
}
`,mZ=Object.defineProperty,bZ=(t,e,o)=>e in t?mZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,vk=(t,e,o)=>(bZ(t,typeof e!="symbol"?e+"":e,o),o);const xZ=class zk extends ie{constructor(...e){let o=e[0]??{};(Array.isArray(o)||"x"in o&&"y"in o)&&($("6.0.0","RGBSplitFilter constructor params are now options object. See params: { red, green, blue }"),o={red:o},e[1]!==void 0&&(o.green=e[1]),e[2]!==void 0&&(o.blue=e[2])),o={...zk.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:gZ,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:hZ,name:"rgb-split-filter"});super({gpuProgram:n,glProgram:i,resources:{rgbSplitUniforms:{uRed:{value:o.red,type:"vec2<f32>"},uGreen:{value:o.green,type:"vec2<f32>"},uBlue:{value:o.blue,type:"vec2<f32>"}}}}),vk(this,"uniforms"),this.uniforms=this.resources.rgbSplitUniforms.uniforms,Object.assign(this,o)}get red(){return this.uniforms.uRed}set red(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uRed=e}get redX(){return this.red.x}set redX(e){this.red.x=e}get redY(){return this.red.y}set redY(e){this.red.y=e}get green(){return this.uniforms.uGreen}set green(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uGreen=e}get greenX(){return this.green.x}set greenX(e){this.green.x=e}get greenY(){return this.green.y}set greenY(e){this.green.y=e}get blue(){return this.uniforms.uBlue}set blue(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uBlue=e}get blueX(){return this.blue.x}set blueX(e){this.blue.x=e}get blueY(){return this.blue.y}set blueY(e){this.blue.y=e}};vk(xZ,"DEFAULT_OPTIONS",{red:{x:-10,y:0},green:{x:0,y:10},blue:{x:0,y:0}});var kZ=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform vec4 uWave;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159;

void main()
{
    float uAmplitude = uWave[0];
    float uWavelength = uWave[1];
    float uBrightness = uWave[2];
    float uRadius = uWave[3];

    float halfWavelength = uWavelength * 0.5 / uInputSize.x;
    float maxRadius = uRadius / uInputSize.x;
    float currentRadius = uTime * uSpeed / uInputSize.x;

    float fade = 1.0;

    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            finalColor = texture(uTexture, vTextureCoord);
            return;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }

    vec2 dir = vec2(vTextureCoord - uCenter / uInputSize.xy);
    dir.y *= uInputSize.y / uInputSize.x;
    float dist = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        finalColor = texture(uTexture, vTextureCoord);
        return;
    }

    vec2 diffUV = normalize(dir);

    float diff = (dist - currentRadius) / halfWavelength;

    float p = 1.0 - pow(abs(diff), 2.0);

    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );
    float powDiff = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );

    vec2 offset = diffUV * powDiff / uInputSize.xy;

    // Do clamp :
    vec2 coord = vTextureCoord + offset;
    vec2 clampedCoord = clamp(coord, uInputClamp.xy, uInputClamp.zw);
    vec4 color = texture(uTexture, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    // No clamp :
    // finalColor = texture(uTexture, vTextureCoord + offset);

    color.rgb *= 1.0 + (uBrightness - 1.0) * p * fade;

    finalColor = color;
}
`,wZ=`
struct ShockWaveUniforms {
    uTime: f32,
    uOffset: vec2<f32>,
    uSpeed: f32,
    uWave: vec4<f32>,
};

struct GlobalFilterUniforms {
    uInputSize:vec4<f32>,
    uInputPixel:vec4<f32>,
    uInputClamp:vec4<f32>,
    uOutputFrame:vec4<f32>,
    uGlobalFrame:vec4<f32>,
    uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> shockwaveUniforms : ShockWaveUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {

    let uTime = shockwaveUniforms.uTime;
    let uOffset = shockwaveUniforms.uOffset;
    let uSpeed = shockwaveUniforms.uSpeed;
    let uAmplitude = shockwaveUniforms.uWave[0];
    let uWavelength = shockwaveUniforms.uWave[1];
    let uBrightness = shockwaveUniforms.uWave[2];
    let uRadius = shockwaveUniforms.uWave[3];
    let halfWavelength: f32 = uWavelength * 0.5 / gfu.uInputSize.x;
    let maxRadius: f32 = uRadius / gfu.uInputSize.x;
    let currentRadius: f32 = uTime * uSpeed / gfu.uInputSize.x;
    var fade: f32 = 1.0;
    var returnColorOnly: bool = false;
    
    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            returnColorOnly = true;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }
    var dir: vec2<f32> = vec2<f32>(uv - uOffset / gfu.uInputSize.xy);
    dir.y *= gfu.uInputSize.y / gfu.uInputSize.x;

    let dist:f32 = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        returnColorOnly = true;
    }

    let diffUV: vec2<f32> = normalize(dir);
    let diff: f32 = (dist - currentRadius) / halfWavelength;
    let p: f32 = 1.0 - pow(abs(diff), 2.0);
    let powDiff: f32 = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );
    let offset: vec2<f32> = diffUV * powDiff / gfu.uInputSize.xy;
    // Do clamp :
    let coord: vec2<f32> = uv + offset;
    let clampedCoord: vec2<f32> = clamp(coord, gfu.uInputClamp.xy, gfu.uInputClamp.zw);

    var clampedColor: vec4<f32> = textureSample(uTexture, uSampler, clampedCoord);
    
    if (boolVec2(coord, clampedCoord)) 
    {
        clampedColor *= max(0.0, 1.0 - length(coord - clampedCoord));
    }
    // No clamp :
    var finalColor = clampedColor;

    return select(finalColor, textureSample(uTexture, uSampler, uv), returnColorOnly);
}

fn boolVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
    if (x.x == y.x && x.y == y.y)
    {
        return true;
    }
    
    return false;
}

const PI: f32 = 3.14159265358979323846264;
`,vZ=Object.defineProperty,zZ=(t,e,o)=>e in t?vZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,by=(t,e,o)=>(zZ(t,typeof e!="symbol"?e+"":e,o),o);const SZ=class Sk extends ie{constructor(...e){let o=e[0]??{};(Array.isArray(o)||"x"in o&&"y"in o)&&($("6.0.0","ShockwaveFilter constructor params are now options object. See params: { center, speed, amplitude, wavelength, brightness, radius, time }"),o={center:o,...e[1]},e[2]!==void 0&&(o.time=e[2])),o={...Sk.DEFAULT_OPTIONS,...o};const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:wZ,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:kZ,name:"shockwave-filter"});super({gpuProgram:n,glProgram:i,resources:{shockwaveUniforms:{uTime:{value:o.time,type:"f32"},uCenter:{value:o.center,type:"vec2<f32>"},uSpeed:{value:o.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}}}}),by(this,"uniforms"),by(this,"time"),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,o)}apply(e,o,n,i){this.uniforms.uTime=this.time,e.applyFilter(this,o,n,i)}get center(){return this.uniforms.uCenter}set center(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uCenter=e}get centerX(){return this.uniforms.uCenter.x}set centerX(e){this.uniforms.uCenter.x=e}get centerY(){return this.uniforms.uCenter.y}set centerY(e){this.uniforms.uCenter.y=e}get speed(){return this.uniforms.uSpeed}set speed(e){this.uniforms.uSpeed=e}get amplitude(){return this.uniforms.uWave[0]}set amplitude(e){this.uniforms.uWave[0]=e}get wavelength(){return this.uniforms.uWave[1]}set wavelength(e){this.uniforms.uWave[1]=e}get brightness(){return this.uniforms.uWave[2]}set brightness(e){this.uniforms.uWave[2]=e}get radius(){return this.uniforms.uWave[3]}set radius(e){this.uniforms.uWave[3]=e}};by(SZ,"DEFAULT_OPTIONS",{center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1});var EZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;
uniform vec3 uColor;
uniform float uAlpha;
uniform vec2 uDimensions;

uniform vec4 uInputSize;

void main() {
    vec4 diffuseColor = texture(uTexture, vTextureCoord);
    vec2 lightCoord = (vTextureCoord * uInputSize.xy) / uDimensions;
    vec4 light = texture(uMapTexture, lightCoord);
    vec3 ambient = uColor.rgb * uAlpha;
    vec3 intensity = ambient + light.rgb;
    vec3 color = diffuseColor.rgb * intensity;
    finalColor = vec4(color, diffuseColor.a);
}
`,_Z=`struct SimpleLightmapUniforms {
  uColor: vec3<f32>,
  uAlpha: f32,
  uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> simpleLightmapUniforms : SimpleLightmapUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;
@group(1) @binding(2) var uMapSampler: sampler;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>,
) -> @location(0) vec4<f32> {
  let uColor = simpleLightmapUniforms.uColor;
  let uAlpha = simpleLightmapUniforms.uAlpha;
  let uDimensions = simpleLightmapUniforms.uDimensions;

  let diffuseColor: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let lightCoord: vec2<f32> = (uv * gfu.uInputSize.xy) / simpleLightmapUniforms.uDimensions;
  let light: vec4<f32> = textureSample(uMapTexture, uMapSampler, lightCoord);
  let ambient: vec3<f32> = uColor * uAlpha;
  let intensity: vec3<f32> = ambient + light.rgb;
  let finalColor: vec3<f32> = diffuseColor.rgb * intensity;
  return vec4<f32>(finalColor, diffuseColor.a);
}`,CZ=Object.defineProperty,ZZ=(t,e,o)=>e in t?CZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ea=(t,e,o)=>(ZZ(t,typeof e!="symbol"?e+"":e,o),o);const AZ=class Ek extends ie{constructor(...e){let o=e[0]??{};if(o instanceof V&&($("6.0.0","SimpleLightmapFilter constructor params are now options object. See params: { lightMap, color, alpha }"),o={lightMap:o},e[1]!==void 0&&(o.color=e[1]),e[2]!==void 0&&(o.alpha=e[2])),o={...Ek.DEFAULT_OPTIONS,...o},!o.lightMap)throw Error("No light map texture source was provided to SimpleLightmapFilter");const n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:_Z,entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:EZ,name:"simple-lightmap-filter"});super({gpuProgram:n,glProgram:i,resources:{simpleLightmapUniforms:{uColor:{value:new Float32Array(3),type:"vec3<f32>"},uAlpha:{value:o.alpha,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}},uMapTexture:o.lightMap.source,uMapSampler:o.lightMap.source.style}}),ea(this,"uniforms"),ea(this,"_color"),ea(this,"_lightMap"),this.uniforms=this.resources.simpleLightmapUniforms.uniforms,this._color=new Y,this.color=o.color??0,Object.assign(this,o)}apply(e,o,n,i){this.uniforms.uDimensions[0]=o.frame.width,this.uniforms.uDimensions[1]=o.frame.height,e.applyFilter(this,o,n,i)}get lightMap(){return this._lightMap}set lightMap(e){this._lightMap=e,this.resources.uMapTexture=e.source,this.resources.uMapSampler=e.source.style}get color(){return this._color.value}set color(e){this._color.setValue(e);const[o,n,i]=this._color.toArray();this.uniforms.uColor[0]=o,this.uniforms.uColor[1]=n,this.uniforms.uColor[2]=i}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}};ea(AZ,"DEFAULT_OPTIONS",{lightMap:V.WHITE,color:0,alpha:1});var RZ=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uBlur;
uniform vec2 uStart;
uniform vec2 uEnd;
uniform vec2 uDelta;
uniform vec2 uDimensions;

float random(vec3 scale, float seed)
{
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

void main(void)
{
    vec4 color = vec4(0.0);
    float total = 0.0;

    float blur = uBlur[0];
    float gradientBlur = uBlur[1];

    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
    vec2 normal = normalize(vec2(uStart.y - uEnd.y, uEnd.x - uStart.x));
    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * uDimensions - uStart, normal)) / gradientBlur) * blur;

    for (float t = -30.0; t <= 30.0; t++)
    {
        float percent = (t + offset - 0.5) / 30.0;
        float weight = 1.0 - abs(percent);
        vec4 sample = texture(uTexture, vTextureCoord + uDelta / uDimensions * percent * radius);
        sample.rgb *= sample.a;
        color += sample * weight;
        total += weight;
    }

    color /= total;
    color.rgb /= color.a + 0.00001;

    finalColor = color;
}
`,PZ=`struct TiltShiftUniforms {
  uBlur: vec2<f32>,
  uStart: vec2<f32>,
  uEnd: vec2<f32>,
  uDelta: vec2<f32>,
  uDimensions: vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> tiltShiftUniforms : TiltShiftUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uBlur = tiltShiftUniforms.uBlur[0];
  let uBlurGradient = tiltShiftUniforms.uBlur[1];
  let uStart = tiltShiftUniforms.uStart;
  let uEnd = tiltShiftUniforms.uEnd;
  let uDelta = tiltShiftUniforms.uDelta;
  let uDimensions = tiltShiftUniforms.uDimensions;

  var color: vec4<f32> = vec4<f32>(0.0);
  var total: f32 = 0.0;

  let offset: f32 = random(position, vec3<f32>(12.9898, 78.233, 151.7182), 0.0);
  let normal: vec2<f32> = normalize(vec2<f32>(uStart.y - uEnd.y, uEnd.x - uStart.x));
  let radius: f32 = smoothstep(0.0, 1.0, abs(dot(uv * uDimensions - uStart, normal)) / uBlurGradient) * uBlur;

  for (var t: f32 = -30.0; t <= 30.0; t += 1.0)
  {
    var percent: f32 = (t + offset - 0.5) / 30.0;
    var weight: f32 = 1.0 - abs(percent);
    var sample: vec4<f32> = textureSample(uTexture, uSampler, uv + uDelta / uDimensions * percent * radius);
    sample = vec4<f32>(sample.xyz * sample.a, sample.a); // multiply sample.rgb with sample.a
    color += sample * weight;
    total += weight;
  }

  color /= total;
  color = vec4<f32>(color.xyz / (color.a + 0.00001), color.a); // divide color.rgb by color.a + 0.00001

  return color;
}


fn random(position: vec4<f32>, scale: vec3<f32>, seed: f32) -> f32
{
  return fract(sin(dot(position.xyz + seed, scale)) * 43758.5453 + seed);
}`,TZ=Object.defineProperty,jZ=(t,e,o)=>e in t?TZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,xy=(t,e,o)=>(jZ(t,typeof e!="symbol"?e+"":e,o),o);const IZ=class _k extends ie{constructor(e){const{width:o,height:n}=l5.defaultOptions;e={..._k.DEFAULT_OPTIONS,start:{x:0,y:n/2},end:{x:o,y:n/2},...e};const i=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:PZ,entryPoint:"mainFragment"}}),r=oe.from({vertex:ae,fragment:RZ,name:"tilt-shift-axis-filter"});super({gpuProgram:i,glProgram:r,resources:{tiltShiftUniforms:{uBlur:{value:new Float32Array([e.blur,e.gradientBlur]),type:"vec2<f32>"},uStart:{value:e.start,type:"vec2<f32>"},uEnd:{value:e.end,type:"vec2<f32>"},uDelta:{value:new Float32Array([0,0]),type:"vec2<f32>"},uDimensions:{value:new Float32Array([o,n]),type:"vec2<f32>"}}}}),xy(this,"uniforms"),xy(this,"_tiltAxis"),this.uniforms=this.resources.tiltShiftUniforms.uniforms,this._tiltAxis=e.axis}updateDimensions(e){const{uDimensions:o}=this.uniforms;o[0]=e.frame.width,o[1]=e.frame.height}updateDelta(){if(this.uniforms.uDelta[0]=0,this.uniforms.uDelta[1]=0,this._tiltAxis===void 0)return;const e=this.uniforms.uEnd,o=this.uniforms.uStart,n=e.x-o.x,i=e.y-o.y,r=Math.sqrt(n*n+i*i),s=this._tiltAxis==="vertical";this.uniforms.uDelta[0]=s?-i/r:n/r,this.uniforms.uDelta[1]=s?n/r:i/r}};xy(IZ,"DEFAULT_OPTIONS",{blur:100,gradientBlur:600});var FZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTwist;
uniform vec2 uOffset;
uniform vec4 uInputSize;

vec2 mapCoord( vec2 coord )
{
    coord *= uInputSize.xy;
    coord += uInputSize.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= uInputSize.zw;
    coord /= uInputSize.xy;

    return coord;
}

vec2 twist(vec2 coord)
{
    coord -= uOffset;

    float dist = length(coord);
    float uRadius = uTwist[0];
    float uAngle = uTwist[1];

    if (dist < uRadius)
    {
        float ratioDist = (uRadius - dist) / uRadius;
        float angleMod = ratioDist * ratioDist * uAngle;
        float s = sin(angleMod);
        float c = cos(angleMod);
        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);
    }

    coord += uOffset;

    return coord;
}

void main(void)
{
    vec2 coord = mapCoord(vTextureCoord);
    coord = twist(coord);
    coord = unmapCoord(coord);
    finalColor = texture(uTexture, coord);
}
`,MZ=`struct TwistUniforms {
  uTwist:vec2<f32>,
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> twistUniforms : TwistUniforms;

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
  return textureSample(uTexture, uSampler, unmapCoord(twist(mapCoord(uv))));
}

fn mapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord *= gfu.uInputSize.xy;
  mappedCoord += gfu.uOutputFrame.xy;
  return mappedCoord;
}

fn unmapCoord(coord: vec2<f32> ) -> vec2<f32>
{
  var mappedCoord: vec2<f32> = coord;
  mappedCoord -= gfu.uOutputFrame.xy;
  mappedCoord /= gfu.uInputSize.xy;
  return mappedCoord;
}

fn twist(coord: vec2<f32>) -> vec2<f32>
{
  var twistedCoord: vec2<f32> = coord;
  let uRadius = twistUniforms.uTwist[0];
  let uAngle = twistUniforms.uTwist[1];
  let uOffset = twistUniforms.uOffset;

  twistedCoord -= uOffset;
  
  let dist = length(twistedCoord);

  if (dist < uRadius)
  {
    let ratioDist: f32 = (uRadius - dist) / uRadius;
    let angleMod: f32 = ratioDist * ratioDist * uAngle;
    let s: f32 = sin(angleMod);
    let c: f32 = cos(angleMod);
    twistedCoord = vec2<f32>(twistedCoord.x * c - twistedCoord.y * s, twistedCoord.x * s + twistedCoord.y * c);
  }

  twistedCoord += uOffset;
  return twistedCoord;
}
`,OZ=Object.defineProperty,DZ=(t,e,o)=>e in t?OZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Ck=(t,e,o)=>(DZ(t,typeof e!="symbol"?e+"":e,o),o);const BZ=class Zk extends ie{constructor(e){e={...Zk.DEFAULT_OPTIONS,...e};const o=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:MZ,entryPoint:"mainFragment"}}),n=oe.from({vertex:ae,fragment:FZ,name:"twist-filter"});super({gpuProgram:o,glProgram:n,resources:{twistUniforms:{uTwist:{value:[e.radius??0,e.angle??0],type:"vec2<f32>"},uOffset:{value:e.offset,type:"vec2<f32>"}}},...e}),Ck(this,"uniforms"),this.uniforms=this.resources.twistUniforms.uniforms}get radius(){return this.uniforms.uTwist[0]}set radius(e){this.uniforms.uTwist[0]=e}get angle(){return this.uniforms.uTwist[1]}set angle(e){this.uniforms.uTwist[1]=e}get offset(){return this.uniforms.uOffset}set offset(e){this.uniforms.uOffset=e}get offsetX(){return this.offset.x}set offsetX(e){this.offset.x=e}get offsetY(){return this.offset.y}set offsetY(e){this.offset.y=e}};Ck(BZ,"DEFAULT_OPTIONS",{padding:20,radius:200,angle:4,offset:{x:0,y:0}});var GZ=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uStrength;
uniform vec2 uCenter;
uniform vec2 uRadii;

uniform vec4 uInputSize;

const float MAX_KERNEL_SIZE = \${MAX_KERNEL_SIZE};

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand(vec2 co, float seed) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);
    return fract(sin(sn) * c + seed);
}

void main() {
    float minGradient = uRadii[0] * 0.3;
    float innerRadius = (uRadii[0] + minGradient * 0.5) / uInputSize.x;

    float gradient = uRadii[1] * 0.3;
    float radius = (uRadii[1] - gradient * 0.5) / uInputSize.x;

    float countLimit = MAX_KERNEL_SIZE;

    vec2 dir = vec2(uCenter.xy / uInputSize.xy - vTextureCoord);
    float dist = length(vec2(dir.x, dir.y * uInputSize.y / uInputSize.x));

    float strength = uStrength;

    float delta = 0.0;
    float gap;
    if (dist < innerRadius) {
        delta = innerRadius - dist;
        gap = minGradient;
    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity
        delta = dist - radius;
        gap = gradient;
    }

    if (delta > 0.0) {
        float normalCount = gap / uInputSize.x;
        delta = (normalCount - delta) / normalCount;
        countLimit *= delta;
        strength *= delta;
        if (countLimit < 1.0)
        {
            gl_FragColor = texture(uTexture, vTextureCoord);
            return;
        }
    }

    // randomize the lookup values to hide the fixed number of samples
    float offset = rand(vTextureCoord, 0.0);

    float total = 0.0;
    vec4 color = vec4(0.0);

    dir *= strength;

    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {
        float percent = (t + offset) / MAX_KERNEL_SIZE;
        float weight = 4.0 * (percent - percent * percent);
        vec2 p = vTextureCoord + dir * percent;
        vec4 sample = texture(uTexture, p);

        // switch to pre-multiplied alpha to correctly blur transparent images
        // sample.rgb *= sample.a;

        color += sample * weight;
        total += weight;

        if (t > countLimit){
            break;
        }
    }

    color /= total;
    // switch back from pre-multiplied alpha
    // color.rgb /= color.a + 0.00001;

    gl_FragColor = color;
}
`,UZ=`struct ZoomBlurUniforms {
    uStrength:f32,
    uCenter:vec2<f32>,
    uRadii:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> zoomBlurUniforms : ZoomBlurUniforms;

@fragment
fn mainFragment(
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uStrength = zoomBlurUniforms.uStrength;
  let uCenter = zoomBlurUniforms.uCenter;
  let uRadii = zoomBlurUniforms.uRadii;

  let minGradient: f32 = uRadii[0] * 0.3;
  let innerRadius: f32 = (uRadii[0] + minGradient * 0.5) / gfu.uInputSize.x;

  let gradient: f32 = uRadii[1] * 0.3;
  let radius: f32 = (uRadii[1] - gradient * 0.5) / gfu.uInputSize.x;

  let MAX_KERNEL_SIZE: f32 = \${MAX_KERNEL_SIZE};

  var countLimit: f32 = MAX_KERNEL_SIZE;

  var dir: vec2<f32> = vec2<f32>(uCenter / gfu.uInputSize.xy - uv);
  let dist: f32 = length(vec2<f32>(dir.x, dir.y * gfu.uInputSize.y / gfu.uInputSize.x));

  var strength: f32 = uStrength;

  var delta: f32 = 0.0;
  var gap: f32;

  if (dist < innerRadius) {
      delta = innerRadius - dist;
      gap = minGradient;
  } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity
      delta = dist - radius;
      gap = gradient;
  }

  var returnColorOnly: bool = false;

  if (delta > 0.0) {
    let normalCount: f32 = gap / gfu.uInputSize.x;
    delta = (normalCount - delta) / normalCount;
    countLimit *= delta;
    strength *= delta;
    
    if (countLimit < 1.0)
    {
      returnColorOnly = true;;
    }
  }

  // randomize the lookup values to hide the fixed number of samples
  let offset: f32 = rand(uv, 0.0);

  var total: f32 = 0.0;
  var color: vec4<f32> = vec4<f32>(0.);

  dir *= strength;

  for (var t = 0.0; t < MAX_KERNEL_SIZE; t += 1.0) {
    let percent: f32 = (t + offset) / MAX_KERNEL_SIZE;
    let weight: f32 = 4.0 * (percent - percent * percent);
    let p: vec2<f32> = uv + dir * percent;
    let sample: vec4<f32> = textureSample(uTexture, uSampler, p);
    
    if (t < countLimit)
    {
      color += sample * weight;
      total += weight;
    }
  }

  color /= total;

  return select(color, textureSample(uTexture, uSampler, uv), returnColorOnly);
}

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
fn rand(co: vec2<f32>, seed: f32) -> f32
{
  let a: f32 = 12.9898;
  let b: f32 = 78.233;
  let c: f32 = 43758.5453;
  let dt: f32 = dot(co + seed, vec2<f32>(a, b));
  let sn: f32 = modulo(dt, 3.14159);
  return fract(sin(sn) * c + seed);
}`,NZ=Object.defineProperty,LZ=(t,e,o)=>e in t?NZ(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Ak=(t,e,o)=>(LZ(t,typeof e!="symbol"?e+"":e,o),o);const $Z=class Rk extends ie{constructor(e){e={...Rk.DEFAULT_OPTIONS,...e};const o=e.maxKernelSize??32,n=te.from({vertex:{source:ce,entryPoint:"mainVertex"},fragment:{source:UZ.replace("${MAX_KERNEL_SIZE}",o.toFixed(1)),entryPoint:"mainFragment"}}),i=oe.from({vertex:ae,fragment:GZ.replace("${MAX_KERNEL_SIZE}",o.toFixed(1)),name:"zoom-blur-filter"});super({gpuProgram:n,glProgram:i,resources:{zoomBlurUniforms:{uStrength:{value:e.strength,type:"f32"},uCenter:{value:e.center,type:"vec2<f32>"},uRadii:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ak(this,"uniforms"),this.uniforms=this.resources.zoomBlurUniforms.uniforms,Object.assign(this,e)}get strength(){return this.uniforms.uStrength}set strength(e){this.uniforms.uStrength=e}get center(){return this.uniforms.uCenter}set center(e){Array.isArray(e)&&(e={x:e[0],y:e[1]}),this.uniforms.uCenter=e}get centerX(){return this.uniforms.uCenter.x}set centerX(e){this.uniforms.uCenter.x=e}get centerY(){return this.uniforms.uCenter.y}set centerY(e){this.uniforms.uCenter.y=e}get innerRadius(){return this.uniforms.uRadii[0]}set innerRadius(e){this.uniforms.uRadii[0]=e}get radius(){return this.uniforms.uRadii[1]}set radius(e){this.uniforms.uRadii[1]=e<0||e===1/0?-1:e}};Ak($Z,"DEFAULT_OPTIONS",{strength:.1,center:{x:0,y:0},innerRadius:0,radius:-1,maxKernelSize:32});const Pk=t=>[new Jg({originalColor:65535,targetColor:t.basic,tolerance:.1}),new Jg({originalColor:34952,targetColor:t.dimmed,tolerance:.1})],ky=(t,e)=>Pk(L1[t.color].edges[e]),WZ=t=>Pk(L1[t.color].main),e0=(t,e)=>new qn().poly([Ae({}),Ae({x:t.x}),Ae({x:t.x,y:t.y}),Ae({y:t.y})]).poly([Ae({}),Ae({z:t.z}),Ae({y:t.y,z:t.z}),Ae({y:t.y})]).poly([Ae({x:t.x}),Ae({x:t.x,z:t.z}),Ae(t),Ae({x:t.x,y:t.y})]).poly([Ae({z:t.z}),Ae({x:t.x,z:t.z}),Ae({x:t.x,y:t.y,z:t.z}),Ae({y:t.y,z:t.z})]).stroke({width:.5,color:e}),HZ=(t,e,o)=>{if(o.showBoundingBoxes==="all"||o.showBoundingBoxes==="non-wall"&&t.type!=="wall"){const n=new ye,i=t.type==="wall"?"rgba(255,0,0, 0.5)":"rgba(255,255,255,0.5)",r=new qn().circle(0,0,2).fill(i);return n.addChild(e),n.addChild(r),n.addChild(e0(t.aabb,i)),t.renderAabb&&n.addChild(e0(t.renderAabb,"green")),e.alpha=.8,n}else return e},XZ={x:.5,y:1},VZ=t=>typeof t!="string"&&Object.hasOwn(t,"frames"),J=t=>{if(typeof t=="string")return J({texture:t});{const{anchor:e,flipX:o,pivot:n,x:i,y:r}=t;let s;return VZ(t)?(s=new ja(t.frames),s.animationSpeed=t.animationSpeed||.1,s.play()):s=new Xn(Rt.textures[t.texture]),e===void 0&&n===void 0?s.anchor=XZ:(e!==void 0&&(s.anchor=e),n!==void 0&&(s.pivot=n)),i!==void 0&&(s.x=i),r!==void 0&&(s.y=r),s.eventMode="static",o===!0&&(s.scale.x=-1),s}},qZ=(t,e,o)=>`${t}.wall.${e}.${o}`,YZ=(t,e,o)=>{const n=Rt.textures[`${t.planet}.door.front.${e}`]!==void 0;return o=="near"?n?`${t.planet}.door.front.${e}`:`generic.door.front.${e}`:n?`${t.planet}.door.back.${e}`:`generic.door.back.${e}`};function*QZ(t,e){const o=t==="y"?0:16;yield J({pivot:{x:o,y:9},texture:"generic.door.legs.base",y:e});for(let n=e-Se.h;n>0;n-=Se.h)yield J({pivot:{x:o,y:9},texture:"generic.door.legs.pillar",y:n});yield J({pivot:{x:o,y:15},texture:`generic.door.legs.threshold.${t}`})}function*t0({axis:t,inHiddenWall:e},o,{z:n},i){if(e){if(n!==0){const s=J({pivot:{x:t==="x"?18:8,y:12},texture:`generic.door.threshold.${t}`});s.filters=ky(o,t==="x"?"towards":"right"),yield s}}else if(n!==0)yield*QZ(t,n);else{const r=qo({[c5(t)]:.5});i==="far"&&(yield J({anchor:{x:0,y:1},flipX:t==="x",texture:"generic.wall.overdraw",...r}))}yield J({texture:YZ(o,t,i),pivot:f5[i][t]})}const KZ=.17,JZ=.17,o0=({type:t,state:{movement:e,facing:o}})=>J(e==="moving"?{frames:Rt.animations[`${t}.walking.${o}`],animationSpeed:KZ}:e==="falling"&&t==="head"&&(o==="towards"||o==="right")?`head.falling.${o}`:t==="head"&&(o==="towards"||o==="right")?{frames:Rt.animations[`head.idle.${o}`],animationSpeed:JZ}:`${t}.walking.${o}.2`),Ru={frames:Rt.animations.bubbles,animationSpeed:.1},jr=(t,e="headless-base")=>{const o=new ye;o.addChild(J(e));const n=J(t);return n.y=-12,o.addChild(n),o},eA={doorNear({config:t,position:e},o){const n=new ye;for(const i of t0(t,o,e,"near"))n.addChild(i);return n},doorFar({config:t,position:e},o){const n=new ye;for(const i of t0(t,o,e,"far"))n.addChild(i);return n},wall({config:{side:t,style:e}},o){return t==="right"||t==="towards"?new ye:J({texture:qZ(o.planet,e,t),anchor:t==="away"?{x:1,y:1}:{x:0,y:1}})},barrier:({config:{axis:t}})=>J({texture:`barrier.${t}`,pivot:h5[t]}),"deadly-block":({config:{style:t}})=>J(t==="puck"?"puck.deadly":t),block:({config:{style:t}})=>J(`block.${t}`),conveyor:({config:{direction:t}})=>J(t==="left"||t==="right"?"conveyor.x":"conveyor.y"),fish:({config:{alive:t}})=>J(t?{frames:Rt.animations.fish,animationSpeed:.1}:{texture:"fish.1"}),lift(){const t=new ye;return t.addChild(J({frames:Rt.animations.lift,animationSpeed:.2})),t.addChild(J("lift.static")),t},spring:()=>J("spring.released"),teleporter:t=>t.state.flashing?J({frames:Rt.animations["teleporter.flashing"],animationSpeed:.1}):J("teleporter"),pickup({config:{gives:t}}){return J({shield:"bunny",jumps:"bunny",fast:"bunny","extra-life":"bunny",bag:"bag",donuts:"donuts",hooter:"hooter",crown:"crown"}[t])},head(t,e){return o0(t)},heels(t,e){return o0(t)},sceneryPlayer:({config:{which:t}})=>J(`${t}.walking.towards.2`),baddie({config:t}){switch(t.which){case"helicopter-bug":case"dalek":return J({frames:Rt.animations[t.which],animationSpeed:.2});case"headless-base":return J({texture:"headless-base"});case"american-football-head":return J({texture:`american-football-head.${t.startDirection}`});case"turtle":return J({frames:Rt.animations[`turtle.${t.startDirection}`],animationSpeed:.1});case"cyberman":return t.charging?J(`cyberman.${t.startDirection}`):jr("cyberman.towards",Ru);case"bubble-robot":return jr(Ru);case"flying-ball":return jr("ball",Ru);case"computer-bot":case"elephant":case"monkey":return jr(`${t.which}.towards`);case"elephant-head":return J("elephant.right");default:throw new Error(`unexpected baddie ${t}`)}},joystick:()=>J("joystick"),"movable-block":({config:{style:t}})=>J(t),book:({config:{slider:t}})=>J(`book.${t?"y":"x"}`),"portable-block":({config:{style:t}})=>J(t),charles:()=>jr("charles.towards"),switch:()=>J("switch.off"),"hush-puppy":()=>J("hush-puppy"),ball:()=>J("ball"),floor(){throw new Error("floor should not be rendered as an item")}},tA=(t,e,o)=>{if(!t.renders)return;const n=new ye,i=HZ(t,n,o);o.onItemClick&&(i.eventMode="static",i.on("pointertap",()=>{o.onItemClick(t)})),t.positionContainer=i,t.renderContainer=n,Tk(t,e),jk(t)},Tk=(t,e)=>{Qd(t);const o=eA[t.type];if(o===void 0)throw new Error(`item type "${t.type}" has no appearance`);t.renderContainer.removeChildren();const n=o(t,e);t.renderContainer.addChild(n)},jk=t=>{Qd(t);const{position:e,positionContainer:o}=t,n=Ae(e);o.x=n.x,o.y=n.y},oA=t=>{const{towards:e,right:o}=F1(t),{blockXMin:n,blockYMin:i,rightSide:r,leftSide:s,frontSide:l,backSide:a}=M1(t),{floor:c}=t,u=new ye,p=Object.fromEntries(t.floorSkip.map(({x:h,y:m})=>[`${h},${m}`,!0]));if(c!=="none"){const h=c==="deadly"?"generic.floor.deadly":`${c}.floor`,m=new ye;for(let w=-1;w<=t.size.x;w++)for(let v=w%2-1;v<=t.size.y;v+=2)p[`${w},${v}`]||m.addChild(Su({x:w,y:v},J({anchor:{x:.5,y:1},texture:h})));const k=new qn().poly([l,r,a,s],!0).fill(16711680).stroke({width:8});m.addChild(k),m.mask=k,u.addChild(m)}const y=new ye;for(let h=n;h<=t.size.x;h+=.5)y.addChild(Su({x:h,y:e?-.5:0},J({pivot:{x:7,y:1},texture:"generic.edge.towards"})));y.filters=ky(t,"towards");const d=new ye;for(let h=i;h<=t.size.y;h+=.5)d.addChild(Su({x:o?-.5:0,y:h},J({pivot:{x:0,y:1},texture:"generic.edge.right"})));d.filters=ky(t,"right");const g=qo({x:0,y:t.size.y}),f=qo({x:t.size.x,y:0}),b=new qn().poly([{x:l.x,y:l.y+16},{x:g.x,y:g.y+16},{x:g.x,y:-999},{x:f.x,y:-999},{x:f.x,y:f.y+16}],!0).fill(16776960);return u.addChild(b),u.addChild(y),u.addChild(d),u.mask=b,u},nA=(t,e)=>{if(t.renders===!1||e.renders===!1)return 0;const o=t.renderAabb||t.aabb,n=e.renderAabb||e.aabb,i=Ae(t.position),r=i.x-o.x,s=i.x+o.y,l=Ae(e.position),a=l.x-n.x,c=l.x+n.y;if(r>=c||a>=s)return 0;const u=Hg(As(t.position,o)),p=Hg(As(e.position,n));if(i.y<=p||l.y<=u)return 0;for(const d of I1){const g=t.position[d],f=g+o[d],b=e.position[d],h=b+n[d];if(f<=b)return 1*(d==="z"?-1:1);if(g>=h)return-1*(d==="z"?-1:1)}const y=`could not compare two items A ${t.id} and B ${e.id} 
      A @ ${JSON.stringify(t.position)} size ${JSON.stringify(o)} and
      B @ ${JSON.stringify(e.position)} size ${JSON.stringify(n)} 
      - do these bounding boxes intersect?`;return console.error(y),0};var of={exports:{}};of.exports=function(t){return Ik(iA(t),t)};of.exports.array=Ik;function Ik(t,e){var o=t.length,n=new Array(o),i={},r=o,s=rA(e),l=sA(t);for(e.forEach(function(c){if(!l.has(c[0])||!l.has(c[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});r--;)i[r]||a(t[r],r,new Set);return n;function a(c,u,p){if(p.has(c)){var y;try{y=", node was:"+JSON.stringify(c)}catch{y=""}throw new Error("Cyclic dependency"+y)}if(!l.has(c))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(c));if(!i[u]){i[u]=!0;var d=s.get(c)||new Set;if(d=Array.from(d),u=d.length){p.add(c);do{var g=d[--u];a(g,l.get(g),p)}while(u);p.delete(c)}n[--o]=c}}}function iA(t){for(var e=new Set,o=0,n=t.length;o<n;o++){var i=t[o];e.add(i[0]),e.add(i[1])}return Array.from(e)}function rA(t){for(var e=new Map,o=0,n=t.length;o<n;o++){var i=t[o];e.has(i[0])||e.set(i[0],new Set),e.has(i[1])||e.set(i[1],new Set),e.get(i[0]).add(i[1])}return e}function sA(t){for(var e=new Map,o=0,n=t.length;o<n;o++)e.set(t[o],o);return e}var lA=of.exports;const aA=oi(lA),Fk=t=>{const e=[];for(const n of t)if(n.renders)for(const i of t){if(n===i)break;if(!i.renders)continue;const r=nA(n,i);r!==0&&(r>0?e.push([i,n]):e.push([n,i]))}const o=aA(e);for(let n=0;n<o.length;n++)o[n].positionContainer.zIndex=n},cA=(t,e)=>{const o=new ye;o.addChild(oA(t));const n=new ye;for(const i of t.items)i.renders&&(tA(i,t,e),Qd(i),n.addChild(i.positionContainer));return Fk(t.items),o.addChild(n),o.filters=WZ(t),o},Mk={head:Se.w*8/5e3,heels:Se.w*8/2500},n0={head:Se.h*3-1,heels:Se.h};function uA(t,e,o){const{type:n,state:{jumpRemaining:i}}=t,r=Yd.find(l=>e[l]===!0),s=r!==void 0||i>0?T1[t.state.facing]:cc;return{positionDelta:j1(s,Mk[n]*o),stateDelta:r!==void 0?{facing:r,movement:"moving"}:i===0?{movement:"idle"}:{}}}function pA(t,e,o){const n=o.items.find(i=>(i.type==="head"||i.type==="heels")&&i.state.standingOn===t)!==void 0;return n&&e.jump&&console.log("TIME TO TELEPORT!!!"),{positionDelta:cc,stateDelta:{flashing:!!n}}}const Fa={positionDelta:cc,stateDelta:{}},yA=Se.h/1e3,dA=(t,e,o)=>{if(!(t.state.standingOn===null&&(!O1(t)||t.state.jumpRemaining===0)))return Fa;const i=j1(T1.down,yA*o),s=ef({...t,position:As(t.position,i)},e.items).at(0);return{positionDelta:i,stateDelta:{standingOn:s===void 0?null:s,movement:t.type==="head"?"falling":void 0}}},fA=(t,{jump:e},o)=>{const{type:n,state:{jumpRemaining:i}}=t,r=t.state.standingOn!==null&&t.state.standingOn.type!=="teleporter",s=e&&r;if(!s&&i===0)return Fa;const l=Math.min(Mk[n]*o,s?n0[n]:i);return{stateDelta:s?{movement:"moving",standingOn:null,jumpRemaining:n0[n]}:{movement:"moving",jumpRemaining:Math.max(i-l,0)},positionDelta:{z:l}}},hA=(t,e,o,n)=>n.reduce((r,{position:s,aabb:l})=>I1.reduce((a,c)=>{if(e[c]!==0){const u=s[c];if(e[c]===void 0)return a;if(e[c]>0){const p=Math.min(u,u+l[c]);return{...a,[c]:p-t.aabb[c]}}else{const p=Math.max(u,u+l[c]);return{...a,[c]:p}}}return a},r),o),gA=(t,e,o,n=["x","y","z"])=>{const i=As(t.position,e),r=ef({aabb:t.aabb,position:i,id:t.id},o.items,n),s=hA(t,e,i,r);return p5(s,t.position)||(t.position=s,t.renderPositionDirty=!0),r},mA=(t,e)=>{switch(t.type){case"head":case"heels":return t.state.facing!==e.facing||t.state.movement!==e.movement;case"teleporter":return t.state.flashing!==e.flashing}return!1};function bA(t){const{state:{standingOn:e},position:o,aabb:n}=t;if(e===null)return Fa;const{position:i,aabb:r}=e;return o.x>i.x+r.x||o.x+n.x<i.x||o.y>i.y+r.y||o.y+n.y<i.y?{stateDelta:{standingOn:null},positionDelta:cc}:Fa}const xA=(t,e,o,n)=>{const i=t.state,r=({positionDelta:s,stateDelta:l})=>{gA(t,s,o),t.state={...t.state,...l}};O1(t)&&(r(uA(t,e,n)),r(fA(t,e,n))),D1(t)&&(r(bA(t)),r(dA(t,o,n))),x5("teleporter",t)&&r(pA(t,e,o)),mA(t,i)&&(t.renderingDirty=!0)},kA=(t,e)=>{t.ticker.add(({deltaMS:o})=>{const{inputState:n}=e,i=Vd(e),r=i.items;let s=!1;for(const l of r)xA(l,n,i,o),l.renderPositionDirty&&(jk(l),l.renderPositionDirty=!1,s=!0),l.renderingDirty&&(Tk(l,i),l.renderingDirty=!1);s&&Fk(i.items)})},wA=(t,e)=>{const{leftSide:o,rightSide:n,frontSide:i,top:r}=M1(t),s=(n.x+o.x)/2,l=(r+i.y)/2;e.x=-s,e.y=-l},vA=async t=>{let e={};const o=F5(t);let n=Vd(o);const i=new qx;await i.init({background:"#000000",resizeTo:window}),M5(i),kA(i,o);const r=j5(o),s=b5(),l=new ye;i.stage.addChild(l),l.x=Ia.width/2,l.y=Ia.height*.7;const a=c=>{n=c;for(const p of n.items)p.renders&&(p.renderingDirty=!0,p.renderPositionDirty=!0);l.removeChildren();const u=cA(c,e);wA(c,u),l.addChild(u),s.emit("roomChange",c.id)};return a(n),{campaign:t,events:s,renderIn(c){c.appendChild(i.canvas)},viewRoom(c){c!==n.id&&a(uy(t.rooms[c]))},get viewingRoom(){return n},get gameState(){return o},set renderOptions(c){e=c,a(n)},stop(){console.log("tearing down game"),i.stage.removeChild(l),i.canvas.parentNode?.removeChild(i.canvas),i.destroy(),r()}}},zA=(t,e)=>{const[o,n]=x.useState();return x.useEffect(()=>{let i;return(async()=>{i=await vA(t),n(i)})(),()=>{i?.stop()}},[t]),x.useEffect(()=>{o!==void 0&&(o.renderOptions=e)},[o,e]),o},SA=t=>{x.useEffect(()=>{if(t===void 0)return;window.location.hash&&t.viewRoom(window.location.hash.substring(1));const e=n=>{const i=new URL(n.newURL).hash.substring(1),r=i===""?Vd(t.gameState).id:i;t.viewRoom(r)},o=n=>{window.location.hash=n};return window.addEventListener("hashchange",e),t.events.on("roomChange",o),()=>{window.removeEventListener("hashchange",e),t.events.off("roomChange",o)}},[t])},EA=t=>x.forwardRef(({renderOptions:e},o)=>{const[n,i]=x.useState(null),r=zA(t,e);return SA(r),x.useImperativeHandle(o,()=>r||void 0),x.useEffect(()=>{n===null||r===void 0||r.renderIn(n)},[r,n]),P.jsx("div",{className:"h-screen w-screen bg-slate-700",ref:i})});/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _A=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ok=(...t)=>t.filter((e,o,n)=>!!e&&n.indexOf(e)===o).join(" ");/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var CA={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZA=x.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:n,className:i="",children:r,iconNode:s,...l},a)=>x.createElement("svg",{ref:a,...CA,width:e,height:e,stroke:t,strokeWidth:n?Number(o)*24/Number(e):o,className:Ok("lucide",i),...l},[...s.map(([c,u])=>x.createElement(c,u)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=(t,e)=>{const o=x.forwardRef(({className:n,...i},r)=>x.createElement(ZA,{ref:r,iconNode:e,className:Ok(`lucide-${_A(t)}`,n),...i}));return o.displayName=`${t}`,o};/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AA=uc("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RA=uc("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PA=uc("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TA=uc("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Dk(t){var e,o,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t)){var i=t.length;for(e=0;e<i;e++)t[e]&&(o=Dk(t[e]))&&(n&&(n+=" "),n+=o)}else for(o in t)t[o]&&(n&&(n+=" "),n+=o);return n}function jA(){for(var t,e,o=0,n="",i=arguments.length;o<i;o++)(t=arguments[o])&&(e=Dk(t))&&(n&&(n+=" "),n+=e);return n}const nf="-",IA=t=>{const e=MA(t),{conflictingClassGroups:o,conflictingClassGroupModifiers:n}=t;return{getClassGroupId:s=>{const l=s.split(nf);return l[0]===""&&l.length!==1&&l.shift(),Bk(l,e)||FA(s)},getConflictingClassGroupIds:(s,l)=>{const a=o[s]||[];return l&&n[s]?[...a,...n[s]]:a}}},Bk=(t,e)=>{if(t.length===0)return e.classGroupId;const o=t[0],n=e.nextPart.get(o),i=n?Bk(t.slice(1),n):void 0;if(i)return i;if(e.validators.length===0)return;const r=t.join(nf);return e.validators.find(({validator:s})=>s(r))?.classGroupId},i0=/^\[(.+)\]$/,FA=t=>{if(i0.test(t)){const e=i0.exec(t)[1],o=e?.substring(0,e.indexOf(":"));if(o)return"arbitrary.."+o}},MA=t=>{const{theme:e,prefix:o}=t,n={nextPart:new Map,validators:[]};return DA(Object.entries(t.classGroups),o).forEach(([r,s])=>{wy(s,n,r,e)}),n},wy=(t,e,o,n)=>{t.forEach(i=>{if(typeof i=="string"){const r=i===""?e:r0(e,i);r.classGroupId=o;return}if(typeof i=="function"){if(OA(i)){wy(i(n),e,o,n);return}e.validators.push({validator:i,classGroupId:o});return}Object.entries(i).forEach(([r,s])=>{wy(s,r0(e,r),o,n)})})},r0=(t,e)=>{let o=t;return e.split(nf).forEach(n=>{o.nextPart.has(n)||o.nextPart.set(n,{nextPart:new Map,validators:[]}),o=o.nextPart.get(n)}),o},OA=t=>t.isThemeGetter,DA=(t,e)=>e?t.map(([o,n])=>{const i=n.map(r=>typeof r=="string"?e+r:typeof r=="object"?Object.fromEntries(Object.entries(r).map(([s,l])=>[e+s,l])):r);return[o,i]}):t,BA=t=>{if(t<1)return{get:()=>{},set:()=>{}};let e=0,o=new Map,n=new Map;const i=(r,s)=>{o.set(r,s),e++,e>t&&(e=0,n=o,o=new Map)};return{get(r){let s=o.get(r);if(s!==void 0)return s;if((s=n.get(r))!==void 0)return i(r,s),s},set(r,s){o.has(r)?o.set(r,s):i(r,s)}}},Gk="!",GA=t=>{const{separator:e,experimentalParseClassName:o}=t,n=e.length===1,i=e[0],r=e.length,s=l=>{const a=[];let c=0,u=0,p;for(let b=0;b<l.length;b++){let h=l[b];if(c===0){if(h===i&&(n||l.slice(b,b+r)===e)){a.push(l.slice(u,b)),u=b+r;continue}if(h==="/"){p=b;continue}}h==="["?c++:h==="]"&&c--}const y=a.length===0?l:l.substring(u),d=y.startsWith(Gk),g=d?y.substring(1):y,f=p&&p>u?p-u:void 0;return{modifiers:a,hasImportantModifier:d,baseClassName:g,maybePostfixModifierPosition:f}};return o?l=>o({className:l,parseClassName:s}):s},UA=t=>{if(t.length<=1)return t;const e=[];let o=[];return t.forEach(n=>{n[0]==="["?(e.push(...o.sort(),n),o=[]):o.push(n)}),e.push(...o.sort()),e},NA=t=>({cache:BA(t.cacheSize),parseClassName:GA(t),...IA(t)}),LA=/\s+/,$A=(t,e)=>{const{parseClassName:o,getClassGroupId:n,getConflictingClassGroupIds:i}=e,r=[],s=t.trim().split(LA);let l="";for(let a=s.length-1;a>=0;a-=1){const c=s[a],{modifiers:u,hasImportantModifier:p,baseClassName:y,maybePostfixModifierPosition:d}=o(c);let g=!!d,f=n(g?y.substring(0,d):y);if(!f){if(!g){l=c+(l.length>0?" "+l:l);continue}if(f=n(y),!f){l=c+(l.length>0?" "+l:l);continue}g=!1}const b=UA(u).join(":"),h=p?b+Gk:b,m=h+f;if(r.includes(m))continue;r.push(m);const k=i(f,g);for(let w=0;w<k.length;++w){const v=k[w];r.push(h+v)}l=c+(l.length>0?" "+l:l)}return l};function WA(){let t=0,e,o,n="";for(;t<arguments.length;)(e=arguments[t++])&&(o=Uk(e))&&(n&&(n+=" "),n+=o);return n}const Uk=t=>{if(typeof t=="string")return t;let e,o="";for(let n=0;n<t.length;n++)t[n]&&(e=Uk(t[n]))&&(o&&(o+=" "),o+=e);return o};function HA(t,...e){let o,n,i,r=s;function s(a){const c=e.reduce((u,p)=>p(u),t());return o=NA(c),n=o.cache.get,i=o.cache.set,r=l,l(a)}function l(a){const c=n(a);if(c)return c;const u=$A(a,o);return i(a,u),u}return function(){return r(WA.apply(null,arguments))}}const fe=t=>{const e=o=>o[t]||[];return e.isThemeGetter=!0,e},Nk=/^\[(?:([a-z-]+):)?(.+)\]$/i,XA=/^\d+\/\d+$/,VA=new Set(["px","full","screen"]),qA=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,YA=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,QA=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,KA=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,JA=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,bo=t=>Wi(t)||VA.has(t)||XA.test(t),Oo=t=>hr(t,"length",lR),Wi=t=>!!t&&!Number.isNaN(Number(t)),Pu=t=>hr(t,"number",Wi),Ir=t=>!!t&&Number.isInteger(Number(t)),eR=t=>t.endsWith("%")&&Wi(t.slice(0,-1)),ee=t=>Nk.test(t),Do=t=>qA.test(t),tR=new Set(["length","size","percentage"]),oR=t=>hr(t,tR,Lk),nR=t=>hr(t,"position",Lk),iR=new Set(["image","url"]),rR=t=>hr(t,iR,cR),sR=t=>hr(t,"",aR),Fr=()=>!0,hr=(t,e,o)=>{const n=Nk.exec(t);return n?n[1]?typeof e=="string"?n[1]===e:e.has(n[1]):o(n[2]):!1},lR=t=>YA.test(t)&&!QA.test(t),Lk=()=>!1,aR=t=>KA.test(t),cR=t=>JA.test(t),uR=()=>{const t=fe("colors"),e=fe("spacing"),o=fe("blur"),n=fe("brightness"),i=fe("borderColor"),r=fe("borderRadius"),s=fe("borderSpacing"),l=fe("borderWidth"),a=fe("contrast"),c=fe("grayscale"),u=fe("hueRotate"),p=fe("invert"),y=fe("gap"),d=fe("gradientColorStops"),g=fe("gradientColorStopPositions"),f=fe("inset"),b=fe("margin"),h=fe("opacity"),m=fe("padding"),k=fe("saturate"),w=fe("scale"),v=fe("sepia"),E=fe("skew"),z=fe("space"),S=fe("translate"),C=()=>["auto","contain","none"],_=()=>["auto","hidden","clip","visible","scroll"],D=()=>["auto",ee,e],B=()=>[ee,e],M=()=>["",bo,Oo],j=()=>["auto",Wi,ee],W=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],H=()=>["solid","dashed","dotted","double","none"],F=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],Z=()=>["start","end","center","between","around","evenly","stretch"],R=()=>["","0",ee],T=()=>["auto","avoid","all","avoid-page","page","left","right","column"],Q=()=>[Wi,ee];return{cacheSize:500,separator:":",theme:{colors:[Fr],spacing:[bo,Oo],blur:["none","",Do,ee],brightness:Q(),borderColor:[t],borderRadius:["none","","full",Do,ee],borderSpacing:B(),borderWidth:M(),contrast:Q(),grayscale:R(),hueRotate:Q(),invert:R(),gap:B(),gradientColorStops:[t],gradientColorStopPositions:[eR,Oo],inset:D(),margin:D(),opacity:Q(),padding:B(),saturate:Q(),scale:Q(),sepia:R(),skew:Q(),space:B(),translate:B()},classGroups:{aspect:[{aspect:["auto","square","video",ee]}],container:["container"],columns:[{columns:[Do]}],"break-after":[{"break-after":T()}],"break-before":[{"break-before":T()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...W(),ee]}],overflow:[{overflow:_()}],"overflow-x":[{"overflow-x":_()}],"overflow-y":[{"overflow-y":_()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[f]}],"inset-x":[{"inset-x":[f]}],"inset-y":[{"inset-y":[f]}],start:[{start:[f]}],end:[{end:[f]}],top:[{top:[f]}],right:[{right:[f]}],bottom:[{bottom:[f]}],left:[{left:[f]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Ir,ee]}],basis:[{basis:D()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",ee]}],grow:[{grow:R()}],shrink:[{shrink:R()}],order:[{order:["first","last","none",Ir,ee]}],"grid-cols":[{"grid-cols":[Fr]}],"col-start-end":[{col:["auto",{span:["full",Ir,ee]},ee]}],"col-start":[{"col-start":j()}],"col-end":[{"col-end":j()}],"grid-rows":[{"grid-rows":[Fr]}],"row-start-end":[{row:["auto",{span:[Ir,ee]},ee]}],"row-start":[{"row-start":j()}],"row-end":[{"row-end":j()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",ee]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",ee]}],gap:[{gap:[y]}],"gap-x":[{"gap-x":[y]}],"gap-y":[{"gap-y":[y]}],"justify-content":[{justify:["normal",...Z()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...Z(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...Z(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[m]}],px:[{px:[m]}],py:[{py:[m]}],ps:[{ps:[m]}],pe:[{pe:[m]}],pt:[{pt:[m]}],pr:[{pr:[m]}],pb:[{pb:[m]}],pl:[{pl:[m]}],m:[{m:[b]}],mx:[{mx:[b]}],my:[{my:[b]}],ms:[{ms:[b]}],me:[{me:[b]}],mt:[{mt:[b]}],mr:[{mr:[b]}],mb:[{mb:[b]}],ml:[{ml:[b]}],"space-x":[{"space-x":[z]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[z]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",ee,e]}],"min-w":[{"min-w":[ee,e,"min","max","fit"]}],"max-w":[{"max-w":[ee,e,"none","full","min","max","fit","prose",{screen:[Do]},Do]}],h:[{h:[ee,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[ee,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[ee,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[ee,e,"auto","min","max","fit"]}],"font-size":[{text:["base",Do,Oo]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Pu]}],"font-family":[{font:[Fr]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",ee]}],"line-clamp":[{"line-clamp":["none",Wi,Pu]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",bo,ee]}],"list-image":[{"list-image":["none",ee]}],"list-style-type":[{list:["none","disc","decimal",ee]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[t]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[t]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...H(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",bo,Oo]}],"underline-offset":[{"underline-offset":["auto",bo,ee]}],"text-decoration-color":[{decoration:[t]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:B()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",ee]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",ee]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...W(),nR]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",oR]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},rR]}],"bg-color":[{bg:[t]}],"gradient-from-pos":[{from:[g]}],"gradient-via-pos":[{via:[g]}],"gradient-to-pos":[{to:[g]}],"gradient-from":[{from:[d]}],"gradient-via":[{via:[d]}],"gradient-to":[{to:[d]}],rounded:[{rounded:[r]}],"rounded-s":[{"rounded-s":[r]}],"rounded-e":[{"rounded-e":[r]}],"rounded-t":[{"rounded-t":[r]}],"rounded-r":[{"rounded-r":[r]}],"rounded-b":[{"rounded-b":[r]}],"rounded-l":[{"rounded-l":[r]}],"rounded-ss":[{"rounded-ss":[r]}],"rounded-se":[{"rounded-se":[r]}],"rounded-ee":[{"rounded-ee":[r]}],"rounded-es":[{"rounded-es":[r]}],"rounded-tl":[{"rounded-tl":[r]}],"rounded-tr":[{"rounded-tr":[r]}],"rounded-br":[{"rounded-br":[r]}],"rounded-bl":[{"rounded-bl":[r]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...H(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:H()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...H()]}],"outline-offset":[{"outline-offset":[bo,ee]}],"outline-w":[{outline:[bo,Oo]}],"outline-color":[{outline:[t]}],"ring-w":[{ring:M()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[t]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[bo,Oo]}],"ring-offset-color":[{"ring-offset":[t]}],shadow:[{shadow:["","inner","none",Do,sR]}],"shadow-color":[{shadow:[Fr]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...F(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":F()}],filter:[{filter:["","none"]}],blur:[{blur:[o]}],brightness:[{brightness:[n]}],contrast:[{contrast:[a]}],"drop-shadow":[{"drop-shadow":["","none",Do,ee]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[p]}],saturate:[{saturate:[k]}],sepia:[{sepia:[v]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[o]}],"backdrop-brightness":[{"backdrop-brightness":[n]}],"backdrop-contrast":[{"backdrop-contrast":[a]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[k]}],"backdrop-sepia":[{"backdrop-sepia":[v]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",ee]}],duration:[{duration:Q()}],ease:[{ease:["linear","in","out","in-out",ee]}],delay:[{delay:Q()}],animate:[{animate:["none","spin","ping","pulse","bounce",ee]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[w]}],"scale-x":[{"scale-x":[w]}],"scale-y":[{"scale-y":[w]}],rotate:[{rotate:[Ir,ee]}],"translate-x":[{"translate-x":[S]}],"translate-y":[{"translate-y":[S]}],"skew-x":[{"skew-x":[E]}],"skew-y":[{"skew-y":[E]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",ee]}],accent:[{accent:["auto",t]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",ee]}],"caret-color":[{caret:[t]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":B()}],"scroll-mx":[{"scroll-mx":B()}],"scroll-my":[{"scroll-my":B()}],"scroll-ms":[{"scroll-ms":B()}],"scroll-me":[{"scroll-me":B()}],"scroll-mt":[{"scroll-mt":B()}],"scroll-mr":[{"scroll-mr":B()}],"scroll-mb":[{"scroll-mb":B()}],"scroll-ml":[{"scroll-ml":B()}],"scroll-p":[{"scroll-p":B()}],"scroll-px":[{"scroll-px":B()}],"scroll-py":[{"scroll-py":B()}],"scroll-ps":[{"scroll-ps":B()}],"scroll-pe":[{"scroll-pe":B()}],"scroll-pt":[{"scroll-pt":B()}],"scroll-pr":[{"scroll-pr":B()}],"scroll-pb":[{"scroll-pb":B()}],"scroll-pl":[{"scroll-pl":B()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",ee]}],fill:[{fill:[t,"none"]}],"stroke-w":[{stroke:[bo,Oo,Pu]}],stroke:[{stroke:[t,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},pR=HA(uR);function Qe(...t){return pR(jA(t))}function yR(t,e){typeof t=="function"?t(e):t!=null&&(t.current=e)}function $k(...t){return e=>t.forEach(o=>yR(o,e))}function Ot(...t){return x.useCallback($k(...t),t)}var Gs=x.forwardRef((t,e)=>{const{children:o,...n}=t,i=x.Children.toArray(o),r=i.find(fR);if(r){const s=r.props.children,l=i.map(a=>a===r?x.Children.count(s)>1?x.Children.only(null):x.isValidElement(s)?s.props.children:null:a);return P.jsx(vy,{...n,ref:e,children:x.isValidElement(s)?x.cloneElement(s,void 0,l):null})}return P.jsx(vy,{...n,ref:e,children:o})});Gs.displayName="Slot";var vy=x.forwardRef((t,e)=>{const{children:o,...n}=t;if(x.isValidElement(o)){const i=gR(o);return x.cloneElement(o,{...hR(n,o.props),ref:e?$k(e,i):i})}return x.Children.count(o)>1?x.Children.only(null):null});vy.displayName="SlotClone";var dR=({children:t})=>P.jsx(P.Fragment,{children:t});function fR(t){return x.isValidElement(t)&&t.type===dR}function hR(t,e){const o={...e};for(const n in e){const i=t[n],r=e[n];/^on[A-Z]/.test(n)?i&&r?o[n]=(...l)=>{r(...l),i(...l)}:i&&(o[n]=i):n==="style"?o[n]={...i,...r}:n==="className"&&(o[n]=[i,r].filter(Boolean).join(" "))}return{...t,...o}}function gR(t){let e=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,o=e&&"isReactWarning"in e&&e.isReactWarning;return o?t.ref:(e=Object.getOwnPropertyDescriptor(t,"ref")?.get,o=e&&"isReactWarning"in e&&e.isReactWarning,o?t.props.ref:t.props.ref||t.ref)}function Wk(t){var e,o,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(o=Wk(t[e]))&&(n&&(n+=" "),n+=o);else for(e in t)t[e]&&(n&&(n+=" "),n+=e);return n}function mR(){for(var t,e,o=0,n="";o<arguments.length;)(t=arguments[o++])&&(e=Wk(t))&&(n&&(n+=" "),n+=e);return n}const s0=t=>typeof t=="boolean"?"".concat(t):t===0?"0":t,l0=mR,Hk=(t,e)=>o=>{var n;if(e?.variants==null)return l0(t,o?.class,o?.className);const{variants:i,defaultVariants:r}=e,s=Object.keys(i).map(c=>{const u=o?.[c],p=r?.[c];if(u===null)return null;const y=s0(u)||s0(p);return i[c][y]}),l=o&&Object.entries(o).reduce((c,u)=>{let[p,y]=u;return y===void 0||(c[p]=y),c},{}),a=e==null||(n=e.compoundVariants)===null||n===void 0?void 0:n.reduce((c,u)=>{let{class:p,className:y,...d}=u;return Object.entries(d).every(g=>{let[f,b]=g;return Array.isArray(b)?b.includes({...r,...l}[f]):{...r,...l}[f]===b})?[...c,p,y]:c},[]);return l0(t,s,a,o?.class,o?.className)},bR=Hk("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),Tn=x.forwardRef(({className:t,variant:e,size:o,asChild:n=!1,...i},r)=>{const s=n?Gs:"button";return P.jsx(s,{className:Qe(bR({variant:e,size:o,className:t})),ref:r,...i})});Tn.displayName="Button";var a0=1,xR=.9,kR=.8,wR=.17,Tu=.1,ju=.999,vR=.9999,zR=.99,SR=/[\\\/_+.#"@\[\(\{&]/,ER=/[\\\/_+.#"@\[\(\{&]/g,_R=/[\s-]/,Xk=/[\s-]/g;function zy(t,e,o,n,i,r,s){if(r===e.length)return i===t.length?a0:zR;var l=`${i},${r}`;if(s[l]!==void 0)return s[l];for(var a=n.charAt(r),c=o.indexOf(a,i),u=0,p,y,d,g;c>=0;)p=zy(t,e,o,n,c+1,r+1,s),p>u&&(c===i?p*=a0:SR.test(t.charAt(c-1))?(p*=kR,d=t.slice(i,c-1).match(ER),d&&i>0&&(p*=Math.pow(ju,d.length))):_R.test(t.charAt(c-1))?(p*=xR,g=t.slice(i,c-1).match(Xk),g&&i>0&&(p*=Math.pow(ju,g.length))):(p*=wR,i>0&&(p*=Math.pow(ju,c-i))),t.charAt(c)!==e.charAt(r)&&(p*=vR)),(p<Tu&&o.charAt(c-1)===n.charAt(r+1)||n.charAt(r+1)===n.charAt(r)&&o.charAt(c-1)!==n.charAt(r))&&(y=zy(t,e,o,n,c+1,r+2,s),y*Tu>p&&(p=y*Tu)),p>u&&(u=p),c=o.indexOf(a,c+1);return s[l]=u,u}function c0(t){return t.toLowerCase().replace(Xk," ")}function CR(t,e,o){return t=o&&o.length>0?`${t+" "+o.join(" ")}`:t,zy(t,e,c0(t),c0(e),0,0,{})}function ot(){return ot=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)({}).hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},ot.apply(null,arguments)}function Hi(t,e,{checkForDefaultPrevented:o=!0}={}){return function(i){if(t?.(i),o===!1||!i.defaultPrevented)return e?.(i)}}function ZR(t,e){typeof t=="function"?t(e):t!=null&&(t.current=e)}function Vk(...t){return e=>t.forEach(o=>ZR(o,e))}function Us(...t){return x.useCallback(Vk(...t),t)}function AR(t,e=[]){let o=[];function n(r,s){const l=x.createContext(s),a=o.length;o=[...o,s];function c(p){const{scope:y,children:d,...g}=p,f=y?.[t][a]||l,b=x.useMemo(()=>g,Object.values(g));return x.createElement(f.Provider,{value:b},d)}function u(p,y){const d=y?.[t][a]||l,g=x.useContext(d);if(g)return g;if(s!==void 0)return s;throw new Error(`\`${p}\` must be used within \`${r}\``)}return c.displayName=r+"Provider",[c,u]}const i=()=>{const r=o.map(s=>x.createContext(s));return function(l){const a=l?.[t]||r;return x.useMemo(()=>({[`__scope${t}`]:{...l,[t]:a}}),[l,a])}};return i.scopeName=t,[n,RR(i,...e)]}function RR(...t){const e=t[0];if(t.length===1)return e;const o=()=>{const n=t.map(i=>({useScope:i(),scopeName:i.scopeName}));return function(r){const s=n.reduce((l,{useScope:a,scopeName:c})=>{const p=a(r)[`__scope${c}`];return{...l,...p}},{});return x.useMemo(()=>({[`__scope${e.scopeName}`]:s}),[s])}};return o.scopeName=e.scopeName,o}const Sy=globalThis?.document?x.useLayoutEffect:()=>{},PR=Q0.useId||(()=>{});let TR=0;function Iu(t){const[e,o]=x.useState(PR());return Sy(()=>{t||o(n=>n??String(TR++))},[t]),t||(e?`radix-${e}`:"")}function Yn(t){const e=x.useRef(t);return x.useEffect(()=>{e.current=t}),x.useMemo(()=>(...o)=>{var n;return(n=e.current)===null||n===void 0?void 0:n.call(e,...o)},[])}function jR({prop:t,defaultProp:e,onChange:o=()=>{}}){const[n,i]=IR({defaultProp:e,onChange:o}),r=t!==void 0,s=r?t:n,l=Yn(o),a=x.useCallback(c=>{if(r){const p=typeof c=="function"?c(t):c;p!==t&&l(p)}else i(c)},[r,t,i,l]);return[s,a]}function IR({defaultProp:t,onChange:e}){const o=x.useState(t),[n]=o,i=x.useRef(n),r=Yn(e);return x.useEffect(()=>{i.current!==n&&(r(n),i.current=n)},[n,i,r]),o}const rf=x.forwardRef((t,e)=>{const{children:o,...n}=t,i=x.Children.toArray(o),r=i.find(MR);if(r){const s=r.props.children,l=i.map(a=>a===r?x.Children.count(s)>1?x.Children.only(null):x.isValidElement(s)?s.props.children:null:a);return x.createElement(Ey,ot({},n,{ref:e}),x.isValidElement(s)?x.cloneElement(s,void 0,l):null)}return x.createElement(Ey,ot({},n,{ref:e}),o)});rf.displayName="Slot";const Ey=x.forwardRef((t,e)=>{const{children:o,...n}=t;return x.isValidElement(o)?x.cloneElement(o,{...OR(n,o.props),ref:e?Vk(e,o.ref):o.ref}):x.Children.count(o)>1?x.Children.only(null):null});Ey.displayName="SlotClone";const FR=({children:t})=>x.createElement(x.Fragment,null,t);function MR(t){return x.isValidElement(t)&&t.type===FR}function OR(t,e){const o={...e};for(const n in e){const i=t[n],r=e[n];/^on[A-Z]/.test(n)?i&&r?o[n]=(...l)=>{r(...l),i(...l)}:i&&(o[n]=i):n==="style"?o[n]={...i,...r}:n==="className"&&(o[n]=[i,r].filter(Boolean).join(" "))}return{...t,...o}}const DR=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],Dt=DR.reduce((t,e)=>{const o=x.forwardRef((n,i)=>{const{asChild:r,...s}=n,l=r?rf:e;return x.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),x.createElement(l,ot({},s,{ref:i}))});return o.displayName=`Primitive.${e}`,{...t,[e]:o}},{});function BR(t,e){t&&pr.flushSync(()=>t.dispatchEvent(e))}function GR(t,e=globalThis?.document){const o=Yn(t);x.useEffect(()=>{const n=i=>{i.key==="Escape"&&o(i)};return e.addEventListener("keydown",n),()=>e.removeEventListener("keydown",n)},[o,e])}const _y="dismissableLayer.update",UR="dismissableLayer.pointerDownOutside",NR="dismissableLayer.focusOutside";let u0;const LR=x.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),$R=x.forwardRef((t,e)=>{var o;const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:i,onPointerDownOutside:r,onFocusOutside:s,onInteractOutside:l,onDismiss:a,...c}=t,u=x.useContext(LR),[p,y]=x.useState(null),d=(o=p?.ownerDocument)!==null&&o!==void 0?o:globalThis?.document,[,g]=x.useState({}),f=Us(e,S=>y(S)),b=Array.from(u.layers),[h]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),m=b.indexOf(h),k=p?b.indexOf(p):-1,w=u.layersWithOutsidePointerEventsDisabled.size>0,v=k>=m,E=WR(S=>{const C=S.target,_=[...u.branches].some(D=>D.contains(C));!v||_||(r?.(S),l?.(S),S.defaultPrevented||a?.())},d),z=HR(S=>{const C=S.target;[...u.branches].some(D=>D.contains(C))||(s?.(S),l?.(S),S.defaultPrevented||a?.())},d);return GR(S=>{k===u.layers.size-1&&(i?.(S),!S.defaultPrevented&&a&&(S.preventDefault(),a()))},d),x.useEffect(()=>{if(p)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(u0=d.body.style.pointerEvents,d.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(p)),u.layers.add(p),p0(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(d.body.style.pointerEvents=u0)}},[p,d,n,u]),x.useEffect(()=>()=>{p&&(u.layers.delete(p),u.layersWithOutsidePointerEventsDisabled.delete(p),p0())},[p,u]),x.useEffect(()=>{const S=()=>g({});return document.addEventListener(_y,S),()=>document.removeEventListener(_y,S)},[]),x.createElement(Dt.div,ot({},c,{ref:f,style:{pointerEvents:w?v?"auto":"none":void 0,...t.style},onFocusCapture:Hi(t.onFocusCapture,z.onFocusCapture),onBlurCapture:Hi(t.onBlurCapture,z.onBlurCapture),onPointerDownCapture:Hi(t.onPointerDownCapture,E.onPointerDownCapture)}))});function WR(t,e=globalThis?.document){const o=Yn(t),n=x.useRef(!1),i=x.useRef(()=>{});return x.useEffect(()=>{const r=l=>{if(l.target&&!n.current){let c=function(){qk(UR,o,a,{discrete:!0})};const a={originalEvent:l};l.pointerType==="touch"?(e.removeEventListener("click",i.current),i.current=c,e.addEventListener("click",i.current,{once:!0})):c()}else e.removeEventListener("click",i.current);n.current=!1},s=window.setTimeout(()=>{e.addEventListener("pointerdown",r)},0);return()=>{window.clearTimeout(s),e.removeEventListener("pointerdown",r),e.removeEventListener("click",i.current)}},[e,o]),{onPointerDownCapture:()=>n.current=!0}}function HR(t,e=globalThis?.document){const o=Yn(t),n=x.useRef(!1);return x.useEffect(()=>{const i=r=>{r.target&&!n.current&&qk(NR,o,{originalEvent:r},{discrete:!1})};return e.addEventListener("focusin",i),()=>e.removeEventListener("focusin",i)},[e,o]),{onFocusCapture:()=>n.current=!0,onBlurCapture:()=>n.current=!1}}function p0(){const t=new CustomEvent(_y);document.dispatchEvent(t)}function qk(t,e,o,{discrete:n}){const i=o.originalEvent.target,r=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:o});e&&i.addEventListener(t,e,{once:!0}),n?BR(i,r):i.dispatchEvent(r)}const Fu="focusScope.autoFocusOnMount",Mu="focusScope.autoFocusOnUnmount",y0={bubbles:!1,cancelable:!0},XR=x.forwardRef((t,e)=>{const{loop:o=!1,trapped:n=!1,onMountAutoFocus:i,onUnmountAutoFocus:r,...s}=t,[l,a]=x.useState(null),c=Yn(i),u=Yn(r),p=x.useRef(null),y=Us(e,f=>a(f)),d=x.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;x.useEffect(()=>{if(n){let f=function(k){if(d.paused||!l)return;const w=k.target;l.contains(w)?p.current=w:Bo(p.current,{select:!0})},b=function(k){if(d.paused||!l)return;const w=k.relatedTarget;w!==null&&(l.contains(w)||Bo(p.current,{select:!0}))},h=function(k){if(document.activeElement===document.body)for(const v of k)v.removedNodes.length>0&&Bo(l)};document.addEventListener("focusin",f),document.addEventListener("focusout",b);const m=new MutationObserver(h);return l&&m.observe(l,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",f),document.removeEventListener("focusout",b),m.disconnect()}}},[n,l,d.paused]),x.useEffect(()=>{if(l){f0.add(d);const f=document.activeElement;if(!l.contains(f)){const h=new CustomEvent(Fu,y0);l.addEventListener(Fu,c),l.dispatchEvent(h),h.defaultPrevented||(VR(JR(Yk(l)),{select:!0}),document.activeElement===f&&Bo(l))}return()=>{l.removeEventListener(Fu,c),setTimeout(()=>{const h=new CustomEvent(Mu,y0);l.addEventListener(Mu,u),l.dispatchEvent(h),h.defaultPrevented||Bo(f??document.body,{select:!0}),l.removeEventListener(Mu,u),f0.remove(d)},0)}}},[l,c,u,d]);const g=x.useCallback(f=>{if(!o&&!n||d.paused)return;const b=f.key==="Tab"&&!f.altKey&&!f.ctrlKey&&!f.metaKey,h=document.activeElement;if(b&&h){const m=f.currentTarget,[k,w]=qR(m);k&&w?!f.shiftKey&&h===w?(f.preventDefault(),o&&Bo(k,{select:!0})):f.shiftKey&&h===k&&(f.preventDefault(),o&&Bo(w,{select:!0})):h===m&&f.preventDefault()}},[o,n,d.paused]);return x.createElement(Dt.div,ot({tabIndex:-1},s,{ref:y,onKeyDown:g}))});function VR(t,{select:e=!1}={}){const o=document.activeElement;for(const n of t)if(Bo(n,{select:e}),document.activeElement!==o)return}function qR(t){const e=Yk(t),o=d0(e,t),n=d0(e.reverse(),t);return[o,n]}function Yk(t){const e=[],o=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>{const i=n.tagName==="INPUT"&&n.type==="hidden";return n.disabled||n.hidden||i?NodeFilter.FILTER_SKIP:n.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;o.nextNode();)e.push(o.currentNode);return e}function d0(t,e){for(const o of t)if(!YR(o,{upTo:e}))return o}function YR(t,{upTo:e}){if(getComputedStyle(t).visibility==="hidden")return!0;for(;t;){if(e!==void 0&&t===e)return!1;if(getComputedStyle(t).display==="none")return!0;t=t.parentElement}return!1}function QR(t){return t instanceof HTMLInputElement&&"select"in t}function Bo(t,{select:e=!1}={}){if(t&&t.focus){const o=document.activeElement;t.focus({preventScroll:!0}),t!==o&&QR(t)&&e&&t.select()}}const f0=KR();function KR(){let t=[];return{add(e){const o=t[0];e!==o&&o?.pause(),t=h0(t,e),t.unshift(e)},remove(e){var o;t=h0(t,e),(o=t[0])===null||o===void 0||o.resume()}}}function h0(t,e){const o=[...t],n=o.indexOf(e);return n!==-1&&o.splice(n,1),o}function JR(t){return t.filter(e=>e.tagName!=="A")}const e6=x.forwardRef((t,e)=>{var o;const{container:n=globalThis==null||(o=globalThis.document)===null||o===void 0?void 0:o.body,...i}=t;return n?ex.createPortal(x.createElement(Dt.div,ot({},i,{ref:e})),n):null});function t6(t,e){return x.useReducer((o,n)=>{const i=e[o][n];return i??o},t)}const pc=t=>{const{present:e,children:o}=t,n=o6(e),i=typeof o=="function"?o({present:n.isPresent}):x.Children.only(o),r=Us(n.ref,i.ref);return typeof o=="function"||n.isPresent?x.cloneElement(i,{ref:r}):null};pc.displayName="Presence";function o6(t){const[e,o]=x.useState(),n=x.useRef({}),i=x.useRef(t),r=x.useRef("none"),s=t?"mounted":"unmounted",[l,a]=t6(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return x.useEffect(()=>{const c=zl(n.current);r.current=l==="mounted"?c:"none"},[l]),Sy(()=>{const c=n.current,u=i.current;if(u!==t){const y=r.current,d=zl(c);t?a("MOUNT"):d==="none"||c?.display==="none"?a("UNMOUNT"):a(u&&y!==d?"ANIMATION_OUT":"UNMOUNT"),i.current=t}},[t,a]),Sy(()=>{if(e){const c=p=>{const d=zl(n.current).includes(p.animationName);p.target===e&&d&&pr.flushSync(()=>a("ANIMATION_END"))},u=p=>{p.target===e&&(r.current=zl(n.current))};return e.addEventListener("animationstart",u),e.addEventListener("animationcancel",c),e.addEventListener("animationend",c),()=>{e.removeEventListener("animationstart",u),e.removeEventListener("animationcancel",c),e.removeEventListener("animationend",c)}}else a("ANIMATION_END")},[e,a]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:x.useCallback(c=>{c&&(n.current=getComputedStyle(c)),o(c)},[])}}function zl(t){return t?.animationName||"none"}let Ou=0;function n6(){x.useEffect(()=>{var t,e;const o=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",(t=o[0])!==null&&t!==void 0?t:g0()),document.body.insertAdjacentElement("beforeend",(e=o[1])!==null&&e!==void 0?e:g0()),Ou++,()=>{Ou===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(n=>n.remove()),Ou--}},[])}function g0(){const t=document.createElement("span");return t.setAttribute("data-radix-focus-guard",""),t.tabIndex=0,t.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",t}var Ve=function(){return Ve=Object.assign||function(e){for(var o,n=1,i=arguments.length;n<i;n++){o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},Ve.apply(this,arguments)};function sf(t,e){var o={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(o[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(o[n[i]]=t[n[i]]);return o}function Qk(t,e,o){if(o||arguments.length===2)for(var n=0,i=e.length,r;n<i;n++)(r||!(n in e))&&(r||(r=Array.prototype.slice.call(e,0,n)),r[n]=e[n]);return t.concat(r||Array.prototype.slice.call(e))}var ns="right-scroll-bar-position",is="width-before-scroll-bar",i6="with-scroll-bars-hidden",r6="--removed-body-scroll-bar-size";function Du(t,e){return typeof t=="function"?t(e):t&&(t.current=e),t}function s6(t,e){var o=x.useState(function(){return{value:t,callback:e,facade:{get current(){return o.value},set current(n){var i=o.value;i!==n&&(o.value=n,o.callback(n,i))}}}})[0];return o.callback=e,o.facade}var l6=typeof window<"u"?x.useLayoutEffect:x.useEffect,m0=new WeakMap;function Kk(t,e){var o=s6(null,function(n){return t.forEach(function(i){return Du(i,n)})});return l6(function(){var n=m0.get(o);if(n){var i=new Set(n),r=new Set(t),s=o.current;i.forEach(function(l){r.has(l)||Du(l,null)}),r.forEach(function(l){i.has(l)||Du(l,s)})}m0.set(o,t)},[t]),o}function a6(t){return t}function c6(t,e){e===void 0&&(e=a6);var o=[],n=!1,i={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return o.length?o[o.length-1]:t},useMedium:function(r){var s=e(r,n);return o.push(s),function(){o=o.filter(function(l){return l!==s})}},assignSyncMedium:function(r){for(n=!0;o.length;){var s=o;o=[],s.forEach(r)}o={push:function(l){return r(l)},filter:function(){return o}}},assignMedium:function(r){n=!0;var s=[];if(o.length){var l=o;o=[],l.forEach(r),s=o}var a=function(){var u=s;s=[],u.forEach(r)},c=function(){return Promise.resolve().then(a)};c(),o={push:function(u){s.push(u),c()},filter:function(u){return s=s.filter(u),o}}}};return i}function Jk(t){t===void 0&&(t={});var e=c6(null);return e.options=Ve({async:!0,ssr:!1},t),e}var ew=function(t){var e=t.sideCar,o=sf(t,["sideCar"]);if(!e)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var n=e.read();if(!n)throw new Error("Sidecar medium not found");return x.createElement(n,Ve({},o))};ew.isSideCarExport=!0;function tw(t,e){return t.useMedium(e),ew}var ow=Jk(),Bu=function(){},yc=x.forwardRef(function(t,e){var o=x.useRef(null),n=x.useState({onScrollCapture:Bu,onWheelCapture:Bu,onTouchMoveCapture:Bu}),i=n[0],r=n[1],s=t.forwardProps,l=t.children,a=t.className,c=t.removeScrollBar,u=t.enabled,p=t.shards,y=t.sideCar,d=t.noIsolation,g=t.inert,f=t.allowPinchZoom,b=t.as,h=b===void 0?"div":b,m=sf(t,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),k=y,w=Kk([o,e]),v=Ve(Ve({},m),i);return x.createElement(x.Fragment,null,u&&x.createElement(k,{sideCar:ow,removeScrollBar:c,shards:p,noIsolation:d,inert:g,setCallbacks:r,allowPinchZoom:!!f,lockRef:o}),s?x.cloneElement(x.Children.only(l),Ve(Ve({},v),{ref:w})):x.createElement(h,Ve({},v,{className:a,ref:w}),l))});yc.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};yc.classNames={fullWidth:is,zeroRight:ns};var u6=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function p6(){if(!document)return null;var t=document.createElement("style");t.type="text/css";var e=u6();return e&&t.setAttribute("nonce",e),t}function y6(t,e){t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}function d6(t){var e=document.head||document.getElementsByTagName("head")[0];e.appendChild(t)}var f6=function(){var t=0,e=null;return{add:function(o){t==0&&(e=p6())&&(y6(e,o),d6(e)),t++},remove:function(){t--,!t&&e&&(e.parentNode&&e.parentNode.removeChild(e),e=null)}}},h6=function(){var t=f6();return function(e,o){x.useEffect(function(){return t.add(e),function(){t.remove()}},[e&&o])}},lf=function(){var t=h6(),e=function(o){var n=o.styles,i=o.dynamic;return t(n,i),null};return e},g6={left:0,top:0,right:0,gap:0},Gu=function(t){return parseInt(t||"",10)||0},m6=function(t){var e=window.getComputedStyle(document.body),o=e[t==="padding"?"paddingLeft":"marginLeft"],n=e[t==="padding"?"paddingTop":"marginTop"],i=e[t==="padding"?"paddingRight":"marginRight"];return[Gu(o),Gu(n),Gu(i)]},b6=function(t){if(t===void 0&&(t="margin"),typeof window>"u")return g6;var e=m6(t),o=document.documentElement.clientWidth,n=window.innerWidth;return{left:e[0],top:e[1],right:e[2],gap:Math.max(0,n-o+e[2]-e[0])}},x6=lf(),Xi="data-scroll-locked",k6=function(t,e,o,n){var i=t.left,r=t.top,s=t.right,l=t.gap;return o===void 0&&(o="margin"),`
  .`.concat(i6,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(l,"px ").concat(n,`;
  }
  body[`).concat(Xi,`] {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([e&&"position: relative ".concat(n,";"),o==="margin"&&`
    padding-left: `.concat(i,`px;
    padding-top: `).concat(r,`px;
    padding-right: `).concat(s,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(l,"px ").concat(n,`;
    `),o==="padding"&&"padding-right: ".concat(l,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(ns,` {
    right: `).concat(l,"px ").concat(n,`;
  }
  
  .`).concat(is,` {
    margin-right: `).concat(l,"px ").concat(n,`;
  }
  
  .`).concat(ns," .").concat(ns,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(is," .").concat(is,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body[`).concat(Xi,`] {
    `).concat(r6,": ").concat(l,`px;
  }
`)},b0=function(){var t=parseInt(document.body.getAttribute(Xi)||"0",10);return isFinite(t)?t:0},w6=function(){x.useEffect(function(){return document.body.setAttribute(Xi,(b0()+1).toString()),function(){var t=b0()-1;t<=0?document.body.removeAttribute(Xi):document.body.setAttribute(Xi,t.toString())}},[])},nw=function(t){var e=t.noRelative,o=t.noImportant,n=t.gapMode,i=n===void 0?"margin":n;w6();var r=x.useMemo(function(){return b6(i)},[i]);return x.createElement(x6,{styles:k6(r,!e,i,o?"":"!important")})},Cy=!1;if(typeof window<"u")try{var Sl=Object.defineProperty({},"passive",{get:function(){return Cy=!0,!0}});window.addEventListener("test",Sl,Sl),window.removeEventListener("test",Sl,Sl)}catch{Cy=!1}var di=Cy?{passive:!1}:!1,v6=function(t){return t.tagName==="TEXTAREA"},iw=function(t,e){var o=window.getComputedStyle(t);return o[e]!=="hidden"&&!(o.overflowY===o.overflowX&&!v6(t)&&o[e]==="visible")},z6=function(t){return iw(t,"overflowY")},S6=function(t){return iw(t,"overflowX")},x0=function(t,e){var o=e;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var n=rw(t,o);if(n){var i=sw(t,o),r=i[1],s=i[2];if(r>s)return!0}o=o.parentNode}while(o&&o!==document.body);return!1},E6=function(t){var e=t.scrollTop,o=t.scrollHeight,n=t.clientHeight;return[e,o,n]},_6=function(t){var e=t.scrollLeft,o=t.scrollWidth,n=t.clientWidth;return[e,o,n]},rw=function(t,e){return t==="v"?z6(e):S6(e)},sw=function(t,e){return t==="v"?E6(e):_6(e)},C6=function(t,e){return t==="h"&&e==="rtl"?-1:1},Z6=function(t,e,o,n,i){var r=C6(t,window.getComputedStyle(e).direction),s=r*n,l=o.target,a=e.contains(l),c=!1,u=s>0,p=0,y=0;do{var d=sw(t,l),g=d[0],f=d[1],b=d[2],h=f-b-r*g;(g||h)&&rw(t,l)&&(p+=h,y+=g),l=l.parentNode}while(!a&&l!==document.body||a&&(e.contains(l)||e===l));return(u&&(p===0||!i)||!u&&(y===0||!i))&&(c=!0),c},El=function(t){return"changedTouches"in t?[t.changedTouches[0].clientX,t.changedTouches[0].clientY]:[0,0]},k0=function(t){return[t.deltaX,t.deltaY]},w0=function(t){return t&&"current"in t?t.current:t},A6=function(t,e){return t[0]===e[0]&&t[1]===e[1]},R6=function(t){return`
  .block-interactivity-`.concat(t,` {pointer-events: none;}
  .allow-interactivity-`).concat(t,` {pointer-events: all;}
`)},P6=0,fi=[];function T6(t){var e=x.useRef([]),o=x.useRef([0,0]),n=x.useRef(),i=x.useState(P6++)[0],r=x.useState(function(){return lf()})[0],s=x.useRef(t);x.useEffect(function(){s.current=t},[t]),x.useEffect(function(){if(t.inert){document.body.classList.add("block-interactivity-".concat(i));var f=Qk([t.lockRef.current],(t.shards||[]).map(w0),!0).filter(Boolean);return f.forEach(function(b){return b.classList.add("allow-interactivity-".concat(i))}),function(){document.body.classList.remove("block-interactivity-".concat(i)),f.forEach(function(b){return b.classList.remove("allow-interactivity-".concat(i))})}}},[t.inert,t.lockRef.current,t.shards]);var l=x.useCallback(function(f,b){if("touches"in f&&f.touches.length===2)return!s.current.allowPinchZoom;var h=El(f),m=o.current,k="deltaX"in f?f.deltaX:m[0]-h[0],w="deltaY"in f?f.deltaY:m[1]-h[1],v,E=f.target,z=Math.abs(k)>Math.abs(w)?"h":"v";if("touches"in f&&z==="h"&&E.type==="range")return!1;var S=x0(z,E);if(!S)return!0;if(S?v=z:(v=z==="v"?"h":"v",S=x0(z,E)),!S)return!1;if(!n.current&&"changedTouches"in f&&(k||w)&&(n.current=v),!v)return!0;var C=n.current||v;return Z6(C,b,f,C==="h"?k:w,!0)},[]),a=x.useCallback(function(f){var b=f;if(!(!fi.length||fi[fi.length-1]!==r)){var h="deltaY"in b?k0(b):El(b),m=e.current.filter(function(v){return v.name===b.type&&v.target===b.target&&A6(v.delta,h)})[0];if(m&&m.should){b.cancelable&&b.preventDefault();return}if(!m){var k=(s.current.shards||[]).map(w0).filter(Boolean).filter(function(v){return v.contains(b.target)}),w=k.length>0?l(b,k[0]):!s.current.noIsolation;w&&b.cancelable&&b.preventDefault()}}},[]),c=x.useCallback(function(f,b,h,m){var k={name:f,delta:b,target:h,should:m};e.current.push(k),setTimeout(function(){e.current=e.current.filter(function(w){return w!==k})},1)},[]),u=x.useCallback(function(f){o.current=El(f),n.current=void 0},[]),p=x.useCallback(function(f){c(f.type,k0(f),f.target,l(f,t.lockRef.current))},[]),y=x.useCallback(function(f){c(f.type,El(f),f.target,l(f,t.lockRef.current))},[]);x.useEffect(function(){return fi.push(r),t.setCallbacks({onScrollCapture:p,onWheelCapture:p,onTouchMoveCapture:y}),document.addEventListener("wheel",a,di),document.addEventListener("touchmove",a,di),document.addEventListener("touchstart",u,di),function(){fi=fi.filter(function(f){return f!==r}),document.removeEventListener("wheel",a,di),document.removeEventListener("touchmove",a,di),document.removeEventListener("touchstart",u,di)}},[]);var d=t.removeScrollBar,g=t.inert;return x.createElement(x.Fragment,null,g?x.createElement(r,{styles:R6(i)}):null,d?x.createElement(nw,{gapMode:"margin"}):null)}const j6=tw(ow,T6);var lw=x.forwardRef(function(t,e){return x.createElement(yc,Ve({},t,{ref:e,sideCar:j6}))});lw.classNames=yc.classNames;var I6=function(t){if(typeof document>"u")return null;var e=Array.isArray(t)?t[0]:t;return e.ownerDocument.body},hi=new WeakMap,_l=new WeakMap,Cl={},Uu=0,aw=function(t){return t&&(t.host||aw(t.parentNode))},F6=function(t,e){return e.map(function(o){if(t.contains(o))return o;var n=aw(o);return n&&t.contains(n)?n:(console.error("aria-hidden",o,"in not contained inside",t,". Doing nothing"),null)}).filter(function(o){return!!o})},M6=function(t,e,o,n){var i=F6(e,Array.isArray(t)?t:[t]);Cl[o]||(Cl[o]=new WeakMap);var r=Cl[o],s=[],l=new Set,a=new Set(i),c=function(p){!p||l.has(p)||(l.add(p),c(p.parentNode))};i.forEach(c);var u=function(p){!p||a.has(p)||Array.prototype.forEach.call(p.children,function(y){if(l.has(y))u(y);else try{var d=y.getAttribute(n),g=d!==null&&d!=="false",f=(hi.get(y)||0)+1,b=(r.get(y)||0)+1;hi.set(y,f),r.set(y,b),s.push(y),f===1&&g&&_l.set(y,!0),b===1&&y.setAttribute(o,"true"),g||y.setAttribute(n,"true")}catch(h){console.error("aria-hidden: cannot operate on ",y,h)}})};return u(e),l.clear(),Uu++,function(){s.forEach(function(p){var y=hi.get(p)-1,d=r.get(p)-1;hi.set(p,y),r.set(p,d),y||(_l.has(p)||p.removeAttribute(n),_l.delete(p)),d||p.removeAttribute(o)}),Uu--,Uu||(hi=new WeakMap,hi=new WeakMap,_l=new WeakMap,Cl={})}},af=function(t,e,o){o===void 0&&(o="data-aria-hidden");var n=Array.from(Array.isArray(t)?t:[t]),i=I6(t);return i?(n.push.apply(n,Array.from(i.querySelectorAll("[aria-live]"))),M6(n,i,o,"aria-hidden")):function(){return null}};const cw="Dialog",[uw,rI]=AR(cw),[O6,li]=uw(cw),D6=t=>{const{__scopeDialog:e,children:o,open:n,defaultOpen:i,onOpenChange:r,modal:s=!0}=t,l=x.useRef(null),a=x.useRef(null),[c=!1,u]=jR({prop:n,defaultProp:i,onChange:r});return x.createElement(O6,{scope:e,triggerRef:l,contentRef:a,contentId:Iu(),titleId:Iu(),descriptionId:Iu(),open:c,onOpenChange:u,onOpenToggle:x.useCallback(()=>u(p=>!p),[u]),modal:s},o)},pw="DialogPortal",[B6,yw]=uw(pw,{forceMount:void 0}),G6=t=>{const{__scopeDialog:e,forceMount:o,children:n,container:i}=t,r=li(pw,e);return x.createElement(B6,{scope:e,forceMount:o},x.Children.map(n,s=>x.createElement(pc,{present:o||r.open},x.createElement(e6,{asChild:!0,container:i},s))))},Zy="DialogOverlay",U6=x.forwardRef((t,e)=>{const o=yw(Zy,t.__scopeDialog),{forceMount:n=o.forceMount,...i}=t,r=li(Zy,t.__scopeDialog);return r.modal?x.createElement(pc,{present:n||r.open},x.createElement(N6,ot({},i,{ref:e}))):null}),N6=x.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,i=li(Zy,o);return x.createElement(lw,{as:rf,allowPinchZoom:!0,shards:[i.contentRef]},x.createElement(Dt.div,ot({"data-state":fw(i.open)},n,{ref:e,style:{pointerEvents:"auto",...n.style}})))}),Ps="DialogContent",L6=x.forwardRef((t,e)=>{const o=yw(Ps,t.__scopeDialog),{forceMount:n=o.forceMount,...i}=t,r=li(Ps,t.__scopeDialog);return x.createElement(pc,{present:n||r.open},r.modal?x.createElement($6,ot({},i,{ref:e})):x.createElement(W6,ot({},i,{ref:e})))}),$6=x.forwardRef((t,e)=>{const o=li(Ps,t.__scopeDialog),n=x.useRef(null),i=Us(e,o.contentRef,n);return x.useEffect(()=>{const r=n.current;if(r)return af(r)},[]),x.createElement(dw,ot({},t,{ref:i,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:Hi(t.onCloseAutoFocus,r=>{var s;r.preventDefault(),(s=o.triggerRef.current)===null||s===void 0||s.focus()}),onPointerDownOutside:Hi(t.onPointerDownOutside,r=>{const s=r.detail.originalEvent,l=s.button===0&&s.ctrlKey===!0;(s.button===2||l)&&r.preventDefault()}),onFocusOutside:Hi(t.onFocusOutside,r=>r.preventDefault())}))}),W6=x.forwardRef((t,e)=>{const o=li(Ps,t.__scopeDialog),n=x.useRef(!1),i=x.useRef(!1);return x.createElement(dw,ot({},t,{ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{var s;if((s=t.onCloseAutoFocus)===null||s===void 0||s.call(t,r),!r.defaultPrevented){var l;n.current||(l=o.triggerRef.current)===null||l===void 0||l.focus(),r.preventDefault()}n.current=!1,i.current=!1},onInteractOutside:r=>{var s,l;(s=t.onInteractOutside)===null||s===void 0||s.call(t,r),r.defaultPrevented||(n.current=!0,r.detail.originalEvent.type==="pointerdown"&&(i.current=!0));const a=r.target;((l=o.triggerRef.current)===null||l===void 0?void 0:l.contains(a))&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&i.current&&r.preventDefault()}}))}),dw=x.forwardRef((t,e)=>{const{__scopeDialog:o,trapFocus:n,onOpenAutoFocus:i,onCloseAutoFocus:r,...s}=t,l=li(Ps,o),a=x.useRef(null),c=Us(e,a);return n6(),x.createElement(x.Fragment,null,x.createElement(XR,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:i,onUnmountAutoFocus:r},x.createElement($R,ot({role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":fw(l.open)},s,{ref:c,onDismiss:()=>l.onOpenChange(!1)}))),!1)});function fw(t){return t?"open":"closed"}const H6=D6,X6=G6,V6=U6,q6=L6;var Mr='[cmdk-group=""]',Nu='[cmdk-group-items=""]',Y6='[cmdk-group-heading=""]',cf='[cmdk-item=""]',v0=`${cf}:not([aria-disabled="true"])`,Ay="cmdk-item-select",jn="data-value",Q6=(t,e,o)=>CR(t,e,o),hw=x.createContext(void 0),Ns=()=>x.useContext(hw),gw=x.createContext(void 0),uf=()=>x.useContext(gw),mw=x.createContext(void 0),bw=x.forwardRef((t,e)=>{let o=zi(()=>{var A,L;return{search:"",value:(L=(A=t.value)!=null?A:t.defaultValue)!=null?L:"",filtered:{count:0,items:new Map,groups:new Set}}}),n=zi(()=>new Set),i=zi(()=>new Map),r=zi(()=>new Map),s=zi(()=>new Set),l=xw(t),{label:a,children:c,value:u,onValueChange:p,filter:y,shouldFilter:d,loop:g,disablePointerSelection:f=!1,vimBindings:b=!0,...h}=t,m=x.useId(),k=x.useId(),w=x.useId(),v=x.useRef(null),E=aP();Qn(()=>{if(u!==void 0){let A=u.trim();o.current.value=A,z.emit()}},[u]),Qn(()=>{E(6,M)},[]);let z=x.useMemo(()=>({subscribe:A=>(s.current.add(A),()=>s.current.delete(A)),snapshot:()=>o.current,setState:(A,L,X)=>{var G,K,re;if(!Object.is(o.current[A],L)){if(o.current[A]=L,A==="search")B(),_(),E(1,D);else if(A==="value"&&(X||E(5,M),((G=l.current)==null?void 0:G.value)!==void 0)){let Ze=L??"";(re=(K=l.current).onValueChange)==null||re.call(K,Ze);return}z.emit()}},emit:()=>{s.current.forEach(A=>A())}}),[]),S=x.useMemo(()=>({value:(A,L,X)=>{var G;L!==((G=r.current.get(A))==null?void 0:G.value)&&(r.current.set(A,{value:L,keywords:X}),o.current.filtered.items.set(A,C(L,X)),E(2,()=>{_(),z.emit()}))},item:(A,L)=>(n.current.add(A),L&&(i.current.has(L)?i.current.get(L).add(A):i.current.set(L,new Set([A]))),E(3,()=>{B(),_(),o.current.value||D(),z.emit()}),()=>{r.current.delete(A),n.current.delete(A),o.current.filtered.items.delete(A);let X=j();E(4,()=>{B(),X?.getAttribute("id")===A&&D(),z.emit()})}),group:A=>(i.current.has(A)||i.current.set(A,new Set),()=>{r.current.delete(A),i.current.delete(A)}),filter:()=>l.current.shouldFilter,label:a||t["aria-label"],disablePointerSelection:f,listId:m,inputId:w,labelId:k,listInnerRef:v}),[]);function C(A,L){var X,G;let K=(G=(X=l.current)==null?void 0:X.filter)!=null?G:Q6;return A?K(A,o.current.search,L):0}function _(){if(!o.current.search||l.current.shouldFilter===!1)return;let A=o.current.filtered.items,L=[];o.current.filtered.groups.forEach(G=>{let K=i.current.get(G),re=0;K.forEach(Ze=>{let Ke=A.get(Ze);re=Math.max(Ke,re)}),L.push([G,re])});let X=v.current;W().sort((G,K)=>{var re,Ze;let Ke=G.getAttribute("id"),yo=K.getAttribute("id");return((re=A.get(yo))!=null?re:0)-((Ze=A.get(Ke))!=null?Ze:0)}).forEach(G=>{let K=G.closest(Nu);K?K.appendChild(G.parentElement===K?G:G.closest(`${Nu} > *`)):X.appendChild(G.parentElement===X?G:G.closest(`${Nu} > *`))}),L.sort((G,K)=>K[1]-G[1]).forEach(G=>{let K=v.current.querySelector(`${Mr}[${jn}="${encodeURIComponent(G[0])}"]`);K?.parentElement.appendChild(K)})}function D(){let A=W().find(X=>X.getAttribute("aria-disabled")!=="true"),L=A?.getAttribute(jn);z.setState("value",L||void 0)}function B(){var A,L,X,G;if(!o.current.search||l.current.shouldFilter===!1){o.current.filtered.count=n.current.size;return}o.current.filtered.groups=new Set;let K=0;for(let re of n.current){let Ze=(L=(A=r.current.get(re))==null?void 0:A.value)!=null?L:"",Ke=(G=(X=r.current.get(re))==null?void 0:X.keywords)!=null?G:[],yo=C(Ze,Ke);o.current.filtered.items.set(re,yo),yo>0&&K++}for(let[re,Ze]of i.current)for(let Ke of Ze)if(o.current.filtered.items.get(Ke)>0){o.current.filtered.groups.add(re);break}o.current.filtered.count=K}function M(){var A,L,X;let G=j();G&&(((A=G.parentElement)==null?void 0:A.firstChild)===G&&((X=(L=G.closest(Mr))==null?void 0:L.querySelector(Y6))==null||X.scrollIntoView({block:"nearest"})),G.scrollIntoView({block:"nearest"}))}function j(){var A;return(A=v.current)==null?void 0:A.querySelector(`${cf}[aria-selected="true"]`)}function W(){var A;return Array.from((A=v.current)==null?void 0:A.querySelectorAll(v0))}function H(A){let L=W()[A];L&&z.setState("value",L.getAttribute(jn))}function F(A){var L;let X=j(),G=W(),K=G.findIndex(Ze=>Ze===X),re=G[K+A];(L=l.current)!=null&&L.loop&&(re=K+A<0?G[G.length-1]:K+A===G.length?G[0]:G[K+A]),re&&z.setState("value",re.getAttribute(jn))}function Z(A){let L=j(),X=L?.closest(Mr),G;for(;X&&!G;)X=A>0?sP(X,Mr):lP(X,Mr),G=X?.querySelector(v0);G?z.setState("value",G.getAttribute(jn)):F(A)}let R=()=>H(W().length-1),T=A=>{A.preventDefault(),A.metaKey?R():A.altKey?Z(1):F(1)},Q=A=>{A.preventDefault(),A.metaKey?H(0):A.altKey?Z(-1):F(-1)};return x.createElement(Dt.div,{ref:e,tabIndex:-1,...h,"cmdk-root":"",onKeyDown:A=>{var L;if((L=h.onKeyDown)==null||L.call(h,A),!A.defaultPrevented)switch(A.key){case"n":case"j":{b&&A.ctrlKey&&T(A);break}case"ArrowDown":{T(A);break}case"p":case"k":{b&&A.ctrlKey&&Q(A);break}case"ArrowUp":{Q(A);break}case"Home":{A.preventDefault(),H(0);break}case"End":{A.preventDefault(),R();break}case"Enter":if(!A.nativeEvent.isComposing&&A.keyCode!==229){A.preventDefault();let X=j();if(X){let G=new Event(Ay);X.dispatchEvent(G)}}}}},x.createElement("label",{"cmdk-label":"",htmlFor:S.inputId,id:S.labelId,style:uP},a),dc(t,A=>x.createElement(gw.Provider,{value:z},x.createElement(hw.Provider,{value:S},A))))}),K6=x.forwardRef((t,e)=>{var o,n;let i=x.useId(),r=x.useRef(null),s=x.useContext(mw),l=Ns(),a=xw(t),c=(n=(o=a.current)==null?void 0:o.forceMount)!=null?n:s?.forceMount;Qn(()=>{if(!c)return l.item(i,s?.id)},[c]);let u=kw(i,r,[t.value,t.children,r],t.keywords),p=uf(),y=Kn(E=>E.value&&E.value===u.current),d=Kn(E=>c||l.filter()===!1?!0:E.search?E.filtered.items.get(i)>0:!0);x.useEffect(()=>{let E=r.current;if(!(!E||t.disabled))return E.addEventListener(Ay,g),()=>E.removeEventListener(Ay,g)},[d,t.onSelect,t.disabled]);function g(){var E,z;f(),(z=(E=a.current).onSelect)==null||z.call(E,u.current)}function f(){p.setState("value",u.current,!0)}if(!d)return null;let{disabled:b,value:h,onSelect:m,forceMount:k,keywords:w,...v}=t;return x.createElement(Dt.div,{ref:Ts([r,e]),...v,id:i,"cmdk-item":"",role:"option","aria-disabled":!!b,"aria-selected":!!y,"data-disabled":!!b,"data-selected":!!y,onPointerMove:b||l.disablePointerSelection?void 0:f,onClick:b?void 0:g},t.children)}),J6=x.forwardRef((t,e)=>{let{heading:o,children:n,forceMount:i,...r}=t,s=x.useId(),l=x.useRef(null),a=x.useRef(null),c=x.useId(),u=Ns(),p=Kn(d=>i||u.filter()===!1?!0:d.search?d.filtered.groups.has(s):!0);Qn(()=>u.group(s),[]),kw(s,l,[t.value,t.heading,a]);let y=x.useMemo(()=>({id:s,forceMount:i}),[i]);return x.createElement(Dt.div,{ref:Ts([l,e]),...r,"cmdk-group":"",role:"presentation",hidden:p?void 0:!0},o&&x.createElement("div",{ref:a,"cmdk-group-heading":"","aria-hidden":!0,id:c},o),dc(t,d=>x.createElement("div",{"cmdk-group-items":"",role:"group","aria-labelledby":o?c:void 0},x.createElement(mw.Provider,{value:y},d))))}),eP=x.forwardRef((t,e)=>{let{alwaysRender:o,...n}=t,i=x.useRef(null),r=Kn(s=>!s.search);return!o&&!r?null:x.createElement(Dt.div,{ref:Ts([i,e]),...n,"cmdk-separator":"",role:"separator"})}),tP=x.forwardRef((t,e)=>{let{onValueChange:o,...n}=t,i=t.value!=null,r=uf(),s=Kn(u=>u.search),l=Kn(u=>u.value),a=Ns(),c=x.useMemo(()=>{var u;let p=(u=a.listInnerRef.current)==null?void 0:u.querySelector(`${cf}[${jn}="${encodeURIComponent(l)}"]`);return p?.getAttribute("id")},[]);return x.useEffect(()=>{t.value!=null&&r.setState("search",t.value)},[t.value]),x.createElement(Dt.input,{ref:e,...n,"cmdk-input":"",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"aria-autocomplete":"list",role:"combobox","aria-expanded":!0,"aria-controls":a.listId,"aria-labelledby":a.labelId,"aria-activedescendant":c,id:a.inputId,type:"text",value:i?t.value:s,onChange:u=>{i||r.setState("search",u.target.value),o?.(u.target.value)}})}),oP=x.forwardRef((t,e)=>{let{children:o,label:n="Suggestions",...i}=t,r=x.useRef(null),s=x.useRef(null),l=Ns();return x.useEffect(()=>{if(s.current&&r.current){let a=s.current,c=r.current,u,p=new ResizeObserver(()=>{u=requestAnimationFrame(()=>{let y=a.offsetHeight;c.style.setProperty("--cmdk-list-height",y.toFixed(1)+"px")})});return p.observe(a),()=>{cancelAnimationFrame(u),p.unobserve(a)}}},[]),x.createElement(Dt.div,{ref:Ts([r,e]),...i,"cmdk-list":"",role:"listbox","aria-label":n,id:l.listId},dc(t,a=>x.createElement("div",{ref:Ts([s,l.listInnerRef]),"cmdk-list-sizer":""},a)))}),nP=x.forwardRef((t,e)=>{let{open:o,onOpenChange:n,overlayClassName:i,contentClassName:r,container:s,...l}=t;return x.createElement(H6,{open:o,onOpenChange:n},x.createElement(X6,{container:s},x.createElement(V6,{"cmdk-overlay":"",className:i}),x.createElement(q6,{"aria-label":t.label,"cmdk-dialog":"",className:r},x.createElement(bw,{ref:e,...l}))))}),iP=x.forwardRef((t,e)=>Kn(o=>o.filtered.count===0)?x.createElement(Dt.div,{ref:e,...t,"cmdk-empty":"",role:"presentation"}):null),rP=x.forwardRef((t,e)=>{let{progress:o,children:n,label:i="Loading...",...r}=t;return x.createElement(Dt.div,{ref:e,...r,"cmdk-loading":"",role:"progressbar","aria-valuenow":o,"aria-valuemin":0,"aria-valuemax":100,"aria-label":i},dc(t,s=>x.createElement("div",{"aria-hidden":!0},s)))}),ht=Object.assign(bw,{List:oP,Item:K6,Input:tP,Group:J6,Separator:eP,Dialog:nP,Empty:iP,Loading:rP});function sP(t,e){let o=t.nextElementSibling;for(;o;){if(o.matches(e))return o;o=o.nextElementSibling}}function lP(t,e){let o=t.previousElementSibling;for(;o;){if(o.matches(e))return o;o=o.previousElementSibling}}function xw(t){let e=x.useRef(t);return Qn(()=>{e.current=t}),e}var Qn=typeof window>"u"?x.useEffect:x.useLayoutEffect;function zi(t){let e=x.useRef();return e.current===void 0&&(e.current=t()),e}function Ts(t){return e=>{t.forEach(o=>{typeof o=="function"?o(e):o!=null&&(o.current=e)})}}function Kn(t){let e=uf(),o=()=>t(e.snapshot());return x.useSyncExternalStore(e.subscribe,o,o)}function kw(t,e,o,n=[]){let i=x.useRef(),r=Ns();return Qn(()=>{var s;let l=(()=>{var c;for(let u of o){if(typeof u=="string")return u.trim();if(typeof u=="object"&&"current"in u)return u.current?(c=u.current.textContent)==null?void 0:c.trim():i.current}})(),a=n.map(c=>c.trim());r.value(t,l,a),(s=e.current)==null||s.setAttribute(jn,l),i.current=l}),i}var aP=()=>{let[t,e]=x.useState(),o=zi(()=>new Map);return Qn(()=>{o.current.forEach(n=>n()),o.current=new Map},[t]),(n,i)=>{o.current.set(n,i),e({})}};function cP(t){let e=t.type;return typeof e=="function"?e(t.props):"render"in e?e.render(t.props):t}function dc({asChild:t,children:e},o){return t&&x.isValidElement(e)?x.cloneElement(cP(e),{ref:e.ref},o(e.props.children)):o(e)}var uP={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"};function ft(t,e,{checkForDefaultPrevented:o=!0}={}){return function(i){if(t?.(i),o===!1||!i.defaultPrevented)return e?.(i)}}function pP(t,e){const o=x.createContext(e),n=r=>{const{children:s,...l}=r,a=x.useMemo(()=>l,Object.values(l));return P.jsx(o.Provider,{value:a,children:s})};n.displayName=t+"Provider";function i(r){const s=x.useContext(o);if(s)return s;if(e!==void 0)return e;throw new Error(`\`${r}\` must be used within \`${t}\``)}return[n,i]}function pf(t,e=[]){let o=[];function n(r,s){const l=x.createContext(s),a=o.length;o=[...o,s];const c=p=>{const{scope:y,children:d,...g}=p,f=y?.[t]?.[a]||l,b=x.useMemo(()=>g,Object.values(g));return P.jsx(f.Provider,{value:b,children:d})};c.displayName=r+"Provider";function u(p,y){const d=y?.[t]?.[a]||l,g=x.useContext(d);if(g)return g;if(s!==void 0)return s;throw new Error(`\`${p}\` must be used within \`${r}\``)}return[c,u]}const i=()=>{const r=o.map(s=>x.createContext(s));return function(l){const a=l?.[t]||r;return x.useMemo(()=>({[`__scope${t}`]:{...l,[t]:a}}),[l,a])}};return i.scopeName=t,[n,yP(i,...e)]}function yP(...t){const e=t[0];if(t.length===1)return e;const o=()=>{const n=t.map(i=>({useScope:i(),scopeName:i.scopeName}));return function(r){const s=n.reduce((l,{useScope:a,scopeName:c})=>{const p=a(r)[`__scope${c}`];return{...l,...p}},{});return x.useMemo(()=>({[`__scope${e.scopeName}`]:s}),[s])}};return o.scopeName=e.scopeName,o}var Jn=globalThis?.document?x.useLayoutEffect:()=>{},dP=Q0.useId||(()=>{}),fP=0;function hP(t){const[e,o]=x.useState(dP());return Jn(()=>{t||o(n=>n??String(fP++))},[t]),t||(e?`radix-${e}`:"")}function ln(t){const e=x.useRef(t);return x.useEffect(()=>{e.current=t}),x.useMemo(()=>(...o)=>e.current?.(...o),[])}function ww({prop:t,defaultProp:e,onChange:o=()=>{}}){const[n,i]=gP({defaultProp:e,onChange:o}),r=t!==void 0,s=r?t:n,l=ln(o),a=x.useCallback(c=>{if(r){const p=typeof c=="function"?c(t):c;p!==t&&l(p)}else i(c)},[r,t,i,l]);return[s,a]}function gP({defaultProp:t,onChange:e}){const o=x.useState(t),[n]=o,i=x.useRef(n),r=ln(e);return x.useEffect(()=>{i.current!==n&&(r(n),i.current=n)},[n,i,r]),o}var mP=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],$e=mP.reduce((t,e)=>{const o=x.forwardRef((n,i)=>{const{asChild:r,...s}=n,l=r?Gs:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),P.jsx(l,{...s,ref:i})});return o.displayName=`Primitive.${e}`,{...t,[e]:o}},{});function bP(t,e){t&&pr.flushSync(()=>t.dispatchEvent(e))}function xP(t,e=globalThis?.document){const o=ln(t);x.useEffect(()=>{const n=i=>{i.key==="Escape"&&o(i)};return e.addEventListener("keydown",n,{capture:!0}),()=>e.removeEventListener("keydown",n,{capture:!0})},[o,e])}var kP="DismissableLayer",Ry="dismissableLayer.update",wP="dismissableLayer.pointerDownOutside",vP="dismissableLayer.focusOutside",z0,vw=x.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),yf=x.forwardRef((t,e)=>{const{disableOutsidePointerEvents:o=!1,onEscapeKeyDown:n,onPointerDownOutside:i,onFocusOutside:r,onInteractOutside:s,onDismiss:l,...a}=t,c=x.useContext(vw),[u,p]=x.useState(null),y=u?.ownerDocument??globalThis?.document,[,d]=x.useState({}),g=Ot(e,z=>p(z)),f=Array.from(c.layers),[b]=[...c.layersWithOutsidePointerEventsDisabled].slice(-1),h=f.indexOf(b),m=u?f.indexOf(u):-1,k=c.layersWithOutsidePointerEventsDisabled.size>0,w=m>=h,v=EP(z=>{const S=z.target,C=[...c.branches].some(_=>_.contains(S));!w||C||(i?.(z),s?.(z),z.defaultPrevented||l?.())},y),E=_P(z=>{const S=z.target;[...c.branches].some(_=>_.contains(S))||(r?.(z),s?.(z),z.defaultPrevented||l?.())},y);return xP(z=>{m===c.layers.size-1&&(n?.(z),!z.defaultPrevented&&l&&(z.preventDefault(),l()))},y),x.useEffect(()=>{if(u)return o&&(c.layersWithOutsidePointerEventsDisabled.size===0&&(z0=y.body.style.pointerEvents,y.body.style.pointerEvents="none"),c.layersWithOutsidePointerEventsDisabled.add(u)),c.layers.add(u),S0(),()=>{o&&c.layersWithOutsidePointerEventsDisabled.size===1&&(y.body.style.pointerEvents=z0)}},[u,y,o,c]),x.useEffect(()=>()=>{u&&(c.layers.delete(u),c.layersWithOutsidePointerEventsDisabled.delete(u),S0())},[u,c]),x.useEffect(()=>{const z=()=>d({});return document.addEventListener(Ry,z),()=>document.removeEventListener(Ry,z)},[]),P.jsx($e.div,{...a,ref:g,style:{pointerEvents:k?w?"auto":"none":void 0,...t.style},onFocusCapture:ft(t.onFocusCapture,E.onFocusCapture),onBlurCapture:ft(t.onBlurCapture,E.onBlurCapture),onPointerDownCapture:ft(t.onPointerDownCapture,v.onPointerDownCapture)})});yf.displayName=kP;var zP="DismissableLayerBranch",SP=x.forwardRef((t,e)=>{const o=x.useContext(vw),n=x.useRef(null),i=Ot(e,n);return x.useEffect(()=>{const r=n.current;if(r)return o.branches.add(r),()=>{o.branches.delete(r)}},[o.branches]),P.jsx($e.div,{...t,ref:i})});SP.displayName=zP;function EP(t,e=globalThis?.document){const o=ln(t),n=x.useRef(!1),i=x.useRef(()=>{});return x.useEffect(()=>{const r=l=>{if(l.target&&!n.current){let a=function(){zw(wP,o,c,{discrete:!0})};const c={originalEvent:l};l.pointerType==="touch"?(e.removeEventListener("click",i.current),i.current=a,e.addEventListener("click",i.current,{once:!0})):a()}else e.removeEventListener("click",i.current);n.current=!1},s=window.setTimeout(()=>{e.addEventListener("pointerdown",r)},0);return()=>{window.clearTimeout(s),e.removeEventListener("pointerdown",r),e.removeEventListener("click",i.current)}},[e,o]),{onPointerDownCapture:()=>n.current=!0}}function _P(t,e=globalThis?.document){const o=ln(t),n=x.useRef(!1);return x.useEffect(()=>{const i=r=>{r.target&&!n.current&&zw(vP,o,{originalEvent:r},{discrete:!1})};return e.addEventListener("focusin",i),()=>e.removeEventListener("focusin",i)},[e,o]),{onFocusCapture:()=>n.current=!0,onBlurCapture:()=>n.current=!1}}function S0(){const t=new CustomEvent(Ry);document.dispatchEvent(t)}function zw(t,e,o,{discrete:n}){const i=o.originalEvent.target,r=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:o});e&&i.addEventListener(t,e,{once:!0}),n?bP(i,r):i.dispatchEvent(r)}var Lu="focusScope.autoFocusOnMount",$u="focusScope.autoFocusOnUnmount",E0={bubbles:!1,cancelable:!0},CP="FocusScope",df=x.forwardRef((t,e)=>{const{loop:o=!1,trapped:n=!1,onMountAutoFocus:i,onUnmountAutoFocus:r,...s}=t,[l,a]=x.useState(null),c=ln(i),u=ln(r),p=x.useRef(null),y=Ot(e,f=>a(f)),d=x.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;x.useEffect(()=>{if(n){let f=function(k){if(d.paused||!l)return;const w=k.target;l.contains(w)?p.current=w:Go(p.current,{select:!0})},b=function(k){if(d.paused||!l)return;const w=k.relatedTarget;w!==null&&(l.contains(w)||Go(p.current,{select:!0}))},h=function(k){if(document.activeElement===document.body)for(const v of k)v.removedNodes.length>0&&Go(l)};document.addEventListener("focusin",f),document.addEventListener("focusout",b);const m=new MutationObserver(h);return l&&m.observe(l,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",f),document.removeEventListener("focusout",b),m.disconnect()}}},[n,l,d.paused]),x.useEffect(()=>{if(l){C0.add(d);const f=document.activeElement;if(!l.contains(f)){const h=new CustomEvent(Lu,E0);l.addEventListener(Lu,c),l.dispatchEvent(h),h.defaultPrevented||(ZP(jP(Sw(l)),{select:!0}),document.activeElement===f&&Go(l))}return()=>{l.removeEventListener(Lu,c),setTimeout(()=>{const h=new CustomEvent($u,E0);l.addEventListener($u,u),l.dispatchEvent(h),h.defaultPrevented||Go(f??document.body,{select:!0}),l.removeEventListener($u,u),C0.remove(d)},0)}}},[l,c,u,d]);const g=x.useCallback(f=>{if(!o&&!n||d.paused)return;const b=f.key==="Tab"&&!f.altKey&&!f.ctrlKey&&!f.metaKey,h=document.activeElement;if(b&&h){const m=f.currentTarget,[k,w]=AP(m);k&&w?!f.shiftKey&&h===w?(f.preventDefault(),o&&Go(k,{select:!0})):f.shiftKey&&h===k&&(f.preventDefault(),o&&Go(w,{select:!0})):h===m&&f.preventDefault()}},[o,n,d.paused]);return P.jsx($e.div,{tabIndex:-1,...s,ref:y,onKeyDown:g})});df.displayName=CP;function ZP(t,{select:e=!1}={}){const o=document.activeElement;for(const n of t)if(Go(n,{select:e}),document.activeElement!==o)return}function AP(t){const e=Sw(t),o=_0(e,t),n=_0(e.reverse(),t);return[o,n]}function Sw(t){const e=[],o=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>{const i=n.tagName==="INPUT"&&n.type==="hidden";return n.disabled||n.hidden||i?NodeFilter.FILTER_SKIP:n.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;o.nextNode();)e.push(o.currentNode);return e}function _0(t,e){for(const o of t)if(!RP(o,{upTo:e}))return o}function RP(t,{upTo:e}){if(getComputedStyle(t).visibility==="hidden")return!0;for(;t;){if(e!==void 0&&t===e)return!1;if(getComputedStyle(t).display==="none")return!0;t=t.parentElement}return!1}function PP(t){return t instanceof HTMLInputElement&&"select"in t}function Go(t,{select:e=!1}={}){if(t&&t.focus){const o=document.activeElement;t.focus({preventScroll:!0}),t!==o&&PP(t)&&e&&t.select()}}var C0=TP();function TP(){let t=[];return{add(e){const o=t[0];e!==o&&o?.pause(),t=Z0(t,e),t.unshift(e)},remove(e){t=Z0(t,e),t[0]?.resume()}}}function Z0(t,e){const o=[...t],n=o.indexOf(e);return n!==-1&&o.splice(n,1),o}function jP(t){return t.filter(e=>e.tagName!=="A")}var IP="Portal",ff=x.forwardRef((t,e)=>{const{container:o,...n}=t,[i,r]=x.useState(!1);Jn(()=>r(!0),[]);const s=o||i&&globalThis?.document?.body;return s?ex.createPortal(P.jsx($e.div,{...n,ref:e}),s):null});ff.displayName=IP;function FP(t,e){return x.useReducer((o,n)=>e[o][n]??o,t)}var gr=t=>{const{present:e,children:o}=t,n=MP(e),i=typeof o=="function"?o({present:n.isPresent}):x.Children.only(o),r=Ot(n.ref,OP(i));return typeof o=="function"||n.isPresent?x.cloneElement(i,{ref:r}):null};gr.displayName="Presence";function MP(t){const[e,o]=x.useState(),n=x.useRef({}),i=x.useRef(t),r=x.useRef("none"),s=t?"mounted":"unmounted",[l,a]=FP(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return x.useEffect(()=>{const c=Zl(n.current);r.current=l==="mounted"?c:"none"},[l]),Jn(()=>{const c=n.current,u=i.current;if(u!==t){const y=r.current,d=Zl(c);t?a("MOUNT"):d==="none"||c?.display==="none"?a("UNMOUNT"):a(u&&y!==d?"ANIMATION_OUT":"UNMOUNT"),i.current=t}},[t,a]),Jn(()=>{if(e){let c;const u=e.ownerDocument.defaultView??window,p=d=>{const f=Zl(n.current).includes(d.animationName);if(d.target===e&&f&&(a("ANIMATION_END"),!i.current)){const b=e.style.animationFillMode;e.style.animationFillMode="forwards",c=u.setTimeout(()=>{e.style.animationFillMode==="forwards"&&(e.style.animationFillMode=b)})}},y=d=>{d.target===e&&(r.current=Zl(n.current))};return e.addEventListener("animationstart",y),e.addEventListener("animationcancel",p),e.addEventListener("animationend",p),()=>{u.clearTimeout(c),e.removeEventListener("animationstart",y),e.removeEventListener("animationcancel",p),e.removeEventListener("animationend",p)}}else a("ANIMATION_END")},[e,a]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:x.useCallback(c=>{c&&(n.current=getComputedStyle(c)),o(c)},[])}}function Zl(t){return t?.animationName||"none"}function OP(t){let e=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,o=e&&"isReactWarning"in e&&e.isReactWarning;return o?t.ref:(e=Object.getOwnPropertyDescriptor(t,"ref")?.get,o=e&&"isReactWarning"in e&&e.isReactWarning,o?t.props.ref:t.props.ref||t.ref)}var Wu=0;function Ew(){x.useEffect(()=>{const t=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",t[0]??A0()),document.body.insertAdjacentElement("beforeend",t[1]??A0()),Wu++,()=>{Wu===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),Wu--}},[])}function A0(){const t=document.createElement("span");return t.setAttribute("data-radix-focus-guard",""),t.tabIndex=0,t.style.outline="none",t.style.opacity="0",t.style.position="fixed",t.style.pointerEvents="none",t}var _w=Jk(),Hu=function(){},fc=x.forwardRef(function(t,e){var o=x.useRef(null),n=x.useState({onScrollCapture:Hu,onWheelCapture:Hu,onTouchMoveCapture:Hu}),i=n[0],r=n[1],s=t.forwardProps,l=t.children,a=t.className,c=t.removeScrollBar,u=t.enabled,p=t.shards,y=t.sideCar,d=t.noIsolation,g=t.inert,f=t.allowPinchZoom,b=t.as,h=b===void 0?"div":b,m=t.gapMode,k=sf(t,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),w=y,v=Kk([o,e]),E=Ve(Ve({},k),i);return x.createElement(x.Fragment,null,u&&x.createElement(w,{sideCar:_w,removeScrollBar:c,shards:p,noIsolation:d,inert:g,setCallbacks:r,allowPinchZoom:!!f,lockRef:o,gapMode:m}),s?x.cloneElement(x.Children.only(l),Ve(Ve({},E),{ref:v})):x.createElement(h,Ve({},E,{className:a,ref:v}),l))});fc.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};fc.classNames={fullWidth:is,zeroRight:ns};var Py=!1;if(typeof window<"u")try{var Al=Object.defineProperty({},"passive",{get:function(){return Py=!0,!0}});window.addEventListener("test",Al,Al),window.removeEventListener("test",Al,Al)}catch{Py=!1}var gi=Py?{passive:!1}:!1,DP=function(t){return t.tagName==="TEXTAREA"},Cw=function(t,e){if(!(t instanceof Element))return!1;var o=window.getComputedStyle(t);return o[e]!=="hidden"&&!(o.overflowY===o.overflowX&&!DP(t)&&o[e]==="visible")},BP=function(t){return Cw(t,"overflowY")},GP=function(t){return Cw(t,"overflowX")},R0=function(t,e){var o=e.ownerDocument,n=e;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var i=Zw(t,n);if(i){var r=Aw(t,n),s=r[1],l=r[2];if(s>l)return!0}n=n.parentNode}while(n&&n!==o.body);return!1},UP=function(t){var e=t.scrollTop,o=t.scrollHeight,n=t.clientHeight;return[e,o,n]},NP=function(t){var e=t.scrollLeft,o=t.scrollWidth,n=t.clientWidth;return[e,o,n]},Zw=function(t,e){return t==="v"?BP(e):GP(e)},Aw=function(t,e){return t==="v"?UP(e):NP(e)},LP=function(t,e){return t==="h"&&e==="rtl"?-1:1},$P=function(t,e,o,n,i){var r=LP(t,window.getComputedStyle(e).direction),s=r*n,l=o.target,a=e.contains(l),c=!1,u=s>0,p=0,y=0;do{var d=Aw(t,l),g=d[0],f=d[1],b=d[2],h=f-b-r*g;(g||h)&&Zw(t,l)&&(p+=h,y+=g),l instanceof ShadowRoot?l=l.host:l=l.parentNode}while(!a&&l!==document.body||a&&(e.contains(l)||e===l));return(u&&(Math.abs(p)<1||!i)||!u&&(Math.abs(y)<1||!i))&&(c=!0),c},Rl=function(t){return"changedTouches"in t?[t.changedTouches[0].clientX,t.changedTouches[0].clientY]:[0,0]},P0=function(t){return[t.deltaX,t.deltaY]},T0=function(t){return t&&"current"in t?t.current:t},WP=function(t,e){return t[0]===e[0]&&t[1]===e[1]},HP=function(t){return`
  .block-interactivity-`.concat(t,` {pointer-events: none;}
  .allow-interactivity-`).concat(t,` {pointer-events: all;}
`)},XP=0,mi=[];function VP(t){var e=x.useRef([]),o=x.useRef([0,0]),n=x.useRef(),i=x.useState(XP++)[0],r=x.useState(lf)[0],s=x.useRef(t);x.useEffect(function(){s.current=t},[t]),x.useEffect(function(){if(t.inert){document.body.classList.add("block-interactivity-".concat(i));var f=Qk([t.lockRef.current],(t.shards||[]).map(T0),!0).filter(Boolean);return f.forEach(function(b){return b.classList.add("allow-interactivity-".concat(i))}),function(){document.body.classList.remove("block-interactivity-".concat(i)),f.forEach(function(b){return b.classList.remove("allow-interactivity-".concat(i))})}}},[t.inert,t.lockRef.current,t.shards]);var l=x.useCallback(function(f,b){if("touches"in f&&f.touches.length===2||f.type==="wheel"&&f.ctrlKey)return!s.current.allowPinchZoom;var h=Rl(f),m=o.current,k="deltaX"in f?f.deltaX:m[0]-h[0],w="deltaY"in f?f.deltaY:m[1]-h[1],v,E=f.target,z=Math.abs(k)>Math.abs(w)?"h":"v";if("touches"in f&&z==="h"&&E.type==="range")return!1;var S=R0(z,E);if(!S)return!0;if(S?v=z:(v=z==="v"?"h":"v",S=R0(z,E)),!S)return!1;if(!n.current&&"changedTouches"in f&&(k||w)&&(n.current=v),!v)return!0;var C=n.current||v;return $P(C,b,f,C==="h"?k:w,!0)},[]),a=x.useCallback(function(f){var b=f;if(!(!mi.length||mi[mi.length-1]!==r)){var h="deltaY"in b?P0(b):Rl(b),m=e.current.filter(function(v){return v.name===b.type&&(v.target===b.target||b.target===v.shadowParent)&&WP(v.delta,h)})[0];if(m&&m.should){b.cancelable&&b.preventDefault();return}if(!m){var k=(s.current.shards||[]).map(T0).filter(Boolean).filter(function(v){return v.contains(b.target)}),w=k.length>0?l(b,k[0]):!s.current.noIsolation;w&&b.cancelable&&b.preventDefault()}}},[]),c=x.useCallback(function(f,b,h,m){var k={name:f,delta:b,target:h,should:m,shadowParent:qP(h)};e.current.push(k),setTimeout(function(){e.current=e.current.filter(function(w){return w!==k})},1)},[]),u=x.useCallback(function(f){o.current=Rl(f),n.current=void 0},[]),p=x.useCallback(function(f){c(f.type,P0(f),f.target,l(f,t.lockRef.current))},[]),y=x.useCallback(function(f){c(f.type,Rl(f),f.target,l(f,t.lockRef.current))},[]);x.useEffect(function(){return mi.push(r),t.setCallbacks({onScrollCapture:p,onWheelCapture:p,onTouchMoveCapture:y}),document.addEventListener("wheel",a,gi),document.addEventListener("touchmove",a,gi),document.addEventListener("touchstart",u,gi),function(){mi=mi.filter(function(f){return f!==r}),document.removeEventListener("wheel",a,gi),document.removeEventListener("touchmove",a,gi),document.removeEventListener("touchstart",u,gi)}},[]);var d=t.removeScrollBar,g=t.inert;return x.createElement(x.Fragment,null,g?x.createElement(r,{styles:HP(i)}):null,d?x.createElement(nw,{gapMode:t.gapMode}):null)}function qP(t){for(var e=null;t!==null;)t instanceof ShadowRoot&&(e=t.host,t=t.host),t=t.parentNode;return e}const YP=tw(_w,VP);var hf=x.forwardRef(function(t,e){return x.createElement(fc,Ve({},t,{ref:e,sideCar:YP}))});hf.classNames=fc.classNames;var Rw="Dialog",[Pw,sI]=pf(Rw),[lI,Kt]=Pw(Rw),Tw="DialogTrigger",QP=x.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,i=Kt(Tw,o),r=Ot(e,i.triggerRef);return P.jsx($e.button,{type:"button","aria-haspopup":"dialog","aria-expanded":i.open,"aria-controls":i.contentId,"data-state":bf(i.open),...n,ref:r,onClick:ft(t.onClick,i.onOpenToggle)})});QP.displayName=Tw;var gf="DialogPortal",[KP,jw]=Pw(gf,{forceMount:void 0}),Iw=t=>{const{__scopeDialog:e,forceMount:o,children:n,container:i}=t,r=Kt(gf,e);return P.jsx(KP,{scope:e,forceMount:o,children:x.Children.map(n,s=>P.jsx(gr,{present:o||r.open,children:P.jsx(ff,{asChild:!0,container:i,children:s})}))})};Iw.displayName=gf;var Ma="DialogOverlay",Fw=x.forwardRef((t,e)=>{const o=jw(Ma,t.__scopeDialog),{forceMount:n=o.forceMount,...i}=t,r=Kt(Ma,t.__scopeDialog);return r.modal?P.jsx(gr,{present:n||r.open,children:P.jsx(JP,{...i,ref:e})}):null});Fw.displayName=Ma;var JP=x.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,i=Kt(Ma,o);return P.jsx(hf,{as:Gs,allowPinchZoom:!0,shards:[i.contentRef],children:P.jsx($e.div,{"data-state":bf(i.open),...n,ref:e,style:{pointerEvents:"auto",...n.style}})})}),ei="DialogContent",Mw=x.forwardRef((t,e)=>{const o=jw(ei,t.__scopeDialog),{forceMount:n=o.forceMount,...i}=t,r=Kt(ei,t.__scopeDialog);return P.jsx(gr,{present:n||r.open,children:r.modal?P.jsx(eT,{...i,ref:e}):P.jsx(tT,{...i,ref:e})})});Mw.displayName=ei;var eT=x.forwardRef((t,e)=>{const o=Kt(ei,t.__scopeDialog),n=x.useRef(null),i=Ot(e,o.contentRef,n);return x.useEffect(()=>{const r=n.current;if(r)return af(r)},[]),P.jsx(Ow,{...t,ref:i,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:ft(t.onCloseAutoFocus,r=>{r.preventDefault(),o.triggerRef.current?.focus()}),onPointerDownOutside:ft(t.onPointerDownOutside,r=>{const s=r.detail.originalEvent,l=s.button===0&&s.ctrlKey===!0;(s.button===2||l)&&r.preventDefault()}),onFocusOutside:ft(t.onFocusOutside,r=>r.preventDefault())})}),tT=x.forwardRef((t,e)=>{const o=Kt(ei,t.__scopeDialog),n=x.useRef(!1),i=x.useRef(!1);return P.jsx(Ow,{...t,ref:e,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{t.onCloseAutoFocus?.(r),r.defaultPrevented||(n.current||o.triggerRef.current?.focus(),r.preventDefault()),n.current=!1,i.current=!1},onInteractOutside:r=>{t.onInteractOutside?.(r),r.defaultPrevented||(n.current=!0,r.detail.originalEvent.type==="pointerdown"&&(i.current=!0));const s=r.target;o.triggerRef.current?.contains(s)&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&i.current&&r.preventDefault()}})}),Ow=x.forwardRef((t,e)=>{const{__scopeDialog:o,trapFocus:n,onOpenAutoFocus:i,onCloseAutoFocus:r,...s}=t,l=Kt(ei,o),a=x.useRef(null),c=Ot(e,a);return Ew(),P.jsxs(P.Fragment,{children:[P.jsx(df,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:i,onUnmountAutoFocus:r,children:P.jsx(yf,{role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":bf(l.open),...s,ref:c,onDismiss:()=>l.onOpenChange(!1)})}),P.jsxs(P.Fragment,{children:[P.jsx(oT,{titleId:l.titleId}),P.jsx(iT,{contentRef:a,descriptionId:l.descriptionId})]})]})}),mf="DialogTitle",Dw=x.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,i=Kt(mf,o);return P.jsx($e.h2,{id:i.titleId,...n,ref:e})});Dw.displayName=mf;var Bw="DialogDescription",Gw=x.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,i=Kt(Bw,o);return P.jsx($e.p,{id:i.descriptionId,...n,ref:e})});Gw.displayName=Bw;var Uw="DialogClose",Nw=x.forwardRef((t,e)=>{const{__scopeDialog:o,...n}=t,i=Kt(Uw,o);return P.jsx($e.button,{type:"button",...n,ref:e,onClick:ft(t.onClick,()=>i.onOpenChange(!1))})});Nw.displayName=Uw;function bf(t){return t?"open":"closed"}var Lw="DialogTitleWarning",[aI,$w]=pP(Lw,{contentName:ei,titleName:mf,docsSlug:"dialog"}),oT=({titleId:t})=>{const e=$w(Lw),o=`\`${e.contentName}\` requires a \`${e.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e.titleName}\`, you can wrap it with our VisuallyHidden component.
