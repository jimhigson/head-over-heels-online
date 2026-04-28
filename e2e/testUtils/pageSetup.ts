import type { Page } from "@playwright/test";

export const muteAudioInE2e = () => {
  Object.defineProperty(HTMLMediaElement.prototype, "volume", {
    set() {},
    get() {
      return 0;
    },
  });
  Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set() {},
    get() {
      return true;
    },
  });
  HTMLMediaElement.prototype.play = () => Promise.resolve();

  const sinks = new WeakMap<BaseAudioContext, GainNode>();

  Object.defineProperty(BaseAudioContext.prototype, "destination", {
    get() {
      const existing = sinks.get(this);
      if (existing) return existing as unknown as AudioDestinationNode;

      const sink = this.createGain();
      sinks.set(this, sink);
      return sink as unknown as AudioDestinationNode;
    },
  });
};

// minimal valid WAV: 44-byte header, 1 sample of silence, 8-bit mono 8kHz
const silentWav = Buffer.from(
  "52494646" + // "RIFF"
    "24000000" + // file size - 8 (36 bytes)
    "57415645" + // "WAVE"
    "666d7420" + // "fmt "
    "10000000" + // fmt chunk size (16)
    "0100" + // PCM format
    "0100" + // mono
    "401f0000" + // 8000 Hz sample rate
    "401f0000" + // byte rate
    "0100" + // block align
    "0800" + // 8 bits per sample
    "64617461" + // "data"
    "00000000", // data size (0 bytes of audio)
  "hex",
);

/** Per-page e2e setup: mute audio and fail on ErrorCaughtDialog. Call in beforeEach. */
export const setupE2ePage = async (page: Page) => {
  await page.addInitScript(muteAudioInE2e);
  await page.route("**/*.mp3", (route) =>
    route.fulfill({ contentType: "audio/wav", body: silentWav }),
  );
  await page.addLocatorHandler(
    page.locator('[data-dialog-id="errorCaught"]'),
    async () => {
      const stackTrace = await page
        .locator('[data-dialog-id="errorCaught"] pre')
        .textContent()
        .catch(() => "(could not read stack trace)");
      throw new Error(
        `ErrorCaughtDialog appeared unexpectedly:\n${stackTrace}`,
      );
    },
  );
};
