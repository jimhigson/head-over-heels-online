#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    finalColor = vec4(c.rgb * 0.5, c.a);
}
