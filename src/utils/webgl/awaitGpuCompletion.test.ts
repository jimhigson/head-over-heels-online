import { expect, test } from "vitest";

import { awaitGpuCompletion } from "./awaitGpuCompletion";

test("resolves once the gpu signals the fence", async () => {
  const statuses = [
    0x91_1b /* TIMEOUT_EXPIRED */, 0x91_1c /* CONDITION_SATISFIED */,
  ];
  const gl = {
    SYNC_GPU_COMMANDS_COMPLETE: 0x91_17,
    TIMEOUT_EXPIRED: 0x91_1b,
    WAIT_FAILED: 0x91_1d,
    fenceSync: () => ({}),
    flush() {},
    clientWaitSync: () => statuses.shift(),
    deleteSync() {},
  } as unknown as WebGL2RenderingContext;

  await expect(awaitGpuCompletion(gl)).resolves.toBeUndefined();
});

test("rejects when the context is lost while waiting", async () => {
  const gl = {
    SYNC_GPU_COMMANDS_COMPLETE: 0x91_17,
    TIMEOUT_EXPIRED: 0x91_1b,
    WAIT_FAILED: 0x91_1d,
    fenceSync: () => ({}),
    flush() {},
    // a lost context's fence fails rather than signalling
    clientWaitSync: () => 0x91_1d,
    deleteSync() {},
  } as unknown as WebGL2RenderingContext;

  await expect(awaitGpuCompletion(gl)).rejects.toThrow("webgl context lost");
});

test("rejects when the context is already lost", async () => {
  const gl = {
    SYNC_GPU_COMMANDS_COMPLETE: 0x91_17,
    TIMEOUT_EXPIRED: 0x91_1b,
    WAIT_FAILED: 0x91_1d,
    // a lost context gives no fence
    fenceSync: () => null,
    flush() {},
    clientWaitSync: () => 0x91_1d,
    deleteSync() {},
  } as unknown as WebGL2RenderingContext;

  await expect(awaitGpuCompletion(gl)).rejects.toThrow("webgl context lost");
});
