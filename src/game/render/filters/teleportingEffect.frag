#version 300 es
precision highp float;

#include "fragFns/lutColourReplace.glsl"
#include "fragFns/luminance.glsl"
#include "fragFns/attributeClash.glsl"

// how much of the transition to spend fading into the
// attribute clashed version of the colours:
//const float fadeDuration = 0.33;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uBlockSize;
uniform float uBlackPoint;
uniform float uProgress;

uniform sampler2D uLut;

uniform float uCentreX;
uniform float uCentreY;

// uInputClamp is a Pixi built-in uniform (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

// the smallest the circle is allowed to get to:
const float blackCircleMinSize = 0.33;

const float blackCircleFeathering = 0.4;

/* 
1   => perfect circle, 
<1  => ellipse (wider than tall)
>1  => taller than wide
*/
const float ellipticalFactor = 0.75; // 0.75 - circle matches ratio of a PAL screen

// how much of the duration of the effect to use to fade out at the end, so that
// any radius that is still showing doesn't disappear suddenly when the effect finishes
const float fadeDuration = 0.1;
float fade() {
    return 1.0 - smoothstep(1.0 - fadeDuration, 1.0, uProgress);
}

float blockDistToCentre() {
    float xCentreTrue = uInputClamp.x + (uInputClamp.z - uInputClamp.x) * uCentreX; 
    float yCentreTrue = uInputClamp.y + (uInputClamp.w - uInputClamp.y) * uCentreY; 
    vec2 trueCentre = vec2(xCentreTrue, yCentreTrue);

    vec2 texSize = vec2(textureSize(uTexture, 0));
    float texAspect = texSize.x/texSize.y;
    vec2 blockPos = attributeBlockPos(texSize, uBlockSize, vTextureCoord);
    // dist will be in range 0...1, but realistically, usually in range 0..0.5
    // since to reach 1, the player would have to be at the extreme edge of the screen,
    // and the position being rendered at the other edge
    // TODO: this isn't taking into account that 0..1 total range can be different for x and y
    // if the texture we're drawing on isn't square
    return length(
        (blockPos - trueCentre) / vec2(1, texAspect * ellipticalFactor)
    );
}

float isInCirc(
        float blockDistToCentre01, 
        float feathering, 
        /* 0 for an outwards-expanding circle, 1 for inwards-expanding */
        float circleMinSize,
        float progress ) {

    // use progress as the radius of the circle
    // the circle is growing/shrinking with progress, giving a dynamic cutoff edge
    // to the step function
    return smoothstep( 
        // ± feathering make the edge of the circle smoother (but still pixelated
        // by blocks)
        progress - feathering, 
        progress + feathering, 
        // ^3 makes the initial (mostly hidden) fade fast, and the end of the fade anim slower
        pow(1.0 - blockDistToCentre01, 3.0) + circleMinSize
    );
}

void main(void) {

    float blockDistToCentre = blockDistToCentre();

    float insideBlackCirc01 = isInCirc(
        blockDistToCentre, 
        blackCircleFeathering,
        blackCircleMinSize,
        uProgress - 0.2
    );

    // circle that defines how much of the final image has the effect applied
    float insideInnerCirc01 = isInCirc(
        blockDistToCentre, 
        blackCircleFeathering,
        0.0, // min size zero = close the circle completely
        uProgress * 1.2
    );

    vec4 clashColour = attributeClash(
        uTexture,
        uLut,
        uBlockSize,
        uBlackPoint,        
        max(
            // darken outside of the black circle - creating the fade-out effect:
            insideBlackCirc01  
            // also apply a general darkening as the effect progresses:
            // by raising to the 4th power, the darkening is delayed until the end of
            // the fading out, allowing colour clash colours other than dark blue to 
            // be shown for longer
            - pow(uProgress, 4.0)
            , 
            0.0
        ),
        vTextureCoord
    );

    vec4 c = texture(uTexture, vTextureCoord);

    finalColor = mix( clashColour, c, insideInnerCirc01 * fade());

    // uncomment to see the centre of the circle highlighted:
    // finalColor = mix( 
    //     finalColor, 
    //     vec4(1.0,0.0,1.0,1.0), 
    //     1.0 - step(0.01, length( (vTextureCoord - trueCentre ) / vec2(1, texAspect) ))
    // );
}