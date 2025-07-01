#version 300 es
precision lowp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform vec3 uOutline;
uniform float uOutlineWidth;

void main(void) {
    vec2 scaledTexelSize = vec2(1.0f) / vec2(textureSize(uTexture, 0)) * uOutlineWidth;    
    
    // Calculate offset coordinates
    vec2 rightCoord = vec2(vTextureCoord.x + scaledTexelSize.x, vTextureCoord.y);
    vec2 leftCoord = vec2(vTextureCoord.x - scaledTexelSize.x, vTextureCoord.y);
    vec2 belowCoord = vec2(vTextureCoord.x, vTextureCoord.y + scaledTexelSize.y);
    vec2 aboveCoord = vec2(vTextureCoord.x, vTextureCoord.y - scaledTexelSize.y);
    
    // Create boundary masks (1.0 if within bounds, 0.0 if out of bounds)
    // seems to work fine without this, but could multiply colourToX by this to get zero'd out when OOB
    // float rightInBounds = step(rightCoord.x, 1.0);
    // float leftInBounds = step(0.0, leftCoord.x);
    // float belowInBounds = step(belowCoord.y, 1.0);
    // float aboveInBounds = step(0.0, aboveCoord.y);
    
    vec4 colourToRight = texture(uTexture, rightCoord);
    vec4 colourToLeft = texture(uTexture, leftCoord);
    vec4 colourBelow = texture(uTexture, belowCoord);
    vec4 colourAbove = texture(uTexture, aboveCoord);
    
    // Check if any neighbor is opaque (combine all alpha values)
    float hasOpaqueNeighbor = max(max(colourToRight.a, colourToLeft.a), 
                                  max(colourBelow.a, colourAbove.a));

    vec4 originalColour = texture(uTexture, vTextureCoord);
        
    finalColor = mix(
        originalColour, 
        vec4(uOutline, 1), 
        // 1 if: original colour is transparent and has an opaque neighbour - use outline colour
        // 0 if: original colour is opaque or has no opaque neighbour - use original colour (transparent or sprite)
        (1.0 - originalColour.a) * hasOpaqueNeighbor
    );
}
