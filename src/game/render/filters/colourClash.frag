#version 300 es

precision lowp float;
out vec4 finalColor;

in vec2 vTextureCoord;
uniform sampler2D uBackBuffer;
uniform vec3 uTargetColor;
// do not use uTexture in this frag - for some reason it causes pixi's render pipeline
// to take away the backbuffer, which we rely on sampling from

void main() {
    vec3 bg = texture(uBackBuffer, vTextureCoord).rgb;

    float isBlack = step(length(bg), 0.001f); // 1 if black, 0 otherwise
    finalColor = mix(vec4(uTargetColor, 1.0f), vec4(0, 0, 0, 0), isBlack);

}