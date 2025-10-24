#version 300 es
precision highp float;

#include "fragFns/lutColourReplace.glsl"
#include "fragFns/luminance.glsl"
#include "fragFns/attributeClash.glsl"

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uBlockSize;
uniform float uBlackPoint;

uniform sampler2D uLut;

void main(void) {
    finalColor = attributeClash(
        uTexture, 
        uLut,
        uBlockSize, 
        uBlackPoint, 
        1.0, 
        vTextureCoord
    );
}