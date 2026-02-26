// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { warmNatsConnection } from "~/server/nats";

// Best-effort: initialize the server-wide NATS connection once.
// In dev with HMR this module can reload; the singleton is stored on globalThis.
void warmNatsConnection();

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
