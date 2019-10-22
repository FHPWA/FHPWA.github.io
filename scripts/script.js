/* eslint-disable no-var */
/* eslint-disable prefer-const */
// Cash https://cdnjs.cloudflare.com/ajax/libs/cash/4.1.4/cash.min.js
// eslint-disable-next-line
!function () { "use strict"; var e = document, g = window, k = e.createElement("div"), l = Array.prototype, m = l.filter, n = l.indexOf, aa = l.map, q = l.push, r = l.reverse, u = l.slice, v = l.some, ba = l.splice, ca = /^#[\w-]*$/, da = /^\.[\w-]*$/, ea = /<.+>/, fa = /^\w+$/; function x(t, n) { return void 0 === n && (n = e), n && 9 === n.nodeType || n && 1 === n.nodeType ? da.test(t) ? n.getElementsByClassName(t.slice(1)) : fa.test(t) ? n.getElementsByTagName(t) : n.querySelectorAll(t) : [] } var y = function () { function t(t, n) { if (void 0 === n && (n = e), t) { if (t instanceof y) return t; var r = t; if (z(t)) { if (r = n instanceof y ? n[0] : n, !(r = ca.test(t) ? r.getElementById(t.slice(1)) : ea.test(t) ? A(t) : x(t, r))) return } else if (B(t)) return this.ready(t); for ((r.nodeType || r === g) && (r = [r]), this.length = r.length, t = 0, n = this.length; t < n; t++)this[t] = r[t] } } return t.prototype.init = function (e, n) { return new t(e, n) }, t }(), C = y.prototype.init; C.fn = C.prototype = y.prototype, y.prototype.length = 0, y.prototype.splice = ba, "function" == typeof Symbol && (y.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]), y.prototype.get = function (t) { return void 0 === t ? u.call(this) : this[0 > t ? t + this.length : t] }, y.prototype.eq = function (t) { return C(this.get(t)) }, y.prototype.first = function () { return this.eq(0) }, y.prototype.last = function () { return this.eq(-1) }, y.prototype.map = function (t) { return C(aa.call(this, function (e, n) { return t.call(e, n, e) })) }, y.prototype.slice = function () { return C(u.apply(this, arguments)) }; var ha = /-([a-z])/g; function ia(t, e) { return e.toUpperCase() } function D(t) { return t.replace(ha, ia) } function E(t, e) { for (var n = 0, r = t.length; n < r && !1 !== e.call(t[n], n, t[n]); n++); } function F(t) { for (var e = 1; e < arguments.length; e++); for (var n = (e = arguments).length, r = 2 > n ? 0 : 1; r < n; r++)for (var i in e[r]) t[i] = e[r][i]; return t } function G(t, e) { var n = t && (t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector); return !!n && n.call(t, e) } function H(t, e, n) { for (var r = [], i = 0, o = t.length; i < o; i++)for (var a = t[i][e]; null != a && (r.push(a), n);)a = a[e]; return r } function I(t) { return !!t && t === t.window } function B(t) { return "function" == typeof t } function z(t) { return "string" == typeof t } function J(t) { return !isNaN(parseFloat(t)) && isFinite(t) } C.camelCase = D, C.each = E, y.prototype.each = function (t) { return E(this, t), this }, y.prototype.removeProp = function (t) { return this.each(function (e, n) { delete n[t] }) }, y.prototype.extend = function (t) { return F(C.fn, t) }, C.extend = F, C.guid = 1, C.matches = G; var K = Array.isArray; function L(t) { return z(t) ? function (e, n) { return G(n, t) } : B(t) ? t : t instanceof y ? function (e, n) { return t.is(n) } : function (e, n) { return n === t } } function M(t, e) { return e && t.length ? t.filter(e) : t } C.isWindow = I, C.isFunction = B, C.isString = z, C.isNumeric = J, C.isArray = K, y.prototype.prop = function (t, e) { if (t) { if (z(t)) return 2 > arguments.length ? this[0] && this[0][t] : this.each(function (n, r) { r[t] = e }); for (var n in t) this.prop(n, t[n]); return this } }, y.prototype.filter = function (t) { if (!t) return C(); var e = L(t); return C(m.call(this, function (t, n) { return e.call(t, n, t) })) }; var ja = /\S+/g; function N(t) { return z(t) && t.match(ja) || [] } function O(t) { return 1 < t.length ? m.call(t, function (t, e, r) { return n.call(r, t) === e }) : t } function P(t, e, n) { if (t && 1 === t.nodeType && e) return t = g.getComputedStyle(t, null), e ? n ? t.getPropertyValue(e) || void 0 : t[e] : t } function Q(t, e) { return parseInt(P(t, e), 10) || 0 } y.prototype.hasClass = function (t) { return t && v.call(this, function (e) { return e.classList.contains(t) }) }, y.prototype.removeAttr = function (t) { var e = N(t); return e.length ? this.each(function (t, n) { E(e, function (t, e) { n.removeAttribute(e) }) }) : this }, y.prototype.attr = function (t, e) { if (t) { if (z(t)) { if (2 > arguments.length) { if (!this[0]) return; var n = this[0].getAttribute(t); return null === n ? void 0 : n } return void 0 === e ? this : null === e ? this.removeAttr(t) : this.each(function (n, r) { r.setAttribute(t, e) }) } for (n in t) this.attr(n, t[n]); return this } }, y.prototype.toggleClass = function (t, e) { var n = N(t), r = void 0 !== e; return n.length ? this.each(function (t, i) { E(n, function (t, n) { r ? e ? i.classList.add(n) : i.classList.remove(n) : i.classList.toggle(n) }) }) : this }, y.prototype.addClass = function (t) { return this.toggleClass(t, !0) }, y.prototype.removeClass = function (t) { return arguments.length ? this.toggleClass(t, !1) : this.attr("class", "") }, C.unique = O, y.prototype.add = function (t, e) { return C(O(this.get().concat(C(t, e).get()))) }; var R = /^--/, S = {}, ka = k.style, la = ["webkit", "moz", "ms", "o"]; function ma(t, e) { if (void 0 === e && (e = R.test(t)), e) return t; if (!S[t]) { var n = "" + (e = D(t)).charAt(0).toUpperCase() + e.slice(1); E(e = (e + " " + la.join(n + " ") + n).split(" "), function (e, n) { if (n in ka) return S[t] = n, !1 }) } return S[t] } C.prefixedProp = ma; var na = { animationIterationCount: !0, columnCount: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0 }; function oa(t, e, n) { return void 0 === n && (n = R.test(t)), n || na[t] || !J(e) ? e : e + "px" } function pa(t, e) { t = t.dataset ? t.dataset[e] || t.dataset[D(e)] : t.getAttribute("data-" + e); try { return JSON.parse(t) } catch (t) { } return t } y.prototype.css = function (t, e) { if (z(t)) { var n = R.test(t); return t = ma(t, n), 2 > arguments.length ? this[0] && P(this[0], t, n) : t ? (e = oa(t, e, n), this.each(function (r, i) { i && 1 === i.nodeType && (n ? i.style.setProperty(t, e) : i.style[t] = e) })) : this } for (var r in t) this.css(r, t[r]); return this }; var qa = /^data-(.+)/; function ra(t, e) { return Q(t, "border" + (e ? "Left" : "Top") + "Width") + Q(t, "padding" + (e ? "Left" : "Top")) + Q(t, "padding" + (e ? "Right" : "Bottom")) + Q(t, "border" + (e ? "Right" : "Bottom") + "Width") } y.prototype.data = function (t, e) { var n = this; if (!t) { if (!this[0]) return; var r = {}; return E(this[0].attributes, function (t, e) { (t = e.name.match(qa)) && (r[t[1]] = n.data(t[1])) }), r } if (z(t)) return void 0 === e ? this[0] && pa(this[0], t) : this.each(function (n, r) { n = e; try { n = JSON.stringify(n) } catch (t) { } r.dataset ? r.dataset[D(t)] = n : r.setAttribute("data-" + t, n) }); for (var i in t) this.data(i, t[i]); return this }, E(["Width", "Height"], function (t, e) { y.prototype["inner" + e] = function () { if (this[0]) return I(this[0]) ? g["inner" + e] : this[0]["client" + e] } }), E(["width", "height"], function (t, e) { y.prototype[e] = function (n) { if (!this[0]) return void 0 === n ? void 0 : this; if (!arguments.length) return I(this[0]) ? this[0][D("outer-" + e)] : this[0].getBoundingClientRect()[e] - ra(this[0], !t); var r = parseInt(n, 10); return this.each(function (n, i) { i && 1 === i.nodeType && (n = P(i, "boxSizing"), i.style[e] = oa(e, r + ("border-box" === n ? ra(i, !t) : 0))) }) } }), E(["Width", "Height"], function (t, e) { y.prototype["outer" + e] = function (n) { if (this[0]) return I(this[0]) ? g["outer" + e] : this[0]["offset" + e] + (n ? Q(this[0], "margin" + (t ? "Top" : "Left")) + Q(this[0], "margin" + (t ? "Bottom" : "Right")) : 0) } }); var T = {}; function sa(t, e) { return !e || !v.call(e, function (e) { return 0 > t.indexOf(e) }) } y.prototype.toggle = function (t) { return this.each(function (n, r) { if (void 0 !== t ? t : "none" === P(r, "display")) { if (r.style.display = "", "none" === P(r, "display")) { if (n = r.style, r = r.tagName, T[r]) r = T[r]; else { var i = e.createElement(r); e.body.appendChild(i); var o = P(i, "display"); e.body.removeChild(i), r = T[r] = "none" !== o ? o : "block" } n.display = r } } else r.style.display = "none" }) }, y.prototype.hide = function () { return this.toggle(!1) }, y.prototype.show = function () { return this.toggle(!0) }; var U = { focus: "focusin", blur: "focusout" }, ta = { mouseenter: "mouseover", mouseleave: "mouseout" }, ua = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; function va(t, e, n, r, i) { i.guid = i.guid || C.guid++; var o = t.__cashEvents = t.__cashEvents || {}; o[e] = o[e] || [], o[e].push([n, r, i]), t.addEventListener(e, i) } function V(t) { return [(t = t.split("."))[0], t.slice(1).sort()] } function W(t, e, n, r, i) { var o = t.__cashEvents = t.__cashEvents || {}; if (e) o[e] && (o[e] = o[e].filter(function (o) { var a = o[0], u = o[1]; if (o = o[2], i && o.guid !== i.guid || !sa(a, n) || r && r !== u) return !0; t.removeEventListener(e, o) })); else { for (e in o) W(t, e, n, r, i); delete t.__cashEvents } } function wa(t) { return t.multiple ? H(m.call(t.options, function (t) { return t.selected && !t.disabled && !t.parentNode.disabled }), "value") : t.value || "" } y.prototype.off = function (t, e, n) { var r = this; return void 0 === t ? this.each(function (t, e) { return W(e) }) : (B(e) && (n = e, e = ""), E(N(t), function (t, i) { var o = (t = V(ta[i] || U[i] || i))[0], a = t[1]; r.each(function (t, r) { return W(r, o, a, e, n) }) })), this }, y.prototype.on = function (t, e, n, r) { var i = this; if (!z(t)) { for (var o in t) this.on(o, e, t[o]); return this } return B(e) && (n = e, e = ""), E(N(t), function (t, o) { var a = (t = V(ta[o] || U[o] || o))[0], u = t[1]; i.each(function (t, i) { (t = function t(o) { if (!o.namespace || sa(u, o.namespace.split("."))) { var s = i; if (e) { for (var c = o.target; !G(c, e);) { if (c === i) return; if (!(c = c.parentNode)) return } s = c, o.__delegate = !0 } o.__delegate && Object.defineProperty(o, "currentTarget", { configurable: !0, get: function () { return s } }), c = n.call(s, o, o.data), r && W(i, a, u, e, t), !1 === c && (o.preventDefault(), o.stopPropagation()) } }).guid = n.guid = n.guid || C.guid++ , va(i, a, u, e, t) }) }), this }, y.prototype.one = function (t, e, n) { return this.on(t, e, n, !0) }, y.prototype.ready = function (t) { function n() { return t(C) } return "loading" !== e.readyState ? setTimeout(n) : e.addEventListener("DOMContentLoaded", n), this }, y.prototype.trigger = function (t, n) { if (z(t)) { var r = V(t); t = r[0], r = r[1]; var i = ua.test(t) ? "MouseEvents" : "HTMLEvents", o = e.createEvent(i); o.initEvent(t, !0, !0), o.namespace = r.join(".") } else o = t; o.data = n; var a = o.type in U; return this.each(function (t, e) { a && B(e[o.type]) ? e[o.type]() : e.dispatchEvent(o) }) }; var xa = /%20/g, Aa = /file|reset|submit|button|image/i, Ba = /radio|checkbox/i; y.prototype.serialize = function () { var t = ""; return this.each(function (e, n) { E(n.elements || [n], function (e, n) { n.disabled || !n.name || "FIELDSET" === n.tagName || Aa.test(n.type) || Ba.test(n.type) && !n.checked || void 0 !== (e = wa(n)) && E(e = K(e) ? e : [e], function (e, r) { e = t, r = "&" + encodeURIComponent(n.name) + "=" + encodeURIComponent(r).replace(xa, "+"), t = e + r }) }) }), t.substr(1) }, y.prototype.val = function (t) { return void 0 === t ? this[0] && wa(this[0]) : this.each(function (e, n) { if ("SELECT" === n.tagName) { var r = K(t) ? t : null === t ? [] : [t]; E(n.options, function (t, e) { e.selected = 0 <= r.indexOf(e.value) }) } else n.value = null === t ? "" : t }) }, y.prototype.clone = function () { return this.map(function (t, e) { return e.cloneNode(!0) }) }, y.prototype.detach = function () { return this.each(function (t, e) { e.parentNode && e.parentNode.removeChild(e) }) }; var Ca = /^\s*<(\w+)[^>]*>/, Da = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/, X; function A(t) { if (!X) { var n = e.createElement("table"), r = e.createElement("tr"); X = { "*": k, tr: e.createElement("tbody"), td: r, th: r, thead: n, tbody: n, tfoot: n } } return z(t) ? Da.test(t) ? [e.createElement(RegExp.$1)] : (n = Ca.test(t) && RegExp.$1, (n = X[n] || X["*"]).innerHTML = t, C(n.childNodes).detach().get()) : [] } C.parseHTML = A, y.prototype.empty = function () { return this.each(function (t, e) { for (; e.firstChild;)e.removeChild(e.firstChild) }) }, y.prototype.html = function (t) { return void 0 === t ? this[0] && this[0].innerHTML : this.each(function (e, n) { n.innerHTML = t }) }, y.prototype.remove = function () { return this.detach().off() }, y.prototype.text = function (t) { return void 0 === t ? this[0] ? this[0].textContent : "" : this.each(function (e, n) { n.textContent = t }) }, y.prototype.unwrap = function () { return this.parent().each(function (t, e) { (t = C(e)).replaceWith(t.children()) }), this }; var Ea = e.documentElement; y.prototype.offset = function () { var t = this[0]; if (t) return { top: (t = t.getBoundingClientRect()).top + g.pageYOffset - Ea.clientTop, left: t.left + g.pageXOffset - Ea.clientLeft } }, y.prototype.offsetParent = function () { return C(this[0] && this[0].offsetParent) }, y.prototype.position = function () { var t = this[0]; if (t) return { left: t.offsetLeft, top: t.offsetTop } }, y.prototype.children = function (t) { var e = []; return this.each(function (t, n) { q.apply(e, n.children) }), M(C(O(e)), t) }, y.prototype.contents = function () { var t = []; return this.each(function (e, n) { q.apply(t, "IFRAME" === n.tagName ? [n.contentDocument] : n.childNodes) }), C(O(t)) }, y.prototype.find = function (t) { for (var e = [], n = 0, r = this.length; n < r; n++) { var i = x(t, this[n]); i.length && q.apply(e, i) } return C(O(e)) }; var Fa = /^$|^module$|\/(?:java|ecma)script/i, Ga = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; function Y(a) { a = C(a), a.filter("script").add(a.find("script")).each(function (a, c) { !c.src && Fa.test(c.type) && c.ownerDocument.documentElement.contains(c) && eval(c.textContent.replace(Ga, "")) }) } function Z(t, e, n) { E(t, function (t, r) { E(e, function (e, i) { e = t ? i.cloneNode(!0) : i, n ? r.insertBefore(e, n && r.firstChild) : r.appendChild(e), Y(e) }) }) } y.prototype.append = function () { var t = this; return E(arguments, function (e, n) { Z(t, C(n)) }), this }, y.prototype.appendTo = function (t) { return Z(C(t), this), this }, y.prototype.insertAfter = function (t) { var e = this; return C(t).each(function (t, n) { var r = n.parentNode; r && e.each(function (e, i) { e = t ? i.cloneNode(!0) : i, r.insertBefore(e, n.nextSibling), Y(e) }) }), this }, y.prototype.after = function () { var t = this; return E(r.apply(arguments), function (e, n) { r.apply(C(n).slice()).insertAfter(t) }), this }, y.prototype.insertBefore = function (t) { var e = this; return C(t).each(function (t, n) { var r = n.parentNode; r && e.each(function (e, i) { e = t ? i.cloneNode(!0) : i, r.insertBefore(e, n), Y(e) }) }), this }, y.prototype.before = function () { var t = this; return E(arguments, function (e, n) { C(n).insertBefore(t) }), this }, y.prototype.prepend = function () { var t = this; return E(arguments, function (e, n) { Z(t, C(n), !0) }), this }, y.prototype.prependTo = function (t) { return Z(C(t), r.apply(this.slice()), !0), this }, y.prototype.replaceWith = function (t) { return this.before(t).remove() }, y.prototype.replaceAll = function (t) { return C(t).replaceWith(this), this }, y.prototype.wrapAll = function (t) { if (this[0]) { for (t = C(t), this.first().before(t), t = t[0]; t.children.length;)t = t.firstElementChild; this.appendTo(t) } return this }, y.prototype.wrap = function (t) { return this.each(function (e, n) { var r = C(t)[0]; C(n).wrapAll(e ? r.cloneNode(!0) : r) }) }, y.prototype.wrapInner = function (t) { return this.each(function (e, n) { (n = (e = C(n)).contents()).length ? n.wrapAll(t) : e.append(t) }) }, y.prototype.has = function (t) { var e = z(t) ? function (e, n) { return !!x(t, n).length } : function (e, n) { return n.contains(t) }; return this.filter(e) }, y.prototype.is = function (t) { if (!t || !this[0]) return !1; var e = L(t), n = !1; return this.each(function (t, r) { return !(n = e.call(r, t, r)) }), n }, y.prototype.next = function (t, e) { return M(C(O(H(this, "nextElementSibling", e))), t) }, y.prototype.nextAll = function (t) { return this.next(t, !0) }, y.prototype.not = function (t) { if (!t || !this[0]) return this; var e = L(t); return this.filter(function (t, n) { return !e.call(n, t, n) }) }, y.prototype.parent = function (t) { return M(C(O(H(this, "parentNode"))), t) }, y.prototype.index = function (t) { var e = t ? C(t)[0] : this[0]; return t = t ? this : C(e).parent().children(), n.call(t, e) }, y.prototype.closest = function (t) { if (!t || !this[0]) return C(); var e = this.filter(t); return e.length ? e : this.parent().closest(t) }, y.prototype.parents = function (t) { return M(C(O(H(this, "parentElement", !0))), t) }, y.prototype.prev = function (t, e) { return M(C(O(H(this, "previousElementSibling", e))), t) }, y.prototype.prevAll = function (t) { return this.prev(t, !0) }, y.prototype.siblings = function (t) { var e = []; return this.each(function (t, n) { q.apply(e, C(n).parent().children(function (t, e) { return e !== n })) }), M(C(O(e)), t) }, "undefined" != typeof exports ? module.exports = C : g.cash = g.$ = C }();


const TOAST_TIMER = 2000;

/**
 * Copy the contents of the output element
 * @param {string} message
 * @return {void}
 */
function showToast(message) {
	var toast = document.getElementById("js-toast");
	var toastText = toast.firstElementChild.firstElementChild;
	toastText.innerText = message;
	toast.classList.add("show");
	setTimeout(function() {
		toast.classList.remove("show");
	}, TOAST_TIMER);
	return;
}

MAX_FILE_SIZE = 1024 * 1024;

/**
 * Open the system file selector and upload a stream of chars with a filename
for each file
 * @param {blob[]} files
 * @param {string[]} targets
 * @return {string[]} fileNames
 */
function upload(files, targets) { // eslint-disable-line no-unused-vars
	output = [];
	for (let index = 0, file; file = files[index]; index++) {
		const reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function(event) {
			const fileContents = event.target.result;
			if (fileContents.length < MAX_FILE_SIZE) {
				document.getElementById(targets[index]).value = fileContents;
			} else {
				showToast("File must be smaller than 1MB");
			}
		};
		output.push(file.name);
	}
	return output;
}


/**
 * Download a stream of chars and set a filename
 * @param {string} filename
 * @param {string} chars
 * @return {void} none
 */
function download(filename, chars) { // eslint-disable-line no-unused-vars
	if (filename.length > 0 && chars.length > 0) {
		const blob = new Blob([chars], {type: "application/octet-stream"});
		const blobURL = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.download = filename;
		link.href = blobURL;
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		showToast("Give the file a name and some content");
	}
	return;
}

/**
 * Copy the contents of the output element
 * @return {void}
 */
function copy() { // eslint-disable-line no-unused-vars
	var stringToCopy = document.getElementById("output").value;
	copyToClipboard(stringToCopy);
	window.getSelection().removeAllRanges();
	return;
}

/**
 * @param {string} stringToCopy
 * @return {void}
 */
async function copyToClipboard(stringToCopy) {
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(stringToCopy);
			showToast("Successfully Copied");
		} catch (err) {
			showToast("Failed to Copy");
		}
	}
	return;
}
