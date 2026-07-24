#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void) {
    // step the raw (premultiplied) sample per channel: only pure 1.0 survives.
    // A true step on the raw values matters - a linear ramp, or thresholding
    // after un-premultiplying, admits fringe pixels and emits partial alphas
    // that the mask semantics do not allow
    vec4 c = texture(uTexture, vTextureCoord);
    finalColor = step(0.999, c);
}
