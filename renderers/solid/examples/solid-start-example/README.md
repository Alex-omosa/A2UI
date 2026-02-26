# SolidStart A2UI Demo (JetStream)

This example renders A2UI v0.8 messages in the browser, streamed from **NATS JetStream** via an **SSE** endpoint.

## Prereqs

- A running `nats-server` with JetStream enabled (`-js`).
- Node.js + npm.

## Run the demo

From this directory:

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:3001/a2ui`).

In another terminal, publish demo messages:

```bash
npm run demo        # publish one demo sequence
npm run demo:loop   # continuously publish sequences
```

If you want to run it from the repo root:

```bash
npm --prefix renderers/solid/examples/solid-start-example run dev
npm --prefix renderers/solid/examples/solid-start-example run demo:loop
```

## Useful env vars

- `NATS_URL` (default `nats://127.0.0.1:4222`)
- `A2UI_STREAM` (default `A2UI`)
- `A2UI_SUBJECT_PREFIX` (default `a2ui`)
- `A2UI_SUBJECT` (publisher only; default `a2ui.main`)

## Quick checks

- Confirm the SSE stream emits messages:
  ```bash
  timeout 8s curl -N http://127.0.0.1:3001/api/a2ui/stream?subject=a2ui.main
  ```

By default the SSE endpoint replays existing JetStream messages for that subject (`deliver=all`).
If you only want *new* messages published after you connect, use `deliver=new`:

```bash
timeout 8s curl -N "http://127.0.0.1:3001/api/a2ui/stream?subject=a2ui.main&deliver=new"
```

Note: if you use `deliver=new` and connect after a demo has already started, you can miss the one-time `beginRendering` message.
Without `beginRendering`, the processor will buffer components but the UI will not render. For demos, prefer the default `deliver=all`.
- Confirm JetStream is receiving publishes:
  ```bash
  nats stream info A2UI
  ```
