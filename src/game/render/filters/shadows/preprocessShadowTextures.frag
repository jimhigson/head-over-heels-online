#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    // opaque black-on-white shadow art becomes alpha-based:
    // - RGB becomes pure black
    // - alpha becomes semi-transparent where original was black, more transparent for grey
    finalColor = vec4(0.0, 0.0, 0.0, c.a * (1.0 - c.r));
}
