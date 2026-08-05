/**
 * sharp v0.35 hides its bundled types from "exports"-respecting module
 * resolution, so declare the minimal surface the scripts use
 */
declare module "sharp" {
  type RawShape = { width: number; height: number; channels: number };
  type SharpRawOptions = { raw: RawShape };
  type SharpInstance = {
    webp(options: { lossless: boolean; effort: number }): SharpInstance;
    withIccProfile(iccFile: string): SharpInstance;
    ensureAlpha(): SharpInstance;
    raw(): SharpInstance;
    png(): SharpInstance;
    toFile(path: string): Promise<unknown>;
    toBuffer(): Promise<Buffer>;
    toBuffer(options: {
      resolveWithObject: true;
    }): Promise<{ data: Buffer; info: RawShape }>;
  };
  const sharp: {
    (input: Buffer, options: SharpRawOptions): SharpInstance;
    (input: Buffer): SharpInstance;
    (input: string): SharpInstance;
  };
  export default sharp;
}
