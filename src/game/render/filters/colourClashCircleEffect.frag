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

uniform float uZxCircleSpeed;
uniform float uZxCircleOffset;
uniform float uZxCircleMinSize;
uniform float uBlackCircleOffset;
uniform float uBlackCircleMinSize;
uniform float uTimeStep;
uniform float uBlackCircleDarkening;
uniform float uBlackCircleFeathering;
uniform float uDistancePower;

// uInputClamp is a Pixi built-in uniform (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

// how much of the duration of the effect to use to fade out at the end, so that
// any radius that is still showing doesn't disappear suddenly when the effect finishes
const float fadeDuration = 0.1;
float fade(float progress) {
    return 1.0 - smoothstep(1.0 - fadeDuration, 1.0, progress);
}

float blockDistToCentre(
    /* 
    1   => perfect circle, 
    <1  => ellipse (wider than tall)
    >1  => taller than wide
    */
    float ellipticalFactor) {

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
        pow(1.0 - blockDistToCentre01, uDistancePower) + circleMinSize
    );
}

void main(void) {

    float progress = floor(uProgress / uTimeStep) * uTimeStep;

    // gets more elliptical towards the end of the animation - initially very circular
    // to ensure more coverage of the screen
    float elipticalFactor = mix(1.0, 0.5, progress);

    float blockDistToCentre = blockDistToCentre(elipticalFactor);

    float insideBlackCirc01 = isInCirc(
        blockDistToCentre,
        uBlackCircleFeathering,
        uBlackCircleMinSize,
        progress + uBlackCircleOffset
    );

    // circle that defines how much of the final image has the effect applied
    float insideInnerCirc01 = isInCirc(
        blockDistToCentre,
        0.0,
        uZxCircleMinSize,
        progress * uZxCircleSpeed + uZxCircleOffset
    );

    // round insideInnerCirc01 to nearest half:
    //insideInnerCirc01 = step(0.5, insideInnerCirc01);

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
            - pow(progress, 4.0)
            ,
            1.0 - uBlackCircleDarkening
        ),
        vTextureCoord
    );

    vec4 c = texture(uTexture, vTextureCoord);

    finalColor = mix( clashColour, c, step(0.2, insideInnerCirc01 * fade(progress)));

    // uncomment to see the centre of the circle highlighted:
    // finalColor = mix( 
    //     finalColor, 
    //     vec4(1.0,0.0,1.0,1.0), 
    //     1.0 - step(0.01, length( (vTextureCoord - trueCentre ) / vec2(1, texAspect) ))
    // );

    // uncomment to see the black circle starkly (cyan):
    // float thresh = 0.95;
    // finalColor = mix( 
    //     finalColor, 
    //     vec4(0.0,1.0,1.0,1.0), 
    //     step( thresh, insideBlackCirc01)
    // );
    // finalColor = mix( 
    //     finalColor, 
    //     vec4(1.0,1.0,0.0,1.0), 
    //     step( thresh, insideInnerCirc01)
    // );
}