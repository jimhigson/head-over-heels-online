#version 300 es
precision lowp float;

out vec4 finalColor;

in vec2 vTextureCoord;
uniform sampler2D uBackTexture;
uniform sampler2D uTexture;
// do not use uTexture in this frag - for some reason it causes pixi's render pipeline
// to take away the backbuffer, which we rely on sampling from

void main() {
    vec4 fg = texture(uTexture, vTextureCoord);
    vec3 bg = texture(uBackTexture, vTextureCoord).rgb;

    float isBlack = step(length(bg), 0.001f); // 1 if black, 0 otherwise
    finalColor = mix(fg, vec4(0.0, 0.0, 0.0, 0.0), isBlack);
}