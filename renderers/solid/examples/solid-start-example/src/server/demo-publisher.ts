/**
 * Publishes demo A2UI v0.8 messages to NATS.
 *
 * - `npm run demo`: publish one sequence
 * - `npm run demo:loop`: publish continuously with random delays
 */

import { connect, JSONCodec, type NatsConnection } from "nats";

const jc = JSONCodec();
const isLoopMode = process.argv.includes("--loop");

function randomInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString();
}

// Helper to create a component in correct A2UI format
// The component object uses the type name as a key: { "Text": { ...props } }
function createComponent(id: string, type: string, props: Record<string, unknown>, weight?: number) {
  return {
    id,
    ...(weight !== undefined ? { weight } : {}),
    component: {
      [type]: props,
    },
  };
}

// Generate messages with current timestamp
function generateDemoMessages() {
  return [
    // Message 1: Publish the initial surfaceUpdate + beginRendering together.
    // This matches the behavior of the working bash script and prevents a
    // blank UI while waiting for beginRendering.
    [
      {
        surfaceUpdate: {
          surfaceId: "main",
          components: [
            createComponent("root-column", "Column", {
              children: { explicitList: ["header-text"] },
            }),
            createComponent("header-text", "Text", {
              text: { literalString: "🚀 Welcome to A2UI Streaming Demo" },
              usageHint: "h1",
            }),
          ],
        },
      },
      {
        beginRendering: {
          surfaceId: "main",
          root: "root-column",
        },
      },
    ],

    // Message 3: Add a subtitle
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("root-column", "Column", {
            children: { explicitList: ["header-text", "subtitle-text"] },
          }),
          createComponent("subtitle-text", "Text", {
            text: { literalString: "Watch as components stream in with random delays..." },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 4: Add a row with status info
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("root-column", "Column", {
            children: { explicitList: ["header-text", "subtitle-text", "status-row"] },
          }),
          createComponent("status-row", "Row", {
            children: { explicitList: ["status-icon", "status-text"] },
          }),
          createComponent("status-icon", "Text", {
            text: { literalString: "⏳" },
            usageHint: "h2",
          }),
          createComponent("status-text", "Text", {
            text: { literalString: "Loading more content..." },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 5: Add a feature list column
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("root-column", "Column", {
            children: { explicitList: ["header-text", "subtitle-text", "status-row", "features-section"] },
          }),
          createComponent("features-section", "Column", {
            children: { explicitList: ["features-title"] },
          }),
          createComponent("features-title", "Text", {
            text: { literalString: "✨ A2UI Features" },
            usageHint: "h2",
          }),
        ],
      },
    },

    // Message 6: Add first feature
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("features-section", "Column", {
            children: { explicitList: ["features-title", "feature-1"] },
          }),
          createComponent("feature-1", "Row", {
            children: { explicitList: ["feature-1-icon", "feature-1-text"] },
          }),
          createComponent("feature-1-icon", "Text", {
            text: { literalString: "📡" },
            usageHint: "body",
          }),
          createComponent("feature-1-text", "Text", {
            text: { literalString: "Real-time streaming UI updates via NATS JetStream" },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 7: Add second feature
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("features-section", "Column", {
            children: { explicitList: ["features-title", "feature-1", "feature-2"] },
          }),
          createComponent("feature-2", "Row", {
            children: { explicitList: ["feature-2-icon", "feature-2-text"] },
          }),
          createComponent("feature-2-icon", "Text", {
            text: { literalString: "⚡" },
            usageHint: "body",
          }),
          createComponent("feature-2-text", "Text", {
            text: { literalString: "SolidJS reactive rendering for blazing fast updates" },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 8: Add third feature
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("features-section", "Column", {
            children: { explicitList: ["features-title", "feature-1", "feature-2", "feature-3"] },
          }),
          createComponent("feature-3", "Row", {
            children: { explicitList: ["feature-3-icon", "feature-3-text"] },
          }),
          createComponent("feature-3-icon", "Text", {
            text: { literalString: "🔄" },
            usageHint: "body",
          }),
          createComponent("feature-3-text", "Text", {
            text: { literalString: "Progressive rendering - UI builds up as data arrives" },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 9: Add interactive button row
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("root-column", "Column", {
            children: { explicitList: ["header-text", "subtitle-text", "status-row", "features-section", "button-row"] },
          }),
          createComponent("button-row", "Row", {
            children: { explicitList: ["action-button", "info-button"] },
          }),
          createComponent("action-button", "Button", {
            child: "action-button-text",
            action: { name: "primaryAction", context: [] },
          }),
          createComponent("action-button-text", "Text", {
            text: { literalString: "🎯 Primary Action" },
            usageHint: "body",
          }),
          createComponent("info-button", "Button", {
            child: "info-button-text",
            action: { name: "showInfo", context: [] },
          }),
          createComponent("info-button-text", "Text", {
            text: { literalString: "ℹ️ More Info" },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 10: Update status to complete
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("status-icon", "Text", {
            text: { literalString: "✅" },
            usageHint: "h2",
          }),
          createComponent("status-text", "Text", {
            text: { literalString: "All content loaded successfully!" },
            usageHint: "body",
          }),
        ],
      },
    },

    // Message 11: Add footer with timestamp
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          createComponent("root-column", "Column", {
            children: { explicitList: ["header-text", "subtitle-text", "status-row", "features-section", "button-row", "footer-text"] },
          }),
          createComponent("footer-text", "Text", {
            text: { literalString: `🕐 Demo completed at ${getTimestamp()}` },
            usageHint: "caption",
          }),
        ],
      },
    },
  ];
}

async function publishDemoSequence(nc: NatsConnection, subject: string, iteration: number) {
  const demoMessages = generateDemoMessages();
  
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📺 Starting demo sequence ${iteration > 0 ? `#${iteration}` : ""}`);
  console.log(`${"=".repeat(60)}\n`);

  for (let i = 0; i < demoMessages.length; i++) {
    const message = demoMessages[i];
    const messageNum = i + 1;
    
    console.log(`📨 [${getTimestamp()}] Publishing message ${messageNum}/${demoMessages.length}...`);
    
    // Publish the message to NATS. Each item is either a single A2UI message
    // or a batch (array) of messages.
    nc.publish(subject, jc.encode(message as unknown));
    
    console.log(`   ✓ Message ${messageNum} published`);

    // If not the last message, wait a random interval
    if (i < demoMessages.length - 1) {
      const delay = randomInterval(2, 5);
      console.log(`   ⏳ Waiting ${delay / 1000} seconds before next message...\n`);
      await sleep(delay);
    }
  }

  console.log(`\n🎉 Demo sequence complete!`);
}

async function main() {
  const natsUrl = process.env.NATS_URL ?? "nats://127.0.0.1:4222";
  const subject = process.env.A2UI_SUBJECT ?? "a2ui.main";

  console.log(`🔌 Connecting to NATS at ${natsUrl}...`);
  
  const nc = await connect({
    servers: natsUrl,
    name: "a2ui-demo-publisher",
  });

  console.log(`✅ Connected to NATS`);
  console.log(`📤 Publishing A2UI messages to subject: ${subject}`);
  console.log(`⏱️  Random intervals between 2-5 seconds`);
  console.log(`🔁 Loop mode: ${isLoopMode ? "ON" : "OFF"}`);
  console.log(`👀 Open your browser at /a2ui to see the streaming demo\n`);

  if (isLoopMode) {
    console.log(`💡 Press Ctrl+C to stop the demo loop\n`);
    let iteration = 1;
    
    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log(`\n\n👋 Stopping demo loop...`);
      await nc.drain();
      console.log(`✅ NATS connection closed`);
      process.exit(0);
    });

    while (true) {
      await publishDemoSequence(nc, subject, iteration);
      iteration++;
      
      // Wait 5 seconds between loops
      console.log(`\n⏳ Waiting 5 seconds before restarting demo...\n`);
      await sleep(5000);
    }
  } else {
    await publishDemoSequence(nc, subject, 0);
    
    // Gracefully close the connection
    await nc.drain();
    console.log(`\n👋 NATS connection closed`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
