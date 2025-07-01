#version 300 es
precision lowp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uColour;

void main(void) {
    finalColor = texture(uTexture, vTextureCoord);
}
