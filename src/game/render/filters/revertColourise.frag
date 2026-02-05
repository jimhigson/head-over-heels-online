#version 300 es
precision lowp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uTargetColor;

// out of a max of √3 (diagonal of a cube) because is against the rgb vector
// this shader was originally used for all uncolourised mode in the game, but now with 
// spritesheet variants it is only used in the editor to show the selected item
// 0.1 isn't high enough to catch all the 'black' pixels after colour swopping
// in moonbase non-dim rooms
const float blackThreshold = sqrt(3.0) * 0.15;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    // 1 if black, 0 if non-black
    float isBlack = step(length(c.rgb), blackThreshold);

    // keep original if either:
    //      * black
    //      * transparent

    finalColor = mix(    
        vec4(uTargetColor, 1),    
        c, 
        max(isBlack, 1.0 - c.a)
    );
}
