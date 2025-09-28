#version 300 es
// some old/mid-spec Android devices (eg, Pixel 7a) need this to be high
// precision, or they 'miss' the locations on the LUT
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

// Must match TypeScript: 2^mortonEncodeRgbBitDepth^1.5
// With mortonEncodeRgbBitDepth = 6: 64^1.5 = 512
const float lutW = 512.0;

uniform sampler2D uTexture;
uniform sampler2D uLut;

/**
 * Block-based encoding for 6-bit RGB values
 * Blue determines which 64x64 block, red/green are x/y within block
 */
ivec2 blockEncode(vec3 color) {
    // Convert to 6-bit integers (0-63)
    ivec3 c6 = ivec3(floor(color * 63.0 + 0.5));

    // Blue determines which 64x64 block in an 8x8 grid
    int blockX = (c6.b % 8) * 64;
    int blockY = (c6.b / 8) * 64;

    // Within the block, red is X and green is Y
    int x = blockX + c6.r;
    int y = blockY + c6.g;

    return ivec2(x, y);
}

void main(void) {

    vec4 c = texture(uTexture, vTextureCoord);

    // Get block-encoded position for this color (returns integer coordinates)
    ivec2 lutPos = blockEncode(c.rgb);

    // use the Morton position to look up the replacement in the LUT:
    // Convert to normalized coordinates for better cross-platform compatibility
    vec2 normalizedPos = vec2(
        (float(lutPos.x) + 0.5) / lutW,
        (float(lutPos.y) + 0.5) / lutW
    );
    vec4 replacementColour = texture(uLut, normalizedPos);

    // use original if either:
    //      original alpha is 0 (because keep transparent)
    //      or lut alpha is 0 (signals unwritten slot in the LUT)
    // The alpha channel stores closeness (0 = unwritten, >0 = has replacement)
    float shouldReplace = c.a * step(0.004, replacementColour.a); // > 1/255 means written

    // Use the replacement color but force alpha to be fully opaque (or match original alpha)
    vec4 replacement = vec4(replacementColour.rgb, c.a);
    finalColor = mix(c, replacement, shouldReplace);
}
