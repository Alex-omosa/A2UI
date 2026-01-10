#!/usr/bin/env bash
set -euo pipefail

# Publishes a demo v0.8 A2UI message batch to NATS.
#
# Requirements:
# - nats CLI (https://github.com/nats-io/natscli)
#
# Usage:
#   ./scripts/publish-a2ui-demo.sh
#   SUBJECT=a2ui.main NATS_URL=nats://127.0.0.1:4222 ./scripts/publish-a2ui-demo.sh
#   PAYLOAD_FILE=./messages.json ./scripts/publish-a2ui-demo.sh

NATS_URL=${NATS_URL:-nats://127.0.0.1:4222}
SUBJECT=${SUBJECT:-a2ui.main}
PAYLOAD_FILE=${PAYLOAD_FILE:-}

if ! command -v nats >/dev/null 2>&1; then
  echo "ERROR: 'nats' CLI not found in PATH." >&2
  echo "Install from: https://github.com/nats-io/natscli" >&2
  exit 1
fi

if [[ -n "$PAYLOAD_FILE" ]]; then
  if [[ ! -f "$PAYLOAD_FILE" ]]; then
    echo "ERROR: PAYLOAD_FILE not found: $PAYLOAD_FILE" >&2
    exit 1
  fi
  PAYLOAD=$(cat "$PAYLOAD_FILE")
else
  PAYLOAD=$(cat <<'JSON'
[
  {
    "beginRendering": {
      "surfaceId": "main",
      "root": "root"
    }
  },
  {
    "surfaceUpdate": {
      "surfaceId": "main",
      "components": [
        {
          "id": "root",
          "component": {
            "Column": {
              "children": { "explicitList": ["title", "subtitle", "button-row"] }
            }
          }
        },
        {
          "id": "title",
          "component": {
            "Text": {
              "text": { "literalString": "Hello from NATS JetStream!" },
              "usageHint": "h1"
            }
          }
        },
        {
          "id": "subtitle",
          "component": {
            "Text": {
              "text": { "literalString": "This UI was streamed into SolidStart via SSE." },
              "usageHint": "body"
            }
          }
        },
        {
          "id": "button-row",
          "component": {
            "Row": {
              "children": { "explicitList": ["btn-1", "btn-2"] }
            }
          }
        },
        {
          "id": "btn-1",
          "component": {
            "Button": {
              "action": { "name": "greet", "context": [] },
              "child": "btn-1-text"
            }
          }
        },
        {
          "id": "btn-1-text",
          "component": {
            "Text": {
              "text": { "literalString": "Say Hello" },
              "usageHint": "body"
            }
          }
        },
        {
          "id": "btn-2",
          "component": {
            "Button": {
              "action": { "name": "goodbye", "context": [] },
              "child": "btn-2-text"
            }
          }
        },
        {
          "id": "btn-2-text",
          "component": {
            "Text": {
              "text": { "literalString": "Say Goodbye Alex" },
              "usageHint": "body"
            }
          }
        }
      ]
    }
  }
]
JSON
  )
fi

echo "Publishing to $NATS_URL subject '$SUBJECT'..."

nats pub -s "$NATS_URL" "$SUBJECT" "$PAYLOAD"

echo "Done. Open your SolidStart demo at /a2ui to see it."
