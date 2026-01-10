/**
 * A2UI Demo Publisher
 * 
 * This script publishes A2UI messages to NATS with random intervals (2-5 seconds)
 * to demonstrate streaming UI updates.
 * 
 * Run with: 
 *   npm run demo         # Run once
 *   npm run demo:loop    # Loop continuously
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

// Generate messages with current timestamp
function generateDemoMessages() {
  return [
    // Message 1: First send surfaceUpdate to populate component buffer
    // IMPORTANT: surfaceUpdate must come BEFORE beginRendering because
    // the processor handles beginRendering first, which tries to build
    // the component tree from the buffer
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root-column",
            type: "Column",
            properties: {
              children: {
                explicitList: ["header-text"],
              },
            },
          },
          {
            id: "header-text",
            type: "Text",
            properties: {
              text: { literalString: "🚀 Welcome to A2UI Streaming Demo" },
              usageHint: "h1",
            },
          },
        ],
      },
    },

    // Message 2: Now trigger rendering with beginRendering
    {
      beginRendering: {
        surfaceId: "main",
        root: "root-column",
      },
    },

    // Message 2: Add a subtitle
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root-column",
            type: "Column",
            properties: {
              children: {
                explicitList: ["header-text", "subtitle-text"],
              },
            },
          },
          {
            id: "subtitle-text",
            type: "Text",
            properties: {
              text: { literalString: "Watch as components stream in with random delays..." },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 3: Add a row with status info
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root-column",
            type: "Column",
            properties: {
              children: {
                explicitList: ["header-text", "subtitle-text", "status-row"],
              },
            },
          },
          {
            id: "status-row",
            type: "Row",
            properties: {
              children: {
                explicitList: ["status-icon", "status-text"],
              },
            },
          },
          {
            id: "status-icon",
            type: "Text",
            properties: {
              text: { literalString: "⏳" },
              usageHint: "h2",
            },
          },
          {
            id: "status-text",
            type: "Text",
            properties: {
              text: { literalString: "Loading more content..." },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 4: Add a feature list column
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root-column",
            type: "Column",
            properties: {
              children: {
                explicitList: ["header-text", "subtitle-text", "status-row", "features-section"],
              },
            },
          },
          {
            id: "features-section",
            type: "Column",
            properties: {
              children: {
                explicitList: ["features-title"],
              },
            },
          },
          {
            id: "features-title",
            type: "Text",
            properties: {
              text: { literalString: "✨ A2UI Features" },
              usageHint: "h2",
            },
          },
        ],
      },
    },

    // Message 5: Add first feature
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "features-section",
            type: "Column",
            properties: {
              children: {
                explicitList: ["features-title", "feature-1"],
              },
            },
          },
          {
            id: "feature-1",
            type: "Row",
            properties: {
              children: {
                explicitList: ["feature-1-icon", "feature-1-text"],
              },
            },
          },
          {
            id: "feature-1-icon",
            type: "Text",
            properties: {
              text: { literalString: "📡" },
              usageHint: "body",
            },
          },
          {
            id: "feature-1-text",
            type: "Text",
            properties: {
              text: { literalString: "Real-time streaming UI updates via NATS JetStream" },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 6: Add second feature
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "features-section",
            type: "Column",
            properties: {
              children: {
                explicitList: ["features-title", "feature-1", "feature-2"],
              },
            },
          },
          {
            id: "feature-2",
            type: "Row",
            properties: {
              children: {
                explicitList: ["feature-2-icon", "feature-2-text"],
              },
            },
          },
          {
            id: "feature-2-icon",
            type: "Text",
            properties: {
              text: { literalString: "⚡" },
              usageHint: "body",
            },
          },
          {
            id: "feature-2-text",
            type: "Text",
            properties: {
              text: { literalString: "SolidJS reactive rendering for blazing fast updates" },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 7: Add third feature
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "features-section",
            type: "Column",
            properties: {
              children: {
                explicitList: ["features-title", "feature-1", "feature-2", "feature-3"],
              },
            },
          },
          {
            id: "feature-3",
            type: "Row",
            properties: {
              children: {
                explicitList: ["feature-3-icon", "feature-3-text"],
              },
            },
          },
          {
            id: "feature-3-icon",
            type: "Text",
            properties: {
              text: { literalString: "🔄" },
              usageHint: "body",
            },
          },
          {
            id: "feature-3-text",
            type: "Text",
            properties: {
              text: { literalString: "Progressive rendering - UI builds up as data arrives" },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 8: Add interactive button row
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root-column",
            type: "Column",
            properties: {
              children: {
                explicitList: ["header-text", "subtitle-text", "status-row", "features-section", "button-row"],
              },
            },
          },
          {
            id: "button-row",
            type: "Row",
            properties: {
              children: {
                explicitList: ["action-button", "info-button"],
              },
            },
          },
          {
            id: "action-button",
            type: "Button",
            properties: {
              child: "action-button-text",
              action: {
                name: "primaryAction",
                context: [],
              },
            },
          },
          {
            id: "action-button-text",
            type: "Text",
            properties: {
              text: { literalString: "🎯 Primary Action" },
              usageHint: "body",
            },
          },
          {
            id: "info-button",
            type: "Button",
            properties: {
              child: "info-button-text",
              action: {
                name: "showInfo",
                context: [],
              },
            },
          },
          {
            id: "info-button-text",
            type: "Text",
            properties: {
              text: { literalString: "ℹ️ More Info" },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 9: Update status to complete
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "status-icon",
            type: "Text",
            properties: {
              text: { literalString: "✅" },
              usageHint: "h2",
            },
          },
          {
            id: "status-text",
            type: "Text",
            properties: {
              text: { literalString: "All content loaded successfully!" },
              usageHint: "body",
            },
          },
        ],
      },
    },

    // Message 10: Add footer with timestamp
    {
      surfaceUpdate: {
        surfaceId: "main",
        components: [
          {
            id: "root-column",
            type: "Column",
            properties: {
              children: {
                explicitList: ["header-text", "subtitle-text", "status-row", "features-section", "button-row", "footer-text"],
              },
            },
          },
          {
            id: "footer-text",
            type: "Text",
            properties: {
              text: { literalString: `🕐 Demo completed at ${getTimestamp()}` },
              usageHint: "caption",
            },
          },
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
    
    // Publish the message to NATS
    nc.publish(subject, jc.encode(message));
    
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
