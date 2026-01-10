import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { k } from './index-BdnVf8ln.mjs';
import { createSignal } from 'solid-js';

var m = ["<button", ' class="increment" type="button">Clicks: <!--$-->', "<!--/--></button>"];
function s() {
  const [o, p] = createSignal(0);
  return ssr(m, ssrHydrationKey(), escape(o()));
}
var u = ["<main", "><!--$-->", "<!--/--><h1>SolidStart is running</h1><!--$-->", '<!--/--><p>Open <a href="/a2ui">/a2ui</a> to see the A2UI Solid renderer demo.</p></main>'];
function f() {
  return ssr(u, ssrHydrationKey(), escape(createComponent(k, { children: "A2UI SolidStart Example" })), escape(createComponent(s, {})));
}

export { f as default };
//# sourceMappingURL=index.mjs.map
