/**
 * miolo-demo v0.0.0
 *
 * Copyright (c) Afialapis <info@afialapis.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function () {
	'use strict';

	function _mergeNamespaces(n, m) {
		m.forEach(function (e) {
			e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
				if (k !== 'default' && !(k in n)) {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		});
		return Object.freeze(n);
	}

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var reactExports$3 = {};
	var react$3 = {
	  get exports(){ return reactExports$3; },
	  set exports(v){ reactExports$3 = v; },
	};

	var react_production_min$3 = {};

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/** @license React v17.0.2
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var l$3=objectAssign,n$3=60103,p$3=60106;react_production_min$3.Fragment=60107;react_production_min$3.StrictMode=60108;react_production_min$3.Profiler=60114;var q$3=60109,r$4=60110,t$3=60112;react_production_min$3.Suspense=60113;var u$3=60115,v$3=60116;
	if("function"===typeof Symbol&&Symbol.for){var w$3=Symbol.for;n$3=w$3("react.element");p$3=w$3("react.portal");react_production_min$3.Fragment=w$3("react.fragment");react_production_min$3.StrictMode=w$3("react.strict_mode");react_production_min$3.Profiler=w$3("react.profiler");q$3=w$3("react.provider");r$4=w$3("react.context");t$3=w$3("react.forward_ref");react_production_min$3.Suspense=w$3("react.suspense");u$3=w$3("react.memo");v$3=w$3("react.lazy");}var x$3="function"===typeof Symbol&&Symbol.iterator;
	function y$4(a){if(null===a||"object"!==typeof a)return null;a=x$3&&a[x$3]||a["@@iterator"];return "function"===typeof a?a:null}function z$3(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A$3={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B$4={};function C$3(a,b,c){this.props=a;this.context=b;this.refs=B$4;this.updater=c||A$3;}C$3.prototype.isReactComponent={};C$3.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z$3(85));this.updater.enqueueSetState(this,a,b,"setState");};C$3.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D$4(){}D$4.prototype=C$3.prototype;function E$4(a,b,c){this.props=a;this.context=b;this.refs=B$4;this.updater=c||A$3;}var F$4=E$4.prototype=new D$4;F$4.constructor=E$4;l$3(F$4,C$3.prototype);F$4.isPureReactComponent=!0;var G$4={current:null},H$4=Object.prototype.hasOwnProperty,I$4={key:!0,ref:!0,__self:!0,__source:!0};
	function J$3(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H$4.call(b,e)&&!I$4.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n$3,type:a,key:k,ref:h,props:d,_owner:G$4.current}}
	function K$3(a,b){return {$$typeof:n$3,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L$3(a){return "object"===typeof a&&null!==a&&a.$$typeof===n$3}function escape$3(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M$4=/\/+/g;function N$4(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape$3(""+a.key):b.toString(36)}
	function O$4(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n$3:case p$3:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N$4(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M$4,"$&/")+"/"),O$4(d,b,c,"",function(a){return a})):null!=d&&(L$3(d)&&(d=K$3(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M$4,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N$4(k,g);h+=O$4(k,b,c,f,d);}else if(f=y$4(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N$4(k,g++),h+=O$4(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z$3(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P$4(a,b,c){if(null==a)return a;var e=[],d=0;O$4(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q$3(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R$4={current:null};function S$4(){var a=R$4.current;if(null===a)throw Error(z$3(321));return a}var T$4={ReactCurrentDispatcher:R$4,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G$4,IsSomeRendererActing:{current:!1},assign:l$3};
	react_production_min$3.Children={map:P$4,forEach:function(a,b,c){P$4(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P$4(a,function(){b++;});return b},toArray:function(a){return P$4(a,function(a){return a})||[]},only:function(a){if(!L$3(a))throw Error(z$3(143));return a}};react_production_min$3.Component=C$3;react_production_min$3.PureComponent=E$4;react_production_min$3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T$4;
	react_production_min$3.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z$3(267,a));var e=l$3({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G$4.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H$4.call(b,f)&&!I$4.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n$3,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min$3.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r$4,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q$3,_context:a};return a.Consumer=a};react_production_min$3.createElement=J$3;react_production_min$3.createFactory=function(a){var b=J$3.bind(null,a);b.type=a;return b};react_production_min$3.createRef=function(){return {current:null}};react_production_min$3.forwardRef=function(a){return {$$typeof:t$3,render:a}};react_production_min$3.isValidElement=L$3;
	react_production_min$3.lazy=function(a){return {$$typeof:v$3,_payload:{_status:-1,_result:a},_init:Q$3}};react_production_min$3.memo=function(a,b){return {$$typeof:u$3,type:a,compare:void 0===b?null:b}};react_production_min$3.useCallback=function(a,b){return S$4().useCallback(a,b)};react_production_min$3.useContext=function(a,b){return S$4().useContext(a,b)};react_production_min$3.useDebugValue=function(){};react_production_min$3.useEffect=function(a,b){return S$4().useEffect(a,b)};react_production_min$3.useImperativeHandle=function(a,b,c){return S$4().useImperativeHandle(a,b,c)};
	react_production_min$3.useLayoutEffect=function(a,b){return S$4().useLayoutEffect(a,b)};react_production_min$3.useMemo=function(a,b){return S$4().useMemo(a,b)};react_production_min$3.useReducer=function(a,b,c){return S$4().useReducer(a,b,c)};react_production_min$3.useRef=function(a){return S$4().useRef(a)};react_production_min$3.useState=function(a){return S$4().useState(a)};react_production_min$3.version="17.0.2";

	(function (module) {

		{
		  module.exports = react_production_min$3;
		}
	} (react$3));

	var React$3 = /*@__PURE__*/getDefaultExportFromCjs(reactExports$3);

	var reactDomExports = {};
	var reactDom = {
	  get exports(){ return reactDomExports; },
	  set exports(v){ reactDomExports = v; },
	};

	var reactDom_production_min = {};

	var schedulerExports = {};
	var scheduler = {
	  get exports(){ return schedulerExports; },
	  set exports(v){ schedulerExports = v; },
	};

	var scheduler_production_min = {};

	/** @license React v0.20.2
	 * scheduler.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (exports) {
	var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q};}
		if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null;}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0));};g=function(a,b){u=setTimeout(a,b);};h=function(){clearTimeout(u);};exports.unstable_shouldYield=function(){return !1};k=exports.unstable_forceFrameRate=function(){};}else {var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
		window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
		E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5;};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null);}catch(b){throw G.postMessage(null),b;}}else A=!1;};f=function(a){B=a;A||(A=!0,G.postMessage(null));};g=function(a,b){C=
		x(function(){a(exports.unstable_now());},b);};h=function(){y(C);C=-1;};}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
		function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
		function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M);}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else {var b=J(M);null!==b&&g(U,b.startTime-a);}}
		function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b);}else K(L);O=J(L);}if(null!==O)var m=!0;else {var n=J(M);null!==n&&g(U,n.startTime-b);m=!1;}return m}finally{O=null,P=c,Q=!1;}}var W=k;exports.unstable_IdlePriority=5;
		exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null;};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V));};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
		exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P;}var c=P;P=b;try{return a()}finally{P=c;}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=P;P=a;try{return b()}finally{P=c;}};
		exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
		exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c;}}};
	} (scheduler_production_min));

	(function (module) {

		{
		  module.exports = scheduler_production_min;
		}
	} (scheduler));

	/** @license React v17.0.2
	 * react-dom.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var aa$1=reactExports$3,m=objectAssign,r$3=schedulerExports;function y$3(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa$1)throw Error(y$3(227));var ba$1=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b);}
	function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba$1.add(b[a]);}
	var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
	ja={},ka={};function la(a){if(ia.call(ka,a))return !0;if(ia.call(ja,a))return !1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return !1}function ma(a,b,c,d){if(null!==c&&0===c.type)return !1;switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d)return !1;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}
	function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return !0;if(d)return !1;if(null!==c)switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return !1}function B$3(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g;}var D$3={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D$3[a]=new B$3(a,0,!1,a,null,!1,!1);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D$3[b]=new B$3(b,1,!1,a[1],null,!1,!1);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D$3[a]=new B$3(a,2,!1,a.toLowerCase(),null,!1,!1);});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D$3[a]=new B$3(a,2,!1,a,null,!1,!1);});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D$3[a]=new B$3(a,3,!1,a.toLowerCase(),null,!1,!1);});
	["checked","multiple","muted","selected"].forEach(function(a){D$3[a]=new B$3(a,3,!0,a,null,!1,!1);});["capture","download"].forEach(function(a){D$3[a]=new B$3(a,4,!1,a,null,!1,!1);});["cols","rows","size","span"].forEach(function(a){D$3[a]=new B$3(a,6,!1,a,null,!1,!1);});["rowSpan","start"].forEach(function(a){D$3[a]=new B$3(a,5,!1,a.toLowerCase(),null,!1,!1);});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
	pa);D$3[b]=new B$3(b,1,!1,a,null,!1,!1);});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D$3[b]=new B$3(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1);});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D$3[b]=new B$3(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1);});["tabIndex","crossOrigin"].forEach(function(a){D$3[a]=new B$3(a,1,!1,a.toLowerCase(),null,!1,!1);});
	D$3.xlinkHref=new B$3("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D$3[a]=new B$3(a,1,!1,a.toLowerCase(),null,!0,!0);});
	function qa(a,b,c,d){var e=D$3.hasOwnProperty(b)?D$3[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))));}
	var ra=aa$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
	if("function"===typeof Symbol&&Symbol.for){var E$3=Symbol.for;sa=E$3("react.element");ta=E$3("react.portal");ua=E$3("react.fragment");wa=E$3("react.strict_mode");xa=E$3("react.profiler");ya=E$3("react.provider");za=E$3("react.context");Aa=E$3("react.forward_ref");Ba=E$3("react.suspense");Ca=E$3("react.suspense_list");Da=E$3("react.memo");Ea=E$3("react.lazy");Fa=E$3("react.block");E$3("react.scope");Ga=E$3("react.opaque.id");Ha=E$3("react.debug_trace_mode");Ia=E$3("react.offscreen");Ja=E$3("react.legacy_hidden");}
	var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return "function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||"";}return "\n"+Ma+a}var Oa=!1;
	function Pa(a,b){if(!a||Oa)return "";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(k){var d=k;}Reflect.construct(a,[],b);}else {try{b.call();}catch(k){d=k;}a.call(b.prototype);}else {try{throw Error();}catch(k){d=k;}a();}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
	f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return "\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?Na(a):""}
	function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return ""}}
	function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return "Fragment";case ta:return "Portal";case xa:return "Profiler";case wa:return "StrictMode";case Ba:return "Suspense";case Ca:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return (a.displayName||"Context")+".Consumer";case ya:return (a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
	return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return ""}}function Ta(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
	null;delete a[b];}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a));}function Wa(a){if(!a)return !1;var b=a._valueTracker;if(!b)return !0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
	function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1);}
	function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
	function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
	function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}function db(a){var b="";aa$1.Children.forEach(a,function(a){null!=a&&(b+=a);});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
	function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0);}else {c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
	function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y$3(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y$3(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y$3(93));c=c[0];}b=c;}null==b&&(b="");c=b;}a._wrapperState={initialValue:Sa(c)};}
	function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b);}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function lb(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var nb,ob=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else {nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
	function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
	var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
	floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a];});});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
	function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y$3(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y$3(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y$3(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y$3(62));}}
	function wb(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
	function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y$3(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b));}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a;}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a]);}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb();}
	function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb();}}
	function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;if(c&&"function"!==
	typeof c)throw Error(y$3(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0;}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb);}catch(a){Pb=!1;}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l);}catch(n){this.onError(n);}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a;}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments);}
	function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null;}else throw Error(y$3(198));Ub||(Ub=!0,Vb=l);}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y$3(188));}
	function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y$3(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling;}throw Error(y$3(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
	c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(y$3(189));}}if(c.alternate!==d)throw Error(y$3(190));}if(3!==c.tag)throw Error(y$3(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else {if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
	function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return !0;b=b.return;}return !1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function rc(a,b,c,d,e){return {blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId);}}
	function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
	function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return !0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return !1}
	function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r$3.unstable_runWithPriority(a.priority,function(){gc(c);});});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null;}
	function xc(a){if(null!==a.blockedOn)return !1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift();}return !0}function zc(a,b,c){xc(a)&&c.delete(b);}
	function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift();}null===a.blockedOn&&jc.shift();}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc);}
	function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r$3.unstable_scheduleCallback(r$3.unstable_NormalPriority,Ac)));}
	function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null);}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift();}
	function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
	fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
	var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
	"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d]);}}var Qc=r$3.unstable_now;Qc();var F$3=8;
	function Rc(a){if(0!==(1&a))return F$3=15,1;if(0!==(2&a))return F$3=14,2;if(0!==(4&a))return F$3=13,4;var b=24&a;if(0!==b)return F$3=12,b;if(0!==(a&32))return F$3=11,32;b=192&a;if(0!==b)return F$3=10,b;if(0!==(a&256))return F$3=9,256;b=3584&a;if(0!==b)return F$3=8,b;if(0!==(a&4096))return F$3=7,4096;b=4186112&a;if(0!==b)return F$3=6,b;b=62914560&a;if(0!==b)return F$3=5,b;if(a&67108864)return F$3=4,67108864;if(0!==(a&134217728))return F$3=3,134217728;b=805306368&a;if(0!==b)return F$3=2,b;if(0!==(1073741824&a))return F$3=1,1073741824;
	F$3=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y$3(358,a));}}
	function Uc(a,b){var c=a.pendingLanes;if(0===c)return F$3=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F$3=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F$3):(h&=f,0!==h&&(d=Rc(h),e=F$3));}else f=c&~g,0!==f?(d=Rc(f),e=F$3):0!==h&&(d=Rc(h),e=F$3);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F$3)return b;F$3=e;}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
	function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y$3(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
	function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c;}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r$3.unstable_UserBlockingPriority,ed=r$3.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d);}finally{(Kb=f)||Mb();}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d));}
	function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else {var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else {if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d);}jd(a,b,d,null,c);}}}}
	function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else {var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null;}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null;}else f!==e&&(e=null);}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
	function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return !0}function qd(){return !1}
	function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
	(a.returnValue=!1),this.isDefaultPrevented=pd);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd);},persist:function(){},isPersistent:pd});return b}
	var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
	a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return "movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
	Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
	119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
	var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return "keypress"===a.type?od(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===
	a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
	deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
	function ge(a,b){switch(a){case "keyup":return -1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return !0;default:return !1}}function he(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
	function ke(a,b){if(ie)return "compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
	var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}));}var pe=null,qe=null;function re(a){se(a,0);}function te(a){var b=ue(a);if(Wa(b))return a}
	function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput;}xe=ye;}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode);}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null);}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else {Kb=!0;try{Gb(a,b);}finally{Kb=!1,Mb();}}}}
	function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae();}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
	function Je(a,b){if(He(a,b))return !0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return !1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return !1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return !1;return !0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
	function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Ke(c);}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
	function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href;}catch(d){c=!1;}if(c)a=b.contentWindow;else break;b=Xa(a.document);}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
	var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
	function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)));}
	Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
	0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
	ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
	da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
	function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null;}
	function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k;}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k;}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
	function G$3(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d));}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba$1.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null);}));}
	function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d;}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h));}
	function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd;}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1);}
	function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return;}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode;}}d=d.return;}Nb(function(){var d=f,e=xb(c),g=[];
	a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
	Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td;}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
	t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return;}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}));}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
	x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null;}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
	gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u);}w=null;}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0);}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else {J=De;var K=Ce;}else (k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
	K.controlled&&"number"===h.type&&bb(h,"number",h.value);}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e);}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
	case "compositionupdate":L="onCompositionUpdate";break b}L=void 0;}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
	"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q);}se(g,b);});}function ef(a,b,c){return {instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return;}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
	function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return;}0!==g.length&&a.push({event:b,listeners:g});}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return !!b.autoFocus}return !1}
	function nf(a,b){return "textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""));}
	function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--;}else "/$"===c&&b++;}a=a.previousSibling;}return null}var tf=0;function uf(a){return {$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
	function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a);}return b}a=c;c=a.parentNode;}return null}function Cb(a){a=a[wf]||a[ff];return !a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y$3(33));}function Db(a){return a[xf]||null}
	function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return {current:a}}function H$3(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--);}function I$3(a,b){Af++;zf[Af]=a.current;a.current=b;}var Cf={},M$3=Bf(Cf),N$3=Bf(!1),Df=Cf;
	function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H$3(N$3);H$3(M$3);}function Hf(a,b,c){if(M$3.current!==Cf)throw Error(y$3(168));I$3(M$3,b);I$3(N$3,c);}
	function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y$3(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M$3.current;I$3(M$3,a);I$3(N$3,N$3.current);return !0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y$3(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H$3(N$3),H$3(M$3),I$3(M$3,a)):H$3(N$3);I$3(N$3,c);}
	var Lf=null,Mf=null,Nf=r$3.unstable_runWithPriority,Of=r$3.unstable_scheduleCallback,Pf=r$3.unstable_cancelCallback,Qf=r$3.unstable_shouldYield,Rf=r$3.unstable_requestPaint,Sf=r$3.unstable_now,Tf=r$3.unstable_getCurrentPriorityLevel,Uf=r$3.unstable_ImmediatePriority,Vf=r$3.unstable_UserBlockingPriority,Wf=r$3.unstable_NormalPriority,Xf=r$3.unstable_LowPriority,Yf=r$3.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O$3=1E4>dg?Sf:function(){return Sf()-dg};
	function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y$3(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y$3(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a);}jg();}
	function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null;}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1;}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null;}
	function rg(a){var b=mg.current;H$3(mg);a.type._context._currentValue=b;}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return;}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null);}
	function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y$3(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null};}else og=og.next=b;}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null};}
	function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function zg(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}}
	function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
	b;c.lastBaseUpdate=b;}
	function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k);}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
	next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0;}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f));}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
	f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null;}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A;}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y$3(191,e));e.call(d);}}}var Fg=(new aa$1.Component).refs;
	function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
	var Kg={isMounted:function(a){return (a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d);},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
	b);Ag(a,e);Jg(a,d,c);}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
	function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M$3.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null);}
	function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M$3.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
	(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4);}var Pg=Array.isArray;
	function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y$3(309));var d=c.stateNode;}if(!d)throw Error(y$3(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y$3(284));if(!c._owner)throw Error(y$3(290,a));}return a}
	function Rg(a,b){if("textarea"!==a.type)throw Error(y$3(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
	function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8;}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
	c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
	Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
	a.mode,c,null),b.return=a,b;Rg(a,b);}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c);}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
	null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d);}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
	n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q;}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y$3(150));h=l.call(h);if(null==
	h)throw Error(y$3(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q;}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
	u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
	d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling;}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h);}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=
	Wg(f,a.mode,h);d.return=a;a=d;}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y$3(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
	function dh(a){if(a===$g)throw Error(y$3(174));return a}function eh(a,b){I$3(ch,b);I$3(bh,a);I$3(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a);}H$3(ah);I$3(ah,b);}function fh(){H$3(ah);H$3(bh);H$3(ch);}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I$3(bh,a),I$3(ah,c));}function hh(a){bh.current===a&&(H$3(ah),H$3(bh));}var P$3=Bf(0);
	function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var jh=null,kh=null,lh=!1;
	function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return !1;default:return !1}}
	function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c);}jh=a;kh=rf(b.firstChild);}else a.flags=a.flags&-1025|2,lh=!1,jh=a;}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a;}
	function rh(a){if(a!==jh)return !1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y$3(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--;}else "$"!==c&&"$!"!==c&&"$?"!==c||b++;}a=a.nextSibling;}kh=null;}}else kh=jh?rf(a.stateNode.nextSibling):null;return !0}
	function sh(){kh=jh=null;lh=!1;}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0;}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R$3=null,S$3=null,T$3=null,yh=!1,zh=!1;function Ah(){throw Error(y$3(321));}function Bh(a,b){if(null===b)return !1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return !1;return !0}
	function Ch(a,b,c,d,e,f){xh=f;R$3=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y$3(301));f+=1;T$3=S$3=null;b.updateQueue=null;vh.current=Fh;a=c(d,e);}while(zh)}vh.current=Gh;b=null!==S$3&&null!==S$3.next;xh=0;T$3=S$3=R$3=null;yh=!1;if(b)throw Error(y$3(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T$3?R$3.memoizedState=T$3=a:T$3=T$3.next=a;return T$3}
	function Ih(){if(null===S$3){var a=R$3.alternate;a=null!==a?a.memoizedState:null;}else a=S$3.next;var b=null===T$3?R$3.memoizedState:T$3.next;if(null!==b)T$3=b,S$3=a;else {if(null===a)throw Error(y$3(310));S$3=a;a={memoizedState:S$3.memoizedState,baseState:S$3.baseState,baseQueue:S$3.baseQueue,queue:S$3.queue,next:null};null===T$3?R$3.memoizedState=T$3=a:T$3=T$3.next=a;}return T$3}function Jh(a,b){return "function"===typeof b?b(a):b}
	function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y$3(311));c.lastRenderedReducer=a;var d=S$3,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else {var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
	eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R$3.lanes|=l;Dg|=l;}k=k.next;}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d;}return [b.memoizedState,c.dispatch]}
	function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y$3(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}
	function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y$3(350));}
	function Nh(a,b,c,d){var e=U$1;if(null===e)throw Error(y$3(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T$3;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R$3;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
	e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v;}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes;}catch(q){c(function(){throw q;});}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R$3,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
	function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R$3,a);return [b.memoizedState,a]}
	function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R$3.updateQueue;null===b?(b={lastEffect:null},R$3.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R$3.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d);}
	function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S$3){var g=S$3.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R$3.flags|=a;e.memoizedState=Rh(1|b,c,f,d);}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}
	function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
	function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0);});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b();}finally{wh.transition=c;}});}
	function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R$3||null!==g&&g===R$3)zh=yh=!0;else {if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d);}}
	var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
	b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R$3,a);return [d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
	wh.transition=1;try{d(a);}finally{wh.transition=b;}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return [a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y$3(355));}),c=Qh(b)[1];0===(R$3.mode&2)&&(R$3.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36));},
	void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a);}finally{wh.transition=b;}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return [Th().current,
	a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a);}finally{wh.transition=b;}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return [Th().current,
	a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d);}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
	function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
	function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
	function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
	function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128;}function li(a,b,c,d,e){var f=Ff(c)?Df:M$3.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
	function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b);}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M$3.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
	"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N$3.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
	typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1);}else {g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M$3.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
	"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N$3.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
	x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
	h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1);}return qi(a,b,c,d,f,e)}
	function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo);}
	var si={dehydrated:null,retryLane:0};
	function ti(a,b,c){var d=b.pendingProps,e=P$3.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I$3(P$3,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
	b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
	{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
	function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
	function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b);}
	function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f);}
	function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P$3.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else {if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}I$3(P$3,d);if(0===(b.mode&2))b.memoizedState=
	null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null;}return b.child}
	function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y$3(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}return null}var Bi,Ci,Di,Ei;
	Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};Ci=function(){};
	Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf);}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
	l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="");}else "dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
	(c={}),c[g]=k[g]);}else c||(f||(f=[]),f.push(l,c)),c=k;else "dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G$3("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k));}c&&(f=f||[]).push("style",
	c);var l=f;if(b.updateQueue=l)b.flags|=4;}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4);};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
	function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H$3(N$3);H$3(M$3);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else {if(!d){if(null===
	b.stateNode)throw Error(y$3(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G$3("cancel",d);G$3("close",d);break;case "iframe":case "object":case "embed":G$3("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G$3(Xe[a],d);break;case "source":G$3("error",d);break;case "img":case "image":case "link":G$3("error",d);G$3("load",d);break;case "details":G$3("toggle",d);break;case "input":Za(d,f);G$3("invalid",d);break;case "select":d._wrapperState=
	{wasMultiple:!!f.multiple};G$3("invalid",d);break;case "textarea":hb(d,f),G$3("invalid",d);}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G$3("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
	jf);}d=a;b.updateQueue=d;null!==d&&(b.flags|=4);}else {g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G$3("cancel",a);G$3("close",a);
	e=d;break;case "iframe":case "object":case "embed":G$3("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G$3(Xe[e],a);e=d;break;case "source":G$3("error",a);e=d;break;case "img":case "image":case "link":G$3("error",a);G$3("load",a);e=d;break;case "details":G$3("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G$3("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G$3("invalid",a);break;case "textarea":hb(a,d);e=
	gb(a,d);G$3("invalid",a);break;default:e=d;}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G$3("scroll",a):null!=k&&qa(a,f,k,g));}switch(c){case "input":Va(a);cb(a,d,!1);
	break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf);}mf(c,d)&&(b.flags|=4);}null!==b.ref&&(b.flags|=128);}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else {if("string"!==typeof d&&null===b.stateNode)throw Error(y$3(166));
	c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d);}return null;case 13:H$3(P$3);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P$3.current&1))0===V$1&&(V$1=3);else {if(0===V$1||3===V$1)V$1=
	4;null===U$1||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U$1,W$1);}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H$3(P$3);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else {if(0!==V$1||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
	null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
	f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I$3(P$3,P$3.current&1|2);return b.child}a=a.sibling;}null!==d.tail&&O$3()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432);}else {if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O$3()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
	64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g);}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O$3(),c.sibling=null,b=P$3.current,I$3(P$3,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y$3(156,b.tag));}
	function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H$3(N$3);H$3(M$3);uh();b=a.flags;if(0!==(b&64))throw Error(y$3(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H$3(P$3),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H$3(P$3),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
	function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b);};return c}
	function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
	function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null);}catch(c){Wi(a,c);}else b.current=null;}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b;}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y$3(163));}
	function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d();}a=a.next;}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d;}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
	b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode;}Eg(c,b,a);}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
	return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y$3(163));}
	function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else {d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e);}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
	a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}
	function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b);}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else {d=b;try{e();}catch(f){Wi(d,f);}}c=c.next;}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount();}catch(f){Wi(b,
	f);}break;case 5:Vi(b);break;case 4:cj(a,b);}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null;}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
	function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return;}throw Error(y$3(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y$3(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
	c.child||4===c.tag)continue b;else c.child.return=c,c=c.child;}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b);}
	function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling;}
	function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling;}
	function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y$3(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return;}d=!0;}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else {if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return;}k.sibling.return=k.return;k=k.sibling;}f?(g=e,h=c.stateNode,
	8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode);}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1);}c.sibling.return=c.return;c=c.sibling;}}
	function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
	2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b);}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1));}}}return;case 6:if(null===b.stateNode)throw Error(y$3(162));b.stateNode.nodeValue=
	b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O$3(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y$3(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}
	function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X$1=0,U$1=null,Y$1=null,W$1=0,qj=0,rj=Bf(0),V$1=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O$3()+500;}var Z$1=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X$1&48)?O$3():-1!==Fj?Fj:Fj=O$3()}
	function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X$1&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
	function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y$3(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U$1&&(Hi|=b,4===V$1&&Ii(a,W$1));var d=eg();1===b?0!==(X$1&8)&&0===(X$1&48)?Lj(a):(Mj(a,c),0===X$1&&(wj(),ig())):(0===(X$1&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a;}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
	function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F$3;f[h]=10<=n?l+250:6<=n?l+5E3:-1;}}else l<=b&&(a.expiredLanes|=k);g&=~k;}d=Uc(a,a===U$1?W$1:0);b=F$3;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else {if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c);}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
	c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c;}}
	function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X$1&48))throw Error(y$3(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U$1?W$1:0);if(0===c)return null;var d=c;var e=X$1;X$1|=16;var f=Pj();if(U$1!==a||W$1!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h);}while(1);qg();oj.current=f;X$1=e;null!==Y$1?d=0:(U$1=null,W$1=0,d=V$1);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X$1|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O$3()),b;a.finishedWork=
	a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y$3(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O$3(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f;}c=e;c=O$3()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
	c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y$3(329));}}Mj(a,O$3());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d;}}
	function Lj(a){if(0!==(X$1&48))throw Error(y$3(327));Oj();if(a===U$1&&0!==(a.expiredLanes&W$1)){var b=W$1;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b));}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X$1|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O$3()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O$3());return null}
	function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O$3());});}ig();}function Wj(a,b){var c=X$1;X$1|=1;try{return a(b)}finally{X$1=c,0===X$1&&(wj(),ig());}}function Xj(a,b){var c=X$1;X$1&=-2;X$1|=8;try{return a(b)}finally{X$1=c,0===X$1&&(wj(),ig());}}function ni(a,b){I$3(rj,qj);qj|=b;tj|=b;}function Ki(){qj=rj.current;H$3(rj);}
	function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y$1)for(c=Y$1.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H$3(N$3);H$3(M$3);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H$3(P$3);break;case 19:H$3(P$3);break;case 10:rg(d);break;case 23:case 24:Ki();}c=c.return;}U$1=a;Y$1=Tg(a.current,null);W$1=qj=tj=b;V$1=0;sj=null;uj=Hi=Dg=0;}
	function Sj(a,b){do{var c=Y$1;try{qg();vh.current=Gh;if(yh){for(var d=R$3.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}yh=!1;}xh=0;T$3=S$3=R$3=null;zh=!1;pj.current=null;if(null===c||null===c.return){V$1=1;sj=b;Y$1=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W$1;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
	(h.updateQueue=null,h.memoizedState=null);}var A=0!==(P$3.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else {var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0;}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u;}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else {var t=zg(-1,1);t.tag=2;Ag(h,t);}h.lanes|=1;break a}k=
	void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v);}p.flags|=4096;p.lanes=b;break a}p=p.return;}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");}5!==V$1&&(V$1=2);k=Mi(k,h);p=
	g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return;}while(null!==p)}Zj(c);}catch(va){b=va;Y$1===c&&null!==c&&(Y$1=c=c.return);continue}break}while(1)}
	function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X$1;X$1|=16;var d=Pj();U$1===a&&W$1===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e);}while(1);qg();X$1=c;oj.current=d;if(null!==Y$1)throw Error(y$3(261));U$1=null;W$1=0;return V$1}function ak(){for(;null!==Y$1;)bk(Y$1);}function Rj(){for(;null!==Y$1&&!Qf();)bk(Y$1);}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y$1=b;pj.current=null;}
	function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y$1=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d;}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
	a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b));}else {c=Li(b);if(null!==c){c.flags&=2047;Y$1=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048);}b=b.sibling;if(null!==b){Y$1=b;return}Y$1=b=a;}while(null!==b);0===V$1&&(V$1=5);}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
	function dk(a,b){do Oj();while(null!==yj);if(0!==(X$1&48))throw Error(y$3(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y$3(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l;}null!==
	Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U$1&&(Y$1=U$1=null,W$1=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X$1;X$1|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType;}catch(va){h=null;
	break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u;}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode;}w=u;}h=-1===A||-1===p?null:{start:A,end:p};}else h=null;h=h||{start:0,end:0};}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z$1=d;do try{ek();}catch(va){if(null===
	Z$1)throw Error(y$3(330));Wi(Z$1,va);Z$1=Z$1.nextEffect;}while(null!==Z$1);Ij=null;Z$1=d;do try{for(g=a;null!==Z$1;){var t=Z$1.flags;t&16&&pb(Z$1.stateNode,"");if(t&128){var q=Z$1.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null);}}switch(t&1038){case 2:fj(Z$1);Z$1.flags&=-3;break;case 6:fj(Z$1);Z$1.flags&=-3;ij(Z$1.alternate,Z$1);break;case 1024:Z$1.flags&=-1025;break;case 1028:Z$1.flags&=-1025;ij(Z$1.alternate,Z$1);break;case 4:ij(Z$1.alternate,Z$1);break;case 8:h=Z$1;cj(g,h);var J=h.alternate;dj(h);null!==
	J&&dj(J);}Z$1=Z$1.nextEffect;}}catch(va){if(null===Z$1)throw Error(y$3(330));Wi(Z$1,va);Z$1=Z$1.nextEffect;}while(null!==Z$1);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
	g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
	0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top;}fd=!!kf;lf=kf=null;a.current=c;Z$1=d;do try{for(t=a;null!==Z$1;){var K=Z$1.flags;K&36&&Yi(t,Z$1.alternate,Z$1);if(K&128){q=void 0;var Q=Z$1.ref;if(null!==Q){var L=Z$1.stateNode;switch(Z$1.tag){case 5:q=L;break;default:q=L;}"function"===typeof Q?Q(q):Q.current=q;}}Z$1=Z$1.nextEffect;}}catch(va){if(null===Z$1)throw Error(y$3(330));Wi(Z$1,va);Z$1=Z$1.nextEffect;}while(null!==Z$1);Z$1=null;$f();X$1=e;}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z$1=d;null!==Z$1;)b=
	Z$1.nextEffect,Z$1.nextEffect=null,Z$1.flags&8&&(K=Z$1,K.sibling=null,K.stateNode=null),Z$1=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64));}catch(va){}Mj(a,O$3());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X$1&8))return null;ig();return null}
	function ek(){for(;null!==Z$1;){var a=Z$1.alternate;Jj||null===Ij||(0!==(Z$1.flags&8)?dc(Z$1,Ij)&&(Jj=!0):13===Z$1.tag&&mj(a,Z$1)&&dc(Z$1,Ij)&&(Jj=!0));var b=Z$1.flags;0!==(b&256)&&Xi(a,Z$1);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z$1=Z$1.nextEffect;}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return !1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}));}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}));}
	function fk(){if(null===yj)return !1;var a=yj;yj=null;if(0!==(X$1&48))throw Error(y$3(331));var b=X$1;X$1|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g();}catch(k){if(null===f)throw Error(y$3(330));Wi(f,k);}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h();}catch(k){if(null===f)throw Error(y$3(330));Wi(f,k);}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
	null,h.stateNode=null),h=a;X$1=b;ig();return !0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b));}
	function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a);}catch(f){}break}}c=c.return;}}
	function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U$1===a&&(W$1&c)===c&&(4===V$1||3===V$1&&(W$1&62914560)===W$1&&500>O$3()-jj?Qj(a,0):uj|=c);Mj(a,b);}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c));}var ck;
	ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N$3.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else {ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I$3(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I$3(P$3,P$3.current&1);b=hi(a,b,c);return null!==
	b?b.sibling:null}I$3(P$3,P$3.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64;}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I$3(P$3,P$3.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M$3.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
	typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b);}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c);}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
	a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y$3(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y$3(282));
	d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else {e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling;}else fi(a,b,d,c),sh();b=b.child;}return b;case 5:return gh(b),null===a&&
	ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
	c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I$3(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N$3.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
	k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next;}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return;}h=g;}fi(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
	f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y$3(156,b.tag));
	};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null;}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return !(!a||!a.isReactComponent)}
	function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
	function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
	c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
	function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
	typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y$3(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
	function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null;}
	function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
	function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y$3(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return;}while(null!==h);throw Error(y$3(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h;}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
	d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b);}function pk(){return null}
	function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e);}this._internalRoot=c;}
	qk.prototype.render=function(a){lk(a,this._internalRoot,null,null);};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null;});};function rk(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
	function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
	function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a);};}lk(b,g,a,e);}else {f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a);};}Xj(function(){lk(b,g,a,e);});}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4);}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864);}};
	gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c);}};hc=function(a,b){return b()};
	yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y$3(90));Wa(d);ab(d,e);}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1);}};Gb=Wj;
	Hb=function(a,b,c,d,e){var f=X$1;X$1|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X$1=f,0===X$1&&(wj(),ig());}};Ib=function(){0===(X$1&49)&&(Vj(),Oj());};Jb=function(a,b){var c=X$1;X$1|=2;try{return a(b)}finally{X$1=c,0===X$1&&(wj(),ig());}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y$3(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"};
	var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
	pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk;}catch(a){}}reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;reactDom_production_min.createPortal=uk;
	reactDom_production_min.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y$3(188));throw Error(y$3(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};reactDom_production_min.flushSync=function(a,b){var c=X$1;if(0!==(c&48))return a(b);X$1|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X$1=c,ig();}};reactDom_production_min.hydrate=function(a,b,c){if(!rk(b))throw Error(y$3(200));return tk(null,a,b,!0,c)};
	reactDom_production_min.render=function(a,b,c){if(!rk(b))throw Error(y$3(200));return tk(null,a,b,!1,c)};reactDom_production_min.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y$3(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null;});}),!0):!1};reactDom_production_min.unstable_batchedUpdates=Wj;reactDom_production_min.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
	reactDom_production_min.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y$3(200));if(null==a||void 0===a._reactInternals)throw Error(y$3(38));return tk(a,b,c,!1,d)};reactDom_production_min.version="17.0.2";

	(function (module) {

		function checkDCE() {
		  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
		  if (
		    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
		    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
		  ) {
		    return;
		  }
		  try {
		    // Verify that the code above has been dead code eliminated (DCE'd).
		    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		  } catch (err) {
		    // DevTools shouldn't crash React, no matter what.
		    // We should still report in case we break this code.
		    console.error(err);
		  }
		}

		{
		  // DCE check should happen before ReactDOM bundle executes so that
		  // DevTools can report bad minification during injection.
		  checkDCE();
		  module.exports = reactDom_production_min;
		}
	} (reactDom));

	var reactExports$2 = {};
	var react$2 = {
	  get exports(){ return reactExports$2; },
	  set exports(v){ reactExports$2 = v; },
	};

	var react_production_min$2 = {};

	/** @license React v16.14.0
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var l$2=objectAssign,n$2="function"===typeof Symbol&&Symbol.for,p$2=n$2?Symbol.for("react.element"):60103,q$2=n$2?Symbol.for("react.portal"):60106,r$2=n$2?Symbol.for("react.fragment"):60107,t$2=n$2?Symbol.for("react.strict_mode"):60108,u$2=n$2?Symbol.for("react.profiler"):60114,v$2=n$2?Symbol.for("react.provider"):60109,w$2=n$2?Symbol.for("react.context"):60110,x$2=n$2?Symbol.for("react.forward_ref"):60112,y$2=n$2?Symbol.for("react.suspense"):60113,z$2=n$2?Symbol.for("react.memo"):60115,A$2=n$2?Symbol.for("react.lazy"):
	60116,B$2="function"===typeof Symbol&&Symbol.iterator;function C$2(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var D$2={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E$2={};function F$2(a,b,c){this.props=a;this.context=b;this.refs=E$2;this.updater=c||D$2;}F$2.prototype.isReactComponent={};F$2.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C$2(85));this.updater.enqueueSetState(this,a,b,"setState");};F$2.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function G$2(){}G$2.prototype=F$2.prototype;function H$2(a,b,c){this.props=a;this.context=b;this.refs=E$2;this.updater=c||D$2;}var I$2=H$2.prototype=new G$2;I$2.constructor=H$2;l$2(I$2,F$2.prototype);I$2.isPureReactComponent=!0;var J$2={current:null},K$2=Object.prototype.hasOwnProperty,L$2={key:!0,ref:!0,__self:!0,__source:!0};
	function M$2(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K$2.call(b,e)&&!L$2.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h;}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return {$$typeof:p$2,type:a,key:g,ref:k,props:d,_owner:J$2.current}}
	function N$2(a,b){return {$$typeof:p$2,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O$2(a){return "object"===typeof a&&null!==a&&a.$$typeof===p$2}function escape$2(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P$2=/\/+/g,Q$2=[];function R$2(a,b,c,e){if(Q$2.length){var d=Q$2.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return {result:a,keyPrefix:b,func:c,context:e,count:0}}
	function S$2(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q$2.length&&Q$2.push(a);}
	function T$2(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p$2:case q$2:g=!0;}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T$2(d,f,c,e);}else if(null===a||"object"!==typeof a?f=null:(f=B$2&&a[B$2]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
	0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T$2(d,f,c,e);else if("object"===d)throw c=""+a,Error(C$2(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T$2(a,"",b,c)}function U(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape$2(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++);}
	function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O$2(a)&&(a=N$2(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P$2,"$&/")+"/")+c)),e.push(a));}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P$2,"$&/")+"/");b=R$2(b,g,e,d);V(a,aa,b);S$2(b);}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C$2(321));return a}
	var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J$2,IsSomeRendererActing:{current:!1},assign:l$2};react_production_min$2.Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R$2(null,null,b,c);V(a,W,b);S$2(b);},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O$2(a))throw Error(C$2(143));return a}};
	react_production_min$2.Component=F$2;react_production_min$2.Fragment=r$2;react_production_min$2.Profiler=u$2;react_production_min$2.PureComponent=H$2;react_production_min$2.StrictMode=t$2;react_production_min$2.Suspense=y$2;react_production_min$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
	react_production_min$2.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C$2(267,a));var e=l$2({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J$2.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K$2.call(b,h)&&!L$2.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h]);}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f;}return {$$typeof:p$2,type:a.type,
	key:d,ref:g,props:e,_owner:k}};react_production_min$2.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w$2,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v$2,_context:a};return a.Consumer=a};react_production_min$2.createElement=M$2;react_production_min$2.createFactory=function(a){var b=M$2.bind(null,a);b.type=a;return b};react_production_min$2.createRef=function(){return {current:null}};react_production_min$2.forwardRef=function(a){return {$$typeof:x$2,render:a}};react_production_min$2.isValidElement=O$2;
	react_production_min$2.lazy=function(a){return {$$typeof:A$2,_ctor:a,_status:-1,_result:null}};react_production_min$2.memo=function(a,b){return {$$typeof:z$2,type:a,compare:void 0===b?null:b}};react_production_min$2.useCallback=function(a,b){return Z().useCallback(a,b)};react_production_min$2.useContext=function(a,b){return Z().useContext(a,b)};react_production_min$2.useDebugValue=function(){};react_production_min$2.useEffect=function(a,b){return Z().useEffect(a,b)};react_production_min$2.useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
	react_production_min$2.useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};react_production_min$2.useMemo=function(a,b){return Z().useMemo(a,b)};react_production_min$2.useReducer=function(a,b,c){return Z().useReducer(a,b,c)};react_production_min$2.useRef=function(a){return Z().useRef(a)};react_production_min$2.useState=function(a){return Z().useState(a)};react_production_min$2.version="16.14.0";

	(function (module) {

		{
		  module.exports = react_production_min$2;
		}
	} (react$2));

	var index = /*@__PURE__*/getDefaultExportFromCjs(reactExports$2);

	var React$2 = /*#__PURE__*/_mergeNamespaces({
		__proto__: null,
		default: index
	}, [reactExports$2]);

	/**
	 * @remix-run/router v1.4.0
	 *
	 * Copyright (c) Remix Software Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.md file in the root directory of this source tree.
	 *
	 * @license MIT
	 */
	function _extends$3() {
	  _extends$3 = Object.assign ? Object.assign.bind() : function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	  return _extends$3.apply(this, arguments);
	}

	////////////////////////////////////////////////////////////////////////////////
	//#region Types and Constants
	////////////////////////////////////////////////////////////////////////////////

	/**
	 * Actions represent the type of change to a location value.
	 */
	var Action;

	(function (Action) {
	  /**
	   * A POP indicates a change to an arbitrary index in the history stack, such
	   * as a back or forward navigation. It does not describe the direction of the
	   * navigation, only that the current index changed.
	   *
	   * Note: This is the default action for newly created history objects.
	   */
	  Action["Pop"] = "POP";
	  /**
	   * A PUSH indicates a new entry being added to the history stack, such as when
	   * a link is clicked and a new page loads. When this happens, all subsequent
	   * entries in the stack are lost.
	   */

	  Action["Push"] = "PUSH";
	  /**
	   * A REPLACE indicates the entry at the current index in the history stack
	   * being replaced by a new one.
	   */

	  Action["Replace"] = "REPLACE";
	})(Action || (Action = {}));

	const PopStateEventType = "popstate";
	/**
	 * Browser history stores the location in regular URLs. This is the standard for
	 * most web apps, but it requires some configuration on the server to ensure you
	 * serve the same app at multiple URLs.
	 *
	 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
	 */

	function createBrowserHistory(options) {
	  if (options === void 0) {
	    options = {};
	  }

	  function createBrowserLocation(window, globalHistory) {
	    let {
	      pathname,
	      search,
	      hash
	    } = window.location;
	    return createLocation("", {
	      pathname,
	      search,
	      hash
	    }, // state defaults to `null` because `window.history.state` does
	    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
	  }

	  function createBrowserHref(window, to) {
	    return typeof to === "string" ? to : createPath(to);
	  }

	  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
	}
	function invariant(value, message) {
	  if (value === false || value === null || typeof value === "undefined") {
	    throw new Error(message);
	  }
	}
	function warning(cond, message) {
	  if (!cond) {
	    // eslint-disable-next-line no-console
	    if (typeof console !== "undefined") console.warn(message);

	    try {
	      // Welcome to debugging history!
	      //
	      // This error is thrown as a convenience so you can more easily
	      // find the source for a warning that appears in the console by
	      // enabling "pause on exceptions" in your JavaScript debugger.
	      throw new Error(message); // eslint-disable-next-line no-empty
	    } catch (e) {}
	  }
	}

	function createKey() {
	  return Math.random().toString(36).substr(2, 8);
	}
	/**
	 * For browser-based histories, we combine the state and key into an object
	 */


	function getHistoryState(location, index) {
	  return {
	    usr: location.state,
	    key: location.key,
	    idx: index
	  };
	}
	/**
	 * Creates a Location object with a unique key from the given Path
	 */


	function createLocation(current, to, state, key) {
	  if (state === void 0) {
	    state = null;
	  }

	  let location = _extends$3({
	    pathname: typeof current === "string" ? current : current.pathname,
	    search: "",
	    hash: ""
	  }, typeof to === "string" ? parsePath(to) : to, {
	    state,
	    // TODO: This could be cleaned up.  push/replace should probably just take
	    // full Locations now and avoid the need to run through this flow at all
	    // But that's a pretty big refactor to the current test suite so going to
	    // keep as is for the time being and just let any incoming keys take precedence
	    key: to && to.key || key || createKey()
	  });

	  return location;
	}
	/**
	 * Creates a string URL path from the given pathname, search, and hash components.
	 */

	function createPath(_ref) {
	  let {
	    pathname = "/",
	    search = "",
	    hash = ""
	  } = _ref;
	  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
	  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	  return pathname;
	}
	/**
	 * Parses a string URL path into its separate pathname, search, and hash components.
	 */

	function parsePath(path) {
	  let parsedPath = {};

	  if (path) {
	    let hashIndex = path.indexOf("#");

	    if (hashIndex >= 0) {
	      parsedPath.hash = path.substr(hashIndex);
	      path = path.substr(0, hashIndex);
	    }

	    let searchIndex = path.indexOf("?");

	    if (searchIndex >= 0) {
	      parsedPath.search = path.substr(searchIndex);
	      path = path.substr(0, searchIndex);
	    }

	    if (path) {
	      parsedPath.pathname = path;
	    }
	  }

	  return parsedPath;
	}

	function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  let {
	    window = document.defaultView,
	    v5Compat = false
	  } = options;
	  let globalHistory = window.history;
	  let action = Action.Pop;
	  let listener = null;
	  let index = getIndex(); // Index should only be null when we initialize. If not, it's because the
	  // user called history.pushState or history.replaceState directly, in which
	  // case we should log a warning as it will result in bugs.

	  if (index == null) {
	    index = 0;
	    globalHistory.replaceState(_extends$3({}, globalHistory.state, {
	      idx: index
	    }), "");
	  }

	  function getIndex() {
	    let state = globalHistory.state || {
	      idx: null
	    };
	    return state.idx;
	  }

	  function handlePop() {
	    action = Action.Pop;
	    let nextIndex = getIndex();
	    let delta = nextIndex == null ? null : nextIndex - index;
	    index = nextIndex;

	    if (listener) {
	      listener({
	        action,
	        location: history.location,
	        delta
	      });
	    }
	  }

	  function push(to, state) {
	    action = Action.Push;
	    let location = createLocation(history.location, to, state);
	    if (validateLocation) validateLocation(location, to);
	    index = getIndex() + 1;
	    let historyState = getHistoryState(location, index);
	    let url = history.createHref(location); // try...catch because iOS limits us to 100 pushState calls :/

	    try {
	      globalHistory.pushState(historyState, "", url);
	    } catch (error) {
	      // They are going to lose state here, but there is no real
	      // way to warn them about it since the page will refresh...
	      window.location.assign(url);
	    }

	    if (v5Compat && listener) {
	      listener({
	        action,
	        location: history.location,
	        delta: 1
	      });
	    }
	  }

	  function replace(to, state) {
	    action = Action.Replace;
	    let location = createLocation(history.location, to, state);
	    if (validateLocation) validateLocation(location, to);
	    index = getIndex();
	    let historyState = getHistoryState(location, index);
	    let url = history.createHref(location);
	    globalHistory.replaceState(historyState, "", url);

	    if (v5Compat && listener) {
	      listener({
	        action,
	        location: history.location,
	        delta: 0
	      });
	    }
	  }

	  function createURL(to) {
	    // window.location.origin is "null" (the literal string value) in Firefox
	    // under certain conditions, notably when serving from a local HTML file
	    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
	    let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
	    let href = typeof to === "string" ? to : createPath(to);
	    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
	    return new URL(href, base);
	  }

	  let history = {
	    get action() {
	      return action;
	    },

	    get location() {
	      return getLocation(window, globalHistory);
	    },

	    listen(fn) {
	      if (listener) {
	        throw new Error("A history only accepts one active listener");
	      }

	      window.addEventListener(PopStateEventType, handlePop);
	      listener = fn;
	      return () => {
	        window.removeEventListener(PopStateEventType, handlePop);
	        listener = null;
	      };
	    },

	    createHref(to) {
	      return createHref(window, to);
	    },

	    createURL,

	    encodeLocation(to) {
	      // Encode a Location the same way window.location would
	      let url = createURL(to);
	      return {
	        pathname: url.pathname,
	        search: url.search,
	        hash: url.hash
	      };
	    },

	    push,
	    replace,

	    go(n) {
	      return globalHistory.go(n);
	    }

	  };
	  return history;
	} //#endregion

	var ResultType;

	(function (ResultType) {
	  ResultType["data"] = "data";
	  ResultType["deferred"] = "deferred";
	  ResultType["redirect"] = "redirect";
	  ResultType["error"] = "error";
	})(ResultType || (ResultType = {}));
	/**
	 * Matches the given routes to a location and returns the match data.
	 *
	 * @see https://reactrouter.com/utils/match-routes
	 */

	function matchRoutes(routes, locationArg, basename) {
	  if (basename === void 0) {
	    basename = "/";
	  }

	  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
	  let pathname = stripBasename(location.pathname || "/", basename);

	  if (pathname == null) {
	    return null;
	  }

	  let branches = flattenRoutes(routes);
	  rankRouteBranches(branches);
	  let matches = null;

	  for (let i = 0; matches == null && i < branches.length; ++i) {
	    matches = matchRouteBranch(branches[i], // Incoming pathnames are generally encoded from either window.location
	    // or from router.navigate, but we want to match against the unencoded
	    // paths in the route definitions.  Memory router locations won't be
	    // encoded here but there also shouldn't be anything to decode so this
	    // should be a safe operation.  This avoids needing matchRoutes to be
	    // history-aware.
	    safelyDecodeURI(pathname));
	  }

	  return matches;
	}

	function flattenRoutes(routes, branches, parentsMeta, parentPath) {
	  if (branches === void 0) {
	    branches = [];
	  }

	  if (parentsMeta === void 0) {
	    parentsMeta = [];
	  }

	  if (parentPath === void 0) {
	    parentPath = "";
	  }

	  let flattenRoute = (route, index, relativePath) => {
	    let meta = {
	      relativePath: relativePath === undefined ? route.path || "" : relativePath,
	      caseSensitive: route.caseSensitive === true,
	      childrenIndex: index,
	      route
	    };

	    if (meta.relativePath.startsWith("/")) {
	      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
	      meta.relativePath = meta.relativePath.slice(parentPath.length);
	    }

	    let path = joinPaths([parentPath, meta.relativePath]);
	    let routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
	    // route tree depth-first and child routes appear before their parents in
	    // the "flattened" version.

	    if (route.children && route.children.length > 0) {
	      invariant( // Our types know better, but runtime JS may not!
	      // @ts-expect-error
	      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
	      flattenRoutes(route.children, branches, routesMeta, path);
	    } // Routes without a path shouldn't ever match by themselves unless they are
	    // index routes, so don't add them to the list of possible branches.


	    if (route.path == null && !route.index) {
	      return;
	    }

	    branches.push({
	      path,
	      score: computeScore(path, route.index),
	      routesMeta
	    });
	  };

	  routes.forEach((route, index) => {
	    var _route$path;

	    // coarse-grain check for optional params
	    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
	      flattenRoute(route, index);
	    } else {
	      for (let exploded of explodeOptionalSegments(route.path)) {
	        flattenRoute(route, index, exploded);
	      }
	    }
	  });
	  return branches;
	}
	/**
	 * Computes all combinations of optional path segments for a given path,
	 * excluding combinations that are ambiguous and of lower priority.
	 *
	 * For example, `/one/:two?/three/:four?/:five?` explodes to:
	 * - `/one/three`
	 * - `/one/:two/three`
	 * - `/one/three/:four`
	 * - `/one/three/:five`
	 * - `/one/:two/three/:four`
	 * - `/one/:two/three/:five`
	 * - `/one/three/:four/:five`
	 * - `/one/:two/three/:four/:five`
	 */


	function explodeOptionalSegments(path) {
	  let segments = path.split("/");
	  if (segments.length === 0) return [];
	  let [first, ...rest] = segments; // Optional path segments are denoted by a trailing `?`

	  let isOptional = first.endsWith("?"); // Compute the corresponding required segment: `foo?` -> `foo`

	  let required = first.replace(/\?$/, "");

	  if (rest.length === 0) {
	    // Intepret empty string as omitting an optional segment
	    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
	    return isOptional ? [required, ""] : [required];
	  }

	  let restExploded = explodeOptionalSegments(rest.join("/"));
	  let result = []; // All child paths with the prefix.  Do this for all children before the
	  // optional version for all children so we get consistent ordering where the
	  // parent optional aspect is preferred as required.  Otherwise, we can get
	  // child sections interspersed where deeper optional segments are higher than
	  // parent optional segments, where for example, /:two would explodes _earlier_
	  // then /:one.  By always including the parent as required _for all children_
	  // first, we avoid this issue

	  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/"))); // Then if this is an optional value, add all child versions without

	  if (isOptional) {
	    result.push(...restExploded);
	  } // for absolute paths, ensure `/` instead of empty segment


	  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
	}

	function rankRouteBranches(branches) {
	  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
	  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
	}

	const paramRe = /^:\w+$/;
	const dynamicSegmentValue = 3;
	const indexRouteValue = 2;
	const emptySegmentValue = 1;
	const staticSegmentValue = 10;
	const splatPenalty = -2;

	const isSplat = s => s === "*";

	function computeScore(path, index) {
	  let segments = path.split("/");
	  let initialScore = segments.length;

	  if (segments.some(isSplat)) {
	    initialScore += splatPenalty;
	  }

	  if (index) {
	    initialScore += indexRouteValue;
	  }

	  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
	}

	function compareIndexes(a, b) {
	  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
	  return siblings ? // If two routes are siblings, we should try to match the earlier sibling
	  // first. This allows people to have fine-grained control over the matching
	  // behavior by simply putting routes with identical paths in the order they
	  // want them tried.
	  a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
	  // so they sort equally.
	  0;
	}

	function matchRouteBranch(branch, pathname) {
	  let {
	    routesMeta
	  } = branch;
	  let matchedParams = {};
	  let matchedPathname = "/";
	  let matches = [];

	  for (let i = 0; i < routesMeta.length; ++i) {
	    let meta = routesMeta[i];
	    let end = i === routesMeta.length - 1;
	    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
	    let match = matchPath({
	      path: meta.relativePath,
	      caseSensitive: meta.caseSensitive,
	      end
	    }, remainingPathname);
	    if (!match) return null;
	    Object.assign(matchedParams, match.params);
	    let route = meta.route;
	    matches.push({
	      // TODO: Can this as be avoided?
	      params: matchedParams,
	      pathname: joinPaths([matchedPathname, match.pathname]),
	      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
	      route
	    });

	    if (match.pathnameBase !== "/") {
	      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
	    }
	  }

	  return matches;
	}
	/**
	 * Performs pattern matching on a URL pathname and returns information about
	 * the match.
	 *
	 * @see https://reactrouter.com/utils/match-path
	 */

	function matchPath(pattern, pathname) {
	  if (typeof pattern === "string") {
	    pattern = {
	      path: pattern,
	      caseSensitive: false,
	      end: true
	    };
	  }

	  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
	  let match = pathname.match(matcher);
	  if (!match) return null;
	  let matchedPathname = match[0];
	  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
	  let captureGroups = match.slice(1);
	  let params = paramNames.reduce((memo, paramName, index) => {
	    // We need to compute the pathnameBase here using the raw splat value
	    // instead of using params["*"] later because it will be decoded then
	    if (paramName === "*") {
	      let splatValue = captureGroups[index] || "";
	      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
	    }

	    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
	    return memo;
	  }, {});
	  return {
	    params,
	    pathname: matchedPathname,
	    pathnameBase,
	    pattern
	  };
	}

	function compilePath(path, caseSensitive, end) {
	  if (caseSensitive === void 0) {
	    caseSensitive = false;
	  }

	  if (end === void 0) {
	    end = true;
	  }

	  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
	  let paramNames = [];
	  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
	  .replace(/^\/*/, "/") // Make sure it has a leading /
	  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
	  .replace(/\/:(\w+)/g, (_, paramName) => {
	    paramNames.push(paramName);
	    return "/([^\\/]+)";
	  });

	  if (path.endsWith("*")) {
	    paramNames.push("*");
	    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
	    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
	  } else if (end) {
	    // When matching to the end, ignore trailing slashes
	    regexpSource += "\\/*$";
	  } else if (path !== "" && path !== "/") {
	    // If our path is non-empty and contains anything beyond an initial slash,
	    // then we have _some_ form of path in our regex so we should expect to
	    // match only if we find the end of this path segment.  Look for an optional
	    // non-captured trailing slash (to match a portion of the URL) or the end
	    // of the path (if we've matched to the end).  We used to do this with a
	    // word boundary but that gives false positives on routes like
	    // /user-preferences since `-` counts as a word boundary.
	    regexpSource += "(?:(?=\\/|$))";
	  } else ;

	  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
	  return [matcher, paramNames];
	}

	function safelyDecodeURI(value) {
	  try {
	    return decodeURI(value);
	  } catch (error) {
	    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
	    return value;
	  }
	}

	function safelyDecodeURIComponent(value, paramName) {
	  try {
	    return decodeURIComponent(value);
	  } catch (error) {
	    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
	    return value;
	  }
	}
	/**
	 * @private
	 */


	function stripBasename(pathname, basename) {
	  if (basename === "/") return pathname;

	  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
	    return null;
	  } // We want to leave trailing slash behavior in the user's control, so if they
	  // specify a basename with a trailing slash, we should support it


	  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
	  let nextChar = pathname.charAt(startIndex);

	  if (nextChar && nextChar !== "/") {
	    // pathname does not start with basename/
	    return null;
	  }

	  return pathname.slice(startIndex) || "/";
	}
	/**
	 * Returns a resolved path object relative to the given pathname.
	 *
	 * @see https://reactrouter.com/utils/resolve-path
	 */

	function resolvePath(to, fromPathname) {
	  if (fromPathname === void 0) {
	    fromPathname = "/";
	  }

	  let {
	    pathname: toPathname,
	    search = "",
	    hash = ""
	  } = typeof to === "string" ? parsePath(to) : to;
	  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
	  return {
	    pathname,
	    search: normalizeSearch(search),
	    hash: normalizeHash(hash)
	  };
	}

	function resolvePathname(relativePath, fromPathname) {
	  let segments = fromPathname.replace(/\/+$/, "").split("/");
	  let relativeSegments = relativePath.split("/");
	  relativeSegments.forEach(segment => {
	    if (segment === "..") {
	      // Keep the root "" segment so the pathname starts at /
	      if (segments.length > 1) segments.pop();
	    } else if (segment !== ".") {
	      segments.push(segment);
	    }
	  });
	  return segments.length > 1 ? segments.join("/") : "/";
	}

	function getInvalidPathError(char, field, dest, path) {
	  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
	}
	/**
	 * @private
	 *
	 * When processing relative navigation we want to ignore ancestor routes that
	 * do not contribute to the path, such that index/pathless layout routes don't
	 * interfere.
	 *
	 * For example, when moving a route element into an index route and/or a
	 * pathless layout route, relative link behavior contained within should stay
	 * the same.  Both of the following examples should link back to the root:
	 *
	 *   <Route path="/">
	 *     <Route path="accounts" element={<Link to=".."}>
	 *   </Route>
	 *
	 *   <Route path="/">
	 *     <Route path="accounts">
	 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
	 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
	 *       </Route
	 *     </Route>
	 *   </Route>
	 */


	function getPathContributingMatches(matches) {
	  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
	}
	/**
	 * @private
	 */

	function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
	  if (isPathRelative === void 0) {
	    isPathRelative = false;
	  }

	  let to;

	  if (typeof toArg === "string") {
	    to = parsePath(toArg);
	  } else {
	    to = _extends$3({}, toArg);
	    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
	    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
	    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
	  }

	  let isEmptyPath = toArg === "" || to.pathname === "";
	  let toPathname = isEmptyPath ? "/" : to.pathname;
	  let from; // Routing is relative to the current pathname if explicitly requested.
	  //
	  // If a pathname is explicitly provided in `to`, it should be relative to the
	  // route context. This is explained in `Note on `<Link to>` values` in our
	  // migration guide from v5 as a means of disambiguation between `to` values
	  // that begin with `/` and those that do not. However, this is problematic for
	  // `to` values that do not provide a pathname. `to` can simply be a search or
	  // hash string, in which case we should assume that the navigation is relative
	  // to the current location's pathname and *not* the route pathname.

	  if (isPathRelative || toPathname == null) {
	    from = locationPathname;
	  } else {
	    let routePathnameIndex = routePathnames.length - 1;

	    if (toPathname.startsWith("..")) {
	      let toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
	      // URL segment".  This is a key difference from how <a href> works and a
	      // major reason we call this a "to" value instead of a "href".

	      while (toSegments[0] === "..") {
	        toSegments.shift();
	        routePathnameIndex -= 1;
	      }

	      to.pathname = toSegments.join("/");
	    } // If there are more ".." segments than parent routes, resolve relative to
	    // the root / URL.


	    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
	  }

	  let path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original "to" had one

	  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"); // Or if this was a link to the current path which has a trailing slash

	  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");

	  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
	    path.pathname += "/";
	  }

	  return path;
	}
	/**
	 * @private
	 */

	const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
	/**
	 * @private
	 */

	const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
	/**
	 * @private
	 */

	const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
	/**
	 * @private
	 */

	const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
	/**
	 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
	 * Response thrown from an action/loader
	 */

	function isRouteErrorResponse(error) {
	  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
	}

	/**
	 * React Router v6.9.0
	 *
	 * Copyright (c) Remix Software Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.md file in the root directory of this source tree.
	 *
	 * @license MIT
	 */

	/**
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */

	function isPolyfill(x, y) {
	  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
	  ;
	}

	const is = typeof Object.is === "function" ? Object.is : isPolyfill; // Intentionally not using named imports because Rollup uses dynamic
	// dispatch for CommonJS interop named imports.

	const {
	  useState,
	  useEffect,
	  useLayoutEffect,
	  useDebugValue
	} = React$2;
	// because of a very particular set of implementation details and assumptions
	// -- change any one of them and it will break. The most important assumption
	// is that updates are always synchronous, because concurrent rendering is
	// only available in versions of React that also have a built-in
	// useSyncExternalStore API. And we only use this shim when the built-in API
	// does not exist.
	//
	// Do not assume that the clever hacks used by this hook also work in general.
	// The point of this shim is to replace the need for hacks by other libraries.

	function useSyncExternalStore$2(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
	// React do not expose a way to check if we're hydrating. So users of the shim
	// will need to track that themselves and return the correct value
	// from `getSnapshot`.
	getServerSnapshot) {
	  // breaks the rules of React, and only works here because of specific
	  // implementation details, most importantly that updates are
	  // always synchronous.


	  const value = getSnapshot();
	  // re-render whenever the subscribed state changes by updating an some
	  // arbitrary useState hook. Then, during render, we call getSnapshot to read
	  // the current value.
	  //
	  // Because we don't actually use the state returned by the useState hook, we
	  // can save a bit of memory by storing other stuff in that slot.
	  //
	  // To implement the early bailout, we need to track some things on a mutable
	  // object. Usually, we would put that in a useRef hook, but we can stash it in
	  // our useState hook instead.
	  //
	  // To force a re-render, we call forceUpdate({inst}). That works because the
	  // new object always fails an equality check.


	  const [{
	    inst
	  }, forceUpdate] = useState({
	    inst: {
	      value,
	      getSnapshot
	    }
	  }); // Track the latest getSnapshot function with a ref. This needs to be updated
	  // in the layout phase so we can access it during the tearing check that
	  // happens on subscribe.

	  useLayoutEffect(() => {
	    inst.value = value;
	    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
	    // commit phase if there was an interleaved mutation. In concurrent mode
	    // this can happen all the time, but even in synchronous mode, an earlier
	    // effect may have mutated the store.

	    if (checkIfSnapshotChanged(inst)) {
	      // Force a re-render.
	      forceUpdate({
	        inst
	      });
	    } // eslint-disable-next-line react-hooks/exhaustive-deps

	  }, [subscribe, value, getSnapshot]);
	  useEffect(() => {
	    // Check for changes right before subscribing. Subsequent changes will be
	    // detected in the subscription handler.
	    if (checkIfSnapshotChanged(inst)) {
	      // Force a re-render.
	      forceUpdate({
	        inst
	      });
	    }

	    const handleStoreChange = () => {
	      // TODO: Because there is no cross-renderer API for batching updates, it's
	      // up to the consumer of this library to wrap their subscription event
	      // with unstable_batchedUpdates. Should we try to detect when this isn't
	      // the case and print a warning in development?
	      // The store changed. Check if the snapshot changed since the last time we
	      // read from the store.
	      if (checkIfSnapshotChanged(inst)) {
	        // Force a re-render.
	        forceUpdate({
	          inst
	        });
	      }
	    }; // Subscribe to the store and return a clean-up function.


	    return subscribe(handleStoreChange); // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [subscribe]);
	  useDebugValue(value);
	  return value;
	}

	function checkIfSnapshotChanged(inst) {
	  const latestGetSnapshot = inst.getSnapshot;
	  const prevValue = inst.value;

	  try {
	    const nextValue = latestGetSnapshot();
	    return !is(prevValue, nextValue);
	  } catch (error) {
	    return true;
	  }
	}

	/**
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @flow
	 */
	function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
	  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
	  // React do not expose a way to check if we're hydrating. So users of the shim
	  // will need to track that themselves and return the correct value
	  // from `getSnapshot`.
	  return getSnapshot();
	}

	/**
	 * Inlined into the react-router repo since use-sync-external-store does not
	 * provide a UMD-compatible package, so we need this to be able to distribute
	 * UMD react-router bundles
	 */
	const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
	const isServerEnvironment = !canUseDOM;
	const shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
	"useSyncExternalStore" in React$2 ? (module => module.useSyncExternalStore)(React$2) : shim;

	const DataRouterContext = /*#__PURE__*/reactExports$2.createContext(null);

	const DataRouterStateContext = /*#__PURE__*/reactExports$2.createContext(null);

	const NavigationContext = /*#__PURE__*/reactExports$2.createContext(null);

	const LocationContext = /*#__PURE__*/reactExports$2.createContext(null);

	const RouteContext = /*#__PURE__*/reactExports$2.createContext({
	  outlet: null,
	  matches: []
	});

	const RouteErrorContext = /*#__PURE__*/reactExports$2.createContext(null);

	function _extends$2() {
	  _extends$2 = Object.assign ? Object.assign.bind() : function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	  return _extends$2.apply(this, arguments);
	}

	/**
	 * Returns the full href for the given "to" value. This is useful for building
	 * custom links that are also accessible and preserve right-click behavior.
	 *
	 * @see https://reactrouter.com/hooks/use-href
	 */

	function useHref(to, _temp) {
	  let {
	    relative
	  } = _temp === void 0 ? {} : _temp;
	  !useInRouterContext() ? invariant(false) : void 0;
	  let {
	    basename,
	    navigator
	  } = reactExports$2.useContext(NavigationContext);
	  let {
	    hash,
	    pathname,
	    search
	  } = useResolvedPath(to, {
	    relative
	  });
	  let joinedPathname = pathname; // If we're operating within a basename, prepend it to the pathname prior
	  // to creating the href.  If this is a root navigation, then just use the raw
	  // basename which allows the basename to have full control over the presence
	  // of a trailing slash on root links

	  if (basename !== "/") {
	    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
	  }

	  return navigator.createHref({
	    pathname: joinedPathname,
	    search,
	    hash
	  });
	}
	/**
	 * Returns true if this component is a descendant of a <Router>.
	 *
	 * @see https://reactrouter.com/hooks/use-in-router-context
	 */

	function useInRouterContext() {
	  return reactExports$2.useContext(LocationContext) != null;
	}
	/**
	 * Returns the current location object, which represents the current URL in web
	 * browsers.
	 *
	 * Note: If you're using this it may mean you're doing some of your own
	 * "routing" in your app, and we'd like to know what your use case is. We may
	 * be able to provide something higher-level to better suit your needs.
	 *
	 * @see https://reactrouter.com/hooks/use-location
	 */

	function useLocation() {
	  !useInRouterContext() ? invariant(false) : void 0;
	  return reactExports$2.useContext(LocationContext).location;
	}
	/**
	 * The interface for the navigate() function returned from useNavigate().
	 */

	/**
	 * Returns an imperative method for changing the location. Used by <Link>s, but
	 * may also be used by other elements to change the location.
	 *
	 * @see https://reactrouter.com/hooks/use-navigate
	 */
	function useNavigate() {
	  !useInRouterContext() ? invariant(false) : void 0;
	  let {
	    basename,
	    navigator
	  } = reactExports$2.useContext(NavigationContext);
	  let {
	    matches
	  } = reactExports$2.useContext(RouteContext);
	  let {
	    pathname: locationPathname
	  } = useLocation();
	  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map(match => match.pathnameBase));
	  let activeRef = reactExports$2.useRef(false);
	  reactExports$2.useEffect(() => {
	    activeRef.current = true;
	  });
	  let navigate = reactExports$2.useCallback(function (to, options) {
	    if (options === void 0) {
	      options = {};
	    }
	    if (!activeRef.current) return;

	    if (typeof to === "number") {
	      navigator.go(to);
	      return;
	    }

	    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path"); // If we're operating within a basename, prepend it to the pathname prior
	    // to handing off to history.  If this is a root navigation, then we
	    // navigate to the raw basename which allows the basename to have full
	    // control over the presence of a trailing slash on root links

	    if (basename !== "/") {
	      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
	    }

	    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	  }, [basename, navigator, routePathnamesJson, locationPathname]);
	  return navigate;
	}
	const OutletContext = /*#__PURE__*/reactExports$2.createContext(null);
	/**
	 * Returns the element for the child route at this level of the route
	 * hierarchy. Used internally by <Outlet> to render child routes.
	 *
	 * @see https://reactrouter.com/hooks/use-outlet
	 */

	function useOutlet(context) {
	  let outlet = reactExports$2.useContext(RouteContext).outlet;

	  if (outlet) {
	    return /*#__PURE__*/reactExports$2.createElement(OutletContext.Provider, {
	      value: context
	    }, outlet);
	  }

	  return outlet;
	}
	/**
	 * Resolves the pathname of the given `to` value against the current location.
	 *
	 * @see https://reactrouter.com/hooks/use-resolved-path
	 */

	function useResolvedPath(to, _temp2) {
	  let {
	    relative
	  } = _temp2 === void 0 ? {} : _temp2;
	  let {
	    matches
	  } = reactExports$2.useContext(RouteContext);
	  let {
	    pathname: locationPathname
	  } = useLocation();
	  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map(match => match.pathnameBase));
	  return reactExports$2.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
	}
	/**
	 * Returns the element of the route that matched the current location, prepared
	 * with the correct context to render the remainder of the route tree. Route
	 * elements in the tree must render an <Outlet> to render their child route's
	 * element.
	 *
	 * @see https://reactrouter.com/hooks/use-routes
	 */

	function useRoutes(routes, locationArg) {
	  !useInRouterContext() ? invariant(false) : void 0;
	  let {
	    navigator
	  } = reactExports$2.useContext(NavigationContext);
	  let dataRouterStateContext = reactExports$2.useContext(DataRouterStateContext);
	  let {
	    matches: parentMatches
	  } = reactExports$2.useContext(RouteContext);
	  let routeMatch = parentMatches[parentMatches.length - 1];
	  let parentParams = routeMatch ? routeMatch.params : {};
	  routeMatch ? routeMatch.pathname : "/";
	  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	  routeMatch && routeMatch.route;

	  let locationFromContext = useLocation();
	  let location;

	  if (locationArg) {
	    var _parsedLocationArg$pa;

	    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
	    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
	    location = parsedLocationArg;
	  } else {
	    location = locationFromContext;
	  }

	  let pathname = location.pathname || "/";
	  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
	  let matches = matchRoutes(routes, {
	    pathname: remainingPathname
	  });

	  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
	    params: Object.assign({}, parentParams, match.params),
	    pathname: joinPaths([parentPathnameBase, // Re-encode pathnames that were decoded inside matchRoutes
	    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
	    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, // Re-encode pathnames that were decoded inside matchRoutes
	    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
	  })), parentMatches, dataRouterStateContext || undefined); // When a user passes in a `locationArg`, the associated routes need to
	  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
	  // to use the scoped location instead of the global location.


	  if (locationArg && renderedMatches) {
	    return /*#__PURE__*/reactExports$2.createElement(LocationContext.Provider, {
	      value: {
	        location: _extends$2({
	          pathname: "/",
	          search: "",
	          hash: "",
	          state: null,
	          key: "default"
	        }, location),
	        navigationType: Action.Pop
	      }
	    }, renderedMatches);
	  }

	  return renderedMatches;
	}

	function DefaultErrorComponent() {
	  let error = useRouteError();
	  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
	  let stack = error instanceof Error ? error.stack : null;
	  let lightgrey = "rgba(200,200,200, 0.5)";
	  let preStyles = {
	    padding: "0.5rem",
	    backgroundColor: lightgrey
	  };
	  let devInfo = null;

	  return /*#__PURE__*/reactExports$2.createElement(reactExports$2.Fragment, null, /*#__PURE__*/reactExports$2.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/reactExports$2.createElement("h3", {
	    style: {
	      fontStyle: "italic"
	    }
	  }, message), stack ? /*#__PURE__*/reactExports$2.createElement("pre", {
	    style: preStyles
	  }, stack) : null, devInfo);
	}

	class RenderErrorBoundary extends reactExports$2.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      location: props.location,
	      error: props.error
	    };
	  }

	  static getDerivedStateFromError(error) {
	    return {
	      error: error
	    };
	  }

	  static getDerivedStateFromProps(props, state) {
	    // When we get into an error state, the user will likely click "back" to the
	    // previous page that didn't have an error. Because this wraps the entire
	    // application, that will have no effect--the error page continues to display.
	    // This gives us a mechanism to recover from the error when the location changes.
	    //
	    // Whether we're in an error state or not, we update the location in state
	    // so that when we are in an error state, it gets reset when a new location
	    // comes in and the user recovers from the error.
	    if (state.location !== props.location) {
	      return {
	        error: props.error,
	        location: props.location
	      };
	    } // If we're not changing locations, preserve the location but still surface
	    // any new errors that may come through. We retain the existing error, we do
	    // this because the error provided from the app state may be cleared without
	    // the location changing.


	    return {
	      error: props.error || state.error,
	      location: state.location
	    };
	  }

	  componentDidCatch(error, errorInfo) {
	    console.error("React Router caught the following error during render", error, errorInfo);
	  }

	  render() {
	    return this.state.error ? /*#__PURE__*/reactExports$2.createElement(RouteContext.Provider, {
	      value: this.props.routeContext
	    }, /*#__PURE__*/reactExports$2.createElement(RouteErrorContext.Provider, {
	      value: this.state.error,
	      children: this.props.component
	    })) : this.props.children;
	  }

	}

	function RenderedRoute(_ref) {
	  let {
	    routeContext,
	    match,
	    children
	  } = _ref;
	  let dataRouterContext = reactExports$2.useContext(DataRouterContext); // Track how deep we got in our render pass to emulate SSR componentDidCatch
	  // in a DataStaticRouter

	  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
	    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	  }

	  return /*#__PURE__*/reactExports$2.createElement(RouteContext.Provider, {
	    value: routeContext
	  }, children);
	}

	function _renderMatches(matches, parentMatches, dataRouterState) {
	  if (parentMatches === void 0) {
	    parentMatches = [];
	  }

	  if (matches == null) {
	    if (dataRouterState != null && dataRouterState.errors) {
	      // Don't bail if we have data router errors so we can render them in the
	      // boundary.  Use the pre-matched (or shimmed) matches
	      matches = dataRouterState.matches;
	    } else {
	      return null;
	    }
	  }

	  let renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

	  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;

	  if (errors != null) {
	    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
	    !(errorIndex >= 0) ? invariant(false) : void 0;
	    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	  }

	  return renderedMatches.reduceRight((outlet, match, index) => {
	    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

	    let errorElement = null;

	    if (dataRouterState) {
	      if (match.route.ErrorBoundary) {
	        errorElement = /*#__PURE__*/reactExports$2.createElement(match.route.ErrorBoundary, null);
	      } else if (match.route.errorElement) {
	        errorElement = match.route.errorElement;
	      } else {
	        errorElement = /*#__PURE__*/reactExports$2.createElement(DefaultErrorComponent, null);
	      }
	    }

	    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));

	    let getChildren = () => {
	      let children = outlet;

	      if (error) {
	        children = errorElement;
	      } else if (match.route.Component) {
	        children = /*#__PURE__*/reactExports$2.createElement(match.route.Component, null);
	      } else if (match.route.element) {
	        children = match.route.element;
	      }

	      return /*#__PURE__*/reactExports$2.createElement(RenderedRoute, {
	        match: match,
	        routeContext: {
	          outlet,
	          matches
	        },
	        children: children
	      });
	    }; // Only wrap in an error boundary within data router usages when we have an
	    // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
	    // an ancestor ErrorBoundary/errorElement


	    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/reactExports$2.createElement(RenderErrorBoundary, {
	      location: dataRouterState.location,
	      component: errorElement,
	      error: error,
	      children: getChildren(),
	      routeContext: {
	        outlet: null,
	        matches
	      }
	    }) : getChildren();
	  }, null);
	}
	var DataRouterHook$1;

	(function (DataRouterHook) {
	  DataRouterHook["UseBlocker"] = "useBlocker";
	  DataRouterHook["UseRevalidator"] = "useRevalidator";
	})(DataRouterHook$1 || (DataRouterHook$1 = {}));

	var DataRouterStateHook$1;

	(function (DataRouterStateHook) {
	  DataRouterStateHook["UseBlocker"] = "useBlocker";
	  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
	  DataRouterStateHook["UseActionData"] = "useActionData";
	  DataRouterStateHook["UseRouteError"] = "useRouteError";
	  DataRouterStateHook["UseNavigation"] = "useNavigation";
	  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
	  DataRouterStateHook["UseMatches"] = "useMatches";
	  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
	})(DataRouterStateHook$1 || (DataRouterStateHook$1 = {}));

	function useDataRouterState(hookName) {
	  let state = reactExports$2.useContext(DataRouterStateContext);
	  !state ? invariant(false) : void 0;
	  return state;
	}

	function useRouteContext(hookName) {
	  let route = reactExports$2.useContext(RouteContext);
	  !route ? invariant(false) : void 0;
	  return route;
	}

	function useCurrentRouteId(hookName) {
	  let route = useRouteContext();
	  let thisRoute = route.matches[route.matches.length - 1];
	  !thisRoute.route.id ? invariant(false) : void 0;
	  return thisRoute.route.id;
	}
	/**
	 * Returns the nearest ancestor Route error, which could be a loader/action
	 * error or a render error.  This is intended to be called from your
	 * ErrorBoundary/errorElement to display a proper error message.
	 */

	function useRouteError() {
	  var _state$errors;

	  let error = reactExports$2.useContext(RouteErrorContext);
	  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
	  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError); // If this was a render error, we put it in a RouteError context inside
	  // of RenderErrorBoundary

	  if (error) {
	    return error;
	  } // Otherwise look for errors from our data router state


	  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
	}

	/**
	 * Changes the current location.
	 *
	 * Note: This API is mostly useful in React.Component subclasses that are not
	 * able to use hooks. In functional components, we recommend you use the
	 * `useNavigate` hook instead.
	 *
	 * @see https://reactrouter.com/components/navigate
	 */
	function Navigate(_ref3) {
	  let {
	    to,
	    replace,
	    state,
	    relative
	  } = _ref3;
	  !useInRouterContext() ? invariant(false) : void 0;
	  let dataRouterState = reactExports$2.useContext(DataRouterStateContext);
	  let navigate = useNavigate();
	  reactExports$2.useEffect(() => {
	    // Avoid kicking off multiple navigations if we're in the middle of a
	    // data-router navigation, since components get re-rendered when we enter
	    // a submitting/loading state
	    if (dataRouterState && dataRouterState.navigation.state !== "idle") {
	      return;
	    }

	    navigate(to, {
	      replace,
	      state,
	      relative
	    });
	  });
	  return null;
	}

	/**
	 * Renders the child route's element, if there is one.
	 *
	 * @see https://reactrouter.com/components/outlet
	 */
	function Outlet(props) {
	  return useOutlet(props.context);
	}

	/**
	 * Declares an element that should be rendered at a certain URL path.
	 *
	 * @see https://reactrouter.com/components/route
	 */
	function Route(_props) {
	  invariant(false) ;
	}

	/**
	 * Provides location context for the rest of the app.
	 *
	 * Note: You usually won't render a <Router> directly. Instead, you'll render a
	 * router that is more specific to your environment such as a <BrowserRouter>
	 * in web browsers or a <StaticRouter> for server rendering.
	 *
	 * @see https://reactrouter.com/router-components/router
	 */
	function Router(_ref4) {
	  let {
	    basename: basenameProp = "/",
	    children = null,
	    location: locationProp,
	    navigationType = Action.Pop,
	    navigator,
	    static: staticProp = false
	  } = _ref4;
	  !!useInRouterContext() ? invariant(false) : void 0; // Preserve trailing slashes on basename, so we can let the user control
	  // the enforcement of trailing slashes throughout the app

	  let basename = basenameProp.replace(/^\/*/, "/");
	  let navigationContext = reactExports$2.useMemo(() => ({
	    basename,
	    navigator,
	    static: staticProp
	  }), [basename, navigator, staticProp]);

	  if (typeof locationProp === "string") {
	    locationProp = parsePath(locationProp);
	  }

	  let {
	    pathname = "/",
	    search = "",
	    hash = "",
	    state = null,
	    key = "default"
	  } = locationProp;
	  let locationContext = reactExports$2.useMemo(() => {
	    let trailingPathname = stripBasename(pathname, basename);

	    if (trailingPathname == null) {
	      return null;
	    }

	    return {
	      location: {
	        pathname: trailingPathname,
	        search,
	        hash,
	        state,
	        key
	      },
	      navigationType
	    };
	  }, [basename, pathname, search, hash, state, key, navigationType]);

	  if (locationContext == null) {
	    return null;
	  }

	  return /*#__PURE__*/reactExports$2.createElement(NavigationContext.Provider, {
	    value: navigationContext
	  }, /*#__PURE__*/reactExports$2.createElement(LocationContext.Provider, {
	    children: children,
	    value: locationContext
	  }));
	}

	/**
	 * A container for a nested tree of <Route> elements that renders the branch
	 * that best matches the current location.
	 *
	 * @see https://reactrouter.com/components/routes
	 */
	function Routes(_ref5) {
	  let {
	    children,
	    location
	  } = _ref5;
	  let dataRouterContext = reactExports$2.useContext(DataRouterContext); // When in a DataRouterContext _without_ children, we use the router routes
	  // directly.  If we have children, then we're in a descendant tree and we
	  // need to use child routes.

	  let routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
	  return useRoutes(routes, location);
	}
	var AwaitRenderStatus;

	(function (AwaitRenderStatus) {
	  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
	  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
	  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
	})(AwaitRenderStatus || (AwaitRenderStatus = {}));

	new Promise(() => {});
	// UTILS
	///////////////////////////////////////////////////////////////////////////////

	/**
	 * Creates a route config from a React "children" object, which is usually
	 * either a `<Route>` element or an array of them. Used internally by
	 * `<Routes>` to create a route config from its children.
	 *
	 * @see https://reactrouter.com/utils/create-routes-from-children
	 */


	function createRoutesFromChildren(children, parentPath) {
	  if (parentPath === void 0) {
	    parentPath = [];
	  }

	  let routes = [];
	  reactExports$2.Children.forEach(children, (element, index) => {
	    if (! /*#__PURE__*/reactExports$2.isValidElement(element)) {
	      // Ignore non-elements. This allows people to more easily inline
	      // conditionals in their route config.
	      return;
	    }

	    if (element.type === reactExports$2.Fragment) {
	      // Transparently support React.Fragment and its children.
	      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
	      return;
	    }

	    !(element.type === Route) ? invariant(false) : void 0;
	    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
	    let treePath = [...parentPath, index];
	    let route = {
	      id: element.props.id || treePath.join("-"),
	      caseSensitive: element.props.caseSensitive,
	      element: element.props.element,
	      Component: element.props.Component,
	      index: element.props.index,
	      path: element.props.path,
	      loader: element.props.loader,
	      action: element.props.action,
	      errorElement: element.props.errorElement,
	      ErrorBoundary: element.props.ErrorBoundary,
	      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
	      shouldRevalidate: element.props.shouldRevalidate,
	      handle: element.props.handle,
	      lazy: element.props.lazy
	    };

	    if (element.props.children) {
	      route.children = createRoutesFromChildren(element.props.children, treePath);
	    }

	    routes.push(route);
	  });
	  return routes;
	}

	/**
	 * React Router DOM v6.9.0
	 *
	 * Copyright (c) Remix Software Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.md file in the root directory of this source tree.
	 *
	 * @license MIT
	 */

	function _extends$1() {
	  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	  return _extends$1.apply(this, arguments);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	function shouldProcessLinkClick(event, target) {
	  return event.button === 0 && ( // Ignore everything but left clicks
	  !target || target === "_self") && // Let browser handle "target=_blank" etc.
	  !isModifiedEvent(event) // Ignore clicks with modifier keys
	  ;
	}

	const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
	      _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
	/**
	 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
	 */


	function BrowserRouter(_ref) {
	  let {
	    basename,
	    children,
	    window
	  } = _ref;
	  let historyRef = reactExports$2.useRef();

	  if (historyRef.current == null) {
	    historyRef.current = createBrowserHistory({
	      window,
	      v5Compat: true
	    });
	  }

	  let history = historyRef.current;
	  let [state, setState] = reactExports$2.useState({
	    action: history.action,
	    location: history.location
	  });
	  reactExports$2.useLayoutEffect(() => history.listen(setState), [history]);
	  return /*#__PURE__*/reactExports$2.createElement(Router, {
	    basename: basename,
	    children: children,
	    location: state.location,
	    navigationType: state.action,
	    navigator: history
	  });
	}
	const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
	const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
	/**
	 * The public API for rendering a history-aware <a>.
	 */

	const Link = /*#__PURE__*/reactExports$2.forwardRef(function LinkWithRef(_ref4, ref) {
	  let {
	    onClick,
	    relative,
	    reloadDocument,
	    replace,
	    state,
	    target,
	    to,
	    preventScrollReset
	  } = _ref4,
	      rest = _objectWithoutPropertiesLoose(_ref4, _excluded);

	  let {
	    basename
	  } = reactExports$2.useContext(NavigationContext); // Rendered into <a href> for absolute URLs

	  let absoluteHref;
	  let isExternal = false;

	  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
	    // Render the absolute href server- and client-side
	    absoluteHref = to; // Only check for external origins client-side

	    if (isBrowser) {
	      let currentUrl = new URL(window.location.href);
	      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
	      let path = stripBasename(targetUrl.pathname, basename);

	      if (targetUrl.origin === currentUrl.origin && path != null) {
	        // Strip the protocol/origin/basename for same-origin absolute URLs
	        to = path + targetUrl.search + targetUrl.hash;
	      } else {
	        isExternal = true;
	      }
	    }
	  } // Rendered into <a href> for relative URLs


	  let href = useHref(to, {
	    relative
	  });
	  let internalOnClick = useLinkClickHandler(to, {
	    replace,
	    state,
	    target,
	    preventScrollReset,
	    relative
	  });

	  function handleClick(event) {
	    if (onClick) onClick(event);

	    if (!event.defaultPrevented) {
	      internalOnClick(event);
	    }
	  }

	  return (
	    /*#__PURE__*/
	    // eslint-disable-next-line jsx-a11y/anchor-has-content
	    reactExports$2.createElement("a", _extends$1({}, rest, {
	      href: absoluteHref || href,
	      onClick: isExternal || reloadDocument ? onClick : handleClick,
	      ref: ref,
	      target: target
	    }))
	  );
	});
	/**
	 * A <Link> wrapper that knows if it's "active" or not.
	 */


	const NavLink = /*#__PURE__*/reactExports$2.forwardRef(function NavLinkWithRef(_ref5, ref) {
	  let {
	    "aria-current": ariaCurrentProp = "page",
	    caseSensitive = false,
	    className: classNameProp = "",
	    end = false,
	    style: styleProp,
	    to,
	    children
	  } = _ref5,
	      rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);

	  let path = useResolvedPath(to, {
	    relative: rest.relative
	  });
	  let location = useLocation();
	  let routerState = reactExports$2.useContext(DataRouterStateContext);
	  let {
	    navigator
	  } = reactExports$2.useContext(NavigationContext);
	  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
	  let locationPathname = location.pathname;
	  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;

	  if (!caseSensitive) {
	    locationPathname = locationPathname.toLowerCase();
	    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
	    toPathname = toPathname.toLowerCase();
	  }

	  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
	  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
	  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
	  let className;

	  if (typeof classNameProp === "function") {
	    className = classNameProp({
	      isActive,
	      isPending
	    });
	  } else {
	    // If the className prop is not a function, we use a default `active`
	    // class for <NavLink />s that are active. In v5 `active` was the default
	    // value for `activeClassName`, but we are removing that API and can still
	    // use the old default behavior for a cleaner upgrade path and keep the
	    // simple styling rules working as they currently do.
	    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
	  }

	  let style = typeof styleProp === "function" ? styleProp({
	    isActive,
	    isPending
	  }) : styleProp;
	  return /*#__PURE__*/reactExports$2.createElement(Link, _extends$1({}, rest, {
	    "aria-current": ariaCurrent,
	    className: className,
	    ref: ref,
	    style: style,
	    to: to
	  }), typeof children === "function" ? children({
	    isActive,
	    isPending
	  }) : children);
	});
	////////////////////////////////////////////////////////////////////////////////
	//#region Hooks
	////////////////////////////////////////////////////////////////////////////////


	var DataRouterHook;

	(function (DataRouterHook) {
	  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
	  DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
	  DataRouterHook["UseFetcher"] = "useFetcher";
	})(DataRouterHook || (DataRouterHook = {}));

	var DataRouterStateHook;

	(function (DataRouterStateHook) {
	  DataRouterStateHook["UseFetchers"] = "useFetchers";
	  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
	})(DataRouterStateHook || (DataRouterStateHook = {}));
	/**
	 * Handles the click behavior for router `<Link>` components. This is useful if
	 * you need to create custom `<Link>` components with the same click behavior we
	 * use in our exported `<Link>`.
	 */


	function useLinkClickHandler(to, _temp) {
	  let {
	    target,
	    replace: replaceProp,
	    state,
	    preventScrollReset,
	    relative
	  } = _temp === void 0 ? {} : _temp;
	  let navigate = useNavigate();
	  let location = useLocation();
	  let path = useResolvedPath(to, {
	    relative
	  });
	  return reactExports$2.useCallback(event => {
	    if (shouldProcessLinkClick(event, target)) {
	      event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
	      // a push, so do the same here unless the replace prop is explicitly set

	      let replace = replaceProp !== undefined ? replaceProp : createPath(location) === createPath(path);
	      navigate(to, {
	        replace,
	        state,
	        preventScrollReset,
	        relative
	      });
	    }
	  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
	}

	function _regeneratorRuntime() {
	  _regeneratorRuntime = function () {
	    return exports;
	  };
	  var exports = {},
	    Op = Object.prototype,
	    hasOwn = Op.hasOwnProperty,
	    defineProperty = Object.defineProperty || function (obj, key, desc) {
	      obj[key] = desc.value;
	    },
	    $Symbol = "function" == typeof Symbol ? Symbol : {},
	    iteratorSymbol = $Symbol.iterator || "@@iterator",
	    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
	    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  function define(obj, key, value) {
	    return Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), obj[key];
	  }
	  try {
	    define({}, "");
	  } catch (err) {
	    define = function (obj, key, value) {
	      return obj[key] = value;
	    };
	  }
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
	      generator = Object.create(protoGenerator.prototype),
	      context = new Context(tryLocsList || []);
	    return defineProperty(generator, "_invoke", {
	      value: makeInvokeMethod(innerFn, self, context)
	    }), generator;
	  }
	  function tryCatch(fn, obj, arg) {
	    try {
	      return {
	        type: "normal",
	        arg: fn.call(obj, arg)
	      };
	    } catch (err) {
	      return {
	        type: "throw",
	        arg: err
	      };
	    }
	  }
	  exports.wrap = wrap;
	  var ContinueSentinel = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });
	  var getProto = Object.getPrototypeOf,
	    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      define(prototype, method, function (arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }
	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if ("throw" !== record.type) {
	        var result = record.arg,
	          value = result.value;
	        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
	          invoke("next", value, resolve, reject);
	        }, function (err) {
	          invoke("throw", err, resolve, reject);
	        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
	          result.value = unwrapped, resolve(result);
	        }, function (error) {
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	      reject(record.arg);
	    }
	    var previousPromise;
	    defineProperty(this, "_invoke", {
	      value: function (method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }
	        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = "suspendedStart";
	    return function (method, arg) {
	      if ("executing" === state) throw new Error("Generator is already running");
	      if ("completed" === state) {
	        if ("throw" === method) throw arg;
	        return doneResult();
	      }
	      for (context.method = method, context.arg = arg;;) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }
	        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
	          if ("suspendedStart" === state) throw state = "completed", context.arg;
	          context.dispatchException(context.arg);
	        } else "return" === context.method && context.abrupt("return", context.arg);
	        state = "executing";
	        var record = tryCatch(innerFn, self, context);
	        if ("normal" === record.type) {
	          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
	          return {
	            value: record.arg,
	            done: context.done
	          };
	        }
	        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(delegate, context) {
	    var methodName = context.method,
	      method = delegate.iterator[methodName];
	    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
	    var record = tryCatch(method, delegate.iterator, context.arg);
	    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
	    var info = record.arg;
	    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
	  }
	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };
	    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
	  }
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal", delete record.arg, entry.completion = record;
	  }
	  function Context(tryLocsList) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) return iteratorMethod.call(iterable);
	      if ("function" == typeof iterable.next) return iterable;
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	          next = function next() {
	            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
	            return next.value = undefined, next.done = !0, next;
	          };
	        return next.next = next;
	      }
	    }
	    return {
	      next: doneResult
	    };
	  }
	  function doneResult() {
	    return {
	      value: undefined,
	      done: !0
	    };
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
	    var ctor = "function" == typeof genFun && genFun.constructor;
	    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
	  }, exports.mark = function (genFun) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
	  }, exports.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    void 0 === PromiseImpl && (PromiseImpl = Promise);
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
	    return this;
	  }), define(Gp, "toString", function () {
	    return "[object Generator]";
	  }), exports.keys = function (val) {
	    var object = Object(val),
	      keys = [];
	    for (var key in object) keys.push(key);
	    return keys.reverse(), function next() {
	      for (; keys.length;) {
	        var key = keys.pop();
	        if (key in object) return next.value = key, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, exports.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function (skipTempReset) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
	    },
	    stop: function () {
	      this.done = !0;
	      var rootRecord = this.tryEntries[0].completion;
	      if ("throw" === rootRecord.type) throw rootRecord.arg;
	      return this.rval;
	    },
	    dispatchException: function (exception) {
	      if (this.done) throw exception;
	      var context = this;
	      function handle(loc, caught) {
	        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
	      }
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i],
	          record = entry.completion;
	        if ("root" === entry.tryLoc) return handle("end");
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc"),
	            hasFinally = hasOwn.call(entry, "finallyLoc");
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	          } else {
	            if (!hasFinally) throw new Error("try statement without catch or finally");
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function (type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
	      var record = finallyEntry ? finallyEntry.completion : {};
	      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
	    },
	    complete: function (record, afterLoc) {
	      if ("throw" === record.type) throw record.arg;
	      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
	    },
	    finish: function (finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
	      }
	    },
	    catch: function (tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if ("throw" === record.type) {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function (iterable, resultName, nextLoc) {
	      return this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
	    }
	  }, exports;
	}
	function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }
	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}
	function _asyncToGenerator$1(fn) {
	  return function () {
	    var self = this,
	      args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);
	      function _next(value) {
	        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
	      }
	      function _throw(err) {
	        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
	      }
	      _next(undefined);
	    });
	  };
	}
	function _extends() {
	  _extends = Object.assign ? Object.assign.bind() : function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	    return target;
	  };
	  return _extends.apply(this, arguments);
	}

	var reactExports$1 = {};
	var react$1 = {
	  get exports(){ return reactExports$1; },
	  set exports(v){ reactExports$1 = v; },
	};

	var react_production_min$1 = {};

	/** @license React v17.0.2
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var l$1=objectAssign,n$1=60103,p$1=60106;react_production_min$1.Fragment=60107;react_production_min$1.StrictMode=60108;react_production_min$1.Profiler=60114;var q$1=60109,r$1=60110,t$1=60112;react_production_min$1.Suspense=60113;var u$1=60115,v$1=60116;
	if("function"===typeof Symbol&&Symbol.for){var w$1=Symbol.for;n$1=w$1("react.element");p$1=w$1("react.portal");react_production_min$1.Fragment=w$1("react.fragment");react_production_min$1.StrictMode=w$1("react.strict_mode");react_production_min$1.Profiler=w$1("react.profiler");q$1=w$1("react.provider");r$1=w$1("react.context");t$1=w$1("react.forward_ref");react_production_min$1.Suspense=w$1("react.suspense");u$1=w$1("react.memo");v$1=w$1("react.lazy");}var x$1="function"===typeof Symbol&&Symbol.iterator;
	function y$1(a){if(null===a||"object"!==typeof a)return null;a=x$1&&a[x$1]||a["@@iterator"];return "function"===typeof a?a:null}function z$1(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A$1={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B$1={};function C$1(a,b,c){this.props=a;this.context=b;this.refs=B$1;this.updater=c||A$1;}C$1.prototype.isReactComponent={};C$1.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z$1(85));this.updater.enqueueSetState(this,a,b,"setState");};C$1.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D$1(){}D$1.prototype=C$1.prototype;function E$1(a,b,c){this.props=a;this.context=b;this.refs=B$1;this.updater=c||A$1;}var F$1=E$1.prototype=new D$1;F$1.constructor=E$1;l$1(F$1,C$1.prototype);F$1.isPureReactComponent=!0;var G$1={current:null},H$1=Object.prototype.hasOwnProperty,I$1={key:!0,ref:!0,__self:!0,__source:!0};
	function J$1(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H$1.call(b,e)&&!I$1.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n$1,type:a,key:k,ref:h,props:d,_owner:G$1.current}}
	function K$1(a,b){return {$$typeof:n$1,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L$1(a){return "object"===typeof a&&null!==a&&a.$$typeof===n$1}function escape$1(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M$1=/\/+/g;function N$1(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape$1(""+a.key):b.toString(36)}
	function O$1(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n$1:case p$1:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N$1(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M$1,"$&/")+"/"),O$1(d,b,c,"",function(a){return a})):null!=d&&(L$1(d)&&(d=K$1(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M$1,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N$1(k,g);h+=O$1(k,b,c,f,d);}else if(f=y$1(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N$1(k,g++),h+=O$1(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z$1(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P$1(a,b,c){if(null==a)return a;var e=[],d=0;O$1(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q$1(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R$1={current:null};function S$1(){var a=R$1.current;if(null===a)throw Error(z$1(321));return a}var T$1={ReactCurrentDispatcher:R$1,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G$1,IsSomeRendererActing:{current:!1},assign:l$1};
	react_production_min$1.Children={map:P$1,forEach:function(a,b,c){P$1(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P$1(a,function(){b++;});return b},toArray:function(a){return P$1(a,function(a){return a})||[]},only:function(a){if(!L$1(a))throw Error(z$1(143));return a}};react_production_min$1.Component=C$1;react_production_min$1.PureComponent=E$1;react_production_min$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T$1;
	react_production_min$1.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z$1(267,a));var e=l$1({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G$1.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H$1.call(b,f)&&!I$1.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n$1,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min$1.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r$1,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q$1,_context:a};return a.Consumer=a};react_production_min$1.createElement=J$1;react_production_min$1.createFactory=function(a){var b=J$1.bind(null,a);b.type=a;return b};react_production_min$1.createRef=function(){return {current:null}};react_production_min$1.forwardRef=function(a){return {$$typeof:t$1,render:a}};react_production_min$1.isValidElement=L$1;
	react_production_min$1.lazy=function(a){return {$$typeof:v$1,_payload:{_status:-1,_result:a},_init:Q$1}};react_production_min$1.memo=function(a,b){return {$$typeof:u$1,type:a,compare:void 0===b?null:b}};react_production_min$1.useCallback=function(a,b){return S$1().useCallback(a,b)};react_production_min$1.useContext=function(a,b){return S$1().useContext(a,b)};react_production_min$1.useDebugValue=function(){};react_production_min$1.useEffect=function(a,b){return S$1().useEffect(a,b)};react_production_min$1.useImperativeHandle=function(a,b,c){return S$1().useImperativeHandle(a,b,c)};
	react_production_min$1.useLayoutEffect=function(a,b){return S$1().useLayoutEffect(a,b)};react_production_min$1.useMemo=function(a,b){return S$1().useMemo(a,b)};react_production_min$1.useReducer=function(a,b,c){return S$1().useReducer(a,b,c)};react_production_min$1.useRef=function(a){return S$1().useRef(a)};react_production_min$1.useState=function(a){return S$1().useState(a)};react_production_min$1.version="17.0.2";

	(function (module) {

		{
		  module.exports = react_production_min$1;
		}
	} (react$1));

	var React$1 = /*@__PURE__*/getDefaultExportFromCjs(reactExports$1);

	var Context = /*#__PURE__*/React$1.createContext();

	/* eslint react/display-name:0 */
	var withContext = function withContext(BaseComponent) {
	  return function (props) {
	    var _useContext = reactExports$1.useContext(Context),
	      context = _useContext.context,
	      setContext = _useContext.setContext;
	    return /*#__PURE__*/React$1.createElement(BaseComponent, _extends({}, props, {
	      context: context,
	      setContext: setContext
	    }));
	  };
	};

	var AppContext = function AppContext(_ref) {
	  var context = _ref.context,
	    children = _ref.children;
	  var _useState = reactExports$1.useState(context),
	    innerContext = _useState[0],
	    setInnerContext = _useState[1];
	  reactExports$1.useEffect(function () {
	    setInnerContext(context);
	  }, [context]);
	  return /*#__PURE__*/React$1.createElement(Context.Provider, {
	    value: {
	      context: innerContext,
	      setContext: setInnerContext
	    }
	  }, children);
	};

	var reactExports = {};
	var react = {
	  get exports(){ return reactExports; },
	  set exports(v){ reactExports = v; },
	};

	var react_production_min = {};

	/** @license React v17.0.2
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var l=objectAssign,n=60103,p=60106;react_production_min.Fragment=60107;react_production_min.StrictMode=60108;react_production_min.Profiler=60114;var q=60109,r=60110,t=60112;react_production_min.Suspense=60113;var u=60115,v=60116;
	if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");react_production_min.Fragment=w("react.fragment");react_production_min.StrictMode=w("react.strict_mode");react_production_min.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");react_production_min.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
	function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
	react_production_min.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};react_production_min.Component=C;react_production_min.PureComponent=E;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
	react_production_min.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};react_production_min.createElement=J;react_production_min.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};react_production_min.forwardRef=function(a){return {$$typeof:t,render:a}};react_production_min.isValidElement=L;
	react_production_min.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};react_production_min.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};react_production_min.useCallback=function(a,b){return S().useCallback(a,b)};react_production_min.useContext=function(a,b){return S().useContext(a,b)};react_production_min.useDebugValue=function(){};react_production_min.useEffect=function(a,b){return S().useEffect(a,b)};react_production_min.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
	react_production_min.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return S().useMemo(a,b)};react_production_min.useReducer=function(a,b,c){return S().useReducer(a,b,c)};react_production_min.useRef=function(a){return S().useRef(a)};react_production_min.useState=function(a){return S().useState(a)};react_production_min.version="17.0.2";

	(function (module) {

		{
		  module.exports = react_production_min;
		}
	} (react));

	var React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

	/**
	 * Transform an JSON object to a query string
	 */
	function json_to_query_string(params) {
	  return '?' + Object.keys(params).map(function (k) {
	    var name = encodeURIComponent(k);
	    if (Array.isArray(params[k])) {
	      return params[k].map(function (val) {
	        return "".concat(name, "[]=").concat(encodeURIComponent(val));
	      }).join('&');
	    }
	    return "".concat(name, "=").concat(encodeURIComponent(params[k]));
	  }).join('&');
	}
	function trim_left(str, what) {
	  return str.replace(new RegExp("^".concat(what || '\\s', "+")), '');
	}

	//import fetch from 'isomorphic-fetch'

	//function _is_browser() {
	//  try {
	//    return process.env.BROWSER==true
	//  } catch(_) {
	//    return false
	//  }
	//}

	/**
	 * Prepend host of API server
	 */
	function _url_make(path) {
	  if (path.indexOf('http') == 0) {
	    return path;
	    //} else if (_is_browser()) {
	    //  return '/' + trim_left(path, '/')
	  } else {
	    return "https://".concat(location.host, "/") + trim_left(path, '/');
	  }
	}

	/**
	 * Decide what to do with the response
	 */
	function _response_handle(response) {
	  if (response.redirected) {
	    window.location.replace(response.url);
	    return Promise.resolve();
	  }
	  if (response.headers.get('content-type').indexOf('json') >= 0) {
	    return response.json().then(function (res) {
	      return {
	        data: res,
	        status: response.status
	      };
	    });
	  }
	  return response.text().then(function (text) {
	    return {
	      data: text,
	      status: response.status
	    };
	  });
	}

	/**
	 * Build and execute remote request
	 */
	function make_request(method, url, params, isMultiForm, auth) {
	  var requestURL = _url_make(url) + (method === 'GET' && params ? json_to_query_string(params) : '');
	  var request = {
	    method: method,
	    mode: 'cors',
	    credentials: 'include',
	    headers: {
	      'content-type': 'application/json'
	    }
	  };
	  if (auth) {
	    request.headers['Authorization'] = 'Basic ' + Buffer.from(auth.username + ":" + auth.password).toString('base64');
	  }
	  if (method === 'POST') {
	    if (isMultiForm) {
	      var formData = new FormData();
	      for (var name in params) {
	        formData.append(name, params[name]);
	      }
	      request.body = formData;
	    } else {
	      request.body = JSON.stringify(params || {}, function (k, v) {
	        return v === undefined ? null : v;
	      });
	    }
	  }
	  return fetch(requestURL, request).then(_response_handle);
	}
	var _DEF_CATCH_LOG_URL = '/sys/jserror';
	function miolo_catcher_init(catch_log_url) {
	  window.onerror = function (msg, file, line, col, error) {
	    try {
	      var agent = 'UserAgent' + navigator.userAgent;
	      var params = {
	        'error': {
	          msg: msg,
	          file: file,
	          line: line,
	          col: col,
	          error: error
	        },
	        'path': window.location.pathname,
	        'agent': agent
	      };
	      make_request('POST', catch_log_url || _DEF_CATCH_LOG_URL, params, false);
	    } catch (e) {
	      console.error(e);
	    }
	  };
	}
	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);
	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    enumerableOnly && (symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    })), keys.push.apply(keys, symbols);
	  }
	  return keys;
	}
	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = null != arguments[i] ? arguments[i] : {};
	    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }
	  return target;
	}
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }
	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}
	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	      args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);
	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }
	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }
	      _next(undefined);
	    });
	  };
	}
	function _defineProperty(obj, key, value) {
	  key = _toPropertyKey(key);
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}
	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");
	  return typeof key === "symbol" ? key : String(key);
	}
	function omit_nil(obj) {
	  if (typeof obj !== 'object') return obj;
	  return Object.keys(obj).reduce(function (acc, v) {
	    if (obj[v] !== undefined) acc[v] = obj[v];
	    return acc;
	  }, {});
	}
	var _FetcherRequester = {
	  get: function get(url, params) {
	    return make_request('GET', url, omit_nil(params));
	  },
	  post: function post(url, data) {
	    var isMultiForm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    return make_request('POST', url, data, isMultiForm);
	  }
	};
	var Fetcher = /*#__PURE__*/function () {
	  function Fetcher() {
	    _defineProperty(this, "log_error", function (msg, e) {
	      console.error(msg);
	      console.error(e);
	    });
	    this.request = _FetcherRequester;
	  }
	  var _proto = Fetcher.prototype;
	  _proto.get = function get(url) {
	    var _arguments = arguments,
	      _this = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	      var params, resp;
	      return _regeneratorRuntime().wrap(function _callee$(_context) {
	        while (1) switch (_context.prev = _context.next) {
	          case 0:
	            params = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
	            /* eslint no-unused-vars:0 */
	            _context.prev = 1;
	            _context.next = 4;
	            return _this.request.get(url, params);
	          case 4:
	            resp = _context.sent;
	            return _context.abrupt("return", resp);
	          case 8:
	            _context.prev = 8;
	            _context.t0 = _context["catch"](1);
	            _this.log_error("Error on GET ".concat(url), _context.t0);
	            return _context.abrupt("return", {
	              data: undefined,
	              status: -1
	            });
	          case 12:
	          case "end":
	            return _context.stop();
	        }
	      }, _callee, null, [[1, 8]]);
	    }))();
	  };
	  _proto.post = function post(url) {
	    var _arguments2 = arguments,
	      _this2 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
	      var params, resp;
	      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	        while (1) switch (_context2.prev = _context2.next) {
	          case 0:
	            params = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
	            _context2.prev = 1;
	            _context2.next = 4;
	            return _this2.request.post(url, params);
	          case 4:
	            resp = _context2.sent;
	            return _context2.abrupt("return", resp);
	          case 8:
	            _context2.prev = 8;
	            _context2.t0 = _context2["catch"](1);
	            _this2.log_error("Error on POST ".concat(url), _context2.t0);
	            return _context2.abrupt("return", {
	              data: undefined,
	              status: -1
	            });
	          case 12:
	          case "end":
	            return _context2.stop();
	        }
	      }, _callee2, null, [[1, 8]]);
	    }))();
	  };
	  _proto.read = function read(url) {
	    var _arguments3 = arguments,
	      _this3 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
	      var params, options, result;
	      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
	        while (1) switch (_context3.prev = _context3.next) {
	          case 0:
	            params = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : {};
	            options = _arguments3.length > 2 && _arguments3[2] !== undefined ? _arguments3[2] : {};
	            _context3.next = 4;
	            return _this3.get("".concat(url, "/read"), params, options);
	          case 4:
	            result = _context3.sent;
	            return _context3.abrupt("return", result.data);
	          case 6:
	          case "end":
	            return _context3.stop();
	        }
	      }, _callee3);
	    }))();
	  };
	  _proto.key_list = function key_list(url, params) {
	    var _arguments4 = arguments,
	      _this4 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
	      var options, result;
	      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
	        while (1) switch (_context4.prev = _context4.next) {
	          case 0:
	            options = _arguments4.length > 2 && _arguments4[2] !== undefined ? _arguments4[2] : {};
	            _context4.next = 3;
	            return _this4.get("".concat(url, "/key_list"), params, options);
	          case 3:
	            result = _context4.sent;
	            return _context4.abrupt("return", result.data);
	          case 5:
	          case "end":
	            return _context4.stop();
	        }
	      }, _callee4);
	    }))();
	  };
	  _proto.name_list = function name_list(url, params) {
	    var _arguments5 = arguments,
	      _this5 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
	      var options, result;
	      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
	        while (1) switch (_context5.prev = _context5.next) {
	          case 0:
	            options = _arguments5.length > 2 && _arguments5[2] !== undefined ? _arguments5[2] : {};
	            _context5.next = 3;
	            return _this5.key_list(url, params, options);
	          case 3:
	            result = _context5.sent;
	            return _context5.abrupt("return", Object.values(result));
	          case 5:
	          case "end":
	            return _context5.stop();
	        }
	      }, _callee5);
	    }))();
	  };
	  _proto.find = function find(url, id) {
	    var _arguments6 = arguments,
	      _this6 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
	      var options, result;
	      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
	        while (1) switch (_context6.prev = _context6.next) {
	          case 0:
	            options = _arguments6.length > 2 && _arguments6[2] !== undefined ? _arguments6[2] : {};
	            _context6.next = 3;
	            return _this6.get("".concat(url, "/find"), {
	              id: id
	            }, options);
	          case 3:
	            result = _context6.sent;
	            return _context6.abrupt("return", result.data);
	          case 5:
	          case "end":
	            return _context6.stop();
	        }
	      }, _callee6);
	    }))();
	  };
	  _proto.distinct = function distinct(url, field) {
	    var _arguments7 = arguments,
	      _this7 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
	      var params, options, nparams, result;
	      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
	        while (1) switch (_context7.prev = _context7.next) {
	          case 0:
	            params = _arguments7.length > 2 && _arguments7[2] !== undefined ? _arguments7[2] : {};
	            options = _arguments7.length > 3 && _arguments7[3] !== undefined ? _arguments7[3] : {};
	            nparams = _objectSpread2(_objectSpread2({}, params), {}, {
	              distinct_field: field
	            });
	            _context7.next = 5;
	            return _this7.get("".concat(url, "/distinct"), nparams, options);
	          case 5:
	            result = _context7.sent;
	            return _context7.abrupt("return", result.data);
	          case 7:
	          case "end":
	            return _context7.stop();
	        }
	      }, _callee7);
	    }))();
	  };
	  _proto.upsave = function upsave(url, params) {
	    var _arguments8 = arguments,
	      _this8 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
	      var options, result;
	      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
	        while (1) switch (_context8.prev = _context8.next) {
	          case 0:
	            options = _arguments8.length > 2 && _arguments8[2] !== undefined ? _arguments8[2] : {};
	            if (!(params.id == undefined)) {
	              _context8.next = 8;
	              break;
	            }
	            delete params.id;
	            _context8.next = 5;
	            return _this8.post("".concat(url, "/save"), params, options);
	          case 5:
	            result = _context8.sent;
	            _context8.next = 11;
	            break;
	          case 8:
	            _context8.next = 10;
	            return _this8.post("".concat(url, "/update"), params, options);
	          case 10:
	            result = _context8.sent;
	          case 11:
	            return _context8.abrupt("return", result.data);
	          case 12:
	          case "end":
	            return _context8.stop();
	        }
	      }, _callee8);
	    }))();
	  };
	  _proto.remove = function remove(url, id) {
	    var _arguments9 = arguments,
	      _this9 = this;
	    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
	      var options, params, result;
	      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
	        while (1) switch (_context9.prev = _context9.next) {
	          case 0:
	            options = _arguments9.length > 2 && _arguments9[2] !== undefined ? _arguments9[2] : {};
	            params = {
	              id: id
	            };
	            _context9.next = 4;
	            return _this9.post("".concat(url, "/delete"), params, options);
	          case 4:
	            result = _context9.sent;
	            return _context9.abrupt("return", result.data);
	          case 6:
	          case "end":
	            return _context9.stop();
	        }
	      }, _callee9);
	    }))();
	  };
	  return Fetcher;
	}();
	Fetcher.keyList = Fetcher.key_list;
	Fetcher.nameList = Fetcher.name_list;
	var useFetcher = function useFetcher() {
	  var fetcher = reactExports.useRef(new Fetcher());
	  return fetcher.current;
	};
	var AppBrowser = function AppBrowser(_ref) {
	  var children = _ref.children;
	  return /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(AppContext, {
	    context: window.__CONTEXT
	  }, children));
	};
	var _getDataFromWindow = function _getDataFromWindow(name) {
	  try {
	    if (window != undefined) {
	      var ssr_data = window.__CONTEXT.ssr_data;
	      if (ssr_data != undefined) {
	        if (ssr_data[name] != undefined) {
	          return ssr_data[name];
	        }
	      }
	    }
	  } catch (e) {}
	  return undefined;
	};
	var getSsrDataFromContext = function getSsrDataFromContext(context, name) {
	  var data = undefined;
	  if ((context === null || context === void 0 ? void 0 : context.ssr_data) != undefined && (context === null || context === void 0 ? void 0 : context.ssr_data[name]) != undefined) {
	    data = context.ssr_data[name];
	  } else {
	    var wdata = _getDataFromWindow(name);
	    if (wdata != undefined) {
	      data = wdata;
	    }
	  }
	  return data;
	};
	var useSsrDataOrReload = function useSsrDataOrReload(context, name, defval, loader) {
	  var ssrDataFromContext = getSsrDataFromContext(context, name);
	  var _useState2 = reactExports.useState(ssrDataFromContext != undefined ? ssrDataFromContext : defval),
	    ssrData = _useState2[0],
	    setSsrData = _useState2[1];
	  var _useState3 = reactExports.useState(ssrDataFromContext == undefined),
	    needToRefresh = _useState3[0],
	    setNeedToRefresh = _useState3[1];
	  var refreshSsrData = reactExports.useCallback(function () {
	    function fetchData() {
	      return _fetchData.apply(this, arguments);
	    }
	    function _fetchData() {
	      _fetchData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
	        var nSsrData;
	        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
	          while (1) switch (_context10.prev = _context10.next) {
	            case 0:
	              if (!(loader != undefined)) {
	                _context10.next = 5;
	                break;
	              }
	              _context10.next = 3;
	              return loader();
	            case 3:
	              nSsrData = _context10.sent;
	              setSsrData(nSsrData);
	            case 5:
	            case "end":
	              return _context10.stop();
	          }
	        }, _callee10);
	      }));
	      return _fetchData.apply(this, arguments);
	    }
	    fetchData();
	  }, [loader]);
	  reactExports.useEffect(function () {
	    try {
	      if (needToRefresh) {
	        setNeedToRefresh(false);
	        refreshSsrData();
	      }
	    } catch (e) {}
	  }, [needToRefresh, refreshSsrData]);
	  return [ssrData, setSsrData, refreshSsrData];
	};

	var ToolbarLink = function ToolbarLink(_ref) {
	  var path = _ref.path,
	    name = _ref.name;
	  return /*#__PURE__*/React$3.createElement(NavLink, {
	    className: function className(_ref2) {
	      var isActive = _ref2.isActive;
	      return "link " + (isActive ? "dark" : "light");
	    },
	    to: path
	  }, name);
	};
	var Header = function Header(_ref3) {
	  var context = _ref3.context;
	  return /*#__PURE__*/React$3.createElement(React$3.Fragment, null, /*#__PURE__*/React$3.createElement("div", {
	    className: "grid"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "logo"
	  }, /*#__PURE__*/React$3.createElement("div", null, /*#__PURE__*/React$3.createElement("img", {
	    src: "static/img/miolo_name.png"
	  })), /*#__PURE__*/React$3.createElement("div", null, "demo")), /*#__PURE__*/React$3.createElement("div", {
	    className: "toolbar"
	  }, /*#__PURE__*/React$3.createElement(ToolbarLink, {
	    name: "Todos",
	    path: "/todos"
	  }), context != null && context.authenticated ? /*#__PURE__*/React$3.createElement(ToolbarLink, {
	    name: "Logout",
	    path: "/logout"
	  }) : /*#__PURE__*/React$3.createElement(ToolbarLink, {
	    name: "Login",
	    path: "/login"
	  }), /*#__PURE__*/React$3.createElement("a", {
	    className: "link github",
	    href: "https://github.com/afialapis",
	    target: "_blank",
	    rel: "noreferrer"
	  }, /*#__PURE__*/React$3.createElement("img", {
	    src: "static/img/github.png"
	  })))));
	};
	var Header$1 = withContext(Header);

	var Badges = function Badges() {
	  return /*#__PURE__*/React$3.createElement("div", {
	    className: "badges"
	  }, /*#__PURE__*/React$3.createElement("span", {
	    className: "badge"
	  }, /*#__PURE__*/React$3.createElement("a", {
	    href: "https://www.npmjs.com/package/miolo"
	  }, /*#__PURE__*/React$3.createElement("img", {
	    alt: "NPM Version",
	    src: "https://badge.fury.io/js/miolo.svg"
	  }))), /*#__PURE__*/React$3.createElement("span", {
	    className: "badge"
	  }, /*#__PURE__*/React$3.createElement("a", {
	    href: "https://www.npmjs.com/package/miolo"
	  }, /*#__PURE__*/React$3.createElement("img", {
	    alt: "NPM Downloads",
	    src: "https://img.shields.io/npm/dm/miolo.svg?style=flat"
	  }))));
	};

	var Page = function Page() {
	  return /*#__PURE__*/React$3.createElement("div", {
	    className: "main"
	  }, /*#__PURE__*/React$3.createElement("nav", {
	    className: "page-header"
	  }, /*#__PURE__*/React$3.createElement(Header$1, null)), /*#__PURE__*/React$3.createElement("div", {
	    className: "page-body"
	  }, /*#__PURE__*/React$3.createElement(Outlet, null)), /*#__PURE__*/React$3.createElement("footer", {
	    className: "page-footer"
	  }, /*#__PURE__*/React$3.createElement(Badges, null), /*#__PURE__*/React$3.createElement("div", null, "miolo is sharpened by ", /*#__PURE__*/React$3.createElement("a", {
	    href: 'afialapis.com',
	    target: "_blank noopener noreferrer"
	  }, "afialapis.com"), " under ", /*#__PURE__*/React$3.createElement("a", {
	    href: "https://opensource.org/licenses/MIT",
	    target: "_blank noopener noreferrer"
	  }, "MIT"), " license")));
	};

	function _deepGet(obj, path) {
	  return path.split('.').reduce(function (prev, curr) {
	    return prev ? prev[curr] : undefined
	  }, obj || self)
	}


	function collSort(coll, by, order) {
	  if (by==undefined) {
	    return coll
	  }
	  const ft = order=='desc' ? -1 : 1;
	  return coll.slice().sort(function (a, b) {
	    /*
	    const fa = a[by].toLowerCase(), fb = b[by].toLowerCase()
	    if (fa < fb) //sort string ascending
	      return -1 * ft
	    if (fa > fb)
	      return 1 * ft
	    return 0 //default return value (no sorting)
	    */
	   //return (a[by]-b[by])*ft
	   let av,bv;

	   if (typeof by == 'object') {
	    
	    av = _deepGet(a, by.field);
	    bv = _deepGet(b, by.field);
	    av= by.map[av] || '';
	    bv= by.map[bv] || '';
	   } else if (typeof by == 'function') {
	    av = by(a) || '';
	    bv = by(b) || '';
	   } else {
	    av = _deepGet(a, by);
	    bv = _deepGet(b, by);
	   }
	   if (typeof av == 'string' && typeof bv == 'string') {
	     av= av.toLowerCase();
	     bv= bv.toLowerCase();
	   }

	    if (av < bv) //sort string ascending
	      return -1 * ft
	    if (av > bv)
	      return 1 * ft
	    return 0
	  })  
	}

	var TodosList = function TodosList(_ref) {
	  var authenticated = _ref.authenticated,
	    todoList = _ref.todoList,
	    addTodo = _ref.addTodo,
	    toggleTodo = _ref.toggleTodo,
	    removeTodo = _ref.removeTodo,
	    checkLastHour = _ref.checkLastHour,
	    insertFakeTodo = _ref.insertFakeTodo;
	  var _useState = reactExports$3.useState(''),
	    inputText = _useState[0],
	    setInputText = _useState[1];
	  var throwAnError = function throwAnError() {
	    throw Error('(Bad) Surprise!');
	  };
	  return /*#__PURE__*/React$3.createElement("div", {
	    className: "todos"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "todos-header"
	  }, /*#__PURE__*/React$3.createElement("h1", null, "To Do List"), /*#__PURE__*/React$3.createElement("div", {
	    className: "todos-add"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "input-container"
	  }, /*#__PURE__*/React$3.createElement("input", {
	    type: "text",
	    placeholder: "Things to be done...",
	    value: inputText,
	    onChange: function onChange(ev) {
	      return setInputText(ev.target.value);
	    }
	  })), /*#__PURE__*/React$3.createElement("div", {
	    className: "button--primary " + (inputText.length == 0 ? 'disabled' : ''),
	    onClick: function onClick() {
	      addTodo(inputText), setInputText('');
	    }
	  }, "Add"))), /*#__PURE__*/React$3.createElement("div", {
	    className: "todos-body"
	  }, todoList.length == -100 ? /*#__PURE__*/React$3.createElement("div", null, "...") : /*#__PURE__*/React$3.createElement("ol", {
	    className: "todos-list"
	  }, collSort(todoList, 'name').map(function (todo) {
	    return /*#__PURE__*/React$3.createElement("li", {
	      key: "todo_" + todo.id,
	      className: "todo"
	    }, /*#__PURE__*/React$3.createElement("div", {
	      className: "todo-text"
	    }, todo.name), authenticated ? /*#__PURE__*/React$3.createElement(React$3.Fragment, null, /*#__PURE__*/React$3.createElement("div", {
	      className: "todo-check " + (todo.done ? 'done' : 'undone'),
	      onClick: function onClick() {
	        return toggleTodo(todo.id);
	      }
	    }, todo.done ? /*#__PURE__*/React$3.createElement("svg", {
	      xmlns: "http://www.w3.org/2000/svg",
	      width: "24",
	      height: "24"
	    }, /*#__PURE__*/React$3.createElement("path", {
	      d: "M9.993 19.421 3.286 12.58l1.428-1.401 5.293 5.4 9.286-9.286 1.414 1.414L9.993 19.421z"
	    })) : /*#__PURE__*/React$3.createElement("svg", {
	      version: "1.1",
	      xmlns: "http://www.w3.org/2000/svg",
	      width: "18",
	      height: "18",
	      viewBox: "0 0 32 32"
	    }, /*#__PURE__*/React$3.createElement("path", {
	      d: "M22.781 16c4.305-2.729 7.219-7.975 7.219-14 0-0.677-0.037-1.345-0.109-2h-27.783c-0.072 0.655-0.109 1.323-0.109 2 0 6.025 2.914 11.271 7.219 14-4.305 2.729-7.219 7.975-7.219 14 0 0.677 0.037 1.345 0.109 2h27.783c0.072-0.655 0.109-1.323 0.109-2 0-6.025-2.914-11.271-7.219-14zM5 30c0-5.841 2.505-10.794 7-12.428v-3.143c-4.495-1.634-7-6.587-7-12.428v0h22c0 5.841-2.505 10.794-7 12.428v3.143c4.495 1.634 7 6.587 7 12.428h-22zM19.363 20.925c-2.239-1.27-2.363-2.918-2.363-3.918v-2.007c0-1 0.119-2.654 2.367-3.927 1.203-0.699 2.244-1.761 3.033-3.073h-12.799c0.79 1.313 1.832 2.376 3.036 3.075 2.239 1.27 2.363 2.918 2.363 3.918v2.007c0 1-0.119 2.654-2.367 3.927-2.269 1.318-3.961 3.928-4.472 7.073h15.677c-0.511-3.147-2.204-5.758-4.475-7.075z"
	    }))), /*#__PURE__*/React$3.createElement("div", {
	      className: "todo-del",
	      onClick: function onClick(_ev) {
	        return removeTodo(todo.id);
	      }
	    }, /*#__PURE__*/React$3.createElement("svg", {
	      xmlns: "http://www.w3.org/2000/svg",
	      x: "0px",
	      y: "0px",
	      width: "24",
	      height: "24",
	      viewBox: "0 0 48 48"
	    }, /*#__PURE__*/React$3.createElement("path", {
	      d: "M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"
	    })))) : null);
	  }))), /*#__PURE__*/React$3.createElement("div", {
	    className: "todos-footer"
	  }, /*#__PURE__*/React$3.createElement("h3", null, "Shortcuts"), /*#__PURE__*/React$3.createElement("div", {
	    className: "question",
	    onClick: function onClick() {
	      return checkLastHour();
	    }
	  }, "Tell me how many todos I have added in the last hour"), /*#__PURE__*/React$3.createElement("div", {
	    className: "question",
	    onClick: function onClick() {
	      return throwAnError();
	    }
	  }, "Throw some JS error (server will receive it)"), authenticated ? /*#__PURE__*/React$3.createElement("div", {
	    className: "question",
	    onClick: function onClick() {
	      return insertFakeTodo();
	    }
	  }, "Insert a fake one") : null));
	};

	function show_title(title) {
	  if (document != undefined) {
	    document.title = title;
	  }
	}
	var Todos = function Todos(_ref) {
	  var context = _ref.context;
	  var fetcher = useFetcher();
	  function todoListLoader() {
	    return _todoListLoader.apply(this, arguments);
	  }
	  function _todoListLoader() {
	    _todoListLoader = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
	      var nTodoList;
	      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
	        while (1) switch (_context5.prev = _context5.next) {
	          case 0:
	            show_title('loading todos...');
	            _context5.next = 3;
	            return fetcher.read('crud/todos');
	          case 3:
	            nTodoList = _context5.sent;
	            show_title('todos loaded!');
	            return _context5.abrupt("return", nTodoList);
	          case 6:
	          case "end":
	            return _context5.stop();
	        }
	      }, _callee5);
	    }));
	    return _todoListLoader.apply(this, arguments);
	  }
	  var _useSsrDataOrReload = useSsrDataOrReload(context, 'todoList', [], todoListLoader),
	    todoList = _useSsrDataOrReload[0],
	    setTodoList = _useSsrDataOrReload[1],
	    refreshTodoList = _useSsrDataOrReload[2];
	  var addTodo = reactExports$3.useCallback(function (text) {
	    function addIt() {
	      return _addIt.apply(this, arguments);
	    }
	    function _addIt() {
	      _addIt = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        var todoObject, todoId;
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              todoObject = {
	                id: undefined,
	                name: text,
	                done: false
	              };
	              _context.next = 3;
	              return fetcher.upsave('crud/todos', todoObject);
	            case 3:
	              todoId = _context.sent;
	              todoObject.id = todoId;
	              setTodoList([todoObject].concat(todoList));
	            case 6:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee);
	      }));
	      return _addIt.apply(this, arguments);
	    }
	    addIt();
	  }, [fetcher, todoList, setTodoList]);
	  var toggleTodo = reactExports$3.useCallback(function (todoId) {
	    function toggleIt() {
	      return _toggleIt.apply(this, arguments);
	    }
	    function _toggleIt() {
	      _toggleIt = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
	        var nTodoList, selectedTodoIndex;
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              nTodoList = [].concat(todoList);
	              selectedTodoIndex = nTodoList.findIndex(function (item) {
	                return item.id == todoId;
	              });
	              nTodoList[selectedTodoIndex].done = !nTodoList[selectedTodoIndex].done;
	              setTodoList(nTodoList);
	              _context2.next = 6;
	              return fetcher.upsave('crud/todos', nTodoList[selectedTodoIndex]);
	            case 6:
	              _context2.sent;
	            case 7:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2);
	      }));
	      return _toggleIt.apply(this, arguments);
	    }
	    toggleIt();
	  }, [fetcher, todoList, setTodoList]);
	  var removeTodo = reactExports$3.useCallback(function (todoId) {
	    var nTodoList = [].concat(todoList);
	    nTodoList.splice(nTodoList.findIndex(function (item) {
	      return item.id == todoId;
	    }), 1);
	    setTodoList(nTodoList);
	    fetcher.remove('crud/todos', todoId);
	  }, [fetcher, todoList, setTodoList]);
	  var checkLastHour = reactExports$3.useCallback( /*#__PURE__*/_asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
	    var res;
	    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
	      while (1) switch (_context3.prev = _context3.next) {
	        case 0:
	          _context3.next = 2;
	          return fetcher.get('crud/todos/last_hour');
	        case 2:
	          res = _context3.sent;
	          alert("You have added " + res.data + " todos in the last hour");
	        case 4:
	        case "end":
	          return _context3.stop();
	      }
	    }, _callee3);
	  })), [fetcher]);
	  var insertFakeTodo = reactExports$3.useCallback( /*#__PURE__*/_asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
	    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
	      while (1) switch (_context4.prev = _context4.next) {
	        case 0:
	          _context4.next = 2;
	          return fetcher.post('crud/todos/fake');
	        case 2:
	          _context4.sent;
	          refreshTodoList();
	        case 4:
	        case "end":
	          return _context4.stop();
	      }
	    }, _callee4);
	  })), [fetcher, refreshTodoList]);
	  return /*#__PURE__*/React$3.createElement(TodosList, {
	    authenticated: context.authenticated,
	    todoList: todoList,
	    addTodo: addTodo,
	    toggleTodo: toggleTodo,
	    removeTodo: removeTodo,
	    checkLastHour: checkLastHour,
	    insertFakeTodo: insertFakeTodo
	  });
	};
	var Todos$1 = withContext(Todos);

	var LoginForm = function LoginForm(_ref) {
	  var onLogin = _ref.onLogin,
	    message = _ref.message;
	  var _useState = reactExports$3.useState(''),
	    username = _useState[0],
	    setUsername = _useState[1];
	  var _useState2 = reactExports$3.useState(''),
	    password = _useState2[0],
	    setPassword = _useState2[1];
	  return /*#__PURE__*/React$3.createElement("div", {
	    className: "login"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "login-field-group"
	  }, /*#__PURE__*/React$3.createElement("h5", null, "Username"), /*#__PURE__*/React$3.createElement("div", {
	    className: "input-container"
	  }, /*#__PURE__*/React$3.createElement("input", {
	    type: "text",
	    placeholder: "John Doe",
	    value: username,
	    onChange: function onChange(ev) {
	      return setUsername(ev.target.value);
	    }
	  }))), /*#__PURE__*/React$3.createElement("div", {
	    className: "login-field-group"
	  }, /*#__PURE__*/React$3.createElement("h5", null, "Password"), /*#__PURE__*/React$3.createElement("div", {
	    className: "input-container"
	  }, /*#__PURE__*/React$3.createElement("input", {
	    type: "password",
	    value: password,
	    onChange: function onChange(ev) {
	      return setPassword(ev.target.value);
	    }
	  }))), /*#__PURE__*/React$3.createElement("div", {
	    className: "login-action"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "button--primary " + (username.length == 0 || password.length == 0 ? 'disabled' : ''),
	    onClick: function onClick() {
	      return onLogin(username, password);
	    }
	  }, "Login")), message != undefined ? /*#__PURE__*/React$3.createElement("div", {
	    className: "login-message"
	  }, message) : null);
	};

	var Login = function Login(_ref) {
	  var setContext = _ref.setContext;
	  var fetcher = useFetcher();
	  var navigate = useNavigate();
	  var _useState = reactExports$3.useState(undefined),
	    message = _useState[0],
	    setMessage = _useState[1];
	  var doTheLogin = reactExports$3.useCallback( /*#__PURE__*/function () {
	    var _ref2 = _asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(username, password) {
	      var _yield$fetcher$post, data;
	      return _regeneratorRuntime().wrap(function _callee$(_context) {
	        while (1) switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return fetcher.post('/login', {
	              username: username,
	              password: password
	            });
	          case 2:
	            _yield$fetcher$post = _context.sent;
	            data = _yield$fetcher$post.data;
	            if (data.authenticated) {
	              setMessage(undefined);
	              navigate("/");
	              setContext(data);
	            } else {
	              setMessage(data.info);
	            }
	          case 5:
	          case "end":
	            return _context.stop();
	        }
	      }, _callee);
	    }));
	    return function (_x, _x2) {
	      return _ref2.apply(this, arguments);
	    };
	  }(), [fetcher, setContext, navigate]);
	  return /*#__PURE__*/React$3.createElement(LoginForm, {
	    onLogin: doTheLogin,
	    message: message
	  });
	};
	var Login$1 = withContext(Login);

	var LogoutForm = function LogoutForm(_ref) {
	  var onLogout = _ref.onLogout;
	  return /*#__PURE__*/React$3.createElement("div", {
	    className: "logout"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "goodbye"
	  }, "Farewell adi\xF3s my friend"), /*#__PURE__*/React$3.createElement("div", {
	    className: "logout-action"
	  }, /*#__PURE__*/React$3.createElement("div", {
	    className: "button--primary",
	    onClick: function onClick() {
	      return onLogout();
	    }
	  }, "Logout")));
	};

	var Logout = function Logout() {
	  var fetcher = useFetcher();
	  var doTheLogout = reactExports$3.useCallback( /*#__PURE__*/_asyncToGenerator$1( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	    return _regeneratorRuntime().wrap(function _callee$(_context) {
	      while (1) switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return fetcher.post('/logout');
	        case 2:
	          _context.sent;
	        case 3:
	        case "end":
	          return _context.stop();
	      }
	    }, _callee);
	  })), [fetcher]);
	  return /*#__PURE__*/React$3.createElement(LogoutForm, {
	    onLogout: doTheLogout
	  });
	};

	var Index = function Index(_ref) {
	  var context = _ref.context;
	  // console.log('miolo-demo UI Index ')
	  // console.log(context)

	  return /*#__PURE__*/React$3.createElement(Routes, null, /*#__PURE__*/React$3.createElement(Route, {
	    path: '/',
	    element: /*#__PURE__*/React$3.createElement(Page, null)
	  }, /*#__PURE__*/React$3.createElement(Route, {
	    index: true,
	    element: /*#__PURE__*/React$3.createElement(Todos$1, null)
	  }), /*#__PURE__*/React$3.createElement(Route, {
	    path: 'todos',
	    element: /*#__PURE__*/React$3.createElement(Todos$1, null)
	  }), context.authenticated ? /*#__PURE__*/React$3.createElement(Route, {
	    path: 'logout',
	    element: /*#__PURE__*/React$3.createElement(Logout, null)
	  }) : /*#__PURE__*/React$3.createElement(Route, {
	    path: 'login',
	    element: /*#__PURE__*/React$3.createElement(Login$1, null)
	  }), /*#__PURE__*/React$3.createElement(Route, {
	    path: "*",
	    element: /*#__PURE__*/React$3.createElement(Navigate, {
	      to: "todos"
	    })
	  })));
	};
	var Index$1 = withContext(Index);

	var App = function App() {
	  return /*#__PURE__*/React$3.createElement(AppBrowser, null, /*#__PURE__*/React$3.createElement(Index$1, null));
	};

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = "/* css variables*/\n:root {\n  --font-size: 12pt;\n  --font-size-sm: 9pt;\n  --primary-color: #432E30;\n  --primary-color-light: #8E7474;\n  --accent-color: #DD356E;\n  --accent-color-light: #f0b9cb;\n  /*--accent-color-light: #FFE4E4;\n  --accent-color-dark: #B94B4C;*/\n  --white-color: #FAFBFC;\n  /*--light-gray-color: #C6CBD1;\n  --medium-gray-color: #959DA5;\n  --dark-gray-color: #444D56; */\n  --header-bg-color: #F8F8FA;\n  --header-bg-color-secondary: #e4e4f7;\n  --code-bg-color: #f9f9f9;\n  --logo-gray: #6f6f6f;\n  --header-logo-width: 125px;\n  --header-logo-width-resp: 100px;\n  --header-grid-height: 4em;\n  --header-grid-height-resp: 3em;\n  --header-sub-height: 0;\n  --header-sub-height-resp: 2.5em;\n  --menu-width-web: 20em;\n  --border: 1px solid var(--header-bg-color);\n  --gradient-color-main: var(--header-bg-color);\n  /* #a2ed56;*/\n  --gradient-color-secondary: var(--header-bg-color-secondary);\n  /*#fddc32;*/ }\n\n/*** EXTEND ***/\n/* box-shadow */\ndiv.input-container, ol.todos-list > li.todo, ol.todos-list > li.todo::before {\n  box-shadow: 0.25rem 0.25rem 0.6rem rgba(0, 0, 0, 0.05), 0 0.5rem 1.125rem rgba(75, 0, 0, 0.05); }\n\n/*\n@font-face {\n  font-family: \"Inconsolata\";\n  font-weight: normal;\n  src: url(../fonts/Inconsolata/Inconsolata-Regular.ttf) format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Inconsolata\";\n  font-weight: bold;\n  src: url(../fonts/Inconsolata/Inconsolata-Bold.ttf) format(\"truetype\");\n}\n\n*/\n/* normalized */\nbody {\n  padding: 0;\n  margin: 0;\n  font-family: 'Inconsolata', Arial, sans-serif;\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  background-color: white;\n  color: var(--primary-color); }\n\nh1, h2 {\n  color: var(--primary-color); }\n\nh1 {\n  font-size: 2em;\n  padding-bottom: 1em; }\n\nh2 {\n  font-size: 1.5em;\n  padding-bottom: 0.75em; }\n\nh3 {\n  font-size: 1.25em;\n  padding-bottom: 0.5em; }\n\nh1:not(:first-child) {\n  padding-top: 2em; }\n\nh2:not(:first-child) {\n  padding-top: 1.25em; }\n\nh3:not(:first-child) {\n  padding-top: 1em; }\n\ninput {\n  font-family: 'Inconsolata', Arial, sans-serif;\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  font-size: 1.2em;\n  color: var(--primary-color); }\n\ndiv.input-container {\n  flex-basis: 75%;\n  padding-top: 7px;\n  padding-left: 1em;\n  text-align: left;\n  border-radius: 0.5rem; }\n  div.input-container input {\n    border-top-style: hidden;\n    border-right-style: hidden;\n    border-left-style: hidden;\n    border-bottom-style: hidden;\n    outline: none; }\n\npre {\n  display: block;\n  padding: 1.5em 1em !important;\n  border: 1px solid #bebab0;\n  overflow-x: auto; }\n\ncode {\n  color: var(--accent-color);\n  word-wrap: break-word;\n  font-family: \"Liberation Mono\",\"Courier New\",monospace;\n  font-size: 0.9em; }\n\npre.prettyprint {\n  background-color: var(--code-bg-color); }\n\np {\n  font-weight: 300;\n  color: #4A4A4A; }\n\na, a:hover {\n  /*text-decoration: none;*/\n  color: var(--primary-color-light); }\n\nhr {\n  padding: 1rem 0;\n  border: 0;\n  border-bottom: 1px solid var(--bg-color); }\n\n*,\n*:before,\n*:after {\n  box-sizing: border-box; }\n\na,\n.link {\n  text-decoration: none;\n  transition: all 0.3s ease-out;\n  cursor: pointer; }\n  a:hover,\n  .link:hover {\n    color: var(--accent-color); }\n  a.light,\n  .link.light {\n    font-weight: lighter; }\n  a.dark,\n  .link.dark {\n    font-weight: bolder; }\n  a img,\n  .link img {\n    position: relative;\n    vertical-align: middle; }\n  a img + span,\n  .link img + span {\n    margin-left: 0.2em; }\n\n.afi-package-name {\n  font-weight: 600;\n  color: var(--accent-color); }\n\n/* buttons */\n.button--primary {\n  padding: 10px 22px;\n  background-color: var(--accent-color);\n  color: white;\n  text-decoration: none;\n  border: 0;\n  transition: all .3s ease-out;\n  border-radius: 0.5rem;\n  text-align: center; }\n\n/*\n.button--primary:after {\n  position: absolute;\n  content: \"\";\n  width: 1rem;\n  height: 1rem;\n  background-color: var(--accent-color-light);\n  right: -0.4rem;\n  top: -0.4rem;\n  transition: all 0.3s ease-out;\n}\n*/\n.button--primary:hover {\n  cursor: pointer;\n  text-shadow: 0px 1px 1px var(--accent-color-dark);\n  color: white; }\n\n.button--primary:hover::after {\n  transform: rotate(90deg); }\n\n.button--secondary {\n  padding: 10px 22px;\n  border: 2px solid var(--primary-color);\n  transition: all 0.5s ease-out; }\n\n.button--secondary:hover {\n  cursor: pointer;\n  border-color: var(--accent-color);\n  color: var(--accent-color); }\n\n@keyframes fadeUp {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 30px, 0); }\n  100% {\n    transform: translate3d(0, 0, 0); } }\n\nnav.page-header {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 2;\n  background-color: var(--header-bg-color); }\n  @media screen and (min-width: 600px) {\n    nav.page-header {\n      padding-left: 4em;\n      padding-right: 4em; } }\n  nav.page-header .grid {\n    display: grid;\n    grid-template-columns: var(--header-logo-width) auto;\n    padding: 1em;\n    height: var(--header-grid-height); }\n    @media screen and (max-width: 600px) {\n      nav.page-header .grid {\n        grid-template-columns: var(--header-logo-width-resp) auto;\n        height: var(--header-grid-height-resp); } }\n    nav.page-header .grid div.logo {\n      display: flex;\n      align-items: baseline; }\n      nav.page-header .grid div.logo div:last-child {\n        padding-left: 1em;\n        color: var(--accent-color-light); }\n      nav.page-header .grid div.logo img {\n        width: 125px; }\n        @media screen and (max-width: 600px) {\n          nav.page-header .grid div.logo img {\n            width: 100px;\n            margin-left: 0.5em; } }\n    nav.page-header .grid div.toolbar a:not(:last-child) {\n      padding-right: 1em; }\n      @media screen and (max-width: 600px) {\n        nav.page-header .grid div.toolbar a:not(:last-child) {\n          padding-right: 0.5em; } }\n    nav.page-header .grid div.toolbar a img {\n      width: 1em;\n      top: -0.05em; }\n  nav.page-header .grid div.toolbar {\n    text-align: right; }\n\ndiv.toggler {\n  text-align: right;\n  padding-top: 1em;\n  padding-right: 1em;\n  cursor: pointer;\n  display: none; }\n  @media screen and (max-width: 600px) {\n    div.toggler {\n      display: block; } }\n  div.toggler .toggle {\n    position: relative; }\n  div.toggler .toggle span,\n  div.toggler .toggle span:before,\n  div.toggler .toggle span:after {\n    content: '';\n    position: absolute;\n    height: 2px;\n    width: 18px;\n    border-radius: 2px;\n    background: var(--primary-color);\n    display: block;\n    cursor: pointer;\n    transition: all 0.3s ease-in-out;\n    right: 0; }\n  div.toggler .toggle span:before {\n    top: -6px; }\n  div.toggler .toggle span:after {\n    bottom: -6px; }\n  div.toggler .toggle.open span {\n    background-color: transparent; }\n  div.toggler .toggle.open span:before,\n  div.toggler .toggle.open span:after {\n    top: 0; }\n  div.toggler .toggle.open span:before {\n    transform: rotate(45deg); }\n  div.toggler .toggle.open span:after {\n    transform: rotate(-45deg); }\n\ndiv.page-body {\n  position: relative;\n  padding: calc(var(--header-grid-height)) 2em 0 2em;\n  width: 100%;\n  overflow-y: hidden; }\n  @media screen and (max-width: 600px) {\n    div.page-body {\n      margin-top: calc(var(--header-grid-height-resp) + 2em);\n      padding: 0 1em; } }\n\n@media screen and (max-width: 600px) {\n  .main > footer.page-footer {\n    display: block; } }\n\nfooter.page-footer {\n  font-size: var(--font-size-sm);\n  border-top: var(--border);\n  padding: 1.5em;\n  text-align: center;\n  z-index: 2; }\n  footer.page-footer .badges {\n    padding: 1em 0;\n    display: flex;\n    justify-content: center; }\n    footer.page-footer .badges span.badge {\n      display: block;\n      padding-top: 0.5em;\n      padding-right: 1em; }\n      @media screen and (max-width: 600px) {\n        footer.page-footer .badges span.badge {\n          display: inline-block;\n          padding-top: 0; } }\n\n:root {\n  --loading-size: 125px;\n  --clr-bg: #272324;\n  --clr1: var(--primary-color);\n  --clr2: var(--accent-color);\n  --clr3: var(--accent-color-light); }\n\n.center-screen {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  min-height: 100vh; }\n\n.spinner {\n  --animation-duration: 5000ms;\n  position: relative;\n  width: var(--loading-size);\n  height: var(--loading-size);\n  transform: rotate(45deg); }\n  .spinner .spinner-item {\n    --item-size: calc(var(--loading-size) / 2.5);\n    position: absolute;\n    width: var(--item-size);\n    height: var(--item-size);\n    border: 4px solid var(--clr-spinner); }\n  .spinner .spinner-item:nth-child(1) {\n    --clr-spinner: var(--clr1);\n    top: 0;\n    left: 0;\n    animation: spinner3A var(--animation-duration) linear infinite; }\n\n@keyframes spinner3A {\n  0%,\n  8.33%,\n  16.66%,\n  100% {\n    transform: translate(0%, 0%); }\n  24.99%,\n  33.32%,\n  41.65% {\n    transform: translate(100%, 0%); }\n  49.98%,\n  58.31%,\n  66.64% {\n    transform: translate(100%, 100%); }\n  74.97%,\n  83.30%,\n  91.63% {\n    transform: translate(0%, 100%); } }\n  .spinner .spinner-item:nth-child(2) {\n    --clr-spinner: var(--clr2);\n    top: 0;\n    left: var(--item-size);\n    animation: spinner3B var(--animation-duration) linear infinite; }\n\n@keyframes spinner3B {\n  0%,\n  8.33%,\n  91.63%,\n  100% {\n    transform: translate(0%, 0%); }\n  16.66%,\n  24.99%,\n  33.32% {\n    transform: translate(0%, 100%); }\n  41.65%,\n  49.98%,\n  58.31% {\n    transform: translate(-100%, 100%); }\n  66.64%,\n  74.97%,\n  83.30% {\n    transform: translate(-100%, 0%); } }\n  .spinner .spinner-item:nth-child(3) {\n    --clr-spinner: var(--clr3);\n    top: var(--item-size);\n    left: var(--item-size);\n    animation: spinner3C var(--animation-duration) linear infinite; }\n\n@keyframes spinner3C {\n  0%,\n  83.30%,\n  91.63%,\n  100% {\n    transform: translate(0, 0); }\n  8.33%,\n  16.66%,\n  24.99% {\n    transform: translate(-100%, 0); }\n  33.32%,\n  41.65%,\n  49.98% {\n    transform: translate(-100%, -100%); }\n  58.31%,\n  66.64%,\n  74.97% {\n    transform: translate(0, -100%); } }\n\ndiv.todos-header h1 {\n  text-align: center; }\n\ndiv.todos-header div.todos-add {\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  flex-wrap: wrap;\n  padding: 0 5em; }\n\ndiv.todos-body {\n  overflow-y: scroll;\n  height: 500px;\n  padding: 1em;\n  margin: 1em 0; }\n\n/* todos gradients */\nol.todos-list {\n  counter-reset: gradient-counter;\n  list-style: none;\n  margin: 1.75rem 0;\n  padding-left: 1rem; }\n  ol.todos-list > li.todo {\n    border-radius: 0 0.5rem 0.5rem 0.5rem;\n    counter-increment: gradient-counter;\n    margin-top: 1rem;\n    min-height: 3rem;\n    padding: 1rem 1rem 1rem 3rem;\n    position: relative; }\n    ol.todos-list > li.todo::before, ol.todos-list > li.todo::after {\n      background: linear-gradient(135deg, var(--gradient-color-secondary) 0%, var(--gradient-color-main) 100%);\n      border-radius: 1rem 1rem 0 1rem;\n      content: '';\n      height: 3rem;\n      left: -1rem;\n      overflow: hidden;\n      position: absolute;\n      top: -1rem;\n      width: 3rem; }\n    ol.todos-list > li.todo::before {\n      align-items: flex-end;\n      content: counter(gradient-counter);\n      display: flex;\n      font-weight: 900;\n      font-size: 1.5em;\n      justify-content: flex-end;\n      padding: 0.125em 0.25em;\n      z-index: 1; }\n    ol.todos-list > li.todo:nth-child(10n+1):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.2) 0%, rgba(var(--gradient-color-secondary), 0.2) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+2):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.4) 0%, rgba(var(--gradient-color-secondary), 0.4) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+3):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.6) 0%, rgba(var(--gradient-color-secondary), 0.6) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+4):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.8) 0%, rgba(var(--gradient-color-secondary), 0.8) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+5):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 1) 0%, rgba(var(--gradient-color-secondary), 1) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+6):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.8) 0%, rgba(var(--gradient-color-secondary), 0.8) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+7):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.6) 0%, rgba(var(--gradient-color-secondary), 0.6) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+8):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.4) 0%, rgba(var(--gradient-color-secondary), 0.4) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+9):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0.2) 0%, rgba(var(--gradient-color-secondary), 0.2) 100%); }\n    ol.todos-list > li.todo:nth-child(10n+10):before {\n      background: linear-gradient(135deg, rgba(var(--gradient-color-main), 0) 0%, rgba(var(--gradient-color-secondary), 0) 100%); }\n    ol.todos-list > li.todo + li {\n      margin-top: 2rem; }\n\n/* todo positioning */\nol.todos-list > li.todo {\n  display: flex;\n  justify-content: left;\n  width: 100%;\n  flex-wrap: wrap; }\n  ol.todos-list > li.todo svg {\n    fill: var(--primary-color-light); }\n  ol.todos-list > li.todo .todo-text {\n    width: auto;\n    margin-right: auto; }\n  ol.todos-list > li.todo .todo-check.done svg {\n    margin-top: -3px; }\n  ol.todos-list > li.todo .todo-check.undone svg {\n    margin-top: 3px;\n    fill: var(--primary-color-light); }\n  ol.todos-list > li.todo .todo-del {\n    /*\n      width: 20px;\n      padding-right: 1em;\n      */ }\n\n/* hovers */\nol.todos-list > li.todo .todo-check:hover {\n  cursor: pointer; }\n  ol.todos-list > li.todo .todo-check:hover svg {\n    fill: var(--accent-color); }\n\nol.todos-list > li.todo .todo-del:hover {\n  cursor: pointer; }\n  ol.todos-list > li.todo .todo-del:hover svg {\n    fill: var(--accent-color); }\n\ndiv.todos-footer {\n  padding: 2em 0; }\n  div.todos-footer .question {\n    color: var(--accent-color-light);\n    cursor: pointer;\n    padding: 0.25em 0; }\n    div.todos-footer .question:hover {\n      color: var(--accent-color); }\n\ndiv.login {\n  width: 50%;\n  margin-left: 25%; }\n  div.login div.login-action {\n    margin-top: 2em; }\n";
	styleInject(css_248z);

	miolo_catcher_init('sys/jserror');
	reactDomExports.hydrate( /*#__PURE__*/React$3.createElement(App, null), document.getElementById('root'));
	if (module.hot) {
	  module.hot.accept();
	}

})();
//# sourceMappingURL=miolo-demo.iife.bundle.js.map
