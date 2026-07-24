#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMask;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);
    float maskVal = texture(uMask, vTextureCoord).r;

    // any non-zero alpha snaps to fully opaque: for alpha-encoded shadow art
    // (strength in the alpha channel), every pixel with any shadow at all
    // becomes full ink
    vec4 snapped = vec4(c.rgb, step(0.001, c.a));

    finalColor = mix(c, snapped, maskVal);
}
