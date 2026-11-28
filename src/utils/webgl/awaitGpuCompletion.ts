/**
 * a macrotask turn without setTimeout's nesting clamp, so a wait polls as
 * soon as the event loop is free
 */
const yieldToEventLoop = () =>
  new Promise<void>((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = () => {
      port1.close();
      resolve();
    };
    port2.postMessage(undefined);
  });

/**
 * resolves once the GPU has finished every command submitted so far, without
 * blocking the main thread meanwhile. Rejects if the context is lost, since
 * what was submitted then never finishes
 */
export const awaitGpuCompletion = async (gl: WebGL2RenderingContext) => {
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  // a lost context gives no fence
  if (sync === null) {
    throw new Error("webgl context lost before waiting for the gpu");
  }
  gl.flush();
  // a fence's status only updates between tasks, so each poll yields first
  let status: GLenum;
  do {
    await yieldToEventLoop();
    status = gl.clientWaitSync(sync, 0, 0);
  } while (status === gl.TIMEOUT_EXPIRED);
  // a fence from a lost context fails rather than signalling
  if (status === gl.WAIT_FAILED) {
    throw new Error("webgl context lost while waiting for the gpu");
  }
  gl.deleteSync(sync);
};
