/**
 * sharp v0.35 hides its bundled types from "exports"-respecting module
 * resolution, so declare the minimal surface the scripts use
 */
declare module "sharp" {
  type SharpRawOptions = {
    raw: { width: number; height: number; channels: number };
  };
  type SharpInstance = {
    webp(options: { lossless: boolean; effort: number }): SharpInstance;
    withIccProfile(iccFile: string): SharpInstance;
    toBuffer(): Promise<Buffer>;
  };
  const sharp: (input: Buffer, options: SharpRawOptions) => SharpInstance;
  export default sharp;
}
