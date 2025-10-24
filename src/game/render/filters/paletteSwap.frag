#version 300 es
// some old/mid-spec Android devices (eg, Pixel 7a) need this to be high
// precision, or they 'miss' the locations on the LUT
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uLut;

#include "fragFns/lutColourReplace.glsl"

void main(void) {

    vec4 c = texture(uTexture, vTextureCoord);

    finalColor = lutColourReplace(uLut, c);
}
