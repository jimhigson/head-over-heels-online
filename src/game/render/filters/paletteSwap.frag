#version 300 es
// some old/mid-spec Android devices (eg, Pixel 7a) need this to be high
// precision, or they 'miss' the locations on the LUT
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

// these must match the typescript
const float lutSize = 256.0;
const float smallPrime = 31.0;

uniform sampler2D uTexture;
uniform sampler2D uLut;

/** returns in [0, lutSize] range
this must match the TypeScript version of the hash function*/
float hashInputColour(vec3 color) {
    // Add 0.5 before flooring to ensure consistent rounding, ie if the value
    // is on the boundary between two integers
    vec3 c255 = floor(color * 255.0 + 0.5);
    
    float hash = mod(
        c255.r + c255.g * smallPrime + c255.b * smallPrime * smallPrime, 
        lutSize
    );
    return hash;
}

void main(void) {
    
    vec4 c = texture(uTexture, vTextureCoord);

    float h = hashInputColour(c.rgb);

    // use the hash to look up the replacement in the LUT:
    vec4 replacementColour = texture(
        uLut, 
        vec2(
            // normalise h to [0, 1] range, sampling from texel center
            (h + 0.5) / lutSize, 
            0.5
        )
    );
    
    // use original if either: 
    //      original alpha is 0 (because keep transparent)
    //      or lut alpha is 0 (signals nothing in this slot of the LUT)
    finalColor = mix(c, replacementColour, c.a * replacementColour.a);
}
