#version 300 es
precision lowp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uLight;
uniform vec3 uDark;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));

    // brighter pixels take the light colour, darker take the dark colour.
    // luma is in premultiplied space, so compare against half the alpha:
    vec3 toned = mix(uDark, uLight, step(0.5 * c.a, luma));

    finalColor = mix(c, vec4(toned, 1.0), c.a);
}
