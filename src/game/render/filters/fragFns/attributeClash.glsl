const int sampleCount = 8;

// how much dimmer are the blocks with the dimmed attribute?
// 1= not at all, 0 = totally black
const float dimmedAttributeLum = 0.6;
// 1.5 represents 50% since simple lum is in range 0..3
const float isDimThresh03 = 1.5;

// how desaturated a colour has to be before it is forced to be white/grey
//  0 = nothing moved to white/grey unless rounds to 1,1,1
//  1 = everything rounded to white/grey
//  0.1 = looks ok, but normal blocks sometimes look green
//  0.2 = looks ok, but white rabbits get no cyan square
//  0.15 is the compromise
const float saturationThreshold = 0.15;

// boost some channels while subduing others - generally, stop red from
// taking over and boost the greens/blues a bit. The spectrum doesn't have that
// many hues to choose from, so we need to translate the game's palette a little bit
// away from it's reddish bias and more towards the center of the colour space:
const vec3 channelStrengthModifier = vec3(0.8, 1.0, 1.1);

const vec4 pureWhiteColour = vec4(1.0,1.0,1.0,1.0);
const vec4 pureBlueColour = vec4(0.0,0.0,1.0,1.0);
const vec4 pureBlackColour = vec4(0.0,0.0,0.0, 1.0);

// get the top-left corner of the block textureCoord is inside,
// in 0..1 normalised space:
vec2 attributeBlockPos(
    vec2 texSize,
    float blockSize,
    vec2 textureCoord  
) {
    // Calculate which block this pixel belongs to
    vec2 pixelPos = textureCoord * texSize;
    
    return (floor(pixelPos / blockSize) * blockSize)/texSize;
}

vec4 attributeClash(
    sampler2D inputTexture, 
    sampler2D lut, 
    float blockSize, 
    float blackPoint,
    // consider the input to be dimmed by this much before processing 
    float inputDim,
    vec2 textureCoord) {
    // Get texture dimensions
    vec2 texSize = vec2(textureSize(inputTexture, 0));

    vec2 blockPos = attributeBlockPos(
        texSize, 
        blockSize, 
        textureCoord
    );

    // Accumulate colour data for the entire block
    vec3 colorSum = vec3(0.0);
    float nonBlackCount = 0.0;

    // Sample points evenly spread across the block, `/ texSize` converts to 0..1 space:
    vec2 stepSize01 = vec2(blockSize / float(sampleCount)) / texSize;
    vec2 samplePos01 = blockPos;
    for (int y = 0; y < sampleCount; y++) {
        samplePos01.y += stepSize01.y;
        samplePos01.x = blockPos.x;

        for (int x = 0; x < sampleCount; x++) {
            samplePos01.x += stepSize01.x;

            // stay within texture bounds
            // TODO: should probably skip if out of bounds instead of sampling the edge
            // pixels more than others:
            vec2 samplePosClamped01 = clamp(samplePos01, 0.0, 1.0);

            vec4 sampleColor = lutColourReplace(
                lut,
                texture(inputTexture, samplePosClamped01)
            ) * inputDim;

            // 1 if usable (non-black), 0 if ignorable (black)
            float sampleNotBlack01 = isNotBlack( sampleColor, blackPoint);

            colorSum += 
                // squaring each component of the sampled colour means that the contribution of
                // low-value channels is reduced:
                sampleColor.rgb * sampleColor.rgb 
                // but we might blat it to zero anyway:
                * sampleNotBlack01;
                
            nonBlackCount += sampleNotBlack01;
        }
    }

    // Calculate average colour
    vec3 avgColor = colorSum / nonBlackCount; 
    float avgColorLum03 = max(
        avgColor.r + avgColor.g + avgColor.b,        
        0.01 // avoid div by zero in case of an all-black square (doesn't really matter what value this has but keep close to 0):
    ); 

    // relative strength in range 0..1 of each channel, normalised by the lum
    vec3 channelsStrength = avgColor/avgColorLum03;

    // Round each channel to 0 or 1 (ZX Spectrum colours) but keep original transparency:
    vec4 quantisedColor = vec4(step(0.3, channelsStrength * channelStrengthModifier) , 0.1);

    // detect low-saturation and force to white/grey if so - note that this is done without channelStrengthModifier
    // being multiplied onto the input, so that the greys aren't turned into non-grey by that boosting/subduing:
    float maxChannel = max(channelsStrength.r, max(channelsStrength.g, channelsStrength.b));
    float minChannel = min(channelsStrength.r, min(channelsStrength.g, channelsStrength.b));
    float sat = maxChannel - minChannel;
    float isSaturated01 = step(saturationThreshold, sat);

    // handle the dim/bright bit attribute for the block:
    // 1 for a block with basic attr, 0 for dim
    float isBright = step(        
        isDimThresh03,
        avgColorLum03
    );
    float isAboveDim50_01 = step(isDimThresh03 * 0.5, avgColorLum03);
    float isAboveDim25_01 = step(isDimThresh03 * 0.01, avgColorLum03);

    vec4 unsatOrQuantisedColor = mix(
        // mix for desaturated colours:
        mix(
            // or blue (for the darkest colours) - blue because it is the darkest
            // hue in the palette (closest to black)            
            pureBlueColour, 
            // use white (for most of the lum range)
            pureWhiteColour, 
            isAboveDim50_01
        ), 
        // is saturated - use the quantised colour:
        mix(pureBlueColour, quantisedColor, isAboveDim25_01),
        isSaturated01
    );
    

    float dimMultiplier = mix(dimmedAttributeLum, 1.0, isBright);
    vec4 dimmedColor = unsatOrQuantisedColor * dimMultiplier;

    // original colour:
    vec4 c = lutColourReplace(
        lut,
        texture(inputTexture, textureCoord)
    ) * inputDim;

    // output either black or the calculated colour:
    // 1 if original black, 0 if not
    float originalColorIsNotBlack = isNotBlack(c, blackPoint);

    // return black if original colour is black, otherwise quantised colour
    return mix( pureBlackColour, dimmedColor, originalColorIsNotBlack);
}