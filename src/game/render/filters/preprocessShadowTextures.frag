#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMask;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);
    float maskVal = texture(uMask, vTextureCoord).r;

    // where the mask is white:
    // - RGB becomes pure black
    // - alpha becomes semi-transparent where original was black, more transparent for grey
    vec4 shadowColor = vec4(0.0, 0.0, 0.0, c.a * (1.0 - c.r));

    finalColor = mix(c, shadowColor, maskVal);
}
