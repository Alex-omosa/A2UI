import { connect, type JetStreamClient, type JetStreamManager, type NatsConnection } from "nats";

type NatsSingleton = {
  ncPromise?: Promise<NatsConnection>;
  nc?: NatsConnection;
  jsmPromise?: Promise<JetStreamManager>;
  jsPromise?: Promise<JetStreamClient>;
};

function getSingleton(): NatsSingleton {
  const g = globalThis as unknown as { __a2uiNats?: NatsSingleton };
  if (!g.__a2uiNats) g.__a2uiNats = {};
  return g.__a2uiNats;
}

export function getNatsConfig() {
  return {
    url: process.env.NATS_URL ?? "nats://127.0.0.1:4222",
    streamName: process.env.A2UI_STREAM ?? "A2UI",
    subjectPrefix: process.env.A2UI_SUBJECT_PREFIX ?? "a2ui",
  };
}

export async function getNatsConnection(): Promise<NatsConnection> {
  const cfg = getNatsConfig();
  const state = getSingleton();

  if (state.nc) return state.nc;

  if (!state.ncPromise) {
    state.ncPromise = connect({
      servers: cfg.url,
      name: "a2ui-solidstart",
    }).then((nc) => {
      state.nc = nc;
      return nc;
    });
  }

  return state.ncPromise;
}

export async function getJetStreamManager(): Promise<JetStreamManager> {
  const state = getSingleton();
  if (!state.jsmPromise) {
    state.jsmPromise = getNatsConnection().then((nc) => nc.jetstreamManager());
  }
  return state.jsmPromise;
}

export async function getJetStreamClient(): Promise<JetStreamClient> {
  const state = getSingleton();
  if (!state.jsPromise) {
    state.jsPromise = getNatsConnection().then((nc) => nc.jetstream());
  }
  return state.jsPromise;
}

export async function warmNatsConnection(): Promise<void> {
  // Eagerly connect at server start (best-effort). Do not throw.
  try {
    await getJetStreamManager();
    await getJetStreamClient();
  } catch {
    // ignore; routes will emit a2ui_error with details on-demand
  }
}
