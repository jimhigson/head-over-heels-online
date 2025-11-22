#version 300 es

#include "fragFns/luminance.glsl"
#include "fragFns/lutColourReplace.glsl"
precision mediump float;

out vec4 finalColor;

in vec2 vTextureCoord;

// transparent value that works with premultiplied alpha (all values 0)
const vec4 transparentBlack = vec4(0.0, 0.0, 0.0, 0.0);

uniform sampler2D uTexture;

void main() {

    vec4 cShadowSprite = texture(uTexture, vTextureCoord );

    float shadowSpriteLum = cShadowSprite.r;

    // how much the shadow should darken:
    // 1 = keep as-is
    // 0 = reduce to pure black
    float shadowAlpha = (shadowSpriteLum)
        // map onto range 0.4 ... 1.0
        * cShadowSprite.a * 0.6 + 0.4;

    // snap to the values: 0.7 (full shadow), 0.4 (shadow edge)
    float shadowAlphaSnapped = 
                        step(0.2, shadowAlpha) * 0.4 +                 
                        step(0.7, shadowAlpha) * 0.2;

    float isShadow = step( 0.01, cShadowSprite.a );

    finalColor = mix(transparentBlack, vec4(0.,0.,0.,shadowAlphaSnapped), isShadow);
}