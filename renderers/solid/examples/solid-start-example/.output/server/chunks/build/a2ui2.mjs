import { ssr, ssrHydrationKey, escape, createComponent, ssrStyleProperty, ssrAttribute, ssrStyle } from 'solid-js/web';
import { onMount, onCleanup, createContext, createMemo, Show, createSignal, batch, useContext, Switch, Match, For } from 'solid-js';
import { k } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'seroval';
import 'seroval-plugins/web';
import 'solid-js/web/storage';
import 'nats';

var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _e2, _t2, ___instances, r_fn, n_fn;
const Ve = { bubbles: true, cancelable: true, composed: true };
const _we = class _we extends CustomEvent {
  constructor(t) {
    super(_we.eventName, { detail: t, ...Ve }), this.payload = t;
  }
};
_we.eventName = "a2uiaction";
const We = `
  &:not([disabled]) {
    cursor: pointer;
    opacity: var(--opacity, 0);
    transition: opacity var(--speed, 0.2s) cubic-bezier(0, 0, 0.3, 1);

    &:hover,
    &:focus {
      opacity: 1;
    }
  }`;
`${new Array(21).fill(0).map((e, t) => `.behavior-ho-${t * 5} {
          --opacity: ${t / 20};
          ${We}
        }`).join(`
`)}`;
const b = 4;
`${new Array(25).fill(0).map((e, t) => `
        .border-bw-${t} { border-width: ${t}px; }
        .border-btw-${t} { border-top-width: ${t}px; }
        .border-bbw-${t} { border-bottom-width: ${t}px; }
        .border-blw-${t} { border-left-width: ${t}px; }
        .border-brw-${t} { border-right-width: ${t}px; }

        .border-ow-${t} { outline-width: ${t}px; }
        .border-br-${t} { border-radius: ${t * b}px; overflow: hidden;}`).join(`
`)}`;
const ve = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
function S(e) {
  return e.startsWith("nv") ? `--nv-${e.slice(2)}` : `--${e[0]}-${e.slice(1)}`;
}
const j = (e) => `
    ${e.map((t) => {
  const r = Z(t);
  return `.color-bc-${t} { border-color: light-dark(var(${S(t)}), var(${S(r)})); }`;
}).join(`
`)}

    ${e.map((t) => {
  const r = Z(t), n = [`.color-bgc-${t} { background-color: light-dark(var(${S(t)}), var(${S(r)})); }`, `.color-bbgc-${t}::backdrop { background-color: light-dark(var(${S(t)}), var(${S(r)})); }`];
  for (let o = 0.1; o < 1; o += 0.1) n.push(`.color-bbgc-${t}_${(o * 100).toFixed(0)}::backdrop {
            background-color: light-dark(oklch(from var(${S(t)}) l c h / calc(alpha * ${o.toFixed(1)})), oklch(from var(${S(r)}) l c h / calc(alpha * ${o.toFixed(1)})) );
          }
        `);
  return n.join(`
`);
}).join(`
`)}

  ${e.map((t) => {
  const r = Z(t);
  return `.color-c-${t} { color: light-dark(var(${S(t)}), var(${S(r)})); }`;
}).join(`
`)}
  `, Z = (e) => {
  const t = e.match(/^([a-z]+)(\d+)$/);
  if (!t) return e;
  const [, r, n] = t, i = 100 - parseInt(n, 10), l = ve.reduce((s, d) => Math.abs(d - i) < Math.abs(s - i) ? d : s);
  return `${r}${l}`;
}, O = (e) => ve.map((t) => `${e}${t}`);
j(O("p")), j(O("s")), j(O("t")), j(O("n")), j(O("nv")), j(O("e"));
`${new Array(16).fill(0).map((e, t) => `--g-${t + 1}: ${(t + 1) * b}px;`).join(`
`)}${new Array(49).fill(0).map((e, t) => {
  const r = t - 24, n = r < 0 ? `n${Math.abs(r)}` : r.toString();
  return `
        .layout-p-${n} { --padding: ${r * b}px; padding: var(--padding); }
        .layout-pt-${n} { padding-top: ${r * b}px; }
        .layout-pr-${n} { padding-right: ${r * b}px; }
        .layout-pb-${n} { padding-bottom: ${r * b}px; }
        .layout-pl-${n} { padding-left: ${r * b}px; }

        .layout-m-${n} { --margin: ${r * b}px; margin: var(--margin); }
        .layout-mt-${n} { margin-top: ${r * b}px; }
        .layout-mr-${n} { margin-right: ${r * b}px; }
        .layout-mb-${n} { margin-bottom: ${r * b}px; }
        .layout-ml-${n} { margin-left: ${r * b}px; }

        .layout-t-${n} { top: ${r * b}px; }
        .layout-r-${n} { right: ${r * b}px; }
        .layout-b-${n} { bottom: ${r * b}px; }
        .layout-l-${n} { left: ${r * b}px; }`;
}).join(`
`)}${new Array(25).fill(0).map((e, t) => `
        .layout-g-${t} { gap: ${t * b}px; }`).join(`
`)}${new Array(8).fill(0).map((e, t) => `
        .layout-grd-col${t + 1} { grid-template-columns: ${"1fr ".repeat(t + 1).trim()}; }`).join(`
`)}${new Array(10).fill(0).map((e, t) => {
  const r = (t + 1) * 10;
  return `.layout-w-${r} { width: ${r}%; max-width: ${r}%; }`;
}).join(`
`)}${new Array(16).fill(0).map((e, t) => {
  const r = t * b;
  return `.layout-wp-${t} { width: ${r}px; }`;
}).join(`
`)}${new Array(10).fill(0).map((e, t) => {
  const r = (t + 1) * 10;
  return `.layout-h-${r} { height: ${r}%; }`;
}).join(`
`)}${new Array(16).fill(0).map((e, t) => {
  const r = t * b;
  return `.layout-hp-${t} { height: ${r}px; }`;
}).join(`
`)}`;
`${new Array(21).fill(0).map((e, t) => `.opacity-el-${t * 5} { opacity: ${t / 20}; }`).join(`
`)}`;
`${new Array(9).fill(0).map((e, t) => {
  const r = (t + 1) * 100;
  return `.typography-w-${r} { font-weight: ${r}; }`;
}).join(`
`)}`;
function Ue(e, t) {
  return e === "path" && typeof t == "string";
}
function f(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Le(e) {
  return f(e) ? "explicitList" in e || "template" in e : false;
}
function R(e) {
  return f(e) && ("path" in e || "literal" in e && typeof e.literal == "string" || "literalString" in e);
}
function Fe(e) {
  return f(e) && ("path" in e || "literal" in e && typeof e.literal == "number" || "literalNumber" in e);
}
function ke(e) {
  return f(e) && ("path" in e || "literal" in e && typeof e.literal == "boolean" || "literalBoolean" in e);
}
function E(e) {
  return !(!f(e) || !("id" in e && "type" in e && "properties" in e));
}
function Be(e) {
  return f(e) && "url" in e && R(e.url);
}
function Ke(e) {
  return f(e) && "child" in e && E(e.child) && "action" in e;
}
function qe(e) {
  return f(e) ? "child" in e ? E(e.child) : "children" in e ? Array.isArray(e.children) && e.children.every(E) : false : false;
}
function Ge(e) {
  return f(e) && "label" in e && R(e.label) && "value" in e && ke(e.value);
}
function He(e) {
  return f(e) && "children" in e && Array.isArray(e.children) && e.children.every(E);
}
function Je(e) {
  return f(e) && "value" in e && R(e.value);
}
function Ye(e) {
  return f(e);
}
function Qe(e) {
  return f(e) && "url" in e && R(e.url);
}
function Xe(e) {
  return f(e) && "name" in e && R(e.name);
}
function Ze(e) {
  return f(e) && "children" in e && Array.isArray(e.children) && e.children.every(E);
}
function et(e) {
  return f(e) && "entryPointChild" in e && E(e.entryPointChild) && "contentChild" in e && E(e.contentChild);
}
function tt(e) {
  return f(e) && "selections" in e;
}
function rt(e) {
  return f(e) && "children" in e && Array.isArray(e.children) && e.children.every(E);
}
function nt(e) {
  return f(e) && "value" in e && Fe(e.value);
}
function ot(e) {
  return f(e) && "title" in e && R(e.title) && "child" in e && E(e.child);
}
function it(e) {
  return f(e) && "tabItems" in e && Array.isArray(e.tabItems) && e.tabItems.every(ot);
}
function st(e) {
  return f(e) && "text" in e && R(e.text);
}
function at(e) {
  return f(e) && "label" in e && R(e.label);
}
function lt(e) {
  return f(e) && "url" in e && R(e.url);
}
const _q = class _q {
  constructor(t = { mapCtor: Map, arrayCtor: Array, setCtor: Set, objCtor: Object }) {
    this.opts = t, this.mapCtor = Map, this.arrayCtor = Array, this.setCtor = Set, this.objCtor = Object, this.arrayCtor = t.arrayCtor, this.mapCtor = t.mapCtor, this.setCtor = t.setCtor, this.objCtor = t.objCtor, this.surfaces = new t.mapCtor();
  }
  getSurfaces() {
    return this.surfaces;
  }
  clearSurfaces() {
    this.surfaces.clear();
  }
  processMessages(t) {
    for (const r of t) r.beginRendering && this.handleBeginRendering(r.beginRendering, r.beginRendering.surfaceId), r.surfaceUpdate && this.handleSurfaceUpdate(r.surfaceUpdate, r.surfaceUpdate.surfaceId), r.dataModelUpdate && this.handleDataModelUpdate(r.dataModelUpdate, r.dataModelUpdate.surfaceId), r.deleteSurface && this.handleDeleteSurface(r.deleteSurface);
  }
  getData(t, r, n = _q.DEFAULT_SURFACE_ID) {
    var _a;
    const o = this.getOrCreateSurface(n);
    if (!o) return null;
    let i;
    return r === "." || r === "" ? i = (_a = t.dataContextPath) != null ? _a : "/" : i = this.resolvePath(r, t.dataContextPath), this.getDataByPath(o.dataModel, i);
  }
  setData(t, r, n, o = _q.DEFAULT_SURFACE_ID) {
    var _a;
    if (!t) {
      console.warn("No component node set");
      return;
    }
    const i = this.getOrCreateSurface(o);
    if (!i) return;
    let l;
    r === "." || r === "" ? l = (_a = t.dataContextPath) != null ? _a : "/" : l = this.resolvePath(r, t.dataContextPath), this.setDataByPath(i.dataModel, l, n);
  }
  resolvePath(t, r) {
    return t.startsWith("/") ? t : r && r !== "/" ? r.endsWith("/") ? `${r}${t}` : `${r}/${t}` : `/${t}`;
  }
  parseIfJsonString(t) {
    if (typeof t != "string") return t;
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}") || r.startsWith("[") && r.endsWith("]")) try {
      return JSON.parse(t);
    } catch (n) {
      return console.warn(`Failed to parse potential JSON string: "${t.substring(0, 50)}..."`, n), t;
    }
    return t;
  }
  convertKeyValueArrayToMap(t) {
    const r = new this.mapCtor();
    for (const n of t) {
      if (!f(n) || !("key" in n)) continue;
      const o = n.key, i = this.findValueKey(n);
      if (!i) continue;
      let l = n[i];
      i === "valueMap" && Array.isArray(l) ? l = this.convertKeyValueArrayToMap(l) : typeof l == "string" && (l = this.parseIfJsonString(l)), this.setDataByPath(r, o, l);
    }
    return r;
  }
  setDataByPath(t, r, n) {
    if (Array.isArray(n) && (n.length === 0 || f(n[0]) && "key" in n[0])) if (n.length === 1 && f(n[0]) && n[0].key === ".") {
      const d = n[0], c = this.findValueKey(d);
      c ? (n = d[c], c === "valueMap" && Array.isArray(n) ? n = this.convertKeyValueArrayToMap(n) : typeof n == "string" && (n = this.parseIfJsonString(n))) : n = this.convertKeyValueArrayToMap(n);
    } else n = this.convertKeyValueArrayToMap(n);
    const o = this.normalizePath(r).split("/").filter((d) => d);
    if (o.length === 0) {
      if (n instanceof Map || f(n)) {
        !(n instanceof Map) && f(n) && (n = new this.mapCtor(Object.entries(n))), t.clear();
        for (const [d, c] of n.entries()) t.set(d, c);
      } else console.error("Cannot set root of DataModel to a non-Map value.");
      return;
    }
    let i = t;
    for (let d = 0; d < o.length - 1; d++) {
      const c = o[d];
      let u;
      i instanceof Map ? u = i.get(c) : Array.isArray(i) && /^\d+$/.test(c) && (u = i[parseInt(c, 10)]), (u === void 0 || typeof u != "object" || u === null) && (u = new this.mapCtor(), i instanceof this.mapCtor ? i.set(c, u) : Array.isArray(i) && (i[parseInt(c, 10)] = u)), i = u;
    }
    const l = o[o.length - 1], s = n;
    i instanceof this.mapCtor ? i.set(l, s) : Array.isArray(i) && /^\d+$/.test(l) && (i[parseInt(l, 10)] = s);
  }
  normalizePath(t) {
    return "/" + t.replace(/\[(\d+)\]/g, ".$1").split(".").filter((o) => o.length > 0).join("/");
  }
  getDataByPath(t, r) {
    const n = this.normalizePath(r).split("/").filter((i) => i);
    let o = t;
    for (const i of n) {
      if (o == null) return null;
      if (o instanceof Map) o = o.get(i);
      else if (Array.isArray(o) && /^\d+$/.test(i)) o = o[parseInt(i, 10)];
      else if (f(o)) o = o[i];
      else return null;
    }
    return o;
  }
  getOrCreateSurface(t) {
    let r = this.surfaces.get(t);
    return r || (r = new this.objCtor({ rootComponentId: null, componentTree: null, dataModel: new this.mapCtor(), components: new this.mapCtor(), styles: new this.objCtor() }), this.surfaces.set(t, r)), r;
  }
  handleBeginRendering(t, r) {
    var _a;
    const n = this.getOrCreateSurface(r);
    n.rootComponentId = t.root, n.styles = (_a = t.styles) != null ? _a : {}, this.rebuildComponentTree(n);
  }
  handleSurfaceUpdate(t, r) {
    const n = this.getOrCreateSurface(r);
    for (const o of t.components) n.components.set(o.id, o);
    this.rebuildComponentTree(n);
  }
  handleDataModelUpdate(t, r) {
    var _a;
    const n = this.getOrCreateSurface(r), o = (_a = t.path) != null ? _a : "/";
    this.setDataByPath(n.dataModel, o, t.contents), this.rebuildComponentTree(n);
  }
  handleDeleteSurface(t) {
    this.surfaces.delete(t.surfaceId);
  }
  rebuildComponentTree(t) {
    if (!t.rootComponentId) {
      t.componentTree = null;
      return;
    }
    const r = new this.setCtor();
    t.componentTree = this.buildNodeRecursive(t.rootComponentId, t, r, "/", "");
  }
  findValueKey(t) {
    return Object.keys(t).find((r) => r.startsWith("value"));
  }
  buildNodeRecursive(t, r, n, o, i = "") {
    var _a, _b;
    const l = `${t}${i}`, { components: s } = r;
    if (!s.has(t)) return null;
    if (n.has(l)) throw new Error(`Circular dependency for component "${l}".`);
    n.add(l);
    const d = s.get(t), c = (_a = d.component) != null ? _a : {}, u = Object.keys(c)[0], m = c[u], a = new this.objCtor();
    if (f(m)) for (const [V, W] of Object.entries(m)) a[V] = this.resolvePropertyValue(W, r, n, o, i);
    n.delete(l);
    const w = { id: l, dataContextPath: o, weight: (_b = d.weight) != null ? _b : "initial" };
    switch (u) {
      case "Text":
        if (!st(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Text", properties: a });
      case "Image":
        if (!Qe(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Image", properties: a });
      case "Icon":
        if (!Xe(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Icon", properties: a });
      case "Video":
        if (!lt(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Video", properties: a });
      case "AudioPlayer":
        if (!Be(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "AudioPlayer", properties: a });
      case "Row":
        if (!rt(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Row", properties: a });
      case "Column":
        if (!He(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Column", properties: a });
      case "List":
        if (!Ze(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "List", properties: a });
      case "Card":
        if (!qe(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Card", properties: a });
      case "Tabs":
        if (!it(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Tabs", properties: a });
      case "Divider":
        if (!Ye(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Divider", properties: a });
      case "Modal":
        if (!et(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Modal", properties: a });
      case "Button":
        if (!Ke(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Button", properties: a });
      case "CheckBox":
        if (!Ge(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "CheckBox", properties: a });
      case "TextField":
        if (!at(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "TextField", properties: a });
      case "DateTimeInput":
        if (!Je(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "DateTimeInput", properties: a });
      case "MultipleChoice":
        if (!tt(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "MultipleChoice", properties: a });
      case "Slider":
        if (!nt(a)) throw new Error(`Invalid data; expected ${u}`);
        return new this.objCtor({ ...w, type: "Slider", properties: a });
      default:
        return new this.objCtor({ ...w, type: u, properties: a });
    }
  }
  resolvePropertyValue(t, r, n, o, i = "") {
    if (typeof t == "string" && r.components.has(t)) return this.buildNodeRecursive(t, r, n, o, i);
    if (Le(t)) {
      if (t.explicitList) return t.explicitList.map((l) => this.buildNodeRecursive(l, r, n, o, i));
      if (t.template) {
        const l = this.resolvePath(t.template.dataBinding, o), s = this.getDataByPath(r.dataModel, l), d = t.template;
        if (Array.isArray(s)) return s.map((u, m) => {
          const V = `:${[...o.split("/").filter((X) => /^\d+$/.test(X)), m].join(":")}`, W = `${l}/${m}`;
          return this.buildNodeRecursive(d.componentId, r, n, W, V);
        });
        const c = this.mapCtor;
        return s instanceof c ? Array.from(s.keys(), (u) => {
          const m = `:${u}`, a = `${l}/${u}`;
          return this.buildNodeRecursive(d.componentId, r, n, a, m);
        }) : new this.arrayCtor();
      }
    }
    if (Array.isArray(t)) return t.map((l) => this.resolvePropertyValue(l, r, n, o, i));
    if (f(t)) {
      const l = new this.objCtor();
      for (const [s, d] of Object.entries(t)) {
        let c = d;
        if (Ue(s, d) && o !== "/") {
          c = d.replace(/^\.?\/item/, "").replace(/^\.?\/text/, "").replace(/^\.?\/label/, "").replace(/^\.?\//, ""), l[s] = c;
          continue;
        }
        l[s] = this.resolvePropertyValue(c, r, n, o, i);
      }
      return l;
    }
    return t;
  }
};
_q.DEFAULT_SURFACE_ID = "@default";
let q = _q;
var ct = Object.defineProperty, ut = (e, t, r) => t in e ? ct(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, ee = (e, t, r) => (ut(e, typeof t != "symbol" ? t + "" : t, r), r), dt = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
}, te = (e, t) => {
  if (Object(t) !== t) throw TypeError('Cannot use the "in" operator on this value');
  return e.has(t);
}, B = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, he = (e, t, r) => (dt(e, t, "access private method"), r);
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function be(e, t) {
  return Object.is(e, t);
}
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
let v = null, U = false, K = 1;
const G = /* @__PURE__ */ Symbol("SIGNAL");
function M(e) {
  const t = v;
  return v = e, t;
}
function ht() {
  return v;
}
function ft() {
  return U;
}
const le = { version: 0, lastCleanEpoch: 0, dirty: false, producerNode: void 0, producerLastReadVersion: void 0, producerIndexOfThis: void 0, nextProducerIndex: 0, liveConsumerNode: void 0, liveConsumerIndexOfThis: void 0, consumerAllowSignalWrites: false, consumerIsAlwaysLive: false, producerMustRecompute: () => false, producerRecomputeValue: () => {
}, consumerMarkedDirty: () => {
}, consumerOnSignalRead: () => {
} };
function J(e) {
  if (U) throw new Error(typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : "");
  if (v === null) return;
  v.consumerOnSignalRead(e);
  const t = v.nextProducerIndex++;
  if (D(v), t < v.producerNode.length && v.producerNode[t] !== e && oe(v)) {
    const r = v.producerNode[t];
    Y(r, v.producerIndexOfThis[t]);
  }
  v.producerNode[t] !== e && (v.producerNode[t] = e, v.producerIndexOfThis[t] = oe(v) ? xe(e, v, t) : 0), v.producerLastReadVersion[t] = e.version;
}
function pt() {
  K++;
}
function Ce(e) {
  if (!(!e.dirty && e.lastCleanEpoch === K)) {
    if (!e.producerMustRecompute(e) && !vt(e)) {
      e.dirty = false, e.lastCleanEpoch = K;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = false, e.lastCleanEpoch = K;
  }
}
function $e(e) {
  if (e.liveConsumerNode === void 0) return;
  const t = U;
  U = true;
  try {
    for (const r of e.liveConsumerNode) r.dirty || gt(r);
  } finally {
    U = t;
  }
}
function yt() {
  return (v == null ? void 0 : v.consumerAllowSignalWrites) !== false;
}
function gt(e) {
  var _a;
  var t;
  e.dirty = true, $e(e), (t = e.consumerMarkedDirty) == null || t.call((_a = e.wrapper) != null ? _a : e);
}
function mt(e) {
  return e && (e.nextProducerIndex = 0), M(e);
}
function wt(e, t) {
  if (M(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (oe(e)) for (let r = e.nextProducerIndex; r < e.producerNode.length; r++) Y(e.producerNode[r], e.producerIndexOfThis[r]);
    for (; e.producerNode.length > e.nextProducerIndex; ) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function vt(e) {
  D(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    const r = e.producerNode[t], n = e.producerLastReadVersion[t];
    if (n !== r.version || (Ce(r), n !== r.version)) return true;
  }
  return false;
}
function xe(e, t, r) {
  var n;
  if (ce(e), D(e), e.liveConsumerNode.length === 0) {
    (n = e.watched) == null || n.call(e.wrapper);
    for (let o = 0; o < e.producerNode.length; o++) e.producerIndexOfThis[o] = xe(e.producerNode[o], e, o);
  }
  return e.liveConsumerIndexOfThis.push(r), e.liveConsumerNode.push(t) - 1;
}
function Y(e, t) {
  var r;
  if (ce(e), D(e), typeof ngDevMode < "u" && ngDevMode && t >= e.liveConsumerNode.length) throw new Error(`Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`);
  if (e.liveConsumerNode.length === 1) {
    (r = e.unwatched) == null || r.call(e.wrapper);
    for (let o = 0; o < e.producerNode.length; o++) Y(e.producerNode[o], e.producerIndexOfThis[o]);
  }
  const n = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    const o = e.liveConsumerIndexOfThis[t], i = e.liveConsumerNode[t];
    D(i), i.producerIndexOfThis[o] = t;
  }
}
function oe(e) {
  var _a;
  var t;
  return e.consumerIsAlwaysLive || ((_a = (t = e == null ? void 0 : e.liveConsumerNode) == null ? void 0 : t.length) != null ? _a : 0) > 0;
}
function D(e) {
  var _a, _b, _c;
  (_a = e.producerNode) != null ? _a : e.producerNode = [], (_b = e.producerIndexOfThis) != null ? _b : e.producerIndexOfThis = [], (_c = e.producerLastReadVersion) != null ? _c : e.producerLastReadVersion = [];
}
function ce(e) {
  var _a, _b;
  (_a = e.liveConsumerNode) != null ? _a : e.liveConsumerNode = [], (_b = e.liveConsumerIndexOfThis) != null ? _b : e.liveConsumerIndexOfThis = [];
}
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function Ie(e) {
  if (Ce(e), J(e), e.value === ie) throw e.error;
  return e.value;
}
function bt(e) {
  const t = Object.create(Ct);
  t.computation = e;
  const r = () => Ie(t);
  return r[G] = t, r;
}
const re = /* @__PURE__ */ Symbol("UNSET"), ne = /* @__PURE__ */ Symbol("COMPUTING"), ie = /* @__PURE__ */ Symbol("ERRORED"), Ct = { ...le, value: re, dirty: true, error: null, equal: be, producerMustRecompute(e) {
  return e.value === re || e.value === ne;
}, producerRecomputeValue(e) {
  if (e.value === ne) throw new Error("Detected cycle in computations.");
  const t = e.value;
  e.value = ne;
  const r = mt(e);
  let n, o = false;
  try {
    n = e.computation.call(e.wrapper), o = t !== re && t !== ie && e.equal.call(e.wrapper, t, n);
  } catch (i) {
    n = ie, e.error = i;
  } finally {
    wt(e, r);
  }
  if (o) {
    e.value = t;
    return;
  }
  e.value = n, e.version++;
} };
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function $t() {
  throw new Error();
}
let xt = $t;
function It() {
  xt();
}
/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
function St(e) {
  const t = Object.create(Nt);
  t.value = e;
  const r = () => (J(t), t.value);
  return r[G] = t, r;
}
function At() {
  return J(this), this.value;
}
function Tt(e, t) {
  yt() || It(), e.equal.call(e.wrapper, e.value, t) || (e.value = t, Et(e));
}
const Nt = { ...le, equal: be, value: void 0 };
function Et(e) {
  e.version++, pt(), $e(e);
}
/**
* @license
* Copyright 2024 Bloomberg Finance L.P.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const C = /* @__PURE__ */ Symbol("node");
var se;
((e) => {
  var t, r, n, o;
  class i {
    constructor(d, c = {}) {
      B(this, r), ee(this, t);
      const m = St(d)[G];
      if (this[C] = m, m.wrapper = this, c) {
        const a = c.equals;
        a && (m.equal = a), m.watched = c[e.subtle.watched], m.unwatched = c[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isState)(this)) throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return At.call(this[C]);
    }
    set(d) {
      if (!(0, e.isState)(this)) throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (ft()) throw new Error("Writes to signals not permitted during Watcher callback");
      const c = this[C];
      Tt(c, d);
    }
  }
  t = C, r = /* @__PURE__ */ new WeakSet(), e.isState = (s) => typeof s == "object" && te(r, s), e.State = i;
  class l {
    constructor(d, c) {
      B(this, o), ee(this, n);
      const m = bt(d)[G];
      if (m.consumerAllowSignalWrites = true, this[C] = m, m.wrapper = this, c) {
        const a = c.equals;
        a && (m.equal = a), m.watched = c[e.subtle.watched], m.unwatched = c[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isComputed)(this)) throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return Ie(this[C]);
    }
  }
  n = C, o = /* @__PURE__ */ new WeakSet(), e.isComputed = (s) => typeof s == "object" && te(o, s), e.Computed = l, ((s) => {
    var d, c, u, m;
    function a(y) {
      let p, h = null;
      try {
        h = M(null), p = y();
      } finally {
        M(h);
      }
      return p;
    }
    s.untrack = a;
    function w(y) {
      var _a;
      var p;
      if (!(0, e.isComputed)(y) && !(0, e.isWatcher)(y)) throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return (_a = (p = y[C].producerNode) == null ? void 0 : p.map((h) => h.wrapper)) != null ? _a : [];
    }
    s.introspectSources = w;
    function V(y) {
      var _a;
      var p;
      if (!(0, e.isComputed)(y) && !(0, e.isState)(y)) throw new TypeError("Called introspectSinks without a Signal argument");
      return (_a = (p = y[C].liveConsumerNode) == null ? void 0 : p.map((h) => h.wrapper)) != null ? _a : [];
    }
    s.introspectSinks = V;
    function W(y) {
      if (!(0, e.isComputed)(y) && !(0, e.isState)(y)) throw new TypeError("Called hasSinks without a Signal argument");
      const p = y[C].liveConsumerNode;
      return p ? p.length > 0 : false;
    }
    s.hasSinks = W;
    function X(y) {
      if (!(0, e.isComputed)(y) && !(0, e.isWatcher)(y)) throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const p = y[C].producerNode;
      return p ? p.length > 0 : false;
    }
    s.hasSources = X;
    class Ee {
      constructor(p) {
        B(this, c), B(this, u), ee(this, d);
        let h = Object.create(le);
        h.wrapper = this, h.consumerMarkedDirty = p, h.consumerIsAlwaysLive = true, h.consumerAllowSignalWrites = false, h.producerNode = [], this[C] = h;
      }
      watch(...p) {
        if (!(0, e.isWatcher)(this)) throw new TypeError("Called unwatch without Watcher receiver");
        he(this, u, m).call(this, p);
        const h = this[C];
        h.dirty = false;
        const x = M(h);
        for (const F of p) J(F[C]);
        M(x);
      }
      unwatch(...p) {
        if (!(0, e.isWatcher)(this)) throw new TypeError("Called unwatch without Watcher receiver");
        he(this, u, m).call(this, p);
        const h = this[C];
        D(h);
        for (let x = h.producerNode.length - 1; x >= 0; x--) if (p.includes(h.producerNode[x].wrapper)) {
          Y(h.producerNode[x], h.producerIndexOfThis[x]);
          const F = h.producerNode.length - 1;
          if (h.producerNode[x] = h.producerNode[F], h.producerIndexOfThis[x] = h.producerIndexOfThis[F], h.producerNode.length--, h.producerIndexOfThis.length--, h.nextProducerIndex--, x < h.producerNode.length) {
            const je = h.producerIndexOfThis[x], de = h.producerNode[x];
            ce(de), de.liveConsumerIndexOfThis[je] = x;
          }
        }
      }
      getPending() {
        if (!(0, e.isWatcher)(this)) throw new TypeError("Called getPending without Watcher receiver");
        return this[C].producerNode.filter((h) => h.dirty).map((h) => h.wrapper);
      }
    }
    d = C, c = /* @__PURE__ */ new WeakSet(), u = /* @__PURE__ */ new WeakSet(), m = function(y) {
      for (const p of y) if (!(0, e.isComputed)(p) && !(0, e.isState)(p)) throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, e.isWatcher = (y) => te(c, y), s.Watcher = Ee;
    function Re() {
      var y;
      return (y = ht()) == null ? void 0 : y.wrapper;
    }
    s.currentComputed = Re, s.watched = /* @__PURE__ */ Symbol("watched"), s.unwatched = /* @__PURE__ */ Symbol("unwatched");
  })(e.subtle || (e.subtle = {}));
})(se || (se = {}));
const z = (e = null) => new se.State(e, { equals: () => false }), Rt = /* @__PURE__ */ new Set([Symbol.iterator, "concat", "entries", "every", "filter", "find", "findIndex", "flat", "flatMap", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "values"]), jt = /* @__PURE__ */ new Set(["fill", "push", "unshift"]);
function fe(e) {
  if (typeof e == "symbol") return null;
  const t = Number(e);
  return isNaN(t) ? null : t % 1 === 0 ? t : null;
}
const __ = class __ {
  constructor(t = []) {
    __privateAdd(this, ___instances);
    __privateAdd(this, _e2, z());
    __privateAdd(this, _t2, /* @__PURE__ */ new Map());
    let r = t.slice(), n = this, o = /* @__PURE__ */ new Map(), i = false;
    return new Proxy(r, { get(l, s) {
      var _a;
      let d = fe(s);
      if (d !== null) return __privateMethod(_a = n, ___instances, r_fn).call(_a, d), __privateGet(n, _e2).get(), l[d];
      if (s === "length") return i ? i = false : __privateGet(n, _e2).get(), l[s];
      if (jt.has(s) && (i = true), Rt.has(s)) {
        let c = o.get(s);
        return c === void 0 && (c = (...u) => (__privateGet(n, _e2).get(), l[s](...u)), o.set(s, c)), c;
      }
      return l[s];
    }, set(l, s, d) {
      var _a;
      l[s] = d;
      let c = fe(s);
      return c !== null ? (__privateMethod(_a = n, ___instances, n_fn).call(_a, c), __privateGet(n, _e2).set(null)) : s === "length" && __privateGet(n, _e2).set(null), true;
    }, getPrototypeOf() {
      return __.prototype;
    } });
  }
  static from(t, r, n) {
    return r ? new __(Array.from(t, r, n)) : new __(Array.from(t));
  }
  static of(...t) {
    return new __(t);
  }
};
_e2 = new WeakMap();
_t2 = new WeakMap();
___instances = new WeakSet();
r_fn = function(t) {
  let r = __privateGet(this, _t2).get(t);
  r === void 0 && (r = z(), __privateGet(this, _t2).set(t, r)), r.get();
};
n_fn = function(t) {
  const r = __privateGet(this, _t2).get(t);
  r && r.set(null);
};
let _ = __;
Object.setPrototypeOf(_.prototype, Array.prototype);
class Ot {
  constructor(t) {
    __publicField(this, "collection", z());
    __publicField(this, "storages", /* @__PURE__ */ new Map());
    __publicField(this, "vals");
    this.vals = t ? new Map(t) : /* @__PURE__ */ new Map();
  }
  readStorageFor(t) {
    const { storages: r } = this;
    let n = r.get(t);
    n === void 0 && (n = z(), r.set(t, n)), n.get();
  }
  dirtyStorageFor(t) {
    const r = this.storages.get(t);
    r && r.set(null);
  }
  get(t) {
    return this.readStorageFor(t), this.vals.get(t);
  }
  has(t) {
    return this.readStorageFor(t), this.vals.has(t);
  }
  entries() {
    return this.collection.get(), this.vals.entries();
  }
  keys() {
    return this.collection.get(), this.vals.keys();
  }
  values() {
    return this.collection.get(), this.vals.values();
  }
  forEach(t) {
    this.collection.get(), this.vals.forEach(t);
  }
  get size() {
    return this.collection.get(), this.vals.size;
  }
  [Symbol.iterator]() {
    return this.collection.get(), this.vals[Symbol.iterator]();
  }
  get [Symbol.toStringTag]() {
    return this.vals[Symbol.toStringTag];
  }
  set(t, r) {
    return this.dirtyStorageFor(t), this.collection.set(null), this.vals.set(t, r), this;
  }
  delete(t) {
    return this.dirtyStorageFor(t), this.collection.set(null), this.vals.delete(t);
  }
  clear() {
    this.storages.forEach((t) => t.set(null)), this.collection.set(null), this.vals.clear();
  }
}
Object.setPrototypeOf(Ot.prototype, Map.prototype);
class Mt {
  constructor(t) {
    __publicField(this, "collection", z());
    __publicField(this, "storages", /* @__PURE__ */ new Map());
    __publicField(this, "vals");
    this.vals = new Set(t);
  }
  storageFor(t) {
    const r = this.storages;
    let n = r.get(t);
    return n === void 0 && (n = z(), r.set(t, n)), n;
  }
  dirtyStorageFor(t) {
    const r = this.storages.get(t);
    r && r.set(null);
  }
  has(t) {
    return this.storageFor(t).get(), this.vals.has(t);
  }
  entries() {
    return this.collection.get(), this.vals.entries();
  }
  keys() {
    return this.collection.get(), this.vals.keys();
  }
  values() {
    return this.collection.get(), this.vals.values();
  }
  forEach(t) {
    this.collection.get(), this.vals.forEach(t);
  }
  get size() {
    return this.collection.get(), this.vals.size;
  }
  [Symbol.iterator]() {
    return this.collection.get(), this.vals[Symbol.iterator]();
  }
  get [Symbol.toStringTag]() {
    return this.vals[Symbol.toStringTag];
  }
  add(t) {
    return this.dirtyStorageFor(t), this.collection.set(null), this.vals.add(t), this;
  }
  delete(t) {
    return this.dirtyStorageFor(t), this.collection.set(null), this.vals.delete(t);
  }
  clear() {
    this.storages.forEach((t) => t.set(null)), this.collection.set(null), this.vals.clear();
  }
}
Object.setPrototypeOf(Mt.prototype, Set.prototype);
const _t = { A2uiMessageProcessor: q };
class Pt extends _t.A2uiMessageProcessor {
  constructor() {
    super({ mapCtor: Map, arrayCtor: Array, setCtor: Set, objCtor: Object }), this._surfacesVersion = createSignal(0), this._eventListeners = /* @__PURE__ */ new Set();
  }
  processMessages(t) {
    super.processMessages(t);
    const [, r] = this._surfacesVersion;
    r((n) => n + 1);
  }
  get surfacesVersion() {
    const [t] = this._surfacesVersion;
    return t();
  }
  dispatch(t) {
    return new Promise((r, n) => {
      const o = { message: t, resolve: r, reject: n };
      for (const i of this._eventListeners) i(o);
    });
  }
  onDispatch(t) {
    return this._eventListeners.add(t), () => this._eventListeners.delete(t);
  }
  replaceMessages(t) {
    batch(() => {
      this.clearSurfaces(), this.processMessages(t);
    });
  }
}
function Se() {
  return new Pt();
}
const Ae = createContext();
function ue() {
  const e = useContext(Ae);
  if (!e) throw new Error("useProcessor must be used within an A2UIProvider");
  return e;
}
const Dt = (e) => {
  var _a;
  const t = (_a = e.processor) != null ? _a : Se();
  return createComponent(Ae.Provider, { value: t, get children() {
    return e.children;
  } });
}, Te = { components: { Text: { all: "a2ui-text", h1: "a2ui-text-h1", h2: "a2ui-text-h2", h3: "a2ui-text-h3", body: "a2ui-text-body", caption: "a2ui-text-caption" }, Button: "a2ui-button", Row: "a2ui-row", Column: "a2ui-column", Surface: "a2ui-surface", List: "a2ui-list", ListItem: "a2ui-list-item" } }, Ne = createContext(Te);
function L() {
  return useContext(Ne);
}
const zt = (e) => {
  var _a;
  const t = (_a = e.theme) != null ? _a : Te;
  return createComponent(Ne.Provider, { value: t, get children() {
    return e.children;
  } });
};
function Vt(e, t, r, n) {
  if (!r) return null;
  if ("literalString" in r && r.literalString != null) return r.literalString;
  if ("literal" in r && r.literal != null) return String(r.literal);
  if (r.path) {
    const o = e.getData(t, r.path, n);
    return o != null ? String(o) : null;
  }
  return null;
}
var Wt = ["<div", ' style="', '">', "</div>"];
const Ut = (e) => {
  const t = ue(), r = L(), n = createMemo(() => {
    t.surfacesVersion;
    const s = e.component.properties.text;
    let d = Vt(t, e.component, s, e.surfaceId);
    return d != null ? d : "(empty)";
  }), o = createMemo(() => {
    var _a;
    return (_a = e.component.properties.usageHint) != null ? _a : "body";
  }), i = createMemo(() => {
    const s = o(), d = r.components.Text.all, c = r.components.Text[s];
    return [d, c].filter(Boolean).join(" ");
  }), l = createMemo(() => {
    var _a;
    return { flex: (_a = e.weight) != null ? _a : 1 };
  });
  return ssr(Wt, ssrHydrationKey() + ssrAttribute("class", escape(i(), true), false), ssrStyle(l()), escape(n()));
};
var Lt = ["<button", ' style="', '">', "</button>"];
const Ft = (e) => {
  ue();
  const t = L(), r = createMemo(() => {
    var _a;
    return { flex: (_a = e.weight) != null ? _a : 1 };
  });
  return ssr(Lt, ssrHydrationKey() + ssrAttribute("class", escape(t.components.Button, true), false), ssrStyle(r()), escape(createComponent(Q, { get component() {
    return e.component.properties.child;
  }, get surfaceId() {
    return e.surfaceId;
  } })));
};
var kt = ["<div", ' style="', '">', "</div>"];
const Bt = (e) => {
  const t = L(), r = createMemo(() => {
    var _a;
    return (_a = e.component.properties.children) != null ? _a : [];
  }), n = createMemo(() => {
    var _a;
    return { display: "flex", "flex-direction": "row", flex: (_a = e.weight) != null ? _a : 1, gap: "8px" };
  });
  return ssr(kt, ssrHydrationKey() + ssrAttribute("class", escape(t.components.Row, true), false), ssrStyle(n()), escape(createComponent(For, { get each() {
    return r();
  }, children: (o) => createComponent(Q, { component: o, get surfaceId() {
    return e.surfaceId;
  }, get weight() {
    return typeof o.weight == "number" ? o.weight : void 0;
  } }) })));
};
var Kt = ["<div", ' style="', '">', "</div>"];
const qt = (e) => {
  const t = L(), r = createMemo(() => {
    var _a;
    return (_a = e.component.properties.children) != null ? _a : [];
  }), n = createMemo(() => {
    var _a;
    return { display: "flex", "flex-direction": "column", flex: (_a = e.weight) != null ? _a : 1, gap: "8px" };
  });
  return ssr(Kt, ssrHydrationKey() + ssrAttribute("class", escape(t.components.Column, true), false), ssrStyle(n()), escape(createComponent(For, { get each() {
    return r();
  }, children: (o) => (() => {
    const i = o.properties;
    return typeof (i == null ? void 0 : i.weight) == "number" && i.weight, createComponent(Q, { component: o, get surfaceId() {
      return e.surfaceId;
    }, get weight() {
      return typeof o.weight == "number" ? o.weight : void 0;
    } });
  })() })));
};
var Gt = ["<div", ' style="', '">Unknown component type: <strong>', "</strong></div>"];
const Q = (e) => createComponent(Show, { get when() {
  return e.component;
}, fallback: null, children: (t) => createComponent(Switch, { get fallback() {
  return createComponent(Ht, { get type() {
    return t().type;
  } });
}, get children() {
  return [createComponent(Match, { get when() {
    return t().type === "Text";
  }, get children() {
    return createComponent(Ut, { get component() {
      return t();
    }, get surfaceId() {
      return e.surfaceId;
    }, get weight() {
      return e.weight;
    } });
  } }), createComponent(Match, { get when() {
    return t().type === "Button";
  }, get children() {
    return createComponent(Ft, { get component() {
      return t();
    }, get surfaceId() {
      return e.surfaceId;
    }, get weight() {
      return e.weight;
    } });
  } }), createComponent(Match, { get when() {
    return t().type === "Row";
  }, get children() {
    return createComponent(Bt, { get component() {
      return t();
    }, get surfaceId() {
      return e.surfaceId;
    }, get weight() {
      return e.weight;
    } });
  } }), createComponent(Match, { get when() {
    return t().type === "Column";
  }, get children() {
    return createComponent(qt, { get component() {
      return t();
    }, get surfaceId() {
      return e.surfaceId;
    }, get weight() {
      return e.weight;
    } });
  } })];
} }) }), Ht = (e) => ssr(Gt, ssrHydrationKey(), ssrStyleProperty("padding:", "8px") + ssrStyleProperty(";background:", "#ffeeee") + ssrStyleProperty(";border:", "1px solid #ffcccc") + ssrStyleProperty(";border-radius:", "4px") + ssrStyleProperty(";font-family:", "monospace") + ssrStyleProperty(";font-size:", "12px"), escape(e.type));
var Jt = ["<div", ">", "</div>"], Yt = ["<div", ' style="', '">Waiting for surface "<!--$-->', '<!--/-->"...</div>'];
const Qt = (e) => {
  const t = ue(), r = L(), n = createMemo(() => (t.surfacesVersion, t.getSurfaces().get(e.surfaceId))), o = createMemo(() => {
    const i = n();
    return i ? i.componentTree : null;
  });
  return ssr(Jt, ssrHydrationKey() + ssrAttribute("class", escape(r.components.Surface, true), false) + ssrAttribute("data-surface-id", escape(e.surfaceId, true), false), escape(createComponent(Show, { get when() {
    return o();
  }, get fallback() {
    return createComponent(Xt, { get surfaceId() {
      return e.surfaceId;
    } });
  }, children: (i) => createComponent(Q, { get component() {
    return i();
  }, get surfaceId() {
    return e.surfaceId;
  } }) })));
}, Xt = (e) => ssr(Yt, ssrHydrationKey(), ssrStyleProperty("padding:", "16px") + ssrStyleProperty(";color:", "#666") + ssrStyleProperty(";font-style:", "italic"), escape(e.surfaceId));
var Zt = ["<div", ' style="', '">', "</div>"], er = ["<main", "><!--$-->", "<!--/--><h1>A2UI Solid renderer demo</h1><!--$-->", "<!--/--></main>"];
const ae = Se();
ae.onDispatch(async (e) => {
  console.log("User action dispatched:", e.message), e.resolve([]);
});
function tr(e) {
  const t = "a2ui.main", r = new EventSource(`/api/a2ui/stream?subject=${encodeURIComponent(t)}`);
  return r.addEventListener("ready", (n) => {
    console.log("A2UI transport ready:", n.data);
  }), r.addEventListener("a2ui", (n) => {
    const o = n.data;
    try {
      const i = JSON.parse(o), l = Array.isArray(i) ? i : [i];
      e.processMessages(l);
    } catch (i) {
      console.warn("Failed to parse A2UI SSE message", i);
    }
  }), r.addEventListener("a2ui_error", (n) => {
    const o = n.data;
    console.warn("A2UI transport server error:", o);
  }), r.addEventListener("error", (n) => {
    const o = n == null ? void 0 : n.data;
    if (typeof o == "string" && o.length > 0) {
      console.warn("A2UI transport error:", o);
      return;
    }
    console.warn("A2UI transport connection issue (will retry)");
  }), () => {
    r.close();
  };
}
function ir() {
  return onMount(() => {
    const e = tr(ae);
    onCleanup(e);
  }), ssr(er, ssrHydrationKey(), escape(createComponent(k, { children: "A2UI Demo" })), escape(createComponent(zt, { get children() {
    return createComponent(Dt, { processor: ae, get children() {
      return ssr(Zt, ssrHydrationKey(), ssrStyleProperty("padding:", "16px"), escape(createComponent(Qt, { surfaceId: "main" })));
    } });
  } })));
}

export { ir as default };
//# sourceMappingURL=a2ui2.mjs.map
