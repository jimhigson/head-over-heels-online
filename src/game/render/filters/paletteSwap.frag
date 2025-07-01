#version 300 es
// keep this one at mediump for the hash function's precision
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

const float LUT_SIZE = 256.0;
const float magicNumber = 31.0; // Small prime number

uniform sampler2D uTexture;
uniform sampler2D uLut;

/** returns in [0, LUT_SIZE] range
this must match the TypeScript version of the hash function*/
float hashColor(vec3 color) {
    vec3 c255 = floor(color * 255.0);
    
    float hash = mod(
        c255.r + c255.g * magicNumber + c255.b * magicNumber * magicNumber, 
        LUT_SIZE
    );
    return hash;
}

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    float h = hashColor(c.rgb);

    // use the hash to look up the replacement in the LUT:
    vec4 replacementColour = texture(
        uLut, 
        vec2(
            // normalise h to [0, 1] range
            (h + 0.5) / LUT_SIZE, 
            0.5
        )
    );
    
    // use original if either: 
    //      original alpha is 0 (because keep transparent)
    //      or lut alpha is 0 (signals nothing in this slot of the LUT)
    finalColor = mix(c, replacementColour, c.a * replacementColour.a);
}
