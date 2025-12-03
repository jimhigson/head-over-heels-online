#version 300 es
precision lowp float;

out vec4 finalColor;

in vec2 vTextureCoord;
uniform sampler2D uBackTexture;
uniform sampler2D uTexture;
uniform vec4 uTintColour;
// do not use uTexture in this frag - for some reason it causes pixi's render pipeline
// to take away the backbuffer, which we rely on sampling from

vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

void main() {
    vec4 fg = texture(uTexture, vTextureCoord);
    vec3 bg = texture(uBackTexture, vTextureCoord).rgb;

    float fgIsTransparent = step(fg.a, 0.001f); // 1 if transparent, 0 otherwise
    float bgIsBlack = step(length(bg), 0.001f); // 1 if black, 0 otherwise
    finalColor = mix(
         mix(
            uTintColour, 
            black, 
            bgIsBlack
        ), 
        transparent, 
        fgIsTransparent
    );
}