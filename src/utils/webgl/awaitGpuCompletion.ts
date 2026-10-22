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
 * blocking the main thread meanwhile. A lost context resolves at once
 */
export const awaitGpuCompletion = async (gl: WebGL2RenderingContext) => {
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  if (sync === null) {
    return;
  }
  gl.flush();
  // a fence's status only updates between tasks, so each poll yields first
  do {
    await yieldToEventLoop();
  } while (gl.clientWaitSync(sync, 0, 0) === gl.TIMEOUT_EXPIRED);
  gl.deleteSync(sync);
};
