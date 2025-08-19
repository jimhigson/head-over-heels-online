#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uTargetColor;

vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    // 1 if black, 0 if non-black
    float isBlack = step(length(c.rgb), 0.01);

    // keep original if either:
    //      * black
    //      * transparent

    finalColor = mix(    
        vec4(uTargetColor, 1),    
        c, 
        max(isBlack, 1.0 - c.a)
    );
}
