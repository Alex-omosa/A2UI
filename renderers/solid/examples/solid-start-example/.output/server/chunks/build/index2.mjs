import { ssr, ssrHydrationKey, escape, createComponent } from 'solid-js/web';
import { k } from '../nitro/nitro.mjs';
import { createSignal } from 'solid-js';
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
//# sourceMappingURL=index2.mjs.map
