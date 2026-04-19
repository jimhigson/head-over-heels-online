import { detectDeviceType } from "../utils/detectEnv/detectDeviceType";

export const audioCtx =
  detectDeviceType() === "server" ?
    // no code on the server should actually be using sound - we lie to the
    // type system to avoid the overhead of dynamically creating a singleton
    // but this will crash if the sound-making code isn't protected against
    // running on the server
    (undefined as unknown as AudioContext)
  : new window.AudioContext();
