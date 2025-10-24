#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uBlockSize;

void main(void) {
    // Get texture dimensions using built-in GLSL function
    vec2 textureSize = vec2(textureSize(uTexture, 0));

    // Calculate which block this pixel belongs to
    vec2 pixelPos = vTextureCoord * textureSize;
    vec2 blockPos = floor(pixelPos / uBlockSize) * uBlockSize;

    // original colour:
    vec4 c = texture(uTexture, vTextureCoord);

    // Accumulate colour data for the entire block
    vec3 colorSum = vec3(0.0);
    float nonBlackCount = 0.0;

    // Loop through all pixels in this block
    for (float y = 0.0; y < uBlockSize; y++) {
        for (float x = 0.0; x < uBlockSize; x++) {
            vec2 samplePos = (blockPos + vec2(x, y) + 0.5) / textureSize;

            // Clamp to ensure we stay within texture bounds
            samplePos = clamp(samplePos, 0.0, 1.0);

            vec4 sampleColor = texture(uTexture, samplePos);

            // 1 if usable (non-black), 0 if ignorable (black)
            float useSampledColour = step(0.5, sampleColor.r + sampleColor.g + sampleColor.b);

            colorSum += sampleColor.rgb * useSampledColour;
            nonBlackCount += useSampledColour;
        }
    }

    // Calculate average colour
    vec3 avgColor = colorSum / nonBlackCount; 
    float avgColorLum = max(avgColor.r + avgColor.g + avgColor.b, 0.01); 

    // relative strength in range 0..1 of each channel, normalised by the lum
    vec3 channelsStrength = avgColor/avgColorLum;

    // Round each channel to 0 or 1 (ZX Spectrum colours) but keep original transparency:
    vec4 quantizedColor = vec4(step(0.3, channelsStrength) , 0.1);

    // 1 for a block with basic attr, 0 for dim
    float isBright = step(1.0, avgColorLum);
    float dimMultiplier = mix(0.5, 1.0, isBright);

    quantizedColor *= dimMultiplier;

    // 1 if original black, 0 if not
    float originalColorIsBlack = 1.0 - step(0.5, c.r + c.g + c.b);

    // return black if original colour is black, otherwise quantized colour
    finalColor = mix(quantizedColor, vec4(0.0,0.0,0.0, 1.0), originalColorIsBlack);
}