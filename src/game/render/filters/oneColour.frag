#version 300 es
precision lowp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uColour;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    // we know c.a is either 0 or 1, so no need to do a step()

    finalColor = mix(c, vec4(uColour, 1), c.a);
}
