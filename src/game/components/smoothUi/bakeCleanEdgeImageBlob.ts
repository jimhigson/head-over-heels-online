import cleanEdgeTwoPassFrag from "../../render/filters/cleanEdge/cleanEdgeTwoPass.frag";

/**
 * minimal fullscreen-triangle vertex stage for {@link bakeCleanEdgeImageBlob}:
 * the fragment stage is the same cleanEdgeTwoPass.frag the game engine bakes
 * its spritesheets with, which needs only vUV/uTexture/uSheetSize
 */
const fullscreenVert = `#version 300 es
out vec2 vUV;
void main(){
  vec2 pos = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  vUV = vec2(pos.x * 0.5 + 0.5, 0.5 - pos.y * 0.5);
  gl_Position = vec4(pos, 0.0, 1.0);
}
`;

const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(
      `cleanEdge ui bake: shader failed to compile: ${gl.getShaderInfoLog(shader)}`,
    );
  }
  return shader;
};

/**
 * Upscale an image (a spritesheet the css shows sprites from) with the same
 * two-pass cleanEdge shader the game engine bakes its spritesheets with,
 * standalone on raw WebGL2 - deliberately not via pixi, so the menus can
 * smooth their sprites without loading the game engine.
 *
 * @returns a png blob of the upscaled image, `factor` times the source size
 */
export const bakeCleanEdgeImageBlob = async (
  /** url of the source image (eg the sprites webp asset) */
  imageUrl: string,
  /** integer upscale factor (the game engine's cap is 4) */
  factor: number,
): Promise<Blob> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(
      `cleanEdge ui bake: could not fetch ${imageUrl}: HTTP ${response.status}`,
    );
  }
  // premultiplied to match what the game's (pixi) bake pipeline samples:
  const bitmap = await createImageBitmap(await response.blob(), {
    premultiplyAlpha: "premultiply",
    colorSpaceConversion: "none",
  });

  const canvas = new OffscreenCanvas(
    bitmap.width * factor,
    bitmap.height * factor,
  );
  const gl = canvas.getContext("webgl2", {
    premultipliedAlpha: true,
    alpha: true,
  });
  if (gl === null) {
    throw new Error(
      "cleanEdge ui bake: WebGL2 is unavailable (the game cannot run without it either)",
    );
  }

  try {
    const program = gl.createProgram()!;
    gl.attachShader(
      program,
      compileShader(gl, gl.VERTEX_SHADER, fullscreenVert),
    );
    gl.attachShader(
      program,
      compileShader(gl, gl.FRAGMENT_SHADER, cleanEdgeTwoPassFrag),
    );
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(
        `cleanEdge ui bake: program failed to link: ${gl.getProgramInfoLog(program)}`,
      );
    }
    gl.useProgram(program);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

    gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
    gl.uniform2f(
      gl.getUniformLocation(program, "uSheetSize"),
      bitmap.width,
      bitmap.height,
    );

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.disable(gl.BLEND);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    return await canvas.convertToBlob({ type: "image/png" });
  } finally {
    bitmap.close();
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
};
