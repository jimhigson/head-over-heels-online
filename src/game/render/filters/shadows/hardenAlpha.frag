#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMask;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);
    float maskVal = texture(uMask, vTextureCoord).r;

    vec4 hardened = step(0.999, c);

    finalColor = mix(c, hardened, maskVal);
}
