#version 300 es
precision mediump float;

/*
    crt-pi - A Raspberry Pi friendly CRT shader.
    Copyright (C) 2015-2016 davej
    This program is free software; you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by the Free
    Software Foundation; either version 2 of the License, or (at your option)
    any later version.

    Ported from ReShade to GLSL
*/

/* Configuration - these will be replaced at runtime by the TypeScript filter */

#define MASK_TYPE {{maskType}}         // 0 = none, 1 = green/magenta, 2 = trinitron(ish)
#define SCANLINES {{scanlines}}         // [0 or 1] Enables Scanlines
#define CURVATURE {{curvature}}         // [0 or 1] Enables Curvature
#define FAKE_GAMMA {{fakeGamma}}       // [0 or 1] Ignores manual gamma tweaks and tries to auto-compensate
#define GAMMA {{gamma}}                 // [0 or 1] Enables Gamma Control
#define SHARPER {{sharper}}             // [0 or 1] Sharpens the image if too blurry due to Linear sampling
#define MULTISAMPLE {{multisample}}     // [0 or 1] Enables Multisampling

/* Uniforms */

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform vec2 uEmulatedResolution;  // Original emulated game resolution
uniform float uCurvatureX;      // Screen curvature - horizontal
uniform float uCurvatureY;      // Screen curvature - vertical
uniform float uMaskBrightness;  // Shadow mask brightness
uniform float uScanlineWeight;  // Scanline weight (higher = thinner)
uniform float uScanlineGapBrightness;  // Gap brightness between scanlines
uniform float uBloomFactor;     // Bloom factor for bright scanlines
uniform float uInputGamma;      // Input gamma
uniform float uOutputGamma;     // Output gamma
uniform vec2 uResolution;       // Screen resolution

out vec4 finalColor;

#if CURVATURE == 1
vec2 distort(vec2 coord) {
    vec2 curvatureDistortion = vec2(uCurvatureX, uCurvatureY);
    vec2 barrelScale = 1.0 - (0.23 * curvatureDistortion);
    
    coord -= vec2(0.5, 0.5);
    float rsq = coord.x * coord.x + coord.y * coord.y;
    coord += coord * (curvatureDistortion * rsq);
    coord *= barrelScale;
    
    if (abs(coord.x) >= 0.5 || abs(coord.y) >= 0.5) {
        return vec2(-1.0, -1.0);  // Out of bounds
    } else {
        coord += vec2(0.5, 0.5);
    }
    
    return coord;
}
#endif

float calcScanLineWeight(float dist) {
    return max(1.0 - dist * dist * uScanlineWeight, uScanlineGapBrightness);
}

float calcScanLine(float dy) {
    float scanLineWeight = calcScanLineWeight(dy);
#if MULTISAMPLE == 1
    vec2 pixelSize = 1.0 / uResolution;
    float filterWidth = (uEmulatedResolution.y * pixelSize.y) * 0.333333333;
    scanLineWeight += calcScanLineWeight(dy - filterWidth);
    scanLineWeight += calcScanLineWeight(dy + filterWidth);
    scanLineWeight *= 0.3333333;
#endif
    return scanLineWeight;
}

void main() {
    vec2 texcoord = vTextureCoord;
    
#if CURVATURE == 1
    texcoord = distort(texcoord);
    if (texcoord.x < 0.0) {
        finalColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
#endif
    
    vec2 texcoordInPixels = texcoord * uEmulatedResolution;
    
#if SHARPER == 1
    // 2D cubic interpolation for sharper pixels
    vec2 tempCoord = floor(texcoordInPixels) + 0.5;
    vec2 coord = tempCoord / uEmulatedResolution;
    vec2 deltas = texcoordInPixels - tempCoord;
    float scanLineWeight = calcScanLine(deltas.y);
    
    vec2 signs = sign(deltas);
    
    deltas = abs(deltas) * 2.0;
    deltas.x = deltas.x * deltas.x;
    deltas.y = deltas.y * deltas.y * deltas.y;
    deltas *= 0.5 / uEmulatedResolution * signs;
    
    vec2 tc = coord + deltas;
#else
    // 1D vertical interpolation only (faster)
    float tempCoord = floor(texcoordInPixels.y) + 0.5;
    float coord = tempCoord / uEmulatedResolution.y;
    float deltas = texcoordInPixels.y - tempCoord;
    float scanLineWeight = calcScanLine(deltas);
    
    float signs = sign(deltas);
    
    deltas = abs(deltas) * 2.0;
    deltas = deltas * deltas * deltas;
    vec2 pixelSize = 1.0 / uResolution;
    deltas *= 0.5 * pixelSize.y * signs;
    
    vec2 tc = vec2(texcoord.x, coord + deltas);
#endif
    
    vec3 colour = texture(uTexture, tc).rgb;
    
#if SCANLINES == 1
    
#if GAMMA == 1 && FAKE_GAMMA == 1
    colour = colour * colour;
#elif GAMMA == 1
    colour = pow(colour, vec3(uInputGamma));
#endif
    
    // Apply scanlines
    scanLineWeight *= uBloomFactor;
    colour *= scanLineWeight;
    
#if GAMMA == 1 && FAKE_GAMMA == 1
    colour = sqrt(colour);
#elif GAMMA == 1
    colour = pow(colour, vec3(1.0 / uOutputGamma));
#endif
    
#endif /* SCANLINES */
    
#if MASK_TYPE == 1
    // Green/magenta shadow mask
    float whichMask = fract((vTextureCoord.x * uResolution.x) * 0.5);
    vec3 mask = vec3(1.0);
    
    if (whichMask < 0.5) {
        mask.rb = vec2(uMaskBrightness);
    } else {
        mask.g = uMaskBrightness;
    }
    
    colour *= mask;
#elif MASK_TYPE == 2
    // Trinitron-style RGB stripe shadow mask
    float whichMask = fract((vTextureCoord.x * uResolution.x) * 0.3333333);
    vec3 mask = vec3(uMaskBrightness);
    
    if (whichMask < 0.3333333) {
        mask.r = 1.0;
    } else if (whichMask < 0.6666666) {
        mask.g = 1.0;
    } else {
        mask.b = 1.0;
    }
    
    colour *= mask;
#endif
    
    finalColor = vec4(colour, 1.0);
}