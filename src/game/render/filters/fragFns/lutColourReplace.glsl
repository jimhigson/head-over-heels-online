const float lutW = 512.0;

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

vec4 lutColourReplace(sampler2D lut, vec4 inputColour) {
// Get block-encoded position for this color (returns integer coordinates)
    ivec2 lutPos = blockEncode(inputColour.rgb);

    // use the Morton position to look up the replacement in the LUT:
    // Convert to normalized coordinates for better cross-platform compatibility
    vec2 normalizedPos = vec2(
        (float(lutPos.x) + 0.5) / lutW,
        (float(lutPos.y) + 0.5) / lutW
    );
    vec4 replacementColour = texture(lut, normalizedPos);

    // use original if either:
    //      original alpha is 0 (because keep transparent)
    //      or lut alpha is 0 (signals unwritten slot in the LUT)
    // The alpha channel stores closeness (0 = unwritten, >0 = has replacement)
    float shouldReplace = inputColour.a * step(0.004, replacementColour.a); // > 1/255 means written

    // Use the replacement color but force alpha to be fully opaque (or match original alpha)
    vec4 replacement = vec4(replacementColour.rgb, inputColour.a);
    return mix(inputColour, replacement, shouldReplace);
}