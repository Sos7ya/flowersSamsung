"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function initializeAndroidTVInput(){AndroidBridge.onKeyEvent(function(e){if(e.isTVKeyEvent)switch(e.keyCode){case AndroidBridge.KEYCODE_DPAD_CENTER:mainMenu.startBtn(),gameOver.gameToggle(),scenePause.gameToggle(),playgame.throwKnife();break;case AndroidBridge.KEYCODE_DPAD_UP:gameOver.selectorUp(),scenePause.selectorUp();break;case AndroidBridge.KEYCODE_DPAD_DOWN:gameOver.selectorDown(),scenePause.selectorDown();break;case AndroidBridge.KEYCODE_DPAD_LEFT:case AndroidBridge.KEYCODE_DPAD_RIGHT:break;case AndroidBridge.KEYCODE_BACK:playgame.pauseGame()}})}function generateUUID(){for(var e="",t=0;t<32;t++)e+="0123456789abcdef"[Math.floor(16*Math.random())],7!==t&&11!==t&&15!==t&&19!==t||(e+="-");return e}!function(o){var f={selector:"",straightOnly:!1,straightOverlapThreshold:.5,rememberSource:!1,disabled:!1,defaultElement:"",enterTo:"",leaveFor:null,restrict:"self-first",tabIndexIgnoreList:"a, input, select, textarea, button, iframe, [contentEditable=true]",navigableFilter:null},F={37:"left",38:"up",39:"right",40:"down"},d={left:"right",up:"down",right:"left",down:"up"},j="sn:",n=0,e=!1,a=!1,p={},i=0,u="",c="",s=!1,M=Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||function(e){e=(this.parentNode||this.document).querySelectorAll(e);return 0<=[].slice.call(e).indexOf(this)};function h(e){var t=e.getBoundingClientRect(),t={left:t.left,top:t.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height};return t.element=e,t.center={x:t.left+Math.floor(t.width/2),y:t.top+Math.floor(t.height/2)},t.center.left=t.center.right=t.center.x,t.center.top=t.center.bottom=t.center.y,t}function m(e,t,n){for(var r=[[],[],[],[],[],[],[],[],[]],o=0;o<e.length;o++){var i=e[o],a=i.center,u=a.x<t.left?0:a.x<=t.right?1:2,a=a.y<t.top?0:a.y<=t.bottom?1:2,a=3*a+u;r[a].push(i),-1!==[0,2,6,8].indexOf(a)&&(i.left<=t.right-t.width*(u=n)&&(2===a?r[1].push(i):8===a&&r[7].push(i)),i.right>=t.left+t.width*u&&(0===a?r[1].push(i):6===a&&r[7].push(i)),i.top<=t.bottom-t.height*u&&(6===a?r[3].push(i):8===a&&r[5].push(i)),i.bottom>=t.top+t.height*u)&&(0===a?r[3].push(i):2===a&&r[5].push(i))}return r}function g(e,t,n,r){if(!(e&&t&&n&&n.length))return null;for(var o=[],i=0;i<n.length;i++){var a=h(n[i]);a&&o.push(a)}if(!o.length)return null;var u=h(e);if(!u)return null;var c,s,l={nearPlumbLineIsBetter:function(e){e=e.center.x<c.center.x?c.center.x-e.right:e.left-c.center.x;return e<0?0:e},nearHorizonIsBetter:function(e){e=e.center.y<c.center.y?c.center.y-e.bottom:e.top-c.center.y;return e<0?0:e},nearTargetLeftIsBetter:function(e){e=e.center.x<c.center.x?c.left-e.right:e.left-c.left;return e<0?0:e},nearTargetTopIsBetter:function(e){e=e.center.y<c.center.y?c.top-e.bottom:e.top-c.top;return e<0?0:e},topIsBetter:function(e){return e.top},bottomIsBetter:function(e){return-1*e.bottom},leftIsBetter:function(e){return e.left},rightIsBetter:function(e){return-1*e.right}},f=m(o,c=u,r.straightOverlapThreshold),d=m(f[4],u.center,r.straightOverlapThreshold);switch(t){case"left":s=[{group:d[0].concat(d[3]).concat(d[6]),distance:[l.nearPlumbLineIsBetter,l.topIsBetter]},{group:f[3],distance:[l.nearPlumbLineIsBetter,l.topIsBetter]},{group:f[0].concat(f[6]),distance:[l.nearHorizonIsBetter,l.rightIsBetter,l.nearTargetTopIsBetter]}];break;case"right":s=[{group:d[2].concat(d[5]).concat(d[8]),distance:[l.nearPlumbLineIsBetter,l.topIsBetter]},{group:f[5],distance:[l.nearPlumbLineIsBetter,l.topIsBetter]},{group:f[2].concat(f[8]),distance:[l.nearHorizonIsBetter,l.leftIsBetter,l.nearTargetTopIsBetter]}];break;case"up":s=[{group:d[0].concat(d[1]).concat(d[2]),distance:[l.nearHorizonIsBetter,l.leftIsBetter]},{group:f[1],distance:[l.nearHorizonIsBetter,l.leftIsBetter]},{group:f[0].concat(f[2]),distance:[l.nearPlumbLineIsBetter,l.bottomIsBetter,l.nearTargetLeftIsBetter]}];break;case"down":s=[{group:d[6].concat(d[7]).concat(d[8]),distance:[l.nearHorizonIsBetter,l.leftIsBetter]},{group:f[7],distance:[l.nearHorizonIsBetter,l.leftIsBetter]},{group:f[6].concat(f[8]),distance:[l.nearPlumbLineIsBetter,l.topIsBetter,l.nearTargetLeftIsBetter]}];break;default:return null}r.straightOnly&&s.pop();var p=function(e){for(var o,t=null,n=0;n<e.length;n++)if(e[n].group.length){t=e[n];break}return t?(o=t.distance,t.group.sort(function(e,t){for(var n=0;n<o.length;n++){var r=o[n],r=r(e)-r(t);if(r)return r}return 0}),t.group):null}(s);if(!p)return null;var g=null;if(r.rememberSource&&r.previous&&r.previous.destination===e&&r.previous.reverse===t)for(var v=0;v<p.length;v++)if(p[v].element===r.previous.target){g=p[v].element;break}return g=g||p[0].element}function r(e){var t=[];try{e&&(o?t=o(e).get():"string"==typeof e?t=[].slice.call(document.querySelectorAll(e)):"object"===_typeof(e)&&e.length?t=[].slice.call(e):"object"===_typeof(e)&&1===e.nodeType&&(t=[e]))}catch(e){console.error(e)}return t}function l(e,t){return o?o(e).is(t):"string"==typeof t?M.call(e,t):"object"===_typeof(t)&&t.length?0<=t.indexOf(e):"object"===_typeof(t)&&1===t.nodeType&&e===t}function v(){var e=document.activeElement;if(e&&e!==document.body)return e}function y(e){e=e||{};for(var t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&void 0!==arguments[t][n]&&(e[n]=arguments[t][n]);return e}function b(e,t){Array.isArray(t)||(t=[t]);for(var n,r=0;r<t.length;r++)0<=(n=e.indexOf(t[r]))&&e.splice(n,1);return e}function w(e,t,n){if(!e||!t||!p[t]||p[t].disabled)return!1;if(e.offsetWidth<=0&&e.offsetHeight<=0||e.hasAttribute("disabled"))return!1;if(n&&!l(e,p[t].selector))return!1;if("function"==typeof p[t].navigableFilter){if(!1===p[t].navigableFilter(e,t))return!1}else if("function"==typeof f.navigableFilter&&!1===f.navigableFilter(e,t))return!1;return!0}function E(e){for(var t in p)if(!p[t].disabled&&l(e,p[t].selector))return t}function I(t){return r(p[t].selector).filter(function(e){return w(e,t)})}function B(t){var e=r(p[t].defaultElement);return Array.isArray(e)?e=e.find(function(e){return w(e,t,!0)}):console.error("Вот такие пироги",e),e||null}function x(e){var t=p[e].lastFocusedElement;return w(t,e,!0)?t:null}function T(e,t,n,r){arguments.length<4&&(r=!0);var o=document.createEvent("CustomEvent");return o.initCustomEvent(j+t,!0,r,n),e.dispatchEvent(o)}function S(e,t,n){if(!e)return!1;function r(){o&&o.blur(),e.focus(),A(e,t)}var o=v();if(s)r();else{if(s=!0,a)return r(),!(s=!1);if(o){var i={nextElement:e,nextSectionId:t,direction:n,native:!1};if(!T(o,"willunfocus",i))return s=!1;o.blur(),T(o,"unfocused",i,!1)}i={previousElement:o,sectionId:t,direction:n,native:!1};if(!T(e,"willfocus",i))return s=!1;e.focus(),T(e,"focused",i,!1),s=!1,A(e,t)}return!0}function A(e,t){(t=t||E(e))&&(p[t].lastFocusedElement=e,c=t)}function O(e,t){if("@"==e.charAt(0))return 1==e.length?k():k(e.substr(1));e=r(e)[0];if(e){var n=E(e);if(w(e,n))return S(e,n,t)}return!1}function k(e){function t(e){e&&n.indexOf(e)<0&&p[e]&&!p[e].disabled&&n.push(e)}var n=[];e?t(e):(t(u),t(c),Object.keys(p).map(t));for(var r=0;r<n.length;r++){var o=n[r],i="last-focused"==p[o].enterTo?x(o)||B(o)||I(o)[0]:B(o)||x(o)||I(o)[0];if(i)return S(i,o)}return!1}function D(e,t){T(e,"navigatefailed",{direction:t},!1)}function L(e,t){if(p[e].leaveFor&&void 0!==p[e].leaveFor[t]){e=p[e].leaveFor[t];if("string"==typeof e)return""===e?null:O(e,t);var n=E(e=o&&e instanceof o?e.get(0):e);if(w(e,n))return S(e,n,t)}return!1}function P(e,t,n){var r=t.getAttribute("data-sn-"+e);if("string"==typeof r)return!(""===r||!O(r,e))||(D(t,e),!1);var o,i={},a=[];for(o in p)i[o]=I(o),a=a.concat(i[o]);var u,r=y({},f,p[n]);if("self-only"==r.restrict||"self-first"==r.restrict?(u=g(t,e,b(l=i[n],t),r))||"self-first"!=r.restrict||(u=g(t,e,b(a,l),r)):u=g(t,e,b(a,t),r),u){p[n].previous={target:t,destination:u,reverse:d[e]};var c=E(u);if(n!=c){var s,l=L(n,e);if(l)return!0;if(null===l)return D(t,e),!1;switch(p[c].enterTo){case"last-focused":s=x(c)||B(c);break;case"default-element":s=B(c)}s&&(u=s)}return S(u,c,e)}return!!L(n,e)||(D(t,e),!1)}function t(e){var t,n,r,o;if(!(!i||a||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey))return n=function(){return e.preventDefault(),e.stopPropagation(),!1},(r=F[e.keyCode])?(t=(t=v())||(c?x(c):t))?(o=E(t))?(T(t,"willmove",{direction:r,sectionId:o,cause:"keydown"})&&P(r,t,o),n()):void 0:(k(),n()):13==e.keyCode&&(t=v())&&E(t)&&!T(t,"enter-down")?n():void 0}function _(e){var t;e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||!a&&i&&13==e.keyCode&&(t=v())&&E(t)&&(T(t,"enter-up")||(e.preventDefault(),e.stopPropagation()))}function K(e){var t,n,e=e.target;e!==window&&e!==document&&i&&!s&&(t=E(e))&&(a?A(e,t):T(e,"willfocus",n={sectionId:t,native:!0})?(T(e,"focused",n,!1),A(e,t)):(s=!0,e.blur(),s=!1))}function z(e){var t=e.target;t!==window&&t!==document&&!a&&i&&!s&&E(t)&&(T(t,"willunfocus",e={native:!0})?T(t,"unfocused",e,!1):(s=!0,setTimeout(function(){t.focus(),s=!1})))}var C={init:function(){e||(window.addEventListener("keydown",t),window.addEventListener("keyup",_),window.addEventListener("focus",K,!0),window.addEventListener("blur",z,!0),e=!0)},uninit:function(){window.removeEventListener("blur",z,!0),window.removeEventListener("focus",K,!0),window.removeEventListener("keyup",_),window.removeEventListener("keydown",t),C.clear(),n=0,e=!1},clear:function(){i=0,c=u="",s=!(p={})},set:function(){var e,t,n;if("object"===_typeof(arguments[0]))t=arguments[0];else{if("string"!=typeof arguments[0]||"object"!==_typeof(arguments[1]))return;if(e=arguments[0],t=arguments[1],!p[e])throw new Error('Section "'+e+"\" doesn't exist!")}for(n in t)void 0!==f[n]&&(e?p[e][n]=t[n]:void 0!==t[n]&&(f[n]=t[n]));e&&(p[e]=y({},p[e]))},add:function(){var e,t={};if("object"===_typeof(arguments[0])?t=arguments[0]:"string"==typeof arguments[0]&&"object"===_typeof(arguments[1])&&(e=arguments[0],t=arguments[1]),e=e||("string"==typeof t.id?t.id:function(){for(var e;e="section-"+String(++n),p[e];);return e}()),p[e])throw new Error('Section "'+e+'" has already existed!');return p[e]={},i++,C.set(e,t),e},remove:function(e){if(e&&"string"==typeof e)return!!p[e]&&(p[e]=void 0,p=y({},p),i--,c===e&&(c=""),!0);throw new Error('Please assign the "sectionId"!')},disable:function(e){return!!p[e]&&(p[e].disabled=!0)},enable:function(e){return!!p[e]&&!(p[e].disabled=!1)},pause:function(){a=!0},resume:function(){a=!1},focus:function(e,t){var n,r=!1,t=(void 0===t&&"boolean"==typeof e&&(t=e,e=void 0),!a&&t);return t&&C.pause(),e?"string"==typeof e?r=(p[e]?k:O)(e):(n=E(e=o&&e instanceof o?e.get(0):e),w(e,n)&&(r=S(e,n))):r=k(),t&&C.resume(),r},move:function(e,t){var n;return e=e.toLowerCase(),!!(d[e]&&(t=t?r(t)[0]:v())&&(n=E(t))&&T(t,"willmove",{direction:e,sectionId:n,cause:"api"}))&&P(e,t,n)},makeFocusable:function(e){function t(e){var t=(void 0!==e.tabIndexIgnoreList?e:f).tabIndexIgnoreList;r(e.selector).forEach(function(e){l(e,t)||e.getAttribute("tabindex")||e.setAttribute("tabindex","-1")})}if(e){if(!p[e])throw new Error('Section "'+e+"\" doesn't exist!");t(p[e])}else for(var n in p)t(p[n])},setDefaultSection:function(e){if(e){if(!p[e])throw new Error('Section "'+e+"\" doesn't exist!");u=e}else u=""}};window.SpatialNavigation=C,"object"===("undefined"==typeof module?"undefined":_typeof(module))&&(module.exports=C),o&&(o.SpatialNavigation=function(){if(C.init(),0<arguments.length){if(o.isPlainObject(arguments[0]))return C.add(arguments[0]);if("string"===o.type(arguments[0])&&o.isFunction(C[arguments[0]]))return C[arguments[0]].apply(C,[].slice.call(arguments,1))}return o.extend({},C)},o.fn.SpatialNavigation=function(){var e=o.isPlainObject(arguments[0])?arguments[0]:{id:arguments[0]};return e.selector=this,C.init(),e.id&&C.remove(e.id),C.add(e),C.makeFocusable(e.id),this})}(window.jQuery),window.addEventListener("load",function(){SpatialNavigation.init(),SpatialNavigation.add({selector:".focusable"}),"undefined"!=typeof AndroidBridge&&initializeAndroidTVInput();function t(e){switch(console.log(e.type,e.target,e.detail),"sn:enter-down"==e.type&&(playgame.throwKnife(),mainMenu.gameToggle(),gameOver.gameToggle(),scenePause.gameToggle()),null==e||null==(e=e.detail)?void 0:e.direction){case"up":scenePause.selectorUp(),gameOver.selectorUp(),mainMenu.selectorUp();break;case"down":scenePause.selectorDown(),gameOver.selectorDown(),mainMenu.selectorDown()}}["sn:willmove","sn:enter-down","sn:enter-up"].forEach(function(e){window.addEventListener(e,t)}),SpatialNavigation.makeFocusable(),SpatialNavigation.focus()});